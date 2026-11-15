import React from 'react';
import { Feather, Shield, Zap, Sparkles, BookOpen, Layers } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="w-full py-12">
      <div className="max-w-3xl mx-auto px-6 space-y-12">
        {/* Header */}
        <header className="space-y-4 pb-8 border-b border-stone-200 dark:border-stone-800">
          <span className="text-xs uppercase tracking-widest font-sans font-semibold text-stone-400 dark:text-stone-500">
            Colophon & Manifesto
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 dark:text-stone-50 tracking-tight">
            The Kallos Design Constitution
          </h1>
          <p className="text-lg text-stone-600 dark:text-stone-300 font-serif italic leading-relaxed">
            A defense of quiet spaces, typographic proportion, and the unhurried craft of digital reading.
          </p>
        </header>

        {/* Manifesto Content */}
        <div className="space-y-8 font-sans text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-semibold text-stone-900 dark:text-stone-100">
              01. The Principle of Non-Distraction
            </h2>
            <p>
              Most modern publishing software is engineered to siphon user attention toward advertising impressions and newsletter sign-ups. The reader is subjected to sticky countdown bars, full-screen takeover modals, and animated notification bells that mimic dopamine loops.
            </p>
            <p>
              Kallos rejects this paradigm entirely. An article is treated with the same curatorial reverence as a page from an art monograph. Whitespace is celebrated not as an empty void to be filled, but as the quiet atmosphere that allows the reader’s internal dialogue to take flight.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-semibold text-stone-900 dark:text-stone-100">
              02. Ergonomics of the 68-Character Column
            </h2>
            <p>
              When a column of text exceeds 85 characters, eye tracking becomes physically strenuous: after reaching the end of a line, the reader’s eye frequently stumbles onto the wrong line during the return sweep. Conversely, lines narrower than 45 characters cause constant, jagged hyphenation.
            </p>
            <p>
              Kallos locks the body prose to an optimal 65–75 character measure (~680px) paired with a relaxed 1.8 leading. The result is an effortless, rhythmic reading velocity that prevents eye strain across long-form essays.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-semibold text-stone-900 dark:text-stone-100">
              03. Four Curated Contrast Modes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/40">
                <span className="font-semibold text-stone-900 dark:text-stone-100 block text-xs">
                  Alabaster Light (#fafaf9)
                </span>
                <span className="text-xs text-stone-500 mt-1 block">
                  Crisp neutral limestone with deep charcoal ink for bright daylight reading.
                </span>
              </div>

              <div className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/40">
                <span className="font-semibold text-stone-900 dark:text-stone-100 block text-xs">
                  Archival Sepia (#f7f3e8)
                </span>
                <span className="text-xs text-stone-500 mt-1 block">
                  Simulates unbleached cotton book rag and warm bistre ink, evocative of vintage hardcovers.
                </span>
              </div>

              <div className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/40">
                <span className="font-semibold text-stone-900 dark:text-stone-100 block text-xs">
                  Velvet Charcoal (#121214)
                </span>
                <span className="text-xs text-stone-500 mt-1 block">
                  Softened obsidian background with ivory text to prevent retinal halation and optical fatigue.
                </span>
              </div>

              <div className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/40">
                <span className="font-semibold text-stone-900 dark:text-stone-100 block text-xs">
                  Pure OLED (#000000)
                </span>
                <span className="text-xs text-stone-500 mt-1 block">
                  True black for modern organic light-emitting diode displays with maximum power efficiency.
                </span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-semibold text-stone-900 dark:text-stone-100">
              04. Typographic Pedigree
            </h2>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-stone-900 dark:text-stone-100 w-28 shrink-0">Newsreader:</span>
                <span className="text-stone-600 dark:text-stone-400">
                  Designed by Production Type. An optical-size serif tailored specifically for continuous prose on modern screens.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-stone-900 dark:text-stone-100 w-28 shrink-0">Plus Jakarta Sans:</span>
                <span className="text-stone-600 dark:text-stone-400">
                  Designed by Tokotype. A geometric neo-grotesque with clean apertures and effortless scannability.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-stone-900 dark:text-stone-100 w-28 shrink-0">JetBrains Mono:</span>
                <span className="text-stone-600 dark:text-stone-400">
                  A monospaced typeface crafted for code comprehension with distinct symbol disambiguation.
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
