import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Alert from '@mui/material/Alert';
import axios from 'axios';

import jellyfish from '../assets/svg/jellyfish.svg';

import loanSchemes from '../data/loanSchemes';
import referrals from '../data/referrals';
import links from '../data/links';

export default function Home() {
  const [values, setValues] = useState({
    amount: '1000',
    price: null,
    loanScheme: '0',
    loan: '600',
    newPrice: null,
  });

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API)
      .then((response) => {
        const dfi = response.data?.coins.find((coin) => coin.id === 'DFI');
        setValues({
          ...values,
          price: parseFloat(dfi.priceUSD).toFixed(2),
          newPrice: parseFloat(dfi.priceUSD).toFixed(2),
        });
      })
      .catch((error) => console.log(error));
  }, [values]);

  console.log(values.price);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const collateralInUsd = values.price * values.amount;
  const maxLoanInUsd =
    (collateralInUsd / loanSchemes[values.loanScheme].collateral) * 100;

  const newCollateralValue = values.amount * values.newPrice;
  const newCollateralMinValue =
    (values.loan / 100) * loanSchemes[values.loanScheme].collateral;

  const [alert, setAlert] = useState({ status: '', message: '' });

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
          'Achtung! Du näherst Dich der Liquidierungsgrenze. Hinterlege entweder mehr Sicherheiten im Collateral oder zahle einen Teil Deines Loans zurück.',
      });
    }
  }, [newCollateralValue, newCollateralMinValue, values.newPrice]);

  return (
    <>
      <Container>
        <Title>
          <img src={jellyfish} alt="DeFi Chain Jellyfish" />
          DefiChain Loan-Rechner
        </Title>
        <Step>
          <Heading>1. Schritt: Vault erstellen</Heading>
          <Text>
            Hier entstehen Kosten in Höhe von 2 DFI. Ein DFI wird geburned, der
            andere wird beim Auflösen des Vaults zurückerstattet. Hinzu kommen
            noch die Transaktionsgebühren.
          </Text>
        </Step>
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
                  control={<Radio />}
                  label={`Minimum Collateral - ${scheme.collateral}% - ${scheme.interestRate}% Zinsen`}
                />
              ))}
            </RadioGroup>
          </div>
        </Step>
        <Step>
          <Heading>3. Schritt: Collateral hinterlegen</Heading>
          <Text>
            Das Collateral muss zu mind. 50% aus DFI bestehen, der Rest kann
            entweder DFI oder dBTC, dETH, dUSDC etc. sein. Andere Assets haben
            ggf. unterschiedliche Gewichtungen (collateral factor). Momentan
            unterstützt dieser Rechner nur die Variante, dass 100% in DFI als
            Collateral hinterlegt werden.
          </Text>
          <InputGroup>
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
                step: '0.2',
                'aria-label': 'Dollar-Preis',
              }}
            />
          </InputGroup>
        </Step>
        <Step>
          <Heading>4. Schritt: Kredithöhe wählen</Heading>
          <Text>
            Mit {parseFloat(values.amount)} DFI und dem gewählten Loan-Schema (
            {loanSchemes[values.loanScheme].collateral}%,{' '}
            {loanSchemes[values.loanScheme].interestRate}% Zinsen) kannst Du bis
            zu {parseFloat(maxLoanInUsd).toFixed(2)}$ minten. Du solltest
            allerdings weniger minten, da Du sonst sofort an der Grenze bist und
            liquidiert wirst.
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
                step: '0.2',
                'aria-label': 'Neuer DFI-Preis',
                min: 0,
              }}
            />
            <Text>
              Der Wert Deines Collaterals ist{' '}
              {values.newPrice < values.price && 'gesunken'}
              {values.newPrice > values.price && 'gestiegen'}
              {values.newPrice === values.price && 'unverändert'}. Dein
              Collateral hat dadurch einen Wert von{' '}
              {parseFloat(values.amount * values.newPrice).toFixed(2)}$ und ist
              damit{' '}
              {values.newPrice < values.price &&
                `${parseFloat(
                  Math.abs(
                    values.amount * values.price -
                      values.amount * values.newPrice
                  )
                ).toFixed(2)}$ niedriger als `}
              {values.newPrice > values.price &&
                `${parseFloat(
                  Math.abs(
                    values.amount * values.price -
                      values.amount * values.newPrice
                  )
                ).toFixed(2)}$ höher als `}
              {values.newPrice === values.price && 'genauso wie hoch '}
              am Anfang. Du hast eine Summe von{' '}
              {parseFloat(values.loan).toFixed(2)}$ gemintet und musst dafür ein
              Collateral von mind.{' '}
              {parseFloat(newCollateralMinValue).toFixed(2)}$ hinterlegen.
            </Text>

            <Alert variant="filled" severity={alert.status}>
              {alert.message}
            </Alert>
          </div>
        </Step>
        <Step>
          <Heading>Neu im DeFiChain Game?</Heading>
          <Text>
            Wenn Du noch keinen Account bei Cake DeFi und/oder DFX Swiss hast,
            würde ich mich freuen, wenn Du für Deine Anmeldung meinen
            Referral-Link nutzt. Wir bekommen dann beide einen Bonus 🙂
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
        <Step>
          <Heading>Weitere Informationen zu den Loans:</Heading>
          <UnorderedList>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <b>{link.text}</b> ({link.description})
                </Link>
              </li>
            ))}
          </UnorderedList>
        </Step>
      </Container>
      <Footer>
        Peter R. Stuhlmann, 2021 |{' '}
        <Link
          href="https://peter-stuhlmann-webentwicklung.de/impressum"
          target="_blank"
          rel="noreferrer noopener"
        >
          Impressum
        </Link>{' '}
        |{' '}
        <Link
          href="https://peter-stuhlmann-webentwicklung.de/datenschutzerklaerung"
          target="_blank"
          rel="noreferrer noopener"
        >
          Datenschutzerklärung
        </Link>
      </Footer>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;

  img {
    margin-right: 20px;
    margin-bottom: -5px;
    height: 60px;
  }
`;

const Step = styled.div`
  background-color: #fff;
  padding: 25px;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
  border-radius: 20px;
  margin: 25px 0;
`;

const Heading = styled.h2`
  margin: 30px 0 15px 0;
`;

const InputGroup = styled.div``;

const Input = styled(OutlinedInput)`
  width: 100%;
  max-width: 300px;
  margin: 5px 15px 5px 0;

  &:last-child {
    margin: 5px 0 5px 0;
  }
`;

const Text = styled.p`
  line-height: 1.5em;
`;

const OrderedList = styled.ol`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const UnorderedList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const Link = styled.a`
  text-decoration: none;
  color: #000;
`;

const Footer = styled.footer`
  color: #7d7d7d;
  font-size: 13px;
  padding: 3px 10px;
  text-align: center;

  a {
    color: #7d7d7d;
  }
`;
