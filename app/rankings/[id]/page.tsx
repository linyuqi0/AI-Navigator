import { notFound } from "next/navigation";
import { Metadata } from "next";
import { rankings } from "@/lib/data";
import { RankingDetailClient } from "./client";

interface PageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return rankings.map((r) => ({ id: r.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const ranking = rankings.find((r) => r.id === params.id);
  if (!ranking) return { title: "榜单未找到" };
  return {
    title: ranking.seoTitle,
    description: ranking.seoDescription,
  };
}

export default function RankingDetailPage({ params }: PageProps) {
  const ranking = rankings.find((r) => r.id === params.id);
  if (!ranking) {
    notFound();
  }
  return <RankingDetailClient ranking={ranking} />;
}
