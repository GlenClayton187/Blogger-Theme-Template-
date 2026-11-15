import { Article } from '../types';

export interface ReadingMetrics {
  wordCount: number;
  readingTimeMinutes: number;
  readingTimeText: string;
}

/**
 * Calculates accurate word count and estimated reading time
 * for an article based on standard 200-220 words per minute editorial pace.
 */
export function calculateReadingMetrics(article: Article, wordsPerMinute: number = 200): ReadingMetrics {
  let textToCount = '';

  // Include title & subtitle
  if (article.title) textToCount += ' ' + article.title;
  if (article.subtitle) textToCount += ' ' + article.subtitle;

  // Process all content sections
  if (article.content && Array.isArray(article.content)) {
    article.content.forEach((section) => {
      if (section.heading) {
        textToCount += ' ' + section.heading;
      }
      if (section.paragraphs && Array.isArray(section.paragraphs)) {
        section.paragraphs.forEach((p) => {
          textToCount += ' ' + p;
        });
      }
      if (section.pullQuote?.text) {
        textToCount += ' ' + section.pullQuote.text;
      }
      if (section.codeBlock?.code) {
        // Count code tokens/words
        textToCount += ' ' + section.codeBlock.code;
      }
      if (section.footnotes && Array.isArray(section.footnotes)) {
        section.footnotes.forEach((fn) => {
          textToCount += ' ' + fn.text;
        });
      }
    });
  }

  // Sanitize text and split by whitespace
  const cleanText = textToCount.trim().replace(/\s+/g, ' ');
  const words = cleanText ? cleanText.split(' ') : [];
  const wordCount = words.length;

  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  const readingTimeText = `${readingTimeMinutes} min read`;

  return {
    wordCount,
    readingTimeMinutes,
    readingTimeText,
  };
}
