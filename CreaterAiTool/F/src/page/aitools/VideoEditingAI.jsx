import React, { useRef, useState, useEffect } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({ log: false });

export default function VideoEditingAI() {
  const videoRef = useRef(null);

  const [videoURL, setVideoURL] = useState(null);
  const [file, setFile] = useState(null);
  const [clips, setClips] = useState([]);
  const [sliceTime, setSliceTime] = useState(5);

  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  /* =================================================
     LOAD FFMPEG (ONLY ONCE)
  ================================================= */

  useEffect(() => {
    const loadFFmpeg = async () => {
      await ffmpeg.load();
      setReady(true);
    };

    loadFFmpeg();
  }, []);

  /* =================================================
     CLEANUP VIDEO URL (NO MEMORY LEAK)
  ================================================= */

  useEffect(() => {
    return () => {
      if (videoURL) URL.revokeObjectURL(videoURL);
    };
  }, [videoURL]);

  /* =================================================
     UPLOAD VIDEO
  ================================================= */

  const handleUpload = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    // cleanup old url
    if (videoURL) URL.revokeObjectURL(videoURL);

    setFile(f);
    setVideoURL(URL.createObjectURL(f));
    setClips([]);
  };

  /* =================================================
     AUTO SLICE
  ================================================= */

  const autoSlice = () => {
    if (!videoRef.current) return;

    const duration = videoRef.current.duration;
    let start = 0;
    const temp = [];

    while (start < duration) {
      const end = Math.min(start + sliceTime, duration);

      temp.push({
        id: crypto.randomUUID(),
        start,
        end,
      });

      start = end;
    }

    setClips(temp);
  };

  /* =================================================
     MANUAL SLICE
  ================================================= */

  const manualSlice = () => {
    if (!videoRef.current) return;

    const current = videoRef.current.currentTime;

    setClips((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        start: current,
        end: Math.min(current + sliceTime, videoRef.current.duration),
      },
    ]);
  };

  /* =================================================
     DELETE CLIP
  ================================================= */

  const deleteClip = (id) => {
    setClips((prev) => prev.filter((c) => c.id !== id));
  };

  /* =================================================
     CUT + DOWNLOAD CLIP
  ================================================= */

  const downloadClip = async (clip, index) => {
    if (!file || !ready) return;

    setLoading(true);

    try {
      ffmpeg.FS("writeFile", "input.mp4", await fetchFile(file));

      await ffmpeg.run(
        "-ss",
        String(clip.start),
        "-to",
        String(clip.end),
        "-i",
        "input.mp4",
        "-c",
        "copy",
        `out${index}.mp4`
      );

      const data = ffmpeg.FS("readFile", `out${index}.mp4`);

      const url = URL.createObjectURL(
        new Blob([data.buffer], { type: "video/mp4" })
      );

      const a = document.createElement("a");
      a.href = url;
      a.download = `clip_${index + 1}.mp4`;
      a.click();

      // cleanup ffmpeg memory
      ffmpeg.FS("unlink", "input.mp4");
      ffmpeg.FS("unlink", `out${index}.mp4`);
    } catch (err) {
      console.error(err);
      alert("Error processing clip");
    }

    setLoading(false);
  };

  /* =================================================
     UI
  ================================================= */

  return (
    <div style={styles.container}>
      <h2>🎬 Video Editing AI Pro</h2>

      <input type="file" accept="video/*" onChange={handleUpload} />

      {!ready && <p>Loading FFmpeg… first time may take few seconds ⏳</p>}

      {videoURL && (
        <>
          <video
            ref={videoRef}
            src={videoURL}
            controls
            width="650"
            style={{ marginTop: 20 }}
          />

          {/* Controls */}
          <div style={styles.controls}>
            <input
              type="number"
              value={sliceTime}
              min={1}
              onChange={(e) => setSliceTime(Number(e.target.value))}
            />
            <span>sec</span>

            <button onClick={autoSlice}>✂️ Auto Slice</button>
            <button onClick={manualSlice}>➕ Manual Slice</button>
          </div>

          {loading && <p>⚙️ Processing clip...</p>}

          {/* Clips */}
          <div style={styles.clipContainer}>
            {clips.map((clip, i) => (
              <div key={clip.id} style={styles.clip}>
                <p>
                  {clip.start.toFixed(1)}s → {clip.end.toFixed(1)}s
                </p>

                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    disabled={loading}
                    onClick={() => downloadClip(clip, i)}
                  >
                    ⬇️ Download
                  </button>

                  <button onClick={() => deleteClip(clip.id)}>❌</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* =================================================
   STYLES
================================================= */

const styles = {
  container: {
    textAlign: "center",
    padding: 20,
    fontFamily: "sans-serif",
  },
  controls: {
    marginTop: 15,
    display: "flex",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  clipContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
    justifyContent: "center",
  },
  clip: {
    border: "1px solid #ccc",
    padding: 10,
    borderRadius: 8,
    width: 160,
  },
};
