import Fuse from "fuse.js";
import { tools, agents, mcps, prompts, workflows } from "@/lib/data";
import type { Tool, Agent, MCP, Prompt, Workflow } from "@/lib/types";

export type SearchResult = {
  item: Tool | Agent | MCP | Prompt | Workflow;
  type: "tool" | "agent" | "mcp" | "prompt" | "workflow";
  score?: number;
};

const allItems = [
  ...tools.map((item) => ({ item, type: "tool" as const })),
  ...agents.map((item) => ({ item, type: "agent" as const })),
  ...mcps.map((item) => ({ item, type: "mcp" as const })),
  ...prompts.map((item) => ({ item, type: "prompt" as const })),
  ...workflows.map((item) => ({ item, type: "workflow" as const })),
];

const fuseOptions = {
  keys: [
    { name: "item.name", weight: 0.4 },
    { name: "item.title", weight: 0.4 },
    { name: "item.description", weight: 0.3 },
    { name: "item.tags", weight: 0.2 },
    { name: "item.category", weight: 0.1 },
    { name: "item.features", weight: 0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
  ignoreLocation: true,
  minMatchCharLength: 1,
};

const fuse = new Fuse(allItems, fuseOptions);

export function searchAll(query: string, limit = 50): SearchResult[] {
  if (!query.trim()) return [];
  const results = fuse.search(query).slice(0, limit);
  return results.map((r) => ({
    item: r.item.item,
    type: r.item.type,
    score: r.score,
  }));
}

export function searchTools(query: string, limit = 20): Tool[] {
  if (!query.trim()) return [];
  const toolFuse = new Fuse(tools, {
    keys: ["name", "description", "tags", "category", "features"],
    threshold: 0.4,
  });
  return toolFuse.search(query).slice(0, limit).map((r) => r.item);
}

export function searchAgents(query: string, limit = 20): Agent[] {
  if (!query.trim()) return [];
  const agentFuse = new Fuse(agents, {
    keys: ["name", "description", "tags", "category", "features"],
    threshold: 0.4,
  });
  return agentFuse.search(query).slice(0, limit).map((r) => r.item);
}

export function searchMCPs(query: string, limit = 20): MCP[] {
  if (!query.trim()) return [];
  const mcpFuse = new Fuse(mcps, {
    keys: ["name", "description", "tags", "category", "features"],
    threshold: 0.4,
  });
  return mcpFuse.search(query).slice(0, limit).map((r) => r.item);
}

export function searchPrompts(query: string, limit = 20): Prompt[] {
  if (!query.trim()) return [];
  const promptFuse = new Fuse(prompts, {
    keys: ["title", "content", "tags", "category"],
    threshold: 0.4,
  });
  return promptFuse.search(query).slice(0, limit).map((r) => r.item);
}

export function searchWorkflows(query: string, limit = 20): Workflow[] {
  if (!query.trim()) return [];
  const workflowFuse = new Fuse(workflows, {
    keys: ["name", "description", "tags", "category", "steps"],
    threshold: 0.4,
  });
  return workflowFuse.search(query).slice(0, limit).map((r) => r.item);
}
