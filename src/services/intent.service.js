export function extractUserIntent(query) {
    const lower = query.toLowerCase();

    // Result count detection
    let desiredCount = 5;

    const countMatch = lower.match(/(\d+)\s*(hotel|hotels|options|results)/);
    if (countMatch) {
        desiredCount = parseInt(countMatch[1], 10);
    } else if (lower.includes("few")) {
        desiredCount = 3;
    } else if (lower.includes("many")) {
        desiredCount = 10;
    }

    // Safety limits
    desiredCount = Math.min(Math.max(desiredCount, 1), 20);

    // Budget intent
    let budget = "any";
    if (lower.includes("cheap") || lower.includes("budget") || lower.includes("low price")) {
        budget = "low";
    } else if (lower.includes("luxury") || lower.includes("premium")) {
        budget = "high";
    }

    // Comfort / type intent
    let comfort = "any";
    if (lower.includes("comfortable") || lower.includes("cozy")) {
        comfort = "comfort";
    }

    return {
        desiredCount,
        budget,
        comfort,
    };
}
