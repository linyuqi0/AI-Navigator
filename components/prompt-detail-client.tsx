"use client";

import { useState, useEffect } from "react";
import {
  Share2,
  Heart,
  ChevronLeft,
  Eye,
  Copy,
  Check,
  Tag,
  User,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PromptCard } from "@/components/cards/prompt-card";
import { formatDate, formatNumber, withBasePath } from "@/lib/utils";
import { isFavorite, addFavorite, removeFavorite, addHistory } from "@/lib/db";
import Link from "next/link";
import type { Prompt } from "@/lib/types";
import { prompts } from "@/lib/data";

interface PromptDetailClientProps {
  prompt: Prompt;
}

export function PromptDetailClient({ prompt }: PromptDetailClientProps) {
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    isFavorite(prompt.id, "prompt").then(setFavorited);
    addHistory({
      itemId: prompt.id,
      itemType: "prompt",
      name: prompt.title,
      description: prompt.content.slice(0, 100),
    });
  }, [prompt.id, prompt.title, prompt.content]);

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFavorite = async () => {
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

  const relatedPrompts = prompts
    .filter((p) => p.category === prompt.category && p.id !== prompt.id)
    .slice(0, 4);

  return (
    <div className="container py-8 md:py-12">
      <Link
        href={withBasePath("/prompts")}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        返回Prompt库
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-4 mb-8">
          <Badge variant="outline" className="w-fit">
            {prompt.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold">{prompt.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {prompt.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(prompt.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {formatNumber(prompt.views || 0)} 浏览
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <Button size="lg" onClick={copyPrompt}>
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                已复制
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                复制Prompt
              </>
            )}
          </Button>
          <Button variant="outline" size="lg" onClick={toggleFavorite}>
            <Heart
              className={`mr-2 h-4 w-4 ${favorited ? "fill-current" : ""}`}
            />
            {favorited ? "已收藏" : "收藏"}
          </Button>
          <Button variant="outline" size="lg">
            <Share2 className="mr-2 h-4 w-4" />
            分享
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Prompt 内容</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted/50 p-4 rounded-lg whitespace-pre-wrap text-sm font-mono leading-relaxed">
              {prompt.content}
            </pre>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2 mb-12">
          {prompt.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>

        {relatedPrompts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">相关Prompt</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedPrompts.map((p) => (
                <PromptCard key={p.id} prompt={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
