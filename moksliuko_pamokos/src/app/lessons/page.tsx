"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LESSONS } from "../../lib/lessons";
import { loadProgress } from "../../lib/progress";

export default function LessonsPage() {
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    const p = loadProgress();
    setDone(p.completedLessonIds);
  }, []);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h1 style={{ margin: 0 }}>Pamokos</h1>

      {LESSONS.map((l) => {
        const isDone = done.includes(l.id);
        return (
          <Link
            key={l.id}
            href={`/lessons/${l.id}`}
            style={{
              padding: 14,
              borderRadius: 16,
              background: "#f3f4f6",
              textDecoration: "none",
              color: "#111827",
              display: "grid",
              gap: 6,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{l.titleLt}</div>
              <div style={{ fontWeight: 800 }}>{isDone ? "Atlikta" : "Pradėti"}</div>
            </div>
            <div style={{ opacity: 0.75 }}>{l.descriptionLt}</div>
          </Link>
        );
      })}
    </div>
  );
}
