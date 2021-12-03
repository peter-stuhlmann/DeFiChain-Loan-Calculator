import styled from 'styled-components';
import OutlinedInput from '@mui/material/OutlinedInput';

const Input = styled(OutlinedInput)`
  width: 100%;
  max-width: 300px;
  margin: 5px 15px 5px 0;

  &:last-child {
    margin: 5px 0 5px 0;
  }
`;

export default Input;
