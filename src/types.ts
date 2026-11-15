export type ColorMode = 'light' | 'sepia' | 'dark' | 'oled';
export type BodyFont = 'serif' | 'sans' | 'mono';
export type FontSize = 'sm' | 'base' | 'lg' | 'xl';
export type ColumnWidth = 'narrow' | 'default' | 'wide';
export type LineHeight = 'compact' | 'relaxed' | 'loose';

export interface ThemeConfig {
  colorMode: ColorMode;
  bodyFont: BodyFont;
  fontSize: FontSize;
  columnWidth: ColumnWidth;
  lineHeight: LineHeight;
  dropCaps: boolean;
  focusMode: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: 'Essays' | 'Engineering' | 'Design' | 'Philosophy';
  coverImage?: string;
  coverCaption?: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  featuredTier: 'lead' | 'secondary' | 'standard';
  content: ArticleSection[];
  tags: string[];
}

export interface ArticleSection {
  id: string;
  heading?: string;
  paragraphs: string[];
  pullQuote?: {
    text: string;
    author?: string;
  };
  codeBlock?: {
    code: string;
    language: string;
    filename?: string;
  };
  image?: {
    url: string;
    caption: string;
  };
  footnotes?: Array<{
    id: number;
    text: string;
  }>;
}

export interface Comment {
  id: string;
  author: string;
  date: string;
  text: string;
  likes: number;
}
