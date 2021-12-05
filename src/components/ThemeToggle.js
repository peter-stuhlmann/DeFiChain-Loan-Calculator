import React from 'react';
import styled from 'styled-components';
import NightlightIcon from '@mui/icons-material/Nightlight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import IconButton from '@mui/material/IconButton';

import { textColor } from './styled/Themes';

export default function ThemeToggle(props) {
  const { themeMode, setThemeMode } = props;

  const handleThemeMode = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  return (
    <Container onClick={() => handleThemeMode()}>
      <IconButton aria-label="Theme-Wechsel" size="large">
        {themeMode === 'light' ? <NightlightIcon /> : <WbSunnyIcon />}
      </IconButton>
      <span>{themeMode === 'light' ? 'dark' : 'light'}</span>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    position: absolute;
    top: 2px;
    right: 2px;
  }

  svg {
    color: ${textColor};
    width: 1.5em;
    height: 1.5em;
  }

  span {
    color: ${textColor};
    font-size: 12px;
    text-transform: uppercase;

    @media (max-width: 768px) {
      display: none;
    }
  }
`;
