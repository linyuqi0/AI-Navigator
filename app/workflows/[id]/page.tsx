import { notFound } from "next/navigation";
import { Metadata } from "next";
import { workflows } from "@/lib/data";
import { WorkflowDetailClient } from "./client";

interface PageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return workflows.map((w) => ({ id: w.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const workflow = workflows.find((w) => w.id === params.id);
  if (!workflow) return { title: "工作流未找到" };
  return {
    title: workflow.seoTitle,
    description: workflow.seoDescription,
    keywords: workflow.tags,
  };
}

export default function WorkflowDetailPage({ params }: PageProps) {
  const workflow = workflows.find((w) => w.id === params.id);
  if (!workflow) {
    notFound();
  }
  return <WorkflowDetailClient workflow={workflow} />;
}
