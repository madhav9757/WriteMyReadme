import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import api from "@/api/api";

import Header from "./Header";
import Content from "./Content";
import EmptyState from "./EmptyState";

export default function Generate() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const rawData = state?.readme?.data || state?.readme || "";
  const initialContent = typeof rawData === "string" ? rawData.replace(/\\n/g, "\n") : "";
  const repoName = state?.repo || "Project";

  const [view, setView] = useState("preview");
  const [copied, setCopied] = useState(false);
  const [beautifying, setBeautifying] = useState(false);
  const [content, setContent] = useState(initialContent);

  // ---------------- Handlers ----------------
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBeautify = async () => {
    try {
      setBeautifying(true);
      const res = await api.post("/readme/beautify", { readme: content });
      const result = res.data ? res.data : await res.json();
      if (result.success || result.data) {
        const newMarkdown = result.data || result;
        setContent(newMarkdown);
        setView("preview");
      }
    } catch (err) {
      console.error("Beautify error:", err);
    } finally {
      setBeautifying(false);
    }
  };

  if (!content) {
    return <EmptyState navigate={navigate} />;
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950">
      <Header
        repoName={repoName}
        view={view}
        setView={setView}
        handleCopy={handleCopy}
        copied={copied}
        handleBeautify={handleBeautify}
        beautifying={beautifying}
        navigate={navigate}
      />
      <Content content={content} view={view} />
    </div>
  );
}
