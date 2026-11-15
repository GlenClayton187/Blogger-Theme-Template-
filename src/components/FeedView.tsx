import React, { useState } from 'react';
import { ArrowRight, Check, Mail, Sparkles } from 'lucide-react';
import { Article } from '../types';
import { ArticleCard } from './ArticleCard';

interface FeedViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onOpenThemeStudio: () => void;
  onSelectTab: (tab: 'feed' | 'archive' | 'craft' | 'about' | 'playground') => void;
}

export const FeedView: React.FC<FeedViewProps> = ({
  articles,
  onSelectArticle,
  onOpenThemeStudio,
  onSelectTab,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categories = ['all', 'Essays', 'Engineering', 'Design', 'Philosophy'];

  const filteredArticles = articles.filter(
    (art) => selectedCategory === 'all' || art.category === selectedCategory
  );

  // Divide into 3 tiers of visual salience
  const leadArticle = filteredArticles[0] || articles[0];
  const secondaryArticles = filteredArticles.slice(1, 3);
  const streamArticles = filteredArticles.slice(3);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <div className="w-full py-8 space-y-16">
      {/* Editorial Masthead Banner */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="border-b border-stone-200 dark:border-stone-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-sans font-semibold text-stone-500 dark:text-stone-400">
              VOL. IV · ISSUE 28 · AUTUMN 2026
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-50" style={{ textWrap: 'balance' }}>
              Quiet Craft & Enduring Prose
            </h1>
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 font-serif italic max-w-2xl leading-relaxed">
              Essays on software as literature, digital minimalism, architectural typography, and resisting algorithmic agitation.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 font-sans text-xs">
            <button
              onClick={onOpenThemeStudio}
              className="flex items-center gap-1.5 px-3.5 py-2 border border-stone-300 dark:border-stone-700 rounded hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-stone-800 dark:text-stone-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-stone-600 dark:text-stone-300" />
              <span>Theme Studio</span>
            </button>
            <button
              onClick={() => onSelectTab('playground')}
              className="px-3.5 py-2 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 rounded font-medium hover:opacity-90 transition-opacity"
            >
              Test Your Own Writing
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Category Filter Bar */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4 font-sans text-xs overflow-x-auto">
          <div className="flex items-center gap-2">
            <span className="text-stone-400 uppercase tracking-wider text-[11px] mr-1 hidden sm:inline">
              Filter by topic:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 font-medium'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                {cat === 'all' ? 'All Publications' : cat}
              </button>
            ))}
          </div>

          <span className="text-stone-400 whitespace-nowrap text-xs hidden md:inline">
            Showing {filteredArticles.length} essays
          </span>
        </div>
      </section>

      {/* Tier 1: Lead Story */}
      {leadArticle && (
        <section className="max-w-6xl mx-auto px-6">
          <ArticleCard
            article={leadArticle}
            onSelect={onSelectArticle}
            variant="lead"
          />
        </section>
      )}

      {/* Tier 2: Secondary Features Grid */}
      {secondaryArticles.length > 0 && (
        <section className="max-w-6xl mx-auto px-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
              <span className="text-xs uppercase tracking-widest font-sans font-semibold text-stone-400 dark:text-stone-500">
                Featured Explorations
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {secondaryArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onSelect={onSelectArticle}
                  variant="secondary"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Curated Minimalist Newsletter Card */}
      <section className="max-w-6xl mx-auto px-6 my-16">
        <div className="p-8 sm:p-12 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/40 relative overflow-hidden transition-colors">
          <div className="max-w-xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-sans font-semibold text-stone-500 dark:text-stone-400 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" />
              The Sunday Dispatch
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-50">
              One solitary letter. Sent once a week.
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-sans leading-relaxed">
              No sponsored shoutouts, no automated digests, and zero tracking pixels. Just one unhurried essay on typography, software craft, and slow thinking delivered directly to your inbox every Sunday morning.
            </p>

            <form onSubmit={handleSubscribe} className="pt-2 flex flex-col sm:flex-row items-stretch gap-2.5 font-sans">
              <input
                type="email"
                placeholder="reader@domain.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1 text-xs px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Join the Dispatch
              </button>
            </form>

            {subscribed && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-sans flex items-center gap-1.5 pt-1">
                <Check className="w-3.5 h-3.5" />
                Thank you. You will receive next Sunday’s letter in your quiet morning inbox.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Tier 3: Chronological Stream */}
      {streamArticles.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
            <span className="text-xs uppercase tracking-widest font-sans font-semibold text-stone-400 dark:text-stone-500">
              Chronological Feed
            </span>
            <button
              onClick={() => onSelectTab('archive')}
              className="text-xs font-sans text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1"
            >
              View full archive ({articles.length}) <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="divide-y divide-stone-200 dark:divide-stone-800">
            {streamArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onSelect={onSelectArticle}
                variant="compact"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
