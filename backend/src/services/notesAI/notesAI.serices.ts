import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "",
});

export async function generateNotes() {
  try {
    const aiGeneratedNote = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [{ role: "user", content: "Empty" }],
      temperature: 1,
      max_tokens: 100,
    });

    return aiGeneratedNote;
  } catch (error: any) {
    if (error.response && error.response.status === 429) {
      console.error("Rate limit exceeded. Please check your plan and usage.");
    } else {
      console.error("Error generating notes:", error);
    }
    return [];
  }
}
