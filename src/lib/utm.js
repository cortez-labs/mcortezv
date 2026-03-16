const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid'
];

const STORAGE_KEY = '__landing_utm__';

export function captureUTMs() {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const captured = {};
  let hasParams = false;

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) {
      captured[key] = value;
      hasParams = true;
    }
  }

  if (hasParams) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
  }
}

export function getTrafficParams() {
  if (typeof window === 'undefined') return {};
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}
