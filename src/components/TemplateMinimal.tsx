import React from 'react';
import { PortfolioData } from '../types';
import { getSectionStyle, getRootStyles } from '../lib/template-helpers';
import { ResumeSection, EntryHeader, EntryBullets } from './common/ResumePrimitives';

export default function TemplateMinimal({ data }: { data: PortfolioData }) {
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
      <a key="email" href={`mailto:${displayEmail}`} className="text-gray-900 hover:underline">
        {displayEmail}
      </a>
    );
  }
  if (displayWebsite) {
    contactItems.push(
      <a key="web" href={displayWebsite.startsWith('http') ? displayWebsite : `https://${displayWebsite}`} target="_blank" rel="noreferrer" className="text-gray-900 hover:underline">
        {formatUrl(displayWebsite)}
      </a>
    );
  }
  if (basicInfo.linkedin) {
    contactItems.push(
      <a key="li" href={basicInfo.linkedin} target="_blank" rel="noreferrer" className="text-gray-900 hover:underline font-medium">
        LinkedIn
      </a>
    );
  }
  if (basicInfo.github) {
    contactItems.push(
      <a key="gh" href={basicInfo.github} target="_blank" rel="noreferrer" className="text-gray-900 hover:underline font-medium">
        GitHub
      </a>
    );
  }
  if (basicInfo.portfolio) {
    contactItems.push(
      <a key="port" href={basicInfo.portfolio} target="_blank" rel="noreferrer" className="text-gray-900 hover:underline font-medium">
        Portfolio
      </a>
    );
  }
  links.forEach((l, i) => {
    contactItems.push(
      <a key={`link-${i}`} href={l.url} target="_blank" rel="noreferrer" className="text-gray-900 hover:underline font-medium">
        {getLinkLabel(l.url, l.label)}
      </a>
    );
  });

  return (
    <div className="bg-white text-gray-950 font-sans p-10 md:p-14 max-w-4xl mx-auto min-h-[1050px] select-text text-[10.5pt] leading-relaxed" style={getRootStyles(data.customization, data.accentColor)}>
      
      <header className="border-b border-gray-100 pb-5 mb-6">
        <h1 className="text-[24pt] font-black tracking-tight text-gray-900 leading-none">
          {displayName}
        </h1>
        {displayTitle && (
          <p className="text-[12pt] font-medium text-gray-700 mt-2">
            {displayTitle}
          </p>
        )}
        
        <div className="text-[9.5pt] text-gray-600 mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
          {contactItems.map((item, index) => (
            <React.Fragment key={index}>
              {item}
              {index < contactItems.length - 1 && <span className="text-gray-300">•</span>}
            </React.Fragment>
          ))}
        </div>
      </header>

      <div className="flex flex-col gap-6">
        
        {displaySummary && (
          <ResumeSection title="PROFESSIONAL SUMMARY" style={getSectionStyle('summary', data.customization)}>
            <p className="text-[10pt] text-gray-800 leading-relaxed">{displaySummary}</p>
          </ResumeSection>
        )}

        {experience.length > 0 && (
          <ResumeSection title="EXPERIENCE" style={getSectionStyle('experience', data.customization)}>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="space-y-1">
                  <EntryHeader
                    left={
                      <div>
                        <strong className="text-[10.5pt] text-gray-900">{exp.role}</strong>
                        <span className="text-[10pt] text-gray-700 font-medium"> — {exp.org}</span>
                        {exp.location && <span className="text-gray-500 text-[9.5pt] ml-2 font-normal">({exp.location})</span>}
                      </div>
                    }
                    right={`${exp.startDate} – ${exp.endDate}`}
                  />
                  {exp.bullets.length > 0 && <EntryBullets bullets={exp.bullets} />}
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {education.length > 0 && (
          <ResumeSection title="EDUCATION" style={getSectionStyle('education', data.customization)}>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                  <EntryHeader
                    left={
                      <div>
                        <strong className="text-[10.5pt] text-gray-900">{edu.institution}</strong>
                        {edu.location && <span className="text-gray-500 text-[9.5pt] ml-2 font-normal">({edu.location})</span>}
                      </div>
                    }
                    right={`${edu.startDate} – ${edu.endDate}`}
                  />
                  <div className="flex justify-between text-[10pt] text-gray-700">
                    <span>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</span>
                    {edu.gpa && <span className="font-medium">GPA: {edu.gpa}</span>}
                  </div>
                  {edu.description && <p className="text-gray-600 text-[9.5pt]">{edu.description}</p>}
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {projects.length > 0 && (
          <ResumeSection title="PROJECTS" style={getSectionStyle('projects', data.customization)}>
            <div className="space-y-4">
              {projects.map((proj, idx) => (
                <div key={idx} className="space-y-1.5">
                  <EntryHeader
                    left={<strong className="text-[10.5pt] text-gray-900">{proj.title}</strong>}
                    right={
                      <div className="flex gap-3 text-[9.5pt]">
                        {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium">Live Demo ↗</a>}
                        {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium">GitHub ↗</a>}
                      </div>
                    }
                  />
                  <p className="text-[10pt] text-gray-800 leading-relaxed">{proj.description}</p>
                  {proj.bullets && proj.bullets.length > 0 && <EntryBullets bullets={proj.bullets} />}
                  {proj.tech && proj.tech.length > 0 && (
                    <p className="text-[9pt] text-gray-600 mt-1">
                      <strong className="text-gray-800 font-medium">Technologies:</strong> {proj.tech.join(' • ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {((skillCategories && skillCategories.length > 0 && skillCategories.some(c => c.skills.length > 0)) || skills.length > 0) && (
          <ResumeSection title="TECHNICAL SKILLS" style={getSectionStyle('skills', data.customization)}>
            <div className="space-y-1 pt-1 text-[10pt] text-gray-800">
              {skillCategories && skillCategories.length > 0 && skillCategories.some(c => c.skills.length > 0) ? (
                skillCategories
                  .filter(cat => cat.skills.length > 0)
                  .map((cat, idx) => (
                    <div key={idx} className="flex flex-wrap gap-1">
                      <strong className="text-gray-900 min-w-[140px]">{cat.name}:</strong>
                      <span>{cat.skills.join(' • ')}</span>
                    </div>
                  ))
              ) : (
                <p>{skills.join(' • ')}</p>
              )}
            </div>
          </ResumeSection>
        )}

        {data.certifications && data.certifications.length > 0 && (
          <ResumeSection title="CERTIFICATIONS" style={getSectionStyle('certifications', data.customization)}>
            <div className="space-y-2">
              {data.certifications.map((cert, idx) => (
                <div key={idx} className="space-y-1 text-[10pt] text-gray-800">
                  <EntryHeader left={<strong className="text-gray-900">{cert.title}</strong>} right={cert.date} />
                  <div className="text-gray-700 text-[9.5pt]">{cert.subtitle}</div>
                  {cert.description && <p className="text-gray-600 text-[9.5pt] pt-0.5">{cert.description}</p>}
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {achievements.length > 0 && (
          <ResumeSection title="HONORS & AWARDS" style={getSectionStyle('achievements', data.customization)}>
            <div className="space-y-2">
              {achievements.map((ach, idx) => (
                <div key={idx} className="flex justify-between text-[10pt] text-gray-800">
                  <span>
                    <strong className="text-gray-900">{ach.title}</strong> — {ach.issuer}
                  </span>
                  <span className="text-gray-600 font-medium shrink-0">{ach.date}</span>
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {data.publications && data.publications.length > 0 && (
          <ResumeSection title="PUBLICATIONS" style={getSectionStyle('publications', data.customization)}>
            <div className="space-y-2">
              {data.publications.map((pub, idx) => (
                <div key={idx} className="space-y-1 text-[10pt] text-gray-800">
                  <EntryHeader left={<strong className="text-gray-900">{pub.title}</strong>} right={pub.date} />
                  <div className="text-gray-700 text-[9.5pt]">{pub.subtitle}</div>
                  {pub.description && <p className="text-gray-600 text-[9.5pt] pt-0.5">{pub.description}</p>}
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {data.customSections && data.customSections.length > 0 && data.customSections.map((cs, csIdx) => (
          cs.items && cs.items.length > 0 && (
            <ResumeSection key={cs.id || csIdx} title={cs.name || 'CUSTOM SECTION'} style={getSectionStyle('custom', data.customization)}>
              <div className="space-y-2">
                {cs.items.map((item, idx) => (
                  <div key={idx} className="space-y-1 text-[10pt] text-gray-800">
                    <EntryHeader left={<strong className="text-gray-900">{item.title}</strong>} right={item.date} />
                    {item.subtitle && <div className="text-gray-700 text-[9.5pt]">{item.subtitle}</div>}
                    {item.description && <p className="text-gray-600 text-[9.5pt] pt-0.5">{item.description}</p>}
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
