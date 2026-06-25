"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8">隐私政策</h1>

          <div className="prose prose-lg max-w-none dark:prose-invert space-y-6">
            <p className="text-muted-foreground">
              最后更新：2024年7月15日
            </p>

            <div>
              <h2 className="text-xl font-semibold mb-3">1. 概述</h2>
              <p className="text-muted-foreground">
                AI Navigator Pro（以下简称"我们"）非常重视用户的隐私。本隐私政策说明了我们在您使用我们的网站和服务时，如何收集、使用和保护您的信息。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">2. 信息收集</h2>
              <p className="text-muted-foreground mb-2">
                我们收集以下类型的信息：
              </p>
              <ul className="text-muted-foreground list-disc list-inside space-y-1">
                <li>本地存储数据：您的收藏和浏览历史保存在您的浏览器本地，我们不会上传到服务器。</li>
                <li>匿名使用数据：我们可能收集匿名的网站访问统计数据，用于改善用户体验。</li>
                <li>Cookies：我们使用必要的Cookies来确保网站正常运行。</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">3. 信息使用</h2>
              <p className="text-muted-foreground">
                我们收集的信息仅用于提供、维护和改进我们的服务。我们不会出售您的个人信息给第三方。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">4. 数据存储</h2>
              <p className="text-muted-foreground">
                您的收藏、浏览历史等数据存储在您的浏览器本地（IndexedDB），完全由您控制。您可以随时在浏览器设置中清除这些数据。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">5. 第三方链接</h2>
              <p className="text-muted-foreground">
                我们的网站包含指向第三方网站的链接。我们不对这些外部网站的隐私政策或内容负责，建议您查阅相关网站的隐私政策。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">6. 政策变更</h2>
              <p className="text-muted-foreground">
                我们可能会不时更新本隐私政策。任何变更将在本页面发布，重大变更将通过更显著的方式通知您。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">7. 联系我们</h2>
              <p className="text-muted-foreground">
                如果您对本隐私政策有任何疑问，请通过 privacy@ainavigator.pro 联系我们。
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
