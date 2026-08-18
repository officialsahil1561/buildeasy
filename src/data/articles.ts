export interface ArticleSection {
  h2?: string;
  h3?: string;
  text?: string;
  paragraphs?: string[];
  listItems?: string[];
  orderedListItems?: string[];
  exampleBox?: {
    title: string;
    before?: string;
    after?: string;
    items?: string[];
  };
  callout?: {
    title: string;
    text: string;
    type?: 'tip' | 'warning' | 'info';
  };
  internalLink?: {
    text: string;
    url: string;
    anchorText: string;
  };
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  metaTitle: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  keywords: string[];
  relatedSlugs: string[];
  sections: ArticleSection[];
}

export const ARTICLES: Article[] = [
  {
    slug: 'how-to-write-a-resume',
    title: 'How to Write a Resume in 2026: The Complete Guide',
    subtitle: 'A practical, step-by-step guide to structuring your resume, writing impactful bullet points, and crafting a document recruiters actually read.',
    category: 'RESUME BASICS',
    metaTitle: 'How to Write a Resume in 2026: The Complete Guide | BuildEasy',
    description: 'Learn how to write a job-winning resume in 2026. Step-by-step instructions on formatting, experience bullet points, ATS optimization, and templates.',
    publishedAt: 'August 2026',
    updatedAt: 'August 2026',
    readTime: '8 min read',
    keywords: ['how to write a resume', 'resume guide 2026', 'resume tips', 'ATS friendly resume', 'resume layout'],
    relatedSlugs: ['resume-formatting-guide', 'write-impactful-resume-bullets', 'resume-one-page'],
    sections: [
      {
        h2: '1. Choose the Right Resume Format',
        paragraphs: [
          'Before typing a single word, choose a structural format that highlights your strongest qualifications. For 95% of job seekers, the reverse-chronological format is the gold standard.',
          'The reverse-chronological layout lists your work history starting with your most recent role. Hiring managers favor it because it reveals your career trajectory immediately.',
          'If you are making a radical career pivot or entering the workforce for the first time, you can consider a combination or functional format, though reverse-chronological remains the safest choice for Applicant Tracking Systems (ATS).'
        ]
      },
      {
        h2: '2. Header & Contact Information',
        paragraphs: [
          'Your header sits at the very top of your document and should convey professionalism instantly. Keep it uncluttered and easy to locate.'
        ],
        listItems: [
          'Full Name (18–24pt font size for prominent hierarchy)',
          'Professional Title (e.g., Senior Full-Stack Engineer)',
          'Phone Number & Professional Email (e.g., firstname.lastname@email.com)',
          'Location (City, State / Region — street address is unnecessary)',
          'LinkedIn Profile & Portfolio/GitHub URL'
        ]
      },
      {
        h2: '3. Write a Focused Professional Summary',
        paragraphs: [
          'Your professional summary is a 3–4 sentence elevator pitch. Avoid generic fluff like "hardworking team player." Instead, focus on your core expertise, key achievements, and the specific value you bring to an employer.'
        ],
        exampleBox: {
          title: 'Professional Summary Comparison',
          before: 'Weak: Driven marketing professional looking for a growth opportunity at a top firm with years of experience in content creation.',
          after: 'Strong: Growth Marketing Lead with 6+ years scaling B2B SaaS revenue. Generated $2.4M in pipeline by optimizing paid acquisition channels and spearheading a data-driven content strategy.'
        }
      },
      {
        h2: '4. Frame Work Experience with Measurable Results',
        paragraphs: [
          'Your work experience section is the engine of your resume. Rather than listing daily duties, describe achievements using strong action verbs and quantified metrics.',
          'Use the Google XYZ Formula: "Accomplished [X] as measured by [Y] by doing [Z]".'
        ],
        listItems: [
          'Start every bullet point with an active verb (e.g., Spearheaded, Reduced, Engineered, Architected)',
          'Include hard numbers, percentages, and dollar figures wherever possible',
          'Limit each position to 3–6 concise bullet points',
          'Focus on recent roles (last 10–15 years)'
        ],
        internalLink: {
          text: 'To craft compelling bullet points with ease, try designing your layout with ',
          url: '/builder',
          anchorText: 'BuildEasy\'s real-time resume builder'
        }
      },
      {
        h2: '5. Highlight Relevant Skills and Education',
        paragraphs: [
          'Group your skills logically into Hard Skills (tools, software, programming languages, certifications) and Functional Competencies. Avoid rating scales or progress bars (e.g., "Python: 80%"), which confuse ATS parsers and hiring teams.',
          'Your education section should sit near the bottom if you have 2+ years of experience, or near the top if you are a student or recent graduate.'
        ],
        callout: {
          title: 'ATS Best Practice',
          text: 'Scan the target job description carefully. Integrate 5–8 key skills verbatim into your skills and work experience sections to ensure high ATS compatibility.',
          type: 'tip'
        }
      },
      {
        h2: '6. Review and Export to PDF',
        paragraphs: [
          'Always proofread your resume line by line. Run spellchecks and verify that your margins, font sizes, and line spacing remain uniform. Export your finished resume as a crisp PDF to preserve formatting across all operating systems.'
        ],
        internalLink: {
          text: 'Explore ready-to-use professional layouts on our ',
          url: '/templates',
          anchorText: 'resume templates gallery'
        }
      }
    ]
  },
  {
    slug: 'resume-formatting-guide',
    title: 'Resume Formatting Guide: A4 vs US Letter, Margins, Fonts & Spacing',
    subtitle: 'Master the technical typography and visual rules needed to create a clean, single-page document that passes ATS screening.',
    category: 'FORMATTING',
    metaTitle: 'Resume Formatting Guide: Margins, Fonts, A4 vs Letter | BuildEasy',
    description: 'Complete technical resume formatting guide: page sizes (A4 vs US Letter), margin spacing, typography pairings, font sizes, and line spacing for ATS.',
    publishedAt: 'August 2026',
    updatedAt: 'August 2026',
    readTime: '6 min read',
    keywords: ['resume format', 'resume margins', 'A4 vs US letter', 'resume font size', 'ATS formatting rules'],
    relatedSlugs: ['how-to-write-a-resume', 'choose-resume-template', 'resume-one-page'],
    sections: [
      {
        h2: 'A4 vs US Letter: Choosing the Correct Page Dimension',
        paragraphs: [
          'Page format errors are among the most common reasons PDF layouts shift or spill onto unwanted second pages. Select the standard size used in your primary job market:',
          'US Letter (8.5 x 11 inches / 215.9 x 279.4 mm) is standard across the United States, Canada, and parts of Latin America.',
          'A4 (8.27 x 11.69 inches / 210 x 297 mm) is the standard format across Europe, Asia, the United Kingdom, and Australia.',
          'BuildEasy automatically adjusts your PDF export to match standard US Letter and A4 specifications.'
        ]
      },
      {
        h2: 'Margins and Visual Padding',
        paragraphs: [
          'Standard resume margins should be set to 0.5 inches (12.7mm) to 1.0 inch (25.4mm).',
          'If you have extensive experience and need room to fit content onto one page, reduce margins to 0.5–0.75 inches. Never go below 0.5 inches, as printer hardware and screen parsers may clip text near page edges.'
        ]
      },
      {
        h2: 'Typography and Hierarchy Rules',
        paragraphs: [
          'Maintain clear visual hierarchy using 2 to 3 distinct font sizes:'
        ],
        listItems: [
          'Candidate Name: 18pt – 22pt Bold',
          'Section Headings (H2): 12pt – 14pt Bold / Semibold',
          'Body Text & Bullets: 10pt – 11pt Regular',
          'Line Spacing: 1.15x – 1.3x for body text',
          'Section Margin Gap: 12px – 18px between major sections'
        ],
        internalLink: {
          text: 'You can test different typography pairings live in ',
          url: '/builder',
          anchorText: 'BuildEasy\'s interactive editor'
        }
      },
      {
        h2: 'Font Selections that Pass ATS',
        paragraphs: [
          'Stick to highly legible serif or sans-serif typefaces. Recommended sans-serif fonts include Inter, Arial, Helvetica, and Plus Jakarta Sans. Recommended serif fonts include Garamond, Georgia, and Playfair Display for creative titles.',
          'Avoid decorative script fonts, custom icon fonts, or ultra-thin font weights.'
        ]
      }
    ]
  },
  {
    slug: 'write-impactful-resume-bullets',
    title: 'How to Write Impactful Resume Bullet Points Using the STAR Method',
    subtitle: 'Transform weak job duty lists into high-impact bullet points that demonstrate revenue, efficiency, and leadership.',
    category: 'WRITING TIPS',
    metaTitle: 'Write Impactful Resume Bullet Points (STAR Method Guide) | BuildEasy',
    description: 'Learn how to write resume bullet points using the STAR method. Convert daily responsibilities into quantitative metrics and accomplishments.',
    publishedAt: 'August 2026',
    updatedAt: 'August 2026',
    readTime: '7 min read',
    keywords: ['resume bullet points', 'STAR method resume', 'action verbs', 'quantifiable resume achievements', 'resume experience section'],
    relatedSlugs: ['how-to-write-a-resume', 'resume-skills-section', 'resume-projects-section'],
    sections: [
      {
        h2: 'Why Standard Duty Lists Fail',
        paragraphs: [
          'Recruiters already know what a Software Engineer or Marketing Manager does on paper. What they don\'t know is how well you did it.',
          'Statements like "responsible for managing social media accounts" communicate passive attendance. Statements like "grew organic Instagram impressions by 140% over 6 months through targeted video content" communicate driving tangible results.'
        ]
      },
      {
        h2: 'Understanding the STAR Formula',
        paragraphs: [
          'The STAR method structures your bullet points around four core elements:'
        ],
        listItems: [
          'Situation: The context or problem you faced',
          'Task: The goal or objective you were assigned',
          'Action: The specific tools, strategy, or code you deployed',
          'Result: The quantified business impact or efficiency gain'
        ],
        exampleBox: {
          title: 'STAR Method Transformation',
          before: 'Before: Updated website content and improved page loading speeds.',
          after: 'After: Refactored legacy React frontend codebase, reducing average page render latency by 42% and raising mobile conversion rates by 18%.'
        }
      },
      {
        h2: 'Action Verbs to Lead Every Bullet',
        paragraphs: [
          'Never begin bullet points with weak phrases like "helped with" or "worked on." Use strong, precise action verbs:'
        ],
        listItems: [
          'Leadership: Spearheaded, Orchestrated, Spearheaded, Mentored, Directed',
          'Execution: Architected, Engineered, Implemented, Streamlined, Automated',
          'Growth & Strategy: Generated, Expanded, Boosted, Optimized, Maximized'
        ],
        internalLink: {
          text: 'Format your new bullet points instantly in ',
          url: '/builder',
          anchorText: 'BuildEasy\'s clean resume workspace'
        }
      }
    ]
  },
  {
    slug: 'choose-resume-template',
    title: 'How to Choose the Right Resume Template for Your Industry',
    subtitle: 'Match your career field with the optimal resume layout: Minimal, Executive, Modern, Academic, or Compact.',
    category: 'STRATEGY',
    metaTitle: 'How to Choose the Right Resume Template for Your Industry | BuildEasy',
    description: 'Find the ideal resume template for software engineering, finance, design, academia, or executive roles. Compare minimal, modern, and classic layouts.',
    publishedAt: 'August 2026',
    updatedAt: 'August 2026',
    readTime: '5 min read',
    keywords: ['choose resume template', 'resume layout selection', 'executive resume template', 'minimal resume', 'ATS resume templates'],
    relatedSlugs: ['resume-formatting-guide', 'how-to-write-a-resume', 'choose-resume-template'],
    sections: [
      {
        h2: 'Matching Layout Density with Career Stage',
        paragraphs: [
          'Different industries have distinct visual expectations when reviewing candidate files. A tech startup recruiter values dense, structured technical skill lists, while a law firm prefers traditional serif typography and generous line spacing.'
        ]
      },
      {
        h2: '1. Software Engineering & Technology',
        paragraphs: [
          'Best Template Choice: Minimal or Modern Layout',
          'Key Characteristics: High density, prominent Technical Skills block near the top, dedicated Projects section, clear timeline hierarchy.',
          'Tech recruiters glance at technical stack compatibility within 5 seconds. Minimalist layouts keep white space controlled and place core languages (e.g., TypeScript, Python, AWS) right below the header.'
        ],
        internalLink: {
          text: 'View technology-focused layouts in our ',
          url: '/templates',
          anchorText: 'BuildEasy template directory'
        }
      },
      {
        h2: '2. Finance, Banking & Corporate Leadership',
        paragraphs: [
          'Best Template Choice: Executive or Classic Layout',
          'Key Characteristics: Authoritative serif headers, classic navy accent rules, emphasis on revenue metrics, team leadership, and board oversight.',
          'Executive candidates need a formal layout that projects stability and high-level strategic responsibility.'
        ]
      },
      {
        h2: '3. Early Career & Students',
        paragraphs: [
          'Best Template Choice: Compact or Academic Layout',
          'Key Characteristics: Clean single-column layout, prominent Education section, emphasis on coursework, leadership, and projects.',
          'Ensures early-career candidates don\'t look sparse on paper while filling space balancedly.'
        ]
      }
    ]
  },
  {
    slug: 'resume-for-students',
    title: 'How to Make a Resume as a College Student',
    subtitle: 'Build a competitive student resume that highlights academic projects, campus leadership, and relevant coursework.',
    category: 'STUDENT CAREERS',
    metaTitle: 'How to Make a Resume as a College Student | BuildEasy',
    description: 'Complete guide to writing a student resume. Learn how to leverage coursework, academic projects, leadership, and internships for entry-level roles.',
    publishedAt: 'August 2026',
    updatedAt: 'August 2026',
    readTime: '6 min read',
    keywords: ['resume for students', 'college student resume', 'entry level resume', 'student resume example', 'academic projects on resume'],
    relatedSlugs: ['resume-with-no-experience', 'resume-projects-section', 'choose-resume-template'],
    sections: [
      {
        h2: 'Reordering Sections for Student Advantage',
        paragraphs: [
          'If you are currently enrolled in university or recently graduated, your education is your strongest asset. Place your Education section immediately beneath your contact header.'
        ],
        listItems: [
          'Degree Name & Major (e.g., B.S. in Computer Science)',
          'University Name & Graduation Date (Expected May 2027)',
          'GPA (include if 3.5 or higher)',
          'Relevant Coursework (4–6 core relevant subjects)',
          'Academic Honors or Scholarships'
        ]
      },
      {
        h2: 'Converting Academic Projects into Experience',
        paragraphs: [
          'Treat major term projects, capstones, and lab work with the same rigor as paid work experience. Give each project a title, technology list, and 2–3 bullet points detailing your individual contribution.'
        ],
        exampleBox: {
          title: 'Student Project Bullet Example',
          after: 'Full-Stack E-Commerce Capstone: Designed and implemented a Node.js/React store platform handling mock payments via Stripe API, serving 200+ test users during university demo day.'
        },
        internalLink: {
          text: 'Start crafting your student resume for free in ',
          url: '/builder',
          anchorText: 'BuildEasy\'s simple builder'
        }
      }
    ]
  },
  {
    slug: 'resume-with-no-experience',
    title: 'How to Make a Resume With No Work Experience',
    subtitle: 'Turn volunteer work, freelance projects, technical skills, and certifications into a polished professional resume.',
    category: 'ENTRY LEVEL',
    metaTitle: 'How to Make a Resume With No Work Experience | BuildEasy',
    description: 'Learn how to write a compelling resume when you have no formal work experience. Structure personal projects, volunteer roles, and certifications.',
    publishedAt: 'August 2026',
    updatedAt: 'August 2026',
    readTime: '6 min read',
    keywords: ['resume with no experience', 'first resume', 'entry level resume tips', 'no work experience resume', 'career change resume'],
    relatedSlugs: ['resume-for-students', 'resume-projects-section', 'resume-skills-section'],
    sections: [
      {
        h2: 'Shifting Focus from Job Titles to Skill Competency',
        paragraphs: [
          'Having no traditional work experience does not mean you have no accomplishments. Employers hiring for junior and entry-level positions look for motivation, learning capability, and practical technical foundation.'
        ]
      },
      {
        h2: 'What to Include Instead of Work History',
        listItems: [
          'Independent & Open Source Projects',
          'Volunteer Experience & Community Leadership',
          'Certifications & Specialized Bootcamps',
          'Technical Skills & Tool Proficiency',
          'Extracurricular Involvement & Hackathons'
        ]
      },
      {
        h2: 'Crafting a Motivated Summary Statement',
        paragraphs: [
          'Write a summary statement that directly states your target position and highlights relevant coursework, certifications, or self-taught skills.'
        ],
        internalLink: {
          text: 'Select an entry-level template on our ',
          url: '/templates',
          anchorText: 'resume templates page'
        }
      }
    ]
  },
  {
    slug: 'resume-projects-section',
    title: 'How to Write a Projects Section on a Resume',
    subtitle: 'Showcase personal, academic, or freelance work that proves your hands-on problem-solving capabilities.',
    category: 'WRITING TIPS',
    metaTitle: 'How to Write a Projects Section on a Resume | BuildEasy',
    description: 'Learn how to feature personal and technical projects on your resume. Step-by-step formatting guidelines with examples for software, design, and business.',
    publishedAt: 'August 2026',
    updatedAt: 'August 2026',
    readTime: '5 min read',
    keywords: ['resume projects section', 'projects on resume', 'portfolio resume', 'github projects resume', 'side projects on resume'],
    relatedSlugs: ['write-impactful-resume-bullets', 'resume-skills-section', 'how-to-write-a-resume'],
    sections: [
      {
        h2: 'When to Include a Projects Section',
        paragraphs: [
          'A dedicated Projects section is essential for software engineers, UX designers, data analysts, and career pivoters. It demonstrates that you can build functional products independently.'
        ]
      },
      {
        h2: 'Anatomy of a Perfect Project Entry',
        listItems: [
          'Project Title (e.g., Real-Time Collaborative Canvas)',
          'Technologies Used (e.g., TypeScript, WebSockets, Canvas API, Node.js)',
          'Live Demo or Repository Link (GitHub, Figma, Live App)',
          '2–3 bullet points detailing scope, execution, and outcomes'
        ],
        exampleBox: {
          title: 'Project Bullet Example',
          after: 'Automated Invoice Generator: Built a CLI tool in Python that converts Markdown receipts into formatted PDF invoices, reducing monthly billing prep time by 8 hours for freelance clients.'
        },
        internalLink: {
          text: 'Organize your project entries quickly in ',
          url: '/builder',
          anchorText: 'BuildEasy\'s compact editor'
        }
      }
    ]
  },
  {
    slug: 'resume-skills-section',
    title: 'How to Write a Skills Section on a Resume',
    subtitle: 'Categorize hard skills, soft skills, and toolsets so ATS algorithms and hiring teams spot your qualifications.',
    category: 'SKILLS & ATS',
    metaTitle: 'How to Write a Skills Section on a Resume | BuildEasy',
    description: 'Guide to organizing skills on a resume. Learn how to balance hard vs soft skills, optimize for ATS keyword matching, and structure tool categories.',
    publishedAt: 'August 2026',
    updatedAt: 'August 2026',
    readTime: '5 min read',
    keywords: ['resume skills section', 'hard skills vs soft skills', 'ATS skills resume', 'technical skills resume', 'skills list resume'],
    relatedSlugs: ['how-to-write-a-resume', 'resume-formatting-guide', 'write-impactful-resume-bullets'],
    sections: [
      {
        h2: 'Hard Skills vs. Soft Skills',
        paragraphs: [
          'Hard skills are teachable, measurable technical abilities (e.g., React, SQL, Financial Modeling, German Language). Soft skills are interpersonal traits (e.g., Cross-functional Collaboration, Time Management).',
          'Prioritize hard skills in your dedicated Skills block, and demonstrate soft skills naturally within your work experience bullet points.'
        ]
      },
      {
        h2: 'Categorizing Skills for High Readability',
        paragraphs: [
          'Avoid dumping 25 unstructured keywords into a single paragraph. Group them into distinct categories:'
        ],
        listItems: [
          'Languages: TypeScript, Python, SQL, HTML/CSS',
          'Frameworks: React, Next.js, Express, Tailwind CSS',
          'Tools & Cloud: Git, Docker, AWS, PostgreSQL, Figma',
          'Methodologies: Agile/Scrum, CI/CD, Test-Driven Development'
        ],
        internalLink: {
          text: 'Design clean skills sections with ',
          url: '/builder',
          anchorText: 'BuildEasy\'s live resume preview'
        }
      }
    ]
  },
  {
    slug: 'resume-contact-information',
    title: 'What Contact Information Should You Put on a Resume?',
    subtitle: 'Avoid privacy risks and outdated formatting by including only essential, modern contact details.',
    category: 'RESUME BASICS',
    metaTitle: 'What Contact Information Should You Put on a Resume? | BuildEasy',
    description: 'Learn exactly what contact details to put on your resume in 2026. What to include, what to omit for privacy, and how to format LinkedIn URLs.',
    publishedAt: 'August 2026',
    updatedAt: 'August 2026',
    readTime: '4 min read',
    keywords: ['resume contact information', 'what to put on resume header', 'resume address', 'linkedin url on resume', 'resume header tips'],
    relatedSlugs: ['how-to-write-a-resume', 'resume-formatting-guide', 'resume-one-page'],
    sections: [
      {
        h2: 'Must-Have Contact Information',
        listItems: [
          'First & Last Name (avoid formal middle names unless preferred)',
          'Phone Number (formatted cleanly with country code if applying abroad)',
          'Professional Email Address (use name-based domains like Gmail or custom domains)',
          'Location: City, State / Country (street address is obsolete and raises privacy risks)',
          'LinkedIn Profile URL (customize to clean format e.g., linkedin.com/in/firstlast)'
        ]
      },
      {
        h2: 'What to Omit from Your Resume Header',
        listItems: [
          'Full Street Address or House Number',
          'Photo or Headshot (unless applying in specific European markets requiring it)',
          'Date of Birth, Age, or Marital Status',
          'Unprofessional Email Addresses (e.g., coolguy2005@gmail.com)'
        ],
        internalLink: {
          text: 'Set up your resume header easily on ',
          url: '/builder',
          anchorText: 'BuildEasy'
        }
      }
    ]
  },
  {
    slug: 'resume-one-page',
    title: 'How Long Should a Resume Be?',
    subtitle: 'The 1-page vs 2-page rule explained: when to keep it compact and when an extra page is justified.',
    category: 'FORMATTING',
    metaTitle: 'How Long Should a Resume Be? (1-Page vs 2-Page Rule) | BuildEasy',
    description: 'How long should your resume be? Learn when to use a 1-page vs 2-page layout based on your years of experience, industry, and role level.',
    publishedAt: 'August 2026',
    updatedAt: 'August 2026',
    readTime: '5 min read',
    keywords: ['how long should a resume be', 'one page resume', '2 page resume rule', 'resume page limit', 'resume length'],
    relatedSlugs: ['resume-formatting-guide', 'how-to-write-a-resume', 'choose-resume-template'],
    sections: [
      {
        h2: 'The 1-Page Gold Standard',
        paragraphs: [
          'For 80%+ of applicants—including students, recent graduates, and professionals with under 7–10 years of experience—a single-page resume is optimal.',
          'Recruiters review resumes in 6–10 seconds. A crisp single page forces you to edit ruthlessly, leaving only high-value accomplishments.'
        ]
      },
      {
        h2: 'When a 2-Page Resume Is Acceptable',
        paragraphs: [
          'A two-page resume is appropriate if you have:'
        ],
        listItems: [
          '10+ years of progressive professional experience',
          'Senior management, executive, or director-level track records',
          'Extensive technical patent lists, publications, or speaking engagements'
        ],
        callout: {
          title: 'The Golden Rule of Page Length',
          text: 'If your resume spills onto page two by only 3–4 lines, edit down margins, adjust line height, or trim bullet points to keep it strictly 1 page.',
          type: 'warning'
        },
        internalLink: {
          text: 'Use our single-page templates on ',
          url: '/templates',
          anchorText: 'BuildEasy templates'
        }
      }
    ]
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return ARTICLES.slice(0, 3);
  return ARTICLES.filter((a) => current.relatedSlugs.includes(a.slug)).slice(0, 3);
}
