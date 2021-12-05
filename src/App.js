import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import './assets/css/global.css';

import Router from './components/Router';
import GlobalStyles from './components/styled/Global';
import ThemeToggle from './components/ThemeToggle';

import useLocalStorage from './helpers/useLocalStorage';

export default function App() {
  const [themeMode, setThemeMode] = useLocalStorage('Theme', 'light');

  return (
    <BrowserRouter>
      <ThemeProvider theme={{ mode: themeMode }}>
        <GlobalStyles />
        <ThemeToggle themeMode={themeMode} setThemeMode={setThemeMode} />
        <Suspense fallback={'Loading...'}>
          <Router />
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  );
}
