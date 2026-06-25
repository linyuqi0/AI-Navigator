import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  Share2,
  Heart,
  ChevronLeft,
  Eye,
  Clock,
  Zap,
  Wrench,
  ListChecks,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getWorkflowById, workflows } from "@/lib/data";
import { WorkflowCard } from "@/components/cards/workflow-card";
import { formatDate, formatNumber, withBasePath } from "@/lib/utils";
import Link from "next/link";

interface WorkflowPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return workflows.map((w) => ({ id: w.id }));
}

export function generateMetadata({ params }: WorkflowPageProps): Metadata {
  const workflow = getWorkflowById(params.id);
  if (!workflow) return { title: "工作流未找到" };
  return {
    title: workflow.seoTitle,
    description: workflow.seoDescription,
    keywords: workflow.tags,
  };
}

export default function WorkflowDetailPage({ params }: WorkflowPageProps) {
  const workflow = getWorkflowById(params.id);

  if (!workflow) notFound();

  const relatedWorkflows = workflows
    .filter((w) => w.category === workflow.category && w.id !== workflow.id)
    .slice(0, 4);

  return (
    <div className="container py-8 md:py-12">
      <Link
        href={withBasePath("/workflows")}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        返回工作流库
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <img
            src={workflow.cover}
            alt={workflow.name}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <Badge className="mb-3">{workflow.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {workflow.name}
            </h1>
            <p className="text-white/80">{workflow.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <Button size="lg">
            <Heart className="mr-2 h-4 w-4" />
            收藏工作流
          </Button>
          <Button variant="outline" size="lg">
            <Share2 className="mr-2 h-4 w-4" />
            分享
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-morandi-sage/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-morandi-sage" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">周期</p>
                <p className="font-semibold">{workflow.duration}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-morandi-rose/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-morandi-rose" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">难度</p>
                <p className="font-semibold">{workflow.difficulty}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-morandi-sand/10 flex items-center justify-center">
                <Eye className="h-5 w-5 text-morandi-sand" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">浏览量</p>
                <p className="font-semibold">{formatNumber(workflow.views || 0)}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-morandi-teal/10 flex items-center justify-center">
                <Wrench className="h-5 w-5 text-morandi-teal" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">工具数</p>
                <p className="font-semibold">{workflow.tools.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-morandi-sage" />
              工作流步骤
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workflow.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                      {idx + 1}
                    </div>
                    {idx < workflow.steps.length - 1 && (
                      <div className="w-0.5 flex-1 bg-border mt-2" />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className="font-medium">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-morandi-terracotta" />
              使用工具
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {workflow.tools.map((tool) => (
                <Badge key={tool} variant="outline" className="text-sm px-3 py-1.5">
                  {tool}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {relatedWorkflows.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">相关工作流</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedWorkflows.map((w) => (
                <WorkflowCard key={w.id} workflow={w} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
