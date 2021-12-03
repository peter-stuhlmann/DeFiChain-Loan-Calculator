import React from 'react';
import Alert from '@mui/material/Alert';

import Step from './styled/Step';
import Heading from './styled/Heading';
import Text from './styled/Text';
import Link from './styled/Link';

import referrals from '../data/referrals';

export default function Result() {
  return (
    <Step>
      <Heading>Neu im DeFiChain Game?</Heading>
      <Text>
        Wenn Du noch keinen Account bei Cake DeFi und/oder DFX Swiss hast, würde
        ich mich freuen, wenn Du für Deine Anmeldung meinen Referral-Link nutzt.
        Wir bekommen dann beide einen Bonus 🙂
      </Text>
      {referrals.map((ref) => (
        <Link
          key={ref.href}
          href={ref.href}
          style={{ display: 'block', marginBottom: '10px' }}
        >
          <Alert variant="outlined">{ref.text}</Alert>
        </Link>
      ))}
    </Step>
  );
}
