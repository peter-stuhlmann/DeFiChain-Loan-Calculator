import styled from 'styled-components';
import OutlinedInput from '@mui/material/OutlinedInput';

import { textColor, textColorLow, borderColor } from './Themes';

const Input = styled(OutlinedInput)`
  width: 100%;
  max-width: 300px;
  margin: 5px 15px 5px 0;
  color: ${textColor} !important;

  &:last-child {
    margin: 5px 0 5px 0;
  }

  p {
    color: ${textColorLow} !important;
  }

  fieldset {
    border-color: ${borderColor} !important;
  }

  &.Mui-focused fieldset {
    border-color: #f069c5 !important;
  }
`;

export default Input;
