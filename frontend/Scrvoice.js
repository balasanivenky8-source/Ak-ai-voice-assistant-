let recognition;

export function startListening() {

  return new Promise((resolve, reject) => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      reject(
        new Error(
          "Speech recognition is not supported"
        )
      );

      return;
    }

    recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = event => {

      const text =
        event.results[0][0].transcript;

      resolve(text);
    };

    recognition.onerror = error => {
      reject(error);
    };

    recognition.start();
  });
}


export function speak(text, language = "en-IN") {

  if (!("speechSynthesis" in window)) {
    return;
  }

  speechSynthesis.cancel();

  const utterance =
    new SpeechSynthesisUtterance(text);

  utterance.lang = language;
  utterance.rate = 1;
  utterance.pitch = 1;

  speechSynthesis.speak(utterance);
}
