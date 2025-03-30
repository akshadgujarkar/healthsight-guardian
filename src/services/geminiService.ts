import { DiagnosisResultType } from "@/components/symptom/SymptomChecker";
import { toast } from "@/components/ui/sonner";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const analyzeSymptoms = async (
  symptoms: string[],
  age: number,
  gender: string,
  medicalHistory: string
): Promise<DiagnosisResultType> => {
  try {
    const prompt = `
      As a medical AI assistant, analyze the following symptoms and provide possible diagnoses, recommendations, and prevention tips.
      
      Patient Information:
      - Age: ${age}
      - Gender: ${gender}
      - Medical History: ${medicalHistory || "None provided"}
      - Symptoms: ${symptoms.join(", ")}
      
      Please provide a detailed analysis including:
      1. Possible conditions with probability levels (High, Medium, Low)
      2. Brief description of each condition
      3. General recommendations
      4. Potential medications that might be prescribed (with usage instructions and warnings)
      5. Prevention tips
      6. Follow-up questions for the patient
      
      Format the response as a JSON object with the following structure:
      {
        "possibleConditions": [
          {
            "name": "Condition Name",
            "probability": "Probability Level",
            "description": "Brief description"
          }
        ],
        "recommendations": ["Recommendation 1", "Recommendation 2"],
        "medications": [
          {
            "name": "Medication Name",
            "usage": "Usage instructions",
            "warnings": "Important warnings"
          }
        ],
        "preventionTips": ["Tip 1", "Tip 2"],
        "followUpQuestions": ["Question 1", "Question 2"]
      }
      
      Important: Provide a disclaimer that this is not a medical diagnosis, and the patient should consult with a healthcare professional.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Extract JSON from the response
    const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || 
                      responseText.match(/{[\s\S]*}/);
                      
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response");
    }
    
    let jsonStr = jsonMatch[0];
    if (jsonMatch[1]) {
      jsonStr = jsonMatch[1];
    }
    
    // Parse the JSON response
    const analysisResult = JSON.parse(jsonStr) as DiagnosisResultType;
    return analysisResult;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    toast.error("Failed to analyze symptoms. Please try again later.");
    throw error;
  }
};
