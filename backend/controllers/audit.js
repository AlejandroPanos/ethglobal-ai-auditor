/* Imports */
const analyzeContract = require("../services/ai");
const { generateReport } = require("../services/pdf");
const { uploadReport, downloadReport, cleanupTempFile } = require("../services/storage");
const fs = require("fs");
const path = require("path");

/* Generate controllers */
exports.generateAudit = async (req, res) => {
  let filePath;
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "No code provided." });
    }

    const data = await analyzeContract(code);

    data.overview.date = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    data.disclaimer.generatedAt = new Date().toISOString();

    filePath = await generateReport(data);

    const rootHash = await uploadReport(filePath);

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
  let pdfPath;
  try {
    const { rootHash } = req.params;
    const outputPath = path.join(__dirname, "../tmp", `report-${Date.now()}.pdf`);

    pdfPath = await downloadReport(rootHash, outputPath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="audit-report.pdf"`);

    const fileStream = fs.createReadStream(pdfPath);
    fileStream.pipe(res);

    fileStream.on("end", () => cleanupTempFile(pdfPath));
    fileStream.on("error", (err) => {
      console.error("Stream error:", err);
      cleanupTempFile(pdfPath);
    });
  } catch (error) {
    console.error(error);
    if (pdfPath) cleanupTempFile(pdfPath);
    res.status(500).json({ error: error.message });
  }
};
