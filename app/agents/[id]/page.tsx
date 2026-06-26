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
  Bot,
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
import { getAgentById, agents } from "@/lib/data";
import { AgentCard } from "@/components/cards/agent-card";
import { formatDate, formatNumber } from "@/lib/utils";
import Link from "next/link";

interface AgentPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return agents.map((agent) => ({ id: agent.id }));
}

export function generateMetadata({ params }: AgentPageProps): Metadata {
  const agent = getAgentById(params.id);
  if (!agent) return { title: "Agent未找到" };
  return {
    title: agent.seoTitle,
    description: agent.seoDescription,
    keywords: agent.tags,
  };
}

export default function AgentDetailPage({ params }: AgentPageProps) {
  const agent = getAgentById(params.id);

  if (!agent) notFound();

  const relatedAgents = agents
    .filter((a) => a.category === agent.category && a.id !== agent.id)
    .slice(0, 4);

  return (
    <div className="container py-8 md:py-12">
      <Link
        href="/agents"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        返回Agent库
      </Link>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-start gap-4">
            <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-morandi-rose/10 shrink-0 shadow-lg">
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">{agent.name}</h1>
                {agent.featured && (
                  <Badge className="bg-morandi-sage/10 text-morandi-sage border-morandi-sage/20">
                    精选
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground text-lg">{agent.description}</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-morandi-sand text-morandi-sand" />
                  <span className="font-semibold">{agent.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  {formatNumber(agent.views || 0)} 浏览
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {formatDate(agent.updatedAt)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <a href={agent.url} target="_blank" rel="noopener noreferrer">
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
            {agent.tags.map((tag) => (
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
                <p className="font-medium">{agent.category}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">官方链接</p>
                <a
                  href={agent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-primary truncate block"
                >
                  {agent.url.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="features" className="mb-12">
        <TabsList className="mb-6">
          <TabsTrigger value="features">主要功能</TabsTrigger>
          <TabsTrigger value="usecases">适用场景</TabsTrigger>
        </TabsList>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>核心功能</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                {agent.features.map((feature, idx) => (
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

        <TabsContent value="usecases">
          <Card>
            <CardHeader>
              <CardTitle>适用场景</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                {agent.useCases.map((uc, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                  >
                    <CheckCircle2 className="h-5 w-5 text-morandi-teal shrink-0 mt-0.5" />
                    <span>{uc}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {relatedAgents.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">相关Agent</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedAgents.map((a) => (
              <AgentCard key={a.id} agent={a} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
