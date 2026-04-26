/* Imports */
const Anthropic = require("@anthropic-ai/sdk");
const { systemPrompt, userPrompt } = require("../helpers/prompts");

/* Configure Anthropic */
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/* Create function */
const analyzeContract = async (code) => {
  if (!code) {
    throw new Error("Code snippet is needed.");
  }

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt(code) }],
    output_config: {
      format: {
        type: "json_schema",
        schema: {
          type: "object",
          properties: {
            overview: {
              type: "object",
              properties: {
                date: { type: "string" },
                contractSummary: { type: "string" },
                totalFindings: { type: "number" },
                findingsBySeverity: {
                  type: "object",
                  properties: {
                    critical: { type: "number" },
                    high: { type: "number" },
                    medium: { type: "number" },
                    low: { type: "number" },
                    informational: { type: "number" },
                  },
                  required: ["critical", "high", "medium", "low", "informational"],
                  additionalProperties: false,
                },
              },
              required: ["date", "contractSummary", "totalFindings", "findingsBySeverity"],
              additionalProperties: false,
            },
            securityScore: {
              type: "object",
              properties: {
                score: { type: "number" },
                rating: {
                  type: "string",
                  enum: ["Critical Risk", "High Risk", "Medium Risk", "Low Risk", "Safe"],
                },
                summary: { type: "string" },
              },
              required: ["score", "rating", "summary"],
              additionalProperties: false,
            },
            methodology: {
              type: "object",
              properties: {
                approach: { type: "string" },
                toolsAndTechniques: {
                  type: "array",
                  items: { type: "string" },
                },
                limitations: { type: "string" },
              },
              required: ["approach", "toolsAndTechniques", "limitations"],
              additionalProperties: false,
            },
            findingsSummary: {
              type: "object",
              properties: {
                critical: { type: "number" },
                high: { type: "number" },
                medium: { type: "number" },
                low: { type: "number" },
                informational: { type: "number" },
                topRisks: {
                  type: "array",
                  items: { type: "string" },
                },
              },
              required: ["critical", "high", "medium", "low", "informational", "topRisks"],
              additionalProperties: false,
            },
            detailedFindings: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  title: { type: "string" },
                  severity: {
                    type: "string",
                    enum: ["Critical", "High", "Medium", "Low", "Informational"],
                  },
                  category: { type: "string" },
                  description: { type: "string" },
                  affectedCode: { type: "string" },
                  recommendation: { type: "string" },
                },
                required: [
                  "id",
                  "title",
                  "severity",
                  "category",
                  "description",
                  "affectedCode",
                  "recommendation",
                ],
                additionalProperties: false,
              },
            },
            disclaimer: {
              type: "object",
              properties: {
                text: { type: "string" },
                generatedAt: { type: "string" },
                analysisScope: { type: "string" },
              },
              required: ["text", "generatedAt", "analysisScope"],
              additionalProperties: false,
            },
          },
          required: [
            "overview",
            "securityScore",
            "methodology",
            "findingsSummary",
            "detailedFindings",
            "disclaimer",
          ],
          additionalProperties: false,
        },
      },
    },
    temperature: 0.3,
  });

  const data = JSON.parse(message.content[0].text);
  return data;
};

/* Exports */
module.exports = analyzeContract;
