import React, { useEffect } from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

import Text from './styled/Text';

export default function Loading(props) {
  const { setIsLoaded, setSnackbar } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setSnackbar({
        open: true,
        message: 'Preisabfrage fehlgeschlagen. Bitte manuell eingeben.',
        color: 'error',
      });
    }, 6000);
    return () => clearTimeout(timer);
  });

  return (
    <Container>
      <CircularProgress />
      <Text>Externe Daten (aktuelle Token-Preise) werden abgerufen...</Text>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;

  svg {
    color: #f069c5;
  }
`;
