import { getGroupPerformance } from "./abAnalytics.service.js";
import { getWeights, upsertWeights } from "../repositories/weights.repo.js";

const DEFAULT = {
    vector: 0.5,
    price: 0.2,
    rating: 0.2,
    geo: 0.1,
};

export async function autoTuneWeights() {
    const performance = await getGroupPerformance();

    if (performance.length < 2) {
        console.log("ℹ️ Not enough data to auto-tune");
        return;
    }

    // Find best performing group
    const winner = performance.reduce((a, b) =>
        b.conversion_rate > a.conversion_rate ? b : a
    );

    const current = (await getWeights(winner.ab_group)) || DEFAULT;

    // Small, safe nudges
    const tuned = {
        vector: Math.min(current.vector + 0.02, 0.6),
        price:  Math.min(current.price  + 0.01, 0.3),
        rating: Math.min(current.rating + 0.01, 0.3),
        geo:    current.geo, // geo stays stable
    };

    // Normalise to 1
    const sum =
        tuned.vector + tuned.price + tuned.rating + tuned.geo;

    Object.keys(tuned).forEach(k => {
        tuned[k] = tuned[k] / sum;
    });

    await upsertWeights(winner.ab_group, tuned);

    console.log(`🏆 Auto-tuned weights for group ${winner.ab_group}`, tuned);
}
