import React, { useRef, useState } from "react";

export default function VideoAi() {
  const inputRef = useRef(null);
  const videoRef = useRef(null);

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  /* ---------------- FILE HANDLING ---------------- */

  const handleFile = (file) => {
    if (!file) return;

    const url = URL.createObjectURL(file);

    setVideo({
      file,
      url,
    });

    setTranscript("");
    setThumbnail(null);
  };

  const handleChange = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  /* ---------------- AUDIO EXTRACTION ---------------- */

  const extractAudio = async () => {
    if (!video) return;

    setLoading(true);

    try {
      const audioCtx = new AudioContext();
      const arrayBuffer = await video.file.arrayBuffer();
      const buffer = await audioCtx.decodeAudioData(arrayBuffer);

      const wavBlob = bufferToWav(buffer);

      await runAIProcessing(wavBlob);
    } catch (err) {
      console.error(err);
      alert("Audio extraction failed");
    }

    setLoading(false);
  };

  /* ---------------- AI PROCESSING (HOOK) ---------------- */

  const runAIProcessing = async (audioBlob) => {
    console.log("🤖 Sending audio to AI...", audioBlob);

    /*
    🔥 Connect your backend here

    const form = new FormData();
    form.append("file", audioBlob);

    const res = await fetch("/api/transcribe", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setTranscript(data.text);
    */

    // demo transcript
    await new Promise((r) => setTimeout(r, 1500));

    setTranscript(
      "This is a demo transcript. Connect Whisper/OpenAI API here to get real speech-to-text."
    );
  };

  /* ---------------- SUBTITLE GENERATION ---------------- */

  const downloadSRT = () => {
    if (!transcript) return;

    const srt = `1
00:00:00,000 --> 00:00:10,000
${transcript}
`;

    const blob = new Blob([srt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "subtitles.srt";
    a.click();
  };

  /* ---------------- THUMBNAIL CAPTURE ---------------- */

  const captureThumbnail = () => {
    const videoEl = videoRef.current;

    const canvas = document.createElement("canvas");
    canvas.width = videoEl.videoWidth;
    canvas.height = videoEl.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoEl, 0, 0);

    const img = canvas.toDataURL("image/png");
    setThumbnail(img);
  };

  const downloadThumbnail = () => {
    const a = document.createElement("a");
    a.href = thumbnail;
    a.download = "thumbnail.png";
    a.click();
  };

  /* ---------------- WAV CONVERTER ---------------- */

  const bufferToWav = (buffer) => {
    const channel = buffer.getChannelData(0);
    const wavBuffer = new ArrayBuffer(44 + channel.length * 2);
    const view = new DataView(wavBuffer);

    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, "RIFF");
    view.setUint32(4, 36 + channel.length * 2, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, buffer.sampleRate, true);
    view.setUint32(28, buffer.sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, "data");
    view.setUint32(40, channel.length * 2, true);

    let offset = 44;
    for (let i = 0; i < channel.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, channel[i]));
      view.setInt16(offset, s * 0x7fff, true);
    }

    return new Blob([view], { type: "audio/wav" });
  };

  /* ---------------- UI ---------------- */

  return (
    <div style={styles.container}>
      <h2>🎬 Video AI Studio</h2>

      <div
        style={styles.drop}
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {video ? "Change Video" : "Click or Drag Video Here"}
      </div>

      <input
        hidden
        type="file"
        accept="video/*"
        ref={inputRef}
        onChange={handleChange}
      />

      {video && (
        <>
          <video ref={videoRef} src={video.url} controls style={styles.video} />

          <div style={styles.buttons}>
            <button onClick={extractAudio}>
              {loading ? "Processing..." : "🎤 Extract + Transcribe"}
            </button>

            <button onClick={captureThumbnail}>🖼️ Thumbnail</button>

            {transcript && (
              <button onClick={downloadSRT}>📄 Download SRT</button>
            )}
          </div>
        </>
      )}

      {thumbnail && (
        <div style={{ marginTop: 20 }}>
          <img src={thumbnail} alt="thumb" width={200} />
          <br />
          <button onClick={downloadThumbnail}>Download Image</button>
        </div>
      )}

      {transcript && (
        <textarea value={transcript} readOnly style={styles.textarea} />
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
  drop: {
    border: "2px dashed #aaa",
    padding: 40,
    cursor: "pointer",
    marginBottom: 20,
  },
  video: {
    width: 420,
    borderRadius: 10,
  },
  buttons: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
    marginTop: 15,
  },
  textarea: {
    marginTop: 20,
    width: 420,
    height: 120,
  },
};
