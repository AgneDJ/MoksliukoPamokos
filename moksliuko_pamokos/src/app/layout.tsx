import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Layout from "../components/Layout";

export const metadata: Metadata = {
  title: "Mokykimės (LT)",
  description: "Khan Academy Kids stiliaus mokymosi web app prototipas (LT).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="lt">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
