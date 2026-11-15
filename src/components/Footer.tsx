import React from 'react';
import { ArrowUp, RotateCcw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const { resetTheme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-stone-200 dark:border-stone-800 mt-28 py-14 transition-colors">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-stone-200 dark:border-stone-800">
          <div className="max-w-md">
            <span className="text-base font-serif font-semibold text-stone-900 dark:text-stone-100">
              Kallos Minimalist Editorial
            </span>
            <p className="mt-2 text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-sans">
              A bespoke blog theme prioritizing human reading cadence, typographic rigor, optical dark mode contrast, and zero telemetry tracking.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-stone-600 dark:text-stone-400 font-sans">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to top</span>
            </button>
            <button
              onClick={resetTheme}
              className="flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              title="Reset theme and font preferences to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset theme settings</span>
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 dark:text-stone-500 font-sans">
          <p>© 2026 Kallos Journal. Set in Newsreader & Plus Jakarta Sans.</p>
          <div className="flex items-center gap-4">
            <span>Archival Quality</span>
            <span>·</span>
            <span>68ch Optimal Reading Measure</span>
            <span>·</span>
            <span>WCAG AAA Contrast</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
