"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Wrench,
  Bot,
  Puzzle,
  MessageSquareText,
  Workflow as WorkflowIcon,
  Search as SearchIcon,
  Heart,
  Sun,
  Moon,
  Monitor,
  Menu,
  X,
  Trophy,
  Newspaper,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { withBasePath } from "@/lib/utils";

const navItems = [
  { href: "/tools", label: "工具库", icon: Wrench },
  { href: "/agents", label: "Agent库", icon: Bot },
  { href: "/mcps", label: "MCP库", icon: Puzzle },
  { href: "/prompts", label: "Prompt库", icon: MessageSquareText },
  { href: "/workflows", label: "工作流", icon: WorkflowIcon },
];

const moreItems = [
  { href: "/rankings", label: "AI 榜单", icon: Trophy },
  { href: "/news", label: "AI 资讯", icon: Newspaper },
  { href: "/favorites", label: "我的收藏", icon: Heart },
  { href: "/search", label: "全站搜索", icon: SearchIcon },
  { href: "/about", label: "关于我们", icon: Sparkles },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const ThemeIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href={withBasePath("/")}
          className="flex items-center gap-2 font-bold text-lg"
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-morandi-sand/40 via-morandi-rose/30 to-morandi-teal/30 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-morandi-terracotta" />
          </div>
          <span className="hidden sm:inline">AI Navigator Pro</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={withBasePath(item.href)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <div
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors">
              更多
              <ChevronDown className="h-3 w-3" />
            </button>
            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full w-48 rounded-lg border border-border/50 bg-card shadow-lg p-1 z-50"
                >
                  {moreItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={withBasePath(item.href)}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href={withBasePath("/search")}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-muted/50 hover:bg-muted rounded-md transition-colors min-w-[180px]"
          >
            <SearchIcon className="h-4 w-4" />
            <span>搜索 AI 工具...</span>
            <kbd className="ml-auto text-xs bg-background/60 px-1.5 py-0.5 rounded">
              K
            </kbd>
          </Link>
          <Link
            href={withBasePath("/favorites")}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            aria-label="我的收藏"
          >
            <Heart className="h-5 w-5" />
          </Link>
          <button
            onClick={cycleTheme}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            aria-label="切换主题"
          >
            <ThemeIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            aria-label="菜单"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border/50 overflow-hidden"
          >
            <div className="container py-4 space-y-1">
              {[...navItems, ...moreItems].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={withBasePath(item.href)}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
