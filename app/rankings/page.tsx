"use client";

import { motion } from "framer-motion";
import { Trophy, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { rankings, getToolById } from "@/lib/data";
import { withBasePath } from "@/lib/utils";
import Link from "next/link";

export default function RankingsPage() {
  return (
    <div className="container py-8 md:py-12">
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="h-8 w-8 text-morandi-sand" />
          <h1 className="text-3xl md:text-4xl font-bold">AI工具榜单</h1>
        </div>
        <p className="text-muted-foreground">
          经过深度评测的权威AI工具排行榜
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rankings.map((ranking, idx) => (
          <motion.div
            key={ranking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link href={withBasePath(`/rankings/${ranking.id}`)}>
              <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <div className="h-32 bg-gradient-to-br from-morandi-sand/20 via-morandi-rose/20 to-morandi-sage/20 p-6 flex items-center">
                  <div className="h-14 w-14 rounded-xl bg-white/80 dark:bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <Trophy className="h-7 w-7 text-morandi-terracotta" />
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {ranking.period}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {ranking.items.length} 个入选
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors mb-2">
                    {ranking.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {ranking.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {ranking.items.slice(0, 3).map((item) => {
                      const tool = getToolById(item.toolId);
                      if (!tool) return null;
                      return (
                        <div
                          key={item.toolId}
                          className="flex items-center gap-3"
                        >
                          <span
                            className={`text-sm font-bold w-5 ${
                              item.rank === 1
                                ? "text-morandi-sand"
                                : item.rank === 2
                                ? "text-muted-foreground"
                                : "text-muted-foreground/70"
                            }`}
                          >
                            #{item.rank}
                          </span>
                          <img
                            src={tool.logo}
                            alt={tool.name}
                            className="h-6 w-6 rounded-md"
                          />
                          <span className="text-sm font-medium truncate">
                            {tool.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-sm text-primary font-medium flex items-center gap-1">
                    查看完整榜单
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
