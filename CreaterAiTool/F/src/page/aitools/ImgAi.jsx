// src/page/aitools/ImgAi.jsx
import React, { useRef, useState } from "react";

export default function ImgAi() {
  const inputRef = useRef(null);

  const [image, setImage] = useState(null); // uploaded file
  const [result, setResult] = useState(null); // AI processed result URL
  const [loading, setLoading] = useState(false);

  /* ---------------- HANDLE FILE ---------------- */
  const handleFile = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImage({ file, url });
    setResult(null);
  };

  const onChange = (e) => handleFile(e.target.files[0]);

  const onDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  /* ---------------- AI PROCESSING ---------------- */
  const runAIProcessing = async () => {
    if (!image) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", image.file);

      const res = await fetch("/api/image-ai", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("AI processing failed");

      const data = await res.json();
      setResult(data.url); // URL returned from backend
    } catch (err) {
      console.error(err);
      alert("AI processing failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DOWNLOAD ---------------- */
  const downloadResult = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = "ai-image.png";
    a.click();
  };

  /* ---------------- UI ---------------- */
  return (
    <div style={styles.container}>
      <h2>🖼️ Image AI Tool</h2>

      {/* Upload Box */}
      <div
        style={styles.dropZone}
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        {image ? "Change Image" : "Click or Drag Image Here"}
      </div>

      <input
        type="file"
        hidden
        accept="image/*"
        ref={inputRef}
        onChange={onChange}
      />

      {/* Preview */}
      {image && (
        <div style={styles.preview}>
          <h4>Original</h4>
          <img src={image.url} alt="preview" style={styles.img} />
        </div>
      )}

      {/* Process Button */}
      {image && (
        <button style={styles.process} onClick={runAIProcessing}>
          {loading ? "Processing..." : "Run AI"}
        </button>
      )}

      {/* Result */}
      {result && (
        <div style={styles.preview}>
          <h4>Result</h4>
          <img src={result} alt="result" style={styles.img} />
          <button style={styles.download} onClick={downloadResult}>
            Download
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
    textAlign: "center",
    padding: 20,
  },
  dropZone: {
    border: "2px dashed #aaa",
    padding: 40,
    cursor: "pointer",
    marginBottom: 20,
  },
  preview: {
    marginTop: 20,
  },
  img: {
    maxWidth: 300,
    borderRadius: 10,
  },
  process: {
    marginTop: 20,
    padding: 10,
    background: "#3b82f6",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
  download: {
    marginTop: 10,
    padding: 10,
    background: "#22c55e",
    border: "none",
    cursor: "pointer",
  },
};
