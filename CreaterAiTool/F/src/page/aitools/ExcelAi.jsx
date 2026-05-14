import React, { useState } from "react";
import API from "../../api/api";

function ExcelAi() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Enter your Excel request");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post(
        "/excel-ai",
        { prompt },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "generated.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Excel AI Error:", error);
      alert("Excel generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📊 Excel AI Generator</h2>

      <textarea
        placeholder="Example: Create a sales report table for 5 months"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate & Download Excel"}
      </button>
    </div>
  );
}

export default ExcelAi;
