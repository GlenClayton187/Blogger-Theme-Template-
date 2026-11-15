import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Sun, Moon, ArrowRight, Sliders, PenTool } from 'lucide-react';
import { Article } from '../types';
import { useTheme } from '../context/ThemeContext';
import { calculateReadingMetrics } from '../utils/readingTime';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onSelectTab: (tab: 'feed' | 'archive' | 'craft' | 'about' | 'playground') => void;
  onOpenThemeStudio: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
  onSelectTab,
  onOpenThemeStudio,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setColorMode } = useTheme();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter articles
  const filteredArticles = articles.filter((art) => {
    const q = query.toLowerCase();
    return (
      art.title.toLowerCase().includes(q) ||
      art.subtitle.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q) ||
      art.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const commands = [
    {
      id: 'cmd-light',
      label: 'Switch to Alabaster Light theme',
      category: 'Appearance',
      icon: Sun,
      action: () => {
        setColorMode('light');
        onClose();
      },
    },
    {
      id: 'cmd-sepia',
      label: 'Switch to Archival Sepia paper theme',
      category: 'Appearance',
      icon: BookOpen,
      action: () => {
        setColorMode('sepia');
        onClose();
      },
    },
    {
      id: 'cmd-dark',
      label: 'Switch to Velvet Charcoal dark theme',
      category: 'Appearance',
      icon: Moon,
      action: () => {
        setColorMode('dark');
        onClose();
      },
    },
    {
      id: 'cmd-oled',
      label: 'Switch to True OLED pitch-black theme',
      category: 'Appearance',
      icon: Moon,
      action: () => {
        setColorMode('oled');
        onClose();
      },
    },
    {
      id: 'cmd-studio',
      label: 'Open Typography & Theme Customizer',
      category: 'Preferences',
      icon: Sliders,
      action: () => {
        onClose();
        onOpenThemeStudio();
      },
    },
    {
      id: 'cmd-writer',
      label: 'Open Live Writer & Markdown Playground',
      category: 'Tools',
      icon: PenTool,
      action: () => {
        onSelectTab('playground');
        onClose();
      },
    },
  ].filter((cmd) => cmd.label.toLowerCase().includes(query.toLowerCase()));

  const allItems = [
    ...filteredArticles.map((art) => ({ type: 'article' as const, data: art })),
    ...commands.map((cmd) => ({ type: 'command' as const, data: cmd })),
  ];

  const handleSelect = (item: (typeof allItems)[0]) => {
    if (item.type === 'article') {
      onSelectArticle(item.data);
      onClose();
    } else {
      item.data.action();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xl overflow-hidden flex flex-col font-sans">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-stone-200 dark:border-stone-800 gap-3">
          <Search className="w-4 h-4 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search essays, topics, or type a theme command..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev < allItems.length - 1 ? prev + 1 : 0));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : allItems.length - 1));
              } else if (e.key === 'Enter' && allItems[selectedIndex]) {
                e.preventDefault();
                handleSelect(allItems[selectedIndex]);
              }
            }}
            className="w-full text-sm bg-transparent text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-stone-100 dark:divide-stone-800/50">
          {filteredArticles.length > 0 && (
            <div className="py-1">
              <span className="px-3 py-1 text-[11px] uppercase tracking-wider font-semibold text-stone-400 dark:text-stone-500 block">
                Essays & Articles
              </span>
              {filteredArticles.map((art, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <button
                    key={art.id}
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full px-3 py-2 text-left rounded-lg transition-colors flex items-center justify-between text-xs ${
                      isSelected
                        ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/50'
                    }`}
                  >
                    <div>
                      <span className="font-serif font-medium text-sm block">
                        {art.title}
                      </span>
                      <span className="text-[11px] text-stone-400">
                        {art.category} · {calculateReadingMetrics(art).readingTimeText}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  </button>
                );
              })}
            </div>
          )}

          {commands.length > 0 && (
            <div className="py-1">
              <span className="px-3 py-1 text-[11px] uppercase tracking-wider font-semibold text-stone-400 dark:text-stone-500 block">
                Quick Actions & Themes
              </span>
              {commands.map((cmd, cIdx) => {
                const Icon = cmd.icon;
                const overallIdx = filteredArticles.length + cIdx;
                const isSelected = selectedIndex === overallIdx;
                return (
                  <button
                    key={cmd.id}
                    onClick={() => cmd.action()}
                    onMouseEnter={() => setSelectedIndex(overallIdx)}
                    className={`w-full px-3 py-2 text-left rounded-lg transition-colors flex items-center gap-3 text-xs ${
                      isSelected
                        ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-stone-500" />
                    <span className="flex-1 font-medium">{cmd.label}</span>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider">
                      {cmd.category}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {allItems.length === 0 && (
            <div className="p-8 text-center text-stone-400 text-xs">
              No articles or actions found matching “{query}”
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-stone-50 dark:bg-stone-950/50 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
          <span>Navigate with ↑ ↓ · Select with ↵</span>
          <span>Esc to exit</span>
        </div>
      </div>
    </div>
  );
};
