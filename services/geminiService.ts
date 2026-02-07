
import { GoogleGenAI } from "@google/genai";

// Platform Intelligence Engine
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStorageSummary = async (listingTitle: string, amenities: string[]) => {
  try {
    const prompt = `Act as an elite logistics concierge for Sharestuff. 
    Summarize why this storage location named "${listingTitle}" is a premium choice for global travelers. 
    Features: ${amenities.join(', ')}. Max 2 sentences. Use professional, reassuring language.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "A secure and verified logistics node in our global network.";
  } catch (error) {
    return "Expertly vetted storage node with high-level protocol security.";
  }
};

export const getItemSafetyAdvice = async (itemDescription: string) => {
  try {
    const prompt = `Act as a global compliance officer. 
    A user wants to ship this item: "${itemDescription}". 
    What are 3 critical inspection points for the courier to verify before accepting custody to ensure compliance with international aviation safety? 
    Brief bullet points.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "1. Visual match. 2. Safety seals. 3. Compliance verification.";
  } catch (error) {
    return "Ensure the asset matches its digital manifestation and satisfies safety protocols.";
  }
};
