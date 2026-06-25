"use client";

import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";
import { NewsCard } from "@/components/cards/news-card";
import { news } from "@/lib/data";

export default function NewsPage() {
  const sortedNews = [...news].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const featured = sortedNews[0];
  const rest = sortedNews.slice(1);

  return (
    <div className="container py-8 md:py-12">
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Newspaper className="h-8 w-8 text-morandi-slate" />
          <h1 className="text-3xl md:text-4xl font-bold">AI资讯</h1>
        </div>
        <p className="text-muted-foreground">
          AI行业最新动态与趋势
        </p>
      </motion.div>

      {featured && (
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <NewsCard news={featured} featured />
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + idx * 0.05 }}
          >
            <NewsCard news={item} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
