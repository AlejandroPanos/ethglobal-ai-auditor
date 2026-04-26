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
