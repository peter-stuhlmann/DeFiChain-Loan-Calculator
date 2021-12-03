import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';

import Step from './styled/Step';
import Heading from './styled/Heading';
import Text from './styled/Text';
import Input from './styled/Input';

export default function Loan(props) {
  const { values, loanSchemes, handleChange } = props;

  const collateralInUsd = values.price * values.amount;
  const maxLoanInUsd =
    (collateralInUsd / loanSchemes[values.loanScheme].collateral) * 100;

  return (
    <Step>
      <Heading>4. Schritt: Kredithöhe wählen</Heading>
      <Text>
        Mit {parseFloat(values.amount)} DFI und dem gewählten Loan-Schema (
        {loanSchemes[values.loanScheme].collateral}%,{' '}
        {loanSchemes[values.loanScheme].interestRate}% Zinsen) kannst Du bis zu{' '}
        {parseFloat(maxLoanInUsd).toFixed(2)}$ minten. Du solltest allerdings
        weniger minten, da Du sonst sofort an der Grenze bist und liquidiert
        wirst.
      </Text>
      <div>
        <Input
          type="number"
          value={values.loan}
          error={values.loan > maxLoanInUsd}
          onChange={handleChange('loan')}
          endAdornment={<InputAdornment position="end">$</InputAdornment>}
          inputProps={{
            'aria-label': 'Kredithöhe',
            min: 0,
            max: maxLoanInUsd,
          }}
        />
      </div>
    </Step>
  );
}
