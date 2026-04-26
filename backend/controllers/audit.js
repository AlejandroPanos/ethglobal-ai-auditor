/* Imports */
const analyzeContract = require("../services/ai");
const { generateReport } = require("../services/pdf");
const { uploadReport, downloadReport, cleanupTempFile } = require("../services/storage");

/* Generate controllers */
exports.sendCode = async (req, res) => {
  let filePath;
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "No code provided." });
    }

    const data = await analyzeContract(code);
    filePath = await generateReport(data);
    console.log(`File created at ${filePath}`);

    const rootHash = await uploadReport(filePath);
    console.log(rootHash);

    if (!rootHash) {
      return res.status(400).json({ error: "No root hash generated." });
    }

    res.status(200).json({ data, rootHash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    if (filePath) {
      cleanupTempFile(filePath);
    }
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
