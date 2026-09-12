import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("client"));

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [], language = "en" } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    /*
      Connect your AI provider here.

      IMPORTANT:
      Keep the provider API key on the server.
      Never place the secret directly inside index.html.
    */

    const reply = await jarvisBrain({
      message,
      history,
      language
    });

    res.json({
      success: true,
      reply
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "JARVIS brain error"
    });
  }
});

async function jarvisBrain({ message, history, language }) {

  // Replace this section with your chosen AI API.
  // The architecture intentionally keeps the provider separate.

  return `JARVIS received: ${message}`;
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`JARVIS running at http://localhost:${PORT}`);
});
