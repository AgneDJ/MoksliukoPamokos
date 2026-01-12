"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { loadProgress } from "../lib/progress";

export default function HomePage() {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const p = loadProgress();
    setCompleted((p.completedLessonIds ?? []).length);

  }, []);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <h1 style={{ fontSize: 32, margin: 0 }}>Sveikas atvykęs</h1>
      <p style={{ margin: 0, opacity: 0.75 }}>Pasirink ką nori daryti</p>

      <div style={{ padding: 16, borderRadius: 16, background: "#f3f4f6" }}>
        <div style={{ fontWeight: 800 }}>Pažanga</div>
        <div style={{ marginTop: 6, opacity: 0.8 }}>Atliktos pamokos: {completed}</div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link href="/lessons" style={btnStyle}>
          Pamokos
        </Link>
        <Link href="/rewards" style={btnStyle}>
          Apdovanojimai
        </Link>
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "12px 14px",
  borderRadius: 14,
  background: "#111827",
  color: "white",
  textDecoration: "none",
  fontWeight: 700,
};
