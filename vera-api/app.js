require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { supabase } = require('./database/supabaseClient');
const statsRoutes = require('./routes/statsRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const questionsHistory = [];

function checkFact(question) {
  const lower = question.toLowerCase().trim();

  if (lower.includes('terre est plate')) {
    return {
      isTrue: false,
      reason: 'Le consensus scientifique montre que la Terre est (globalement) sphérique.',
    };
  }

  if (lower.includes('trump est mort')) {
    return {
      isTrue: false,
      reason: "A la date d'aujourd'hui, aucune source fiable ne confirme la mort de Donald Trump.",
    };
  }

  if (lower.includes('eau bout à 100') || lower.includes('eau bout a 100')) {
    return {
      isTrue: true,
      reason: "A pression atmosphérique normale, l'eau bout à environ 100°C.",
    };
  }

  return {
    isTrue: true,
    reason: 'Aucune contradiction évidente détectée avec les règles simples actuelles.',
  };
}

function generateMockTweets(question) {
  return [
    `Encore en 2025 et quelqu'un demande: "${question}"...`,
    `Un petit tour sur un site fiable aurait évité cette question: "${question}"`,
    `Niveau fact-check: besoin d'un boost après: "${question}"`,
  ];
}

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

app.get('/api/questions', (_req, res) => {
  const ordered = [...questionsHistory].reverse();
  res.json(ordered);
});

async function handleSupabaseLogin(req, res) {
  const { email, password } = req.body || {};

  console.log('[API] /api/auth/login body =', req.body);

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email et mot de passe requis.',
    });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return res.status(401).json({
        success: false,
        message: error.message || 'Identifiants incorrects.',
      });
    }

    const token =
      data?.session?.access_token ||
      data?.session?.provider_token ||
      data?.session?.refresh_token ||
      'VeraSupabaseToken';

    return res.json({
      success: true,
      token,
      user: data?.user,
      session: data?.session,
      message: 'Connexion réussie via Supabase.',
    });
  } catch (err) {
    console.error('Erreur Supabase login:', err);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la connexion.',
    });
  }
}

app.post('/api/admin/login', handleSupabaseLogin);
app.post('/api/auth/login', handleSupabaseLogin);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', count: questionsHistory.length });
});

app.use('/api/stats', statsRoutes);

module.exports = app;
