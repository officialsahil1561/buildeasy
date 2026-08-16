import { CustomizationSettings } from '../types';

export function getSectionStyle(sectionId: string, custom?: CustomizationSettings) {
  if (!custom) return {};
  const hidden = custom.hiddenSections || [];
  if (hidden.includes(sectionId)) {
    return { display: 'none' };
  }
  const orderArray = custom.sectionOrder || [];
  const index = orderArray.indexOf(sectionId);
  return { order: index >= 0 ? index : 99 };
}

export function getRootStyles(custom?: CustomizationSettings, accentColor?: string) {
  const styles: any = {};
  
  if (custom) {
    // Fonts
    if (custom.font === 'inter') styles.fontFamily = 'Inter, sans-serif';
    else if (custom.font === 'arial') styles.fontFamily = 'Arial, sans-serif';
    else if (custom.font === 'helvetica') styles.fontFamily = 'Helvetica, sans-serif';
    else if (custom.font === 'georgia') styles.fontFamily = 'Georgia, serif';
    else if (custom.font === 'times') styles.fontFamily = '"Times New Roman", serif';

    // Spacing adjustments (scale margins/gaps using standard CSS vars used by Tailwind potentially, or just scale transforms)
    // Actually, the easiest way to adjust spacing without touching all internal margins is to set CSS variables that we can use, OR just use scaling. But scaling scales text!
    // Since we patched the top-level gap, let's inject a CSS variable for the gap if we want, but wait, the patch script changed `space-y-6` to `flex flex-col gap-6`.
    // Let's actually define a global CSS class `.resume-custom` and apply properties.
    if (custom.spacing === 'compact') {
      styles['--tw-space-y-reverse'] = 0; // fallback
      styles.lineHeight = '1.3';
    } else if (custom.spacing === 'comfortable') {
      styles.lineHeight = '1.7';
    } else {
      styles.lineHeight = '1.5';
    }
  }

  // Accent Color
  if (accentColor) {
    // If we want to override Tailwind text-blue-600, border-blue-600 etc.
    styles['--color-accent'] = accentColor;
  }

  return styles;
}
