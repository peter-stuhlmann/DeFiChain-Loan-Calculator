import React from 'react';
import styled from 'styled-components';

import { textColor } from './styled/Themes';

import jellyfish from '../assets/svg/jellyfish.svg';

export default function SiteTitle() {
  return (
    <Title>
      <img src={jellyfish} alt="DeFi Chain Jellyfish" width="60" height="60" />
      DefiChain Loan-Rechner
    </Title>
  );
}

const Title = styled.h1`
  display: flex;
  align-items: center;
  color: ${textColor};

  @media (max-width: 480px) {
    margin-top: 35px;
  }

  img {
    margin-right: 20px;
    margin-bottom: -5px;
    height: 60px;
  }
`;
