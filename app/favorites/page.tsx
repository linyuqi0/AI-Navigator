"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Clock,
  Trash2,
  Bookmark,
  Wrench,
  Bot,
  Puzzle,
  MessageSquareText,
  Workflow,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getFavorites,
  getHistory,
  removeFavorite,
  clearHistory,
  type Favorite,
  type HistoryItem,
} from "@/lib/db";
import Link from "next/link";
import { withBasePath } from "@/lib/utils";

const typeLabels: Record<string, string> = {
  tool: "工具",
  agent: "Agent",
  mcp: "MCP",
  prompt: "Prompt",
  workflow: "工作流",
};

const typeIcons: Record<string, any> = {
  tool: Wrench,
  agent: Bot,
  mcp: Puzzle,
  prompt: MessageSquareText,
  workflow: Workflow,
};

const typePaths: Record<string, string> = {
  tool: "/tools",
  agent: "/agents",
  mcp: "/mcps",
  prompt: "/prompts",
  workflow: "/workflows",
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const favs = await getFavorites();
    const hist = await getHistory();
    setFavorites(favs);
    setHistory(hist);
  };

  const handleRemoveFavorite = async (itemId: string, itemType: string) => {
    await removeFavorite(itemId, itemType);
    loadData();
  };

  const handleClearHistory = async () => {
    await clearHistory();
    loadData();
  };

  const renderItem = (item: Favorite | HistoryItem, showRemove = false) => {
    const IconComponent = typeIcons[item.itemType] || Bookmark;
    return (
      <Link
        key={`${item.itemType}-${item.itemId}`}
        href={withBasePath(`${typePaths[item.itemType]}/${item.itemId}`)}
      >
        <Card className="hover:shadow-md transition-all cursor-pointer group">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <IconComponent className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <Badge variant="outline" className="text-xs shrink-0">
                  {typeLabels[item.itemType]}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {item.description}
              </p>
            </div>
            {showRemove && (
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveFavorite(item.itemId, item.itemType);
                }}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            )}
          </CardContent>
        </Card>
      </Link>
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
          <Heart className="h-8 w-8 text-morandi-rose" />
          <h1 className="text-3xl md:text-4xl font-bold">我的收藏</h1>
        </div>
        <p className="text-muted-foreground">
          收藏的工具、Agent、MCP、Prompt和工作流
        </p>
      </motion.div>

      <Tabs defaultValue="favorites">
        <TabsList className="mb-6">
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            收藏夹
            <Badge variant="secondary" className="ml-1 text-xs">
              {favorites.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            浏览历史
          </TabsTrigger>
        </TabsList>

        <TabsContent value="favorites">
          {favorites.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground mb-4">还没有收藏任何内容</p>
              <p className="text-sm text-muted-foreground">
                浏览时点击收藏按钮，即可保存到这里
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {favorites.map((item) => renderItem(item, true))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history">
          {history.length === 0 ? (
            <div className="text-center py-16">
              <Clock className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">暂无浏览历史</p>
            </div>
          ) : (
            <div>
              <div className="flex justify-end mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearHistory}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  清空历史
                </Button>
              </div>
              <div className="space-y-3">
                {history.map((item) => renderItem(item))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
