"use client";

import Link from "next/link";
import { Star, ExternalLink, Heart, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn, formatNumber } from "@/lib/utils";
import type { Tool } from "@/lib/types";
import { useState, useEffect } from "react";
import { isFavorite, addFavorite, removeFavorite } from "@/lib/db";

interface ToolCardProps {
  tool: Tool;
  rank?: number;
  className?: string;
}

export function ToolCard({ tool, rank, className }: ToolCardProps) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    isFavorite(tool.id, "tool").then(setFavorited);
  }, [tool.id]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorited) {
      await removeFavorite(tool.id, "tool");
      setFavorited(false);
    } else {
      await addFavorite({
        itemId: tool.id,
        itemType: "tool",
        name: tool.name,
        description: tool.description,
        image: tool.logo,
      });
      setFavorited(true);
    }
  };

  return (
    <Link href={`/tools/${tool.id}`}>
      <Card
        className={cn(
          "group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm",
          className
        )}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {rank !== undefined && (
                <span className="text-2xl font-bold text-muted-foreground/30 w-8">
                  #{rank}
                </span>
              )}
              <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <button
              onClick={toggleFavorite}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-colors",
                  favorited
                    ? "fill-morandi-rose text-morandi-rose"
                    : "text-muted-foreground hover:text-morandi-rose"
                )}
              />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              {tool.isFree && (
                <Badge variant="secondary" className="text-xs">
                  免费
                </Badge>
              )}
              {tool.trending && (
                <Badge className="text-xs bg-morandi-rose/10 text-morandi-rose border-morandi-rose/20">
                  热门
                </Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
              {tool.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {tool.tags.slice(0, 3).map((tag) => (
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
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-morandi-sand text-morandi-sand" />
            <span className="font-medium text-foreground">{tool.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {formatNumber(tool.views || 0)} 浏览
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
