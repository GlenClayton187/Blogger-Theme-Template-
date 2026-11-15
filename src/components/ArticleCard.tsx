import React, { useState } from 'react';
import { Bookmark, ArrowUpRight } from 'lucide-react';
import { Article } from '../types';
import { useTheme } from '../context/ThemeContext';
import { calculateReadingMetrics } from '../utils/readingTime';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  variant?: 'lead' | 'secondary' | 'compact';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  variant = 'secondary',
}) => {
  const { isBookmarked, toggleBookmark } = useTheme();
  const bookmarked = isBookmarked(article.id);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const readingMetrics = calculateReadingMetrics(article);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(article.id);
  };

  // Lead Tier: Dominant presentation for top essay
  if (variant === 'lead') {
    return (
      <article
        onClick={() => onSelect(article)}
        className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-14 border-b border-stone-200 dark:border-stone-800 transition-colors"
      >
        <div className="lg:col-span-7 space-y-4">
          {/* Zero-pill unboxed metadata */}
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-sans tracking-wide">
            <span className="uppercase tracking-wider font-medium text-stone-900 dark:text-stone-200">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.date}</span>
            <span aria-hidden="true">·</span>
            <span>{readingMetrics.readingTimeText}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold tracking-tight text-stone-900 dark:text-stone-50 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors" style={{ textWrap: 'balance' }}>
            {article.title}
          </h2>

          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-sans line-clamp-3">
            {article.excerpt}
          </p>

          <div className="pt-2 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-sans">
            <div className="flex items-center gap-2.5">
              <span>By {article.author.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleBookmarkClick}
                className="p-1 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                title={bookmarked ? 'Remove from reading list' : 'Save for later'}
                aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark article'}
              >
                <Bookmark
                  className={`w-4 h-4 ${bookmarked ? 'fill-stone-900 dark:fill-stone-100 text-stone-900 dark:text-stone-100' : 'text-stone-400'}`}
                />
              </button>
              <span className="inline-flex items-center gap-1 font-medium text-stone-900 dark:text-stone-100 group-hover:translate-x-0.5 transition-transform">
                Read essay <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>

        {article.coverImage && (
          <div className="lg:col-span-5 overflow-hidden rounded bg-stone-100 dark:bg-stone-900 aspect-16/10">
            {!imageError ? (
              <img
                src={article.coverImage}
                alt={article.title}
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.02] ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-stone-400 dark:text-stone-600 bg-stone-100 dark:bg-stone-900">
                <span className="text-sm font-serif italic text-center">{article.title}</span>
              </div>
            )}
          </div>
        )}
      </article>
    );
  }

  // Secondary Tier: Visual story cards
  if (variant === 'secondary') {
    return (
      <article
        onClick={() => onSelect(article)}
        className="group cursor-pointer flex flex-col justify-between h-full space-y-4 pb-8 border-b border-stone-200 dark:border-stone-800 transition-colors"
      >
        <div className="space-y-4">
          {article.coverImage && (
            <div className="overflow-hidden rounded bg-stone-100 dark:bg-stone-900 aspect-16/10">
              {!imageError ? (
                <img
                  src={article.coverImage}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.02] ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-stone-400 dark:text-stone-600 bg-stone-100 dark:bg-stone-900">
                  <span className="text-sm font-serif italic text-center">{article.title}</span>
                </div>
              )}
            </div>
          )}

          {/* Zero-pill unboxed metadata */}
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-sans tracking-wide">
            <span className="uppercase tracking-wider font-medium text-stone-900 dark:text-stone-200">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.date}</span>
            <span aria-hidden="true">·</span>
            <span>{readingMetrics.readingTimeText}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-semibold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors" style={{ textWrap: 'balance' }}>
            {article.title}
          </h3>

          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-sans line-clamp-2">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-sans border-t border-stone-100 dark:border-stone-900">
          <span>{article.author.name}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmarkClick}
              className="p-1 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              title={bookmarked ? 'Remove from reading list' : 'Save for later'}
              aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark article'}
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${bookmarked ? 'fill-stone-900 dark:fill-stone-100 text-stone-900 dark:text-stone-100' : 'text-stone-400'}`}
              />
            </button>
            <span className="inline-flex items-center gap-0.5 text-stone-900 dark:text-stone-100 font-medium group-hover:translate-x-0.5 transition-transform">
              Read <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </article>
    );
  }

  // Compact Row Tier: Stream/Archive list view
  return (
    <article
      onClick={() => onSelect(article)}
      className="group cursor-pointer py-4 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 hover:bg-stone-100/50 dark:hover:bg-stone-900/40 px-2 -mx-2 rounded transition-colors"
    >
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-sans">
          <span className="uppercase tracking-wider font-medium text-stone-800 dark:text-stone-300">
            {article.category}
          </span>
          <span aria-hidden="true">·</span>
          <span>{article.date}</span>
        </div>

        <h4 className="text-base sm:text-lg font-serif font-medium text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
          {article.title}
        </h4>
      </div>

      <div className="flex items-center gap-4 text-xs text-stone-400 dark:text-stone-500 font-sans shrink-0">
        <span>{readingMetrics.readingTimeText}</span>
        <button
          onClick={handleBookmarkClick}
          className="p-1 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          title={bookmarked ? 'Remove bookmark' : 'Bookmark'}
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'}
        >
          <Bookmark
            className={`w-3.5 h-3.5 ${bookmarked ? 'fill-stone-900 dark:fill-stone-100 text-stone-900 dark:text-stone-100' : 'text-stone-400'}`}
          />
        </button>
      </div>
    </article>
  );
};
