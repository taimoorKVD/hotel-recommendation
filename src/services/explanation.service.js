import { openai } from "../config/openai.js";

export async function explainRecommendations(query, hotels) {
    const prompt = `
User query:
"${query}"

Hotels:
${hotels.map(h => `
Hotel: ${h.name}
Price: ${h.price_per_night}
Rating: ${h.star_rating}
Amenities: ${h.amenities.join(", ")}
`).join("\n")}

Explain in ONE short sentence per hotel why it matches the user's request.
Return JSON:
[
  { "hotel_name": "...", "reason": "..." }
]
`;

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "Return valid JSON only." },
            { role: "user", content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 300,
    });

    return JSON.parse(
        response.choices[0].message.content.match(/\[[\s\S]*\]/)[0]
    );
}
