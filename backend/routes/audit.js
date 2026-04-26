/* Create imports */
const express = require("express");
const router = express.Router();
const auditControllers = require("../controllers/audit");

/* Create routes */
router.post("/", auditControllers.generateAudit);
router.get("/:rootHash", auditControllers.retrieveAudit);

/* Export routes */
module.exports = router;
