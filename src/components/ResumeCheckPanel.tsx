import React, { useState, useEffect } from 'react';
import { PortfolioData } from '../types';
import { checkResume, CheckReport, matchJobDescription } from '../lib/resume-checker';
import { ShieldCheck, X, AlertTriangle, CheckCircle2, AlertCircle, ArrowRight, Briefcase, Loader2 } from 'lucide-react';
import { TabType } from './FormBuilder';

interface ResumeCheckPanelProps {
  data: PortfolioData;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tabId: TabType) => void;
}

export default function ResumeCheckPanel({ data, isOpen, onClose, onNavigateToTab }: ResumeCheckPanelProps) {
  const [report, setReport] = useState<CheckReport | null>(null);
  const [activeTab, setActiveTab] = useState<'checks' | 'jd'>('checks');
  const [jdText, setJdText] = useState('');
  const [jdMatch, setJdMatch] = useState<{ matchedKeywords: string[]; missingKeywords: string[]; matchPercentage?: number; disclaimer?: string } | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsChecking(true);
      const timer = setTimeout(() => {
        setReport(checkResume(data));
        setIsChecking(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen, data]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleJdAnalyze = () => {
    if (!jdText.trim()) return;
    const res = matchJobDescription(data, jdText);
    setJdMatch({
      matchedKeywords: res.matchedKeywords,
      missingKeywords: res.missingKeywords,
      matchPercentage: res.matchPercentage,
      disclaimer: res.disclaimer,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm transition-opacity">
      <div className="w-full md:w-[400px] h-full bg-white shadow-2xl flex flex-col transform transition-transform animate-in slide-in-from-right-8 duration-300">
        
        {/* Header */}
        <div className="h-14 border-b border-[#E5E7EB] px-4 flex justify-between items-center bg-[#F9FAFB] shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2563EB]" />
            <h2 className="text-sm font-bold text-[#111827]">Resume Check</h2>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#6B7280] hover:bg-[#E5E7EB] rounded-md transition-colors cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-4 border-b border-[#E5E7EB] shrink-0">
          <button
            onClick={() => setActiveTab('checks')}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'checks' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            ATS & Content
          </button>
          <button
            onClick={() => setActiveTab('jd')}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'jd' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Job Description Match
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-white p-4">
          {isChecking && activeTab === 'checks' ? (
            <div className="flex flex-col items-center justify-center h-full text-[#6B7280] p-6 space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-[#2563EB]" />
              <p className="text-xs font-medium text-[#111827]">Analyzing your resume content...</p>
            </div>
          ) : activeTab === 'checks' && report ? (
            <div className="space-y-6">
              
              {/* Overall Status summary */}
              <div className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-4 text-center space-y-2">
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#6B7280]">Resume Readiness</p>
                <div className="flex justify-center items-center gap-2">
                  {report.overallStatus === 'Excellent' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                  {report.overallStatus === 'Good' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  {report.overallStatus === 'Needs improvement' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                  {report.overallStatus === 'Incomplete' && <AlertCircle className="w-5 h-5 text-rose-600" />}
                  <span className="text-sm font-bold text-[#111827]">{report.overallStatus}</span>
                </div>
                <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden mt-3">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      report.overallStatus === 'Excellent' ? 'bg-emerald-600' :
                      report.overallStatus === 'Good' ? 'bg-emerald-500' :
                      report.overallStatus === 'Needs improvement' ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.round((report.passedCount / Math.max(1, report.totalCount)) * 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#6B7280]">
                  {report.passedCount} of {report.totalCount} quality checks passed
                </p>
              </div>

              {/* Check list */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-[#111827] uppercase tracking-wider">All Checks</p>
                {report.checks.map((check) => (
                  <div 
                    key={check.id}
                    className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 transition-colors ${
                      check.status === 'PASS' ? 'border-emerald-100 bg-emerald-50/40 text-[#111827]' :
                      check.status === 'WARNING' ? 'border-amber-100 bg-amber-50/50 text-[#111827]' :
                      'border-rose-100 bg-rose-50/50 text-[#111827]'
                    }`}
                  >
                    {check.status === 'PASS' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                    {check.status === 'WARNING' && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
                    {check.status === 'ERROR' && <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[10px] uppercase tracking-wider text-[#6B7280]">{check.category}</span>
                        {check.tabTarget && (
                          <button
                            onClick={() => {
                              onNavigateToTab(check.tabTarget as TabType);
                              onClose();
                            }}
                            className="text-[10px] font-bold text-[#2563EB] hover:underline flex items-center gap-0.5"
                          >
                            Fix <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-[#374151]">{check.message}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ) : activeTab === 'jd' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#111827] flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#6B7280]" /> Job Description
                </label>
                <textarea
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Paste the job posting description here..."
                  className="w-full h-32 px-3 py-2 text-xs rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#111827] resize-none"
                />
                <button
                  onClick={handleJdAnalyze}
                  disabled={!jdText.trim()}
                  className="w-full py-2 bg-[#111827] text-white text-xs font-semibold rounded-lg hover:bg-[#374151] disabled:opacity-50 transition-colors cursor-pointer"
                >
                  Analyze Keyword Match
                </button>
                <p className="text-[10px] text-[#6B7280] text-center">Keywords are analyzed locally in your browser.</p>
              </div>

              {jdMatch && (
                <div className="space-y-4 pt-4 border-t border-[#E5E7EB] animate-in fade-in duration-200">
                  {/* Score badge */}
                  <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Keyword Coverage</span>
                      <h4 className="text-lg font-bold text-[#111827]">{jdMatch.matchPercentage}% Match</h4>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      (jdMatch.matchPercentage || 0) >= 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {jdMatch.matchedKeywords.length} / {jdMatch.matchedKeywords.length + jdMatch.missingKeywords.length} keywords
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-emerald-700 mb-2 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> MATCHED KEYWORDS ({jdMatch.matchedKeywords.length})
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {jdMatch.matchedKeywords.length > 0 ? jdMatch.matchedKeywords.map((kw, i) => (
                        <span key={i} className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-[10px] font-bold">
                          {kw}
                        </span>
                      )) : <p className="text-xs text-[#6B7280]">No matching keywords found.</p>}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-amber-700 mb-2 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> MISSING KEYWORDS ({jdMatch.missingKeywords.length})
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {jdMatch.missingKeywords.length > 0 ? jdMatch.missingKeywords.map((kw, i) => (
                        <span key={i} className="px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-[10px] font-bold">
                          {kw}
                        </span>
                      )) : <p className="text-xs text-[#6B7280]">All key terms matched!</p>}
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-lg text-[11px] text-amber-900 leading-relaxed font-medium">
                    ⚠️ <strong>Important Note:</strong> {jdMatch.disclaimer || 'Only add keywords that accurately reflect your experience.'}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
