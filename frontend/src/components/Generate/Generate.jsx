"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Header from "./Header";
import GenerateLoading from "./GenerateLoading";
import Content from "./Content";
import EmptyState from "./EmptyState";
import { useGenerateActions } from "./Hooks/useGenerateActions";

export default function Generate() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const rawData = state?.readme?.data || state?.readme || "";
  const initialContent =
    typeof rawData === "string" ? rawData.replace(/\\n/g, "\n") : "";

  const repoName = state?.repo || "Project";
  const repoOwner = state?.owner || "user";

  const [view, setView] = useState("preview");
  const [content, setContent] = useState(initialContent);

  const actions = useGenerateActions({
    content,
    setContent,
    setView,
  });

  if (!content) return <EmptyState navigate={navigate} />;

  return (
    <div className="min-h-screen bg-background">
      <Header
        repoName={repoName}
        repoOwner={repoOwner}
        content={content}
        view={view}
        setView={setView}
        navigate={navigate}
        actions={actions}
      />

      <main className="w-full px-4 md:px-8 lg:px-12 py-8">
        <AnimatePresence mode="wait">
          {actions.beautifying ? (
            <GenerateLoading />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Content content={content} view={view} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

    </div>
  );
}
