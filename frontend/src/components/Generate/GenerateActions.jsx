import {
  Copy,
  Check,
  FileDown,
  Wand2,
  Loader2,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GenerateActions({ actions }) {
  const {
    copied,
    beautifying,
    downloading,
    handleCopy,
    handleBeautify,
    handleDownload,
    handleShare,
  } = actions;

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={handleShare}>
        <Share2 className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleBeautify}
        disabled={beautifying}
      >
        {beautifying ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Wand2 className="h-4 w-4" />
        )}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleDownload}
        disabled={downloading}
      >
        {downloading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <FileDown className="h-4 w-4" />
        )}
      </Button>

      <Button onClick={handleCopy} size="sm">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
}
