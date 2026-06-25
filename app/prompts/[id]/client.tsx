"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MessageSquareText, Copy, Check, Heart, Calendar, User, Tag as TagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { withBasePath, formatDate } from "@/lib/utils";
import type { Prompt } from "@/lib/types";
import { isFavorite, addFavorite, removeFavorite } from "@/lib/db";
import { PromptCard } from "@/components/cards/prompt-card";
import { prompts } from "@/lib/data";
import { useEffect } from "react";

interface Props {
  prompt: Prompt;
}

export function PromptDetailClient({ prompt }: Props) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    isFavorite(prompt.id, "prompt").then(setFavorited);
  }, [prompt.id]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavorite = async () => {
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
    .filter((p) => p.id !== prompt.id && p.category === prompt.category)
    .slice(0, 3);

  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 -ml-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        返回
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="h-14 w-14 rounded-xl bg-morandi-teal/10 flex items-center justify-center shrink-0">
            <MessageSquareText className="h-7 w-7 text-morandi-teal" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {prompt.featured && (
                <Badge className="text-xs bg-morandi-sage/10 text-morandi-sage border-morandi-sage/20">
                  精选
                </Badge>
              )}
              <Badge variant="outline" className="text-xs">
                {prompt.category}
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {prompt.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {prompt.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(prompt.createdAt)}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <Button onClick={handleCopy} size="lg">
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  已复制
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  复制 Prompt
                </>
              )}
            </Button>
            <Button variant="outline" onClick={handleFavorite}>
              <Heart
                className={`h-4 w-4 mr-2 ${
                  favorited ? "fill-morandi-rose text-morandi-rose" : ""
                }`}
              />
              {favorited ? "已收藏" : "收藏"}
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-3">Prompt 内容</h2>
            <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed bg-muted/50 p-4 rounded-md overflow-x-auto">
              {prompt.content}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <TagIcon className="h-5 w-5" />
              标签
            </h2>
            <div className="flex flex-wrap gap-2">
              {prompt.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {relatedPrompts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6">相关 Prompt</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPrompts.map((p) => (
                <PromptCard key={p.id} prompt={p} />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
