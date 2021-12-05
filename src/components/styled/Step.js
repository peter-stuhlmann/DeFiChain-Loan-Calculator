import styled from 'styled-components';

import { stepBackgroundColor, textColor } from './Themes';

const Step = styled.div`
  background-color: ${stepBackgroundColor};
  padding: 25px;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
  border-radius: 20px;
  margin: 25px 0;
  color: ${textColor};
`;

export default Step;
