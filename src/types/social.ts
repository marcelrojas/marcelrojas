import socialData from '@data/socialhandles.json';

export type SocialHandle = {
  key: string;
  title: string;
  icon?: string;
  url: string;
};

const entries = Object.entries(socialData).map(([key, value]) => ({ key, ...(value as any) })) as SocialHandle[];

const normalize = (s: string) => s.toString().toLowerCase();

export function getHandles(keys?: string[]): SocialHandle[] {
  if (!keys || keys.length === 0) return entries;
  const lookups = keys.map(normalize);
  return entries.filter((e) => lookups.includes(normalize(e.key)) || lookups.includes(normalize(e.title)));
}

export function getHandle(key: string): SocialHandle | undefined {
  return getHandles([key])[0];
}

export function resolveIconSrc(iconPath?: string) {
  if (!iconPath) return undefined;
  if (iconPath.startsWith('/') || iconPath.startsWith('http')) return iconPath;
  return iconPath.replace(/^@assets/, '/src/assets');
}

export default { entries, getHandles, getHandle, resolveIconSrc };
