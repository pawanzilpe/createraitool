import React, { useEffect, useState, useRef, useCallback } from "react";

const VoiceControlledAI = () => {
  const [listening, setListening] = useState(false);
  const [command, setCommand] = useState("");
  const [response, setResponse] = useState("");

  const recognitionRef = useRef(null);

  // 🔊 Voice reply
  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  // ✅ Command handler
  const handleCommand = useCallback(async (cmd) => {
    console.log("Command:", cmd);

    if (cmd.includes("open google")) {
      window.open("https://google.com");
      setResponse("Opening Google");
      speak("Opening Google");
    }

    if (cmd.includes("open youtube")) {
      window.open("https://youtube.com");
      setResponse("Opening YouTube");
      speak("Opening YouTube");
    }

    if (cmd.includes("open camera")) {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setResponse("Opening camera");
        speak("Opening camera");
      } catch {
        setResponse("Camera permission denied");
      }
    }

    if (cmd.includes("scroll down")) {
      window.scrollBy({ top: 500, behavior: "smooth" });
    }

    if (cmd.includes("scroll up")) {
      window.scrollBy({ top: -500, behavior: "smooth" });
    }

    if (cmd.includes("copy text")) {
      const text = document.body.innerText;
      await navigator.clipboard.writeText(text);
      setResponse("Text copied");
      speak("Text copied");
    }

    if (cmd.includes("login page")) {
      const code = `
<!DOCTYPE html>
<html>
<head><title>Login</title></head>
<body>
  <h2>Login</h2>
  <input placeholder="Username" /><br/>
  <input type="password" placeholder="Password"/><br/>
  <button>Login</button>
</body>
</html>`;
      setResponse(code);
      speak("Here is your login page code");
    }

    if (
      cmd.includes("shutdown") ||
      cmd.includes("open notepad") ||
      cmd.includes("open terminal")
    ) {
      await fetch("http://localhost:5000/command", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command: cmd }),
      });

      setResponse("Executing system command...");
      speak("Executing command");
    }
  }, []);

  // 🎤 Setup Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;

      setCommand(transcript);
      handleCommand(transcript.toLowerCase());
    };

    // 🔥 Auto-restart if still listening
    recognition.onend = () => {
      if (listening) {
        try {
          recognition.start();
        } catch (e) {
          console.log("Restart prevented:", e);
        }
      }
    };

    recognition.onerror = (event) => {
      console.log("Speech error:", event.error);
    };

    recognitionRef.current = recognition;
  }, [handleCommand, listening]);

  // ▶️ Start listening (SAFE)
  const startListening = () => {
    if (!recognitionRef.current || listening) return;

    try {
      recognitionRef.current.start();
      setListening(true);
    } catch {
      console.log("Already started");
    }
  };

  // ⏹ Stop listening
  const stopListening = () => {
    if (!recognitionRef.current || !listening) return;

    recognitionRef.current.stop();
    setListening(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🤖 Jarvis AI Assistant</h1>

      <button onClick={startListening} disabled={listening}>
        Start
      </button>

      <button onClick={stopListening} disabled={!listening}>
        Stop
      </button>

      <p>
        <strong>Listening:</strong> {listening ? "Yes" : "No"}
      </p>
      <p>
        <strong>Command:</strong> {command}
      </p>

      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: 10,
          minHeight: "100px",
        }}
      >
        {response}
      </pre>
    </div>
  );
};

export default VoiceControlledAI;
