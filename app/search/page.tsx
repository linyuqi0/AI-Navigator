"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search as SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ToolCard } from "@/components/cards/tool-card";
import { AgentCard } from "@/components/cards/agent-card";
import { MCPCard } from "@/components/cards/mcp-card";
import { withBasePath } from "@/lib/utils";
import { searchAll } from "@/lib/search";
import { tools, agents, mcps, prompts, workflows } from "@/lib/data";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) {
      return {
        tools: tools.slice(0, 12),
        agents: agents.slice(0, 12),
        mcps: mcps.slice(0, 12),
        prompts: prompts.slice(0, 12),
        workflows: workflows.slice(0, 12),
      };
    }
    const r = searchAll(query);
    return {
      tools: r.filter((x) => x.type === "tool").map((x) => x.item) as unknown as typeof tools,
      agents: r.filter((x) => x.type === "agent").map((x) => x.item) as unknown as typeof agents,
      mcps: r.filter((x) => x.type === "mcp").map((x) => x.item) as unknown as typeof mcps,
      prompts: prompts.filter((p) =>
        [p.title, p.content, p.category, ...p.tags]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
      workflows: workflows.filter((w) =>
        [w.name, w.description, w.category, ...w.tags, ...w.tools]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    };
  }, [query]);

  const totalCount =
    results.tools.length +
    results.agents.length +
    results.mcps.length +
    results.prompts.length +
    results.workflows.length;

  return (
    <div className="container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">
          全站搜索
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          搜索 AI 工具、Agent、MCP、Prompt 和工作流
        </p>

        <div className="relative mb-8">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="输入关键词搜索..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-12 h-14 text-lg"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {query && (
          <p className="text-sm text-muted-foreground text-center mb-6">
            共找到 <span className="font-semibold text-foreground">{totalCount}</span> 条结果
          </p>
        )}

        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="tools">工具 ({results.tools.length})</TabsTrigger>
            <TabsTrigger value="agents">Agent ({results.agents.length})</TabsTrigger>
            <TabsTrigger value="mcps">MCP ({results.mcps.length})</TabsTrigger>
            <TabsTrigger value="prompts">Prompt ({results.prompts.length})</TabsTrigger>
            <TabsTrigger value="workflows">工作流 ({results.workflows.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="tools" className="mt-6">
            {results.tools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.tools.map((tool, i) => (
                  <ToolCard key={tool.id} tool={tool} rank={i + 1} />
                ))}
              </div>
            ) : (
              <EmptyState query={query} />
            )}
          </TabsContent>

          <TabsContent value="agents" className="mt-6">
            {results.agents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.agents.map((agent, i) => (
                  <AgentCard key={agent.id} agent={agent} rank={i + 1} />
                ))}
              </div>
            ) : (
              <EmptyState query={query} />
            )}
          </TabsContent>

          <TabsContent value="mcps" className="mt-6">
            {results.mcps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.mcps.map((mcp) => (
                  <MCPCard key={mcp.id} mcp={mcp} />
                ))}
              </div>
            ) : (
              <EmptyState query={query} />
            )}
          </TabsContent>

          <TabsContent value="prompts" className="mt-6">
            {results.prompts.length > 0 ? (
              <div className="space-y-3">
                {results.prompts.map((p) => (
                  <Link
                    key={p.id}
                    href={withBasePath(`/prompts/${p.id}`)}
                    className="block p-4 rounded-xl border border-border/50 bg-card hover:border-primary/50 transition-colors"
                  >
                    <h3 className="font-semibold mb-1">{p.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {p.content}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {p.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState query={query} />
            )}
          </TabsContent>

          <TabsContent value="workflows" className="mt-6">
            {results.workflows.length > 0 ? (
              <div className="space-y-3">
                {results.workflows.map((w) => (
                  <Link
                    key={w.id}
                    href={withBasePath(`/workflows/${w.id}`)}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card hover:border-primary/50 transition-colors"
                  >
                    <img
                      src={w.cover}
                      alt={w.name}
                      className="h-14 w-14 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{w.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {w.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState query={query} />
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="text-center py-16 text-muted-foreground">
      <SearchIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
      <p>未找到与 &quot;{query}&quot; 相关的结果</p>
    </div>
  );
}
