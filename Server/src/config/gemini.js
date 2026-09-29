const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({ api: "process.env.GEMINI_API_KEY" });

module.exports = genAI;
