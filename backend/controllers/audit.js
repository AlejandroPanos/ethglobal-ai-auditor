/* Generate controllers */
exports.sendCode = async (req, res) => {
  try {
    res.status(200).json({ msg: "Code sent!" });
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
