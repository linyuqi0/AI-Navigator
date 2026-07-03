"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Star, ExternalLink, Crown, Medal, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { withBasePath, formatNumber } from "@/lib/utils";
import type { RankingItem } from "@/lib/types";
import { getToolById } from "@/lib/data";

interface Props {
  ranking: RankingItem;
}

export function RankingDetailClient({ ranking }: Props) {
  const router = useRouter();

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-700" />;
    return <span className="text-sm font-semibold">#{rank}</span>;
  };

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
        <div className="text-center mb-10">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-morandi-sand/30 to-morandi-rose/30 mb-4">
            <Trophy className="h-8 w-8 text-morandi-terracotta" />
          </div>
          <Badge variant="outline" className="mb-3">
            {ranking.period}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {ranking.title}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {ranking.description}
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {ranking.items.map((item) => {
                const tool = getToolById(item.toolId);
                if (!tool) {
                  return (
                    <div
                      key={item.toolId}
                      className="flex items-center gap-4 p-4 md:p-6"
                    >
                      <div className="w-10 flex items-center justify-center">
                        {getRankIcon(item.rank)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-muted-foreground">
                          {item.toolId}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          评分：{item.score}
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={item.toolId}
                    className="flex items-center gap-4 p-4 md:p-6 hover:bg-muted/30 transition-colors cursor-pointer group"
                    onClick={() => router.push(withBasePath(`/tools/${tool.id}`))}
                  >
                    <div className="w-10 flex items-center justify-center">
                      {getRankIcon(item.rank)}
                    </div>
                    <img
                      src={tool.logo}
                      alt={tool.name}
                      className="h-12 w-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-base group-hover:text-primary transition-colors">
                        {tool.name}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {tool.description}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-morandi-sand text-morandi-sand" />
                          {tool.rating}
                        </span>
                        <span>{formatNumber(tool.views || 0)} 浏览</span>
                        {tool.isFree && (
                          <Badge variant="secondary" className="text-xs py-0">
                            免费
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
                      <div className="text-2xl font-bold text-primary">
                        {item.score}
                      </div>
                      <div className="text-xs text-muted-foreground">评分</div>
                    </div>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(tool.url, "_blank", "noopener,noreferrer");
                      }}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      访问
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            榜单评分基于功能完整度、性能表现、用户口碑等多维度综合评估
          </p>
        </div>
      </motion.div>
    </div>
  );
}
