"use client";

import { motion } from "framer-motion";
import { Sparkles, Target, Heart, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-14 w-14 rounded-2xl gradient-morandi flex items-center justify-center">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">AI Navigator Pro</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            精选全球最优质的AI工具，助你在AI时代事半功倍
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 mx-auto rounded-xl bg-morandi-sage/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-morandi-sage" />
                </div>
                <h3 className="font-semibold text-lg mb-2">我们的使命</h3>
                <p className="text-sm text-muted-foreground">
                  帮助每个人发现和使用最适合自己的AI工具，让AI技术真正赋能工作和生活。
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 mx-auto rounded-xl bg-morandi-rose/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-morandi-rose" />
                </div>
                <h3 className="font-semibold text-lg mb-2">我们的价值</h3>
                <p className="text-sm text-muted-foreground">
                  精心筛选和深度评测每一款AI工具，为用户提供真实、有价值的参考信息。
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 mx-auto rounded-xl bg-morandi-sand/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-morandi-sand" />
                </div>
                <h3 className="font-semibold text-lg mb-2">我们的承诺</h3>
                <p className="text-sm text-muted-foreground">
                  持续更新和优化内容，保持对AI行业前沿动态的敏锐洞察和快速响应。
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="prose prose-lg max-w-none dark:prose-invert"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-4">关于平台</h2>
          <p className="text-muted-foreground mb-4">
            AI Navigator Pro 是一个专注于AI工具发现和评测的导航平台。我们致力于为用户提供最全面、最优质的AI工具资源，
            涵盖AI聊天、图像生成、视频制作、编程助手、Agent、MCP、Prompt、工作流等各个领域。
          </p>
          <p className="text-muted-foreground mb-4">
            我们的团队由AI爱好者和专业人士组成，每天关注全球AI行业最新动态，
            精心筛选和评测每一款收录的工具，确保用户能够快速找到最适合自己需求的AI解决方案。
          </p>
          <h2 className="text-2xl font-bold mb-4 mt-8">联系我们</h2>
          <p className="text-muted-foreground">
            如有任何问题或建议，欢迎通过以下方式联系我们：
          </p>
          <ul className="text-muted-foreground list-disc list-inside">
            <li>邮箱：contact@ainavigator.pro</li>
            <li>Twitter：@AINavigatorPro</li>
            <li>GitHub：github.com/ai-navigator-pro</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
