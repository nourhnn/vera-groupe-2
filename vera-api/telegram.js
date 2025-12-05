import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import axios from "axios";

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const question = msg.text;

  // Si le message n'est pas du texte
  if (typeof question !== "string") {
    return bot.sendMessage(
      chatId,
      "Merci d’envoyer une *question en texte* 📩",
      { parse_mode: "Markdown" }
    );
  }

  try {
    // 🔥 Appel de TON API VERA
    const res = await axios.post("http://localhost:3000/api/check", {
      question,
      source: "telegram",
    });

    const data = res.data;

    // 🏷️ Verdict formaté
    const verdict = data.isTrue
      ? "✔️ *VRAI*"
      : "❌ *FAUX*";

    // 📚 Sources formatées
    const sources = data.sources && data.sources.length > 0
      ? data.sources.map((s) => `• ${s}`).join("\n")
      : "Aucune source fiable trouvée.";

    // 📩 Message PRO
    const message =
`${verdict}

🧠 *Analyse :*
${data.reason}

🔎 *Sources :*
${sources}

──────
Réponse générée par *Vera – Outil de vérification des faits*`;

    // Envoi du message
    await bot.sendMessage(chatId, message, { parse_mode: "Markdown" });

  } catch (err) {
    console.error("Erreur Telegram:", err.message);
    bot.sendMessage(chatId, "⚠️ Erreur interne. Réessayez plus tard.");
  }
});
