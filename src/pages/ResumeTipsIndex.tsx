import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { ARTICLES } from '../data/articles';

export default function ResumeTipsIndex() {
  const canonicalUrl = 'https://buildeasy.app/resume-tips';

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
        item: canonicalUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#111827]">
      <Helmet>
        <title>Resume Writing Tips & Advice | BuildEasy</title>
        <meta
          name="description"
          content="Practical guides for writing, formatting, improving, and tailoring resumes that are clear, professional, and easy for recruiters to scan."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Resume Writing Tips & Advice | BuildEasy" />
        <meta
          property="og:description"
          content="Practical guides for writing, formatting, improving, and tailoring resumes that are clear, professional, and easy for recruiters to scan."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-[#F9FAFB] py-12 md:py-16 px-6 border-b border-[#E5E7EB]">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="text-xs text-gray-500 mb-4 flex items-center justify-center gap-2" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-black">Home</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Resume Tips</span>
            </nav>

            <h1 className="font-serif text-4xl md:text-5xl text-[#111827] mb-4">
              Resume Writing Tips & Advice
            </h1>
            <p className="text-base md:text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
              Practical guides for writing, formatting, improving, and tailoring resumes that are clear, professional, and easy for recruiters to scan.
            </p>
          </div>
        </section>

        {/* Article Grid Section */}
        <section className="py-12 md:py-20 px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.map((article) => (
              <article
                key={article.slug}
                className="group bg-white rounded-xl border border-[#E5E7EB] p-6 hover:border-[#111827] transition-all duration-200 flex flex-col justify-between hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#6B7280] mb-3">
                    <span className="font-semibold text-[11px] tracking-wider uppercase text-[#111827] bg-[#F3F4F6] px-2.5 py-0.5 rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h2 className="font-serif text-xl text-[#111827] group-hover:text-black mb-2 leading-snug">
                    <Link to={`/resume-tips/${article.slug}`} className="focus:outline-none focus:underline">
                      {article.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-[#4B5563] leading-relaxed mb-6 line-clamp-3">
                    {article.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F3F4F6] flex items-center justify-between">
                  <span className="text-xs text-[#6B7280] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {article.publishedAt}
                  </span>

                  <Link
                    to={`/resume-tips/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#111827] group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Builder Bottom CTA */}
        <section className="py-16 px-6 bg-[#F9FAFB] border-t border-[#E5E7EB] text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="font-serif text-2xl md:text-3xl text-[#111827]">Ready to put these tips into practice?</h2>
            <p className="text-sm md:text-base text-[#4B5563] leading-relaxed">
              Build your resume with BuildEasy and see your formatting changes rendered live in real time.
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
        </section>
      </main>

      <Footer />
    </div>
  );
}
