import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  Trophy,
  ChevronLeft,
  Star,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { getRankingById, rankings, getToolById } from "@/lib/data";
import { ToolCard } from "@/components/cards/tool-card";

import Link from "next/link";

interface RankingPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return rankings.map((r) => ({ id: r.id }));
}

export function generateMetadata({ params }: RankingPageProps): Metadata {
  const ranking = getRankingById(params.id);
  if (!ranking) return { title: "榜单未找到" };
  return {
    title: ranking.seoTitle,
    description: ranking.seoDescription,
  };
}

export default function RankingDetailPage({ params }: RankingPageProps) {
  const ranking = getRankingById(params.id);

  if (!ranking) notFound();

  return (
    <div className="container py-8 md:py-12">
      <Link
        href="/rankings"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        返回榜单列表
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-morandi-sand to-morandi-rose flex items-center justify-center mb-4">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <Badge className="mb-3">{ranking.period}</Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {ranking.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {ranking.description}
          </p>
        </div>

        <div className="space-y-4 mb-16">
          {ranking.items.map((item, idx) => {
            const tool = getToolById(item.toolId);
            if (!tool) return null;

            const rankColors = [
              "from-yellow-400 to-yellow-600 text-white",
              "from-gray-300 to-gray-500 text-white",
              "from-amber-600 to-amber-800 text-white",
            ];

            return (
              <Link key={item.toolId} href={`/tools/${tool.id}`}>
                <Card className="overflow-hidden hover:shadow-md transition-all cursor-pointer group">
                  <CardContent className="p-4 md:p-5 flex items-center gap-4 md:gap-6">
                    <div
                      className={`h-10 w-10 md:h-12 md:w-12 rounded-lg flex items-center justify-center font-bold text-lg shrink-0 bg-gradient-to-br ${
                        rankColors[idx] || "bg-muted"
                      }`}
                    >
                      {item.rank}
                    </div>

                    <img
                      src={tool.logo}
                      alt={tool.name}
                      className="h-12 w-12 md:h-14 md:w-14 rounded-xl shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-base md:text-lg group-hover:text-primary transition-colors truncate">
                          {tool.name}
                        </h3>
                        {tool.isFree && (
                          <Badge variant="secondary" className="text-xs shrink-0">
                            免费
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {tool.description}
                      </p>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-morandi-sand text-morandi-sand" />
                          <span className="font-semibold">{tool.rating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">综合评分</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{item.score}</p>
                        <p className="text-xs text-muted-foreground">得分</p>
                      </div>
                    </div>

                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">更多榜单</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {rankings
              .filter((r) => r.id !== ranking.id)
              .slice(0, 3)
              .map((r) => (
                <Link key={r.id} href={`/rankings/${r.id}`}>
                  <Card className="h-full hover:shadow-md transition-all cursor-pointer group">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="h-5 w-5 text-morandi-sand" />
                        <Badge variant="outline" className="text-xs">
                          {r.period}
                        </Badge>
                      </div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {r.title}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
