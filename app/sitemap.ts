import { MetadataRoute } from "next";
import { tools, agents, mcps, prompts, workflows, rankings, categories } from "@/lib/data";
import { withBasePath } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ainavigator.pro";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const urls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}${basePath}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}${basePath}/tools`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}${basePath}/agents`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}${basePath}/mcps`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}${basePath}/prompts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}${basePath}/workflows`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}${basePath}/rankings`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}${basePath}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}${basePath}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  tools.forEach((tool) => {
    urls.push({
      url: `${baseUrl}${basePath}/tools/${tool.id}`,
      lastModified: tool.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  });

  agents.forEach((agent) => {
    urls.push({
      url: `${baseUrl}${basePath}/agents/${agent.id}`,
      lastModified: agent.updatedAt,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  });

  mcps.forEach((mcp) => {
    urls.push({
      url: `${baseUrl}${basePath}/mcps/${mcp.id}`,
      lastModified: mcp.updatedAt,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  });

  prompts.forEach((prompt) => {
    urls.push({
      url: `${baseUrl}${basePath}/prompts/${prompt.id}`,
      lastModified: prompt.createdAt,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  });

  workflows.forEach((workflow) => {
    urls.push({
      url: `${baseUrl}${basePath}/workflows/${workflow.id}`,
      lastModified: workflow.updatedAt,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  });

  rankings.forEach((ranking) => {
    urls.push({
      url: `${baseUrl}${basePath}/rankings/${ranking.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  return urls;
}
