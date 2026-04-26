/* Imports */
const Anthropic = require("@anthropic-ai/sdk");
const { model } = require("mongoose");

/* Configure Anthropic */
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/* Create function */
const analyzeContract = async (code) => {
  if (!code) {
    throw new Error("Code snippet is needed.");
  }

  const message = await client.message.create({
    model: "claude-haiku-4-5-20251001",
    maxTokens: 1024,
    system: "Placeholder",
    messages: [{ role: "user", content: "Placeholder" }],
  });
};
