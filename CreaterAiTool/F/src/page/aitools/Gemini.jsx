// https://aistudio.google.com/api-keys?project=gen-lang-client-0336150176

import React, { useState, useRef, useEffect } from "react";

const Gemini = () => {
  const API_KEY = "AIzaSyD9aaAElksCJgv2scFazWv_CN2LWK5zl6w";

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;

    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userText }] }],
          }),
        }
      );

      const data = await res.json();

      const botText =
        data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ||
        "No response";

      setMessages((prev) => [...prev, { role: "bot", text: botText }]);
    } catch (err) {
      console.error("Gemini API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.chatCard}>
        <div style={styles.header}>Gemini Clone</div>

        <div style={styles.chatArea}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                ...styles.msg,
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                background: m.role === "user" ? "#2563eb" : "#f1f5f9",
                color: m.role === "user" ? "white" : "black",
              }}
            >
              {m.text}
            </div>
          ))}

          {loading && <div style={styles.botTyping}>Typing...</div>}

          <div ref={endRef} />
        </div>

        <div style={styles.inputRow}>
          <textarea
            style={styles.input}
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
          />

          <button style={styles.btn} onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gemini;

const styles = {
  page: {
    height: "100%",
    background: "#f8fafc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  chatCard: {
    width: 5000,
    height: 700,
    background: "white",
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: 16,
    borderBottom: "1px solid #eee",
    fontWeight: 600,
  },
  chatArea: {
    flex: 1,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    overflowY: "auto",
  },
  msg: {
    padding: "10px 14px",
    borderRadius: 10,
    maxWidth: "75%",
    fontSize: 14,
    whiteSpace: "pre-wrap",
  },
  botTyping: {
    fontSize: 13,
    color: "#64748b",
  },
  inputRow: {
    display: "flex",
    gap: 10,
    padding: 12,
    borderTop: "1px solid #eee",
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    border: "1px solid #ddd",
    padding: 10,
    resize: "none",
    outline: "none",
  },
  btn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "0 18px",
    borderRadius: 8,
    cursor: "pointer",
  },
};
