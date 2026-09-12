import { sendToBrain } from "./brain.js";
import {
  startListening,
  speak
} from "./voice.js";

const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const micButton = document.getElementById("micButton");
const messages = document.getElementById("messages");
const status = document.getElementById("status");

let history = [];

function addMessage(role, text) {

  const element = document.createElement("div");

  element.className = `message ${role}`;

  element.textContent = text;

  messages.appendChild(element);

  messages.scrollTop = messages.scrollHeight;
}

async function processMessage(message) {

  if (!message.trim()) return;

  addMessage("user", message);

  input.value = "";

  status.textContent = "JARVIS THINKING...";

  try {

    const result = await sendToBrain({
      message,
      history
    });

    addMessage("assistant", result.reply);

    history.push({
      role: "user",
      content: message
    });

    history.push({
      role: "assistant",
      content: result.reply
    });

    speak(result.reply);

    status.textContent = "SYSTEM READY";

  } catch (error) {

    console.error(error);

    addMessage(
      "assistant",
      "I encountered a system error."
    );

    status.textContent = "SYSTEM ERROR";
  }
}

sendButton.addEventListener("click", () => {
  processMessage(input.value);
});

input.addEventListener("keydown", event => {

  if (event.key === "Enter") {
    processMessage(input.value);
  }

});

micButton.addEventListener("click", async () => {

  status.textContent = "LISTENING...";

  const text = await startListening();

  if (text) {
    processMessage(text);
  }

  status.textContent = "SYSTEM READY";
});
