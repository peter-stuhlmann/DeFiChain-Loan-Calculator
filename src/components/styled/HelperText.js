import styled from 'styled-components';
import FormHelperText from '@mui/material/FormHelperText';

import { textColorLow } from './Themes';

const HelperText = styled(FormHelperText)`
  color: ${textColorLow} !important;
`;

export default HelperText;
