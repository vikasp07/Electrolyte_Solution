// middleware/auth.js
module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const validToken = process.env.ADMIN_TOKEN || "admin-token-12345";

  if (!token) return res.status(401).json({ message: "No token provided" });

  if (token !== validToken) {
    return res.status(401).json({ message: "Invalid token" });
  }

  req.admin = { email: process.env.ADMIN_EMAIL || "admin@electrolyte.com" };
  next();
};
