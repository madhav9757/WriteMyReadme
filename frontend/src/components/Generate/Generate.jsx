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
  FileDown,
  Share2,
  Wand2,
  Loader2,
} from "lucide-react";

import api from "@/api/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Content from "./Content";
import EmptyState from "./EmptyState";

export default function Generate() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const rawData = state?.readme?.data || state?.readme || "";
  const initialContent = typeof rawData === "string" ? rawData.replace(/\\n/g, "\n") : "";
  const repoName = state?.repo || "Project";
  const repoOwner = state?.owner || "user";

  const [view, setView] = useState("preview");
  const [copied, setCopied] = useState(false);
  const [beautifying, setBeautifying] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [content, setContent] = useState(initialContent);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Copied to clipboard", {
      description: "README content is ready to paste",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBeautify = async () => {
    try {
      setBeautifying(true);
      const res = await api.post("/readme/beautify", { readme: content });
      const result = res.data;
      
      if (result.success && result.data) {
        setContent(result.data);
        setView("preview");
        toast.success("README Enhanced!", {
          description: "Your documentation has been polished with AI",
        });
      }
    } catch (err) {
      console.error("Beautify error:", err);
      toast.error("Enhancement failed", {
        description: "Please try again or check your connection",
      });
    } finally {
      setBeautifying(false);
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    try {
      const blob = new Blob([content], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "README.md";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success("Download started", {
        description: "README.md saved to your downloads",
      });
    } catch (err) {
      toast.error("Download failed", {
        description: "Please try copying the content instead",
      });
    } finally {
      setTimeout(() => setDownloading(false), 1000);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `README for ${repoName}`,
        text: content.slice(0, 200) + "...",
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  if (!content) {
    return <EmptyState navigate={navigate} />;
  }

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen bg-background text-foreground">
        {/* Enhanced Navigation Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-sm">
          <div className="container flex h-16 items-center justify-between px-4 md:px-8">
            
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => navigate(-1)}
                    className="rounded-lg hover:bg-accent"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Back to dashboard</TooltipContent>
              </Tooltip>
              
              <Separator orientation="vertical" className="h-8" />
              
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm font-semibold truncate max-w-[200px] sm:max-w-none">
                    {repoOwner}/{repoName}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant="secondary" className="h-4 px-1.5 text-[9px] font-mono uppercase tracking-wider">
                    AI Generated
                  </Badge>
                  <span className="text-[10px] text-muted-foreground hidden sm:inline">
                    {content.split('\n').length} lines · {(content.length / 1024).toFixed(1)}KB
                  </span>
                </div>
              </div>
            </div>

            {/* Center - View Toggle */}
            <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
              <Tabs value={view} onValueChange={setView}>
                <TabsList className="h-9 bg-muted/50">
                  <TabsTrigger value="preview" className="gap-2 text-xs">
                    <Eye className="h-3.5 w-3.5" /> 
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="code" className="gap-2 text-xs">
                    <Code2 className="h-3.5 w-3.5" /> 
                    Source
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleShare}
                    className="hidden sm:flex h-9 gap-2"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    Share
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Share README</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleBeautify}
                    disabled={beautifying}
                    className="h-9 gap-2 hover:bg-primary/5 hover:text-primary"
                  >
                    {beautifying ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span className="hidden sm:inline">Enhancing...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Enhance</span>
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Polish with AI</TooltipContent>
              </Tooltip>

              <Separator orientation="vertical" className="h-6 mx-1" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleDownload}
                    disabled={downloading}
                    className="h-9 gap-2"
                  >
                    {downloading ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <FileDown className="h-3.5 w-3.5" />
                    )}
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Save as README.md</TooltipContent>
              </Tooltip>

              <Button 
                variant={copied ? "outline" : "default"} 
                size="sm" 
                onClick={handleCopy}
                className={`h-9 gap-2 min-w-[90px] transition-all ${
                  copied ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : ""
                }`}
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
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

          {/* Mobile View Toggle */}
          <div className="md:hidden border-t bg-muted/30 px-4 py-2">
            <Tabs value={view} onValueChange={setView} className="w-full">
              <TabsList className="w-full h-9 grid grid-cols-2">
                <TabsTrigger value="preview" className="gap-2 text-xs">
                  <Eye className="h-3.5 w-3.5" /> Preview
                </TabsTrigger>
                <TabsTrigger value="code" className="gap-2 text-xs">
                  <Code2 className="h-3.5 w-3.5" /> Source
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="container max-w-6xl py-8 px-4 md:px-8">
          <AnimatePresence mode="wait">
            {beautifying ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1.5, repeat: Infinity }
                      }}
                      className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4"
                    >
                      <Sparkles className="h-8 w-8 text-primary" />
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2">Enhancing Your README</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      AI is polishing your documentation for maximum impact...
                    </p>
                    <div className="space-y-3 max-w-md mx-auto">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-5/6 mx-auto" />
                      <Skeleton className="h-3 w-4/6 mx-auto" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Content content={content} view={view} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Enhanced Footer */}
        <footer className="border-t bg-muted/30 mt-12">
          <div className="container max-w-6xl px-4 md:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col items-center md:items-start gap-2">
                <p className="text-sm text-muted-foreground text-center md:text-left">
                  Ready to deploy? Copy the markdown above or download as{" "}
                  <code className="relative rounded bg-muted px-2 py-0.5 font-mono text-xs font-semibold">
                    README.md
                  </code>
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-primary" />
                  <span>Generated with AI · Enhanced for GitHub</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => navigate("/dashboard")}
                >
                  Generate Another
                </Button>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-xs text-muted-foreground"
                  asChild
                >
                  <a 
                    href="https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes" 
                    target="_blank"
                    rel="noreferrer"
                  >
                    Documentation
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}