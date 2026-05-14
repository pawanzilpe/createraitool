import React, { useState } from "react";

export default function EmailAi() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [template, setTemplate] = useState("Custom");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------------- TEMPLATES ---------------- */

  const templates = {
    Custom: "",
    "Job Application": "Applying for a job position",
    "Leave Request": "Requesting leave for personal reasons",
    "Meeting Request": "Requesting a meeting schedule",
    "Follow Up": "Following up on previous conversation",
  };

  /* ---------------- GENERATE EMAIL ---------------- */

  const generateEmail = async () => {
    const finalTopic = template === "Custom" ? topic : templates[template];

    if (!finalTopic.trim()) return alert("Enter email topic first");

    setLoading(true);
    setResult("");

    try {
      /* 🔥 CONNECT YOUR BACKEND HERE (OpenAI / Gemini etc)

      const res = await fetch("/api/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: finalTopic,
          tone,
        }),
      });

      const data = await res.json();
      setResult(data.text);

      */

      // Demo fallback (remove when backend added)
      await new Promise((r) => setTimeout(r, 1200));

      setResult(`Subject: ${finalTopic}

Hi,

I hope you're doing well.

I am writing regarding ${finalTopic}. Please let me know a convenient time to discuss further.

Thank you for your time.

Best regards,
Your Name`);
    } catch (err) {
      console.error(err);
      alert("Failed to generate email");
    }

    setLoading(false);
  };

  /* ---------------- COPY ---------------- */

  const copyEmail = async () => {
    await navigator.clipboard.writeText(result);
    alert("Copied ✅");
  };

  /* ---------------- DOWNLOAD ---------------- */

  const downloadEmail = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "email.txt";
    a.click();
  };

  /* ---------------- CLEAR ---------------- */

  const clearAll = () => {
    setTopic("");
    setResult("");
    setTemplate("Custom");
  };

  /* ---------------- UI ---------------- */

  return (
    <div style={styles.container}>
      <h2>📧 Email AI Generator</h2>

      {/* Template */}
      <select
        style={styles.input}
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
      >
        {Object.keys(templates).map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>

      {/* Topic */}
      {template === "Custom" && (
        <input
          style={styles.input}
          placeholder="What is this email about?"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      )}

      {/* Tone */}
      <select
        style={styles.input}
        value={tone}
        onChange={(e) => setTone(e.target.value)}
      >
        <option>Professional</option>
        <option>Formal</option>
        <option>Friendly</option>
        <option>Casual</option>
      </select>

      {/* Generate */}
      <button style={styles.generate} onClick={generateEmail}>
        {loading ? "Generating..." : "Generate Email"}
      </button>

      {/* Result */}
      {result && (
        <>
          <textarea style={styles.output} value={result} readOnly />

          <div style={styles.actions}>
            <button style={styles.copy} onClick={copyEmail}>
              Copy
            </button>

            <button style={styles.download} onClick={downloadEmail}>
              Download
            </button>

            <button style={styles.clear} onClick={clearAll}>
              Clear
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    fontFamily: "sans-serif",
    maxWidth: 600,
    margin: "auto",
    padding: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },
  generate: {
    width: "100%",
    padding: 10,
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginBottom: 15,
  },
  output: {
    width: "100%",
    height: 200,
    padding: 10,
    marginBottom: 10,
  },
  actions: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
  },
  copy: {
    background: "#22c55e",
    padding: 8,
    border: "none",
    cursor: "pointer",
  },
  download: {
    background: "#f59e0b",
    padding: 8,
    border: "none",
    cursor: "pointer",
  },
  clear: {
    background: "#ef4444",
    padding: 8,
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
};
