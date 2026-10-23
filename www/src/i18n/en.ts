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
    support: string;
    forTeachers: string;
    forLeaders: string;
    search: string;
    skipToContent: string;
    theme: string;
    themeToDark: string;
    themeToLight: string;
    menu: string;
    showIds: string;
    hideIds: string;
    sources: string;
  };
  home: {
    heroKicker: string;
    heroTitle: string;
    heroSubtitle: string;
    browseCurriculum: string;
    browseStandards: string;
    supportProject: string;
    browseByGrade: string;
    jumpToGrade: string;
    pageTitle: string;
    pillarsTitle: string;
    pillarsIntro: string;
    valuesTitle: string;
    values: string[];
    howTitle: string;
    howSteps: string[];
    audienceTitle: string;
    audienceIntro: string;
    audiences: Array<{ title: string; body: string; href: string; cta: string }>;
  };
  pages: {
    whatIs: {
      title: string;
      description: string;
      kicker: string;
      heroTitle: string;
      heroSubtitle: string;
      beliefsTitle: string;
      beliefsIntro: string;
      beliefs: Array<{ title: string; body: string }>;
      pillarsTitle: string;
      pillarsIntro: string;
      pillars: Array<{ title: string; question: string }>;
      seeTitle: string;
      seeIntro: string;
      seeCta: string;
      creatorTitle: string;
      creatorBody: string;
      developmentBody: string;
      reviewBody: string;
      repositoryCta: string;
      governanceTitle: string;
      governance: Array<{ title: string; body: string }>;
      participateTitle: string;
      participateBody: string;
      participateCta: string;
    };
    forTeachers: {
      title: string;
      description: string;
      kicker: string;
      heroTitle: string;
      heroSubtitle: string;
      whereTitle: string;
      whereIntro: string;
      gradeLabel: string;
      update: string;
      todayIs: string;
      thisWeek: string;
      comingSoon: string;
      firstLesson: string;
      offSeasonNote: string;
      notAuthored: string;
      browseFullYear: string;
      chooseTitle: string;
      chooseIntro: string;
      madeTitle: string;
      made: Array<{ title: string; body: string }>;
      fitTitle: string;
      fitIntro: string;
      fitSteps: Array<{ title: string; body: string }>;
      startCta: string;
      pilotCta: string;
    };
    forLeaders: {
      title: string;
      description: string;
      kicker: string;
      heroTitle: string;
      heroSubtitle: string;
      problemTitle: string;
      problemIntro: string;
      problem: Array<{ title: string; body: string }>;
      solutionTitle: string;
      solutionLead: string;
      solutionBody: string;
      evidenceTitle: string;
      evidenceIntro: string;
      evidenceCols: [string, string, string];
      evidenceRows: Array<{ commitment: string; evidence: string; sourceLabel: string; source: string }>;
      lenses: string;
      qualityTitle: string;
      quality: Array<{ title: string; body: string }>;
      whereTitle: string;
      where: string[];
      whereNote: string;
      sourcesCta: string;
      askTitle: string;
      askIntro: string;
      ask: Array<{ title: string; body: string }>;
      readDocs: string;
      supportProject: string;
      licenseTitle: string;
      licenseBefore: string;
      licenseLink: string;
      licenseAfter: string;
    };
    support: {
      title: string;
      description: string;
      kicker: string;
      heroTitle: string;
      heroSubtitle: string;
      pathsTitle: string;
      pathsIntro: string;
      paths: Array<{ key: string; title: string; body: string; cta: string }>;
      pilotTitle: string;
      pilotIntro: string;
      pilotSteps: Array<{ title: string; body: string }>;
      pilotGuardrail: string;
      budgetTitle: string;
      budgetIntro: string;
      budgetRows: Array<{ outcome: string; model: string; evidence: string }>;
      budgetPromise: string;
      budgetCta: string;
      formTitle: string;
      formIntro: string;
      form: Record<string, string>;
      privacy: string;
      privacyCta: string;
    };
    supportThanks: {
      title: string;
      kicker: string;
      heroTitle: string;
      heroSubtitle: string;
      back: string;
      curriculum: string;
    };
    sources: {
      title: string;
      intro: string;
      reviewed: string;
      contested: string;
    };
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
    keyVocabulary: string;
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
    taughtIn: string;
    copyLink: string;
    copied: string;
    suggestImprovement: string;
    moreActions: string;
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
    startTyping: string;
    filter: string;
    type: string;
    grade: string;
    subject: string;
    pillar: string;
    clear: string;
    showMore: string;
    searching: string;
    unavailable: string;
    searchError: string;
    all: string;
    resultsOne: string;
    resultsMany: string;
  };
  status: Record<string, string>;
  gradeLabel: (grade: number) => string;
  lessonCountLabel: (n: number) => string;
  pillarTitles: Record<string, string>;
  pillarQuestions: Record<string, string>;
}

