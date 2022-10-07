import moment from 'moment';

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

export const parseDate = (s: string) => moment(s).fromNow();

export type Theme = { mode: 'light' | 'dark' };

export const types = [
  { text: 'Task', icon: '/assets/task.svg', value: 0 },
  { text: 'Bug', icon: '/assets/bug.svg', value: 1 },
  { text: 'Review', icon: '/assets/review.svg', value: 2 },
];

export const priorities = [
  { text: 'Lowest', icon: '/assets/lowest.svg', value: 0 },
  { text: 'Low', icon: '/assets/low.svg', value: 1 },
  { text: 'Medium', icon: '/assets/medium.svg', value: 2 },
  { text: 'High', icon: '/assets/high.svg', value: 3 },
  { text: 'Highest', icon: '/assets/highest.svg', value: 4 },
];
