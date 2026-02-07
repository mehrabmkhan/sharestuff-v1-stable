import { GoogleGenAI } from "@google/genai";

/**
 * Feature flag:
 * - Demo mode ON when API key is missing
 * - Safe for Amplify, professors, recruiters
 */
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const DEMO_MODE = !API_KEY;

// Only initialize Gemini if key exists
const ai = API_KEY
  ? new GoogleGenAI({ apiKey: API_KEY })
  : null;

// -----------------------------
// Storage Summary
// -----------------------------
export const getStorageSummary = async (
  listingTitle: string,
  amenities: string[]
) => {
  // ✅ DEMO SHORTCUT (what you wanted)
  if (DEMO_MODE) {
    return `A verified storage location optimized for travelers, offering secure handling and trusted amenities for short- and long-term stays.`;
  }

  try {
    const prompt = `Act as an elite logistics concierge for ShareStuff.
Summarize why this storage location named "${listingTitle}" is a premium choice for global travelers.
Features: ${amenities.join(", ")}.
Max 2 sentences. Use professional, reassuring language.`;

    const response = await ai!.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return (
      response.text ||
      "A secure and verified logistics node in our global network."
    );
  } catch {
    return "Expertly vetted storage node with high-level protocol security.";
  }
};

// -----------------------------
// Item Safety Advice
// -----------------------------
export const getItemSafetyAdvice = async (itemDescription: string) => {
  // ✅ DEMO SHORTCUT
  if (DEMO_MODE) {
    return `• Item matches declared description
• No prohibited or hazardous materials
• Packaging meets international aviation safety standards`;
  }

  try {
    const prompt = `Act as a global compliance officer.
A user wants to ship this item: "${itemDescription}".
List 3 critical inspection points for the courier to verify before accepting custody to ensure compliance with international aviation safety.
Brief bullet points.`;

    const response = await ai!.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return (
      response.text ||
      "1. Visual match. 2. Safety seals. 3. Compliance verification."
    );
  } catch {
    return "Ensure the asset matches its digital manifestation and satisfies safety protocols.";
  }
};
