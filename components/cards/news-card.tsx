import { Newspaper, Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { NewsItem } from "@/lib/types";

interface NewsCardProps {
  news: NewsItem;
  className?: string;
  featured?: boolean;
}

export function NewsCard({ news, className, featured = false }: NewsCardProps) {
  return (
    <a
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <Card
        className={cn(
          "group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm",
          featured && "md:flex",
          className
        )}
      >
        <div className={cn("relative overflow-hidden", featured ? "md:w-1/2 h-48 md:h-auto" : "h-36")}>
          <img
            src={news.image || "https://picsum.photos/seed/news-default/600/400"}
            alt={news.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="text-xs px-2 py-1 rounded-full bg-black/50 text-white backdrop-blur-sm">
              {news.category}
            </span>
          </div>
        </div>

        <CardContent className={cn("p-4 space-y-2", featured && "md:w-1/2 md:p-6 md:flex md:flex-col md:justify-center")}>
          <h3
            className={cn(
              "font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2",
              featured ? "text-lg md:text-xl" : "text-sm"
            )}
          >
            {news.title}
          </h3>

          {featured && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {news.summary}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Newspaper className="h-3.5 w-3.5" />
                {news.source}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(news.publishedAt).toLocaleDateString("zh-CN")}
              </span>
            </div>
            <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
