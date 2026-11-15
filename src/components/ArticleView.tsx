import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Copy,
  Check,
  Play,
  Pause,
  Volume2,
  Sliders,
  Heart,
  MessageSquare,
  Eye,
  Maximize2,
  Minimize2,
  Twitter,
  Linkedin,
  Mail,
} from 'lucide-react';
import { Article, Comment } from '../types';
import { useTheme } from '../context/ThemeContext';
import { INITIAL_COMMENTS } from '../data/articles';
import { calculateReadingMetrics } from '../utils/readingTime';
import { ShareModal } from './ShareModal';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  allArticles: Article[];
  onOpenThemeStudio: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onBack,
  onSelectArticle,
  allArticles,
  onOpenThemeStudio,
}) => {
  const {
    config,
    setColorMode,
    setBodyFont,
    setFontSize,
    isBookmarked,
    toggleBookmark,
    getFontFamilyClass,
    getColumnWidthClass,
    getFontSizeClass,
    getLineHeightClass,
  } = useTheme();

  // Dynamically calculate reading time based on full word count of article
  const readingMetrics = calculateReadingMetrics(article);

  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(14); // seconds
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [claps, setClaps] = useState(42);
  const [hasClapped, setHasClapped] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const [focusModeLocal, setFocusModeLocal] = useState(false);

  // Comments state
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  const bookmarked = isBookmarked(article.id);

  // Audio simulation timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setAudioProgress((prev) => (prev >= 420 ? 0 : prev + 1 * playbackSpeed));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio, playbackSpeed]);

  // Scrollspy for table of contents
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    article.content.forEach((section) => {
      if (section.heading) {
        const el = document.getElementById(section.id);
        if (el) observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [article]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleClap = () => {
    setClaps((prev) => prev + 1);
    setHasClapped(true);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: commentName.trim() || 'Fellow Reader',
      date: 'Just now',
      text: commentText.trim(),
      likes: 1,
    };
    setComments([newComment, ...comments]);
    setCommentText('');
    setCommentName('');
  };

  const formatAudioTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Find next/previous article
  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  // Extract headings for Table of Contents
  const headings = article.content.filter((sec) => sec.heading);

  return (
    <div
      className={`w-full transition-all duration-300 ${
        focusModeLocal
          ? 'py-8 bg-stone-50/95 dark:bg-black text-stone-900 dark:text-stone-100'
          : 'py-10'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Navigation Row */}
        <div className="flex items-center justify-between pb-10 border-b border-stone-200 dark:border-stone-800">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-sans font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>All essays</span>
          </button>

          {/* Quick Reader Controls */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs font-sans text-stone-600 dark:text-stone-400">
            {/* Font family switch */}
            <div className="hidden sm:flex items-center border border-stone-200 dark:border-stone-800 rounded p-0.5">
              <button
                onClick={() => setBodyFont('serif')}
                className={`px-2 py-0.5 text-xs font-serif transition-colors rounded ${
                  config.bodyFont === 'serif'
                    ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100'
                    : 'hover:text-stone-900 dark:hover:text-stone-100'
                }`}
                title="Serif font (Newsreader)"
              >
                Serif
              </button>
              <button
                onClick={() => setBodyFont('sans')}
                className={`px-2 py-0.5 text-xs font-sans transition-colors rounded ${
                  config.bodyFont === 'sans'
                    ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100'
                    : 'hover:text-stone-900 dark:hover:text-stone-100'
                }`}
                title="Sans-serif font (Plus Jakarta Sans)"
              >
                Sans
              </button>
              <button
                onClick={() => setBodyFont('mono')}
                className={`px-2 py-0.5 text-xs font-mono transition-colors rounded ${
                  config.bodyFont === 'mono'
                    ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100'
                    : 'hover:text-stone-900 dark:hover:text-stone-100'
                }`}
                title="Monospace font (JetBrains Mono)"
              >
                Mono
              </button>
            </div>

            {/* Font size stepper */}
            <div className="hidden md:flex items-center border border-stone-200 dark:border-stone-800 rounded p-0.5">
              <button
                onClick={() => setFontSize(config.fontSize === 'xl' ? 'lg' : config.fontSize === 'lg' ? 'base' : 'sm')}
                className="px-2 py-0.5 hover:text-stone-950 dark:hover:text-white"
                title="Smaller text"
              >
                A-
              </button>
              <span className="px-1 text-[11px] font-mono">{config.fontSize.toUpperCase()}</span>
              <button
                onClick={() => setFontSize(config.fontSize === 'sm' ? 'base' : config.fontSize === 'base' ? 'lg' : 'xl')}
                className="px-2 py-0.5 hover:text-stone-950 dark:hover:text-white"
                title="Larger text"
              >
                A+
              </button>
            </div>

            {/* Focus Mode button */}
            <button
              onClick={() => setFocusModeLocal(!focusModeLocal)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded border border-stone-200 dark:border-stone-800 transition-colors ${
                focusModeLocal
                  ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900'
                  : 'hover:bg-stone-100 dark:hover:bg-stone-900'
              }`}
              title="Toggle Distraction-free Focus Reading Mode"
            >
              {focusModeLocal ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{focusModeLocal ? 'Exit Focus' : 'Focus'}</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => toggleBookmark(article.id)}
              className="p-1.5 hover:text-stone-950 dark:hover:text-white border border-stone-200 dark:border-stone-800 rounded transition-colors"
              title={bookmarked ? 'Saved to list' : 'Bookmark this essay'}
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${
                  bookmarked ? 'fill-stone-900 dark:fill-stone-100 text-stone-900 dark:text-stone-100' : ''
                }`}
              />
            </button>

            {/* Share Modal Trigger */}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs hover:text-stone-950 dark:hover:text-white border border-stone-200 dark:border-stone-800 rounded hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
              title="Share this essay"
              aria-label="Share this essay"
            >
              <Share2 className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
              <span>Share</span>
            </button>

            {/* Theme Studio Drawer button */}
            <button
              onClick={onOpenThemeStudio}
              className="p-1.5 hover:text-stone-950 dark:hover:text-white border border-stone-200 dark:border-stone-800 rounded transition-colors"
              title="Open full Theme & Readability Studio"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Article Header */}
        <header className="pt-12 pb-10 max-w-3xl mx-auto space-y-6">
          {/* Zero-pill unboxed metadata with dynamic reading time and exact word count */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-sans tracking-wide">
            <span className="uppercase tracking-widest font-semibold text-stone-900 dark:text-stone-200">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>Published {article.date}</span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-stone-800 dark:text-stone-200">
              {readingMetrics.readingTimeText}
            </span>
            <span aria-hidden="true">·</span>
            <span>{readingMetrics.wordCount.toLocaleString()} words</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold tracking-tight text-stone-900 dark:text-stone-50 leading-[1.12]"
            style={{ textWrap: 'balance' }}
          >
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-300 font-serif italic leading-relaxed">
            {article.subtitle}
          </p>

          {/* Author Byline & Calculated Reading Depth */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-b border-stone-200 dark:border-stone-800 py-4">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover ring-1 ring-stone-200 dark:ring-stone-800"
              />
              <div>
                <p className="text-sm font-sans font-medium text-stone-900 dark:text-stone-100">
                  {article.author.name}
                </p>
                <p className="text-xs font-sans text-stone-500 dark:text-stone-400">
                  {article.author.role}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 font-sans text-xs">
              <div className="text-left sm:text-right text-stone-500 dark:text-stone-400">
                <p className="font-medium text-stone-800 dark:text-stone-200">
                  {readingMetrics.readingTimeText} · {readingMetrics.wordCount.toLocaleString()} words
                </p>
                <p className="text-[11px] text-stone-400">Paced at 200 words / min</p>
              </div>

              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-50 transition-colors"
                title="Share this essay"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="font-medium">Share</span>
              </button>
            </div>
          </div>

          {/* Audio Companion Player */}
          <div className="bg-stone-100 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-lg p-3 sm:p-4 transition-colors">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-9 h-9 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 flex items-center justify-center hover:opacity-90 transition-opacity"
                  title={isPlayingAudio ? 'Pause narration' : 'Listen to audio essay'}
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
                <div>
                  <span className="text-xs font-sans font-medium text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5" />
                    Audio Narration
                  </span>
                  <span className="text-[11px] font-sans text-stone-500 dark:text-stone-400">
                    Voiced by author · {formatAudioTime(audioProgress)} / 7:00
                  </span>
                </div>
              </div>

              {/* Playback speed toggle */}
              <div className="flex items-center gap-1">
                {[1.0, 1.25, 1.5].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackSpeed(speed)}
                    className={`px-2 py-0.5 text-[11px] font-mono rounded transition-colors ${
                      playbackSpeed === speed
                        ? 'bg-stone-300 dark:bg-stone-700 font-semibold text-stone-950 dark:text-white'
                        : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

            {/* Audio scrub bar */}
            <div className="mt-3 w-full bg-stone-200 dark:bg-stone-800 h-1 rounded-full overflow-hidden">
              <div
                className="bg-stone-900 dark:bg-stone-100 h-full transition-all duration-300"
                style={{ width: `${(audioProgress / 420) * 100}%` }}
              />
            </div>
          </div>
        </header>

        {/* Lead Cover Image */}
        {article.coverImage && (
          <figure className="max-w-4xl mx-auto mb-14">
            <div className="overflow-hidden rounded-lg bg-stone-100 dark:bg-stone-900 aspect-16/9">
              <img
                src={article.coverImage}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            {article.coverCaption && (
              <figcaption className="text-xs font-sans text-stone-500 dark:text-stone-400 mt-2.5 text-center italic">
                {article.coverCaption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Article Layout Grid: Table of Contents (Desktop sidebar) + Editorial Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Asymmetric Reading Table of Contents Rail (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3">
            {headings.length > 0 && (
              <div className="sticky top-24 space-y-4 pt-2">
                <span className="text-xs uppercase tracking-widest font-sans font-semibold text-stone-400 dark:text-stone-500">
                  Contents
                </span>
                <nav className="space-y-2 text-xs font-sans">
                  {headings.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className={`block py-1 transition-colors leading-normal ${
                        activeHeadingId === sec.id
                          ? 'text-stone-950 dark:text-stone-100 font-semibold pl-2 border-l-2 border-stone-900 dark:border-stone-100'
                          : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                      }`}
                    >
                      {sec.heading}
                    </a>
                  ))}
                </nav>

                <div className="pt-6 border-t border-stone-200 dark:border-stone-800 space-y-2 text-xs text-stone-500 dark:text-stone-400 font-sans">
                  <p>Tags:</p>
                  <div className="flex flex-wrap gap-1.5 text-stone-700 dark:text-stone-300">
                    {article.tags.map((tag) => (
                      <span key={tag} className="text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </aside>

          {/* Main Reading Column */}
          <main
            className={`lg:col-span-8 mx-auto w-full ${getColumnWidthClass()} ${getFontFamilyClass()} ${getFontSizeClass()} ${getLineHeightClass()} text-stone-800 dark:text-stone-200 transition-all`}
          >
            {article.content.map((sec, secIndex) => (
              <section key={sec.id} id={sec.id} className="mb-12 scroll-mt-24 space-y-6">
                {sec.heading && (
                  <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-900 dark:text-stone-50 pt-4 tracking-tight">
                    {sec.heading}
                  </h2>
                )}

                {sec.paragraphs.map((p, pIndex) => {
                  const isFirstEverParagraph = secIndex === 0 && pIndex === 0;
                  return (
                    <p
                      key={pIndex}
                      className={
                        isFirstEverParagraph && config.dropCaps
                          ? 'drop-cap'
                          : ''
                      }
                    >
                      {p}
                    </p>
                  );
                })}

                {/* Pull Quote */}
                {sec.pullQuote && (
                  <div className="my-10 py-6 border-t border-b border-stone-200 dark:border-stone-800 space-y-3">
                    <blockquote className="text-xl sm:text-2xl font-serif italic text-stone-900 dark:text-stone-100 leading-snug">
                      “{sec.pullQuote.text}”
                    </blockquote>
                    {sec.pullQuote.author && (
                      <cite className="block text-xs font-sans uppercase tracking-widest text-stone-500 dark:text-stone-400 not-italic">
                        — {sec.pullQuote.author}
                      </cite>
                    )}
                  </div>
                )}

                {/* Code Block */}
                {sec.codeBlock && (
                  <div className="my-8 rounded-lg overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-900 text-stone-100 dark:bg-stone-950 font-mono text-xs">
                    <div className="flex items-center justify-between px-4 py-2 bg-stone-950/80 dark:bg-stone-900/80 border-b border-stone-800 text-stone-400">
                      <span className="text-[11px] font-sans">
                        {sec.codeBlock.filename || sec.codeBlock.language}
                      </span>
                      <button
                        onClick={() => handleCopyCode(sec.codeBlock!.code, sec.id)}
                        className="flex items-center gap-1 text-[11px] hover:text-white transition-colors"
                      >
                        {copiedCodeId === sec.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 overflow-x-auto leading-relaxed">
                      <code>{sec.codeBlock.code}</code>
                    </pre>
                  </div>
                )}

                {/* Footnotes */}
                {sec.footnotes && sec.footnotes.length > 0 && (
                  <div className="pt-4 border-t border-stone-200 dark:border-stone-800 text-xs font-sans text-stone-500 dark:text-stone-400 space-y-1">
                    {sec.footnotes.map((fn) => (
                      <p key={fn.id} id={`fn-${fn.id}`}>
                        <sup className="font-semibold text-stone-700 dark:text-stone-300 mr-1">
                          [{fn.id}]
                        </sup>
                        {fn.text}
                      </p>
                    ))}
                  </div>
                )}
              </section>
            ))}

            {/* Reactions & Engagement Row */}
            <div className="pt-10 pb-8 border-t border-b border-stone-200 dark:border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-6 font-sans text-xs">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleClap}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all ${
                    hasClapped
                      ? 'border-stone-900 dark:border-stone-100 bg-stone-100 dark:bg-stone-800 text-stone-950 dark:text-stone-50 font-medium scale-105'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-400 text-stone-600 dark:text-stone-300'
                  }`}
                  title="Applaud essay"
                >
                  <Heart className={`w-3.5 h-3.5 ${hasClapped ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{claps} Applause</span>
                </button>

                <button
                  onClick={() => toggleBookmark(article.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-colors ${
                    bookmarked
                      ? 'border-stone-900 dark:border-stone-100 bg-stone-100 dark:bg-stone-800 text-stone-950 dark:text-stone-50'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-400 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                  <span>{bookmarked ? 'Saved to list' : 'Save for later'}</span>
                </button>

                {/* Primary Share Action */}
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 hover:border-stone-400 text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 transition-colors"
                  title="Open share options"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share essay</span>
                </button>
              </div>

              {/* Inline Quick Share Icon Buttons */}
              <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 mr-1 hidden sm:inline">
                  Share:
                </span>
                <button
                  onClick={handleShare}
                  className="p-2 rounded border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-900 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                  title="Copy direct link"
                  aria-label="Copy direct link"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `“${article.title}” by ${article.author.name}`
                    )}&url=${encodeURIComponent(window.location.href)}`;
                    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
                  }}
                  className="p-2 rounded border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-900 hover:text-sky-500 transition-colors"
                  title="Share on X"
                  aria-label="Share on X"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      window.location.href
                    )}`;
                    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
                  }}
                  className="p-2 rounded border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-900 hover:text-blue-600 transition-colors"
                  title="Share on LinkedIn"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    window.location.href = `mailto:?subject=${encodeURIComponent(
                      article.title
                    )}&body=${encodeURIComponent(
                      `I thought you would appreciate this essay on Kallos:\n\n"${article.title}"\n${article.subtitle}\n\nRead here: ${window.location.href}`
                    )}`;
                  }}
                  className="p-2 rounded border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-900 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                  title="Share via Email"
                  aria-label="Share via Email"
                >
                  <Mail className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Author Biographical Card */}
            <div className="my-12 p-6 rounded-lg bg-stone-100/70 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center gap-5 font-sans">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-stone-300 dark:ring-stone-700 shrink-0"
              />
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 font-medium">
                  About the author
                </span>
                <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
                  {article.author.name}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {article.author.bio}
                </p>
              </div>
            </div>

            {/* Next / Previous Article Navigation */}
            <div className="my-12 grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
              {prevArticle && (
                <button
                  onClick={() => onSelectArticle(prevArticle)}
                  className="p-4 text-left border border-stone-200 dark:border-stone-800 rounded hover:bg-stone-100/50 dark:hover:bg-stone-900/50 transition-colors group space-y-1"
                >
                  <span className="text-stone-400 dark:text-stone-500 flex items-center gap-1">
                    ← Previous essay
                  </span>
                  <p className="text-sm font-serif font-medium text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 line-clamp-1">
                    {prevArticle.title}
                  </p>
                </button>
              )}

              {nextArticle && (
                <button
                  onClick={() => onSelectArticle(nextArticle)}
                  className="p-4 text-left sm:text-right border border-stone-200 dark:border-stone-800 rounded hover:bg-stone-100/50 dark:hover:bg-stone-900/50 transition-colors group space-y-1"
                >
                  <span className="text-stone-400 dark:text-stone-500 flex items-center sm:justify-end gap-1">
                    Next essay →
                  </span>
                  <p className="text-sm font-serif font-medium text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 line-clamp-1">
                    {nextArticle.title}
                  </p>
                </button>
              )}
            </div>

            {/* Comments & Discussion */}
            <section className="mt-16 pt-10 border-t border-stone-200 dark:border-stone-800 space-y-8 font-sans">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-serif font-semibold text-stone-900 dark:text-stone-100">
                  Reader Correspondence ({comments.length})
                </h3>
                <span className="text-xs text-stone-400">Civil and moderated thoughts</span>
              </div>

              {/* Comment submission form */}
              <form onSubmit={handleAddComment} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name or monogram"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-200 dark:border-stone-800 rounded bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-500"
                />
                <textarea
                  rows={3}
                  placeholder="Share a thoughtful observation on this essay..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-200 dark:border-stone-800 rounded bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-500"
                  required
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded hover:opacity-90 transition-opacity"
                  >
                    Post response
                  </button>
                </div>
              </form>

              {/* Comments list */}
              <div className="space-y-4 pt-2">
                {comments.map((comm) => (
                  <div
                    key={comm.id}
                    className="p-4 rounded border border-stone-200/80 dark:border-stone-800 bg-stone-100/40 dark:bg-stone-900/30 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                      <span className="font-semibold text-stone-900 dark:text-stone-100">
                        {comm.author}
                      </span>
                      <span>{comm.date}</span>
                    </div>
                    <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-serif">
                      {comm.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        article={article}
        readingTimeText={readingMetrics.readingTimeText}
      />
    </div>
  );
};
