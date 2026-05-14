import React, { useRef, useState, useEffect } from "react";

export default function ScreenRecorderAI() {
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const webcamRef = useRef(null);
  const streamRef = useRef(null);

  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [videoURL, setVideoURL] = useState(null);
  const [useWebcam, setUseWebcam] = useState(false);

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

  /* ---------------- START RECORDING ---------------- */

  const startRecording = async () => {
    try {
      setVideoURL(null);
      setTime(0);

      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      const micStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      let tracks = [...screenStream.getTracks(), ...micStream.getAudioTracks()];

      // 📸 Webcam (optional)
      if (useWebcam) {
        const camStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        webcamRef.current.srcObject = camStream;
        tracks.push(...camStream.getVideoTracks());
      }

      const combinedStream = new MediaStream(tracks);
      streamRef.current = combinedStream;

      const recorder = new MediaRecorder(combinedStream, {
        mimeType: "video/webm;codecs=vp9",
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
      alert("Permission denied or device not available.");
    }
  };

  /* ---------------- STOP ---------------- */

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();

    streamRef.current?.getTracks().forEach((t) => t.stop());

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
      type: "video/webm",
    });

    const url = URL.createObjectURL(blob);
    setVideoURL(url);

    await runAIProcessing(); // no unused var now
  };

  /* ---------------- AI PROCESSING ---------------- */

  const runAIProcessing = async () => {
    console.log("🤖 AI processing video...");

    // connect backend here if needed

    await new Promise((r) => setTimeout(r, 1500));

    console.log("✅ Done");
  };

  /* ---------------- DOWNLOAD ---------------- */

  const downloadVideo = () => {
    if (!videoURL) return;

    const a = document.createElement("a");
    a.href = videoURL;
    a.download = "screen-recording.webm";
    a.click();
  };

  /* ---------------- CLEANUP ---------------- */

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  /* ---------------- UI ---------------- */

  return (
    <div style={styles.container}>
      <h2>🎥 Screen Recorder AI</h2>

      <div style={styles.timer}>{formatTime(time)}</div>

      <label style={{ marginBottom: 12 }}>
        <input
          type="checkbox"
          checked={useWebcam}
          onChange={(e) => setUseWebcam(e.target.checked)}
        />
        &nbsp; Enable Webcam
      </label>

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

      {videoURL && (
        <div style={{ marginTop: 20 }}>
          <video src={videoURL} controls width="600" />
          <br />
          <button style={styles.download} onClick={downloadVideo}>
            Download Video
          </button>
        </div>
      )}

      {useWebcam && (
        <video ref={webcamRef} autoPlay muted style={styles.webcam} />
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
  start: { background: "#22c55e", padding: 10, border: "none" },
  pause: { background: "#f59e0b", padding: 10, border: "none" },
  resume: { background: "#3b82f6", padding: 10, border: "none" },
  stop: { background: "#ef4444", padding: 10, border: "none" },
  download: { marginTop: 10, padding: 10 },
  webcam: {
    position: "fixed",
    bottom: 20,
    right: 20,
    width: 180,
    borderRadius: 10,
  },
};
