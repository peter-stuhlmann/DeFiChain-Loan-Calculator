import React, { forwardRef } from 'react';
import MuiSnackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Snackbar(props) {
  const { snackbar, setSnackbar } = props;

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <MuiSnackbar
      open={snackbar.open}
      autoHideDuration={4000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={snackbar.color || 'success'}
      >
        {snackbar.message}
      </Alert>
    </MuiSnackbar>
  );
}
