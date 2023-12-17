import React, { useEffect } from 'react';
import './App.css';
import Container from '@mui/material/Container';
import { CircularProgress } from '@mui/material';
import { selectIsInitialised } from 'app/app.selectors';
import { useActions, useAppSelector } from 'common/hooks';
import { ErrorSnackbar } from 'common/components';
import { authThunks } from 'features/auth/model/auth.reducer';
import { AppRoutes } from 'app/appRoutes';
import { AppHeader } from 'app/appHeader';

function App() {
  const isInitialised = useAppSelector<boolean>(selectIsInitialised);

  const { initializeApp } = useActions(authThunks);

  useEffect(() => {
    initializeApp();
  }, []);

  if (!isInitialised) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppHeader />
      <Container fixed sx={{ marginTop: '50px' }}>
        <AppRoutes />
      </Container>
    </div>
  );
}

export default App;
