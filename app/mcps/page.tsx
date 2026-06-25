"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Puzzle,
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
import { MCPCard } from "@/components/cards/mcp-card";
import { Badge } from "@/components/ui/badge";
import { mcps, tags } from "@/lib/data";
import { searchMCPs } from "@/lib/search";
import { cn } from "@/lib/utils";
import type { MCP } from "@/lib/types";

const mcpCategories = [
  { id: "all", name: "全部MCP", count: mcps.length },
  { id: "developer-tools", name: "开发工具", count: mcps.filter(m => m.category === "developer-tools").length },
  { id: "design-tools", name: "设计工具", count: mcps.filter(m => m.category === "design-tools").length },
  { id: "productivity", name: "生产力", count: mcps.filter(m => m.category === "productivity").length },
  { id: "communication", name: "通讯", count: mcps.filter(m => m.category === "communication").length },
  { id: "automation", name: "自动化", count: mcps.filter(m => m.category === "automation").length },
  { id: "database", name: "数据库", count: mcps.filter(m => m.category === "database").length },
];

export default function MCPPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filteredMCPs = useMemo(() => {
    let result: MCP[] = [...mcps];

    if (searchQuery) {
      result = searchMCPs(searchQuery);
    }

    if (selectedCategory !== "all") {
      result = result.filter((m) => m.category === selectedCategory);
    }

    if (selectedTags.length > 0) {
      result = result.filter((m) =>
        selectedTags.some((tag) => m.tags.includes(tag))
      );
    }

    switch (sortBy) {
      case "popular":
        result.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
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
          <Puzzle className="h-8 w-8 text-morandi-terracotta" />
          <h1 className="text-3xl md:text-4xl font-bold">MCP服务器库</h1>
        </div>
        <p className="text-muted-foreground">
          Model Context Protocol - 扩展AI模型的能力边界
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
                {mcpCategories.map((cat) => (
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
                placeholder="搜索MCP..."
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
                  <DropdownMenuItem onClick={() => setSortBy("rating")}>
                    评分最高
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("newest")}>
                    最新更新
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("name")}>
                    名称排序
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            共 {filteredMCPs.length} 个MCP服务器
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMCPs.map((mcp, index) => (
              <motion.div
                key={mcp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <MCPCard mcp={mcp} />
              </motion.div>
            ))}
          </div>

          {filteredMCPs.length === 0 && (
            <div className="text-center py-16">
              <Puzzle className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">没有找到匹配的MCP</p>
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
