import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",");
app.use(cors({
  origin: allowedOrigins && allowedOrigins.length > 0 ? allowedOrigins : false,
  credentials: true,
}));
app.use(express.json());

// better-auth handler - mount at /api/auth
app.all("/api/auth/*", toNodeHandler(auth));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
