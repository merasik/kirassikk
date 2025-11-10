
import { GoogleGenAI, Type } from "@google/genai";
import { University, QuestionnaireData } from "../types";
import { universities } from "../data/mockData";

// IMPORTANT: This is a mock implementation. In a real application,
// you would initialize the Gemini client and make actual API calls.
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MOCK_API_DELAY = 1500;

// Mock function to simulate Gemini analyzing psych test answers
export const analyzePsychTest = async (answers: Record<string, string>): Promise<string[]> => {
  console.log("Analyzing psych test answers:", answers);
  
  // In a real app, you would use Gemini like this:
  /*
  const prompt = `Based on these answers to a career guidance test, suggest 3-5 suitable career fields or areas of study for a high school student. Answers: ${JSON.stringify(answers)}. Return a JSON object with a key 'fields' containing an array of strings.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                fields: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                }
            }
        }
    }
  });

  const result = JSON.parse(response.text);
  return result.fields;
  */

  // Mocked response
  await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
  const mockFields = ["IT и Компьютерные науки", "Инженерное дело", "Экономика и анализ данных"];
  return mockFields;
};


// Mock function to simulate Gemini recommending universities
export const recommendUniversities = async (
  profile: QuestionnaireData,
  careerFields: string[]
): Promise<University[]> => {
  console.log("Generating university recommendations for:", { profile, careerFields });

  // In a real app, you would use Gemini like this:
  /*
  const prompt = `Given the following student profile: ${JSON.stringify(profile)} and their preferred career fields: ${JSON.stringify(careerFields)}, and this list of universities: ${JSON.stringify(universities)}, recommend the top 3 most suitable universities. Explain your reasoning for each choice briefly. Return a JSON array of objects, where each object contains the university id and a short reason for the recommendation.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.NUMBER },
                    reason: { type: Type.STRING }
                }
            }
        }
    }
  });

  const recommendations = JSON.parse(response.text);
  // Match IDs to the full university objects
  return recommendations.map(rec => universities.find(u => u.id === rec.id)).filter(Boolean) as University[];
  */
  
  // Mocked response
  await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
  // Simple mock logic: filter by region if possible, otherwise return first 3.
  const regionFiltered = universities.filter(u => u.city.toLowerCase().includes(profile.region.toLowerCase()));
  if (regionFiltered.length > 0) {
      return regionFiltered.slice(0, 3);
  }
  return universities.slice(0, 3);
};
