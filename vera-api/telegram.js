import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import axios from "axios";

const token = process.env.TELEGRAM_TOKEN;

// Vérification du token
if (!token) {
  console.error("❌ TELEGRAM_TOKEN manquant dans le .env");
  process.exit(1);
}

// Création du bot
const bot = new TelegramBot(token, { polling: true });

console.log("🤖 Bot Telegram connecté et en écoute !");

// Réception des messages
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const question = msg.text;

  try {
    // Appel de ton API /api/check
    const response = await axios.post("http://localhost:3000/api/check", {
      question,
      source: "telegram",
    });

    const data = response.data;

    let message = `🟦 *Fact-check :*\n\n`;
    message += data.isTrue
      ? `✔️ C'est vrai.\n\n${data.reason}`
      : `❌ C'est faux.\n\n${data.reason}`;

    await bot.sendMessage(chatId, message, { parse_mode: "Markdown" });

    // Si c’est faux → envoyer les tweets moqueurs
    if (!data.isTrue && data.tweets && data.tweets.length > 0) {
      for (const t of data.tweets) {
        await bot.sendMessage(chatId, t);
      }
    }
  } catch (err) {
    console.error("Erreur Telegram →", err.message);
    bot.sendMessage(chatId, "❌ Erreur serveur. Réessaie plus tard.");
  }
});

// ➜ Export ES MODULES
export default bot;
