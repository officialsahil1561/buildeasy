import { PortfolioData } from '../types';
import { sanitizeUrl } from './utils';

export type IssueSeverity = 'error' | 'warning' | 'suggestion';

export interface ResumeIssue {
  id: string;
  category: 'CONTENT' | 'STRUCTURE' | 'ATS_PARSER' | 'LINKS' | 'FORMATTING' | 'COMPLETENESS';
  severity: IssueSeverity;
  message: string;
  tabTarget?: string;
  field?: string;
}

export interface ResumeStrength {
  id: string;
  category: string;
  message: string;
}

export interface JobDescriptionMatch {
  matchPercentage: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  matchedPhrases: string[];
  missingPhrases: string[];
  totalJdKeywords: number;
  disclaimer: string;
}

export interface ResumeAnalysis {
  score: number; // 0 - 100 overall weighted readiness score
  completenessScore: number; // 0 - 100
  contentQualityScore: number; // 0 - 100
  atsReadinessScore: number; // 0 - 100
  formattingScore: number; // 0 - 100
  overallStatus: 'Excellent' | 'Good' | 'Needs improvement' | 'Incomplete';
  issues: ResumeIssue[];
  strengths: ResumeStrength[];
  summary: {
    totalWords: number;
    experienceCount: number;
    educationCount: number;
    skillsCount: number;
    projectsCount: number;
    measurableBulletsCount: number;
    totalBulletsCount: number;
  };
}

// Stop words to strictly filter out from job description keyword extraction
const STOP_WORDS = new Set([
  'about', 'above', 'across', 'after', 'again', 'against', 'all', 'almost', 'alone', 'along',
  'already', 'also', 'although', 'always', 'among', 'and', 'another', 'any', 'anybody', 'anyone',
  'anything', 'anywhere', 'are', 'area', 'areas', 'around', 'ask', 'asked', 'asking', 'asks',
  'back', 'backed', 'backing', 'backs', 'became', 'because', 'become', 'becomes', 'becoming',
  'been', 'before', 'began', 'behind', 'being', 'beings', 'best', 'better', 'between', 'big',
  'both', 'came', 'cannot', 'case', 'cases', 'certain', 'certainly', 'clear', 'clearly', 'come',
  'could', 'did', 'differ', 'different', 'differently', 'does', 'done', 'down', 'downed',
  'downing', 'downs', 'during', 'each', 'early', 'either', 'end', 'ended', 'ending', 'ends',
  'enough', 'even', 'evenly', 'ever', 'every', 'everybody', 'everyone', 'everything', 'everywhere',
  'face', 'faces', 'fact', 'facts', 'far', 'felt', 'few', 'fewer', 'find', 'finds', 'first',
  'for', 'four', 'from', 'full', 'fully', 'further', 'furthered', 'furthering', 'furthers', 'gave',
  'general', 'generally', 'get', 'gets', 'give', 'given', 'gives', 'going', 'good', 'goods', 'got',
  'great', 'greater', 'greatest', 'group', 'grouped', 'grouping', 'groups', 'had', 'has', 'have',
  'having', 'her', 'here', 'herself', 'high', 'higher', 'highest', 'him', 'himself', 'his', 'how',
  'however', 'important', 'interest', 'interested', 'interesting', 'interests', 'into', 'its',
  'itself', 'just', 'keep', 'keeps', 'kind', 'knew', 'know', 'known', 'knows', 'large', 'largely',
  'last', 'later', 'latest', 'least', 'less', 'let', 'lets', 'like', 'likely', 'made', 'make',
  'making', 'man', 'many', 'may', 'member', 'members', 'men', 'might', 'more', 'most', 'mostly',
  'much', 'must', 'myself', 'name', 'necessary', 'need', 'needed', 'needing', 'needs', 'never',
  'new', 'newer', 'newest', 'next', 'nobody', 'non', 'noone', 'not', 'nothing', 'now', 'nowhere',
  'number', 'numbers', 'off', 'often', 'old', 'older', 'oldest', 'once', 'one', 'only', 'open',
  'opened', 'opening', 'opens', 'order', 'ordered', 'ordering', 'orders', 'other', 'others', 'our',
  'out', 'over', 'part', 'parted', 'parting', 'parts', 'per', 'perhaps', 'place', 'places', 'point',
  'pointed', 'pointing', 'points', 'possible', 'present', 'presented', 'presenting', 'presents',
  'problem', 'problems', 'put', 'puts', 'quite', 'rather', 'really', 'right', 'room', 'rooms',
  'said', 'same', 'saw', 'say', 'says', 'second', 'seconds', 'see', 'seem', 'seemed', 'seeming',
  'seems', 'sees', 'several', 'shall', 'she', 'should', 'show', 'showed', 'showing', 'shows',
  'side', 'sides', 'since', 'small', 'smaller', 'smallest', 'some', 'somebody', 'someone',
  'something', 'somewhere', 'state', 'states', 'still', 'such', 'sure', 'take', 'taken', 'than',
  'that', 'the', 'their', 'them', 'then', 'there', 'therefore', 'these', 'they', 'thing', 'things',
  'think', 'thinks', 'this', 'those', 'though', 'thought', 'thoughts', 'three', 'through',
  'throughout', 'thus', 'today', 'together', 'too', 'took', 'toward', 'turn', 'turned', 'turning',
  'turns', 'two', 'under', 'until', 'upon', 'use', 'used', 'uses', 'very', 'want', 'wanted',
  'wanting', 'wants', 'was', 'way', 'ways', 'well', 'wells', 'went', 'were', 'what', 'when',
  'where', 'whether', 'which', 'while', 'who', 'whole', 'whom', 'whose', 'why', 'will', 'with',
  'within', 'without', 'work', 'worked', 'working', 'works', 'year', 'years', 'you', 'young',
  'younger', 'youngest', 'your', 'yours', 'team', 'candidate', 'looking', 'role', 'company',
  'responsible', 'responsibilities', 'opportunity', 'requirements', 'qualifications', 'join',
  'ideal', 'experienced', 'seeking', 'working', 'ability', 'skills', 'experience', 'position'
]);

