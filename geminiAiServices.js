// "use client";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { useState } from "react";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const extractJSON = (output) => {
  // Remove unnecessary characters and newlines
  const jsonStartIndex = output.indexOf("[");
  const jsonEndIndex = output.lastIndexOf("]") + 1;
  const json = output.substring(jsonStartIndex, jsonEndIndex);

  // Parse the JSON
  return JSON.parse(json);
};
export async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    candidateCount: 1,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "HELLO" }],
      },
      {
        role: "model",
        parts: [{ text: "Hello there! How can I assist you today?" }],
      },
    ],
  });

  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log("response", response);
  return extractJSON(response.text());
}

const generatePrompt = (userData) => {
  return `
			  Based on the user data below, generate an exercise plan for a week.
			  User data:
			  ${JSON.stringify(userData)}
			  
			  Generate 3 exercise per day.
			  Saturday and Sunday as rest days.
			  
			  Sample output JSON:
			  [{"day": "Monday","exercises": [{"exercise": "...", "sets": "...", "reps": "...", "weight": "...","rest": "..."}]}]
			  
			  "reps" in JSON is a string with number of reps with weight if needed
			  "rest" in JSON is the rest to be taken between sets
			  "weight" in JSON is the weight to be used for exercise, it should be with units if needed e.g. 10 lbs, else make it "---"
			  
			  For rest days return only one javascript object in exercises array with exercise field as "Rest Day" and remaining fields as "---"
			  
			  Answer:
		  `;
};

export const geminiApiGenerateMsg = (formData) => {
  let prompt = generatePrompt(formData);
  return runChat(prompt);
};

// .......................
const GeminiApiGenerateMSgFromImage = () => {};
