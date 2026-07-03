import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  Star,
  ExternalLink,
  Calendar,
  Tag,
  CheckCircle2,
  XCircle,
  Share2,
  Heart,
  ChevronLeft,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { getToolById, tools } from "@/lib/data";
import { ToolCard } from "@/components/cards/tool-card";
import { formatDate, formatNumber, withBasePath } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface ToolPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return tools.map((tool) => ({ id: tool.id }));
}

export function generateMetadata({ params }: ToolPageProps): Metadata {
  const tool = getToolById(params.id);
  if (!tool) {
    return { title: "工具未找到" };
  }
  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    keywords: tool.tags,
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      type: "article",
      images: [tool.logo],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.seoTitle,
      description: tool.seoDescription,
      images: [tool.logo],
    },
  };
}

export default function ToolDetailPage({ params }: ToolPageProps) {
  const tool = getToolById(params.id);

  if (!tool) {
    notFound();
  }

  const relatedTools = tools
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    image: tool.logo,
    url: tool.url,
    ratingValue: tool.rating,
    applicationCategory: "AIApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: tool.isFree ? "0" : "20",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container py-8 md:py-12">
        <Link
          href={withBasePath("/tools")}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          返回工具库
        </Link>

        {/* Hero */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-start gap-4">
              <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-muted shrink-0 shadow-lg">
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold">{tool.name}</h1>
                  {tool.isFree && <Badge variant="secondary">免费</Badge>}
                  {tool.featured && (
                    <Badge className="bg-morandi-sage/10 text-morandi-sage border-morandi-sage/20">
                      精选
                    </Badge>
                  )}
                  {tool.trending && (
                    <Badge className="bg-morandi-rose/10 text-morandi-rose border-morandi-rose/20">
                      热门
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-lg">{tool.description}</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-morandi-sand text-morandi-sand" />
                    <span className="font-semibold">{tool.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    {formatNumber(tool.views || 0)} 浏览
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formatDate(tool.updatedAt)}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href={tool.url} target="_blank" rel="noopener noreferrer">
                  访问官网
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
              {tool.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Side Info */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-5 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">价格</p>
                  <p className="font-semibold text-lg">{tool.price}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">分类</p>
                  <Link
                    href={withBasePath(`/tools?category=${tool.category}`)}
                    className="font-medium hover:text-primary"
                  >
                    {tool.category}
                  </Link>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">官方链接</p>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary truncate block"
                  >
                    {tool.url.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="features" className="mb-12">
          <TabsList className="mb-6">
            <TabsTrigger value="features">主要功能</TabsTrigger>
            <TabsTrigger value="screenshots">截图</TabsTrigger>
            <TabsTrigger value="usecases">适用场景</TabsTrigger>
            <TabsTrigger value="competitors">竞品对比</TabsTrigger>
          </TabsList>

          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>核心功能</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {tool.features.map((feature, idx) => (
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
          </TabsContent>

          <TabsContent value="screenshots">
            <div className="grid md:grid-cols-2 gap-6">
              {(tool.screenshots || []).map((src, idx) => (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden border border-border/50 shadow-lg"
                >
                  <img
                    src={src}
                    alt={`${tool.name} 截图 ${idx + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="usecases">
            <Card>
              <CardHeader>
                <CardTitle>适用场景</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {(tool.useCases || []).map((useCase, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                    >
                      <CheckCircle2 className="h-5 w-5 text-morandi-teal shrink-0 mt-0.5" />
                      <span>{useCase}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competitors">
            <Card>
              <CardHeader>
                <CardTitle>主要竞品</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {(tool.competitors || []).map((comp) => (
                    <Badge
                      key={comp}
                      variant="outline"
                      className="text-sm px-3 py-1.5"
                    >
                      {comp}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">相关工具</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedTools.map((t) => (
                <ToolCard key={t.id} tool={t} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
