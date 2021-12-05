import { createGlobalStyle } from 'styled-components';

import { bodyBackgroundColor } from './Themes';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${bodyBackgroundColor};
  }
`;

export default GlobalStyles;
