import styled from 'styled-components';
import Radio from '@mui/material/Radio';

import { textColorLow } from './Themes';

const RadioButton = styled(Radio)`
  & > span {
    color: ${textColorLow} !important;
  }

  &.Mui-checked span {
    color: #f069c5 !important;
  }
`;

export default RadioButton;
