/* Imports */
const analyzeContract = require("../services/ai");
const { generateReport } = require("../services/pdf");

/* Generate controllers */
exports.sendCode = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "No code provided." });
    }

    const data = await analyzeContract(code);
    const filePath = await generateReport(data);
    console.log(`File created at ${filePath}`);

    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.retrieveAudit = async (req, res) => {
  try {
    res.status(200).json({ msg: "Audit retrieved!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
