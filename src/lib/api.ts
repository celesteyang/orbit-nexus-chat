const stripTrailingSlash = (url: string) => url.replace(/\/+$/, '');

export const normalizeApiBase = (url: string | undefined) => {
  if (!url) return '';
  const trimmed = stripTrailingSlash(url.trim());

  if (typeof window !== 'undefined' && window.location.protocol === 'https:' && trimmed.startsWith('http://')) {
    return `https://${trimmed.slice('http://'.length)}`;
  }

  return trimmed;
};

export const buildHttpUrl = (base: string, path: string) => {
  const normalized = normalizeApiBase(base);
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalized}${normalizedPath}`;
};

export const buildWebSocketUrl = (base: string | undefined, path: string) => {
  if (!base) return '';

  const normalizedBase = normalizeApiBase(base);
  const baseWithScheme = normalizedBase.startsWith('http')
    ? normalizedBase
    : `https://${normalizedBase}`;

  const parsed = new URL(baseWithScheme);
  const wsProtocol = parsed.protocol === 'http:' ? 'ws:' : 'wss:';
  const hostAndPath = stripTrailingSlash(`${parsed.host}${parsed.pathname}`);
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${wsProtocol}//${hostAndPath}${normalizedPath}`;
};
