import fetch from "node-fetch";

const generateSummary = async (pet, tone = "formal") => {
  console.log("API KEY:", process.env.GEMINI_API_KEY);

  try {
    const prompt = `
You are a veterinary assistant.

Generate a ${tone === "friendly" ? "friendly and simple" : "professional and formal"} health summary (max 120 words).

Pet Details:
Name: ${pet.name}
Type: ${pet.type}
Breed: ${pet.breed}
Gender: ${pet.gender}

Vaccinations:
${pet.vaccinations.map(v => 
  `- ${v.name}, given on ${new Date(v.dateGiven).toDateString()}, expires on ${new Date(v.expiryDate).toDateString()}`
).join("\n")}

Health Events:
${pet.healthEvents.map(e => 
  `- ${e.type} on ${new Date(e.date).toDateString()}: ${e.description}`
).join("\n")}

Travel Readiness:
Microchip Confirmed: ${pet.travelReadiness?.microchipConfirmed ? "Yes" : "No"}

Instructions:
- Mention vaccination status
- Highlight health concerns
- Clearly mention travel readiness
- If not ready, explain why
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("Gemini Response:", JSON.stringify(data, null, 2));

    return data.candidates[0].content.parts[0].text;

  } catch (error) {
    console.error("Gemini Error:", error.message);
    throw new Error("Failed to generate summary");
  }
};

export default generateSummary;