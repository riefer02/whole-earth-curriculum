// English UI strings. This is the single source of truth for all *site chrome*
// text (not curriculum content, which lives in `curriculum/`).
//
// i18n strategy: the site is designed so that adding another language is a
// matter of (1) writing a new locale file (e.g. `fr.ts`) mirroring this shape,
// (2) switching the export in `index.ts` based on the active locale, and
// (3) adding a locale to the router. Curriculum *content* translation is a
// separate content-layer concern (see docs/roadmap.md Phase 4); this file only
// covers the website's own words so no UI string is ever hardcoded in a
// template. Only strings actually rendered by templates live here.

export interface UI {
  site: {
    name: string;
    short: string;
    description: string;
  };
  nav: {
    home: string;
    curriculum: string;
    standards: string;
    docs: string;
    about: string;
    search: string;
    skipToContent: string;
    theme: string;
    themeToDark: string;
    themeToLight: string;
    menu: string;
  };
  home: {
    heroKicker: string;
    heroTitle: string;
    heroSubtitle: string;
    browseCurriculum: string;
    browseStandards: string;
    browseByGrade: string;
    pillarsTitle: string;
    pillarsIntro: string;
    valuesTitle: string;
    values: string[];
    howTitle: string;
    howSteps: string[];
  };
  common: {
    unit: string;
    lesson: string;
    lessons: string;
    objectives: string;
    materials: string;
    standardMaterials: string;
    lowTechMaterials: string;
    enrichedMaterials: string;
    contextVariants: string;
    durationMinutes: string;
    essentialQuestion: string;
    essentialQuestions: string;
    bigIdeas: string;
    strands: string;
    domainIndex: string;
    notYetAuthored: string;
    domainWeighting: string;
    schoolDays: string;
    assessmentPlan: string;
    timeline: string;
    verticalLadder: string;
    gradePrefix: string;
    previous: string;
    next: string;
    print: string;
    onThisPage: string;
  };
  footer: {
    tagline: string;
    license: string;
  };
  search: {
    title: string;
    intro: string;
    placeholder: string;
    shortPlaceholder: string;
    zeroResults: string;
    hint: string;
  };
  status: Record<string, string>;
  gradeLabel: (grade: number) => string;
  pillarTitles: Record<string, string>;
  pillarQuestions: Record<string, string>;
}

const en: UI = {
  site: {
    name: 'New World Order Education',
    short: 'NWO-EDU',
    description:
      'A comprehensive, humanitarian, egalitarian K\u201312 curriculum offered free to the world \u2014 raising the baseline standard of living for all life on Earth.',
  },

  nav: {
    home: 'Home',
    curriculum: 'Curriculum',
    standards: 'Standards',
    docs: 'Docs',
    about: 'About',
    search: 'Search',
    skipToContent: 'Skip to content',
    theme: 'Toggle color theme',
    themeToDark: 'Switch to dark mode',
    themeToLight: 'Switch to light mode',
    menu: 'Menu',
  },

  home: {
    heroKicker: 'Offered free to the world',
    heroTitle: 'Educate the whole human.',
    heroSubtitle:
      'A single, coherent, drop-in K\u201312 curriculum that develops people who are emotionally, physically, and intellectually aware \u2014 of themselves, their context, and the Earth they live in.',
    browseCurriculum: 'Browse the curriculum',
    browseStandards: 'Explore the standards',
    browseByGrade: 'Browse by grade',
    pillarsTitle: 'Four pillars, one whole person',
    pillarsIntro:
      'Every domain, strand, standard, unit, and lesson descends from four dimensions of a whole human \u2014 not from disconnected school subjects.',
    valuesTitle: 'What it stands for',
    values: [
      'Holistic \u2014 mind, body, emotion, and context develop together, in a spiral.',
      'Egalitarian \u2014 built to benefit the many, never the few.',
      'Global & anthropological \u2014 never one nation\u2019s default view.',
      'Ethical \u2014 ethics are a lens through which everything is taught.',
      'Honest about technology \u2014 its effects on humanity and the Earth, taught without worship or fear.',
      'Open \u2014 free, remixable, and licensed to stay that way.',
    ],
    howTitle: 'How it stays coherent',
    howSteps: [
      'Everything descends from one vision.',
      'A traceability chain links every lesson to a standard, strand, domain, and pillar.',
      'An automated validator and alignment agents keep the chain intact.',
      'Plain Markdown + YAML content renders to web, print, and more \u2014 from one source of truth.',
    ],
  },

  common: {
    unit: 'Unit',
    lesson: 'Lesson',
    lessons: 'Lessons',
    objectives: 'Objectives',
    materials: 'Materials',
    standardMaterials: 'Standard materials',
    lowTechMaterials: 'Low-tech / no-cost',
    enrichedMaterials: 'Enriched / lab & device',
    contextVariants: 'Works in different contexts',
    durationMinutes: 'minutes',
    essentialQuestion: 'Essential question',
    essentialQuestions: 'Essential questions',
    bigIdeas: 'Big ideas',
    strands: 'Strands',
    domainIndex: 'Domains',
    notYetAuthored: 'Not yet authored',
    domainWeighting: 'Domain weighting',
    schoolDays: 'school days',
    assessmentPlan: 'Assessment plan',
    timeline: 'Year timeline',
    verticalLadder: 'K\u201312 objective ladder',
    gradePrefix: 'Grade',
    previous: 'Previous',
    next: 'Next',
    print: 'Print',
    onThisPage: 'On this page',
  },

  footer: {
    tagline: 'Raising the baseline standard of living for all life on Earth.',
    license: 'Curriculum content is licensed CC BY-SA 4.0; tooling under MIT.',
  },

  search: {
    title: 'Search',
    intro:
      'Search the whole curriculum \u2014 lessons, units, standards, and reference documents.',
    placeholder: 'Search lessons, units, standards\u2026',
    shortPlaceholder: 'Search\u2026',
    zeroResults: 'Nothing matched that search.',
    hint: 'Search is built by Pagefind at build time \u2014 it works entirely in the browser with no third-party service.',
  },

  status: {
    draft: 'Draft',
    review: 'Review',
    approved: 'Approved',
  },

  gradeLabel: (grade: number) => (grade === 0 ? 'Kindergarten' : `Grade ${grade}`),

  pillarTitles: {
    P1: 'Emotional & Social Awareness',
    P2: 'Physical & Somatic Awareness',
    P3: 'Intellectual & Cognitive Awareness',
    P4: 'Contextual & Ecological Awareness',
  },

  pillarQuestions: {
    P1: 'Who am I, and how do I live well with others?',
    P2: 'How do I understand and care for my body?',
    P3: 'How do I think, reason, and know?',
    P4: 'What world do I live in, and what do I owe it?',
  },
};

export default en;
