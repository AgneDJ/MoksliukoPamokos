"use client";

import React, { useEffect, useState } from "react";
import { loadProgress } from "../lib/progress";

const label: Record<string, string> = {
  star: "Žvaigždutė",
  rocket: "Raketa",
  heart: "Širdelė",
  owl: "Pelėda",
};

export default function RewardsPage() {
  const [stickers, setStickers] = useState<string[]>([]);

  useEffect(() => {
    const p = loadProgress();
    setStickers(p.stickers);
  }, []);

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 680 }}>
      <h1 style={{ margin: 0 }}>Tavo lipdukai</h1>

      {stickers.length === 0 ? (
        <p style={{ margin: 0, opacity: 0.8 }}>Dar neturi lipdukų. Atlik pamoką ir gausi pirmą</p>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ fontWeight: 800 }}>Gauti lipdukai</div>
          {stickers.map((s, idx) => (
            <div key={`${s}-${idx}`} style={{ padding: 12, borderRadius: 14, background: "#f3f4f6" }}>
              <div style={{ fontWeight: 800 }}>{label[s] ?? s}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
