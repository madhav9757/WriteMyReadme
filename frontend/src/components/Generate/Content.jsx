import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Content({ content, view }) {
  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {view === "preview" ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Card className="border-none bg-transparent shadow-none">
              <CardContent className="p-6 md:p-12">
                <article className="prose prose-zinc dark:prose-invert max-w-none 
                  prose-headings:scroll-m-20 prose-headings:font-semibold prose-headings:tracking-tight
                  prose-h1:text-4xl prose-h1:mb-8 prose-h2:border-b prose-h2:pb-2 prose-h2:text-3xl
                  prose-p:leading-7 prose-p:text-muted-foreground
                  prose-a:text-primary prose-a:underline prose-a:underline-offset-4
                  prose-blockquote:border-l-2 prose-blockquote:italic prose-blockquote:text-muted-foreground
                  prose-img:rounded-lg prose-img:border prose-img:shadow-sm"
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <div className="my-6 overflow-hidden rounded-lg border bg-zinc-950 shadow-md">
                            <div className="flex items-center justify-between bg-zinc-900 px-4 py-2">
                              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                                {match[1]}
                              </span>
                            </div>
                            <SyntaxHighlighter
                              {...props}
                              style={oneDark}
                              language={match[1]}
                              PreTag="div"
                              customStyle={{
                                margin: 0,
                                padding: "1.25rem",
                                fontSize: "13px",
                                background: "transparent",
                              }}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code 
                            className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground" 
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                      table({ children }) {
                        return (
                          <div className="my-6 w-full overflow-hidden rounded-lg border">
                            <table className="w-full text-sm">{children}</table>
                          </div>
                        );
                      },
                      th({ children }) {
                        return <th className="bg-muted/50 px-4 py-2 font-semibold text-left border-b">{children}</th>;
                      },
                      td({ children }) {
                        return <td className="px-4 py-2 border-b last:border-0">{children}</td>;
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
            initial={{ opacity: 0, scale: 0.995 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.995 }}
            transition={{ duration: 0.15 }}
            className="p-4"
          >
            <div className="overflow-hidden rounded-xl border bg-zinc-950 shadow-lg">
              <ScrollArea className="h-[calc(100vh-12rem)] w-full">
                <SyntaxHighlighter
                  language="markdown"
                  style={oneDark}
                  showLineNumbers
                  lineNumberStyle={{ minWidth: "3em", color: "#4b5563", textAlign: "right", paddingRight: "1.5em" }}
                  customStyle={{
                    margin: 0,
                    padding: "2rem",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    background: "transparent",
                  }}
                >
                  {content}
                </SyntaxHighlighter>
              </ScrollArea>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}