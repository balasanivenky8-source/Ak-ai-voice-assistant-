export async function sendToBrain({
  message,
  history = []
}) {

  const response = await fetch("/api/chat", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      message,
      history,
      language: "en"
    })
  });

  if (!response.ok) {
    throw new Error("Brain API failed");
  }

  return response.json();
}
