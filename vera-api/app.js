// app.js (version ES MODULES)
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// Routes stats (Sandra)
import statsRoutes from "./routes/statsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

const questionsHistory = [];

// 🔐 Admin fixe pour le projet
const ADMIN_EMAIL = "admin"; 
const ADMIN_PASS = "vera123";

/**
 * Fonction très simple de fact-check.
 */
function checkFact(question) {
  const lower = question.toLowerCase().trim();

  if (lower.includes("terre est plate")) {
    return {
      isTrue: false,
      reason:
        "Le consensus scientifique et les observations montrent que la Terre est (globalement) sphérique.",
    };
  }

  if (lower.includes("trump est mort")) {
    return {
      isTrue: false,
      reason:
        "Aucune source fiable ne confirme la mort de Donald Trump.",
    };
  }

  if (lower.includes("eau bout à 100") || lower.includes("eau bout a 100")) {
    return {
      isTrue: true,
      reason: "À pression atmosphérique normale, l'eau bout à environ 100°C.",
    };
  }

  return {
    isTrue: true,
    reason:
      "Aucune contradiction évidente détectée avec les règles simples actuelles.",
  };
}

function generateMockTweets(question) {
  return [
    `Encore en 2025 et quelqu'un demande: "${question}"...`,
    `Un petit tour sur un site fiable aurait évité cette question: "${question}"`,
    `Niveau fact-check: besoin d'un boost après: "${question}"`,
  ];
}

/**
 * Endpoint principal: fact-check d'une question.
 * Body attendu: { question: string }
 */
app.post("/api/check", (req, res) => {
  const { question, source } = req.body || {};

  if (!question || typeof question !== "string") {
    return res
      .status(400)
      .json({ error: 'Field "question" (string) is required.' });
  }

  const verdict = checkFact(question);
  let tweets = verdict.isTrue ? [] : generateMockTweets(question);

  const record = {
    id: questionsHistory.length + 1,
    question,
    source: source || "chat",
    isTrue: verdict.isTrue,
    reason: verdict.reason,
    tweets,
    createdAt: new Date().toISOString(),
  };

  questionsHistory.push(record);

  return res.json(record);
});

/**
 * Endpoint pour le dashboard: liste des questions
 */
app.get("/api/questions", (_req, res) => {
  const ordered = [...questionsHistory].reverse(); // plus récent en premier
  res.json(ordered);
});

/**
 * Connexion admin
 */
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body || {};

  console.log("[API] /api/admin/login body =", req.body);

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email et mot de passe requis.",
    });
  }

  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    return res.json({
      success: true,
      token: "VeraSuperAdminToken123",
      message: "Connexion réussie.",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Identifiants incorrects.",
  });
});

/**
 * Endpoint de healthcheck
 */
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", count: questionsHistory.length });
});

// 👉 Brancher les routes stats
app.use("/api/stats", statsRoutes);

// Export ES module
export default app;
