"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { withBasePath } from "@/lib/utils";
import { getFavorites, removeFavorite, type Favorite } from "@/lib/db";

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFavorites().then((favs) => {
      setFavorites(favs);
      setLoading(false);
    });
  }, []);

  const handleRemove = async (id: string, type: string) => {
    await removeFavorite(id, type);
    setFavorites(favorites.filter((f) => !(f.itemId === id && f.itemType === type)));
  };

  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <Heart className="h-8 w-8 fill-morandi-rose text-morandi-rose" />
          <h1 className="text-3xl md:text-4xl font-bold">我的收藏</h1>
        </div>
        <p className="text-muted-foreground mb-8">
          共 {favorites.length} 个收藏
        </p>

        {loading ? (
          <p className="text-center text-muted-foreground py-16">加载中...</p>
        ) : favorites.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-muted-foreground mb-4">还没有收藏任何内容</p>
              <Button asChild>
                <Link href={withBasePath("/tools")}>浏览工具库</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {favorites.map((fav) => {
              const detailPaths: Record<string, string> = {
                tool: `/tools/${fav.itemId}`,
                agent: `/agents/${fav.itemId}`,
                mcp: `/mcps/${fav.itemId}`,
                prompt: `/prompts/${fav.itemId}`,
                workflow: `/workflows/${fav.itemId}`,
              };
              const detailPath = detailPaths[fav.itemType];
              return (
                <Card
                  key={`${fav.itemType}-${fav.itemId}`}
                  className="group cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => detailPath && router.push(withBasePath(detailPath))}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {fav.image && (
                        <img
                          src={fav.image}
                          alt={fav.name}
                          className="h-12 w-12 rounded-xl object-cover shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold group-hover:text-primary transition-colors">{fav.name}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            {fav.itemType}
                          </span>
                        </div>
                        {fav.description && (
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {fav.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {fav.url && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(fav.url, "_blank", "noopener,noreferrer");
                            }}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            访问
                          </Button>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(fav.itemId, fav.itemType);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
