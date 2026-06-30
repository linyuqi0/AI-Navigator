"use client";

import Link from "next/link";
import { Sparkles, Github, Twitter, Rss } from "lucide-react";
import { withBasePath } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link
              href={withBasePath("/")}
              className="flex items-center gap-2 font-bold text-lg mb-3"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-morandi-sand/40 via-morandi-rose/30 to-morandi-teal/30 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-morandi-terracotta" />
              </div>
              <span>AI Navigator Pro</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              精选全球最优质的AI工具、Agent、MCP和工作流，助你在AI时代事半功倍。
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/linyuqi0/AI-Navigator"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="/rss.xml"
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                aria-label="RSS"
              >
                <Rss className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">发现</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href={withBasePath("/tools")} className="hover:text-foreground transition-colors">
                  AI工具
                </Link>
              </li>
              <li>
                <Link href={withBasePath("/agents")} className="hover:text-foreground transition-colors">
                  AI Agent
                </Link>
              </li>
              <li>
                <Link href={withBasePath("/mcps")} className="hover:text-foreground transition-colors">
                  MCP服务器
                </Link>
              </li>
              <li>
                <Link href={withBasePath("/prompts")} className="hover:text-foreground transition-colors">
                  Prompt库
                </Link>
              </li>
              <li>
                <Link href={withBasePath("/workflows")} className="hover:text-foreground transition-colors">
                  工作流
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">榜单</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href={withBasePath("/rankings/best-ai-chat-2026-mid")} className="hover:text-foreground transition-colors">
                  最佳AI聊天
                </Link>
              </li>
              <li>
                <Link href={withBasePath("/rankings/best-ai-coding-2026-mid")} className="hover:text-foreground transition-colors">
                  最佳AI编程
                </Link>
              </li>
              <li>
                <Link href={withBasePath("/rankings/best-ai-image-2026-mid")} className="hover:text-foreground transition-colors">
                  最佳AI图像
                </Link>
              </li>
              <li>
                <Link href={withBasePath("/rankings/best-ai-video-2026-mid")} className="hover:text-foreground transition-colors">
                  最佳AI视频
                </Link>
              </li>
              <li>
                <Link href={withBasePath("/rankings")} className="hover:text-foreground transition-colors">
                  全部榜单
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">关于</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href={withBasePath("/about")} className="hover:text-foreground transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href={withBasePath("/news")} className="hover:text-foreground transition-colors">
                  AI资讯
                </Link>
              </li>
              <li>
                <Link href={withBasePath("/search")} className="hover:text-foreground transition-colors">
                  全站搜索
                </Link>
              </li>
              <li>
                <Link href={withBasePath("/favorites")} className="hover:text-foreground transition-colors">
                  我的收藏
                </Link>
              </li>
              <li>
                <a href="/rss.xml" className="hover:text-foreground transition-colors">
                  RSS 订阅
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>
            © 2026 AI Navigator Pro. All rights reserved.
          </p>
          <p>
            Made with <span className="text-morandi-rose">❤</span> for the AI community
          </p>
        </div>
      </div>
    </footer>
  );
}
