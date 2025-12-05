// app.js (version ES MODULES)
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// Routes stats (Sandra)
import statsRoutes from "./routes/statsRoutes.js";

const app = express();

/* -----------------------------------------------------
   🔧 CORS CONFIG (IMPORTANT POUR FRONT + VERCEL + RENDER)
------------------------------------------------------ */
const allowedOrigins = [
  "http://localhost:4200",

  // 🌐 Domaine principal Vercel
  "https://vera-groupe-2.vercel.app",

  // 🌐 Domaines de build Vercel (copie EXACTE depuis ton screenshot)
  "https://vera-frontend-only-git-main-nours-projects-3122eb4b.vercel.app",
  "https://vera-frontend-only-3lepye7wh-nours-projects-3122eb4b.vercel.app"
];

// 🛡️ CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Requêtes sans origin (Postman, curl…) -> OK
      if (!origin) return callback(null, true);

      // Autoriser localhost pour le dev
      if (origin === "http://localhost:4200") {
        return callback(null, true);
      }

      // ✅ Autoriser tous les frontends déployés sur Vercel
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      console.warn("[CORS] Origin non autorisée :", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Pour les preflight OPTIONS
app.options("*", cors());

// Middlewares
app.use(express.json());

/* -----------------------------------------------------
   🔧 BASE DE DONNÉES EN MÉMOIRE
------------------------------------------------------ */
const questionsHistory = [];

// 🔐 Admin fixe
const ADMIN_EMAIL = "admin";
const ADMIN_PASS = "vera123";

/* -----------------------------------------------------
   FONCTIONS
------------------------------------------------------ */
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
    `😅 On est encore en 2025 et quelqu'un demande: "${question}"...`,
    `🤔 Un petit tour sur un site fiable aurait évité cette question: "${question}"`,
    `📉 Niveau fact-check: besoin d'un boost après: "${question}"`,
  ];
}

/* -----------------------------------------------------
   ENDPOINT PRINCIPAL
------------------------------------------------------ */
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

/* -----------------------------------------------------
   ENDPOINT DASHBOARD
------------------------------------------------------ */
app.get("/api/questions", (_req, res) => {
  const ordered = [...questionsHistory].reverse();
  res.json(ordered);
});

/* -----------------------------------------------------
   LOGIN ADMIN
------------------------------------------------------ */
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body || {};

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

/* -----------------------------------------------------
   HEALTHCHECK
------------------------------------------------------ */
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", count: questionsHistory.length });
});

/* -----------------------------------------------------
   ROUTES STATS
------------------------------------------------------ */
app.use("/api/stats", statsRoutes);

/* -----------------------------------------------------
   EXPORT
------------------------------------------------------ */
export default app;

