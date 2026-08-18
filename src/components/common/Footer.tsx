import React from 'react';
import { Link } from 'react-router-dom';
import BuildEasyLogo from './BuildEasyLogo';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E7EB] shrink-0 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-14">
        {/* Responsive Multi-column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 pb-8 border-b border-[#F3F4F6]">
          
          {/* Brand Column */}
          <div className="space-y-3 sm:col-span-2 md:col-span-1">
            <Link to="/" aria-label="BuildEasy Home">
              <BuildEasyLogo size="md" />
            </Link>
            <p className="text-xs text-[#6B7280] leading-relaxed max-w-xs">
              Craft a resume that reflects your professional caliber. High-end editorial design meets intuitive building.
            </p>
          </div>

          {/* Product Column */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827]">Product</h4>
            <ul className="space-y-2 text-xs text-[#6B7280]">
              <li>
                <Link to="/builder" className="hover:text-[#111827] transition-colors">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link to="/templates" className="hover:text-[#111827] transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-[#111827] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-[#111827] transition-colors">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827]">Resources</h4>
            <ul className="space-y-2 text-xs text-[#6B7280]">
              <li>
                <Link to="/resume-tips" className="hover:text-[#111827] transition-colors">
                  Resume Tips
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#111827] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#111827] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827]">Legal</h4>
            <ul className="space-y-2 text-xs text-[#6B7280]">
              <li>
                <Link to="/privacy" className="hover:text-[#111827] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#111827] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#9CA3AF]">
          <span>© {new Date().getFullYear()} BuildEasy. All rights reserved.</span>
          <span>Designed with precision.</span>
        </div>
      </div>
    </footer>
  );
}
