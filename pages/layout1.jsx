// import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
  title: "AI Fitness Trainer",
  description: "AI Fitness Trainer",
  generator: "AI Fitness Trainer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
