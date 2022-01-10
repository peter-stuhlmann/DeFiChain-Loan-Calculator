import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';

import Interests from './Interests';

import Step from './styled/Step';
import Heading from './styled/Heading';
import Text from './styled/Text';
import Input from './styled/Input';
import Sum from './styled/Sum';

export default function Loan(props) {
  const {
    values,
    loanSchemes,
    handleChange,
    total,
    dfiShare,
    loanSchemeIndex,
  } = props;

  const maxLoanInUsd =
    (total / loanSchemes[values.loanScheme].collateral) * 100;

  const collateralRatio = ((100 / values.loan) * total).toFixed(2);

  return (
    <Step>
      <Heading>4. Schritt: Kredithöhe wählen</Heading>
      <Text>
        Mit Deinem Collateral von {total.toFixed(2)}$ und dem gewählten
        Loan-Schema ({loanSchemes[values.loanScheme].collateral}% Minimum
        Collateral, {loanSchemes[values.loanScheme].interestRate}% Zinsen)
        kannst Du{' '}
        {dfiShare >= 50 || isNaN(dfiShare) ? (
          <>
            bis zu ${parseFloat(maxLoanInUsd).toFixed(2)}$ minten. Du solltest
            allerdings weniger minten, da Du sonst sofort an der Grenze bist und
            liquidiert wirst.
          </>
        ) : (
          <>nicht minten, da Deine DFI-Hinterlegung weniger als 50% ausmacht.</>
        )}
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
        <Sum>Besicherungsverhältnis: {collateralRatio}%</Sum>
      </div>
      <Interests
        loanSchemes={loanSchemes}
        loanSchemeIndex={loanSchemeIndex}
        loan={values.loan}
      />
    </Step>
  );
}
