import express from "express";
import axios from "axios";
const router = express.Router();

router.post("/", async (req, res) => {
  const { message, userId } = req.body;

  try {
    // 👉 APPEL À TON API VERA (IA)
    const aiResponse = await axios.post("https://api.vera.ai/chat", {
      message: message,
      user: userId
    });

    res.json({
      reply: aiResponse.data.reply
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Erreur avec l'IA VERA." });
  }
});

export default router;
