import React from 'react';
import styled from 'styled-components';

import Heading from './styled/Heading';
import Text from './styled/Text';

export default function Interests(props) {
  const { loanSchemes, loanSchemeIndex, loan } = props;

  const interests = [
    {
      periodName: 'Tag',
      period: 365,
    },
    {
      periodName: 'Woche',
      period: 52,
    },
    {
      periodName: 'Monat',
      period: 12,
    },
    {
      periodName: 'Jahr',
      period: 1,
    },
  ];

  const interestRate = loanSchemes[loanSchemeIndex].interestRate;

  const interestCalcAPR = (interestPeriod) =>
    ((loan / 100) * interestRate) / interestPeriod;

  return (
    <>
      <Heading>Zinsen</Heading>
      <Text>
        Folgende Zinsen ({loanSchemes[loanSchemeIndex].interestRate}% p.a.)
        fallen bei dem gewählten Kredit an:
      </Text>
      <List>
        {interests.map((interest) => (
          <ListItem key={interest.periodName}>
            <span>pro {interest.periodName}:</span>{' '}
            {interestCalcAPR(interest.period).toFixed(4)} USD
          </ListItem>
        ))}
      </List>
    </>
  );
}

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;

  span {
    margin-right: 0.3em;
    width: 100px;
  }
`;
