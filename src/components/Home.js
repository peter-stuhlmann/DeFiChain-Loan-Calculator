import React, { Fragment, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

export default function Home() {
  const [values, setValues] = useState({
    amount: '1000',
    price: '4',
    loanScheme: '2',
    loan: '1500',
    newPrice: '4',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const loanSchemes = [
    {
      collateral: 200,
      interestRate: 2,
    },
    {
      collateral: 350,
      interestRate: 1.5,
    },
    {
      collateral: 500,
      interestRate: 1,
    },
    {
      collateral: 1000,
      interestRate: 0.5,
    },
  ];

  const collateralInUsd = values.price * values.amount;
  const maxLoanInUsd =
    (collateralInUsd / loanSchemes[values.loanScheme].collateral) * 100;

  const newCollateralValue = values.amount * values.newPrice;
  const newCollateralMinValue =
    (values.loan / 100) * loanSchemes[values.loanScheme].collateral;

  return (
    <Fragment>
      <h1>DefiChain Kredite</h1>
      <h2>1. Schritt: Vault erstellen</h2>
      <p>
        Hier entstehen Kosten in Höhe von 2 DFI. Ein DFI wird geburned, der
        andere wird beim Auflösen des Vaults zurückerstattet. Hinzu kommen noch
        die Transaktionsgebühren.
      </p>
      <h2>2. Schritt: Loan Scheme wählen</h2>
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
              control={<Radio />}
              label={`Minimum Collateral - ${scheme.collateral}% - ${scheme.interestRate}% Zinsen`}
            />
          ))}
        </RadioGroup>
      </div>
      <h2>3. Schritt: Collateral hinterlegen</h2>
      <p>
        Das Collateral muss zu mind. 50% aus DFI bestehen, der Rest kann
        entweder DFI oder dBTC, dETH, dUSDC etc. sein. Andere Assets haben ggf.
        unterschiedliche Gewichtungen (collateral factor). Momentan unterstützt
        dieser Rechner nur die Variante, dass 100% in DFI als Collateral
        hinterlegt werden.
      </p>
      <div>
        <OutlinedInput
          type="number"
          value={values.amount}
          onChange={handleChange('amount')}
          endAdornment={<InputAdornment position="end">DFI</InputAdornment>}
          inputProps={{
            'aria-label': 'Menge an DFI',
          }}
        />
      </div>
      <div>
        <OutlinedInput
          type="number"
          value={values.price}
          onChange={handleChange('price')}
          endAdornment={<InputAdornment position="end">$</InputAdornment>}
          inputProps={{
            'aria-label': 'Dollar-Preis',
          }}
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleChange('price')}
              checked={values.price === '4'}
              value={4}
            />
          }
          label="Aktuellen DFI-Preis nutzen"
        />
      </div>
      <h2>4. Schritt: Kredithöhe wählen</h2>
      <p>
        Mit {parseFloat(values.amount)} DFI und dem gewählten Loan-Schema (
        {loanSchemes[values.loanScheme].collateral}%,{' '}
        {loanSchemes[values.loanScheme].interestRate}% Zinsen) kannst Du bis zu{' '}
        {parseFloat(maxLoanInUsd).toFixed(2)}$ minten. Du solltest allerdings
        weniger minten, da Du sonst sofort an der Grenze bist und liquidiert
        wirst.
      </p>
      <div>
        <OutlinedInput
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
      <h2>Achtung</h2>
      Du mintest {parseFloat(values.loan).toFixed(2)}$. Nun können zwei
      Szenarien eintreten:
      <ol>
        <li>DFI-Preis sinkt</li>
        <li>DFI-Preis steigt</li>
      </ol>
      <div>
        <h3>Neuer DFI-Preis</h3>
        <OutlinedInput
          type="number"
          value={values.newPrice}
          onChange={handleChange('newPrice')}
          endAdornment={<InputAdornment position="end">$</InputAdornment>}
          inputProps={{
            'aria-label': 'Neuer DFI-Preis',
            min: 0,
          }}
        />
        <p>
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
          {values.newPrice === values.price && 'ganuso wie hoch '}
          am Anfang. Du hast eine Summe von {parseFloat(values.loan).toFixed(2)}
          $ gemintet und musst dafür ein Collateral von mind.{' '}
          {parseFloat(newCollateralMinValue).toFixed(2)}$ hinterlegen.
        </p>

        <p>
          {newCollateralValue > newCollateralMinValue * 1.1 &&
            'Alles im grünen Bereich.'}

          {newCollateralValue > newCollateralMinValue * 1.1 &&
            values.newPrice >= 50 &&
            ' #RoadTo50 🚀'}

          {newCollateralValue <= newCollateralMinValue &&
            'Du wirst liquidiert.'}

          {newCollateralValue > newCollateralMinValue &&
            newCollateralValue <= newCollateralMinValue * 1.1 &&
            'Achtung! Du näherst Dich der Liquidierungsgrenze. Hinterlege entweder mehr Sicherheiten im Collateral oder zahle einen Teil Deines Loans zurück.'}
        </p>
      </div>
    </Fragment>
  );
}
