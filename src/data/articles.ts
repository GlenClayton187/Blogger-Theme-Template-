import { Article } from '../types';

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'the-architecture-of-quiet-interfaces',
    title: 'The Architecture of Quiet Interfaces',
    subtitle: 'On sensory budget, white space as structure, and resisting the friction of perpetual interruption.',
    excerpt: 'When digital surfaces scream for attention with high-contrast banners, notification dots, and nervous micro-interactions, stillness becomes the highest aesthetic achievement.',
    date: 'November 8, 2026',
    readTime: '7 min read',
    category: 'Essays',
    coverImage: '/src/assets/images/hero_editorial_minimal_1794254123000.jpg',
    coverCaption: 'Fig. 1 — Natural shadows on board-formed concrete and warm white oak. Photography by Julian Vance.',
    author: {
      name: 'Julian Vance',
      role: 'Principal Typographer & Essayist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
      bio: 'Writing on digital minimalism, architectural editorial design, and human-paced software.'
    },
    featuredTier: 'lead',
    tags: ['Architecture', 'Minimalism', 'Typography', 'Slow Tech'],
    content: [
      {
        id: 'sec-1',
        paragraphs: [
          'Every interface we build occupies a finite parcel of human consciousness. In physical architecture, we understand instinctively that a cathedral, a tearoom, or a shaded portico does not achieve grandeur by filling every cubic meter with brass fixtures or blinking signs. Grandeur and clarity emerge from volume: the intentional reservation of empty space through which light, breath, and thought can move freely.',
          'Yet in modern software development, an insidious anxiety dominates. We treat empty canvas as an unmonetized void—a liability to be colonized with secondary promotion chips, floating chat bubbles, predictive nudges, and urgent telemetry pills. We have built an internet that vibrates with the frantic energy of an airport duty-free concourse.',
          'A quiet interface, by contrast, trusts the reader. It asserts that the text itself is substantive enough to command attention without mechanical cajoling.'
        ],
        pullQuote: {
          text: 'Stillness is not the absence of energy; it is the containment of energy at rest, waiting for the reader to initiate the dialogue.',
          author: 'Dieter Rams, Ten Principles of Honest Design'
        }
      },
      {
        id: 'sec-2',
        heading: '01. The Sensory Budget of the Reader',
        paragraphs: [
          'Consider what happens when the human eye lands upon a page. Before reading a single syllable, the visual cortex computes the distribution of dark and light masses. If the page is fractured into twelve competing quadrants—sidebars, badges, floating sticky headers, and pulsating dots—the autonomic nervous system prepares for defensive scanning rather than contemplative immersion.',
          'To cultivate true readability, we must design within an explicit sensory budget. We allocate color with mathematical discipline: sixty percent neutral canvas, thirty percent structural hairline surfaces, and at most ten percent accent color concentrated strictly at points of intentional action.',
          'When we strip away unnecessary borders and allow margins of sixty to eighty characters per line, the eye relaxes into a rhythmic cadence reminiscent of turning the pages of an unhurried hardbound volume.'
        ],
        footnotes: [
          {
            id: 1,
            text: 'Tschichold, Jan. "The Form of the Book: Essays on the Morality of Good Design." Hartley & Marks, 1991, pp. 44–58.'
          }
        ]
      },
      {
        id: 'sec-3',
        heading: '02. Darkness as Tactile Material',
        paragraphs: [
          'Dark mode is too often treated as a crude mechanical inversion: replacing white backgrounds with harsh pure black and blasting pure white text into the reader\'s retinas. This causes intense halation—the optical bleeding of stark bright letters into a dark void.',
          'In a refined editorial theme, dark mode is treated as a distinct paper stock. We employ deep slate carbons (#121214) or velvet obsidian with softened ivory text (#ededed). Light text on dark surfaces requires optical compensation: a slightly wider letter-spacing (+0.01em) and gentle softening of contrast to preserve letterform definition without causing ocular fatigue.',
          'The result is not an aggressive hacker terminal, but a quiet evening room lit by a solitary library lamp.'
        ],
        codeBlock: {
          filename: 'typography.tokens.css',
          language: 'css',
          code: `/* Optical dark mode compensation */
:root {
  --canvas-bg: #fafaf9;
  --text-primary: #1c1917;
  --text-muted: #78716c;
  --letter-spacing: -0.011em;
}

[data-theme="dark"] {
  --canvas-bg: #121214;
  --text-primary: #f4f4f5;
  --text-muted: #a1a1aa;
  /* Slight optical tracking expansion for dark field */
  --letter-spacing: 0.005em;
}`
        }
      },
      {
        id: 'sec-4',
        heading: '03. Toward an Unhurried Web',
        paragraphs: [
          'If we wish to build a web that honors human dignity, our tools must mirror the slowness of good thinking. We do not need faster algorithmic feeds; we need deeper spaces for sustained reflection.',
          'A blog is not a SaaS funnel; it is an intimate letter sent across time and distance. When you open a quiet page, you should feel the ambient noise of the digital world drop away like footsteps entering an empty gallery.'
        ]
      }
    ]
  },
  {
    id: 'art-2',
    slug: 'on-type-rhythm-and-physicality-of-reading',
    title: 'On Type, Rhythm, and the Physicality of Reading',
    subtitle: 'Why the proportions of movable metal type still govern the ergonomics of digital legibility.',
    excerpt: 'The eye does not read in continuous sweeps; it leaps in rapid ballistic saccades across lines of text. Here is how measure, leading, and x-height harmonize those jumps.',
    date: 'November 4, 2026',
    readTime: '5 min read',
    category: 'Design',
    coverImage: '/src/assets/images/article_typography_craft_1794254124592.jpg',
    coverCaption: 'Fig. 2 — Hand-cast lead type blocks arranged for letterpress proofing on unbleached cotton rag.',
    author: {
      name: 'Elena Rostova',
      role: 'Editorial Director & Font Historian',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80',
      bio: 'Specialist in Renaissance book typography and contemporary screen legibility.'
    },
    featuredTier: 'secondary',
    tags: ['Typography', 'Editorial', 'History', 'Graphic Design'],
    content: [
      {
        id: 'sec-1',
        paragraphs: [
          'Five centuries before the first liquid crystal display was manufactured, the punchcutters of Venice solved the fundamental equation of human reading. Aldus Manutius and Francesco Griffo understood that reading is an athletic feat of the optical nerve.',
          'When we read, our eyes do not glide smoothly across a printed line. They perform saccades—lightning-fast micro-jumps lasting twenty to thirty milliseconds, separated by brief fixations where cognitive comprehension takes place.',
          'If a line of text is too long (greater than 85 characters), the eye struggles to find the start of the next line upon its return sweep. If the line is too short (fewer than 45 characters), the constant hyphenation and jerky return breaks the internal rhythm of comprehension.'
        ],
        pullQuote: {
          text: 'Typography exists to honor content. A well-set page is a transparent glass holding wine of exceptional clarity.',
          author: 'Beatrice Warde, The Crystal Goblet'
        }
      },
      {
        id: 'sec-2',
        heading: 'The Golden Measure: 65 to 75 Characters',
        paragraphs: [
          'In this theme, we lock the default reading column to an optimal 68ch (roughly 680 pixels at standard base font sizing). This guarantees that on modern wide monitors, the text does not stretch into an unreadable horizontal banner across a 32-inch screen.',
          'Combined with a relaxed line-height of 1.75 to 1.85, the white channels between text lines remain stable guides for the eye\'s return trajectory.'
        ],
        codeBlock: {
          filename: 'typography.config.ts',
          language: 'typescript',
          code: `export const editorialMeasure = {
  compact: 'max-w-[600px] text-[15px] leading-[1.65]',
  balanced: 'max-w-[680px] text-[17px] leading-[1.8]',
  roomy: 'max-w-[780px] text-[19px] leading-[1.85]',
};`
        }
      }
    ]
  },
  {
    id: 'art-3',
    slug: 'the-craft-of-software-as-literature',
    title: 'The Craft of Software as Literature',
    subtitle: 'Knuth’s literate programming reimagined for the modern full-stack artisan.',
    excerpt: 'Code is written for humans to read first, and only incidentally for computers to execute. Reclaiming prose as the primary medium of engineering.',
    date: 'October 28, 2026',
    readTime: '6 min read',
    category: 'Engineering',
    coverImage: '/src/assets/images/article_code_aesthetics_1794254125222.jpg',
    coverCaption: 'Fig. 3 — The quiet evening workstation: pen, notebook, warm tungsten illumination, and clean code.',
    author: {
      name: 'Marcus Chen',
      role: 'Staff Systems Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
      bio: 'Writing compilers, database internals, and ruminations on developer aesthetics.'
    },
    featuredTier: 'secondary',
    tags: ['Engineering', 'Literate Programming', 'Craft', 'Code'],
    content: [
      {
        id: 'sec-1',
        paragraphs: [
          'In 1984, Donald Knuth published his seminal essay proposing literate programming. His central thesis was disarmingly simple: let us change our traditional attitude to the construction of programs. Instead of imagining that our main task is to instruct a computer what to do, let us concentrate rather on explaining to human beings what we want a computer to do.',
          'Somewhere in the rush toward continuous integration pipelines and microsecond latency, we forgot that code is literature. It is an enduring record of human reasoning, written in an exact syntax yet colored by aesthetics and taste.'
        ],
        codeBlock: {
          filename: 'markdown-parser.ts',
          language: 'typescript',
          code: `/**
 * Parses markdown inline tokens into high-fidelity React AST nodes
 * with optical typographic replacements (smart quotes, em-dashes).
 */
export function renderTypographicProse(text: string): string {
  return text
    .replace(/---/g, '—') // Em-dash
    .replace(/--/g, '–')  // En-dash
    .replace(/"(\\w+)"/g, '“$1”'); // Smart quotes
}`
        }
      },
      {
        id: 'sec-2',
        heading: 'Syntax Highlighting Without Visual Chaos',
        paragraphs: [
          'Many technical blogs feature code snippets that look like an explosion in a neon candy store. When every keyword is bright pink, every string is lime green, and every number is electric cyan, the reader cannot decipher the semantic hierarchy.',
          'A quiet editorial code block uses restrained color: deep charcoal backgrounds, warm limestone keywords, muted earth-toned strings, and high-contrast identifiers. Code should look as dignified on the screen as mathematical notation in an Oxford University Press volume.'
        ]
      }
    ]
  },
  {
    id: 'art-4',
    slug: 'digital-gardening-thinking-in-public-notes',
    title: 'Digital Gardening: Thinking in Public Notes',
    subtitle: 'Moving beyond chronological stream feeds toward interconnected, slow-growing compendiums of ideas.',
    excerpt: 'The blog post as an ephemeral, disposable dispatch is a relic of the print newspaper. In a digital garden, essays are living organisms that are tended, pruned, and expanded over years.',
    date: 'October 19, 2026',
    readTime: '4 min read',
    category: 'Philosophy',
    coverImage: '/src/assets/images/article_digital_garden_1794254125220.jpg',
    coverCaption: 'Fig. 4 — Dry landscape garden (Karesansui) in Kyoto: stones, moss, and raked gravel as an emblem of enduring contemplation.',
    author: {
      name: 'Julian Vance',
      role: 'Principal Typographer & Essayist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
      bio: 'Writing on digital minimalism, architectural editorial design, and human-paced software.'
    },
    featuredTier: 'standard',
    tags: ['Digital Garden', 'Knowledge', 'Slow Web', 'Essays'],
    content: [
      {
        id: 'sec-1',
        paragraphs: [
          'In the early era of blogging, the reverse-chronological stream was adopted by analogy with the newspaper front page. The newest thought sat at the top; everything written yesterday was buried into obsolescence.',
          'A digital garden rejects this tyranny of the ephemeral. It treats essays not as finished declarations stamped with an expiration date, but as perennial plants in a shared courtyard. Some entries are seedlings—scraps of insight waiting for rain. Others are mature trees, revised and pruned over a decade of patient observation.'
        ]
      }
    ]
  },
  {
    id: 'art-5',
    slug: 'the-death-of-the-cookie-banner',
    title: 'The Death of the Cookie Banner & Other Clutter',
    subtitle: 'How radical simplicity in engineering enables total elimination of client-side tracking baggage.',
    excerpt: 'When you choose not to track, fingerprint, or surveil your audience, half your JavaScript bundle disappears into thin air.',
    date: 'September 30, 2026',
    readTime: '3 min read',
    category: 'Engineering',
    author: {
      name: 'Marcus Chen',
      role: 'Staff Systems Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
      bio: 'Writing compilers, database internals, and ruminations on developer aesthetics.'
    },
    featuredTier: 'standard',
    tags: ['Privacy', 'Web Performance', 'Minimalism'],
    content: [
      {
        id: 'sec-1',
        paragraphs: [
          'The average modern web publication loads over 4 megabytes of surveillance scripts before the user can read a single paragraph. Consent management banners slide in from the bottom; push notification modals drop down from the top; newsletter popups hijack the viewport after three seconds.',
          'Eliminating these vectors is not merely an ethical decision; it is the ultimate performance optimization. A blog composed of clean semantic HTML, lightweight CSS variables, and zero surveillance scripts renders in under fifty milliseconds on any device on earth.'
        ]
      }
    ]
  },
  {
    id: 'art-6',
    slug: 'on-silence-and-the-typography-of-solitude',
    title: 'On Silence and the Typography of Solitude',
    subtitle: 'What the monastery scriptoria can teach us about designing focused reading tools.',
    excerpt: 'The monastic scribe had one imperative: that the word should shine and the hand of the copyist should disappear. Modern web typography should aspire to the same self-effacing modesty.',
    date: 'September 12, 2026',
    readTime: '8 min read',
    category: 'Philosophy',
    author: {
      name: 'Elena Rostova',
      role: 'Editorial Director & Font Historian',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80',
      bio: 'Specialist in Renaissance book typography and contemporary screen legibility.'
    },
    featuredTier: 'standard',
    tags: ['Philosophy', 'Books', 'Solitude', 'Design'],
    content: [
      {
        id: 'sec-1',
        paragraphs: [
          'In the cloistered scriptoria of the ninth century, scribes worked under strict rules of silence. It was believed that speech distracted the mind from the divine proportions of the text. The beauty of the Carolingian minuscule was born in this hush—clean, rounded letterforms designed for clarity across generations.',
          'Today, we read surrounded by digital clamor. If an application can create an oasis of five uninterrupted minutes of focused reading, it has performed an act of cultural restoration.'
        ]
      }
    ]
  }
];

export const INITIAL_COMMENTS = [
  {
    id: 'c-1',
    author: 'Siddharth Nair',
    date: 'November 8, 2026 at 14:22',
    text: 'The point regarding the sensory budget is so timely. I replaced my heavy layout with a 68ch column and readers immediately commented on how relaxed their reading sessions felt.',
    likes: 14
  },
  {
    id: 'c-2',
    author: 'Clara Bergson',
    date: 'November 8, 2026 at 18:05',
    text: 'The warm sepia tone option here is genuinely gorgeous—it reminds me of old Penguin paperback editions from the 1960s.',
    likes: 9
  }
];
