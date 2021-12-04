import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';

import Step from './styled/Step';
import Heading from './styled/Heading';
import Text from './styled/Text';
import Input from './styled/Input';
import InputGroup from './styled/InputGroup';
import Sum from './styled/Sum';

export default function Collateral(props) {
  const { tokens, handleTokens, sum, total, dfiShare } = props;

  const result =
    dfiShare >= 50 || isNaN(dfiShare) ? (
      ''
    ) : (
      <b>
        <u>nicht</u>
      </b>
    );

  return (
    <Step>
      <Heading>3. Schritt: Collateral hinterlegen</Heading>
      <Text>
        Das Collateral muss zu mind. 50% aus DFI bestehen, der Rest kann
        entweder DFI oder dBTC, dUSDC oder dUSDT sein. Beacte, dass die Assets
        unterschiedliche Gewichtungen (collateral factor) haben können.
      </Text>

      <InputGroup>
        {/* DFI */}
        <Input
          type="number"
          value={tokens.DFI.amount}
          onChange={handleTokens('DFI', 'amount')}
          endAdornment={<InputAdornment position="end">DFI</InputAdornment>}
          inputProps={{
            'aria-label': 'Menge an DFI',
            min: 0,
          }}
        />
        <Input
          type="number"
          value={parseFloat(tokens.DFI.price).toFixed(2)}
          onChange={handleTokens('DFI', 'price')}
          endAdornment={<InputAdornment position="end">$</InputAdornment>}
          inputProps={{
            step: '0.1',
            'aria-label': 'Dollar-Preis',
            min: 0,
          }}
        />
        <Sum>Summe DFI in $: {sum.DFI.toFixed(2)}</Sum>
      </InputGroup>

      <InputGroup>
        {/* BTC */}
        <Input
          type="number"
          value={tokens.dBTC.amount}
          onChange={handleTokens('dBTC', 'amount')}
          endAdornment={<InputAdornment position="end">dBTC</InputAdornment>}
          inputProps={{
            step: '0.01',
            'aria-label': 'Menge an dBTC',
            min: 0,
          }}
        />
        <Input
          type="number"
          value={parseFloat(tokens.dBTC.price).toFixed(2)}
          onChange={handleTokens('dBTC', 'price')}
          endAdornment={<InputAdornment position="end">$</InputAdornment>}
          inputProps={{
            step: '0.1',
            'aria-label': 'Dollar-Preis',
            min: 0,
          }}
        />
        <Sum>Summe dBTC in $: {sum.dBTC.toFixed(2)}</Sum>
      </InputGroup>

      <InputGroup>
        {/* USDC */}
        <Input
          type="number"
          value={tokens.dUSDC.amount}
          onChange={handleTokens('dUSDC', 'amount')}
          endAdornment={<InputAdornment position="end">dUSDC</InputAdornment>}
          inputProps={{
            'aria-label': 'Menge an dUSDC',
            min: 0,
          }}
        />
        <Input
          type="number"
          value={parseFloat(tokens.dUSDC.price).toFixed(2)}
          onChange={handleTokens('dUSDC', 'price')}
          endAdornment={<InputAdornment position="end">$</InputAdornment>}
          inputProps={{
            step: '0.1',
            'aria-label': 'Dollar-Preis',
            min: 0,
          }}
        />
        <Sum>Summe dUSDC in $: {sum.dUSDC.toFixed(2)}</Sum>
      </InputGroup>

      <InputGroup>
        {/* USDT */}
        <Input
          type="number"
          value={tokens.dUSDT.amount}
          onChange={handleTokens('dUSDT', 'amount')}
          endAdornment={<InputAdornment position="end">dUSDT</InputAdornment>}
          inputProps={{
            'aria-label': 'Menge an dUSDT',
            min: 0,
          }}
        />
        <Input
          type="number"
          value={parseFloat(tokens.dUSDT.price).toFixed(2)}
          onChange={handleTokens('dUSDT', 'price')}
          endAdornment={<InputAdornment position="end">$</InputAdornment>}
          inputProps={{
            step: '0.1',
            'aria-label': 'Dollar-Preis',
            min: 0,
          }}
        />
        <Sum>Summe dUSDT in $: {sum.dUSDT.toFixed(2)}</Sum>
      </InputGroup>
      <Text>
        Dein Collateral hat einen Wert von {total.toFixed(2)}$.
        <br />
        {dfiShare.toFixed(2)}% davon sind DFI. Das Minimum von 50% ist damit{' '}
        {result} erreicht.
      </Text>
    </Step>
  );
}
