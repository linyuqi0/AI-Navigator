"use client";

import Link from "next/link";
import { MessageSquareText, Heart, Copy, Check, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn, withBasePath } from "@/lib/utils";
import type { Prompt } from "@/lib/types";
import { useState, useEffect } from "react";
import { isFavorite, addFavorite, removeFavorite } from "@/lib/db";

interface PromptCardProps {
  prompt: Prompt;
  className?: string;
}

export function PromptCard({ prompt, className }: PromptCardProps) {
  const [favorited, setFavorited] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    isFavorite(prompt.id, "prompt").then(setFavorited);
  }, [prompt.id]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorited) {
      await removeFavorite(prompt.id, "prompt");
      setFavorited(false);
    } else {
      await addFavorite({
        itemId: prompt.id,
        itemType: "prompt",
        name: prompt.title,
        description: prompt.content.slice(0, 100),
      });
      setFavorited(true);
    }
  };

  const copyPrompt = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Link href={withBasePath(`/prompts/${prompt.id}`)}>
      <Card
        className={cn(
          "group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm",
          className
        )}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-morandi-teal/10 flex items-center justify-center">
                <MessageSquareText className="h-5 w-5 text-morandi-teal" />
              </div>
              {prompt.featured && (
                <Badge className="text-xs bg-morandi-sage/10 text-morandi-sage border-morandi-sage/20">
                  精选
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={copyPrompt}
                className="p-1.5 rounded-md hover:bg-muted transition-colors"
                title="复制"
                aria-label="复制"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-morandi-sage" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              <button
                onClick={toggleFavorite}
                className="p-1.5 rounded-md hover:bg-muted transition-colors"
                aria-label="收藏"
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-colors",
                    favorited
                      ? "fill-morandi-rose text-morandi-rose"
                      : "text-muted-foreground"
                  )}
                />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors">
              {prompt.title}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-3 min-h-[60px] font-mono text-xs bg-muted/50 p-2 rounded-md">
              {prompt.content.slice(0, 150)}...
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {prompt.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-5 py-3 border-t border-border/50 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {prompt.author}
          </span>
          <span className="text-xs text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            查看
            <ArrowRight className="h-3 w-3" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
