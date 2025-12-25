import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Copy, 
  Check, 
  Sparkles, 
  Eye, 
  Code2, 
  ArrowLeft, 
  Download,
  Github,
  ChevronRight
} from "lucide-react";

import api from "@/api/api";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

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

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast({
      description: "Copied to clipboard",
      duration: 2000,
    });
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
        toast({
          title: "Success",
          description: "Markdown has been polished.",
        });
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
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{repoName}</span>
                <Badge variant="secondary" className="font-mono text-[10px] uppercase tracking-wider">
                  Generated
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Tabs value={view} onValueChange={setView} className="w-auto">
              <TabsList className="grid w-[200px] grid-cols-2">
                <TabsTrigger value="preview" className="flex gap-2">
                  <Eye className="h-3.5 w-3.5" /> Preview
                </TabsTrigger>
                <TabsTrigger value="code" className="flex gap-2">
                  <Code2 className="h-3.5 w-3.5" /> Raw
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Separator orientation="vertical" className="mx-1 h-6" />

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBeautify}
                disabled={beautifying}
                className="hidden md:flex gap-2"
              >
                <Sparkles className={`h-3.5 w-3.5 ${beautifying ? "animate-pulse" : ""}`} />
                {beautifying ? "Refining..." : "Polish"}
              </Button>
              <Button 
                variant={copied ? "outline" : "default"} 
                size="sm" 
                onClick={handleCopy}
                className="gap-2 min-w-[90px]"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container max-w-6xl py-8 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0">
              <AnimatePresence mode="wait">
                {beautifying ? (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <Skeleton className="h-8 w-[250px]" />
                    <Skeleton className="h-[600px] w-full" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                      <Content content={content} view={view} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer info/actions */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            Ready to deploy? Copy the markdown above into your <code className="relative rounded bg-muted px-[0.3rem] py-[0.1rem] font-mono text-sm font-semibold">README.md</code>
          </p>
          <div className="flex gap-4">
             <Button variant="link" size="sm" className="text-muted-foreground">
               Documentation
             </Button>
             <Button variant="link" size="sm" className="text-muted-foreground">
               Support
             </Button>
          </div>
        </div>
      </main>
    </div>
  );
}