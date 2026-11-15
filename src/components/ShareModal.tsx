import React, { useState } from 'react';
import { X, Copy, Check, Twitter, Linkedin, Mail, Share2, Quote, ExternalLink } from 'lucide-react';
import { Article } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article;
  readingTimeText: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  article,
  readingTimeText,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `“${article.title}” by ${article.author.name} (${readingTimeText})`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCitation = () => {
    const citation = `${article.author.name}. "${article.title}." Kallos Journal, ${article.date}, ${currentUrl}.`;
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.subtitle || article.excerpt,
          url: currentUrl,
        });
        onClose();
      } catch {
        // User dismissed or aborted share
      }
    }
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(currentUrl)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
  };

  const shareViaEmail = () => {
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(
      article.title
    )}&body=${encodeURIComponent(
      `I thought you would appreciate this essay on Kallos:\n\n"${article.title}"\n${article.subtitle}\n\nRead here: ${currentUrl}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xl overflow-hidden flex flex-col font-sans">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-stone-700 dark:text-stone-300" />
            <h2 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">
              Share This Essay
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Article Preview Card */}
          <div className="p-3.5 rounded-lg bg-stone-50 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800/80 space-y-1">
            <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block">
              {article.category} · {readingTimeText}
            </span>
            <h3 className="text-sm font-serif font-semibold text-stone-900 dark:text-stone-100 leading-snug">
              {article.title}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              By {article.author.name}
            </p>
          </div>

          {/* Quick Copy Link Bar */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 dark:text-stone-400 block">
              Direct Article Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 text-xs px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-950 font-mono text-stone-700 dark:text-stone-300 focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-lg hover:opacity-90 transition-opacity shrink-0"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Share Channels */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 dark:text-stone-400 block">
              Share to Readers & Networks
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  onClick={handleNativeShare}
                  className="col-span-2 p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center gap-2 font-medium text-stone-900 dark:text-stone-100 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Native Device Share Sheet</span>
                </button>
              )}

              <button
                onClick={shareToTwitter}
                className="p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-2 text-stone-800 dark:text-stone-200 transition-colors"
              >
                <Twitter className="w-3.5 h-3.5 text-sky-500" />
                <span>Share on X</span>
              </button>

              <button
                onClick={shareToLinkedIn}
                className="p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-2 text-stone-800 dark:text-stone-200 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                <span>LinkedIn</span>
              </button>

              <button
                onClick={shareViaEmail}
                className="p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-2 text-stone-800 dark:text-stone-200 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-stone-500" />
                <span>Send via Email</span>
              </button>

              <button
                onClick={handleCopyCitation}
                className="p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-2 text-stone-800 dark:text-stone-200 transition-colors"
                title="Copy academic / MLA citation"
              >
                {copiedCitation ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Quote className="w-3.5 h-3.5 text-amber-600" />
                )}
                <span>{copiedCitation ? 'Citation Copied' : 'Copy Citation'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/50 flex items-center justify-between text-xs text-stone-400">
          <span>Zero tracking scripts appended to links</span>
          <button
            onClick={onClose}
            className="text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
