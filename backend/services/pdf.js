/* Imports */
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

/* Severity colors */
const SEVERITY_COLORS = {
  Critical: "#FF4444",
  High: "#FF8C00",
  Medium: "#FFD700",
  Low: "#4169E1",
  Informational: "#808080",
};

/* Security score colors */
const RATING_COLORS = {
  "Critical Risk": "#FF4444",
  "High Risk": "#FF8C00",
  "Medium Risk": "#FFD700",
  "Low Risk": "#4169E1",
  Safe: "#228B22",
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : { r: 0, g: 0, b: 0 };
};

const addSectionTitle = (doc, title) => {
  doc
    .moveDown()
    .fontSize(16)
    .fillColor("#1a1a2e")
    .font("Helvetica-Bold")
    .text(title.toUpperCase(), { underline: true })
    .moveDown(0.5);
};

const addKeyValue = (doc, key, value) => {
  doc.fontSize(11).fillColor("#333333");
  doc.font("Helvetica-Bold").text(`${key}: `, { continued: true });
  doc.font("Helvetica").text(value);
};

const addSeverityBadge = (doc, severity) => {
  const color = SEVERITY_COLORS[severity] || "#808080";
  const { r, g, b } = hexToRgb(color);
  doc
    .fontSize(11)
    .fillColor(r, g, b)
    .font("Helvetica-Bold")
    .text(`[${severity.toUpperCase()}]`, { continued: true });
  doc.fillColor("#333333").font("Helvetica").text("");
};

