import React, { useState } from 'react';
import { X, Check, Copy, Code, Sparkles, BookOpen, Sun, Moon, Type } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ColorMode, BodyFont, FontSize, ColumnWidth, LineHeight } from '../types';

interface ThemeStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeStudioModal: React.FC<ThemeStudioModalProps> = ({ isOpen, onClose }) => {
  const {
    config,
    setColorMode,
    setBodyFont,
    setFontSize,
    setColumnWidth,
    setLineHeight,
    setDropCaps,
    resetTheme,
    getFontFamilyClass,
    getColumnWidthClass,
    getFontSizeClass,
    getLineHeightClass,
  } = useTheme();

  const [activeTab, setActiveTab] = useState<'controls' | 'code'>('controls');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const colorModes: { id: ColorMode; label: string; desc: string; icon: any }[] = [
    { id: 'light', label: 'Alabaster Light', desc: 'Clean high-contrast paper (#fafaf9)', icon: Sun },
    { id: 'sepia', label: 'Archival Sepia', desc: 'Warm book stock & bistre ink (#f7f3e8)', icon: BookOpen },
    { id: 'dark', label: 'Velvet Charcoal', desc: 'Low-fatigue obsidian slate (#121214)', icon: Moon },
    { id: 'oled', label: 'OLED Pitch Black', desc: 'True #000000 with soft bone typography', icon: Moon },
  ];

  const fonts: { id: BodyFont; label: string; desc: string; sample: string }[] = [
    { id: 'serif', label: 'Editorial Serif', desc: 'Newsreader — Classic book proportion with generous x-height', sample: 'Aa Gg Qq' },
    { id: 'sans', label: 'Modern Sans', desc: 'Plus Jakarta Sans — Geometric clarity and modern ergonomics', sample: 'Aa Gg Qq' },
    { id: 'mono', label: 'Technical Mono', desc: 'JetBrains Mono — Fixed-pitch precision for engineering logs', sample: 'Aa 01 {}' },
  ];

  const fontSizes: { id: FontSize; label: string; px: string }[] = [
    { id: 'sm', label: 'Compact', px: '15px' },
    { id: 'base', label: 'Standard', px: '17px' },
    { id: 'lg', label: 'Comfortable', px: '19px' },
    { id: 'xl', label: 'Generous', px: '21px' },
  ];

  const columnWidths: { id: ColumnWidth; label: string; width: string; chars: string }[] = [
    { id: 'narrow', label: 'Narrow', width: '620px', chars: '~60 chars' },
    { id: 'default', label: 'Balanced (Recommended)', width: '700px', chars: '~68 chars' },
    { id: 'wide', label: 'Roomy', width: '820px', chars: '~80 chars' },
  ];

  const lineHeights: { id: LineHeight; label: string; ratio: string }[] = [
    { id: 'compact', label: 'Compact', ratio: '1.65' },
    { id: 'relaxed', label: 'Relaxed (Recommended)', ratio: '1.80' },
    { id: 'loose', label: 'Loose', ratio: '2.00' },
  ];

  const generateExportCode = () => {
    return `/* =========================================================
   KALLOS MINIMALIST BLOG THEME SPECIFICATION
   Generated from Kallos Theme Studio
   ========================================================= */

/* 1. Global CSS Custom Variables */
:root {
  --font-serif: "Newsreader", Georgia, serif;
  --font-sans: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  
  /* Reading Ergonomics */
  --measure-width: ${config.columnWidth === 'narrow' ? '620px' : config.columnWidth === 'wide' ? '820px' : '700px'};
  --reading-font-size: ${config.fontSize === 'sm' ? '15px' : config.fontSize === 'lg' ? '19px' : config.fontSize === 'xl' ? '21px' : '17px'};
  --reading-line-height: ${config.lineHeight === 'compact' ? '1.65' : config.lineHeight === 'loose' ? '2.0' : '1.8'};

  /* Active Color Palette: ${config.colorMode.toUpperCase()} */
  ${
    config.colorMode === 'light'
      ? `--bg-canvas: #fafaf9;
  --text-main: #1c1917;
  --text-muted: #78716c;
  --border-hairline: #e7e5e4;
  --accent-ink: #0c0a09;`
      : config.colorMode === 'sepia'
      ? `--bg-canvas: #f7f3e8;
  --text-main: #2e261d;
  --text-muted: #7d7265;
  --border-hairline: #e4ded0;
  --accent-ink: #543e2b;`
      : config.colorMode === 'dark'
      ? `--bg-canvas: #121214;
  --text-main: #f4f4f5;
  --text-muted: #a1a1aa;
  --border-hairline: #27272a;
  --accent-ink: #ffffff;`
      : `--bg-canvas: #000000;
  --text-main: #ededed;
  --text-muted: #888888;
  --border-hairline: #222222;
  --accent-ink: #ffffff;`
  }
}

/* 2. Editorial Drop Cap Rule */
${
  config.dropCaps
    ? `.article-body > p:first-of-type::first-letter {
  float: left;
  font-family: var(--font-serif);
  font-size: 3.75rem;
  line-height: 0.85;
  font-weight: 500;
  margin-right: 0.65rem;
  margin-top: 0.25rem;
}`
    : '/* Drop caps disabled */'
}

