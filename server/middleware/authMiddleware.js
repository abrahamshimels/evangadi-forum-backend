const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function authMiddleware(req, res, next) {
  const requestPath = `${req.method} ${req.originalUrl}`;
  const authHeader = req.headers?.authorization;
  const authPrefix = authHeader ? authHeader.split(" ")[0] : "none";

  console.log(`[auth] ${requestPath} -> auth header prefix: ${authPrefix}`);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn(`[auth] ${requestPath} -> missing/invalid Authorization header`);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication is invalid" });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error(`[auth] ${requestPath} -> JWT_SECRET is not set`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server configuration error" });
  }

  console.log(
    `[auth] ${requestPath} -> token length: ${token ? token.length : 0}`
  );

  try {
    const { username, userid } = jwt.verify(token, secret);
    console.log(
      `[auth] ${requestPath} -> verify success for userid=${userid}, username=${username}`
    );
    // Attach user info to request object
    req.user = { username, userid };
    next();
  } catch (error) {
    console.error(
      `[auth] ${requestPath} -> verify failed: ${error.name}: ${error.message}`
    );
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid", error: error.message });
  }
}

module.exports = authMiddleware;
