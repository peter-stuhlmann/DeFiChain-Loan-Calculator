import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';

import Step from './styled/Step';
import Heading from './styled/Heading';
import Text from './styled/Text';
import Input from './styled/Input';

export default function Collateral(props) {
  const { values, handleChange } = props;

  return (
    <Step>
      <Heading>3. Schritt: Collateral hinterlegen</Heading>
      <Text>
        Das Collateral muss zu mind. 50% aus DFI bestehen, der Rest kann
        entweder DFI oder dBTC, dUSDC etc. sein. Andere Assets haben ggf.
        unterschiedliche Gewichtungen (collateral factor). Momentan unterstützt
        dieser Rechner nur die Variante, dass 100% in DFI als Collateral
        hinterlegt werden.
      </Text>
      <div>
        <Input
          type="number"
          value={values.amount}
          onChange={handleChange('amount')}
          endAdornment={<InputAdornment position="end">DFI</InputAdornment>}
          inputProps={{
            'aria-label': 'Menge an DFI',
          }}
        />
        <Input
          type="number"
          value={values.price}
          onChange={handleChange('price')}
          endAdornment={<InputAdornment position="end">$</InputAdornment>}
          inputProps={{
            step: '0.1',
            'aria-label': 'Dollar-Preis',
          }}
        />
      </div>
    </Step>
  );
}
