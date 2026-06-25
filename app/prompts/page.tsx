"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  MessageSquareText,
  Filter,
  Search,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PromptCard } from "@/components/cards/prompt-card";
import { Badge } from "@/components/ui/badge";
import { prompts, tags } from "@/lib/data";
import { searchPrompts } from "@/lib/search";
import { cn } from "@/lib/utils";
import type { Prompt } from "@/lib/types";

const promptCategories = [
  { id: "all", name: "全部Prompt", count: prompts.length },
  { id: "product-manager", name: "产品经理", count: prompts.filter(p => p.category === "product-manager").length },
  { id: "operation", name: "运营", count: prompts.filter(p => p.category === "operation").length },
  { id: "designer", name: "设计师", count: prompts.filter(p => p.category === "designer").length },
  { id: "developer", name: "程序员", count: prompts.filter(p => p.category === "developer").length },
  { id: "advertising", name: "广告投放", count: prompts.filter(p => p.category === "advertising").length },
  { id: "self-media", name: "自媒体", count: prompts.filter(p => p.category === "self-media").length },
];

export default function PromptsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filteredPrompts = useMemo(() => {
    let result: Prompt[] = [...prompts];

    if (searchQuery) {
      result = searchPrompts(searchQuery);
    }

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedTags.length > 0) {
      result = result.filter((p) =>
        selectedTags.some((tag) => p.tags.includes(tag))
      );
    }

    switch (sortBy) {
      case "popular":
        result.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedTags, sortBy]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="container py-8 md:py-12">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <MessageSquareText className="h-8 w-8 text-morandi-teal" />
          <h1 className="text-3xl md:text-4xl font-bold">Prompt库</h1>
        </div>
        <p className="text-muted-foreground">
          精选高质量Prompt，释放AI的最大潜力
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-6">
        <aside
          className={cn(
            "md:w-64 shrink-0 space-y-6",
            !showFilters && "hidden md:block"
          )}
        >
          <div className="sticky top-24 space-y-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">分类</h3>
              <div className="space-y-1">
                {promptCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between",
                      selectedCategory === cat.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent"
                    )}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs opacity-70">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-sm">标签</h3>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 12).map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.name)}
                    className={cn(
                      "text-xs px-2.5 py-1 rounded-full border transition-colors",
                      selectedTags.includes(tag.name)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-input hover:border-primary/50"
                    )}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索Prompt..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    排序
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("popular")}>
                    最受欢迎
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("newest")}>
                    最新发布
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("name")}>
                    名称排序
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            共 {filteredPrompts.length} 个Prompt
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPrompts.map((prompt, index) => (
              <motion.div
                key={prompt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <PromptCard prompt={prompt} />
              </motion.div>
            ))}
          </div>

          {filteredPrompts.length === 0 && (
            <div className="text-center py-16">
              <MessageSquareText className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">没有找到匹配的Prompt</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedTags([]);
                }}
              >
                清除筛选
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
