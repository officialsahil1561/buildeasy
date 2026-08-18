import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, Calendar, ArrowRight, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { getArticleBySlug, getRelatedArticles } from '../data/articles';

export default function ArticleView() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return <Navigate to="/resume-tips" replace />;
  }

  const canonicalUrl = `https://buildeasy.app/resume-tips/${article.slug}`;
  const relatedArticles = getRelatedArticles(article.slug);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    datePublished: '2026-08-01',
    dateModified: '2026-08-18',
    author: {
      '@type': 'Organization',
      name: 'BuildEasy Editorial Team',
      url: 'https://buildeasy.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'BuildEasy',
      url: 'https://buildeasy.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://buildeasy.app/favicon.ico',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://buildeasy.app/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Resume Tips',
        item: 'https://buildeasy.app/resume-tips',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#111827]">
      <Helmet>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={article.metaTitle} />
        <meta property="og:description" content={article.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Article Header */}
        <section className="bg-[#F9FAFB] py-12 md:py-16 px-6 border-b border-[#E5E7EB]">
          <div className="max-w-[760px] mx-auto">
            {/* Breadcrumb Nav */}
            <nav className="text-xs text-gray-500 mb-6 flex flex-wrap items-center gap-2" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-black transition-colors">Home</Link>
              <span>/</span>
              <Link to="/resume-tips" className="hover:text-black transition-colors">Resume Tips</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium truncate max-w-[280px] sm:max-w-md">{article.title}</span>
            </nav>

            <span className="text-xs font-bold tracking-widest text-[#6B7280] uppercase mb-3 inline-block">
              {article.category}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111827] mb-4 leading-[1.15]">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed mb-6">
              {article.subtitle}
            </p>

            <div className="flex items-center gap-4 text-xs text-[#6B7280] pt-4 border-t border-[#E5E7EB]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                {article.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                Updated {article.updatedAt}
              </span>
            </div>
          </div>
        </section>

        {/* Article Main Body */}
        <article className="py-12 md:py-16 px-6 max-w-[760px] mx-auto text-[#111827] space-y-10 leading-relaxed">
          {article.sections.map((sec, idx) => (
            <div key={idx} className="space-y-4">
              {sec.h2 && (
                <h2 className="font-serif text-2xl md:text-3xl text-[#111827] pt-4 mb-2 tracking-tight">
                  {sec.h2}
                </h2>
              )}

              {sec.h3 && (
                <h3 className="font-bold text-lg md:text-xl text-[#111827] pt-2">
                  {sec.h3}
                </h3>
              )}

              {sec.paragraphs?.map((p, pIdx) => (
                <p key={pIdx} className="text-base md:text-[17px] text-[#374151] leading-[1.7]">
                  {p}
                </p>
              ))}

              {sec.listItems && (
                <ul className="space-y-2.5 my-4 pl-2">
                  {sec.listItems.map((item, lIdx) => (
                    <li key={lIdx} className="flex items-start gap-2.5 text-base md:text-[16px] text-[#374151]">
                      <CheckCircle2 className="w-4 h-4 text-[#111827] shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {sec.exampleBox && (
                <div className="bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] p-5 my-6 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                    {sec.exampleBox.title}
                  </h4>
                  {sec.exampleBox.before && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded text-xs md:text-sm text-rose-900 font-mono">
                      {sec.exampleBox.before}
                    </div>
                  )}
                  {sec.exampleBox.after && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs md:text-sm text-emerald-900 font-mono">
                      {sec.exampleBox.after}
                    </div>
                  )}
                </div>
              )}

              {sec.callout && (
                <div className={`rounded-lg p-4 my-6 border text-sm flex gap-3 ${
                  sec.callout.type === 'warning' 
                    ? 'bg-amber-50 border-amber-200 text-amber-900' 
                    : 'bg-blue-50 border-blue-200 text-blue-900'
                }`}>
                  {sec.callout.type === 'warning' ? (
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  ) : (
                    <Lightbulb className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-bold mb-1">{sec.callout.title}</p>
                    <p className="text-xs md:text-sm leading-relaxed">{sec.callout.text}</p>
                  </div>
                </div>
              )}

              {sec.internalLink && (
                <p className="text-base text-[#374151] pt-2">
                  {sec.internalLink.text}
                  <Link
                    to={sec.internalLink.url}
                    className="font-semibold text-[#111827] underline underline-offset-4 hover:text-black transition-colors"
                  >
                    {sec.internalLink.anchorText}
                  </Link>
                  .
                </p>
              )}
            </div>
          ))}

          {/* In-Article Builder CTA */}
          <div className="mt-14 pt-10 border-t border-[#E5E7EB]">
            <div className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-8 text-center space-y-4">
              <h3 className="font-serif text-2xl text-[#111827]">Ready to put this into practice?</h3>
              <p className="text-sm md:text-base text-[#4B5563] max-w-lg mx-auto leading-relaxed">
                Build your resume with BuildEasy and see your formatting and content changes rendered in real time.
              </p>
              <div className="pt-2">
                <Link
                  to="/builder"
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-[7px] bg-[#111111] text-white text-sm font-semibold hover:bg-[#242424] transition-all duration-150"
                >
                  <span>Build My Resume</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Resume Guides */}
        {relatedArticles.length > 0 && (
          <section className="py-16 px-6 bg-[#F9FAFB] border-t border-[#E5E7EB]">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-xs font-bold tracking-widest text-[#6B7280] uppercase mb-2">FURTHER READING</p>
                <h2 className="font-serif text-3xl text-[#111827]">Related Resume Guides</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    to={`/resume-tips/${rel.slug}`}
                    className="group bg-white rounded-xl border border-[#E5E7EB] p-6 hover:border-[#111827] transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2">
                        <span className="font-semibold text-[10px] uppercase text-[#111827] bg-[#F3F4F6] px-2 py-0.5 rounded-full">
                          {rel.category}
                        </span>
                        <span>{rel.readTime}</span>
                      </div>
                      <h3 className="font-serif text-lg text-[#111827] group-hover:text-black mb-2 leading-snug">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-[#4B5563] line-clamp-2 leading-relaxed">
                        {rel.subtitle}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#F3F4F6] flex items-center justify-between text-xs font-semibold text-[#111827]">
                      <span>Read guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
