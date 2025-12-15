const iconsGlob = import.meta.glob<string>('/src/assets/icons/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
});

export const icons = Object.fromEntries(
  Object.entries(iconsGlob).map(([path, content]) => {
    const fileName = path.split('/').pop()?.replace('.svg', '') ?? '';
    return [fileName, content];
  })
);

export type IconName = keyof typeof icons;