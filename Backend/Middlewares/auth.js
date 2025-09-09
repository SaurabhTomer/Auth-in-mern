
const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Authorization header:", authHeader);

  if (!authHeader) {
    return res.status(403).json({
      message: "Unauthorized: JWT token is required",
    });
  }

  // Expecting: "Bearer <token>"
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(403).json({
      message: "Unauthorized: Invalid token format",
    });
  }

  const token = parts[1]; // sirf token nikaal lo

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded payload ko request me daal do
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Unauthorized: JWT token is wrong or expired",
    });
  }
};

module.exports = { ensureAuthenticated };
