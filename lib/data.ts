import toolsData from "@/data/tools.json";
import agentsData from "@/data/agents.json";
import mcpData from "@/data/mcp.json";
import promptsData from "@/data/prompts.json";
import workflowsData from "@/data/workflows.json";
import newsData from "@/data/news.json";
import rankingsData from "@/data/rankings.json";
import categoriesData from "@/data/categories.json";
import tagsData from "@/data/tags.json";
import type {
  Tool,
  Agent,
  MCP,
  Prompt,
  Workflow,
  NewsItem,
  RankingItem,
  Category,
  Tag,
} from "@/lib/types";

export const tools: Tool[] = toolsData as Tool[];
export const agents: Agent[] = agentsData as Agent[];
export const mcps: MCP[] = mcpData as MCP[];
export const prompts: Prompt[] = promptsData as Prompt[];
export const workflows: Workflow[] = workflowsData as Workflow[];
export const news: NewsItem[] = newsData as NewsItem[];
export const rankings: RankingItem[] = rankingsData as RankingItem[];
export const categories: Category[] = categoriesData as Category[];
export const tags: Tag[] = tagsData as Tag[];

export function getToolById(id: string): Tool | undefined {
  return tools.find((t) => t.id === id);
}

export function getAgentById(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}

export function getMCPById(id: string): MCP | undefined {
  return mcps.find((m) => m.id === id);
}

export function getPromptById(id: string): Prompt | undefined {
  return prompts.find((p) => p.id === id);
}

export function getWorkflowById(id: string): Workflow | undefined {
  return workflows.find((w) => w.id === id);
}

export function getRankingById(id: string): RankingItem | undefined {
  return rankings.find((r) => r.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getTagBySlug(slug: string): Tag | undefined {
  return tags.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((t) => t.featured);
}

export function getTrendingTools(): Tool[] {
  return tools.filter((t) => t.trending);
}

export function getLatestNews(limit = 6): NewsItem[] {
  return [...news]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}
