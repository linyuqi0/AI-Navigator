"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8">使用条款</h1>

          <div className="prose prose-lg max-w-none dark:prose-invert space-y-6">
            <p className="text-muted-foreground">
              最后更新：2024年7月15日
            </p>

            <div>
              <h2 className="text-xl font-semibold mb-3">1. 接受条款</h2>
              <p className="text-muted-foreground">
                通过访问或使用 AI Navigator Pro 网站和服务，您同意遵守这些使用条款。如果您不同意这些条款的任何部分，请不要使用我们的服务。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">2. 服务内容</h2>
              <p className="text-muted-foreground mb-2">
                AI Navigator Pro 是一个AI工具导航和信息分享平台，提供以下服务：
              </p>
              <ul className="text-muted-foreground list-disc list-inside space-y-1">
                <li>AI工具、Agent、MCP、Prompt、工作流等资源的索引和介绍</li>
                <li>搜索和发现功能</li>
                <li>本地收藏和浏览历史功能</li>
                <li>AI行业资讯聚合</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">3. 用户责任</h2>
              <p className="text-muted-foreground mb-2">
                用户在使用本服务时应遵守以下规定：
              </p>
              <ul className="text-muted-foreground list-disc list-inside space-y-1">
                <li>不得利用本服务从事任何违法违规活动</li>
                <li>不得干扰或破坏本服务的正常运行</li>
                <li>不得进行任何形式的数据爬取或自动化访问</li>
                <li>不得传播恶意软件或有害内容</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">4. 知识产权</h2>
              <p className="text-muted-foreground">
                本网站的所有内容（包括但不限于文字、图片、标志、设计等）均受版权法和其他知识产权法保护。未经授权，不得复制、修改、分发或以任何形式使用。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">5. 第三方链接</h2>
              <p className="text-muted-foreground">
                本网站包含指向第三方网站的链接。我们不对这些外部网站的内容、产品或服务负责，也不因其可用性或使用产生的任何损失承担责任。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">6. 免责声明</h2>
              <p className="text-muted-foreground">
                本网站提供的信息仅供参考，我们尽力确保信息的准确性，但不对信息的完整性、准确性或及时性作任何保证。您因使用本网站信息而产生的任何风险由您自行承担。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">7. 服务变更</h2>
              <p className="text-muted-foreground">
                我们保留随时修改或终止服务的权利，无需事先通知。对服务的任何修改、暂停或终止，我们不对您或任何第三方承担责任。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">8. 条款变更</h2>
              <p className="text-muted-foreground">
                我们可能会不时更新这些使用条款。继续使用服务即表示您接受更新后的条款。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">9. 联系方式</h2>
              <p className="text-muted-foreground">
                如有任何问题或建议，请通过 legal@ainavigator.pro 联系我们。
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