// Canonical technical terms dictionary & normalizer
const TECH_CANONICAL_MAP: Record<string, string> = {
  'react.js': 'React',
  'reactjs': 'React',
  'react': 'React',
  'react native': 'React Native',
  'react-native': 'React Native',
  'vue.js': 'Vue.js',
  'vuejs': 'Vue.js',
  'vue': 'Vue.js',
  'angular.js': 'Angular',
  'angularjs': 'Angular',
  'angular': 'Angular',
  'node.js': 'Node.js',
  'nodejs': 'Node.js',
  'node': 'Node.js',
  'type script': 'TypeScript',
  'typescript': 'TypeScript',
  'java script': 'JavaScript',
  'javascript': 'JavaScript',
  'js': 'JavaScript',
  'ts': 'TypeScript',
  'next.js': 'Next.js',
  'nextjs': 'Next.js',
  'tailwind': 'Tailwind CSS',
  'tailwindcss': 'Tailwind CSS',
  'rest api': 'REST API',
  'restful api': 'REST API',
  'rest apis': 'REST API',
  'restful apis': 'REST API',
  'rest': 'REST API',
  'graphql': 'GraphQL',
  'postgres': 'PostgreSQL',
  'postgresql': 'PostgreSQL',
  'mongo': 'MongoDB',
  'mongodb': 'MongoDB',
  'docker': 'Docker',
  'kubernetes': 'Kubernetes',
  'k8s': 'Kubernetes',
  'aws': 'AWS',
  'amazon web services': 'AWS',
  'gcp': 'Google Cloud Platform',
  'google cloud': 'Google Cloud Platform',
  'azure': 'Microsoft Azure',
  'microsoft azure': 'Microsoft Azure',
  'ci/cd': 'CI/CD',
  'cicd': 'CI/CD',
  'continuous integration': 'CI/CD',
  'python': 'Python',
  'java': 'Java',
  'c++': 'C++',
  'golang': 'Go',
  'git': 'Git',
  'github': 'GitHub',
  'agile': 'Agile',
  'scrum': 'Scrum',
  'machine learning': 'Machine Learning',
  'deep learning': 'Deep Learning',
  'artificial intelligence': 'Artificial Intelligence',
  'data structures': 'Data Structures',
  'algorithms': 'Algorithms',
  'system design': 'System Design',
  'microservices': 'Microservices',
  'unit testing': 'Unit Testing',
  'test driven development': 'TDD',
  'tdd': 'TDD',
};

/**
 * Normalized Resume Analysis Engine
 * Single source of truth for checking resume quality, completeness, and ATS readiness.
 */
