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
  }, []);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

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
        <Collateral values={values} handleChange={handleChange} />
        <Loan
          values={values}
          loanSchemes={loanSchemes}
          handleChange={handleChange}
        />
        <Result
          values={values}
          loanSchemes={loanSchemes}
          handleChange={handleChange}
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
