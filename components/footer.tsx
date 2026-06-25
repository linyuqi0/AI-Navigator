import Link from "next/link";
import { Sparkles, Github, Twitter, Rss } from "lucide-react";
import { withBasePath } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link href={withBasePath("/")} className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-morandi">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg">AI Navigator Pro</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mb-4">
              精选全球最优质的AI工具、Agent、MCP和工作流，助你在AI时代事半功倍。
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <Link
                href={withBasePath("/rss.xml")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Rss className="h-5 w-5" />
                <span className="sr-only">RSS</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">发现</h3>
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
            <h3 className="font-semibold mb-3">榜单</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href={withBasePath("/rankings")} className="hover:text-foreground transition-colors">
                  最佳AI聊天
                </Link>
              </li>
              <li>
                <Link href={withBasePath("/rankings")} className="hover:text-foreground transition-colors">
                  最佳AI编程
                </Link>
              </li>
              <li>
                <Link href={withBasePath("/rankings")} className="hover:text-foreground transition-colors">
                  最佳AI图像
                </Link>
              </li>
              <li>
                <Link href={withBasePath("/rankings")} className="hover:text-foreground transition-colors">
                  最佳AI视频
                </Link>
              </li>
              <li>
                <Link href={withBasePath("/rankings")} className="hover:text-foreground transition-colors">
                  年度榜单
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">关于</h3>
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
                <Link href={withBasePath("/sitemap.xml")} className="hover:text-foreground transition-colors">
                  网站地图
                </Link>
              </li>
              <li>
                <Link href={withBasePath("/privacy")} className="hover:text-foreground transition-colors">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link href={withBasePath("/terms")} className="hover:text-foreground transition-colors">
                  使用条款
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI Navigator Pro. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for the AI community
          </p>
        </div>
      </div>
    </footer>
  );
}
