import React from 'react';
import styled from 'styled-components';

import jellyfish from '../assets/svg/jellyfish.svg';

export default function SiteTitle() {
  return (
    <Title>
      <img src={jellyfish} alt="DeFi Chain Jellyfish" />
      DefiChain Loan-Rechner
    </Title>
  );
}

const Title = styled.h1`
  display: flex;
  align-items: center;

  img {
    margin-right: 20px;
    margin-bottom: -5px;
    height: 60px;
  }
`;
