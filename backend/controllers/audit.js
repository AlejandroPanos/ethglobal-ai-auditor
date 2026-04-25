/* Generate controllers */
exports.sendCode = async (req, res) => {
  try {
    console.log("Code sent!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.retrieveAudit = async (req, res) => {
  try {
    console.log("Audit retrieved!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
