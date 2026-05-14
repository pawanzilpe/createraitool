// src/page/aitools/imgaiapi.js
import axios from "axios";

/**
 * Uploads an image to the AI backend and returns the processed image URL
 * @param {File} file - Image file to process
 * @returns {Promise<string>} - URL of processed image
 */
export async function uploadImageAI(file) {
  if (!file) throw new Error("No file provided");

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post("http://localhost:5000/api", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Assuming your backend returns { url: "..." }
    return response.data.url;
  } catch (err) {
    console.error("Failed to upload image to AI API:", err);
    throw err;
  }
}
