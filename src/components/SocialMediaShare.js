import React from 'react';
import styled from 'styled-components';

import Heading from './styled/Heading';

import socialMedia from '../data/socialMedia';

export default function SocialMediaShare() {
  return (
    <Container>
      <Heading>Diesen Rechner teilen</Heading>
      <Icons>
        {socialMedia.map((item) => (
          <Item
            key={item.media}
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
          >
            {item.icon}
            <span>{item.media}</span>
          </Item>
        ))}
      </Icons>
    </Container>
  );
}

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Icons = styled.div`
  display: flex;
`;

const Item = styled.a`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;
  transition: 0.2s;
  color: #000;

  &:hover {
    color: #f069c5;
  }

  @media (max-width: 350px) {
    padding: 7px;
  }

  span {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;
