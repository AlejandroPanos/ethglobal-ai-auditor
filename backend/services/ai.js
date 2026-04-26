/* Imports */
const Anthropic = require("@anthropic-ai/sdk");

/* Configure Anthropic */
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/* Create function */
const analyzeContract = async (code) => {
  if (!code) {
    throw new Error("Code snippet is needed.");
  }

  const message = await client.message.create({});
};
