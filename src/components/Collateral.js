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
        Das Collateral muss zu mind. 50% aus DFI/DUSD bestehen. Der Rest kann
        entweder DFI, DUSD, dBTC, dETH, dUSDC oder dUSDT sein.
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
          endAdornment={<InputAdornment position="end">DUSD</InputAdornment>}
          inputProps={{
            step: '0.1',
            'aria-label': 'Dollar-Preis',
            min: 0,
          }}
        />
        <Sum>Summe DFI in DUSD: {sum.DFI.toFixed(2)}</Sum>
      </InputGroup>

      <InputGroup>
        {/* DUSD */}
        <Input
          type="number"
          value={tokens.dUSD.amount}
          onChange={handleTokens('dUSD', 'amount')}
          endAdornment={<InputAdornment position="end">DUSD</InputAdornment>}
          inputProps={{
            step: '1',
            'aria-label': 'Menge an DUSD',
            min: 0,
          }}
        />
        <Input
          type="number"
          value={1}
          endAdornment={<InputAdornment position="end">DUSD</InputAdornment>}
          disabled
        />
        <Sum>
          Summe DUSD: {sum.dUSD.toFixed(2)}{' '}
          {sum.dUSD > 0 && <>(Besicherungsfaktor: {tokens.dUSD.factor})</>}
        </Sum>
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
          endAdornment={<InputAdornment position="end">DUSD</InputAdornment>}
          inputProps={{
            step: '0.1',
            'aria-label': 'Dollar-Preis',
            min: 0,
          }}
        />
        <Sum>Summe dBTC in DUSD: {sum.dBTC.toFixed(2)}</Sum>
      </InputGroup>

      <InputGroup>
        {/* ETH */}
        <Input
          type="number"
          value={tokens.dETH.amount}
          onChange={handleTokens('dETH', 'amount')}
          endAdornment={<InputAdornment position="end">dETH</InputAdornment>}
          inputProps={{
            step: '0.1',
            'aria-label': 'Menge an dETH',
            min: 0,
          }}
        />
        <Input
          type="number"
          value={parseFloat(tokens.dETH.price).toFixed(2)}
          onChange={handleTokens('dETH', 'price')}
          endAdornment={<InputAdornment position="end">DUSD</InputAdornment>}
          inputProps={{
            step: '0.1',
            'aria-label': 'Dollar-Preis',
            min: 0,
          }}
        />
        <Sum>Summe dETH in DUSD: {sum.dETH.toFixed(2)}</Sum>
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
          endAdornment={<InputAdornment position="end">DUSD</InputAdornment>}
          inputProps={{
            step: '0.1',
            'aria-label': 'Dollar-Preis',
            min: 0,
          }}
        />
        <Sum>Summe dUSDC in DUSD: {sum.dUSDC.toFixed(2)}</Sum>
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
          endAdornment={<InputAdornment position="end">DUSD</InputAdornment>}
          inputProps={{
            step: '0.1',
            'aria-label': 'Dollar-Preis',
            min: 0,
          }}
        />
        <Sum>Summe dUSDT in DUSD: {sum.dUSDT.toFixed(2)}</Sum>
      </InputGroup>
      <Text>
        Dein Collateral hat einen Wert von {total.toFixed(2)}$.
        <br />
        {dfiShare.toFixed(2)}% davon sind DFI/DUSD. Das Minimum von 50% ist
        damit {result} erreicht.
      </Text>
    </Step>
  );
}
