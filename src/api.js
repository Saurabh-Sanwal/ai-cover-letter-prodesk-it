import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function generateLetter(data) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Write a professional cover letter for:
Name: ${data.name}
Role: ${data.role}
Company: ${data.company}
Skills: ${data.skills}
Resume: ${data.resumeText || "N/A"}
Job Description: ${data.jobDesc}`,
    config: {
      systemInstruction: `You are an expert cover letter writer.
- 3 paragraphs: intro, value proposition, closing
- Max 250 words
- Clear, confident, and natural English — not too formal, not too casual
- Tailor to the job description and skills
- No bullets, no clichés, no robotic language`,
    },
  });

  return response.text;
}