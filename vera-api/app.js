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

/**
 * Endpoint principal: fact-check d'une question.
 * Body attendu: { question: string, source?: 'chat' | 'tiktok' | 'telegram' | ... }
 */
app.post('/api/check', (req, res) => {
  const { question, source } = req.body || {};

  if (!question || typeof question !== 'string') {
    return res
      .status(400)
      .json({ error: 'Field "question" (string) is required.' });
  }

  const verdict = checkFact(question);
  let tweets = [];

  if (!verdict.isTrue) {
    tweets = generateMockTweets(question);
  }

  const record = {
    id: questionsHistory.length + 1,
    question,
    source: source || 'chat',
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

/**
 * Endpoint de healthcheck
 */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', count: questionsHistory.length });
});

// 👉 ICI : on branche les routes de stats de Sandra
app.use('/api/stats', statsRoutes);

module.exports = app;
