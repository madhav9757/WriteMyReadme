import React from "react";
import { ChevronLeft, Copy, Check, Code2, Eye, Sparkles, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="container max-w-7xl mx-auto h-16 flex items-center justify-between px-4">
        {/* Left: Back + Repo */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Separator orientation="vertical" className="h-6 hidden sm:block" />
          <div className="flex items-center gap-2 truncate">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold truncate">{repoName}</span>
            <Badge variant="secondary" className="text-[10px]">README</Badge>
          </div>
        </div>

        {/* Middle: Tabs */}
        <Tabs value={view} onValueChange={setView}>
          <TabsList className="h-9">
            <TabsTrigger value="preview" className="gap-2">
              <Eye className="h-4 w-4" /> Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="gap-2">
              <Code2 className="h-4 w-4" /> Source
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={handleBeautify} disabled={beautifying} className="gap-2">
            <Sparkles className={`h-4 w-4 ${beautifying ? "animate-spin" : ""}`} />
            {beautifying ? "Beautifying..." : "Beautify"}
          </Button>
          <Button size="sm" variant="outline" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
