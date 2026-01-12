"use client";

import React, { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { LESSONS } from "../../../lib/lessons";
import { addUnique, loadProgress, saveProgress } from "../../../lib/progress";

export default function LessonPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const lesson = useMemo(() => LESSONS.find((x) => x.id === params.id), [params.id]);

  const [picked, setPicked] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  if (!lesson) return <div>Nerasta pamoka</div>;

  const check = () => {
    if (!picked) return;
    setStatus(picked === lesson.task.answer ? "correct" : "wrong");
  };

  const complete = () => {
    const p = loadProgress();
    const next = {
      completedLessonIds: addUnique(p.completedLessonIds, lesson.id),
      stickers: addUnique(p.stickers, lesson.reward),
    };
    saveProgress(next);
    router.push("/rewards");
  };

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 680 }}>
      <h1 style={{ margin: 0 }}>{lesson.titleLt}</h1>

      <div style={{ padding: 16, borderRadius: 16, background: "#f3f4f6", display: "grid", gap: 10 }}>
        <div style={{ fontWeight: 800 }}>Užduotis</div>
        <div style={{ fontSize: 18 }}>{lesson.task.promptLt}</div>

        <div style={{ display: "grid", gap: 10 }}>
          {lesson.task.choices.map((c) => {
            const selected = picked === c;
            return (
              <button
                key={c}
                onClick={() => {
                  setPicked(c);
                  setStatus("idle");
                }}
                style={{
                  textAlign: "left",
                  padding: 12,
                  borderRadius: 14,
                  background: selected ? "#e5e7eb" : "white",
                  border: "1px solid #e5e7eb",
                  cursor: "pointer",
                  fontWeight: selected ? 800 : 600,
                }}
              >
                {c}
              </button>
            );
          })}
        </div>

        <button onClick={check} disabled={!picked} style={primaryBtn(!picked)}>
          Tikrinti
        </button>

        {status !== "idle" && (
          <div style={{ fontWeight: 800, fontSize: 16 }}>
            {status === "correct" ? "Teisingai" : "Pabandyk dar kartą"}
          </div>
        )}
      </div>

      <button onClick={complete} disabled={status !== "correct"} style={primaryBtn(status !== "correct")}>
        Užbaigti pamoką
      </button>
    </div>
  );
}

function primaryBtn(disabled: boolean): React.CSSProperties {
  return {
    padding: "12px 14px",
    borderRadius: 14,
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    background: "#111827",
    color: "white",
    fontWeight: 800,
  };
}
