"use client";

import { useState } from "react";
import { Check, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

interface ShareButtonProps {
  url?: string;
  text?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export default function ShareButton({
  url = window.location.href,
  text = "Share this link",
  variant = "default",
  size = "default",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url ? getFullUrl(url) : window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          text: text,
          url: shareUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);

      toast.info("Lien copié dans le presse-papiers !");

      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      toast.error("Impossible de partager cette collection...");
      console.error(`Cannot share this collection: ${(e as Error).message}`);
    }
  };

  return (
    <Button onClick={handleShare} variant={variant} size={size} className="gap-2">
      {copied ? <Check className="h-4 w-4" /> : <Share className="h-4 w-4" />}
      {copied ? "" : text}
    </Button>
  );
}

function getFullUrl(path: string) {
  if (typeof window === "undefined") return path;

  const baseUrl = window.location.origin;

  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${cleanPath}`;
}
