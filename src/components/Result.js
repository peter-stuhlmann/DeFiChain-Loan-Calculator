import React, { useEffect, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';

import Step from './styled/Step';
import Heading from './styled/Heading';
import Text from './styled/Text';
import Input from './styled/Input';
import InputGroup from './styled/InputGroup';
import HelperText from './styled/HelperText';

export default function Result(props) {
  const { values, tokens, loanSchemes, handleTokens, total } = props;

  const [alert, setAlert] = useState({ status: '', message: '' });

  const newSum = {
    DFI: tokens.DFI.newPrice * tokens.DFI.amount * tokens.DFI.factor,
    dBTC: tokens.dBTC.newPrice * tokens.dBTC.amount * tokens.dBTC.factor,
    dETH: tokens.dETH.newPrice * tokens.dETH.amount * tokens.dETH.factor,
    dUSD: 1 * tokens.dUSD.amount * tokens.dUSD.factor,
    dUSDC: tokens.dUSDC.newPrice * tokens.dUSDC.amount * tokens.dUSDC.factor,
    dUSDT: tokens.dUSDT.newPrice * tokens.dUSDT.amount * tokens.dUSDT.factor,
  };

  const newTotal =
    newSum.DFI +
    newSum.dBTC +
    newSum.dETH +
    newSum.dUSD +
    newSum.dUSDC +
    newSum.dUSDT;

  const newCollateralMinValue =
    (values.loan / 100) * loanSchemes[values.loanScheme].collateral;

  const riskFactor = 1.5;

  useEffect(() => {
    if (newTotal > newCollateralMinValue * riskFactor) {
      setAlert({ status: 'success', message: 'Alles im grünen Bereich.' });
    }

    if (
      newTotal > newCollateralMinValue * riskFactor &&
      tokens.DFI.newPrice >= 50
    ) {
      setAlert({
        status: 'success',
        message: 'Alles im grünen Bereich. #RoadTo50 🚀',
      });
    }

    if (newTotal <= newCollateralMinValue) {
      setAlert({
        status: 'error',
        message: 'Du wirst liquidiert.',
      });
    }

    if (
      newTotal > newCollateralMinValue &&
      newTotal <= newCollateralMinValue * riskFactor
    ) {
      setAlert({
        status: 'warning',
        message:
          'Achtung! Du näherst Dich der Liquidierungsgrenze. Hinterlege entweder mehr Collateral oder zahle einen Teil Deines Loans zurück.',
      });
    }
  }, [newTotal, newCollateralMinValue, tokens.DFI.newPrice]);

  const difference = Math.abs(total - newTotal).toFixed(2);

  const newCollateralRatio = ((100 / values.loan) * newTotal).toFixed(2);

  return (
    <Step>
      <Heading>Achtung</Heading>
      Du mintest {parseFloat(values.loan).toFixed(2)}$. Nun ist es
      wahrscheinlich, dass sich der Wert der Token ändert.
      <div>
        <h3>Neue Werte Deiner Token</h3>
        <InputGroup flex>
          <div>
            {/* DFI */}
            <Input
              type="number"
              value={parseFloat(tokens.DFI.newPrice).toFixed(2)}
              onChange={handleTokens('DFI', 'newPrice')}
              endAdornment={
                <InputAdornment position="end">DUSD</InputAdornment>
              }
              inputProps={{
                step: '0.1',
                'aria-label': 'Neuer DFI-Preis',
                min: 0,
              }}
            />
            <HelperText>Neuer Preis pro DFI</HelperText>
          </div>

          <div>
            {/* dBTC */}
            <Input
              type="number"
              value={parseFloat(tokens.dBTC.newPrice).toFixed(2)}
              onChange={handleTokens('dBTC', 'newPrice')}
              endAdornment={
                <InputAdornment position="end">DUSD</InputAdornment>
              }
              inputProps={{
                step: '0.1',
                'aria-label': 'Neuer dBTC-Preis',
                min: 0,
              }}
              disabled={tokens.dBTC.amount === '0'}
            />
            <HelperText>Neuer Preis pro dBTC</HelperText>
          </div>

          <div>
            {/* dETH */}
            <Input
              type="number"
              value={parseFloat(tokens.dETH.newPrice).toFixed(2)}
              onChange={handleTokens('dETH', 'newPrice')}
              endAdornment={
                <InputAdornment position="end">DUSD</InputAdornment>
              }
              inputProps={{
                step: '0.1',
                'aria-label': 'Neuer dETH-Preis',
                min: 0,
              }}
              disabled={tokens.dETH.amount === '0'}
            />
            <HelperText>Neuer Preis pro dETH</HelperText>
          </div>

          <div>
            {/* dUSDC */}
            <Input
              type="number"
              value={parseFloat(tokens.dUSDC.newPrice).toFixed(2)}
              onChange={handleTokens('dUSDC', 'newPrice')}
              endAdornment={
                <InputAdornment position="end">DUSD</InputAdornment>
              }
              inputProps={{
                step: '0.1',
                'aria-label': 'Neuer dUSDC-Preis',
                min: 0,
              }}
              disabled={tokens.dUSDC.amount === '0'}
            />
            <HelperText>Neuer Preis pro dUSDC</HelperText>
          </div>

          <div>
            {/* dUSDT */}
            <Input
              type="number"
              value={parseFloat(tokens.dUSDT.newPrice).toFixed(2)}
              onChange={handleTokens('dUSDT', 'newPrice')}
              endAdornment={
                <InputAdornment position="end">DUSD</InputAdornment>
              }
              inputProps={{
                step: '0.1',
                'aria-label': 'Neuer dUSDT-Preis',
                min: 0,
              }}
              disabled={tokens.dUSDT.amount === '0'}
            />
            <HelperText>Neuer Preis pro dUSDT</HelperText>
          </div>
        </InputGroup>

        <Text>
          Der Wert Deines Collaterals ist {newTotal < total && 'gesunken'}
          {newTotal > total && 'gestiegen'}
          {newTotal === total && 'unverändert'}. Dein Collateral hat einen Wert
          von {newTotal.toFixed(2)}$ und ist damit{' '}
          {newTotal < total && `${difference}$ niedriger als `}
          {newTotal > total && `${difference}$ höher als `}
          {newTotal === total && 'genauso hoch wie '}
          am Anfang. Du hast eine Summe von {parseFloat(values.loan).toFixed(2)}
          $ gemintet und musst dafür ein Collateral von mind.{' '}
          {parseFloat(newCollateralMinValue).toFixed(2)}$ (
          {loanSchemes[values.loanScheme].collateral}%) hinterlegen.
        </Text>

        <Alert variant="filled" severity={alert.status || 'success'}>
          {alert.message} ({newCollateralRatio}%)
        </Alert>
      </div>
    </Step>
  );
}
