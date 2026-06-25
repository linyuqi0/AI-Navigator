"use client";

import Link from "next/link";
import { Workflow as WorkflowIcon, Heart, Clock, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn, formatNumber, withBasePath } from "@/lib/utils";
import type { Workflow } from "@/lib/types";
import { useState, useEffect } from "react";
import { isFavorite, addFavorite, removeFavorite } from "@/lib/db";

interface WorkflowCardProps {
  workflow: Workflow;
  className?: string;
}

export function WorkflowCard({ workflow, className }: WorkflowCardProps) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    isFavorite(workflow.id, "workflow").then(setFavorited);
  }, [workflow.id]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorited) {
      await removeFavorite(workflow.id, "workflow");
      setFavorited(false);
    } else {
      await addFavorite({
        itemId: workflow.id,
        itemType: "workflow",
        name: workflow.name,
        description: workflow.description,
        image: workflow.cover,
      });
      setFavorited(true);
    }
  };

  return (
    <Link href={withBasePath(`/workflows/${workflow.id}`)}>
      <Card
        className={cn(
          "group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm",
          className
        )}
      >
        <div className="relative h-36 overflow-hidden">
          <img
            src={workflow.cover}
            alt={workflow.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart
              className={cn(
                "h-4 w-4 text-white transition-colors",
                favorited ? "fill-morandi-rose text-morandi-rose" : ""
              )}
            />
          </button>
          {workflow.featured && (
            <Badge className="absolute top-3 left-3 bg-white/90 text-foreground">
              精选
            </Badge>
          )}
        </div>

        <CardContent className="p-5">
          <div className="space-y-2">
            <h3 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors">
              {workflow.name}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
              {workflow.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {workflow.tags.slice(0, 3).map((tag) => (
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
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {workflow.duration}
            </span>
            <span className="flex items-center gap-1">
              <Zap className="h-3.5 w-3.5" />
              {workflow.difficulty}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {formatNumber(workflow.views || 0)} 浏览
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
