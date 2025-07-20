import React, { useState, useEffect } from "react";

export default function SpeechBox() {
  const [text, setText] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedLang, setSelectedLang] = useState("en-US");

  useEffect(() => {
    const loadVoices = () => {
      const synthVoices = speechSynthesis.getVoices();
      if (synthVoices.length > 0) {
        setVoices(synthVoices);
      }
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const handleSpeak = () => {
    if (!text.trim()) return;
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.lang === selectedLang);
    if (voice) utterance.voice = voice;
    utterance.lang = selectedLang;
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);
    speechSynthesis.speak(utterance);
  };

  const handleListen = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = selectedLang;
    recognition.start();
    recognition.onresult = (event) => {
      setText(event.results[0][0].transcript);
    };
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 mt-8 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">🎙️ Speech Tools</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or speak something..."
        className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white"
      />

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className="border px-3 py-2 rounded bg-white dark:bg-gray-900 dark:border-gray-600 dark:text-white"
        >
          <option value="en-US">English (US)</option>
          <option value="hi-IN">Hindi</option>
          <option value="es-ES">Spanish</option>
          <option value="fr-FR">French</option>
          <option value="de-DE">German</option>
          <option value="ja-JP">Japanese</option>
        </select>

        <button
          onClick={handleListen}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          🎤 Listen
        </button>

        <button
          onClick={handleSpeak}
          disabled={speaking}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          🔊 {speaking ? "Speaking..." : "Speak"}
        </button>
      </div>
    </div>
  );
}
