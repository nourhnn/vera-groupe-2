// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Routes stats (Sandra)
const statsRoutes = require('./routes/statsRoutes');

const app = express();

// 🔧 Middlewares
app.use(cors());
app.use(express.json());

// "Base de données" en mémoire pour la démo (tes questions)
const questionsHistory = [];

// 🔐 Admin fixe pour le projet
const ADMIN_EMAIL = 'admin'; // tu peux garder le label "Email" dans le form
const ADMIN_PASS = 'vera123';

/**
 * Fonction très simple de fact-check.
 */
function checkFact(question) {
  const lower = question.toLowerCase().trim();

  if (lower.includes('terre est plate')) {
    return {
      isTrue: false,
      reason:
        'Le consensus scientifique et les observations montrent que la Terre est (globalement) sphérique.',
    };
  }

  if (lower.includes('trump est mort')) {
    return {
      isTrue: false,
      reason:
        "À la date d'aujourd'hui, aucune source fiable ne confirme la mort de Donald Trump.",
    };
  }

  if (lower.includes('eau bout à 100') || lower.includes('eau bout a 100')) {
    return {
      isTrue: true,
      reason:
        "À pression atmosphérique normale, l'eau bout à environ 100°C.",
    };
  }

  // Par défaut
  return {
    isTrue: true,
    reason:
      'Aucune contradiction évidente détectée avec les règles simples actuelles.',
  };
}

/**
 * Génère des tweets moqueurs si l'info est fausse.
 */
function generateMockTweets(question) {
  return [
    `😅 On est encore en 2025 et quelqu'un demande: "${question}"...`,
    `🤔 Un petit tour sur un site fiable aurait évité cette question: "${question}"`,
    `📉 Niveau fact-check: besoin d'un boost après: "${question}"`,
  ];
}

app.post('/api/check', (req, res) => {
  const { question, source } = req.body || {};

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Field "question" (string) is required.' });
  }

  const lower = question.toLowerCase().trim();
  let verdict = { isTrue: true, reason: "", sources: [] };

  // EXEMPLES DE RÈGLES (à enrichir)
  if (lower.includes("terre est plate")) {
    verdict = {
      isTrue: false,
      reason: "La Terre est globalement sphérique selon toutes les observations scientifiques.",
      sources: [
        "https://www.nasa.gov/topics/earth/index.html",
        "https://www.cnrs.fr/fr/cnrsinfo/la-terre-est-ronde"
      ]
    };
  }

  else if (lower.includes("trump est mort")) {
    verdict = {
      isTrue: false,
      reason: "Aucune source fiable ne confirme la mort de Donald Trump.",
      sources: [
        "https://www.reuters.com/fact-check/",
        "https://factcheck.org/"
      ]
    };
  }

  else if (lower.includes("eau bout")) {
    verdict = {
      isTrue: true,
      reason: "À pression atmosphérique normale, l’eau bout à 100°C.",
      sources: [
        "https://www.britannica.com/science/boiling-point",
        "https://education.nationalgeographic.org/resource/water/"
      ]
    };
  }

  else {
    verdict = {
      isTrue: true,
      reason: "Je n’ai pas détecté d’élément faussement attribué dans cette question.",
      sources: [
        "https://google.com/search?q=" + encodeURIComponent(question),
        "https://www.reuters.com/fact-check/"
      ]
    };
  }

  // tweets humoristiques si c’est faux
  let tweets = [];
  if (!verdict.isTrue) {
    tweets = generateMockTweets(question);
  }

  // objet final
  const record = {
    id: questionsHistory.length + 1,
    question,
    source: source || 'chat',
    isTrue: verdict.isTrue,
    reason: verdict.reason,
    sources: verdict.sources,
    tweets,
    createdAt: new Date().toISOString(),
  };

  questionsHistory.push(record);

  return res.json(record);
});


/**
 * Endpoint pour le dashboard: liste des questions
 */
app.get('/api/questions', (_req, res) => {
  const ordered = [...questionsHistory].reverse(); // plus récent en premier
  res.json(ordered);
});

/**
 * Connexion admin (identifiants fixes)
 * Body attendu: { email: string, password: string }
 */
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body || {};

  console.log('[API] /api/admin/login body =', req.body);

  // Champs manquants → 400
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email et mot de passe requis.',
    });
  }

  // Bons identifiants
  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    return res.json({
      success: true,
      token: 'VeraSuperAdminToken123',
      message: 'Connexion réussie.',
    });
  }

  // Mauvais identifiants → 401
  return res.status(401).json({
    success: false,
    message: 'Identifiants incorrects.',
  });
});

import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });

app.post("/api/vera/factcheck", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({
      error: "Champ 'question' obligatoire."
    });
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Tu es Vera, une IA de fact-checking. Tu dois analyser la véracité d’une affirmation, renvoyer un verdict (vrai/faux/indéterminé), expliquer clairement, et fournir 3 à 5 sources fiables (Reuters, AP News, AFP Factuel, WHO, ONU, CNRS). Pas de ton agressif. Style journalistique."
        },
        {
          role: "user",
          content: question
        }
      ]
    });

    const result = response.choices[0].message.content;

    // Format JSON intelligent
    const parsed = JSON.parse(result);

    return res.json(parsed);

  } catch (error) {
    console.error("API Fact-check ERROR: ", error);
    return res.status(500).json({
      error: "Erreur interne de l'analyse fact-check."
    });
  }
});


/**
 * Endpoint de healthcheck
 */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', count: questionsHistory.length });
});

// 👉 ICI : on branche les routes de stats de Sandra
app.use('/api/stats', statsRoutes);

module.exports = app;