export function analyzeResume(data: PortfolioData): ResumeAnalysis {
  const issues: ResumeIssue[] = [];
  const strengths: ResumeStrength[] = [];

  let totalWords = 0;
  let totalBulletsCount = 0;
  let measurableBulletsCount = 0;

  // 1. Basic Info Analysis
  const hasFullName = Boolean(
    data.basicInfo?.name?.trim() || 
    (data.basicInfo?.firstName?.trim() && data.basicInfo?.lastName?.trim())
  );
  if (!hasFullName) {
    issues.push({
      id: 'missing-name',
      category: 'COMPLETENESS',
      severity: 'error',
      message: 'Full name is required for applicant identification.',
      tabTarget: 'basic',
      field: 'name'
    });
  } else {
    strengths.push({
      id: 'name-provided',
      category: 'IDENTIFICATION',
      message: 'Clear applicant name provided.'
    });
  }

  const hasEmail = Boolean(data.basicInfo?.email?.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.basicInfo.email.trim()));
  if (!hasEmail) {
    issues.push({
      id: 'missing-email',
      category: 'COMPLETENESS',
      severity: 'error',
      message: 'Valid contact email address is required.',
      tabTarget: 'basic',
      field: 'email'
    });
  } else {
    strengths.push({
      id: 'email-provided',
      category: 'CONTACT',
      message: 'Valid contact email format detected.'
    });
  }

  const hasPhone = Boolean(data.basicInfo?.phone?.trim());
  if (!hasPhone) {
    issues.push({
      id: 'missing-phone',
      category: 'COMPLETENESS',
      severity: 'warning',
      message: 'Phone number is recommended for recruiter follow-ups.',
      tabTarget: 'basic',
      field: 'phone'
    });
  }

  const hasTagline = Boolean(data.basicInfo?.tagline?.trim());
  if (!hasTagline) {
    issues.push({
      id: 'missing-tagline',
      category: 'STRUCTURE',
      severity: 'warning',
      message: 'Professional target title (e.g. Senior Software Engineer) helps ATS index your target role.',
      tabTarget: 'basic',
      field: 'tagline'
    });
  }

  const hasLocation = Boolean(data.basicInfo?.location?.trim());
  if (!hasLocation) {
    issues.push({
      id: 'missing-location',
      category: 'COMPLETENESS',
      severity: 'suggestion',
      message: 'Location or "Remote" helps matching localized or jurisdiction-specific roles.',
      tabTarget: 'basic',
      field: 'location'
    });
  }

  // Check URLs
  const checkUrl = (url: string | undefined, label: string, tab: string) => {
    if (!url || !url.trim()) return;
    const sanitized = sanitizeUrl(url);
    if (!sanitized) {
      issues.push({
        id: `invalid-url-${label.toLowerCase()}`,
        category: 'LINKS',
        severity: 'warning',
        message: `${label} appears malformed or contains unsupported schemes.`,
        tabTarget: tab
      });
    }
  };

  checkUrl(data.basicInfo?.website, 'Website', 'basic');
  checkUrl(data.basicInfo?.linkedin, 'LinkedIn', 'basic');
  checkUrl(data.basicInfo?.github, 'GitHub', 'basic');
  checkUrl(data.basicInfo?.portfolio, 'Portfolio', 'basic');

  if (data.links && data.links.length > 0) {
    data.links.forEach((l, i) => {
      checkUrl(l.url, l.label || `Link #${i + 1}`, 'links');
    });
  }

  // Summary analysis
  if (data.basicInfo?.summary?.trim()) {
    const summaryWords = data.basicInfo.summary.trim().split(/\s+/).length;
    totalWords += summaryWords;
    if (summaryWords < 15) {
      issues.push({
        id: 'short-summary',
        category: 'CONTENT',
        severity: 'suggestion',
        message: 'Professional summary is very brief. Consider summarizing key specializations and years of experience.',
        tabTarget: 'basic'
      });
    } else if (summaryWords > 120) {
      issues.push({
        id: 'long-summary',
        category: 'CONTENT',
        severity: 'suggestion',
        message: 'Professional summary exceeds 120 words. Keep it punchy for quick recruiter scanning.',
        tabTarget: 'basic'
      });
    }
  }

  // 2. Experience Analysis
  const expList = data.experience || [];
  const experienceCount = expList.filter(e => e.role?.trim() || e.org?.trim()).length;

  if (experienceCount === 0) {
    issues.push({
      id: 'missing-experience',
      category: 'STRUCTURE',
      severity: 'warning',
      message: 'No work experience added. Adding relevant roles or internships strongly improves ATS scoring.',
      tabTarget: 'experience'
    });
  } else {
    strengths.push({
      id: 'experience-present',
      category: 'EXPERIENCE',
      message: `${experienceCount} work experience ${experienceCount === 1 ? 'entry' : 'entries'} listed.`
    });

    expList.forEach((exp, idx) => {
      const expTitle = exp.role || `Experience #${idx + 1}`;
      if (!exp.role?.trim()) {
        issues.push({
          id: `exp-missing-role-${idx}`,
          category: 'COMPLETENESS',
          severity: 'error',
          message: `Experience #${idx + 1} is missing a Job Title.`,
          tabTarget: 'experience'
        });
      }
      if (!exp.org?.trim()) {
        issues.push({
          id: `exp-missing-org-${idx}`,
          category: 'COMPLETENESS',
          severity: 'error',
          message: `${expTitle} is missing Company / Organization name.`,
          tabTarget: 'experience'
        });
      }
      if (!exp.startDate?.trim() && !exp.endDate?.trim() && !exp.current) {
        issues.push({
          id: `exp-missing-dates-${idx}`,
          category: 'COMPLETENESS',
          severity: 'warning',
          message: `${expTitle} is missing dates of employment.`,
          tabTarget: 'experience'
        });
      }

      // Check bullets
      const bullets = (exp.bullets || []).filter(b => b.trim());
      totalBulletsCount += bullets.length;

      if (bullets.length === 0) {
        issues.push({
          id: `exp-no-bullets-${idx}`,
          category: 'CONTENT',
          severity: 'warning',
          message: `${expTitle} has no bullet points detailing achievements.`,
          tabTarget: 'experience'
        });
      } else {
        const seenBullets = new Set<string>();
        bullets.forEach((b, bIdx) => {
          const trimmed = b.trim();
          totalWords += trimmed.split(/\s+/).length;

          if (seenBullets.has(trimmed.toLowerCase())) {
            issues.push({
              id: `exp-dup-bullet-${idx}-${bIdx}`,
              category: 'FORMATTING',
              severity: 'warning',
              message: `Duplicate bullet detected in ${expTitle}.`,
              tabTarget: 'experience'
            });
          }
          seenBullets.add(trimmed.toLowerCase());

          // Metrics check (digits, %, $, X%, etc.)
          const hasMetrics = /\d+[%kKmMbB]?|\$[\d,]+|\b\d+x\b/i.test(trimmed);
          if (hasMetrics) {
            measurableBulletsCount++;
          }

          if (trimmed.length < 20) {
            issues.push({
              id: `exp-short-bullet-${idx}-${bIdx}`,
              category: 'CONTENT',
              severity: 'suggestion',
              message: `Bullet point in ${expTitle} is very short ("${trimmed.slice(0, 25)}..."). Expand on your specific action and outcome.`,
              tabTarget: 'experience'
            });
          } else if (trimmed.length > 300) {
            issues.push({
              id: `exp-long-bullet-${idx}-${bIdx}`,
              category: 'FORMATTING',
              severity: 'suggestion',
              message: `Bullet in ${expTitle} is over 300 characters. Split into concise sentences for readability.`,
              tabTarget: 'experience'
            });
          }
        });
      }
    });
  }

  // 3. Education Analysis
  const eduList = data.education || [];
  const educationCount = eduList.filter(e => e.institution?.trim() || e.degree?.trim()).length;

  if (educationCount === 0) {
    issues.push({
      id: 'missing-education',
      category: 'STRUCTURE',
      severity: 'warning',
      message: 'No education history listed. Adding your degree or school completes standard parser records.',
      tabTarget: 'education'
    });
  } else {
    strengths.push({
      id: 'education-present',
      category: 'EDUCATION',
      message: `${educationCount} education ${educationCount === 1 ? 'record' : 'records'} provided.`
    });

    eduList.forEach((edu, idx) => {
      if (!edu.institution?.trim()) {
        issues.push({
          id: `edu-missing-inst-${idx}`,
          category: 'COMPLETENESS',
          severity: 'error',
          message: `Education entry #${idx + 1} is missing an institution name.`,
          tabTarget: 'education'
        });
      }
      if (!edu.degree?.trim()) {
        issues.push({
          id: `edu-missing-degree-${idx}`,
          category: 'COMPLETENESS',
          severity: 'error',
          message: `Education entry #${idx + 1} is missing a degree or certificate name.`,
          tabTarget: 'education'
        });
      }
    });
  }

  // 4. Skills Analysis
  const skillList = (data.skills || []).map(s => s.trim()).filter(Boolean);
  const skillsCount = skillList.length;

  if (skillsCount === 0) {
    issues.push({
      id: 'missing-skills',
      category: 'STRUCTURE',
      severity: 'error',
      message: 'No skills added. ATS keyword parsers heavily rely on your skills inventory.',
      tabTarget: 'skills'
    });
  } else if (skillsCount < 5) {
    issues.push({
      id: 'few-skills',
      category: 'ATS_PARSER',
      severity: 'warning',
      message: `Only ${skillsCount} skills listed. We recommend adding at least 6–10 relevant technical or domain competencies.`,
      tabTarget: 'skills'
    });
  } else {
    strengths.push({
      id: 'skills-inventory',
      category: 'SKILLS',
      message: `${skillsCount} skills listed for ATS indexing.`
    });
  }

  // 5. Projects Analysis
  const projList = data.projects || [];
  const projectsCount = projList.filter(p => p.title?.trim()).length;

  projList.forEach((p, idx) => {
    if (p.title && !p.description && (!p.bullets || p.bullets.length === 0)) {
      issues.push({
        id: `proj-empty-desc-${idx}`,
        category: 'CONTENT',
        severity: 'suggestion',
        message: `Project "${p.title}" lacks a description or highlights.`,
        tabTarget: 'projects'
      });
    }
  });

  // Calculate Weighted Deterministic Scores
  // 1. Completeness Score (0-100)
  let completenessScore = 100;
  if (!hasFullName) completenessScore -= 30;
  if (!hasEmail) completenessScore -= 25;
  if (!hasPhone) completenessScore -= 15;
  if (!hasTagline) completenessScore -= 15;
  if (experienceCount === 0 && educationCount === 0) completenessScore -= 15;
  completenessScore = Math.max(0, Math.min(100, completenessScore));

  // 2. Content Quality Score (0-100)
  let contentQualityScore = 70;
  if (experienceCount > 0) contentQualityScore += 10;
  if (totalBulletsCount >= 3) contentQualityScore += 10;
  if (measurableBulletsCount >= 2) contentQualityScore += 10;
  if (issues.some(i => i.id.startsWith('exp-dup-bullet') || i.id.startsWith('exp-short-bullet'))) {
    contentQualityScore -= 10;
  }
  contentQualityScore = Math.max(0, Math.min(100, contentQualityScore));

  // 3. ATS Readiness Score (0-100)
  let atsReadinessScore = 50;
  if (hasFullName && hasEmail) atsReadinessScore += 20;
  if (hasTagline) atsReadinessScore += 10;
  if (skillsCount >= 5) atsReadinessScore += 10;
  if (skillsCount >= 8) atsReadinessScore += 5;
  if (experienceCount >= 1) atsReadinessScore += 5;
  atsReadinessScore = Math.max(0, Math.min(100, atsReadinessScore));

  // 4. Formatting Score (0-100)
  let formattingScore = 100;
  const formattingIssues = issues.filter(i => i.category === 'FORMATTING' || i.category === 'LINKS');
  formattingScore -= formattingIssues.length * 10;
  formattingScore = Math.max(0, Math.min(100, formattingScore));

  // Weighted Overall Score:
  // CONTENT QUALITY: 30%, STRUCTURE/ATS: 30%, COMPLETENESS: 25%, FORMATTING: 15%
  const overallScore = Math.round(
    contentQualityScore * 0.30 +
    atsReadinessScore * 0.30 +
    completenessScore * 0.25 +
    formattingScore * 0.15
  );

  let overallStatus: ResumeAnalysis['overallStatus'] = 'Incomplete';
  if (overallScore >= 85) overallStatus = 'Excellent';
  else if (overallScore >= 70) overallStatus = 'Good';
  else if (overallScore >= 50) overallStatus = 'Needs improvement';
  else overallStatus = 'Incomplete';

  return {
    score: overallScore,
    completenessScore,
    contentQualityScore,
    atsReadinessScore,
    formattingScore,
    overallStatus,
    issues,
    strengths,
    summary: {
      totalWords,
      experienceCount,
      educationCount,
      skillsCount,
      projectsCount,
      measurableBulletsCount,
      totalBulletsCount,
    }
  };
}

