import React from 'react';
import { PortfolioData } from '../types';
import { getSectionStyle, getRootStyles } from '../lib/template-helpers';
import { ResumeSection, EntryHeader, EntryBullets } from './common/ResumePrimitives';

export default function TemplateCompact({ data }: { data: PortfolioData }) {
  const { basicInfo, links, education, experience, projects, skills, skillCategories, achievements } = data;

  const displayName = basicInfo.name || `${basicInfo.firstName || ''} ${basicInfo.lastName || ''}`.trim() || 'Your Name';
  const displayTitle = basicInfo.tagline || '';
  const displayEmail = basicInfo.email || '';
  const displayLocation = basicInfo.location || '';
  const displayWebsite = basicInfo.website || '';
  const displayPhone = basicInfo.phone || '';
  const displaySummary = basicInfo.summary || '';

  const formatUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  const getLinkLabel = (url: string, label?: string) => {
    if (label && label.trim()) return label;
    const lower = url.toLowerCase();
    if (lower.includes('github')) return 'GitHub';
    if (lower.includes('linkedin')) return 'LinkedIn';
    if (lower.includes('twitter') || lower.includes('x.com')) return 'X / Twitter';
    if (lower.includes('portfolio') || lower.includes('site')) return 'Portfolio';
    return 'Website';
  };

  const contactItems: React.ReactNode[] = [];
  if (displayLocation) contactItems.push(<span key="loc">{displayLocation}</span>);
  if (displayPhone) contactItems.push(<span key="phone">{displayPhone}</span>);
  if (displayEmail) {
    contactItems.push(
      <a key="email" href={`mailto:${displayEmail}`} className="hover:underline">
        {displayEmail}
      </a>
    );
  }
  if (displayWebsite) {
    contactItems.push(
      <a key="web" href={displayWebsite.startsWith('http') ? displayWebsite : `https://${displayWebsite}`} target="_blank" rel="noreferrer" className="hover:underline">
        {formatUrl(displayWebsite)}
      </a>
    );
  }
  if (basicInfo.linkedin) {
    contactItems.push(
      <a key="li" href={basicInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline font-bold">
        LinkedIn
      </a>
    );
  }
  if (basicInfo.github) {
    contactItems.push(
      <a key="gh" href={basicInfo.github} target="_blank" rel="noreferrer" className="hover:underline font-bold">
        GitHub
      </a>
    );
  }
  if (basicInfo.portfolio) {
    contactItems.push(
      <a key="port" href={basicInfo.portfolio} target="_blank" rel="noreferrer" className="hover:underline font-bold">
        Portfolio
      </a>
    );
  }
  links.forEach((l, i) => {
    contactItems.push(
      <a key={`link-${i}`} href={l.url} target="_blank" rel="noreferrer" className="hover:underline font-bold">
        {getLinkLabel(l.url, l.label)}
      </a>
    );
  });

  return (
    <div className="bg-white text-gray-900 font-sans p-6 md:p-8 max-w-4xl mx-auto min-h-[1050px] select-text text-[9.5pt] leading-snug" style={getRootStyles(data.customization, data.accentColor)}>
      
      <header className="mb-4 flex flex-col items-start border-b-2 border-gray-900 pb-2">
        <div className="flex w-full justify-between items-end">
          <div>
            <h1 className="text-[18pt] font-black uppercase text-gray-900 tracking-tight leading-none">
              {displayName}
            </h1>
            {displayTitle && (
              <p className="text-[10pt] font-bold text-gray-700 mt-1 uppercase">
                {displayTitle}
              </p>
            )}
          </div>
          <div className="text-[8.5pt] text-gray-700 text-right flex flex-col items-end">
            <div className="flex flex-wrap gap-x-1.5 justify-end">
              {contactItems.map((item, index) => (
                <React.Fragment key={index}>
                  {item}
                  {index < contactItems.length - 1 && <span className="text-gray-300">•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-3">
        
        {displaySummary && (
          <ResumeSection title="Summary" style={getSectionStyle('summary', data.customization)} titleClassName="text-[10pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5" className="space-y-1">
            <p className="text-[9pt] text-gray-800 leading-snug">
              {displaySummary}
            </p>
          </ResumeSection>
        )}

        {experience.length > 0 && (
          <ResumeSection title="Experience" style={getSectionStyle('experience', data.customization)} titleClassName="text-[10pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5" className="space-y-1">
            <div className="space-y-2 pt-0.5">
              {experience.map((exp, idx) => (
                <div key={idx} className="space-y-0.5">
                  <EntryHeader
                    left={
                      <div>
                        <strong className="text-[9.5pt] text-gray-900">{exp.role}</strong>
                        <span className="text-[9.5pt] text-gray-800 font-semibold">, {exp.org}</span>
                        {exp.location && <span className="text-gray-500 text-[8.5pt] ml-1">({exp.location})</span>}
                      </div>
                    }
                    right={`${exp.startDate} – ${exp.endDate}`}
                    rightClassName="text-[8.5pt] text-gray-700 font-medium shrink-0"
                  />
                  {exp.bullets.length > 0 && <EntryBullets bullets={exp.bullets} className="list-disc list-outside ml-4 space-y-0.5 text-[8.5pt] text-gray-800 leading-tight" />}
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {education.length > 0 && (
          <ResumeSection title="Education" style={getSectionStyle('education', data.customization)} titleClassName="text-[10pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5" className="space-y-1">
            <div className="space-y-1.5 pt-0.5">
              {education.map((edu, idx) => (
                <div key={idx} className="space-y-0.5">
                  <EntryHeader
                    left={
                      <div>
                        <strong className="text-[9.5pt] text-gray-900">{edu.institution}</strong>
                        {edu.location && <span className="text-gray-500 text-[8.5pt] ml-1">({edu.location})</span>}
                      </div>
                    }
                    right={`${edu.startDate} – ${edu.endDate}`}
                    rightClassName="text-[8.5pt] text-gray-700 font-medium shrink-0"
                  />
                  <div className="flex justify-between text-[9pt] text-gray-800">
                    <span>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</span>
                    {edu.gpa && <span className="font-medium text-gray-700">GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {projects.length > 0 && (
          <ResumeSection title="Projects" style={getSectionStyle('projects', data.customization)} titleClassName="text-[10pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5" className="space-y-1">
            <div className="space-y-2 pt-0.5">
              {projects.map((proj, idx) => (
                <div key={idx} className="space-y-0.5">
                  <EntryHeader
                    left={<strong className="text-[9.5pt] text-gray-900">{proj.title}</strong>}
                    right={
                      <div className="flex gap-2 text-[8.5pt]">
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noreferrer" className="text-gray-900 hover:underline font-semibold">
                            Live ↗
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-gray-900 hover:underline font-semibold">
                            GitHub ↗
                          </a>
                        )}
                      </div>
                    }
                    rightClassName="shrink-0"
                  />
                  <p className="text-[9pt] text-gray-850 leading-snug">{proj.description}</p>
                  {proj.bullets && proj.bullets.length > 0 && <EntryBullets bullets={proj.bullets} className="list-disc list-outside ml-4 space-y-0.5 text-[8.5pt] text-gray-800 leading-tight" />}
                  {proj.tech && proj.tech.length > 0 && (
                    <p className="text-[8.5pt] text-gray-600 font-medium">
                      Tech: {proj.tech.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {((skillCategories && skillCategories.length > 0 && skillCategories.some(c => c.skills.length > 0)) || skills.length > 0) && (
          <ResumeSection title="Skills" style={getSectionStyle('skills', data.customization)} titleClassName="text-[10pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5" className="space-y-1">
            <div className="space-y-0.5 pt-0.5 text-[9pt] text-gray-800">
              {skillCategories && skillCategories.length > 0 && skillCategories.some(c => c.skills.length > 0) ? (
                skillCategories
                  .filter(cat => cat.skills.length > 0)
                  .map((cat, idx) => (
                    <div key={idx} className="flex flex-wrap gap-1">
                      <strong className="text-gray-900">{cat.name}:</strong>
                      <span>{cat.skills.join(', ')}</span>
                    </div>
                  ))
              ) : (
                <p>{skills.join(', ')}</p>
              )}
            </div>
          </ResumeSection>
        )}

        {data.certifications && data.certifications.length > 0 && (
          <ResumeSection title="Certifications" style={getSectionStyle('certifications', data.customization)} titleClassName="text-[10pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5" className="space-y-1">
            <div className="space-y-1 pt-0.5">
              {data.certifications.map((cert, idx) => (
                <div key={idx} className="space-y-0.5 text-[9pt] text-gray-850">
                  <EntryHeader left={<strong className="text-gray-900">{cert.title}</strong>} right={cert.date} rightClassName="text-gray-600 font-medium shrink-0" />
                  <div className="text-gray-700 text-[8.5pt]">{cert.subtitle}</div>
                  {cert.description && (
                    <p className="text-gray-500 text-[8.5pt] pt-0.5">{cert.description}</p>
                  )}
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {achievements.length > 0 && (
          <ResumeSection title="Awards" style={getSectionStyle('achievements', data.customization)} titleClassName="text-[10pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5" className="space-y-1">
            <div className="space-y-1 pt-0.5">
              {achievements.map((ach, idx) => (
                <div key={idx} className="flex justify-between text-[9pt] text-gray-800">
                  <span>
                    <strong className="text-gray-900">{ach.title}</strong>, {ach.issuer}
                  </span>
                  <span className="text-gray-750 font-medium shrink-0">{ach.date}</span>
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {data.publications && data.publications.length > 0 && (
          <ResumeSection title="Publications" style={getSectionStyle('publications', data.customization)} titleClassName="text-[10pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5" className="space-y-1">
            <div className="space-y-1 pt-0.5">
              {data.publications.map((pub, idx) => (
                <div key={idx} className="space-y-0.5 text-[9pt] text-gray-850">
                  <EntryHeader left={<strong className="text-gray-900">{pub.title}</strong>} right={pub.date} rightClassName="text-gray-600 font-medium shrink-0" />
                  <div className="text-gray-700 text-[8.5pt]">{pub.subtitle}</div>
                  {pub.description && (
                    <p className="text-gray-500 text-[8.5pt] pt-0.5">{pub.description}</p>
                  )}
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {data.customSections && data.customSections.length > 0 && data.customSections.map((cs, csIdx) => (
          cs.items && cs.items.length > 0 && (
            <ResumeSection key={cs.id || csIdx} title={cs.name || 'CUSTOM SECTION'} style={getSectionStyle('custom', data.customization)} titleClassName="text-[10pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5" className="space-y-1">
              <div className="space-y-1 pt-0.5">
                {cs.items.map((item, idx) => (
                  <div key={idx} className="space-y-0.5 text-[9pt] text-gray-850">
                    <EntryHeader left={<strong className="text-gray-900">{item.title}</strong>} right={item.date} rightClassName="text-gray-600 font-medium shrink-0" />
                    {item.subtitle && (
                      <div className="text-gray-750 text-[8.5pt]">{item.subtitle}</div>
                    )}
                    {item.description && (
                      <p className="text-gray-500 text-[8.5pt] pt-0.5">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </ResumeSection>
          )
        ))}

      </div>
    </div>
  );
}
