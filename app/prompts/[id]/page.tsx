import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prompts } from "@/lib/data";
import { PromptDetailClient } from "./client";

interface PageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return prompts.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const prompt = prompts.find((p) => p.id === params.id);
  if (!prompt) return { title: "Prompt 未找到" };
  return {
    title: prompt.seoTitle,
    description: prompt.seoDescription,
    keywords: prompt.tags,
  };
}

export default function PromptDetailPage({ params }: PageProps) {
  const prompt = prompts.find((p) => p.id === params.id);
  if (!prompt) {
    notFound();
  }
  return <PromptDetailClient prompt={prompt} />;
}
