import { PortfolioData } from '../types';
import { containsTerm } from './utils';

export type CheckStatus = 'PASS' | 'WARNING' | 'ERROR';

export interface CheckItem {
  id: string;
  category: 'CONTENT' | 'STRUCTURE' | 'ATS COMPATIBILITY' | 'LINKS' | 'FORMATTING' | 'COMPLETENESS';
  status: CheckStatus;
  message: string;
  tabTarget?: string; // e.g. 'basic', 'experience'
}

export interface CheckReport {
  overallStatus: 'Excellent' | 'Good' | 'Needs improvement' | 'Incomplete';
  passedCount: number;
  totalCount: number;
  checks: CheckItem[];
}

export function checkResume(data: PortfolioData): CheckReport {
  const checks: CheckItem[] = [];

  // 1. CONTENT
  // Basic info
  if (data.basicInfo.name || (data.basicInfo.firstName && data.basicInfo.lastName)) {
    checks.push({ id: 'name-exists', category: 'CONTENT', status: 'PASS', message: 'Name is provided.' });
  } else {
    checks.push({ id: 'name-missing', category: 'CONTENT', status: 'ERROR', message: 'Name is missing.', tabTarget: 'basic' });
  }

  if (data.basicInfo.tagline) {
    checks.push({ id: 'title-exists', category: 'CONTENT', status: 'PASS', message: 'Professional title is provided.' });
  } else {
    checks.push({ id: 'title-missing', category: 'CONTENT', status: 'ERROR', message: 'Professional title is missing.', tabTarget: 'basic' });
  }

  if (data.basicInfo.email) {
    checks.push({ id: 'email-exists', category: 'CONTENT', status: 'PASS', message: 'Email address is provided.' });
  } else {
    checks.push({ id: 'email-missing', category: 'CONTENT', status: 'ERROR', message: 'Email address is missing.', tabTarget: 'basic' });
  }

  if (data.basicInfo.phone) {
    checks.push({ id: 'phone-exists', category: 'CONTENT', status: 'PASS', message: 'Phone number is provided.' });
  } else {
    checks.push({ id: 'phone-missing', category: 'CONTENT', status: 'ERROR', message: 'Phone number is missing.', tabTarget: 'basic' });
  }

  if (data.basicInfo.location) {
    checks.push({ id: 'location-exists', category: 'CONTENT', status: 'PASS', message: 'Location is provided.' });
  } else {
    checks.push({ id: 'location-missing', category: 'CONTENT', status: 'ERROR', message: 'Location is missing.', tabTarget: 'basic' });
  }

  // Links
  if (data.links && data.links.length > 0) {
    checks.push({ id: 'pro-links', category: 'CONTENT', status: 'PASS', message: 'At least one professional link is provided.' });
  } else {
    checks.push({ id: 'pro-links-missing', category: 'CONTENT', status: 'ERROR', message: 'No professional links provided.', tabTarget: 'links' });
  }

  // Experience
  if (data.experience && data.experience.length > 0) {
    checks.push({ id: 'exp-exists', category: 'CONTENT', status: 'PASS', message: 'Experience section has entries.' });
  } else {
    checks.push({ id: 'exp-missing', category: 'CONTENT', status: 'ERROR', message: 'No work experience added.', tabTarget: 'experience' });
  }

  // Education
  if (data.education && data.education.length > 0) {
    checks.push({ id: 'edu-exists', category: 'CONTENT', status: 'PASS', message: 'Education section has entries.' });
  } else {
    checks.push({ id: 'edu-missing', category: 'CONTENT', status: 'ERROR', message: 'No education history added.', tabTarget: 'education' });
  }

  // Skills
  if (data.skills && data.skills.length > 0) {
    checks.push({ id: 'skills-exists', category: 'CONTENT', status: 'PASS', message: 'Skills section has entries.' });
  } else {
    checks.push({ id: 'skills-missing', category: 'CONTENT', status: 'ERROR', message: 'No skills added.', tabTarget: 'skills' });
  }

  // Projects (Not strict error)
  if (data.projects && data.projects.length > 0) {
    checks.push({ id: 'proj-exists', category: 'CONTENT', status: 'PASS', message: 'Projects section has entries.' });
  }

  // 2. EXPERIENCE QUALITY
  data.experience.forEach((exp, idx) => {
    if (!exp.org) checks.push({ id: `exp-org-${idx}`, category: 'COMPLETENESS', status: 'ERROR', message: `Experience #${idx + 1} is missing a company name.`, tabTarget: 'experience' });
    if (!exp.role) checks.push({ id: `exp-role-${idx}`, category: 'COMPLETENESS', status: 'ERROR', message: `Experience #${idx + 1} is missing a job title.`, tabTarget: 'experience' });
    if (!exp.startDate && !exp.endDate) checks.push({ id: `exp-date-${idx}`, category: 'COMPLETENESS', status: 'ERROR', message: `Experience #${idx + 1} is missing dates.`, tabTarget: 'experience' });
    if (!exp.bullets || exp.bullets.length === 0 || exp.bullets.every(b => !b.trim())) {
      checks.push({ id: `exp-bullets-${idx}`, category: 'COMPLETENESS', status: 'ERROR', message: `Experience #${idx + 1} has no bullet points.`, tabTarget: 'experience' });
    } else {
      let shortBullets = 0;
      let longBullets = 0;
      let emptyBullets = 0;
      let nonMeasurable = 0;

      const bulletSet = new Set<string>();

      exp.bullets.forEach((b, bIdx) => {
        const text = b.trim();
        if (!text) {
          emptyBullets++;
          return;
        }
        if (text.length < 15) shortBullets++;
        if (text.length > 250) longBullets++;
        
        if (bulletSet.has(text)) {
          checks.push({ id: `exp-dup-${idx}-${bIdx}`, category: 'FORMATTING', status: 'WARNING', message: `Experience #${idx + 1} has duplicated bullet points.`, tabTarget: 'experience' });
        }
        bulletSet.add(text);

        // Very basic measurable check (contains numbers, %, $, etc.)
        if (!/\d/.test(text) && !/%/.test(text) && !/\$/.test(text)) {
          nonMeasurable++;
        }
      });

      if (emptyBullets > 0) {
        checks.push({ id: `exp-empty-${idx}`, category: 'COMPLETENESS', status: 'WARNING', message: `Experience #${idx + 1} has empty bullet points.`, tabTarget: 'experience' });
      }
      if (shortBullets > 0) {
        checks.push({ id: `exp-short-${idx}`, category: 'FORMATTING', status: 'WARNING', message: `Experience #${idx + 1} has ${shortBullets} very short bullet(s). Expand on your impact.`, tabTarget: 'experience' });
      }
      if (longBullets > 0) {
        checks.push({ id: `exp-long-${idx}`, category: 'FORMATTING', status: 'WARNING', message: `Experience #${idx + 1} has excessively long bullets. Consider breaking them down.`, tabTarget: 'experience' });
      }
      if (nonMeasurable > 0 && exp.bullets.length > 0) {
        checks.push({ id: `exp-measure-${idx}`, category: 'CONTENT', status: 'WARNING', message: `Experience #${idx + 1} has ${nonMeasurable} bullet(s) without measurable results (numbers, metrics).`, tabTarget: 'experience' });
      }
    }
  });

  // 3. PROJECT CHECKS
  data.projects.forEach((proj, idx) => {
    if (!proj.title) checks.push({ id: `proj-title-${idx}`, category: 'COMPLETENESS', status: 'ERROR', message: `Project #${idx + 1} is missing a name.`, tabTarget: 'projects' });
    if (!proj.description) checks.push({ id: `proj-desc-${idx}`, category: 'COMPLETENESS', status: 'WARNING', message: `Project '${proj.title || `Project #${idx + 1}`}' has no description.`, tabTarget: 'projects' });
    if (!proj.tech || proj.tech.length === 0 || proj.tech.every(t => !t.trim())) {
      checks.push({ id: `proj-tech-${idx}`, category: 'COMPLETENESS', status: 'WARNING', message: `Project '${proj.title || `Project #${idx + 1}`}' has no technology tags.`, tabTarget: 'projects' });
    }
    if (proj.link) {
      if (!isValidUrl(proj.link)) {
        checks.push({ id: `proj-link-${idx}`, category: 'LINKS', status: 'WARNING', message: `Project URL for '${proj.title || `Project #${idx + 1}`}' appears invalid.`, tabTarget: 'projects' });
      }
    }
  });

  // 4. CERTIFICATIONS & PUBLICATIONS QUALITY
  if (data.certifications && data.certifications.length > 0) {
    data.certifications.forEach((cert, idx) => {
      if (!cert.title || !cert.title.trim()) {
        checks.push({
          id: `cert-title-empty-${idx}`,
          category: 'COMPLETENESS',
          status: 'WARNING',
          message: `Certification #${idx + 1} is missing a title.`,
          tabTarget: 'certifications',
        });
      }
    });
  }
  if (data.publications && data.publications.length > 0) {
    data.publications.forEach((pub, idx) => {
      if (!pub.title || !pub.title.trim()) {
        checks.push({
          id: `pub-title-empty-${idx}`,
          category: 'COMPLETENESS',
          status: 'WARNING',
          message: `Publication #${idx + 1} is missing a title.`,
          tabTarget: 'publications',
        });
      }
    });
  }

  // 5. SKILLS CHECK
  const skillSet = new Set<string>();
  data.skills.forEach((skill, idx) => {
    if (skillSet.has(skill.toLowerCase())) {
      checks.push({ id: `skill-dup-${idx}`, category: 'CONTENT', status: 'WARNING', message: `'${skill}' appears multiple times in your skills.`, tabTarget: 'skills' });
    }
    skillSet.add(skill.toLowerCase());
  });

  // 5. ATS STRUCTURE CHECK
  checks.push({ id: 'ats-structure', category: 'ATS COMPATIBILITY', status: 'PASS', message: 'Template is designed for ATS-friendly parsing with standard sections and real text.' });

  // 6. PDF CHECK
  checks.push({ id: 'pdf-check', category: 'ATS COMPATIBILITY', status: 'PASS', message: 'PDF export mechanism uses native text selection (no flattened images).' });

  // 7. LINK CHECK
  data.links.forEach((link, idx) => {
    if (!link.url || link.url.trim() === '') {
      checks.push({ id: `link-empty-${idx}`, category: 'LINKS', status: 'WARNING', message: `Link '${link.label || 'entry'}' has an empty URL.`, tabTarget: 'links' });
    } else if (!isValidUrl(link.url)) {
      checks.push({ id: `link-invalid-${idx}`, category: 'LINKS', status: 'WARNING', message: `Link '${link.label || 'entry'}' has an invalid format. Use http/https/mailto/tel.`, tabTarget: 'links' });
    } else {
      checks.push({ id: `link-pass-${idx}`, category: 'LINKS', status: 'PASS', message: `Link '${link.label || 'entry'}' is structurally valid.` });
    }
  });

  // 8. PLACEHOLDER DETECTION
  const placeholderPatterns = [
    /Jane Doe/i,
    /John Doe/i,
    /Alex Morgan/i,
    /First Last/i,
    /example\.com/i,
    /jane\.doe@example\.com/i,
    /example@gmail\.com/i,
    /555-555/i,
    /555-019-2834/i,
    /Lorem ipsum/i,
    /Your Name/i,
    /Company Name/i,
    /University Name/i,
    /State University/i,
    /Innovate Tech Corp/i,
    /alex\.morgan/i
  ];
  
  const resumeJson = JSON.stringify(data);
  for (const pattern of placeholderPatterns) {
    if (pattern.test(resumeJson)) {
      checks.push({ id: 'placeholder-detected', category: 'CONTENT', status: 'ERROR', message: 'Replace sample placeholder text with your actual personal details before applying.', tabTarget: 'basic' });
      break;
    }
  }

  // Deduplicate PASS checks to avoid flooding the UI with redundant successes
  const uniquePasses = new Map<string, CheckItem>();
  const finalChecks: CheckItem[] = [];
  
  checks.forEach(check => {
    if (check.status === 'PASS') {
      // Group similar passes if needed, or just keep them unique by ID
      uniquePasses.set(check.id, check);
    } else {
      finalChecks.push(check);
    }
  });

  Array.from(uniquePasses.values()).forEach(p => finalChecks.push(p));

  const passedCount = finalChecks.filter(c => c.status === 'PASS').length;
  const totalCount = finalChecks.length;
  const errorCount = finalChecks.filter(c => c.status === 'ERROR').length;
  const warningCount = finalChecks.filter(c => c.status === 'WARNING').length;

  let overallStatus: CheckReport['overallStatus'] = 'Excellent';
  if (errorCount > 0) {
    if (errorCount > 3) overallStatus = 'Incomplete';
    else overallStatus = 'Needs improvement';
  } else if (warningCount > 0) {
    if (warningCount > 3) overallStatus = 'Needs improvement';
    else overallStatus = 'Good';
  }

  return {
    overallStatus,
    passedCount,
    totalCount,
    checks: finalChecks.sort((a, b) => {
      const order = { ERROR: 0, WARNING: 1, PASS: 2 };
      return order[a.status] - order[b.status];
    }),
  };
}

function isValidUrl(string: string): boolean {
  const trimmed = string.trim();
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('data:') ||
    lower.startsWith('vbscript:') ||
    lower.startsWith('file:')
  ) {
    return false;
  }
  if (lower.startsWith('mailto:') || lower.startsWith('tel:')) return true;
  
  try {
    const url = new URL(trimmed);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    // Tolerant check for standard domain-like names (e.g. github.com/user)
    return /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(trimmed);
  }
}

// JD Matching
export function matchJobDescription(resumeData: PortfolioData, jobDescription: string) {
  const commonTechSkills = [
    'React', 'TypeScript', 'Node.js', 'JavaScript', 'Python', 'Java', 'C++', 'C#',
    'F#', '.NET', '.NET Core', 'ASP.NET', 'ASP.NET Core', 'Objective-C', 'Objective-C++',
    'C/C++', 'C++17', 'C++20', 'CMake', 'Vue.js', 'Next.js', 'Nuxt.js', 'Angular',
    'AWS', 'AWS Lambda', 'Amazon S3', 'Azure', 'GCP', 'Docker', 'Kubernetes',
    'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST API', 'GitHub Actions',
    'Agile', 'Scrum', 'Figma', 'UI/UX', 'Machine Learning', 'Data Science',
    'Ruby', 'PHP', 'Swift', 'Kotlin', 'Android', 'iOS', 'Tailwind',
    'CSS', 'HTML', 'Git', 'CI/CD', 'Linux', 'Bash', 'Salesforce', 'Jira', 'Project Management',
    'Leadership', 'Communication', 'Problem Solving', 'Collaboration', 'Unit Testing'
  ];

  if (!jobDescription || !jobDescription.trim()) {
    return { matched: [], missing: [], matchPercentage: 0, disclaimer: '' };
  }

  const extractedKeywords = commonTechSkills.filter(skill => containsTerm(jobDescription, skill));
  const resumeBlob = JSON.stringify(resumeData);

  const matched: string[] = [];
  const missing: string[] = [];

  extractedKeywords.forEach(kw => {
    if (containsTerm(resumeBlob, kw)) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  });

  const total = matched.length + missing.length;
  const matchPercentage = total > 0 ? Math.round((matched.length / total) * 100) : 100;
  const disclaimer = 'Only add keywords that accurately reflect your experience.';

  return { matched, missing, matchPercentage, disclaimer };
}
