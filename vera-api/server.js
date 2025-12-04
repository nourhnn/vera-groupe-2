import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import "./telegram.js"; // lance le bot

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Vera API running on http://localhost:${PORT}`);
});
