import type React from 'react';

export interface BasicInfo {
  firstName?: string;
  lastName?: string;
  name: string;
  tagline: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  photo?: string; // base64 representation of profile photo
  summary?: string; // Optional professional summary for ATS keyword optimization
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface LinkItem {
  label: string;
  url: string;
}

export interface EducationItem {
  id?: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
  location?: string;
}

export interface ExperienceItem {
  id?: string;
  current?: boolean;
  org: string;
  role: string;
  startDate: string;
  endDate: string;
  bullets: string[];
  location?: string;
}

export interface ProjectItem {
  id?: string;
  title: string;
  description: string;
  tech: string[];
  link?: string; // treated as live URL
  githubUrl?: string;
  bullets?: string[];
  image?: string; // base64 representation of project image
}

export interface AchievementItem {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export type TemplateId = 
  | 'minimal'
  | 'executive'
  | 'modern'
  | 'academic'
  | 'classic'
  | 'compact';

export type TemplateCategory =
  | 'all'
  | 'professional'
  | 'modern'
  | 'academic'
  | 'compact';


export type FontId = 'inter' | 'arial' | 'helvetica' | 'georgia' | 'times';
export type SpacingId = 'compact' | 'balanced' | 'comfortable';
export type PageSizeId = 'a4' | 'letter';

export interface CustomizationSettings {
  font: FontId;
  spacing: SpacingId;
  pageSize: PageSizeId;
  sectionOrder: string[];
  hiddenSections: string[];
}

export interface CustomSectionItem {
  id?: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
}

export interface PortfolioData {
  templateId: TemplateId;
  accentColor?: string;
  customization?: CustomizationSettings;
  resumeName?: string;

  basicInfo: BasicInfo;
  links: LinkItem[];
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: string[];
  skillCategories?: SkillCategory[];
  achievements: AchievementItem[];
  certifications?: CustomSectionItem[];
  publications?: CustomSectionItem[];
  customSections?: { id: string; name: string; items: CustomSectionItem[] }[];
}

export type ResumeData = PortfolioData;

export const DEFAULT_CUSTOMIZATION: CustomizationSettings = {
  font: 'inter',
  spacing: 'balanced',
  pageSize: 'letter',
  sectionOrder: ['summary', 'experience', 'education', 'projects', 'skills', 'certifications', 'achievements', 'publications', 'custom'],
  hiddenSections: [],
};

export const EMPTY_RESUME_DATA: PortfolioData = {
  templateId: 'minimal',
  resumeName: 'Untitled Resume',
  customization: DEFAULT_CUSTOMIZATION,
  basicInfo: {
    firstName: '',
    lastName: '',
    name: '',
    tagline: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    photo: '',
    summary: '',
    linkedin: '',
    github: '',
    portfolio: '',
  },
  links: [],
  education: [],
  experience: [],
  projects: [],
  skills: [],
  skillCategories: [],
  achievements: [],
  certifications: [],
  publications: [],
  customSections: [],
};

export const BLANK_RESUME_DATA: PortfolioData = EMPTY_RESUME_DATA;

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  templateId: 'minimal',
  customization: DEFAULT_CUSTOMIZATION,
  basicInfo: {
    firstName: 'Jane',
    lastName: 'Doe',
    name: 'Jane Doe',
    tagline: 'Lead Software Architect & Engineering Director',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
    website: 'https://example.com',
    photo: '',
    summary: 'Accomplished software leader with 8+ years of expertise designing and implementing robust, scalable architectures. Proven success directing cross-functional squads to optimize systems performance, streamline continuous delivery pipelines, and drive high-impact user experiences.',
    linkedin: 'https://linkedin.com/in/janedoe',
    github: 'https://github.com/janedoe',
    portfolio: 'https://example.com',
  },
  links: [
    { label: 'LinkedIn', url: 'https://linkedin.com/in/janedoe' },
    { label: 'GitHub', url: 'https://github.com/janedoe' },
    { label: 'Portfolio', url: 'https://example.com' },
  ],
  education: [
    {
      institution: 'University of California, Berkeley',
      degree: 'B.S. in Computer Science',
      field: 'Software Engineering & Distributed Systems',
      startDate: '2016',
      endDate: '2020',
      gpa: '3.88',
      description: 'Dean’s Honors List, Regents Scholar.',
    },
  ],
  experience: [
    {
      org: 'Enterprise Systems',
      role: 'Staff Software Engineer',
      startDate: '2022',
      endDate: 'Present',
      bullets: [
        'Architected real-time collaboration canvas supporting 50k+ daily concurrent users with sub-15ms sync latency.',
        'Led team of 8 engineers across frontend, distributed backend, and platform reliability initiatives.',
        'Cut client bundle sizes by 42% and achieved perfect 100 Lighthouse Web Vitals scores across all core flows.',
      ],
    },
    {
      org: 'Cloud Solutions Inc',
      role: 'Senior Frontend Engineer',
      startDate: '2020',
      endDate: '2022',
      bullets: [
        'Spearheaded redesign of enterprise analytics dashboard, driving 35% growth in customer retention.',
        'Built enterprise design system in React/TypeScript adopted across 14 cross-functional product squads.',
      ],
    },
  ],
  projects: [
    {
      title: 'DevPulse Telemetry Platform',
      description: 'Zero-overhead observability pipeline for serverless architectures with real-time tracing.',
      tech: ['React', 'TypeScript', 'Node.js', 'ClickHouse', 'Tailwind CSS'],
      link: 'https://github.com/janedoe/devpulse',
    },
    {
      title: 'TypeSync Engine',
      description: 'Distributed CRDT-based state reconciliation library with conflict-free optimistic updates.',
      tech: ['TypeScript', 'WebSockets', 'WebWorkers'],
      link: 'https://github.com/janedoe/typesync',
    },
  ],
  skills: [
    'TypeScript',
    'JavaScript',
    'Python',
    'SQL',
    'React',
    'Next.js',
    'Tailwind CSS',
    'Node.js',
    'GraphQL',
    'PostgreSQL',
    'Docker',
    'CI/CD Pipelines',
    'Distributed Systems',
    'System Architecture',
    'Web Performance',
  ],
  skillCategories: [
    {
      name: 'Languages',
      skills: ['TypeScript', 'JavaScript', 'Python', 'SQL'],
    },
    {
      name: 'Frontend',
      skills: ['React', 'Next.js', 'Tailwind CSS', 'Web Performance'],
    },
    {
      name: 'Backend',
      skills: ['Node.js', 'GraphQL', 'REST APIs', 'Microservices'],
    },
    {
      name: 'Databases',
      skills: ['PostgreSQL', 'Redis', 'ClickHouse'],
    },
    {
      name: 'DevOps & Cloud',
      skills: ['Docker', 'CI/CD Pipelines', 'AWS', 'Serverless'],
    },
    {
      name: 'Systems',
      skills: ['Distributed Systems', 'System Architecture', 'CRDTs'],
    },
  ],
  achievements: [
    {
      title: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      date: '2023',
    },
    {
      title: '1st Place – Global Open Source Hackathon',
      issuer: 'OSS Foundation',
      date: '2022',
    },
  ],
};

