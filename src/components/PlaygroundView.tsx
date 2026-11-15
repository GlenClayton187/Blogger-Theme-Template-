import React, { useState } from 'react';
import { PenTool, Eye, Layout, RotateCcw, Copy, Check, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const PRESETS = {
  essay: {
    title: 'The Solitude of the Craftsperson',
    subtitle: 'Why deep creative work demands long stretches of unbroken quietude.',
    category: 'Essays',
    readTime: '4 min read',
    content: `When we surrender our working hours to real-time notification streams, we sacrifice the cognitive depth required to produce enduring work.

The Roman architect Vitruvius noted that a structure requires three qualities: firmitas (strength), utilitas (utility), and venustas (beauty). Modern digital creation often obsesses over velocity while abandoning all three.

> "To sit quietly in a room and allow a single complex idea to develop over hours is becoming an act of counter-cultural resistance."

If we wish to build tools and literature that withstand the test of decades, we must rebuild the physical and mental sanctuaries where patience is cultivated.`,
  },
  technical: {
    title: 'Zero-Allocation State Machines in TypeScript',
    subtitle: 'Constructing predictable transition systems without runtime memory churn.',
    category: 'Engineering',
    readTime: '6 min read',
    content: `State management in high-throughput frontend applications frequently suffers from excessive object allocations during rapid user input cycles.

By structuring our transitions as deterministic lookup tables indexed by integer flags, we eliminate garbage collection pauses entirely:

\`\`\`typescript
type StateId = 0 | 1 | 2; // IDLE | STREAMING | PAUSED
type ActionId = 10 | 11;  // NEXT | HALT

const TRANSITIONS: Record<number, StateId> = {
  [0 | (10 << 2)]: 1, // IDLE + NEXT -> STREAMING
  [1 | (11 << 2)]: 2, // STREAMING + HALT -> PAUSED
};
\`\`\`

Notice that by packing state and action into a single 32-bit integer key, state transitions compile into a single lookup instruction with zero auxiliary allocations.`,
  },
};

export const PlaygroundView: React.FC = () => {
  const {
    config,
    getFontFamilyClass,
    getColumnWidthClass,
    getFontSizeClass,
    getLineHeightClass,
  } = useTheme();

  const [title, setTitle] = useState(PRESETS.essay.title);
  const [subtitle, setSubtitle] = useState(PRESETS.essay.subtitle);
  const [category, setCategory] = useState(PRESETS.essay.category);
  const [readTime, setReadTime] = useState(PRESETS.essay.readTime);
  const [content, setContent] = useState(PRESETS.essay.content);
  const [viewMode, setViewMode] = useState<'split' | 'preview'>('split');
  const [copied, setCopied] = useState(false);

  const loadPreset = (key: 'essay' | 'technical') => {
    const p = PRESETS[key];
    setTitle(p.title);
    setSubtitle(p.subtitle);
    setCategory(p.category);
    setReadTime(p.readTime);
    setContent(p.content);
  };

  const copyMarkdown = () => {
    const fullDoc = `# ${title}\n## ${subtitle}\n\n*${category} · ${readTime}*\n\n${content}`;
    navigator.clipboard.writeText(fullDoc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple parser to render markdown preview
  const renderFormattedPreview = () => {
    const blocks = content.split('\n\n');
    const words = (title + ' ' + subtitle + ' ' + content).trim().replace(/\s+/g, ' ').split(' ').filter(Boolean);
    const liveWordCount = words.length;
    const liveReadingTime = `${Math.max(1, Math.ceil(liveWordCount / 200))} min read`;

    return (
      <article
        className={`w-full mx-auto ${getColumnWidthClass()} ${getFontFamilyClass()} ${getFontSizeClass()} ${getLineHeightClass()} text-stone-800 dark:text-stone-200 transition-all`}
      >
        <header className="mb-10 space-y-4">
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-sans tracking-wide">
            <span className="uppercase tracking-widest font-semibold text-stone-900 dark:text-stone-100">
              {category}
            </span>
            <span>·</span>
            <span>Today</span>
            <span>·</span>
            <span className="font-medium text-stone-800 dark:text-stone-200">
              {liveReadingTime}
            </span>
            <span>·</span>
            <span>{liveWordCount.toLocaleString()} words</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-50 leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {title || 'Untitled Draft'}
          </h1>

          {subtitle && (
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 font-serif italic">
              {subtitle}
            </p>
          )}

          <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center gap-3 text-xs font-sans text-stone-500">
            <span>By You (Live Author)</span>
            <span>·</span>
            <span>Formatted in Kallos Theme</span>
          </div>
        </header>

        <div className="space-y-6">
          {blocks.map((block, idx) => {
            const isFirst = idx === 0;

            // Blockquote
            if (block.startsWith('>')) {
              const quoteText = block.replace(/^>\s*/, '').replace(/"/g, '');
              return (
                <div key={idx} className="my-8 py-5 border-t border-b border-stone-200 dark:border-stone-800">
                  <blockquote className="text-lg sm:text-xl font-serif italic text-stone-900 dark:text-stone-100 leading-relaxed">
                    “{quoteText}”
                  </blockquote>
                </div>
              );
            }

            // Code block
            if (block.startsWith('```')) {
              const lines = block.split('\n');
              const codeLines = lines.slice(1, lines.length - 1).join('\n');
              return (
                <div
                  key={idx}
                  className="my-6 rounded-lg overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-950 text-stone-100 font-mono text-xs p-4 leading-relaxed"
                >
                  <pre>
                    <code>{codeLines}</code>
                  </pre>
                </div>
              );
            }

            // Standard Paragraph
            return (
              <p
                key={idx}
                className={isFirst && config.dropCaps ? 'drop-cap' : ''}
              >
                {block}
              </p>
            );
          })}
        </div>
      </article>
    );
  };

  return (
    <div className="w-full py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Playground Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <PenTool className="w-5 h-5 text-stone-700 dark:text-stone-300" />
              Live Theme Writer & Tester
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-sans mt-1">
              Type or paste your own article markdown to test how your blog content looks inside this theme.
            </p>
          </div>

          <div className="flex items-center gap-2 font-sans text-xs">
            {/* Presets */}
            <span className="text-stone-400 hidden md:inline">Presets:</span>
            <button
              onClick={() => loadPreset('essay')}
              className="px-2.5 py-1 border border-stone-200 dark:border-stone-800 rounded hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              Essay
            </button>
            <button
              onClick={() => loadPreset('technical')}
              className="px-2.5 py-1 border border-stone-200 dark:border-stone-800 rounded hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              Technical Code
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-stone-200 dark:border-stone-800 rounded p-0.5 ml-2">
              <button
                onClick={() => setViewMode('split')}
                className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
                  viewMode === 'split'
                    ? 'bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 font-medium'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
                title="Side by side editor and preview"
              >
                <Layout className="w-3 h-3" />
                <span className="hidden sm:inline">Split</span>
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
                  viewMode === 'preview'
                    ? 'bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 font-medium'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
                title="Full reading presentation"
              >
                <Eye className="w-3 h-3" />
                <span className="hidden sm:inline">Preview</span>
              </button>
            </div>

            {/* Copy Markdown */}
            <button
              onClick={copyMarkdown}
              className="flex items-center gap-1 px-3 py-1 border border-stone-200 dark:border-stone-800 rounded hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Copy markdown text"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Playground Content Area */}
        {viewMode === 'split' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            {/* Editor Left Column */}
            <div className="lg:col-span-5 space-y-4 font-sans">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-stone-500">
                  Article Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-sm px-3 py-2 border border-stone-200 dark:border-stone-800 rounded bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-500 font-serif"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-stone-500">
                  Subtitle / Deck
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-200 dark:border-stone-800 rounded bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-500 font-serif italic"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-stone-500">
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-stone-200 dark:border-stone-800 rounded bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-stone-500">
                    Estimated Time
                  </label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-stone-200 dark:border-stone-800 rounded bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-stone-500">
                    Prose Content (Markdown supported)
                  </label>
                  <span className="text-[10px] text-stone-400">Quotes: &gt; | Code: ```</span>
                </div>
                <textarea
                  rows={14}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full text-xs p-3 font-mono leading-relaxed border border-stone-200 dark:border-stone-800 rounded bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-500"
                />
              </div>
            </div>

            {/* Live Formatted Theme Preview Right Column */}
            <div className="lg:col-span-7 bg-stone-100/50 dark:bg-stone-900/30 border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-10 overflow-y-auto max-h-[750px]">
              {renderFormattedPreview()}
            </div>
          </div>
        ) : (
          <div className="pt-12 max-w-3xl mx-auto">
            {renderFormattedPreview()}
          </div>
        )}
      </div>
    </div>
  );
};
