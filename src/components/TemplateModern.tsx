import React from 'react';
import { PortfolioData } from '../types';
import { getSectionStyle, getRootStyles } from '../lib/template-helpers';

export default function TemplateModern({ data }: { data: PortfolioData }) {
  const { basicInfo, links, education, experience, projects, skills, skillCategories, achievements, accentColor } = data;

  const displayName = basicInfo.name || `${basicInfo.firstName || ''} ${basicInfo.lastName || ''}`.trim() || 'Your Name';
  const displayTitle = basicInfo.tagline || '';
  const displayEmail = basicInfo.email || '';
  const displayLocation = basicInfo.location || '';
  const displayWebsite = basicInfo.website || '';
  const displayPhone = basicInfo.phone || '';
  const displaySummary = basicInfo.summary || '';
  
  const themeColor = accentColor || '#2563EB';

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
      <a key="email" href={`mailto:${displayEmail}`} className="hover:text-gray-900 transition-colors">
        {displayEmail}
      </a>
    );
  }
  if (displayWebsite) {
    contactItems.push(
      <a key="web" href={displayWebsite.startsWith('http') ? displayWebsite : `https://${displayWebsite}`} target="_blank" rel="noreferrer" className="hover:text-gray-900 transition-colors">
        {formatUrl(displayWebsite)}
      </a>
    );
  }
  if (basicInfo.linkedin) {
    contactItems.push(
      <a key="li" href={basicInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-gray-900 transition-colors font-semibold" style={{ color: themeColor }}>
        LinkedIn
      </a>
    );
  }
  if (basicInfo.github) {
    contactItems.push(
      <a key="gh" href={basicInfo.github} target="_blank" rel="noreferrer" className="hover:text-gray-900 transition-colors font-semibold" style={{ color: themeColor }}>
        GitHub
      </a>
    );
  }
  if (basicInfo.portfolio) {
    contactItems.push(
      <a key="port" href={basicInfo.portfolio} target="_blank" rel="noreferrer" className="hover:text-gray-900 transition-colors font-semibold" style={{ color: themeColor }}>
        Portfolio
      </a>
    );
  }
  links.forEach((l, i) => {
    contactItems.push(
      <a key={`link-${i}`} href={l.url} target="_blank" rel="noreferrer" className="hover:text-gray-900 transition-colors font-semibold" style={{ color: themeColor }}>
        {getLinkLabel(l.url, l.label)}
      </a>
    );
  });

  return (
    <div className="bg-white text-gray-800 font-sans p-10 md:p-14 max-w-4xl mx-auto min-h-[1050px] select-text text-[10.5pt] leading-relaxed" style={getRootStyles(data.customization, data.accentColor)}>
      
      <header className="mb-8 border-b-2 pb-5" style={{ borderColor: themeColor }}>
        <h1 className="text-[26pt] font-extrabold tracking-tight text-gray-900 leading-tight">
          {displayName}
        </h1>
        {displayTitle && (
          <p className="text-[12pt] font-semibold mt-1" style={{ color: themeColor }}>
            {displayTitle}
          </p>
        )}
        
        <div className="text-[9.5pt] text-gray-600 mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-medium">
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
          <section style={getSectionStyle('summary', data.customization)} className="space-y-2">
            <h2 className="text-[11pt] font-bold uppercase tracking-wider border-b border-gray-200 pb-1" style={{ color: themeColor }}>
              Summary
            </h2>
            <p className="text-[10pt] text-gray-700 leading-relaxed pt-1">
              {displaySummary}
            </p>
          </section>
        )}

        {experience.length > 0 && (
          <section style={getSectionStyle('experience', data.customization)} className="space-y-3">
            <h2 className="text-[11pt] font-bold uppercase tracking-wider border-b border-gray-200 pb-1" style={{ color: themeColor }}>
              Experience
            </h2>
            <div className="space-y-5 pt-1">
              {experience.map((exp, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <strong className="text-[11pt] text-gray-900">{exp.role}</strong>
                      <span className="text-[10.5pt] text-gray-600 font-medium"> at {exp.org}</span>
                      {exp.location && <span className="text-gray-500 text-[9.5pt] ml-2 font-normal">({exp.location})</span>}
                    </div>
                    <span className="text-[9.5pt] text-gray-500 font-medium shrink-0 bg-gray-50 px-2 py-0.5 rounded">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  {exp.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-5 space-y-1.5 text-[10pt] text-gray-700 leading-relaxed">
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
          <section style={getSectionStyle('education', data.customization)} className="space-y-3">
            <h2 className="text-[11pt] font-bold uppercase tracking-wider border-b border-gray-200 pb-1" style={{ color: themeColor }}>
              Education
            </h2>
            <div className="space-y-3 pt-1">
              {education.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <strong className="text-[11pt] text-gray-900">{edu.institution}</strong>
                      {edu.location && <span className="text-gray-500 text-[9.5pt] ml-2 font-normal">({edu.location})</span>}
                    </div>
                    <span className="text-[9.5pt] text-gray-500 font-medium shrink-0 bg-gray-50 px-2 py-0.5 rounded">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <div className="flex justify-between text-[10pt] text-gray-700">
                    <span>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</span>
                    {edu.gpa && <span className="font-medium text-gray-500">GPA: {edu.gpa}</span>}
                  </div>
                  {edu.description && (
                    <p className="text-gray-600 text-[9.5pt]">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section style={getSectionStyle('projects', data.customization)} className="space-y-3">
            <h2 className="text-[11pt] font-bold uppercase tracking-wider border-b border-gray-200 pb-1" style={{ color: themeColor }}>
              Projects
            </h2>
            <div className="space-y-4 pt-1">
              {projects.map((proj, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <strong className="text-[11pt] text-gray-900">{proj.title}</strong>
                    <div className="flex gap-3 text-[9.5pt]">
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="hover:underline font-semibold" style={{ color: themeColor }}>
                          Live Demo ↗
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:underline font-semibold" style={{ color: themeColor }}>
                          GitHub ↗
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-[10pt] text-gray-700 leading-relaxed">{proj.description}</p>
                  {proj.bullets && proj.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-5 space-y-1 text-[9.5pt] text-gray-700 leading-relaxed">
                      {proj.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                  {proj.tech && proj.tech.length > 0 && (
                    <p className="text-[9pt] text-gray-500">
                      <strong className="text-gray-700 font-medium">Tech:</strong> {proj.tech.join(' • ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {((skillCategories && skillCategories.length > 0 && skillCategories.some(c => c.skills.length > 0)) || skills.length > 0) && (
          <section style={getSectionStyle('skills', data.customization)} className="space-y-2">
            <h2 className="text-[11pt] font-bold uppercase tracking-wider border-b border-gray-200 pb-1" style={{ color: themeColor }}>
              Skills
            </h2>
            <div className="space-y-1.5 pt-1 text-[10pt] text-gray-700">
              {skillCategories && skillCategories.length > 0 && skillCategories.some(c => c.skills.length > 0) ? (
                skillCategories
                  .filter(cat => cat.skills.length > 0)
                  .map((cat, idx) => (
                    <div key={idx} className="flex flex-wrap gap-1">
                      <strong className="text-gray-900 min-w-[120px]">{cat.name}:</strong>
                      <span>{cat.skills.join(' • ')}</span>
                    </div>
                  ))
              ) : (
                <p>{skills.join(' • ')}</p>
              )}
            </div>
          </section>
        )}

        {data.certifications && data.certifications.length > 0 && (
          <section style={getSectionStyle('certifications', data.customization)} className="space-y-2">
            <h2 className="text-[11pt] font-bold uppercase tracking-wider border-b border-gray-200 pb-1" style={{ color: themeColor }}>
              Certifications
            </h2>
            <div className="space-y-2 pt-1">
              {data.certifications.map((cert, idx) => (
                <div key={idx} className="space-y-1 text-[10pt] text-gray-800">
                  <div className="flex justify-between items-baseline">
                    <strong className="text-gray-900">{cert.title}</strong>
                    <span className="text-gray-500 font-medium shrink-0 bg-gray-50 px-2 py-0.5 rounded">{cert.date}</span>
                  </div>
                  <div className="text-gray-700 text-[9.5pt]">
                    {cert.subtitle}
                  </div>
                  {cert.description && (
                    <p className="text-gray-600 text-[9.5pt] pt-0.5">{cert.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {achievements.length > 0 && (
          <section style={getSectionStyle('achievements', data.customization)} className="space-y-2">
            <h2 className="text-[11pt] font-bold uppercase tracking-wider border-b border-gray-200 pb-1" style={{ color: themeColor }}>
              Awards
            </h2>
            <div className="space-y-2 pt-1">
              {achievements.map((ach, idx) => (
                <div key={idx} className="flex justify-between text-[10pt] text-gray-700">
                  <span>
                    <strong className="text-gray-900">{ach.title}</strong> — {ach.issuer}
                  </span>
                  <span className="text-gray-500 font-medium shrink-0 bg-gray-50 px-2 py-0.5 rounded">{ach.date}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.publications && data.publications.length > 0 && (
          <section style={getSectionStyle('publications', data.customization)} className="space-y-2">
            <h2 className="text-[11pt] font-bold uppercase tracking-wider border-b border-gray-200 pb-1" style={{ color: themeColor }}>
              Publications
            </h2>
            <div className="space-y-2 pt-1">
              {data.publications.map((pub, idx) => (
                <div key={idx} className="space-y-1 text-[10pt] text-gray-800">
                  <div className="flex justify-between items-baseline">
                    <strong className="text-gray-900">{pub.title}</strong>
                    <span className="text-gray-600 font-medium shrink-0 bg-gray-50 px-2 py-0.5 rounded">{pub.date}</span>
                  </div>
                  <div className="text-gray-700 text-[9.5pt]">
                    {pub.subtitle}
                  </div>
                  {pub.description && (
                    <p className="text-gray-600 text-[9.5pt] pt-0.5">{pub.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.customSections && data.customSections.length > 0 && data.customSections[0].items.length > 0 && (
          <section style={getSectionStyle('custom', data.customization)} className="space-y-2">
            <h2 className="text-[11pt] font-bold uppercase tracking-wider border-b border-gray-200 pb-1" style={{ color: themeColor }}>
              {data.customSections[0].name || 'CUSTOM SECTION'}
            </h2>
            <div className="space-y-2 pt-1">
              {data.customSections[0].items.map((item, idx) => (
                <div key={idx} className="space-y-1 text-[10pt] text-gray-800">
                  <div className="flex justify-between items-baseline">
                    <strong className="text-gray-900">{item.title}</strong>
                    <span className="text-gray-600 font-medium shrink-0 bg-gray-50 px-2 py-0.5 rounded">{item.date}</span>
                  </div>
                  {item.subtitle && (
                    <div className="text-gray-700 text-[9.5pt]">{item.subtitle}</div>
                  )}
                  {item.description && (
                    <p className="text-gray-600 text-[9.5pt] pt-0.5">{item.description}</p>
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
