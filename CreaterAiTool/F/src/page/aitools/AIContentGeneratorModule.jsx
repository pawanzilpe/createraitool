import React, { useState } from "react";

// Plain JavaScript React Component (no TypeScript)
export default function AIContentGeneratorModule() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateContent = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!response.ok) {
        throw new Error("Server error while generating content");
      }

      const data = await response.json();

      if (!data || !data.output) {
        throw new Error("Invalid response from server");
      }

      setResult(data.output);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      generateContent();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">AI Content Generator</h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your prompt here... (Ctrl + Enter to generate)"
        className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        rows={5}
      />

      <button
        onClick={generateContent}
        disabled={loading}
        className="bg-black text-white px-5 py-2 rounded-lg hover:opacity-80 disabled:opacity-50 transition"
      >
        {loading ? "Generating..." : "Generate Content"}
      </button>

      {error && <div className="mt-4 text-red-500 font-medium">⚠ {error}</div>}

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg whitespace-pre-wrap relative">
          <button
            onClick={() => navigator.clipboard.writeText(result)}
            className="absolute top-2 right-2 text-sm bg-black text-white px-2 py-1 rounded"
          >
            Copy
          </button>
          {result}
        </div>
      )}
    </div>
  );
}