/* 3. Optimal Reading Column */
.article-container {
  max-width: var(--measure-width);
  margin-left: auto;
  margin-right: auto;
  font-size: var(--reading-font-size);
  line-height: var(--reading-line-height);
  color: var(--text-main);
  background-color: var(--bg-canvas);
}`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateExportCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-stone-700 dark:text-stone-300" />
            <h2 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
              Theme & Readability Studio
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center p-0.5 bg-stone-100 dark:bg-stone-800 rounded text-xs font-sans">
              <button
                onClick={() => setActiveTab('controls')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'controls'
                    ? 'bg-white dark:bg-stone-700 font-medium text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                Controls
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'code'
                    ? 'bg-white dark:bg-stone-700 font-medium text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                Export CSS
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-7 flex-1 font-sans text-xs">
          {activeTab === 'controls' ? (
            <>
              {/* Color Scheme Palettes */}
              <div className="space-y-2.5">
                <label className="text-xs font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider block">
                  Color Scheme & Contrast Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {colorModes.map((mode) => {
                    const Icon = mode.icon;
                    const isActive = config.colorMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setColorMode(mode.id)}
                        className={`p-3 text-left border rounded-lg transition-all flex items-start gap-3 ${
                          isActive
                            ? 'border-stone-900 dark:border-stone-100 bg-stone-100 dark:bg-stone-800 ring-1 ring-stone-900 dark:ring-stone-100'
                            : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                        }`}
                      >
                        <div className="p-1.5 rounded bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-stone-900 dark:text-stone-100 text-xs">
                              {mode.label}
                            </span>
                            {isActive && <Check className="w-3.5 h-3.5 text-stone-900 dark:text-stone-100" />}
                          </div>
                          <span className="text-[11px] text-stone-500 dark:text-stone-400 block mt-0.5">
                            {mode.desc}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Typography Family */}
              <div className="space-y-2.5">
                <label className="text-xs font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider block">
                  Reading Typeface Family
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {fonts.map((f) => {
                    const isActive = config.bodyFont === f.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => setBodyFont(f.id)}
                        className={`p-3 text-left border rounded-lg transition-all flex flex-col justify-between ${
                          isActive
                            ? 'border-stone-900 dark:border-stone-100 bg-stone-100 dark:bg-stone-800 ring-1 ring-stone-900 dark:ring-stone-100'
                            : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-stone-900 dark:text-stone-100 text-xs">
                              {f.label}
                            </span>
                            {isActive && <Check className="w-3.5 h-3.5 text-stone-900 dark:text-stone-100" />}
                          </div>
                          <span className="text-[11px] text-stone-500 dark:text-stone-400 block mt-1">
                            {f.desc}
                          </span>
                        </div>
                        <span className="text-lg mt-3 block opacity-80 font-serif">
                          {f.sample}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reading Scale & Measure Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {/* Font Size */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider block">
                    Type Scale
                  </label>
                  <div className="grid grid-cols-4 gap-1.5 p-1 bg-stone-100 dark:bg-stone-800 rounded-lg">
                    {fontSizes.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setFontSize(s.id)}
                        className={`py-1.5 text-center text-xs rounded transition-colors ${
                          config.fontSize === s.id
                            ? 'bg-white dark:bg-stone-700 font-semibold text-stone-950 dark:text-stone-50 shadow-xs'
                            : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                        }`}
                      >
                        {s.px}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Column Width / Reading Measure */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider block">
                    Reading Column Measure
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-100 dark:bg-stone-800 rounded-lg">
                    {columnWidths.map((w) => (
                      <button
                        key={w.id}
                        onClick={() => setColumnWidth(w.id)}
                        className={`py-1.5 text-center text-xs rounded transition-colors ${
                          config.columnWidth === w.id
                            ? 'bg-white dark:bg-stone-700 font-semibold text-stone-950 dark:text-stone-50 shadow-xs'
                            : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                        }`}
                      >
                        {w.label.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Line Height & Drop Cap Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider block">
                    Leading / Line Spacing
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-100 dark:bg-stone-800 rounded-lg">
                    {lineHeights.map((lh) => (
                      <button
                        key={lh.id}
                        onClick={() => setLineHeight(lh.id)}
                        className={`py-1.5 text-center text-xs rounded transition-colors ${
                          config.lineHeight === lh.id
                            ? 'bg-white dark:bg-stone-700 font-semibold text-stone-950 dark:text-stone-50 shadow-xs'
                            : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                        }`}
                      >
                        {lh.ratio}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider block">
                    Editorial Flourishes
                  </label>
                  <button
                    onClick={() => setDropCaps(!config.dropCaps)}
                    className={`w-full py-2 px-3 border rounded-lg text-left flex items-center justify-between transition-colors ${
                      config.dropCaps
                        ? 'border-stone-900 dark:border-stone-100 bg-stone-100 dark:bg-stone-800'
                        : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/40'
                    }`}
                  >
                    <span>Initial Drop-Cap Letter</span>
                    <span className="font-mono text-xs font-semibold">
                      {config.dropCaps ? 'Enabled' : 'Disabled'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Real-time Preview Area */}
              <div className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/70 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-sans font-semibold">
                  Live Typography Preview
                </span>
                <p
                  className={`${getFontFamilyClass()} ${getFontSizeClass()} ${getLineHeightClass()} text-stone-800 dark:text-stone-200 ${
                    config.dropCaps ? 'drop-cap' : ''
                  }`}
                >
                  Typography is the craft of endowing human language with a durable visual form. When measure, leading, and contrast align with the natural cadence of the eye, reading becomes as effortless as thought itself.
                </p>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  Ready-to-use CSS tokens for your own blog or static website
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded hover:opacity-90 transition-opacity"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied to clipboard' : 'Copy theme code'}</span>
                </button>
              </div>

              <div className="rounded-lg overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-950 text-stone-100 font-mono text-xs">
                <pre className="p-4 overflow-x-auto leading-relaxed max-h-96">
                  <code>{generateExportCode()}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/50 flex items-center justify-between">
          <button
            onClick={resetTheme}
            className="text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            Reset to defaults
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded hover:opacity-90 transition-opacity"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
