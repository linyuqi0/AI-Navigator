"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Target, Heart, Github, Twitter, Rss, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { withBasePath } from "@/lib/utils";

export default function AboutPage() {
  return (
    <div className="container py-8 md:py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-12">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-morandi-sand/30 to-morandi-rose/30 mb-4">
            <Sparkles className="h-8 w-8 text-morandi-terracotta" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">关于 AI Navigator Pro</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            精选全球最优质的 AI 工具，助你在 AI 时代事半功倍
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-morandi-sand/20 mb-3">
                <Target className="h-6 w-6 text-morandi-terracotta" />
              </div>
              <h3 className="font-semibold mb-2">我们的使命</h3>
              <p className="text-sm text-muted-foreground">
                打造最专业、最全面的 AI 工具导航平台
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-morandi-rose/20 mb-3">
                <Heart className="h-6 w-6 text-morandi-rose" />
              </div>
              <h3 className="font-semibold mb-2">用心推荐</h3>
              <p className="text-sm text-muted-foreground">
                每一款工具都经过精心筛选和实际评测
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-morandi-sage/20 mb-3">
                <Sparkles className="h-6 w-6 text-morandi-sage" />
              </div>
              <h3 className="font-semibold mb-2">持续更新</h3>
              <p className="text-sm text-muted-foreground">
                紧跟 AI 行业最新动态，第一时间收录
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6 md:p-8 prose prose-sm max-w-none">
            <h2 className="text-xl font-bold mb-4">项目介绍</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              AI Navigator Pro 是一个面向全球用户的 AI 工具导航平台，致力于帮助用户在纷繁复杂的 AI 工具中找到最适合自己的一款。
              我们覆盖了 12+ 个 AI 领域，包括 AI 聊天、AI 图像、AI 视频、AI 编程、AI 写作、AI 设计等，
              共收录了 500+ 经过精心筛选的优质 AI 工具。
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              除了工具导航，我们还提供：
            </p>
            <ul className="text-muted-foreground space-y-2 mb-4">
              <li>• <strong>AI Agent 库</strong>：收录最前沿的自主 AI Agent 工具</li>
              <li>• <strong>MCP 服务器</strong>：Model Context Protocol 生态服务</li>
              <li>• <strong>Prompt 库</strong>：精选高质量提示词模板</li>
              <li>• <strong>工作流</strong>：完整的 AI 应用工作流方案</li>
              <li>• <strong>榜单</strong>：权威的 AI 工具评测榜单</li>
              <li>• <strong>资讯</strong>：AI 行业最新动态</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4">联系我们</h2>
            <p className="text-muted-foreground mb-6">
              如果你有任何建议、反馈或合作意向，欢迎通过以下方式联系我们：
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <a
                href="https://github.com/linyuqi0/AI-Navigator"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-muted/30 transition-all"
              >
                <Github className="h-6 w-6" />
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-muted/30 transition-all"
              >
                <Twitter className="h-6 w-6" />
                <span className="text-sm">Twitter</span>
              </a>
              <a
                href={withBasePath("/rss.xml")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-muted/30 transition-all"
              >
                <Rss className="h-6 w-6" />
                <span className="text-sm">RSS</span>
              </a>
              <a
                href="mailto:contact@ainavigator.pro"
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-muted/30 transition-all"
              >
                <Mail className="h-6 w-6" />
                <span className="text-sm">Email</span>
              </a>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button asChild>
            <Link href={withBasePath("/tools")}>开始探索 AI 工具</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
