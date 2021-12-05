import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';

import Step from './styled/Step';
import Heading from './styled/Heading';
import RadioButton from './styled/RadioButton';

export default function LoanSchemes(props) {
  const { values, loanSchemes, handleChange } = props;

  return (
    <Step>
      <Heading>2. Schritt: Loan Scheme wählen</Heading>
      <div>
        <RadioGroup
          aria-label="Loan-Schema"
          value={values.loanScheme}
          onChange={handleChange('loanScheme')}
        >
          {loanSchemes.map((scheme, index) => (
            <FormControlLabel
              key={index}
              value={index}
              control={<RadioButton />}
              label={`Minimum Collateral - ${scheme.collateral}% - ${scheme.interestRate}% Zinsen`}
            />
          ))}
        </RadioGroup>
      </div>
    </Step>
  );
}
