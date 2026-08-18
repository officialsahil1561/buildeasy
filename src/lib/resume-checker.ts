import { PortfolioData } from '../types';
import { analyzeResume, matchJobDescription, ResumeAnalysis, JobDescriptionMatch } from './resume-analysis';

export type CheckStatus = 'PASS' | 'WARNING' | 'ERROR';

export interface CheckItem {
  id: string;
  category: 'CONTENT' | 'STRUCTURE' | 'ATS COMPATIBILITY' | 'LINKS' | 'FORMATTING' | 'COMPLETENESS';
  status: CheckStatus;
  message: string;
  tabTarget?: string;
}

export interface CheckReport {
  overallStatus: 'Excellent' | 'Good' | 'Needs improvement' | 'Incomplete';
  passedCount: number;
  totalCount: number;
  checks: CheckItem[];
}

/**
 * Adapter ensuring backwards compatibility with any existing components
 * while routing 100% of calculations to the single authoritative analyzeResume engine.
 */
export function checkResume(data: PortfolioData): CheckReport {
  const analysis = analyzeResume(data);

  const checks: CheckItem[] = [];

  // Add all strengths as PASS items
  analysis.strengths.forEach(s => {
    checks.push({
      id: s.id,
      category: 'CONTENT',
      status: 'PASS',
      message: s.message,
    });
  });

  // Add issues categorized by severity
  analysis.issues.forEach(issue => {
    let category: CheckItem['category'] = 'CONTENT';
    if (issue.category === 'ATS_PARSER') category = 'ATS COMPATIBILITY';
    else if (issue.category === 'LINKS') category = 'LINKS';
    else if (issue.category === 'FORMATTING') category = 'FORMATTING';
    else if (issue.category === 'COMPLETENESS') category = 'COMPLETENESS';
    else if (issue.category === 'STRUCTURE') category = 'STRUCTURE';

    checks.push({
      id: issue.id,
      category,
      status: issue.severity === 'error' ? 'ERROR' : 'WARNING',
      message: issue.message,
      tabTarget: issue.tabTarget,
    });
  });

  const passedCount = checks.filter(c => c.status === 'PASS').length;

  return {
    overallStatus: analysis.overallStatus,
    passedCount,
    totalCount: checks.length,
    checks,
  };
}

export { matchJobDescription };
export type { ResumeAnalysis, JobDescriptionMatch };
