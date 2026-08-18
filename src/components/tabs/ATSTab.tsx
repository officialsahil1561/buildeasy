import React, { useState, useMemo } from 'react';
import { PortfolioData } from '../../types';
import { analyzeResume, matchJobDescription } from '../../lib/resume-analysis';
import { TabType } from '../FormBuilder';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Search, 
  Sparkles, 
  Layers, 
  ArrowRight,
  Briefcase 
} from 'lucide-react';

interface ATSTabProps {
  data: PortfolioData;
  onNavigateToTab?: (tabId: TabType) => void;
}

export default function ATSTab({ data, onNavigateToTab }: ATSTabProps) {
  const [jobDescription, setJobDescription] = useState('');

  // 1. Single Authoritative Resume Analysis
  const analysis = useMemo(() => analyzeResume(data), [data]);

  // 2. Keyword & Phrase Matcher
  const jdMatch = useMemo(
    () => matchJobDescription(data, jobDescription),
    [data, jobDescription]
  );

  return (
    <div className="space-y-6 bg-white">
      {/* Overall Score Header */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              ATS Readiness & Content Audit
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <h2 className="text-3xl font-black text-slate-900">{analysis.score}%</h2>
              <span className="text-xs font-semibold text-slate-600">
                Status: <strong className="text-slate-900">{analysis.overallStatus}</strong>
              </span>
            </div>
          </div>
          <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${
            analysis.score >= 80 ? 'bg-emerald-100 text-emerald-800' :
            analysis.score >= 60 ? 'bg-blue-100 text-blue-800' :
            analysis.score >= 40 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
          }`}>
            {analysis.score >= 80 ? 'Strong Candidate' : analysis.score >= 60 ? 'Competitive' : 'Needs Optimization'}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-3">
          <div
            className={`h-full transition-all duration-500 ${
              analysis.score >= 80 ? 'bg-emerald-600' :
              analysis.score >= 60 ? 'bg-blue-600' :
              analysis.score >= 40 ? 'bg-amber-500' : 'bg-rose-500'
            }`}
            style={{ width: `${analysis.score}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed italic">
          ATS Readiness Score reflects resume structure, content completeness, formatting, and keyword alignment. It does not guarantee recruiter or ATS selection.
        </p>
      </div>

      {/* Sub Scores Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Completeness</span>
          <p className="text-lg font-bold text-slate-900">{analysis.completenessScore}%</p>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Impact & Metrics</span>
          <p className="text-lg font-bold text-slate-900">{analysis.contentQualityScore}%</p>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">ATS Structure</span>
          <p className="text-lg font-bold text-slate-900">{analysis.atsReadinessScore}%</p>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Formatting</span>
          <p className="text-lg font-bold text-slate-900">{analysis.formattingScore}%</p>
        </div>
      </div>

      {/* Issues & Strengths */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Content Recommendations ({analysis.issues.length})</h3>
        {analysis.issues.length === 0 ? (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            No major content or structure warnings found.
          </div>
        ) : (
          <div className="space-y-2">
            {analysis.issues.map((issue) => (
              <div 
                key={issue.id}
                className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                  issue.severity === 'error' ? 'bg-rose-50 border-rose-200 text-rose-900' :
                  issue.severity === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-900' :
                  'bg-blue-50 border-blue-200 text-blue-900'
                }`}
              >
                {issue.severity === 'error' ? <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" /> :
                 issue.severity === 'warning' ? <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" /> :
                 <InfoIcon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />}
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">{issue.category}</span>
                    {issue.tabTarget && onNavigateToTab && (
                      <button
                        type="button"
                        onClick={() => onNavigateToTab(issue.tabTarget as TabType)}
                        className="text-[10px] font-bold text-blue-700 hover:underline flex items-center gap-0.5 cursor-pointer"
                      >
                        Fix <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    )}
                  </div>
                  <p className="mt-0.5 leading-relaxed">{issue.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Target Job Description Matcher */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-slate-600" />
          Job Description Keyword Matcher
        </h3>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description text here to evaluate keyword and skill overlap..."
          className="w-full h-28 p-3 text-xs border border-slate-300 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
        />

        {jobDescription.trim() && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700">Keyword Alignment</span>
              <span className="text-xs font-bold text-slate-900">{jdMatch.matchPercentage}% Coverage</span>
            </div>
            
            {/* Matched */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1.5">
                Matched ({jdMatch.matchedKeywords.length})
              </span>
              <div className="flex flex-wrap gap-1">
                {jdMatch.matchedKeywords.map((kw, i) => (
                  <span key={i} className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing */}
            {jdMatch.missingKeywords.length > 0 && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1.5">
                  Missing ({jdMatch.missingKeywords.length})
                </span>
                <div className="flex flex-wrap gap-1">
                  {jdMatch.missingKeywords.map((kw, i) => (
                    <span key={i} className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-md">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <p className="text-[10px] text-slate-500 leading-relaxed italic">
              {jdMatch.disclaimer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}
