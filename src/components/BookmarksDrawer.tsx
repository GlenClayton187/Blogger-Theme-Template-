import React from 'react';
import { X, Bookmark, Trash2, ArrowUpRight } from 'lucide-react';
import { Article } from '../types';
import { useTheme } from '../context/ThemeContext';
import { calculateReadingMetrics } from '../utils/readingTime';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const { bookmarks, toggleBookmark } = useTheme();

  if (!isOpen) return null;

  const savedArticles = articles.filter((art) => bookmarks.includes(art.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-md h-full bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col font-sans">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-stone-800 dark:text-stone-200 fill-current" />
            <h2 className="text-base font-serif font-semibold text-stone-900 dark:text-stone-100">
              Saved Reading List ({savedArticles.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved Items List */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {savedArticles.length > 0 ? (
            savedArticles.map((art) => (
              <div
                key={art.id}
                className="group p-4 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span>{art.category}</span>
                  <span>{calculateReadingMetrics(art).readingTimeText}</span>
                </div>

                <h3
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="font-serif font-medium text-base text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-300 cursor-pointer"
                >
                  {art.title}
                </h3>

                <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                  {art.excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 font-medium text-stone-900 dark:text-stone-100 hover:underline"
                  >
                    Read now <ArrowUpRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => toggleBookmark(art.id)}
                    className="text-stone-400 hover:text-rose-500 p-1 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 space-y-3 text-stone-400">
              <Bookmark className="w-8 h-8 mx-auto opacity-30" />
              <p className="text-xs">Your reading list is empty.</p>
              <p className="text-[11px] text-stone-500">
                Click the bookmark icon on any essay to save it here for later offline reading.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
