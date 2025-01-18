"use client";

import { useState } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import MarkdownIt from "markdown-it";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const ImageTextPrompt = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageBase64, setImageBase64] = useState("");
  const [textInput, setTextInput] = useState("");
  const [output, setOutput] = useState("");
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("Please select an image file.");
      return;
    }

    try {
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result.split(",")[1]);
          setSelectedImage(reader.result);
        };
        reader.onerror = reject;
      });
      setImageBase64(base64);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  const handleGenerate = async () => {
    if (!imageBase64) {
      alert("Please upload an image.");
      return;
    }
    if (!textInput) {
      alert("Please enter a prompt.");
      return;
    }

    setLoading(true);
    setOutput(""); // Clear previous output
    try {
      const contents = [
        {
          role: "user",
          parts: [
            { inline_data: { mime_type: "image/jpeg", data: imageBase64 } },
            { text: textInput },
          ],
        },
      ];

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
        ],
      });

      const result = await model.generateContentStream({ contents });

      const md = new MarkdownIt();
      let buffer = [];
      for await (let response of result.stream) {
        buffer.push(response.text());
        setOutput(md.render(buffer.join("")));
      }
    } catch (error) {
      console.error("Error:", error);
      setOutput(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* Image Upload */}
      <div className="mb-4">
        <label className="cursor-pointer bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent font-bold text-lg   rounded-md p-1 ring-1 ring-inset ring-primary-light">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>
      {selectedImage && (
        <div className="mt-4 md:mt-0">
          <p className="text-gray-500 text-sm mb-2">Preview:</p>

          <img
            src={selectedImage}
            alt="Uploaded Preview"
            className="w-64 h-64 object-cover rounded-lg shadow-md border"
          />
        </div>
      )}
      {/* Text Input */}
      <div className="mb-4">
        <label className="block font-semibold mb-2" htmlFor="textInput">
          Enter Text Prompt
        </label>
        <textarea
          id="textInput"
          rows="4"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="w-full border  px-2 py-1  rounded-md p-1 ring-1 ring-inset ring-primary-light"
        ></textarea>
      </div>

      {/* Generate Button */}
      <div className="mb-4">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="rounded-md bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark disabled:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {/* Output */}
      {output && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Output:</h2>
          <div
            id="output"
            className="border p-4 bg-gray-100 rounded-md  ring-1 ring-inset ring-primary-light"
            dangerouslySetInnerHTML={{ __html: output }}
          ></div>
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <div className="cursor-pointer bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent font-bold text-lg rounded-md p-4 ring-1 ring-inset ring-primary-light">
            Loading...
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageTextPrompt;
// <label className="block font-semibold mb-2" htmlFor="fileInput">
// Upload an Image
// </label>
// <input
// type="file"
// id="fileInput"
// accept="image/*"
// onChange={handleImageUpload}
// className="border rounded px-2 py-1"
// />
