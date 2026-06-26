"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  Sparkles,
  Wrench,
  Bot,
  Puzzle,
  MessageSquareText,
  Workflow,
  Trophy,
  Newspaper,
  Heart,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchDialog } from "@/components/search-dialog";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/tools", label: "工具库", icon: Wrench },
  { href: "/agents", label: "Agent库", icon: Bot },
  { href: "/mcps", label: "MCP库", icon: Puzzle },
  { href: "/prompts", label: "Prompt库", icon: MessageSquareText },
  { href: "/workflows", label: "工作流", icon: Workflow },
  { href: "/rankings", label: "榜单", icon: Trophy },
  { href: "/news", label: "资讯", icon: Newspaper },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname?.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 backdrop-blur-md bg-background/80 supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-morandi">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              AI Navigator Pro
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-foreground",
                  isActive(item.href)
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:bg-accent/50"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <SearchDialog />
          </div>

          <Link
            href="/favorites"
            className="hidden md:inline-flex items-center justify-center h-9 w-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <Heart className="h-5 w-5" />
            <span className="sr-only">收藏</span>
          </Link>

          <ThemeToggle />

          <button
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">菜单</span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background">
          <div className="container py-3 space-y-1">
            <div className="sm:hidden mb-3">
              <SearchDialog />
            </div>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            <Link
              href="/favorites"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive("/favorites")
                  ? "text-foreground bg-accent"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              <Heart className="h-4 w-4" />
              我的收藏
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
