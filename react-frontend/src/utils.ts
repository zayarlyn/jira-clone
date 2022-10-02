export function getTheme(): Theme {
  const localTheme = localStorage.getItem('jira-clone-theme');
  return localTheme ? JSON.parse(localTheme) : { mode: 'light' };
}

export type Theme = { mode: 'light' | 'dark' };
