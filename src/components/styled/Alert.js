import styled from 'styled-components';
import MuiAlert from '@mui/material/Alert';

import { textColor } from './Themes';

const Alert = styled(MuiAlert)`
  color: ${textColor} !important;
`;

export default Alert;
