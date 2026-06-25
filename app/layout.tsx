import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { withBasePath } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AI Navigator Pro - 精选全球优质AI工具导航",
  description:
    "AI Navigator Pro 精选全球最优质的AI工具、Agent、MCP和工作流，助你在AI时代事半功倍。涵盖AI聊天、图像生成、视频制作、编程助手等全品类。",
  keywords: [
    "AI工具",
    "AI导航",
    "ChatGPT",
    "Midjourney",
    "AI Agent",
    "MCP",
    "Prompt",
    "AI工作流",
  ],
  authors: [{ name: "AI Navigator Pro" }],
  openGraph: {
    title: "AI Navigator Pro - 精选全球优质AI工具导航",
    description:
      "精选全球最优质的AI工具、Agent、MCP和工作流，助你在AI时代事半功倍。",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Navigator Pro - 精选全球优质AI工具导航",
    description:
      "精选全球最优质的AI工具、Agent、MCP和工作流，助你在AI时代事半功倍。",
  },
  icons: {
    icon: withBasePath("/favicon.ico"),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          defaultTheme="light"
        >
          <TooltipProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
