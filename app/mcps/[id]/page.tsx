import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  Star,
  ExternalLink,
  Calendar,
  Tag,
  CheckCircle2,
  Share2,
  Heart,
  ChevronLeft,
  Eye,
  Puzzle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMCPById, mcps } from "@/lib/data";
import { MCPCard } from "@/components/cards/mcp-card";
import { formatDate, formatNumber } from "@/lib/utils";
import Link from "next/link";

interface MCPPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return mcps.map((mcp) => ({ id: mcp.id }));
}

export function generateMetadata({ params }: MCPPageProps): Metadata {
  const mcp = getMCPById(params.id);
  if (!mcp) return { title: "MCP未找到" };
  return {
    title: mcp.seoTitle,
    description: mcp.seoDescription,
    keywords: mcp.tags,
  };
}

export default function MCPDetailPage({ params }: MCPPageProps) {
  const mcp = getMCPById(params.id);

  if (!mcp) notFound();

  const relatedMCPs = mcps
    .filter((m) => m.category === mcp.category && m.id !== mcp.id)
    .slice(0, 4);

  return (
    <div className="container py-8 md:py-12">
      <Link
        href="/mcps"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        返回MCP库
      </Link>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-start gap-4">
            <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-morandi-sand/10 shrink-0 shadow-lg">
              <img
                src={mcp.logo}
                alt={mcp.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">{mcp.name}</h1>
                {mcp.featured && (
                  <Badge className="bg-morandi-sage/10 text-morandi-sage border-morandi-sage/20">
                    精选
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground text-lg">{mcp.description}</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-morandi-sand text-morandi-sand" />
                  <span className="font-semibold">{mcp.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  {formatNumber(mcp.views || 0)} 浏览
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {formatDate(mcp.updatedAt)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <a href={mcp.url} target="_blank" rel="noopener noreferrer">
                了解更多
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="mr-2 h-4 w-4" />
              收藏
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="mr-2 h-4 w-4" />
              分享
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {mcp.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-sm">
                <Tag className="mr-1 h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-5 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">分类</p>
                <p className="font-medium">{mcp.category}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">官方链接</p>
                <a
                  href={mcp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-primary truncate block"
                >
                  {mcp.url.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>核心功能</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-3">
            {mcp.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
              >
                <CheckCircle2 className="h-5 w-5 text-morandi-sage shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {relatedMCPs.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">相关MCP</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedMCPs.map((m) => (
              <MCPCard key={m.id} mcp={m} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
