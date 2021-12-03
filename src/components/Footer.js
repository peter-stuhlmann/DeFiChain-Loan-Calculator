import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  return (
    <Container>
      Peter R. Stuhlmann, 2021 |{' '}
      <Link
        href="https://peter-stuhlmann-webentwicklung.de/impressum"
        target="_blank"
        rel="noreferrer noopener"
      >
        Impressum
      </Link>{' '}
      |{' '}
      <Link
        href="https://peter-stuhlmann-webentwicklung.de/datenschutzerklaerung"
        target="_blank"
        rel="noreferrer noopener"
      >
        Datenschutzerklärung
      </Link>
    </Container>
  );
}

const Link = styled.a`
  text-decoration: none;
  color: #000;
`;

const Container = styled.footer`
  color: #7d7d7d;
  font-size: 13px;
  padding: 3px 10px;
  text-align: center;

  a {
    color: #7d7d7d;
  }
`;
