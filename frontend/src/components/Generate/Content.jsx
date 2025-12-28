import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function Content({ content, view }) {
  const { theme } = useTheme();
  const [copiedCode, setCopiedCode] = React.useState(null);

  const handleCopyCode = (code, language) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(language);
    toast.success("Code copied", {
      description: `${language} snippet copied to clipboard`,
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {view === "preview" ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Card className="border shadow-xl shadow-black/5 dark:shadow-black/20 overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  <article className="prose prose-zinc dark:prose-invert max-w-none p-8 md:p-12 lg:p-16
                    prose-headings:scroll-m-20 prose-headings:font-bold prose-headings:tracking-tight
                    prose-h1:text-5xl prose-h1:mb-8 prose-h1:border-b-2 prose-h1:border-primary/20 prose-h1:pb-4
                    prose-h2:border-b prose-h2:border-border prose-h2:pb-3 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                    prose-p:leading-7 prose-p:text-muted-foreground prose-p:my-4
                    prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline hover:prose-a:underline-offset-4
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-blockquote:border-l-4 prose-blockquote:border-primary/40 prose-blockquote:bg-muted/40 
                    prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic 
                    prose-blockquote:text-muted-foreground prose-blockquote:my-6
                    prose-code:text-sm prose-code:font-mono
                    prose-pre:bg-transparent prose-pre:p-0
                    prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                    prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
                    prose-li:my-2 prose-li:text-muted-foreground
                    prose-img:rounded-xl prose-img:border prose-img:shadow-lg prose-img:my-8
                    prose-hr:border-border prose-hr:my-8"
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          const codeString = String(children).replace(/\n$/, "");
                          
                          return !inline && match ? (
                            <div className="group relative my-6 overflow-hidden rounded-xl border bg-zinc-950 dark:bg-zinc-900 shadow-xl">
                              {/* Code block header */}
                              <div className="flex items-center justify-between bg-zinc-900 dark:bg-zinc-800 px-4 py-2.5 border-b border-zinc-800 dark:border-zinc-700">
                                <div className="flex items-center gap-2">
                                  <div className="flex gap-1.5">
                                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                                  </div>
                                  <Badge 
                                    variant="secondary" 
                                    className="h-5 px-2 text-[10px] font-mono uppercase tracking-wider bg-zinc-800 dark:bg-zinc-700 text-zinc-300 border-0"
                                  >
                                    {match[1]}
                                  </Badge>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCopyCode(codeString, match[1])}
                                  className="h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-800 dark:hover:bg-zinc-700"
                                >
                                  {copiedCode === match[1] ? (
                                    <>
                                      <Check className="h-3.5 w-3.5 mr-1.5 text-emerald-400" />
                                      <span className="text-xs text-emerald-400">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-3.5 w-3.5 mr-1.5 text-zinc-400" />
                                      <span className="text-xs text-zinc-400">Copy</span>
                                    </>
                                  )}
                                </Button>
                              </div>
                              {/* Code content */}
                              <SyntaxHighlighter
                                {...props}
                                style={theme === "dark" ? oneDark : oneLight}
                                language={match[1]}
                                PreTag="div"
                                customStyle={{
                                  margin: 0,
                                  padding: "1.5rem",
                                  fontSize: "13px",
                                  lineHeight: "1.7",
                                  background: "transparent",
                                }}
                                wrapLines={true}
                                wrapLongLines={false}
                              >
                                {codeString}
                              </SyntaxHighlighter>
                            </div>
                          ) : (
                            <code 
                              className="relative rounded-md bg-muted px-[0.4rem] py-[0.25rem] font-mono text-[0.9em] font-semibold text-foreground border border-border/50" 
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                        table({ children }) {
                          return (
                            <div className="my-8 w-full overflow-hidden rounded-xl border shadow-md">
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                  {children}
                                </table>
                              </div>
                            </div>
                          );
                        },
                        thead({ children }) {
                          return (
                            <thead className="bg-muted/80 backdrop-blur-sm">
                              {children}
                            </thead>
                          );
                        },
                        th({ children }) {
                          return (
                            <th className="px-6 py-3 font-semibold text-left border-b-2 border-border text-foreground">
                              {children}
                            </th>
                          );
                        },
                        tbody({ children }) {
                          return (
                            <tbody className="divide-y divide-border">
                              {children}
                            </tbody>
                          );
                        },
                        tr({ children }) {
                          return (
                            <tr className="hover:bg-muted/30 transition-colors">
                              {children}
                            </tr>
                          );
                        },
                        td({ children }) {
                          return (
                            <td className="px-6 py-4 text-muted-foreground">
                              {children}
                            </td>
                          );
                        },
                        ul({ children }) {
                          return (
                            <ul className="space-y-2 my-4">
                              {children}
                            </ul>
                          );
                        },
                        ol({ children }) {
                          return (
                            <ol className="space-y-2 my-4">
                              {children}
                            </ol>
                          );
                        },
                        hr() {
                          return (
                            <div className="my-8 flex items-center justify-center">
                              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
                            </div>
                          );
                        },
                      }}
                    >
                      {content}
                    </ReactMarkdown>
                  </article>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="code"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="overflow-hidden border shadow-xl shadow-black/5 dark:shadow-black/20">
              <div className="bg-zinc-950 dark:bg-zinc-900 border-b border-zinc-800 dark:border-zinc-700 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500/80" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                      <div className="h-3 w-3 rounded-full bg-green-500/80" />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="h-5 px-2 text-[10px] font-mono uppercase tracking-wider bg-zinc-800 dark:bg-zinc-700 text-zinc-300 border-0"
                    >
                      Markdown
                    </Badge>
                  </div>
                  <div className="text-xs text-zinc-500 font-mono">
                    {content.split('\n').length} lines
                  </div>
                </div>
              </div>
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <SyntaxHighlighter
                  language="markdown"
                  style={theme === "dark" ? oneDark : oneLight}
                  showLineNumbers
                  lineNumberStyle={{ 
                    minWidth: "3.5em", 
                    color: theme === "dark" ? "#4b5563" : "#9ca3af",
                    textAlign: "right", 
                    paddingRight: "1.5em",
                    userSelect: "none"
                  }}
                  customStyle={{
                    margin: 0,
                    padding: "2rem",
                    fontSize: "13px",
                    lineHeight: "1.8",
                    background: "transparent",
                  }}
                  wrapLines={true}
                  wrapLongLines={true}
                >
                  {content}
                </SyntaxHighlighter>
              </ScrollArea>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}