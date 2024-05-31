"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNotes = void 0;
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    apiKey: "",
});
async function generateNotes() {
    try {
        const aiGeneratedNote = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: [{ role: "user", content: "Empty" }],
            temperature: 1,
            max_tokens: 100,
        });
        return aiGeneratedNote;
    }
    catch (error) {
        if (error.response && error.response.status === 429) {
            console.error("Rate limit exceeded. Please check your plan and usage.");
        }
        else {
            console.error("Error generating notes:", error);
        }
        return [];
    }
}
exports.generateNotes = generateNotes;
