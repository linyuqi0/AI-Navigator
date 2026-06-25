"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Wrench, Bot, Puzzle, MessageSquareText, Workflow, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ToolCard } from "@/components/cards/tool-card";
import { AgentCard } from "@/components/cards/agent-card";
import { MCPCard } from "@/components/cards/mcp-card";
import { PromptCard } from "@/components/cards/prompt-card";
import { WorkflowCard } from "@/components/cards/workflow-card";
import { searchAll, searchTools, searchAgents, searchMCPs, searchPrompts, searchWorkflows, type SearchResult } from "@/lib/search";

function SearchContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [tools, setTools] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [mcps, setMcps] = useState<any[]>([]);
  const [prompts, setPrompts] = useState<any[]>([]);
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [allResults, setAllResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query) {
      setTools(searchTools(query));
      setAgents(searchAgents(query));
      setMcps(searchMCPs(query));
      setPrompts(searchPrompts(query));
      setWorkflows(searchWorkflows(query));
      setAllResults(searchAll(query, 10));
    } else {
      setTools([]);
      setAgents([]);
      setMcps([]);
      setPrompts([]);
      setWorkflows([]);
      setAllResults([]);
    }
  }, [query]);

  const totalCount = tools.length + agents.length + mcps.length + prompts.length + workflows.length;

  return (
    <div className="container py-8 md:py-12">
      <motion.div
        className="mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Search className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">搜索</h1>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="搜索 AI 工具、Agent、MCP、Prompt、工作流..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 h-12 text-base rounded-full"
          />
        </div>
        {query && (
          <p className="text-sm text-muted-foreground mt-3 text-center">
            找到 {totalCount} 个相关结果
          </p>
        )}
      </motion.div>

      {!query && (
        <div className="text-center py-16">
          <Sparkles className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">输入关键词开始搜索</p>
        </div>
      )}

      {query && (
        <Tabs defaultValue="all">
          <TabsList className="mb-6 flex flex-wrap h-auto">
            <TabsTrigger value="all" className="flex items-center gap-1.5">
              <Search className="h-4 w-4" />
              全部
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center gap-1.5">
              <Wrench className="h-4 w-4" />
              工具 ({tools.length})
            </TabsTrigger>
            <TabsTrigger value="agents" className="flex items-center gap-1.5">
              <Bot className="h-4 w-4" />
              Agent ({agents.length})
            </TabsTrigger>
            <TabsTrigger value="mcps" className="flex items-center gap-1.5">
              <Puzzle className="h-4 w-4" />
              MCP ({mcps.length})
            </TabsTrigger>
            <TabsTrigger value="prompts" className="flex items-center gap-1.5">
              <MessageSquareText className="h-4 w-4" />
              Prompt ({prompts.length})
            </TabsTrigger>
            <TabsTrigger value="workflows" className="flex items-center gap-1.5">
              <Workflow className="h-4 w-4" />
              工作流 ({workflows.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allResults.slice(0, 9).map((result, idx) => {
                if (result.type === "tool") {
                  return <ToolCard key={`${result.type}-${idx}`} tool={result.item as any} />;
                }
                if (result.type === "agent") {
                  return <AgentCard key={`${result.type}-${idx}`} agent={result.item as any} />;
                }
                if (result.type === "mcp") {
                  return <MCPCard key={`${result.type}-${idx}`} mcp={result.item as any} />;
                }
                if (result.type === "prompt") {
                  return <PromptCard key={`${result.type}-${idx}`} prompt={result.item as any} />;
                }
                if (result.type === "workflow") {
                  return <WorkflowCard key={`${result.type}-${idx}`} workflow={result.item as any} />;
                }
                return null;
              })}
            </div>
          </TabsContent>

          <TabsContent value="tools">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="agents">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mcps">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {mcps.map((mcp) => (
                <MCPCard key={mcp.id} mcp={mcp} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prompts">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {prompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="workflows">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {workflows.map((workflow) => (
                <WorkflowCard key={workflow.id} workflow={workflow} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container py-8 md:py-12">
        <div className="text-center py-16">
          <Sparkles className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">加载中...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
