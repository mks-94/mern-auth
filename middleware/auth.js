const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken)
      return res
        .status(401)
        .json({ msg: "Verification token failed, authorization denied." });

    req.user = verifyToken.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
