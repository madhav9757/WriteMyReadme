import api from "@/api/api";
import { toast } from "sonner";
import { useState } from "react";

export function useGenerateActions({ content, setContent, setView }) {
  const [copied, setCopied] = useState(false);
  const [beautifying, setBeautifying] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBeautify = async () => {
    try {
      setBeautifying(true);
      const res = await api.post("/readme/beautify", { readme: content });
      if (res.data?.data) {
        setContent(res.data.data);
        setView("preview");
      }
    } catch {
      toast.error("Beautify failed");
    } finally {
      setBeautifying(false);
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloading(false), 800);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ text: content.slice(0, 200) });
    } else {
      handleCopy();
    }
  };

  return {
    copied,
    beautifying,
    downloading,
    handleCopy,
    handleBeautify,
    handleDownload,
    handleShare,
  };
}
