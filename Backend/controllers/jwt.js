import jwt from "jsonwebtoken";
import "dotenv/config";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.sendStatus(401).join("You are not authenticated");

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
    if (error) return res.sendStatus(403).join("You are not authenticated");
    req.user = user;
    next();
  });
};
