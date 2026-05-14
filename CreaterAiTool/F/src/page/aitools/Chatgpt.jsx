// ChatGPT.jsx
import { useState } from "react";

export default function ChatGPT() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMsg = { role: "user", content: message };

    const updatedChat = [...chat, userMsg];
    setChat(updatedChat);

    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedChat,
        }),
      });

      const data = await res.json();

      const botReply =
        data?.choices?.[0]?.message?.content || "No response from GPT";

      setChat((prev) => [...prev, { role: "assistant", content: botReply }]);
    } catch (error) {
      console.log(error);

      setChat((prev) => [
        ...prev,
        { role: "assistant", content: "Server Error ❌" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>ChatGPT</h2>

      <div
        style={{
          minHeight: 300,
          border: "1px solid #ddd",
          padding: 10,
          marginBottom: 10,
          overflowY: "auto",
        }}
      >
        {chat.map((msg, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <b>{msg.role}:</b> {msg.content}
          </div>
        ))}

        {loading && <p>Thinking... 🤖</p>}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Ask something..."
        style={{ width: "75%", padding: 8 }}
      />

      <button
        onClick={sendMessage}
        style={{ padding: "8px 12px", marginLeft: 10 }}
      >
        Send 🚀
      </button>
    </div>
  );
}
