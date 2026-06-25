"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Wrench,
  Bot,
  Puzzle,
  MessageSquareText,
  Workflow,
  Trophy,
  ArrowRight,
  TrendingUp,
  Newspaper,
  Grid3X3,
  Star,
  Zap,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolCard } from "@/components/cards/tool-card";
import { AgentCard } from "@/components/cards/agent-card";
import { MCPCard } from "@/components/cards/mcp-card";
import { PromptCard } from "@/components/cards/prompt-card";
import { WorkflowCard } from "@/components/cards/workflow-card";
import { NewsCard } from "@/components/cards/news-card";
import { SearchDialog } from "@/components/search-dialog";
import {
  tools,
  agents,
  mcps,
  prompts,
  workflows,
  news,
  rankings,
  categories,
  getFeaturedTools,
  getTrendingTools,
  getLatestNews,
} from "@/lib/data";
import { cn, withBasePath } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  const featuredTools = getFeaturedTools().slice(0, 6);
  const trendingTools = getTrendingTools().slice(0, 4);
  const featuredAgents = agents.filter((a) => a.featured).slice(0, 4);
  const featuredMCPs = mcps.filter((m) => m.featured).slice(0, 4);
  const featuredPrompts = prompts.filter((p) => p.featured).slice(0, 4);
  const featuredWorkflows = workflows.filter((w) => w.featured).slice(0, 4);
  const latestNews = getLatestNews(5);
  const topRanking = rankings[0];

  const categoryIcons: Record<string, any> = {
    MessageSquare: MessageSquareText,
    Image: Sparkles,
    Video: Zap,
    Code: Wrench,
    Music: Sparkles,
    PenTool: MessageSquareText,
    Palette: Sparkles,
    Zap: Zap,
    TrendingUp: TrendingUp,
    GraduationCap: Sparkles,
    Bot: Bot,
    Puzzle: Puzzle,
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-morandi-rose/20 rounded-full blur-3xl opacity-40" />
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-morandi-sage/20 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-morandi-sand/20 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Badge
              variant="outline"
              className="mb-6 px-4 py-1.5 text-sm border-morandi-sage/30 bg-morandi-sage/10 text-morandi-green"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              精选 500+ AI 工具与资源
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              发现全球最佳
              <span className="bg-gradient-to-r from-morandi-rose via-morandi-sand to-morandi-sage bg-clip-text text-transparent">
                {" "}
                AI 工具
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              一站式AI导航平台，精心筛选全球最优质的AI工具、Agent、MCP、Prompt和工作流，
              助你在AI时代事半功倍。
            </p>

            <div className="max-w-xl mx-auto mb-8">
              <div className="hidden sm:block">
                <SearchDialog />
              </div>
              <div className="sm:hidden">
                <Link href={withBasePath("/search")}>
                  <Button variant="outline" className="w-full h-12 rounded-full">
                    <Sparkles className="mr-2 h-4 w-4" />
                    搜索 AI 工具...
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {["ChatGPT", "Midjourney", "Claude", "Runway", "Cursor", "Devin"].map(
                (tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-sm px-3 py-1 cursor-pointer hover:bg-accent transition-colors"
                  >
                    {tag}
                  </Badge>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <motion.div
            className="flex items-center justify-between mb-8"
            {...fadeInUp}
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">分类导航</h2>
              <p className="text-muted-foreground mt-2">
                按类别快速找到你需要的AI工具
              </p>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {categories.slice(0, 12).map((category, index) => {
              const IconComponent =
                categoryIcons[category.icon] || Grid3X3;
              return (
                <motion.div key={category.id} variants={fadeInUp}>
                  <Link
                    href={withBasePath(`/tools?category=${category.slug}`)}
                    className="flex flex-col items-center justify-center p-5 rounded-xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-md transition-all duration-300 group h-full"
                  >
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-morandi-rose/20 to-morandi-sage/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <IconComponent className="h-6 w-6 text-morandi-green" />
                    </div>
                    <span className="font-medium text-sm text-center">
                      {category.name}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      {category.count} 个工具
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-12 md:py-16">
        <div className="container">
          <motion.div
            className="flex items-center justify-between mb-8"
            {...fadeInUp}
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <Star className="h-6 w-6 text-morandi-sand fill-morandi-sand" />
                热门工具
              </h2>
              <p className="text-muted-foreground mt-2">
                最受欢迎的AI工具精选
              </p>
            </div>
            <Link
              href={withBasePath("/tools")}
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              查看全部
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {featuredTools.map((tool, index) => (
              <motion.div key={tool.id} variants={fadeInUp}>
                <ToolCard tool={tool} rank={index + 1} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trending + Agents */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Trending Tools */}
            <div>
              <motion.div
                className="flex items-center justify-between mb-6"
                {...fadeInUp}
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-morandi-rose" />
                    今日热门
                  </h2>
                </div>
                <Link
                  href={withBasePath("/tools")}
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  更多
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <div className="space-y-3">
                {trendingTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-sm transition-all group"
                    >
                      <span className="text-xl font-bold text-muted-foreground/30 w-6">
                        #{index + 1}
                      </span>
                      <img
                        src={tool.logo}
                        alt={tool.name}
                        className="h-10 w-10 rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium group-hover:text-primary transition-colors truncate">
                          {tool.name}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {tool.description}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs shrink-0"
                      >
                        {tool.rating}
                      </Badge>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Featured Agents */}
            <div>
              <motion.div
                className="flex items-center justify-between mb-6"
                {...fadeInUp}
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                    <Bot className="h-5 w-5 text-morandi-sage" />
                    热门 Agent
                  </h2>
                </div>
                <Link
                  href={withBasePath("/agents")}
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  更多
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <div className="grid grid-cols-2 gap-3">
                {featuredAgents.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AgentCard agent={agent} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MCP Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <motion.div
            className="flex items-center justify-between mb-8"
            {...fadeInUp}
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <Puzzle className="h-7 w-7 text-morandi-terracotta" />
                热门 MCP 服务器
              </h2>
              <p className="text-muted-foreground mt-2">
                Model Context Protocol - 扩展AI模型的能力边界
              </p>
            </div>
            <Link
              href={withBasePath("/mcps")}
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              查看全部
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {featuredMCPs.map((mcp) => (
              <motion.div key={mcp.id} variants={fadeInUp}>
                <MCPCard mcp={mcp} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Prompts + Workflows */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Prompts */}
            <div>
              <motion.div
                className="flex items-center justify-between mb-6"
                {...fadeInUp}
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                    <MessageSquareText className="h-5 w-5 text-morandi-teal" />
                    精选 Prompt
                  </h2>
                </div>
                <Link
                  href={withBasePath("/prompts")}
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  更多
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featuredPrompts.slice(0, 4).map((prompt, index) => (
                  <motion.div
                    key={prompt.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PromptCard prompt={prompt} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Workflows */}
            <div>
              <motion.div
                className="flex items-center justify-between mb-6"
                {...fadeInUp}
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                    <Workflow className="h-5 w-5 text-morandi-sand" />
                    热门工作流
                  </h2>
                </div>
                <Link
                  href={withBasePath("/workflows")}
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  更多
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featuredWorkflows.slice(0, 4).map((workflow, index) => (
                  <motion.div
                    key={workflow.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <WorkflowCard workflow={workflow} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rankings */}
      <section className="py-12 md:py-16">
        <div className="container">
          <motion.div
            className="flex items-center justify-between mb-8"
            {...fadeInUp}
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <Trophy className="h-7 w-7 text-morandi-sand" />
                热门榜单
              </h2>
              <p className="text-muted-foreground mt-2">
                经过深度评测的权威AI工具排行榜
              </p>
            </div>
            <Link
              href={withBasePath("/rankings")}
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              全部榜单
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {rankings.slice(0, 6).map((ranking) => (
              <motion.div key={ranking.id} variants={fadeInUp}>
                <Link
                  href={withBasePath(`/rankings/${ranking.id}`)}
                  className="block p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-morandi-sand/30 to-morandi-rose/30 flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-morandi-terracotta" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {ranking.period}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors mb-2">
                    {ranking.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {ranking.description}
                  </p>
                  <div className="text-sm text-primary font-medium flex items-center gap-1">
                    查看完整榜单
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <motion.div
            className="flex items-center justify-between mb-8"
            {...fadeInUp}
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <Newspaper className="h-7 w-7 text-morandi-slate" />
                最新资讯
              </h2>
              <p className="text-muted-foreground mt-2">
                AI行业最新动态与趋势
              </p>
            </div>
            <Link
              href={withBasePath("/news")}
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              更多资讯
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {latestNews.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <NewsCard news={item} featured={index === 0} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            className="max-w-4xl mx-auto text-center p-10 md:p-14 rounded-3xl bg-gradient-to-br from-morandi-rose/10 via-morandi-sand/10 to-morandi-sage/10 border border-border/50"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              开启你的AI高效之旅
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              收藏 AI Navigator Pro，随时掌握最新AI工具和行业动态，让AI成为你的最强助手。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full px-8" asChild>
                <Link href={withBasePath("/tools")}>
                  开始探索
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                <Link href={withBasePath("/favorites")}>
                  <Heart className="mr-2 h-4 w-4" />
                  我的收藏
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
