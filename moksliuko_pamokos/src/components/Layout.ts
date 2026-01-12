"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren, useMemo, useState } from "react";
import type { Lang } from "../lib/i18n";
import { t } from "../lib/i18n";

export default function Layout({ children }: PropsWithChildren) {
  const [lang, setLang] = useState<Lang>("lt");
  const pathname = usePathname();

  const nav = useMemo(
    () => [
      { href: "/", label: t(lang, "nav.home") },
      { href: "/lessons", label: t(lang, "nav.lessons") },
      { href: "/rewards", label: t(lang, "nav.rewards") },
    ],
    [lang]
  );

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <header style={{ borderBottom: "1px solid #e5e7eb", padding: 14 }}>
        <div style={{ maxWidth: 980, margin: "0 auto", display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ fontWeight: 800, fontSize: 18 }}>{t(lang, "appName")}</div>

          <nav style={{ display: "flex", gap: 10, marginLeft: 10 }}>
            {nav.map((n) => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 12,
                    textDecoration: "none",
                    color: "#111827",
                    background: active ? "#f3f4f6" : "transparent",
                    fontWeight: active ? 700 : 600,
                  }}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 12, opacity: 0.7 }}>Kalba</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              style={{ padding: "8px 10px", borderRadius: 12, border: "1px solid #e5e7eb" }}
            >
              <option value="lt">LT</option>
              <option value="en">EN</option>
            </select>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 980, margin: "0 auto", padding: 16 }}>{children}</main>

      <footer style={{ borderTop: "1px solid #e5e7eb", padding: 14, marginTop: 30 }}>
        <div style={{ maxWidth: 980, margin: "0 auto", fontSize: 12, opacity: 0.7 }}>
          Vaikams pritaikytas mokymosi prototipas (demo)
        </div>
      </footer>
    </div>
  );
}
