import React, { useState, useEffect } from 'react';
import { PortfolioData } from '../types';
import { checkResume, CheckReport, matchJobDescription } from '../lib/resume-checker';
import { ShieldCheck, X, AlertTriangle, CheckCircle2, AlertCircle, ArrowRight, Briefcase } from 'lucide-react';
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
  const [jdMatch, setJdMatch] = useState<{ matched: string[]; missing: string[] } | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsChecking(true);
      // Simulate a small delay so it doesn't feel instantaneous/fake, but not too long.
      const timer = setTimeout(() => {
        setReport(checkResume(data));
        setIsChecking(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen, data]);

  const handleJdAnalyze = () => {
    if (!jdText.trim()) return;
    setJdMatch(matchJobDescription(data, jdText));
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
          <button onClick={onClose} className="p-1.5 text-[#6B7280] hover:bg-[#E5E7EB] rounded-md transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-4 border-b border-[#E5E7EB] shrink-0">
          <button
            onClick={() => setActiveTab('checks')}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors ${
              activeTab === 'checks' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            ATS & Content
          </button>
          <button
            onClick={() => setActiveTab('jd')}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors ${
              activeTab === 'jd' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Job Description Match
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-white p-4">
          {isChecking && activeTab === 'checks' ? (
            <div className="flex flex-col items-center justify-center h-full text-[#6B7280] p-6 space-y-4">
              <div className="w-[140px] h-[140px] flex items-center justify-center">
                {/* @ts-ignore */}
                <dotlottie-wc
                  src="https://lottie.host/90b8f637-0021-46aa-882c-661c6299ea46/reLdmA02iY.lottie"
                  style={{ width: '140px', height: '140px' }}
                  autoplay
                  loop
                ></dotlottie-wc>
              </div>
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
                  <h3 className={`text-xl font-bold ${
                    report.overallStatus === 'Excellent' ? 'text-emerald-700' :
                    report.overallStatus === 'Good' ? 'text-emerald-600' :
                    report.overallStatus === 'Needs improvement' ? 'text-amber-600' :
                    'text-rose-600'
                  }`}>
                    {report.overallStatus}
                  </h3>
                </div>
                <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden mt-3">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      report.overallStatus === 'Excellent' ? 'bg-emerald-500' :
                      report.overallStatus === 'Good' ? 'bg-emerald-400' :
                      report.overallStatus === 'Needs improvement' ? 'bg-amber-400' :
                      'bg-rose-500'
                    }`}
                    style={{ width: `${(report.passedCount / report.totalCount) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-[#4B5563] pt-1">
                  <span className="font-bold text-[#111827]">{report.passedCount}</span> of {report.totalCount} checks passed
                </p>
              </div>

              {/* Actionable List */}
              <div className="space-y-3">
                {report.checks.map((check) => (
                  <div key={check.id} className="flex gap-3 items-start p-3 rounded-lg border border-[#E5E7EB] bg-white shadow-sm">
                    <div className="shrink-0 mt-0.5">
                      {check.status === 'PASS' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      {check.status === 'WARNING' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                      {check.status === 'ERROR' && <AlertCircle className="w-4 h-4 text-rose-500" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-xs text-[#111827] font-medium leading-snug">{check.message}</p>
                      {check.status !== 'PASS' && check.tabTarget && (
                        <button 
                          onClick={() => {
                            onNavigateToTab(check.tabTarget as TabType);
                            onClose();
                          }}
                          className="text-[11px] font-bold text-[#2563EB] hover:underline flex items-center gap-1 mt-1"
                        >
                          {check.status === 'ERROR' ? 'Fix issue' : 'Review'} <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ) : activeTab === 'jd' ? (
            <div className="space-y-4">
              {!jdMatch && (
                <div className="flex flex-col items-center justify-center p-5 bg-[#F9FAFB] rounded-xl border border-dashed border-[#E5E7EB] mb-4">
                  <div className="w-[100px] h-[100px] flex items-center justify-center">
                    {/* @ts-ignore */}
                    <dotlottie-wc
                      src="https://lottie.host/90b8f637-0021-46aa-882c-661c6299ea46/reLdmA02iY.lottie"
                      style={{ width: '100px', height: '100px' }}
                      autoplay
                      loop
                    ></dotlottie-wc>
                  </div>
                  <p className="text-xs font-bold text-[#111827] mt-1">Local Keyword Matcher</p>
                  <p className="text-[10px] text-center text-[#6B7280] max-w-[220px] mt-1 leading-relaxed">
                    Paste a target job description below to check your resume match rate and scan for missing keywords.
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#111827] flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#6B7280]" /> Job Description
                </label>
                <textarea
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Paste the job description here..."
                  className="w-full h-32 px-3 py-2 text-xs rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#0F172A] resize-none"
                />
                <button
                  onClick={handleJdAnalyze}
                  disabled={!jdText.trim()}
                  className="w-full py-2 bg-[#0F172A] text-white text-xs font-semibold rounded-lg hover:bg-[#1E293B] disabled:opacity-50 transition-colors"
                >
                  Analyze Match
                </button>
                <p className="text-[10px] text-[#6B7280] text-center">We analyze keywords locally. Your data is not sent to external servers.</p>
              </div>

              {jdMatch && (
                <div className="space-y-4 pt-4 border-t border-[#E5E7EB]">
                  <div>
                    <h4 className="text-xs font-bold text-emerald-700 mb-2 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> MATCHED KEYWORDS
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {jdMatch.matched.length > 0 ? jdMatch.matched.map((kw, i) => (
                        <span key={i} className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-[10px] font-bold">
                          {kw}
                        </span>
                      )) : <p className="text-xs text-[#6B7280]">No matching keywords found.</p>}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-amber-700 mb-2 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> MISSING KEYWORDS
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {jdMatch.missing.length > 0 ? jdMatch.missing.map((kw, i) => (
                        <span key={i} className="px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-[10px] font-bold">
                          {kw}
                        </span>
                      )) : <p className="text-xs text-[#6B7280]">All key terms matched!</p>}
                    </div>
                    <p className="text-[10px] text-[#6B7280] mt-2 leading-relaxed">
                      These terms appear in the job description but not in your resume. Consider mentioning them <strong>if you genuinely have this experience</strong>. Do not add skills you don't possess.
                    </p>
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