/**
 * Robust Job Description Keyword & Phrase Matcher
 * Utilizes stop-word filtering, technical dictionary normalization, compound phrase detection.
 */
export function matchJobDescription(data: PortfolioData, jobDescription: string): JobDescriptionMatch {
  if (!jobDescription || !jobDescription.trim()) {
    return {
      matchPercentage: 0,
      matchedKeywords: [],
      missingKeywords: [],
      matchedPhrases: [],
      missingPhrases: [],
      totalJdKeywords: 0,
      disclaimer: 'Only add skills or keywords that accurately describe your true experience.'
    };
  }

  // Compile entire resume searchable text
  const resumeTextParts: string[] = [
    data.basicInfo?.name || '',
    data.basicInfo?.tagline || '',
    data.basicInfo?.summary || '',
    ...(data.skills || []),
    ...(data.experience || []).flatMap(e => [e.role, e.org, ...(e.bullets || [])]),
    ...(data.education || []).flatMap(e => [e.institution, e.degree, e.field || '']),
    ...(data.projects || []).flatMap(p => [p.title, p.description || '', ...(p.tech || []), ...(p.bullets || [])]),
    ...(data.certifications || []).flatMap(c => [c.title, c.subtitle || '', c.description || '']),
    ...(data.achievements || []).flatMap(a => [a.title, a.issuer || '']),
    ...(data.publications || []).flatMap(pb => [pb.title, pb.subtitle || '', pb.description || '']),
    ...(data.customSections || []).flatMap(cs => [cs.name, ...(cs.items || []).flatMap(it => [it.title, it.subtitle || '', it.description || ''])])
  ];

  const fullResumeText = resumeTextParts.join(' ').toLowerCase();

  // 1. Detect Multi-Word Phrases in JD
  const jdLower = jobDescription.toLowerCase();
  const matchedPhrases: string[] = [];
  const missingPhrases: string[] = [];

  const commonMultiWordPhrases = [
    'react native', 'rest api', 'restful api', 'ci/cd', 'machine learning',
    'deep learning', 'data structures', 'system design', 'unit testing',
    'cloud computing', 'distributed systems', 'project management',
    'cross functional', 'front end', 'back end', 'full stack', 'test automation'
  ];

  commonMultiWordPhrases.forEach(phrase => {
    if (jdLower.includes(phrase)) {
      if (fullResumeText.includes(phrase)) {
        matchedPhrases.push(phrase);
      } else {
        missingPhrases.push(phrase);
      }
    }
  });

  // 2. Extract Single Keywords with Stop Word and Length Filtering
  const cleanTokens = jdLower
    .replace(/[^\w\s\+\#\.\/\-]/g, ' ')
    .split(/\s+/)
    .map(w => w.trim().replace(/^[\.\-\/]+|[\.\-\/]+$/g, ''))
    .filter(w => w.length >= 2 && !STOP_WORDS.has(w) && !/^\d+$/.test(w));

  // Deduplicate and normalize
  const normalizedKeywordsMap = new Map<string, string>(); // canonical -> original or best display

  cleanTokens.forEach(token => {
    const canonical = TECH_CANONICAL_MAP[token] || (token.length >= 3 ? token.charAt(0).toUpperCase() + token.slice(1) : token.toUpperCase());
    if (!STOP_WORDS.has(token) && !STOP_WORDS.has(canonical.toLowerCase())) {
      normalizedKeywordsMap.set(canonical, token);
    }
  });

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  normalizedKeywordsMap.forEach((origToken, canonicalName) => {
    const termVariations = [
      origToken.toLowerCase(),
      canonicalName.toLowerCase(),
      origToken.replace(/[\.\-]/g, ''),
    ];

    const isMatch = termVariations.some(term => {
      if (!term) return false;
      const regex = new RegExp(`(?<![a-z0-9])${escapeRegExp(term)}(?![a-z0-9])`, 'i');
      return regex.test(fullResumeText);
    });

    if (isMatch) {
      matchedKeywords.push(canonicalName);
    } else {
      missingKeywords.push(canonicalName);
    }
  });

  const totalJdKeywords = matchedKeywords.length + missingKeywords.length;
  const matchPercentage = totalJdKeywords > 0
    ? Math.round((matchedKeywords.length / totalJdKeywords) * 100)
    : 0;

  return {
    matchPercentage,
    matchedKeywords: matchedKeywords.slice(0, 20),
    missingKeywords: missingKeywords.slice(0, 16),
    matchedPhrases,
    missingPhrases,
    totalJdKeywords,
    disclaimer: 'Only add skills or keywords that accurately describe your true experience.'
  };
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
