import React from "react";
import { ChevronLeft, Copy, Check, Code2, Eye, Sparkles, FileText, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Header({
  repoName,
  view,
  setView,
  handleCopy,
  copied,
  handleBeautify,
  beautifying,
  navigate,
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-12 items-center justify-between px-4 max-w-none">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-md" 
            onClick={() => navigate("/")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Separator orientation="vertical" className="h-4 mx-1" />
          
          <div className="flex items-center gap-2">
            <Github className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm font-medium tracking-tight truncate max-w-[120px] sm:max-w-[200px]">
              {repoName}
            </span>
            <Badge 
              variant="outline" 
              className="h-5 px-1.5 text-[10px] font-mono font-medium leading-none uppercase tracking-wider text-muted-foreground"
            >
              Markdown
            </Badge>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <Tabs value={view} onValueChange={setView} className="w-auto">
            <TabsList className="h-8 p-0.5 bg-muted/50">
              <TabsTrigger value="preview" className="h-7 px-3 text-xs gap-1.5">
                <Eye className="h-3.5 w-3.5" /> 
                <span className="hidden sm:inline">Preview</span>
              </TabsTrigger>
              <TabsTrigger value="code" className="h-7 px-3 text-xs gap-1.5">
                <Code2 className="h-3.5 w-3.5" /> 
                <span className="hidden sm:inline">Source</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-1.5">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={handleBeautify} 
                  disabled={beautifying}
                  className="h-8 px-2.5 text-xs gap-2 hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  <Sparkles className={`h-3.5 w-3.5 ${beautifying ? "animate-pulse" : ""}`} />
                  <span className="hidden md:inline">{beautifying ? "Processing..." : "Refine"}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-[11px]">
                Enhance markdown structure with AI
              </TooltipContent>
            </Tooltip>

            <Separator orientation="vertical" className="h-4 mx-1" />

            <Button 
              size="sm" 
              variant={copied ? "outline" : "default"} 
              onClick={handleCopy}
              className={`h-8 px-3 text-xs gap-2 transition-all duration-200 ${copied ? "border-emerald-500/50 bg-emerald-500/5 text-emerald-600" : ""}`}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </Button>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
}