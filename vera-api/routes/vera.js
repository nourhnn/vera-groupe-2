const express = require("express");
const router = express.Router();

router.post("/check", (req, res) => {
  const { question } = req.body;

  // Réponse factice pour test Telegram
  res.json({
    isTrue: false,
    reason: `Voici la réponse à ta question : "${question}".`,
    tweets: []
  });
});

module.exports = router;
