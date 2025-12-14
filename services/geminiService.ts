import { GoogleGenAI } from "@google/genai";
import { BusinessContext, QuestionnaireAnswers, ShieldCheckReport } from "../types";
import { SHIELD_SYSTEM_PROMPT } from "../constants";

export async function generateReport(
  context: BusinessContext, 
  answers: QuestionnaireAnswers
): Promise<ShieldCheckReport> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is not defined");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Prepare the input payload for the model
  const userPayload = {
    business_context: context,
    answers: answers
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: JSON.stringify(userPayload),
      config: {
        systemInstruction: SHIELD_SYSTEM_PROMPT,
        responseMimeType: "application/json"
      }
    });

    const responseText = response.text;
    
    if (!responseText) {
      throw new Error("Empty response from AI");
    }

    const reportData = JSON.parse(responseText) as ShieldCheckReport;
    return reportData;

  } catch (error) {
    console.error("Error generating report:", error);
    throw error;
  }
}
