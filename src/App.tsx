import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { FeedView } from './components/FeedView';
import { ArticleView } from './components/ArticleView';
import { ArchiveView } from './components/ArchiveView';
import { PlaygroundView } from './components/PlaygroundView';
import { AboutView } from './components/AboutView';
import { CommandPalette } from './components/CommandPalette';
import { ThemeStudioModal } from './components/ThemeStudioModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { ARTICLES } from './data/articles';
import { Article } from './types';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'archive' | 'craft' | 'about' | 'playground'>('feed');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isThemeStudioOpen, setIsThemeStudioOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Scroll to top when changing views or articles
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedArticle, activeTab]);

  // Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K: Open Search
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleBackToFeed = () => {
    setSelectedArticle(null);
  };

  const handleSelectTab = (tab: 'feed' | 'archive' | 'craft' | 'about' | 'playground') => {
    setSelectedArticle(null);
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200">
      {/* Fixed top reading progress indicator */}
      <ReadingProgressBar />

      {/* Strict 3-zone Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenThemeStudio={() => setIsThemeStudioOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {selectedArticle ? (
          <ArticleView
            article={selectedArticle}
            onBack={handleBackToFeed}
            onSelectArticle={handleSelectArticle}
            allArticles={ARTICLES}
            onOpenThemeStudio={() => setIsThemeStudioOpen(true)}
          />
        ) : (
          <>
            {activeTab === 'feed' && (
              <FeedView
                articles={ARTICLES}
                onSelectArticle={handleSelectArticle}
                onOpenThemeStudio={() => setIsThemeStudioOpen(true)}
                onSelectTab={handleSelectTab}
              />
            )}
            {activeTab === 'archive' && (
              <ArchiveView
                articles={ARTICLES}
                onSelectArticle={handleSelectArticle}
              />
            )}
            {activeTab === 'playground' && <PlaygroundView />}
            {activeTab === 'about' && <AboutView />}
          </>
        )}
      </main>

      {/* Minimalist Editorial Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={ARTICLES}
        onSelectArticle={handleSelectArticle}
        onSelectTab={handleSelectTab}
        onOpenThemeStudio={() => setIsThemeStudioOpen(true)}
      />

      <ThemeStudioModal
        isOpen={isThemeStudioOpen}
        onClose={() => setIsThemeStudioOpen(false)}
      />

      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        articles={ARTICLES}
        onSelectArticle={handleSelectArticle}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
