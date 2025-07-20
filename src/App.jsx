import React from "react";
import SpeechBox from "./components/SpeechBox";

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          🗣️ Real-Time Speech Translator
        </h1>
        <SpeechBox />
      </div>
    </div>
  );
}
