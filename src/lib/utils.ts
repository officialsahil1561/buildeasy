export function sanitizeUrl(url: string | undefined): string {
  if (!url) return '';
  const trimmed = url.trim();
  // Prevent javascript:, data:, vbscript: injection
  const lower = trimmed.toLowerCase();
  if (lower.startsWith('javascript:') || lower.startsWith('data:') || lower.startsWith('vbscript:')) {
    return '';
  }
  if (lower.startsWith('http://') || lower.startsWith('https://')) {
    return trimmed;
  }
  if (lower.startsWith('//')) {
    return `https:${trimmed}`;
  }
  if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return '';
}

export function formatDisplayUrl(url: string | undefined): string {
  const safe = sanitizeUrl(url);
  if (!safe) return url || '';
  return safe.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export function validateImageFile(file: File): { isValid: boolean; error?: string } {
  // 1. File size limit: 5MB (5 * 1024 * 1024 bytes)
  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return { isValid: false, error: 'File size exceeds the 5MB limit.' };
  }

  // 2. Allowed MIME types: JPEG, PNG, WebP
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (!allowedMimeTypes.includes(file.type.toLowerCase())) {
    return { isValid: false, error: 'Only JPEG, PNG, and WebP images are allowed. SVG, HTML, and other files are rejected.' };
  }

  // 3. Allowed extensions
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  if (!allowedExtensions.includes(ext)) {
    return { isValid: false, error: 'Invalid file extension. Only .jpg, .jpeg, .png, and .webp are allowed.' };
  }

  return { isValid: true };
}
