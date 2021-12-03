import React, { useEffect, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';

import Step from './styled/Step';
import Heading from './styled/Heading';
import Text from './styled/Text';
import Input from './styled/Input';
import OrderedList from './styled/OrderedList';

export default function Result(props) {
  const { values, loanSchemes, handleChange } = props;

  const [alert, setAlert] = useState({ status: '', message: '' });

  const newCollateralValue = values.amount * values.newPrice;
  const newCollateralMinValue =
    (values.loan / 100) * loanSchemes[values.loanScheme].collateral;

  useEffect(() => {
    if (newCollateralValue > newCollateralMinValue * 1.1) {
      setAlert({ status: 'success', message: 'Alles im grünen Bereich.' });
    }

    if (
      newCollateralValue > newCollateralMinValue * 1.1 &&
      values.newPrice >= 50
    ) {
      setAlert({
        status: 'success',
        message: 'Alles im grünen Bereich. #RoadTo50 🚀',
      });
    }

    if (newCollateralValue <= newCollateralMinValue) {
      setAlert({
        status: 'error',
        message: 'Du wirst liquidiert.',
      });
    }

    if (
      newCollateralValue > newCollateralMinValue &&
      newCollateralValue <= newCollateralMinValue * 1.1
    ) {
      setAlert({
        status: 'warning',
        message:
          'Achtung! Du näherst Dich der Liquidierungsgrenze. Hinterlege entweder mehr Collateral oder zahle einen Teil Deines Loans zurück.',
      });
    }
  }, [newCollateralValue, newCollateralMinValue, values.newPrice]);

  return (
    <Step>
      <Heading>Achtung</Heading>
      Du mintest {parseFloat(values.loan).toFixed(2)}$. Nun können zwei
      Szenarien eintreten:
      <OrderedList>
        <li>DFI-Preis sinkt</li>
        <li>DFI-Preis steigt</li>
      </OrderedList>
      <div>
        <h3>Neuer DFI-Preis</h3>
        <Input
          type="number"
          value={values.newPrice}
          onChange={handleChange('newPrice')}
          endAdornment={<InputAdornment position="end">$</InputAdornment>}
          inputProps={{
            step: '0.1',
            'aria-label': 'Neuer DFI-Preis',
            min: 0,
          }}
        />
        <Text>
          Der Wert Deines Collaterals ist{' '}
          {values.newPrice < values.price && 'gesunken'}
          {values.newPrice > values.price && 'gestiegen'}
          {values.newPrice === values.price && 'unverändert'}. Dein Collateral
          hat dadurch einen Wert von{' '}
          {parseFloat(values.amount * values.newPrice).toFixed(2)}$ und ist
          damit{' '}
          {values.newPrice < values.price &&
            `${parseFloat(
              Math.abs(
                values.amount * values.price - values.amount * values.newPrice
              )
            ).toFixed(2)}$ niedriger als `}
          {values.newPrice > values.price &&
            `${parseFloat(
              Math.abs(
                values.amount * values.price - values.amount * values.newPrice
              )
            ).toFixed(2)}$ höher als `}
          {values.newPrice === values.price && 'genauso hoch wie '}
          am Anfang. Du hast eine Summe von {parseFloat(values.loan).toFixed(2)}
          $ gemintet und musst dafür ein Collateral von mind.{' '}
          {parseFloat(newCollateralMinValue).toFixed(2)}$ hinterlegen.
        </Text>

        <Alert variant="filled" severity={alert.status}>
          {alert.message}
        </Alert>
      </div>
    </Step>
  );
}
