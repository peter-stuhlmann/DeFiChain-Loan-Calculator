import theme from 'styled-theming';

export const bodyBackgroundColor = theme('mode', {
  light: '#ebebeb',
  dark: '#1b1b1b',
});

export const stepBackgroundColor = theme('mode', {
  light: '#fff',
  dark: '#282828',
});

export const textColor = theme('mode', {
  light: '#000',
  dark: '#fff',
});

export const textColorLow = theme('mode', {
  light: 'rgba(0, 0, 0, 0.6)',
  dark: 'rgba(255, 255, 255, 0.6)',
});

export const borderColor = theme('mode', {
  light: '#c4c4c4',
  dark: '#888',
});
