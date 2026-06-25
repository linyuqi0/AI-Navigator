"use client";

import Link from "next/link";
import { Puzzle, Star, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn, formatNumber, withBasePath } from "@/lib/utils";
import type { MCP } from "@/lib/types";
import { useState, useEffect } from "react";
import { isFavorite, addFavorite, removeFavorite } from "@/lib/db";

interface MCPCardProps {
  mcp: MCP;
  className?: string;
}

export function MCPCard({ mcp, className }: MCPCardProps) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    isFavorite(mcp.id, "mcp").then(setFavorited);
  }, [mcp.id]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorited) {
      await removeFavorite(mcp.id, "mcp");
      setFavorited(false);
    } else {
      await addFavorite({
        itemId: mcp.id,
        itemType: "mcp",
        name: mcp.name,
        description: mcp.description,
        image: mcp.logo,
      });
      setFavorited(true);
    }
  };

  return (
    <Link href={withBasePath(`/mcps/${mcp.id}`)}>
      <Card
        className={cn(
          "group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm",
          className
        )}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-morandi-sand/10 flex items-center justify-center">
              <img
                src={mcp.logo}
                alt={mcp.name}
                className="h-full w-full object-cover"
              />
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
                {mcp.name}
              </h3>
              {mcp.featured && (
                <Badge className="text-xs bg-morandi-sage/10 text-morandi-sage border-morandi-sage/20">
                  精选
                </Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
              {mcp.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {mcp.tags.slice(0, 3).map((tag) => (
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
            <span className="font-medium text-foreground">{mcp.rating}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {formatNumber(mcp.views || 0)} 浏览
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
