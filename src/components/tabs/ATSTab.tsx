import React, { useState, useMemo } from 'react';
import { PortfolioData } from '../../types';
import { ShieldCheck, CheckCircle2, AlertTriangle, Sparkles, Search } from 'lucide-react';

interface ATSTabProps {
  data: PortfolioData;
}

export default function ATSTab({ data }: ATSTabProps) {
  const [jobDescription, setJobDescription] = useState('');

  // Calculate ATS metrics
  const analysis = useMemo(() => {
    let score = 50;
    const checks: { label: string; pass: boolean; feedback: string }[] = [];

    // Check name
    const hasName = Boolean(data.basicInfo?.name?.trim());
    checks.push({
      label: 'Full Name and Professional Title',
      pass: hasName,
      feedback: hasName ? 'Clear identification present.' : 'Add your full name so systems can index your application.',
    });
    if (hasName) score += 10;

    // Check email
    const hasEmail = Boolean(data.basicInfo?.email?.includes('@'));
    checks.push({
      label: 'Direct Contact Email',
      pass: hasEmail,
      feedback: hasEmail ? 'Valid email format found.' : 'Provide a direct email address.',
    });
    if (hasEmail) score += 10;

    // Check experience
    const hasExp = (data.experience || []).length > 0;
    checks.push({
      label: 'Chronological Work Experience',
      pass: hasExp,
      feedback: hasExp ? `${data.experience.length} work experience entries detected.` : 'Add at least one work position or internship.',
    });
    if (hasExp) score += 10;

    // Check education
    const hasEdu = (data.education || []).length > 0;
    checks.push({
      label: 'Education Record',
      pass: hasEdu,
      feedback: hasEdu ? 'Degree and institution present.' : 'Add your highest education or university.',
    });
    if (hasEdu) score += 10;

    // Check skills
    const hasSkills = (data.skills || []).length >= 4;
    checks.push({
      label: 'Targeted Skills Inventory',
      pass: hasSkills,
      feedback: hasSkills ? `${data.skills.length} skills listed.` : 'Add at least 4 key skills for ATS keyword matching.',
    });
    if (hasSkills) score += 10;

    // Keyword analysis if job description is provided
    let matchedKeywords: string[] = [];
    let missingKeywords: string[] = [];
    if (jobDescription.trim()) {
      const words = jobDescription
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 3);
      
      const uniqueWords = Array.from(new Set(words));
      const resumeText = JSON.stringify(data).toLowerCase();

      matchedKeywords = uniqueWords.filter((w) => resumeText.includes(w)).slice(0, 10);
      missingKeywords = uniqueWords.filter((w) => !resumeText.includes(w)).slice(0, 8);
    }

    return {
      score: Math.min(score, 100),
      checks,
      matchedKeywords,
      missingKeywords,
    };
  }, [data, jobDescription]);

  return (
    <div className="p-4 md:p-6 space-y-6 bg-white">
      {/* Score Header */}
      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">ATS Readiness Score</span>
          <h3 className="text-2xl font-bold text-[#0F172A] mt-0.5">{analysis.score}% Compatible</h3>
          <p className="text-xs text-gray-500 mt-1">
            {analysis.score >= 80 ? 'Excellent formatting & keyword readiness.' : 'Complete missing sections to boost parser score.'}
          </p>
        </div>
        <div className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center font-bold text-emerald-700 text-lg">
          {analysis.score}%
        </div>
      </div>

      {/* Compliance Checklist */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
          ATS System Parser Checklist
        </label>
        <div className="space-y-2.5">
          {analysis.checks.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 bg-[#FAFAFA]">
              {item.pass ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="text-xs font-bold text-[#111827]">{item.label}</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">{item.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Job Description Keyword Scanner */}
      <div className="border-t border-gray-200 pt-6">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5 text-blue-600" /> Job Description Keyword Scanner
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Paste the job posting description to check keyword alignment with your resume.
        </p>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description (e.g. Senior Frontend Engineer responsible for React, TypeScript, GraphQL...)"
          className="w-full h-28 border border-gray-300 rounded-xl p-3 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-black resize-none"
        />

        {jobDescription.trim() && (
          <div className="mt-4 space-y-3">
            {analysis.matchedKeywords.length > 0 && (
              <div>
                <span className="text-[11px] font-bold text-emerald-700">Matched Keywords ({analysis.matchedKeywords.length})</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {analysis.matchedKeywords.map((kw) => (
                    <span key={kw} className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-medium">
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {analysis.missingKeywords.length > 0 && (
              <div>
                <span className="text-[11px] font-bold text-gray-600">Consider Adding Keywords ({analysis.missingKeywords.length})</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {analysis.missingKeywords.map((kw) => (
                    <span key={kw} className="bg-gray-100 text-gray-700 border border-gray-200 px-2 py-0.5 rounded text-[11px]">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
