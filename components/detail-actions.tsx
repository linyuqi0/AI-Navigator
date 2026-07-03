"use client";

import { useState, useEffect } from "react";
import { Heart, Share2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isFavorite, addFavorite, removeFavorite } from "@/lib/db";

interface DetailActionsProps {
  id: string;
  type: "tool" | "agent" | "mcp";
  name: string;
  description: string;
  image: string;
  url: string;
}

export function DetailActions({
  id,
  type,
  name,
  description,
  image,
  url,
}: DetailActionsProps) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    isFavorite(id, type).then(setFavorited);
  }, [id, type]);

  const handleFavorite = async () => {
    if (favorited) {
      await removeFavorite(id, type);
      setFavorited(false);
    } else {
      await addFavorite({
        itemId: id,
        itemType: type,
        name,
        description,
        image,
        url,
      });
      setFavorited(true);
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: name, text: description, url: shareUrl });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("链接已复制到剪贴板");
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button size="lg" asChild>
        <a href={url} target="_blank" rel="noopener noreferrer">
          访问官网
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </Button>
      <Button variant="outline" size="lg" onClick={handleFavorite}>
        <Heart
          className={`mr-2 h-4 w-4 transition-colors ${
            favorited ? "fill-morandi-rose text-morandi-rose" : ""
          }`}
        />
        {favorited ? "已收藏" : "收藏"}
      </Button>
      <Button variant="outline" size="lg" onClick={handleShare}>
        <Share2 className="mr-2 h-4 w-4" />
        分享
      </Button>
    </div>
  );
}
