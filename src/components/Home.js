import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Title from './Title';
import CreateVault from './CreateVault';
import LoanSchemes from './LoanSchemes';
import Collateral from './Collateral';
import Loan from './Loan';
import Result from './Result';
import Referral from './Referral';
import Links from './Links';
import Footer from './Footer';

import loanSchemes from '../data/loanSchemes';
import tokensList from '../data/tokens';

export default function Home() {
  const [values, setValues] = useState({
    amount: '1000',
    price: null,
    loanScheme: '0',
    test: {
      hallo: '',
    },
    loan: '600',
    newPrice: null,
  });

  const [tokens, setTokens] = useState(tokensList);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API)
      .then((response) => {
        setTokens({
          ...tokens,
          DFI: {
            ...tokens.DFI,
            price: parseFloat(
              response.data?.coins.find((coin) => coin.id === 'DFI').priceUSD
            ),
            newPrice: parseFloat(
              response.data?.coins.find((coin) => coin.id === 'DFI').priceUSD
            ),
          },
          dBTC: {
            ...tokens.dBTC,
            price: parseFloat(
              response.data?.coins.find((coin) => coin.id === 'BTC').priceUSD
            ),
            newPrice: parseFloat(
              response.data?.coins.find((coin) => coin.id === 'BTC').priceUSD
            ),
          },
          dUSDC: {
            ...tokens.dUSDC,
            price: parseFloat(
              response.data?.coins.find((coin) => coin.id === 'USDC').priceUSD
            ),
            newPrice: parseFloat(
              response.data?.coins.find((coin) => coin.id === 'USDC').priceUSD
            ),
          },
          dUSDT: {
            ...tokens.dUSDT,
            price: parseFloat(
              response.data?.coins.find((coin) => coin.id === 'USDT').priceUSD
            ),
            newPrice: parseFloat(
              response.data?.coins.find((coin) => coin.id === 'USDT').priceUSD
            ),
          },
        });
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleTokens = (token, prop) => (event) => {
    setTokens({
      ...tokens,
      [token]: {
        ...tokens[token],
        [prop]: event.target.value,
      },
    });
  };

  const sum = {
    DFI: tokens.DFI.price * tokens.DFI.amount,
    dBTC: tokens.dBTC.price * tokens.dBTC.amount,
    dUSDC: tokens.dUSDC.price * tokens.dUSDC.amount,
    dUSDT: tokens.dUSDT.price * tokens.dUSDT.amount,
  };

  const total = sum.DFI + sum.dBTC + sum.dUSDC + sum.dUSDT;

  const dfiShare = (100 / total) * sum.DFI;

  return (
    <>
      <Container>
        <Title />
        <CreateVault />
        <LoanSchemes
          values={values}
          loanSchemes={loanSchemes}
          handleChange={handleChange}
        />
        <Collateral
          handleTokens={handleTokens}
          tokens={tokens}
          sum={sum}
          total={total}
          dfiShare={dfiShare}
        />
        <Loan
          values={values}
          loanSchemes={loanSchemes}
          handleChange={handleChange}
          total={total}
          dfiShare={dfiShare}
        />
        <Result
          values={values}
          loanSchemes={loanSchemes}
          handleTokens={handleTokens}
          tokens={tokens}
          total={total}
        />
        <Referral />
        <Links />
      </Container>
      <Footer />
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
