"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Workflow as WorkflowIcon, Clock, Zap, ListChecks, Tag as TagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { Workflow } from "@/lib/types";
import { WorkflowCard } from "@/components/cards/workflow-card";
import { workflows } from "@/lib/data";

interface Props {
  workflow: Workflow;
}

export function WorkflowDetailClient({ workflow }: Props) {
  const router = useRouter();

  const relatedWorkflows = workflows
    .filter((w) => w.id !== workflow.id && w.category === workflow.category)
    .slice(0, 3);

  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 -ml-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        返回
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden mb-8">
          <img
            src={workflow.cover}
            alt={workflow.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 mb-3">
              {workflow.featured && (
                <Badge className="bg-white/90 text-foreground">精选</Badge>
              )}
              <Badge variant="outline" className="bg-white/20 border-white/30 text-white">
                {workflow.category}
              </Badge>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
              {workflow.name}
            </h1>
            <p className="text-white/90 max-w-2xl">{workflow.description}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-morandi-sand/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-morandi-terracotta" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">周期</div>
                <div className="font-semibold">{workflow.duration}</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-morandi-sage/20 flex items-center justify-center">
                <Zap className="h-5 w-5 text-morandi-sage" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">难度</div>
                <div className="font-semibold">{workflow.difficulty}</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-morandi-rose/20 flex items-center justify-center">
                <ListChecks className="h-5 w-5 text-morandi-rose" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">步骤数</div>
                <div className="font-semibold">{workflow.steps.length} 步</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ListChecks className="h-5 w-5" />
              工作流步骤
            </h2>
            <ol className="space-y-3">
              {workflow.steps.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-none flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-sm leading-relaxed pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-3">使用的工具</h2>
              <div className="flex flex-wrap gap-2">
                {workflow.tools.map((tool) => (
                  <Badge key={tool} variant="secondary" className="text-sm">
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <TagIcon className="h-5 w-5" />
                标签
              </h2>
              <div className="flex flex-wrap gap-2">
                {workflow.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          最后更新：{formatDate(workflow.updatedAt)}
        </p>

        {relatedWorkflows.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6">相关工作流</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedWorkflows.map((w) => (
                <WorkflowCard key={w.id} workflow={w} />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
