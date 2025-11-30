const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// "Base de données" en mémoire pour la démo
const questionsHistory = [];
let adminAccount = null;

/**
 * Fonction très simple de fact-check.
 * Tu pourras l'améliorer plus tard si tu veux.
 */
function checkFact(question) {
  const lower = question.toLowerCase().trim();

  // Exemples de règles débiles mais fun pour la démo :
  if (lower.includes('terre est plate')) {
    return {
      isTrue: false,
      reason: "Le consensus scientifique et les observations montrent que la Terre est (globalement) sphérique."
    };
  }

  if (lower.includes('trump est mort')) {
    return {
      isTrue: false,
      reason: "À la date d'aujourd'hui, aucune source fiable ne confirme la mort de Donald Trump."
    };
  }

  if (lower.includes('eau bout à 100') || lower.includes('eau bout a 100')) {
    return {
      isTrue: true,
      reason: "À pression atmosphérique normale, l'eau bout à environ 100°C."
    };
  }

  // Par défaut : on considère que c'est "vrai" mais avec une raison générique
  return {
    isTrue: true,
    reason: "Aucune contradiction évidente détectée avec les règles simples actuelles."
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
    return res.status(400).json({ error: 'Field "question" (string) is required.' });
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
app.get('/api/questions', (req, res) => {
  // on renvoie du plus récent au plus ancien
  const ordered = [...questionsHistory].reverse();
  res.json(ordered);
});

// Créer un compte admin (une seule fois)
app.post('/api/admin/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email et mot de passe requis.' });
  }

  if (adminAccount) {
    return res.status(400).json({
      success: false,
      message: 'Un compte admin existe déjà. Vous pouvez vous connecter.',
    });
  }

  adminAccount = { email, password };
  console.log('Admin créé :', adminAccount.email);

  return res.json({
    success: true,
    message: 'Compte admin créé avec succès.',
  });
});

// Connexion admin
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;

  if (!adminAccount) {
    return res.status(400).json({
      success: false,
      message: "Aucun compte admin n'existe encore. Créez-le d'abord.",
    });
  }

  if (email === adminAccount.email && password === adminAccount.password) {
    return res.json({
      success: true,
      token: 'VeraSuperAdminToken123',
      message: 'Connexion réussie.',
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Identifiants incorrects.',
  });
});


/**
 * Endpoint de healthcheck (optionnel mais pratique)
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', count: questionsHistory.length });
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Vera API running on port ${PORT}`);
});


