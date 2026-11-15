import React from 'react';
import { Search, Sliders, Moon, Sun, BookOpen, Bookmark } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  activeTab: 'feed' | 'archive' | 'craft' | 'about' | 'playground';
  onSelectTab: (tab: 'feed' | 'archive' | 'craft' | 'about' | 'playground') => void;
  onOpenSearch: () => void;
  onOpenThemeStudio: () => void;
  onOpenBookmarks: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  onOpenThemeStudio,
  onOpenBookmarks,
}) => {
  const { config, setColorMode, bookmarks } = useTheme();

  const cycleTheme = () => {
    if (config.colorMode === 'light') {
      setColorMode('sepia');
    } else if (config.colorMode === 'sepia') {
      setColorMode('dark');
    } else if (config.colorMode === 'dark') {
      setColorMode('oled');
    } else {
      setColorMode('light');
    }
  };

  const getThemeIcon = () => {
    switch (config.colorMode) {
      case 'light':
        return <Sun className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'sepia':
        return <BookOpen className="w-4 h-4 text-amber-700 dark:text-amber-300" />;
      case 'dark':
        return <Moon className="w-4 h-4 text-stone-300" />;
      case 'oled':
        return <Moon className="w-4 h-4 text-white fill-white" />;
    }
  };

  const getThemeName = () => {
    switch (config.colorMode) {
      case 'light':
        return 'Light';
      case 'sepia':
        return 'Sepia Paper';
      case 'dark':
        return 'Dark';
      case 'oled':
        return 'OLED';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-stone-50/90 dark:bg-stone-950/90 border-b border-stone-200 dark:border-stone-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('feed')}
          className="text-xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-100 hover:opacity-80 transition-opacity whitespace-nowrap shrink-0 text-left focus:outline-none"
        >
          Kallos
        </button>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600 dark:text-stone-300">
          <button
            onClick={() => onSelectTab('feed')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-stone-950 dark:hover:text-white ${
              activeTab === 'feed'
                ? 'text-stone-950 dark:text-white font-semibold underline underline-offset-8 decoration-1 decoration-stone-900 dark:decoration-stone-100'
                : ''
            }`}
          >
            Essays
          </button>
          <button
            onClick={() => onSelectTab('archive')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-stone-950 dark:hover:text-white ${
              activeTab === 'archive'
                ? 'text-stone-950 dark:text-white font-semibold underline underline-offset-8 decoration-1 decoration-stone-900 dark:decoration-stone-100'
                : ''
            }`}
          >
            Archive
          </button>
          <button
            onClick={() => onSelectTab('playground')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-stone-950 dark:hover:text-white ${
              activeTab === 'playground'
                ? 'text-stone-950 dark:text-white font-semibold underline underline-offset-8 decoration-1 decoration-stone-900 dark:decoration-stone-100'
                : ''
            }`}
          >
            Live Writer
          </button>
          <button
            onClick={() => onSelectTab('about')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-stone-950 dark:hover:text-white ${
              activeTab === 'about'
                ? 'text-stone-950 dark:text-white font-semibold underline underline-offset-8 decoration-1 decoration-stone-900 dark:decoration-stone-100'
                : ''
            }`}
          >
            Colophon
          </button>
        </nav>

        {/* Zone 3: Clean functional utility cluster */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 border border-stone-200 dark:border-stone-800 rounded hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors whitespace-nowrap"
            title="Search articles (Press ⌘K)"
            aria-label="Search articles"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline text-[10px] font-mono text-stone-400 dark:text-stone-500 bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded">
              ⌘K
            </kbd>
          </button>

          {/* Bookmarks */}
          <button
            onClick={onOpenBookmarks}
            className="relative p-2 text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white border border-transparent hover:border-stone-200 dark:hover:border-stone-800 rounded transition-colors"
            title="Saved Reading List"
            aria-label="View Saved Reading List"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarks.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-stone-800 dark:bg-stone-200" />
            )}
          </button>

          {/* Theme Quick Toggle (Light -> Sepia -> Dark -> OLED) */}
          <button
            onClick={cycleTheme}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white border border-stone-200 dark:border-stone-800 rounded hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors whitespace-nowrap"
            title={`Current: ${getThemeName()} mode. Click to cycle`}
            aria-label={`Toggle theme: current ${getThemeName()}`}
          >
            {getThemeIcon()}
            <span className="hidden lg:inline text-xs">{getThemeName()}</span>
          </button>

          {/* Reader & Typography Settings Studio */}
          <button
            onClick={onOpenThemeStudio}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-900 dark:text-stone-100 bg-stone-200/80 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 rounded transition-colors whitespace-nowrap shrink-0"
            title="Open Typography & Theme Customizer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Customize Theme</span>
          </button>
        </div>
      </div>
    </header>
  );
};
