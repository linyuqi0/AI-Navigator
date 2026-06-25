export interface Tool {
  id: string;
  name: string;
  logo: string;
  description: string;
  url: string;
  price: string;
  isFree: boolean;
  tags: string[];
  category: string;
  rating: number;
  updatedAt: string;
  screenshots: string[];
  features: string[];
  competitors: string[];
  useCases: string[];
  seoTitle: string;
  seoDescription: string;
  featured?: boolean;
  trending?: boolean;
  views?: number;
}

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  rating: number;
  updatedAt: string;
  features: string[];
  useCases: string[];
  seoTitle: string;
  seoDescription: string;
  featured?: boolean;
  trending?: boolean;
  views?: number;
}

export interface MCP {
  id: string;
  name: string;
  logo: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  rating: number;
  updatedAt: string;
  features: string[];
  seoTitle: string;
  seoDescription: string;
  featured?: boolean;
  trending?: boolean;
  views?: number;
}

export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
  seoTitle: string;
  seoDescription: string;
  featured?: boolean;
  views?: number;
}

export interface Workflow {
  id: string;
  name: string;
  cover: string;
  description: string;
  category: string;
  tags: string[];
  steps: string[];
  tools: string[];
  duration: string;
  difficulty: string;
  updatedAt: string;
  seoTitle: string;
  seoDescription: string;
  featured?: boolean;
  views?: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string;
  image?: string;
  category: string;
}

export interface RankingItem {
  id: string;
  title: string;
  description: string;
  category: string;
  period: string;
  items: { rank: number; toolId: string; score: number }[];
  seoTitle: string;
  seoDescription: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  count: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
}