const en: UI = {
  site: {
    name: 'Whole Earth Curriculum',
    short: 'WEC',
    description:
      'A comprehensive, humanitarian, egalitarian K\u201312 curriculum offered free to the world \u2014 raising the baseline standard of living for all life on Earth.',
  },

  nav: {
    home: 'Home',
    curriculum: 'Curriculum',
    standards: 'Standards',
    docs: 'Docs',
    about: 'About us',
    support: 'Support',
    forTeachers: 'For Teachers',
    forLeaders: 'For Leaders',
    search: 'Search',
    skipToContent: 'Skip to content',
    theme: 'Toggle color theme',
    themeToDark: 'Switch to dark mode',
    themeToLight: 'Switch to light mode',
    menu: 'Menu',
    showIds: 'Show IDs',
    hideIds: 'Hide IDs',
    sources: 'Sources',
  },

  home: {
    heroKicker: 'Offered free to the world',
    heroTitle: 'Educate the whole human.',
    heroSubtitle:
      'A complete K\u201312 curriculum that develops emotional, physical, intellectual, and ecological awareness.',
    browseCurriculum: 'Browse the curriculum',
    browseStandards: 'Explore the standards',
    supportProject: 'Support the project',
    browseByGrade: 'Browse by grade',
    jumpToGrade: 'Jump straight to a grade level.',
    pageTitle: 'Free K\u201312 Curriculum',
    pillarsTitle: 'Four pillars, one whole person',
    pillarsIntro:
      'Every subject, at every grade, grows out of four dimensions of a whole person \u2014 not out of disconnected school subjects.',
    valuesTitle: 'What it stands for',
    values: [
      'Holistic \u2014 mind, body, emotion, and context grow together, year after year.',
      'Egalitarian \u2014 built to benefit the many, never the few.',
      'Global & anthropological \u2014 never one nation\u2019s default view.',
      'Ethical \u2014 ethics are a lens through which everything is taught.',
      'Honest about technology \u2014 its effects on humanity and the Earth, taught without worship or fear.',
      'Open \u2014 free, remixable, and licensed to stay that way.',
    ],
    howTitle: 'How it all fits together',
    howSteps: [
      'One vision guides every grade and subject.',
      'Learning goals connect lessons across subjects and grades.',
      'Lessons follow published standards for accuracy, safety, and developmental fit.',
      'Read online or print, with no account or fee.',
    ],
    audienceTitle: 'Who are you here for?',
    audienceIntro: 'Three doors, one curriculum.',
    audiences: [
      {
        title: 'I\u2019m curious',
        body: 'Wondering what this is and whether it\u2019s any good? Start with the idea, in plain words.',
        href: '/what-is/',
        cta: 'What is it?',
      },
      {
        title: 'I\u2019m a teacher',
        body: 'Jump straight to a grade and a lesson you can print and teach today.',
        href: '/for-teachers/',
        cta: 'For teachers',
      },
      {
        title: 'I\u2019m a leader or funder',
        body: 'See the evidence, review process, and ways to adopt or fund it.',
        href: '/for-leaders/',
        cta: 'For leaders',
      },
    ],
  },
  pages: {
    whatIs: {
      title: 'What is Whole Earth Curriculum?',
      description:
        'Whole Earth Curriculum is a free, complete K\u201312 curriculum that develops the whole human \u2014 emotional, physical, intellectual, and ecological.',
      kicker: 'Offered free to the world',
      heroTitle: 'Education for the whole human.',
      heroSubtitle:
        'A free K\u201312 curriculum connecting mind, body, emotion, and the world each child lives in.',
      beliefsTitle: 'What we believe',
      beliefsIntro: 'Six beliefs, stated plainly. Everything else follows from them.',
      beliefs: [
        {
          title: 'A child is a whole person',
          body: 'Emotion, body, mind, and context grow together \u2014 so we teach them together, not as separate subjects.',
        },
        {
          title: 'Everyone deserves this',
          body: 'Built to benefit everyone, not a privileged few \u2014 and free by design, permanently.',
        },
        {
          title: 'No single point of view',
          body: 'History, culture, and knowledge are taught from a global, cross-cultural view \u2014 never one nation\u2019s default.',
        },
        {
          title: 'How we treat each other is part of it',
          body: 'Ethics and empathy are woven through every subject, not bolted on.',
        },
        {
          title: 'Technology, understood',
          body: 'We teach children to see what technology does to people and the planet \u2014 and to judge it, not worship it or fear it.',
        },
        {
          title: 'How to think, not what to think',
          body: 'Big questions stay open, and evidence is kept clearly apart from belief.',
        },
      ],
      pillarsTitle: 'Four parts of a whole person',
      pillarsIntro:
        'Everything is organized around four questions, not school subjects. Each question returns every year, a little deeper.',
      pillars: [
        { title: 'Who am I?', question: 'Who am I, and how do I live well with others?' },
        { title: 'My body', question: 'How do I understand and care for my body?' },
        { title: 'How I think', question: 'How do I think, reason, and know?' },
        { title: 'The world I live in', question: 'What world do I live in, and what do I owe it?' },
      ],
      seeTitle: 'See for yourself',
      seeIntro:
        'Browse a grade, open a lesson, and judge it for yourself.',
      seeCta: 'Explore the curriculum',
      creatorTitle: 'Who created this curriculum?',
      creatorBody:
        'I’m a K–12 educator, anthropologist, and software engineer with experience teaching science and special education. I created Whole Earth Curriculum and am responsible for its direction and published content.',
      developmentBody:
        'AI tools supported much of the initial research, drafting, review, and artwork. Automated checks verify lesson structure, links to learning goals, source references, and assets.',
      reviewBody:
        'Independent subject, cultural, and accessibility review and classroom pilots are still needed to test the curriculum beyond these checks.',
      repositoryCta: 'View the work and its history on GitHub',
      governanceTitle: 'How decisions are made',
      governance: [
        {
          title: 'The vision is the test',
          body: 'Changes must support learners’ emotional, physical, intellectual, and ecological awareness.',
        },
        {
          title: 'Evidence and values stay distinct',
          body: 'Factual claims require sources. Values are stated openly rather than disguised as neutral facts.',
        },
        {
          title: 'The work stays inspectable',
          body: 'Changes, review findings, and funding assumptions are public, with personal information kept private.',
        },
        {
          title: 'Support does not buy doctrine',
          body: 'Partners may fund work and contribute expertise without gaining ownership or control over the curriculum’s principles.',
        },
      ],
      participateTitle: 'Help improve it',
      participateBody:
        'Teach a unit, review lessons, translate materials, or fund the work. Share what needs to change for your community.',
      participateCta: 'Choose how to support WEC',
    },
    forTeachers: {
      title: 'Whole Earth Curriculum for Teachers',
      description:
        'Teach today: pick a grade, open the next lesson, print it. Free, low-tech, and built for real classrooms.',
      kicker: 'For teachers',
      heroTitle: 'Pick a grade and jump in.',
      heroSubtitle:
        'Free, printable lessons with clear timing, materials, and teaching steps.',
      whereTitle: 'Where are we this week?',
      whereIntro:
        'The school year runs 180 days, Monday through Friday, starting on the first weekday on or after September 1. Pick a grade to see which lesson a class is on today.',
      gradeLabel: 'Grade',
      update: 'Update',
      todayIs: 'Today is school day',
      thisWeek: 'This week:',
      comingSoon: 'Coming school year.',
      firstLesson: 'First lesson:',
      offSeasonNote: 'The school year starts around September.',
      notAuthored: 'Not yet authored \u2014 open',
      browseFullYear: 'to browse the full year.',
      chooseTitle: 'Choose a grade',
      chooseIntro:
        'Browse each grade’s ordered units and daily lessons.',
      madeTitle: 'Made for real classrooms',
      made: [
        {
          title: 'Low-tech, no-cost',
          body: 'Each lesson includes a version using simple or freely available materials.',
        },
        {
          title: 'Print in one click',
          body: 'Lessons and units print in grayscale, with timing and materials up front.',
        },
        {
          title: 'Teach it day-of',
          body: 'Follow a step-by-step procedure, with guidance for the facilitator.',
        },
        {
          title: 'Written for learners',
          body: 'Learners can read the instructions themselves or follow with support from a teacher, family member, or peer.',
        },
      ],
      fitTitle: 'How it fits your week',
      fitIntro:
        'Follow the sequence or choose lessons to suit your learners.',
      fitSteps: [
        { title: 'Open your grade', body: 'find the unit you\u2019re on.' },
        { title: 'Open the next lesson', body: 'read the materials and timing.' },
        { title: 'Print', body: 'one click gives you a binder-ready page.' },
        { title: 'Share', body: 'copy the link and hand it to a colleague or a family.' },
      ],
      startCta: 'Start with a grade',
      pilotCta: 'Pilot a unit',
    },
    forLeaders: {
      title: 'Whole Earth Curriculum for Leaders & Funders',
      description:
        'The case for adopting or funding Whole Earth Curriculum: the problem, the evidence base, quality guarantees, where it stands today, and the ask.',
      kicker: 'For leaders & funders',
      heroTitle: 'A drop-in replacement for a struggling system.',
      heroSubtitle:
        'A free K\u201312 curriculum designed around the whole learner.',
      problemTitle: 'The problem',
      problemIntro:
        'Public education, across much of the world, is failing the whole human being.',
      problem: [
        {
          title: 'Fragmented',
          body: 'A child is split into disconnected subjects instead of developed as one person whose emotion, body, and intellect grow together.',
        },
        {
          title: 'Abstract and disconnected',
          body: 'Concepts are taught without connection to real life, so knowledge is stored for a test and forgotten \u2014 not used.',
        },
        {
          title: 'Inequitable',
          body: 'Outcomes track a child\u2019s background, not their potential; the system often reproduces hierarchy rather than lifting the many.',
        },
        {
          title: 'Narrow',
          body: 'History and culture are frequently taught from one nation\u2019s default, leaving most of humanity out of its own story.',
        },
        {
          title: 'Incomplete',
          body: 'Ethics, emotional life, the body, and the deep effects of modern technology are treated as afterthoughts \u2014 when they are taught at all.',
        },
      ],
      solutionTitle: 'The solution',
      solutionLead:
        'Schools, communities, families, and independent learners can use WEC in full or choose individual units.',
      solutionBody:
        'Four dimensions of learning connect ten content areas through grade-level goals, units, and daily lessons.',
      evidenceTitle: 'The evidence behind the design',
      evidenceIntro:
        'These studies inform the teaching approaches used in WEC.',
      evidenceCols: ['Commitment', 'Evidence it rests on', 'Source'],
      evidenceRows: [
        {
          commitment: 'Mastery learning + feedback over ranking',
          evidence: 'Mastery learning with corrective feedback adds roughly one standard deviation; cooperative learning roughly 0.8. (Bloom, 1984 \u2014 for context, one-to-one tutoring is the benchmark at ~2 SD.)',
          sourceLabel: 'Bloom, 1984',
          source: '/sources/#s-007',
        },
        {
          commitment: 'Relationships and feedback first',
          evidence: 'Teacher\u2013student relationships and feedback rank among the largest influences on learning, across 800+ meta-analyses.',
          sourceLabel: 'Hattie, 2008',
          source: '/sources/#s-012',
        },
        {
          commitment: 'Teach at the learner\u2019s level, not their age',
          evidence: 'Grouping learners by assessed level rather than age produced large, low-cost literacy and numeracy gains in randomized trials.',
          sourceLabel: 'Pratham \u2014 TaRL',
          source: '/sources/#s-009',
        },
        {
          commitment: 'Multi-grade, self-paced, low-tech works',
          evidence: 'Escuela Nueva\u2019s one-room, self-paced rural model reached roughly 20,000 schools across 19 countries, with rural schools outperforming urban ones.',
          sourceLabel: 'Escuela Nueva',
          source: '/sources/#s-008',
        },
        {
          commitment: 'Explicit instruction for novices, inquiry for concepts',
          evidence: 'Novices learn foundational skills better with explicit instruction and worked examples; inquiry is powerful once concepts are in place.',
          sourceLabel: 'Kirschner et al., 2006',
          source: '/sources/#s-011',
        },
        {
          commitment: 'Science of learning baked into every lesson',
          evidence: 'Retrieval practice and spaced practice are the two highest-utility learning techniques in a consensus review.',
          sourceLabel: 'Dunlosky et al., 2013',
          source: '/sources/#s-039',
        },
        {
          commitment: 'Age-appropriate by design',
          evidence: 'Every lesson is held to a developmental rubric grounded in Piaget, Erikson, and Vygotsky.',
          sourceLabel: 'Developmental rubric',
          source: '/docs/development/',
        },
      ],
      lenses:
        'Four cross-cutting lenses \u2014 ethics, egalitarianism, global/anthropological perspective, and the effect of technology on humanity and the environment \u2014 are carried through every lesson, so values are not a unit but a habit.',
      qualityTitle: 'How quality is checked',
      quality: [
        {
          title: 'Clear, auditable alignment',
          body: 'Automated checks verify that lessons link to learning goals across grades and subjects.',
        },
        {
          title: 'Human review',
          body: 'Educators and subject, cultural, and accessibility experts are being recruited to review and improve the first pass.',
        },
        {
          title: 'Built for everyone',
          body: 'Lessons include simple and enriched material options, with instructions addressed to the learner.',
        },
        {
          title: 'Honest and open',
          body: 'Factual claims link to the source registry; evidence and values are identified separately.',
        },
      ],
      whereTitle: 'Where it stands today',
      where: [
        '<strong>975 standards</strong> across ten content areas.',
        '<strong>13 grades</strong> (K\u201312), each planned around a ~180-day year, with <strong>159 units</strong> in total.',
        '<strong>1,676 lessons</strong> with <strong>1,674 SVG illustrations</strong>.',
        'A complete <strong>assessment framework, facilitation guide, developmental rubric, art/accessibility style guide, and evidence-grounded contexts guide</strong>.',
      ],
      whereNote: 'Repository snapshot: August 2026.',
      sourcesCta: 'See the full source registry',
      askTitle: 'The ask',
      askIntro:
        'Fund a specific outcome:',
      ask: [
        {
          title: 'Polish the first pass',
          body: 'improve clarity, depth, and materials across all 13 grades.',
        },
        {
          title: 'Human expert review',
          body: 'support independent educators, scientists, and cultural experts in reviewing units.',
        },
        {
          title: 'Translation and localization',
          body: 'translate materials and adapt them with local educators.',
        },
        {
          title: 'Delivery',
          body: 'web, offline, and print, free at the point of use.',
        },
      ],
      readDocs: 'Read the documentation',
      supportProject: 'Fund or partner on an outcome',
      licenseTitle: 'License',
      licenseBefore: 'Curriculum content is licensed under',
      licenseLink: 'CC BY-SA 4.0',
      licenseAfter: '\u2014 free to use, adapt, and share, forever. Tooling is released under MIT.',
    },
    support: {
      title: 'Support Whole Earth Curriculum',
      description:
        'Pilot, review, translate, fund, or partner with Whole Earth Curriculum as the complete K–12 first pass moves into human validation and wider use.',
      kicker: 'The next stage',
      heroTitle: 'Help improve the curriculum.',
      heroSubtitle:
        'The first K–12 draft is written and illustrated. Help test it in classrooms, review it, translate it, or make it easier to access.',
      pathsTitle: 'Choose your way in',
      pathsIntro:
        'Start with one unit or contribution.',
      paths: [
        {
          key: 'pilot',
          title: 'Pilot a unit',
          body: 'Use a unit with learners and tell us what works, what fails, and what must change for your setting.',
          cta: 'Join the pilot cohort',
        },
        {
          key: 'review',
          title: 'Review as an expert',
          body: 'Apply your teaching, subject, developmental, cultural, or accessibility expertise to a few lessons.',
          cta: 'Offer a review',
        },
        {
          key: 'localize',
          title: 'Translate or localize',
          body: 'Adapt a unit for another language, culture, or setting.',
          cta: 'Propose a localization',
        },
        {
          key: 'fund',
          title: 'Fund or partner',
          body: 'Fund a reviewed unit, classroom pilot, translation, or delivery project.',
          cta: 'Discuss a partnership',
        },
      ],
      pilotTitle: 'The first pilot cohort',
      pilotIntro:
        'Work with a unit and share what you learn so the next version fits real teaching conditions.',
      pilotSteps: [
        {
          title: 'Choose a unit',
          body: 'Pick a grade and topic that fit your learners.',
        },
        {
          title: 'Teach and observe',
          body: 'Use the lessons as written or record the adaptations your setting requires.',
        },
        {
          title: 'Report usable evidence',
          body: 'Share preparation time, material barriers, clarity, learner engagement, assessment usefulness, and specific revisions.',
        },
        {
          title: 'See the curriculum change',
          body: 'Pilot findings become public issues and revisions, with participating educators credited when they choose.',
        },
      ],
      pilotGuardrail:
        'The first cohort is curriculum improvement, not formal human-subjects research. Do not submit learner names, contact details, health information, images, or other personal student data.',
      budgetTitle: 'A budget built from real work',
      budgetIntro:
        'Pilots and reviews will establish the time and cost of the work. Each funded outcome will publish its estimate and actual spending.',
      budgetRows: [
        {
          outcome: 'Human review',
          model: 'Lessons × review hours per lesson × reviewer rate',
          evidence: 'Time logs, reviewer discipline, findings, revisions, and sign-off status',
        },
        {
          outcome: 'Classroom pilot',
          model: 'Educator support or stipend + coordination + analysis',
          evidence: 'Settings, lessons used, preparation time, barriers, feedback, and resulting changes',
        },
        {
          outcome: 'Translation and localization',
          model: 'Source words × translation rate + cultural and subject review',
          evidence: 'Language, locale, word count, reviewers, revisions, and publication status',
        },
        {
          outcome: 'Print, offline, and web delivery',
          model: 'Scoped implementation hours + production and service costs',
          evidence: 'Deliverables, accessibility checks, distribution format, and recurring costs',
        },
        {
          outcome: 'Coordination and administration',
          model: 'Named hours or an explicit percentage, never hidden inside program costs',
          evidence: 'Funding received, spending by category, balance, and variance from the estimate',
        },
      ],
      budgetPromise:
        'We’ll publish funding received, spending, remaining balances, and changes to estimates. Contributions do not buy ownership of the curriculum.',
      budgetCta: 'Read the budget and measurement plan',
      formTitle: 'Tell us how you want to help',
      formIntro:
        'Tell us what you can offer and what support you need to take part.',
      form: {
        name: 'Name',
        email: 'Email',
        role: 'Your role',
        rolePrompt: 'Choose the closest fit',
        roleEducator: 'Educator or facilitator',
        roleExpert: 'Subject or review specialist',
        roleTranslator: 'Translator or cultural editor',
        roleFunder: 'Funder or institutional partner',
        roleContributor: 'Open contributor',
        roleOther: 'Another role',
        organization: 'Organization or community (optional)',
        region: 'Country or region',
        supportType: 'How would you like to help?',
        supportPilot: 'Pilot a unit',
        supportReview: 'Review as an expert',
        supportLocalize: 'Translate or localize',
        supportFund: 'Fund or partner',
        supportOther: 'Another form of support',
        focus: 'Grade, subject, language, community, or outcome of interest',
        capacity: 'Available capacity (optional)',
        capacityPrompt: 'Choose one',
        capacityConversation: 'An initial conversation',
        capacityLesson: 'One or a few lessons',
        capacityUnit: 'One complete unit',
        capacityOngoing: 'An ongoing role or partnership',
        funding: 'Potential funding range (optional)',
        fundingPrompt: 'Choose one',
        fundingInKind: 'Expertise, access, or other in-kind support',
        fundingUnder5: 'Under $5,000 USD',
        funding5to25: '$5,000–$25,000 USD',
        funding25to100: '$25,000–$100,000 USD',
        funding100plus: '$100,000+ USD',
        message: 'What would make this collaboration useful?',
        consent: 'You may contact me about this request and closely related WEC opportunities.',
        submit: 'Send support interest',
        sending: 'Sending…',
        error: 'The form could not be sent. Please try again in a moment.',
        notConfigured: 'The support database is being connected. Please return shortly or use the public repository in the meantime.',
      },
      privacy:
        'Please do not include personal information about learners. Information submitted here is used to respond to this request and organize WEC support; it is not sold.',
      privacyCta: 'Read the support-form privacy and retention policy',
    },
    supportThanks: {
      title: 'Thank you for supporting Whole Earth Curriculum',
      kicker: 'Interest received',
      heroTitle: 'Thank you for stepping in.',
      heroSubtitle:
        'We’ll use your response to plan the work and follow up about your contribution.',
      back: 'Return to support',
      curriculum: 'Explore the curriculum',
    },
    sources: {
      title: 'Sources',
      intro:
        'Browse the references used throughout the curriculum. Entries link to the original sources and flag contested evidence.',
      reviewed: 'Reviewed',
      contested: 'Contested',
    },
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
    keyVocabulary: 'Key vocabulary',
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
    taughtIn: 'Taught in',
    copyLink: 'Copy link',
    copied: 'Copied',
    suggestImprovement: 'Suggest an improvement',
    moreActions: 'More actions',
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
    hint: 'Search runs in your browser using the site’s own index.',
    startTyping: 'Start typing to search.',
    filter: 'Filter by',
    type: 'Type',
    grade: 'Grade',
    subject: 'Subject',
    pillar: 'Pillar',
    clear: 'Clear',
    showMore: 'Show more results',
    searching: 'Searching\u2026',
    unavailable: 'Search is not available right now.',
    searchError: 'Something went wrong. Try again.',
    all: 'All',
    resultsOne: '1 result',
    resultsMany: '{n} results',
  },

  status: {
    draft: 'Draft',
    review: 'Review',
    approved: 'Approved',
  },

  gradeLabel: (grade: number) => (grade === 0 ? 'Kindergarten' : `Grade ${grade}`),

  lessonCountLabel: (n: number) => `${n} ${n === 1 ? 'lesson' : 'lessons'}`,

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
