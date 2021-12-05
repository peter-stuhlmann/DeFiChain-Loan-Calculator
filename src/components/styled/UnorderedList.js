import styled from 'styled-components';

import { textColor } from './Themes';

const UnorderedList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  color: ${textColor};
`;

export default UnorderedList;
