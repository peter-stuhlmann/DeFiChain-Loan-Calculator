import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Title from './Title';
import CreateVault from './CreateVault';
import LoanSchemes from './LoanSchemes';
import Collateral from './Collateral';
import Loan from './Loan';
import Result from './Result';
import SocialMediaShare from './SocialMediaShare';
import Referral from './Referral';
import Links from './Links';
import Footer from './Footer';
import Snackbar from './Snackbar';

import loanSchemes from '../data/loanSchemes';
import tokensList from '../data/tokens';
import Loading from './Loading';

export default function Home() {
  const [values, setValues] = useState({
    loanScheme: '0',
    loan: '1000',
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    color: 'success',
  });

  const [tokens, setTokens] = useState(tokensList);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + '/prices')
      .then((response) => {
        setTokens({
          ...tokens,
          DFI: {
            ...tokens.DFI,
            price: response.data[1].price,
            newPrice: response.data[1].price,
          },
          dBTC: {
            ...tokens.dBTC,
            price: response.data[2].price,
            newPrice: response.data[2].price,
          },
          dETH: {
            ...tokens.dETH,
            price: response.data[3].price,
            newPrice: response.data[3].price,
          },
          dUSD: {
            ...tokens.dUSD,
            price: response.data[0].price,
            newPrice: response.data[0].price,
          },
          dUSDC: {
            ...tokens.dUSDC,
            price: response.data[4].price,
            newPrice: response.data[4].price,
          },
          dUSDT: {
            ...tokens.dUSDT,
            price: response.data[5].price,
            newPrice: response.data[5].price,
          },
        });
        setIsLoaded(true);
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
    DFI: tokens.DFI.price * tokens.DFI.amount * tokens.DFI.factor,
    dBTC: tokens.dBTC.price * tokens.dBTC.amount * tokens.dBTC.factor,
    dETH: tokens.dETH.price * tokens.dETH.amount * tokens.dETH.factor,
    dUSD: 1 * tokens.dUSD.amount * tokens.dUSD.factor,
    dUSDC: tokens.dUSDC.price * tokens.dUSDC.amount * tokens.dUSDC.factor,
    dUSDT: tokens.dUSDT.price * tokens.dUSDT.amount * tokens.dUSDT.factor,
  };

  const total =
    sum.DFI + sum.dBTC + sum.dETH + sum.dUSD + sum.dUSDC + sum.dUSDT;

  const dfiShare = (100 / total) * (sum.DFI + sum.dUSD);

  return isLoaded ? (
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
          loanSchemeIndex={values.loanScheme}
        />
        <Result
          values={values}
          loanSchemes={loanSchemes}
          handleTokens={handleTokens}
          tokens={tokens}
          total={total}
        />
        <SocialMediaShare />
        <Referral />
        <Links />
      </Container>
      <Footer />
      <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
    </>
  ) : (
    <Loading setIsLoaded={setIsLoaded} setSnackbar={setSnackbar} />
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;
