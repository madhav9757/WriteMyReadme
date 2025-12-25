import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Content({ content, view }) {
  return (
    <main className="container max-w-5xl mx-auto py-8 px-4">
      <AnimatePresence mode="wait">
        {view === "preview" ? (
          <motion.div
            key={`preview-${content.length}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Card className="shadow-2xl">
              <CardContent className="p-10">
                <article className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ inline, className, children }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className}>{children}</code>
                        );
                      },
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                </article>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="code"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SyntaxHighlighter
              language="markdown"
              style={vscDarkPlus}
              showLineNumbers
              customStyle={{ padding: "2rem", borderRadius: "12px", fontSize: "14px" }}
            >
              {content}
            </SyntaxHighlighter>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
