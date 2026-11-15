import React, { createContext, useContext, useEffect, useState } from 'react';
import { ColorMode, BodyFont, FontSize, ColumnWidth, LineHeight, ThemeConfig } from '../types';

interface ThemeContextType {
  config: ThemeConfig;
  setColorMode: (mode: ColorMode) => void;
  setBodyFont: (font: BodyFont) => void;
  setFontSize: (size: FontSize) => void;
  setColumnWidth: (width: ColumnWidth) => void;
  setLineHeight: (height: LineHeight) => void;
  setDropCaps: (enabled: boolean) => void;
  setFocusMode: (enabled: boolean) => void;
  resetTheme: () => void;
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  getFontFamilyClass: () => string;
  getColumnWidthClass: () => string;
  getFontSizeClass: () => string;
  getLineHeightClass: () => string;
}

const DEFAULT_THEME: ThemeConfig = {
  colorMode: 'light',
  bodyFont: 'serif',
  fontSize: 'base',
  columnWidth: 'default',
  lineHeight: 'relaxed',
  dropCaps: true,
  focusMode: false,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ThemeConfig>(() => {
    try {
      const saved = localStorage.getItem('kallos_theme_config');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_THEME;
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kallos_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['art-1'];
  });

  // Apply classes to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'sepia', 'oled');

    if (config.colorMode === 'dark') {
      root.classList.add('dark');
    } else if (config.colorMode === 'oled') {
      root.classList.add('dark', 'oled');
    } else if (config.colorMode === 'sepia') {
      root.classList.add('sepia');
    }

    try {
      localStorage.setItem('kallos_theme_config', JSON.stringify(config));
    } catch {
      // ignore
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem('kallos_bookmarks', JSON.stringify(bookmarks));
    } catch {
      // ignore
    }
  }, [bookmarks]);

  const setColorMode = (colorMode: ColorMode) => setConfig((prev) => ({ ...prev, colorMode }));
  const setBodyFont = (bodyFont: BodyFont) => setConfig((prev) => ({ ...prev, bodyFont }));
  const setFontSize = (fontSize: FontSize) => setConfig((prev) => ({ ...prev, fontSize }));
  const setColumnWidth = (columnWidth: ColumnWidth) => setConfig((prev) => ({ ...prev, columnWidth }));
  const setLineHeight = (lineHeight: LineHeight) => setConfig((prev) => ({ ...prev, lineHeight }));
  const setDropCaps = (dropCaps: boolean) => setConfig((prev) => ({ ...prev, dropCaps }));
  const setFocusMode = (focusMode: boolean) => setConfig((prev) => ({ ...prev, focusMode }));
  const resetTheme = () => setConfig(DEFAULT_THEME);

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isBookmarked = (id: string) => bookmarks.includes(id);

  const getFontFamilyClass = () => {
    switch (config.bodyFont) {
      case 'serif':
        return 'font-serif';
      case 'sans':
        return 'font-sans';
      case 'mono':
        return 'font-mono';
      default:
        return 'font-serif';
    }
  };

  const getColumnWidthClass = () => {
    switch (config.columnWidth) {
      case 'narrow':
        return 'max-w-[620px]';
      case 'default':
        return 'max-w-[700px]';
      case 'wide':
        return 'max-w-[820px]';
      default:
        return 'max-w-[700px]';
    }
  };

  const getFontSizeClass = () => {
    switch (config.fontSize) {
      case 'sm':
        return 'text-[15px]';
      case 'base':
        return 'text-[17px]';
      case 'lg':
        return 'text-[19px]';
      case 'xl':
        return 'text-[21px]';
      default:
        return 'text-[17px]';
    }
  };

  const getLineHeightClass = () => {
    switch (config.lineHeight) {
      case 'compact':
        return 'leading-[1.65]';
      case 'relaxed':
        return 'leading-[1.8]';
      case 'loose':
        return 'leading-[2.0]';
      default:
        return 'leading-[1.8]';
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        config,
        setColorMode,
        setBodyFont,
        setFontSize,
        setColumnWidth,
        setLineHeight,
        setDropCaps,
        setFocusMode,
        resetTheme,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        getFontFamilyClass,
        getColumnWidthClass,
        getFontSizeClass,
        getLineHeightClass,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
