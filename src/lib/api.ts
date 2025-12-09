const stripTrailingSlash = (url: string) => url.replace(/\/+$/, '');

export const normalizeApiBase = (url: string | undefined) => {
  if (!url) return '';
  const trimmed = stripTrailingSlash(url.trim());

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  if (typeof window !== 'undefined' && window.location.protocol) {
    return `${window.location.protocol}//${trimmed}`;
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
    : `http://${normalizedBase}`;

  const parsed = new URL(baseWithScheme);
  const wsProtocol = parsed.protocol === 'http:' ? 'ws:' : 'wss:';
  const hostAndPath = stripTrailingSlash(`${parsed.host}${parsed.pathname}`);
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${wsProtocol}//${hostAndPath}${normalizedPath}`;
};
