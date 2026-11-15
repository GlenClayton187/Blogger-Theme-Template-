import React, { useState } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import { Article } from '../types';
import { ArticleCard } from './ArticleCard';

interface ArchiveViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({ articles, onSelectArticle }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'Essays', 'Engineering', 'Design', 'Philosophy'];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory = filterCategory === 'all' || art.category === filterCategory;
    const matchesQuery =
      searchQuery === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="w-full py-10">
      <div className="max-w-4xl mx-auto px-6 space-y-10">
        {/* Archive Header */}
        <div className="space-y-3 pb-8 border-b border-stone-200 dark:border-stone-800">
          <span className="text-xs uppercase tracking-widest font-sans font-semibold text-stone-400 dark:text-stone-500">
            Chronological Index
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">
            The Complete Archive
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 font-sans leading-relaxed max-w-xl">
            A permanent record of essays, engineering notes, and design reflections published since autumn 2026.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 font-sans text-xs">
          {/* Functional Category Filter Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                  filterCategory === cat
                    ? 'bg-white dark:bg-stone-800 text-stone-950 dark:text-stone-50 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                {cat === 'all' ? 'All Dispatches' : cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Filter by title or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-8 pr-3 py-2 border border-stone-200 dark:border-stone-800 rounded-lg bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-400 text-xs"
            />
          </div>
        </div>

        {/* Archive Timeline List */}
        <div className="space-y-1 pt-4">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onSelect={onSelectArticle}
                variant="compact"
              />
            ))
          ) : (
            <div className="py-16 text-center space-y-2 text-stone-400 font-sans">
              <BookOpen className="w-6 h-6 mx-auto opacity-30" />
              <p className="text-xs">No dispatches match the selected criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
