"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Search,
  Bot,
  Wrench,
  Puzzle,
  MessageSquareText,
  Workflow,
  Sparkles,
} from "lucide-react";
import { searchAll, type SearchResult } from "@/lib/search";
import { useRouter } from "next/navigation";


export function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    if (query.trim()) {
      setResults(searchAll(query, 20));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    const paths: Record<string, string> = {
      tool: `/tools/${result.item.id}`,
      agent: `/agents/${result.item.id}`,
      mcp: `/mcps/${result.item.id}`,
      prompt: `/prompts/${result.item.id}`,
      workflow: `/workflows/${result.item.id}`,
    };
    router.push(paths[result.type]);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "tool":
        return <Wrench className="mr-2 h-4 w-4 text-morandi-sage" />;
      case "agent":
        return <Bot className="mr-2 h-4 w-4 text-morandi-rose" />;
      case "mcp":
        return <Puzzle className="mr-2 h-4 w-4 text-morandi-sand" />;
      case "prompt":
        return <MessageSquareText className="mr-2 h-4 w-4 text-morandi-teal" />;
      case "workflow":
        return <Workflow className="mr-2 h-4 w-4 text-morandi-terracotta" />;
      default:
        return <Sparkles className="mr-2 h-4 w-4" />;
    }
  };

  const getDescription = (item: any) => {
    if ("description" in item) return item.description;
    if ("seoDescription" in item) return item.seoDescription;
    if ("content" in item) return item.content.slice(0, 100);
    return "";
  };

  const groupedResults = React.useMemo(() => {
    const groups: Record<string, SearchResult[]> = {
      tool: [],
      agent: [],
      mcp: [],
      prompt: [],
      workflow: [],
    };
    results.forEach((r) => {
      groups[r.type].push(r);
    });
    return groups;
  }, [results]);

  const typeLabels: Record<string, string> = {
    tool: "AI工具",
    agent: "AI Agent",
    mcp: "MCP服务器",
    prompt: "Prompt",
    workflow: "工作流",
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-input bg-background/80 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <Search className="h-4 w-4" />
        <span>搜索 AI 工具、Agent、MCP...</span>
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="搜索 AI 工具、Agent、MCP、Prompt、工作流..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>没有找到相关结果</CommandEmpty>
          {Object.entries(groupedResults).map(([type, items]) =>
            items.length > 0 ? (
              <React.Fragment key={type}>
                <CommandGroup heading={typeLabels[type]}>
                  {items.map((result, idx) => (
                    <CommandItem
                      key={`${result.type}-${result.item.id}-${idx}`}
                      onSelect={() => handleSelect(result)}
                      className="cursor-pointer"
                    >
                      {getIcon(result.type)}
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {"name" in result.item
                            ? result.item.name
                            : result.item.title}
                        </span>
                        <span className="text-xs text-muted-foreground truncate max-w-md">
                          {getDescription(result.item)}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </React.Fragment>
            ) : null
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
