export function getTheme(): Theme {
  const localTheme = localStorage.getItem('jira-clone-theme');
  return localTheme ? JSON.parse(localTheme) : { mode: 'light' };
}

export function setTheme(mode: Theme['mode']) {
  localStorage.setItem(
    'jira-clone-theme',
    JSON.stringify({
      mode: mode === 'light' ? 'dark' : 'light',
    })
  );
}

export type Theme = { mode: 'light' | 'dark' };
