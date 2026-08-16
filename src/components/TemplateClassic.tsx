import React from 'react';
import { PortfolioData } from '../types';
import { getSectionStyle, getRootStyles } from '../lib/template-helpers';

export default function TemplateClassic({ data }: { data: PortfolioData }) {
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
      <a key="email" href={`mailto:${displayEmail}`} className="text-black hover:underline">
        {displayEmail}
      </a>
    );
  }
  if (displayWebsite) {
    contactItems.push(
      <a key="web" href={displayWebsite.startsWith('http') ? displayWebsite : `https://${displayWebsite}`} target="_blank" rel="noreferrer" className="text-black hover:underline">
        {formatUrl(displayWebsite)}
      </a>
    );
  }
  if (basicInfo.linkedin) {
    contactItems.push(
      <a key="li" href={basicInfo.linkedin} target="_blank" rel="noreferrer" className="text-black hover:underline">
        LinkedIn
      </a>
    );
  }
  if (basicInfo.github) {
    contactItems.push(
      <a key="gh" href={basicInfo.github} target="_blank" rel="noreferrer" className="text-black hover:underline">
        GitHub
      </a>
    );
  }
  if (basicInfo.portfolio) {
    contactItems.push(
      <a key="port" href={basicInfo.portfolio} target="_blank" rel="noreferrer" className="text-black hover:underline">
        Portfolio
      </a>
    );
  }
  links.forEach((l, i) => {
    contactItems.push(
      <a key={`link-${i}`} href={l.url} target="_blank" rel="noreferrer" className="text-black hover:underline">
        {getLinkLabel(l.url, l.label)}
      </a>
    );
  });

  return (
    <div className="bg-white text-black font-serif p-10 md:p-14 max-w-4xl mx-auto min-h-[1050px] select-text text-[11pt] leading-relaxed" style={getRootStyles(data.customization, data.accentColor)}>
      
      <header className="text-center mb-6">
        <h1 className="text-[24pt] font-bold text-black uppercase tracking-wider leading-tight">
          {displayName}
        </h1>
        {displayTitle && (
          <p className="text-[11pt] font-medium text-black mt-1 uppercase">
            {displayTitle}
          </p>
        )}
        
        <div className="text-[9.5pt] text-gray-800 mt-2 flex flex-wrap justify-center items-center gap-x-2 gap-y-1 font-sans">
          {contactItems.map((item, index) => (
            <React.Fragment key={index}>
              {item}
              {index < contactItems.length - 1 && <span className="text-gray-400">|</span>}
            </React.Fragment>
          ))}
        </div>
      </header>

      <div className="flex flex-col gap-5">
        
        {displaySummary && (
          <section style={getSectionStyle('summary', data.customization)} className="space-y-1.5">
            <h2 className="text-[11pt] font-bold uppercase tracking-widest text-black border-b border-black pb-1">
              SUMMARY
            </h2>
            <p className="text-[10pt] text-gray-900 leading-relaxed pt-1">
              {displaySummary}
            </p>
          </section>
        )}

        {experience.length > 0 && (
          <section style={getSectionStyle('experience', data.customization)} className="space-y-2">
            <h2 className="text-[11pt] font-bold uppercase tracking-widest text-black border-b border-black pb-1">
              EXPERIENCE
            </h2>
            <div className="space-y-4 pt-1">
              {experience.map((exp, idx) => (
                <div key={idx} className="space-y-1 font-sans text-gray-900">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <strong className="text-[10.5pt] text-black">{exp.role}</strong>
                      <span className="text-[10.5pt]">, {exp.org}</span>
                      {exp.location && <span className="text-gray-500 text-[9.5pt] ml-2 font-normal">({exp.location})</span>}
                    </div>
                    <span className="text-[9.5pt] font-medium shrink-0">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  {exp.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-5 space-y-1 text-[10pt] leading-relaxed">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section style={getSectionStyle('education', data.customization)} className="space-y-2">
            <h2 className="text-[11pt] font-bold uppercase tracking-widest text-black border-b border-black pb-1">
              EDUCATION
            </h2>
            <div className="space-y-3 pt-1 font-sans text-gray-900">
              {education.map((edu, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <strong className="text-[10.5pt] text-black">{edu.institution}</strong>
                      {edu.location && <span className="text-gray-500 text-[9.5pt] ml-2 font-normal">({edu.location})</span>}
                    </div>
                    <span className="text-[9.5pt] font-medium shrink-0">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <div className="flex justify-between text-[10pt]">
                    <span>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</span>
                    {edu.gpa && <span className="font-medium">GPA: {edu.gpa}</span>}
                  </div>
                  {edu.description && (
                    <p className="text-[9.5pt] text-gray-700 pt-0.5">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section style={getSectionStyle('projects', data.customization)} className="space-y-2">
            <h2 className="text-[11pt] font-bold uppercase tracking-widest text-black border-b border-black pb-1">
              PROJECTS
            </h2>
            <div className="space-y-3 pt-1 font-sans text-gray-900">
              {projects.map((proj, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <strong className="text-[10.5pt] text-black">{proj.title}</strong>
                    <div className="flex gap-3 text-[9.5pt]">
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-black hover:underline font-medium">
                          Live Demo ↗
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-black hover:underline font-medium">
                          GitHub ↗
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-[10pt] leading-relaxed">{proj.description}</p>
                  {proj.bullets && proj.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-5 space-y-1 text-[9.5pt] leading-relaxed">
                      {proj.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                  {proj.tech && proj.tech.length > 0 && (
                    <p className="text-[9pt] text-gray-600 font-medium">
                      Technologies: {proj.tech.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {((skillCategories && skillCategories.length > 0 && skillCategories.some(c => c.skills.length > 0)) || skills.length > 0) && (
          <section style={getSectionStyle('skills', data.customization)} className="space-y-1.5">
            <h2 className="text-[11pt] font-bold uppercase tracking-widest text-black border-b border-black pb-1">
              SKILLS
            </h2>
            <div className="space-y-1 pt-1 text-[10pt] text-gray-900 font-sans">
              {skillCategories && skillCategories.length > 0 && skillCategories.some(c => c.skills.length > 0) ? (
                skillCategories
                  .filter(cat => cat.skills.length > 0)
                  .map((cat, idx) => (
                    <div key={idx} className="flex flex-wrap gap-1">
                      <strong className="text-black min-w-[120px]">{cat.name}:</strong>
                      <span>{cat.skills.join(', ')}</span>
                    </div>
                  ))
              ) : (
                <p>{skills.join(', ')}</p>
              )}
            </div>
          </section>
        )}

        {data.certifications && data.certifications.length > 0 && (
          <section style={getSectionStyle('certifications', data.customization)} className="space-y-2">
            <h2 className="text-[11pt] font-bold uppercase tracking-widest text-black border-b border-black pb-1">
              CERTIFICATIONS
            </h2>
            <div className="space-y-2 pt-1 font-sans text-gray-900">
              {data.certifications.map((cert, idx) => (
                <div key={idx} className="space-y-0.5 text-[10pt]">
                  <div className="flex justify-between items-baseline">
                    <strong className="text-black">{cert.title}</strong>
                    <span className="text-[9.5pt] font-medium shrink-0">{cert.date}</span>
                  </div>
                  <div className="text-[9.5pt] text-gray-700">
                    {cert.subtitle}
                  </div>
                  {cert.description && (
                    <p className="text-[9.5pt] text-gray-600">{cert.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {achievements.length > 0 && (
          <section style={getSectionStyle('achievements', data.customization)} className="space-y-1.5">
            <h2 className="text-[11pt] font-bold uppercase tracking-widest text-black border-b border-black pb-1">
              HONORS & AWARDS
            </h2>
            <div className="space-y-1.5 pt-1 font-sans text-gray-900">
              {achievements.map((ach, idx) => (
                <div key={idx} className="flex justify-between text-[10pt]">
                  <span>
                    <strong className="text-black">{ach.title}</strong>, {ach.issuer}
                  </span>
                  <span className="font-medium shrink-0">{ach.date}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.publications && data.publications.length > 0 && (
          <section style={getSectionStyle('publications', data.customization)} className="space-y-2">
            <h2 className="text-[11pt] font-bold uppercase tracking-widest text-black border-b border-black pb-1">
              PUBLICATIONS
            </h2>
            <div className="space-y-2 pt-1 font-sans text-gray-900">
              {data.publications.map((pub, idx) => (
                <div key={idx} className="space-y-0.5 text-[10pt]">
                  <div className="flex justify-between items-baseline">
                    <strong className="text-black">{pub.title}</strong>
                    <span className="text-[9.5pt] font-medium shrink-0">{pub.date}</span>
                  </div>
                  <div className="text-[9.5pt] text-gray-700">
                    {pub.subtitle}
                  </div>
                  {pub.description && (
                    <p className="text-[9.5pt] text-gray-600">{pub.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.customSections && data.customSections.length > 0 && data.customSections[0].items.length > 0 && (
          <section style={getSectionStyle('custom', data.customization)} className="space-y-2">
            <h2 className="text-[11pt] font-bold uppercase tracking-widest text-black border-b border-black pb-1">
              {data.customSections[0].name || 'CUSTOM SECTION'}
            </h2>
            <div className="space-y-2 pt-1 font-sans text-gray-900">
              {data.customSections[0].items.map((item, idx) => (
                <div key={idx} className="space-y-0.5 text-[10pt]">
                  <div className="flex justify-between items-baseline">
                    <strong className="text-black">{item.title}</strong>
                    <span className="text-[9.5pt] font-medium shrink-0">{item.date}</span>
                  </div>
                  {item.subtitle && (
                    <div className="text-[9.5pt] text-gray-700">{item.subtitle}</div>
                  )}
                  {item.description && (
                    <p className="text-[9.5pt] text-gray-600">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