/* Identify code in text snippet */
const renderMixedText = (doc, text) => {
  const parts = text.split(/(`[^`]+`)/g);

  parts.forEach((part, index) => {
    const isLast = index === parts.length - 1;

    if (part.startsWith("`") && part.endsWith("`")) {
      doc
        .font("Courier")
        .fontSize(10)
        .fillColor("#c0392b")
        .text(part.slice(1, -1), { continued: !isLast });
    } else if (part.length > 0) {
      doc.font("Helvetica").fontSize(11).fillColor("#333333").text(part, { continued: !isLast });
    }
  });

  doc.font("Helvetica").fontSize(11).fillColor("#333333").moveDown(0.5);
};

exports.generateReport = async (report) => {
  return new Promise((resolve, reject) => {
    try {
      // Dates from JS — never trust the AI for this
      const displayDate = new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const isoDate = new Date().toISOString();

      // Create tmp directory if it doesn't exist
      const tmpDir = path.join(__dirname, "../tmp");
      if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

      const fileName = `audit-${Date.now()}.pdf`;
      const filePath = path.join(tmpDir, fileName);

      const doc = new PDFDocument({ margin: 60, size: "A4" });
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // ─── COVER ───────────────────────────────────────────────
      doc
        .fontSize(28)
        .fillColor("#1a1a2e")
        .font("Helvetica-Bold")
        .text("Smart Contract", { align: "center" })
        .text("Security Audit Report", { align: "center" })
        .moveDown(0.5);

      doc
        .fontSize(11)
        .font("Helvetica")
        .fillColor("#666666")
        .text(`Generated: ${displayDate}`, { align: "center" })
        .moveDown(2);

      // Divider
      doc
        .moveTo(60, doc.y)
        .lineTo(535, doc.y)
        .strokeColor("#1a1a2e")
        .lineWidth(2)
        .stroke()
        .moveDown(1.5);

      // ─── OVERVIEW ────────────────────────────────────────────
      addSectionTitle(doc, "1. Overview");

      doc
        .fontSize(11)
        .font("Helvetica")
        .fillColor("#333333")
        .text(report.overview.contractSummary)
        .moveDown(0.5);

      addKeyValue(doc, "Total Findings", `${report.overview.totalFindings}`);
      addKeyValue(doc, "Critical", `${report.overview.findingsBySeverity.critical}`);
      addKeyValue(doc, "High", `${report.overview.findingsBySeverity.high}`);
      addKeyValue(doc, "Medium", `${report.overview.findingsBySeverity.medium}`);
      addKeyValue(doc, "Low", `${report.overview.findingsBySeverity.low}`);
      addKeyValue(doc, "Informational", `${report.overview.findingsBySeverity.informational}`);

      // ─── SECURITY SCORE ──────────────────────────────────────
      addSectionTitle(doc, "2. Security Score");

      const ratingColor = RATING_COLORS[report.securityScore.rating] || "#333333";
      const { r, g, b } = hexToRgb(ratingColor);

      doc
        .fontSize(32)
        .font("Helvetica-Bold")
        .fillColor(r, g, b)
        .text(`${report.securityScore.score} / 100`, { align: "center" })
        .moveDown(0.3);

      doc
        .fontSize(16)
        .fillColor(r, g, b)
        .text(report.securityScore.rating, { align: "center" })
        .moveDown(0.5);

      doc
        .fontSize(11)
        .font("Helvetica")
        .fillColor("#333333")
        .text(report.securityScore.summary)
        .moveDown();

      // ─── METHODOLOGY ─────────────────────────────────────────
      addSectionTitle(doc, "3. Methodology");

      doc
        .fontSize(11)
        .font("Helvetica")
        .fillColor("#333333")
        .text(report.methodology.approach)
        .moveDown(0.5);

      doc.font("Helvetica-Bold").text("Techniques Applied:").moveDown(0.3);

      report.methodology.toolsAndTechniques.forEach((technique) => {
        doc.font("Helvetica").text(`• ${technique}`);
      });

      doc.moveDown(0.5);
      doc.font("Helvetica-Bold").text("Limitations:").moveDown(0.3);
      doc.font("Helvetica").text(report.methodology.limitations).moveDown();

      // ─── FINDINGS SUMMARY ────────────────────────────────────
      addSectionTitle(doc, "4. Findings Summary");

      const severities = ["critical", "high", "medium", "low", "informational"];
      severities.forEach((s) => {
        const count = report.findingsSummary[s];
        const color = SEVERITY_COLORS[s.charAt(0).toUpperCase() + s.slice(1)] || "#333333";
        const { r, g, b } = hexToRgb(color);
        doc
          .fontSize(11)
          .font("Helvetica-Bold")
          .fillColor(r, g, b)
          .text(`${s.toUpperCase()}: `, { continued: true })
          .fillColor("#333333")
          .font("Helvetica")
          .text(`${count} finding${count !== 1 ? "s" : ""}`);
      });

      doc.moveDown(0.5);

      if (report.findingsSummary.topRisks.length > 0) {
        doc.font("Helvetica-Bold").fillColor("#333333").text("Top Risks:").moveDown(0.3);
        report.findingsSummary.topRisks.forEach((risk) => {
          doc.font("Helvetica").text(`• ${risk}`);
        });
      }

      // ─── DETAILED FINDINGS ───────────────────────────────────
      addSectionTitle(doc, "5. Detailed Findings");

      if (report.detailedFindings.length === 0) {
        doc
          .fontSize(11)
          .font("Helvetica")
          .fillColor("#228B22")
          .text("No vulnerabilities found. The contract appears to be secure.")
          .moveDown();
      } else {
        report.detailedFindings.forEach((finding, index) => {
          // Page break if needed
          if (doc.y > 680) doc.addPage();

          const severityColor = SEVERITY_COLORS[finding.severity] || "#333333";
          const { r, g, b } = hexToRgb(severityColor);

          // Finding header
          doc
            .fontSize(13)
            .font("Helvetica-Bold")
            .fillColor("#1a1a2e")
            .text(`${finding.id} — ${finding.title}`)
            .moveDown(0.3);

          // Severity and category
          doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fillColor(r, g, b)
            .text(`Severity: ${finding.severity.toUpperCase()}`, { continued: true });
          doc.fillColor("#666666").font("Helvetica").text(`   Category: ${finding.category}`);
          doc.moveDown(0.3);

          // Description
          doc.font("Helvetica-Bold").fillColor("#333333").text("Description:").moveDown(0.2);
          doc.font("Helvetica").text(finding.description).moveDown(0.3);

          // Affected code
          doc.font("Helvetica-Bold").fillColor("#333333").text("Affected Code:").moveDown(0.2);
          doc
            .font("Courier")
            .fontSize(10)
            .fillColor("#c0392b")
            .text(finding.affectedCode)
            .moveDown(0.3);

          // Recommendation — uses mixed text renderer
          doc
            .font("Helvetica-Bold")
            .fontSize(11)
            .fillColor("#333333")
            .text("Recommendation:")
            .moveDown(0.2);
          renderMixedText(doc, finding.recommendation);

          // Divider between findings
          if (index < report.detailedFindings.length - 1) {
            doc
              .moveTo(60, doc.y)
              .lineTo(535, doc.y)
              .strokeColor("#cccccc")
              .lineWidth(0.5)
              .stroke()
              .moveDown(0.5);
          }
        });
      }

      // ─── DISCLAIMER ──────────────────────────────────────────
      doc.addPage();
      addSectionTitle(doc, "6. Disclaimer");

      doc
        .fontSize(10)
        .font("Helvetica")
        .fillColor("#666666")
        .text(report.disclaimer.text)
        .moveDown(0.5);

      addKeyValue(doc, "Generated At", isoDate);
      addKeyValue(doc, "Analysis Scope", report.disclaimer.analysisScope);

      // Finalize
      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
};
