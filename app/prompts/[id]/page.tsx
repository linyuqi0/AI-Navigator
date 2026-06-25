import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPromptById, prompts } from "@/lib/data";
import { PromptDetailClient } from "@/components/prompt-detail-client";

interface PromptPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return prompts.map((prompt) => ({ id: prompt.id }));
}

export function generateMetadata({ params }: PromptPageProps): Metadata {
  const prompt = getPromptById(params.id);
  if (!prompt) return { title: "Prompt未找到" };
  return {
    title: prompt.seoTitle,
    description: prompt.seoDescription,
    keywords: prompt.tags,
  };
}

export default function PromptDetailPage({ params }: PromptPageProps) {
  const prompt = getPromptById(params.id);

  if (!prompt) notFound();

  return <PromptDetailClient prompt={prompt} />;
}
