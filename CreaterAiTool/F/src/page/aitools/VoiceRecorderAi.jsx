import React, { useRef, useState, useEffect } from "react";

export default function VoiceRecorderAi() {
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [audioURL, setAudioURL] = useState(null);

  /* ---------------- TIMER ---------------- */

  useEffect(() => {
    if (recording && !paused) {
      timerRef.current = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [recording, paused]);

  const formatTime = (t) => {
    const m = String(Math.floor(t / 60)).padStart(2, "0");
    const s = String(t % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  /* ---------------- START ---------------- */

  const startRecording = async () => {
    try {
      setAudioURL(null);
      setTime(0);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      const recorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = handleStop;

      recorder.start();

      setRecording(true);
      setPaused(false);
    } catch (err) {
      console.error(err);
      alert("Microphone permission denied or not available.");
    }
  };

  /* ---------------- STOP ---------------- */

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();

    // fully stop mic
    streamRef.current?.getTracks().forEach((track) => track.stop());

    clearInterval(timerRef.current);

    setRecording(false);
    setPaused(false);
  };

  /* ---------------- PAUSE / RESUME ---------------- */

  const pauseRecording = () => {
    mediaRecorderRef.current?.pause();
    setPaused(true);
  };

  const resumeRecording = () => {
    mediaRecorderRef.current?.resume();
    setPaused(false);
  };

  /* ---------------- AFTER STOP ---------------- */

  const handleStop = async () => {
    const blob = new Blob(chunksRef.current, {
      type: "audio/webm",
    });

    const url = URL.createObjectURL(blob);
    setAudioURL(url);

    await runAIProcessing(blob);
  };

  /* ---------------- AI HOOK ---------------- */

  // underscore avoids ESLint unused warning

  const runAIProcessing = async (blob) => {
    void blob;
    console.log("🤖 Processing audio with AI...");
  };

  //   const runAIProcessing = async (_blob) => {
  //     console.log("🤖 Processing audio with AI...");

  //     // Example future use:
  //     // const formData = new FormData();
  //     // formData.append("file", _blob);
  //     // await fetch("/api/transcribe", { method: "POST", body: formData });

  //     await new Promise((r) => setTimeout(r, 1000));

  //     console.log("✅ Done");
  //   };

  /* ---------------- DOWNLOAD ---------------- */

  const downloadAudio = () => {
    if (!audioURL) return;

    const a = document.createElement("a");
    a.href = audioURL;
    a.download = "voice-recording.webm";
    a.click();
  };

  /* ---------------- CLEANUP ---------------- */

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      clearInterval(timerRef.current);
    };
  }, []);

  /* ---------------- UI ---------------- */

  return (
    <div style={styles.container}>
      <h2>🎙️ Voice Recorder AI</h2>

      <div style={styles.timer}>{formatTime(time)}</div>

      <div style={styles.buttons}>
        {!recording && (
          <button style={styles.start} onClick={startRecording}>
            Start
          </button>
        )}

        {recording && !paused && (
          <button style={styles.pause} onClick={pauseRecording}>
            Pause
          </button>
        )}

        {recording && paused && (
          <button style={styles.resume} onClick={resumeRecording}>
            Resume
          </button>
        )}

        {recording && (
          <button style={styles.stop} onClick={stopRecording}>
            Stop
          </button>
        )}
      </div>

      {audioURL && (
        <div style={{ marginTop: 20 }}>
          <audio src={audioURL} controls />
          <br />
          <button style={styles.download} onClick={downloadAudio}>
            Download Audio
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    fontFamily: "sans-serif",
    padding: 20,
    textAlign: "center",
  },
  timer: {
    fontSize: 28,
    marginBottom: 15,
    fontWeight: "bold",
  },
  buttons: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
  },
  start: {
    background: "#22c55e",
    padding: 10,
    border: "none",
    cursor: "pointer",
  },
  pause: {
    background: "#f59e0b",
    padding: 10,
    border: "none",
    cursor: "pointer",
  },
  resume: {
    background: "#3b82f6",
    padding: 10,
    border: "none",
    cursor: "pointer",
  },
  stop: {
    background: "#ef4444",
    padding: 10,
    border: "none",
    cursor: "pointer",
  },
  download: {
    marginTop: 10,
    padding: 10,
    cursor: "pointer",
  },
};
