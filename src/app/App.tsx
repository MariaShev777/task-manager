import React, { useEffect } from 'react';
import './App.css';
import { Menu } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { TodolistsList } from 'features/todolistsList/TodolistsList';
import LinearProgress from '@mui/material/LinearProgress';
import { initializeAppTC, RequestStatusType } from 'app/app.reducer';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from 'features/auth/ui/login/Login';
import { CircularProgress } from '@mui/material';
import { logoutTC } from 'features/auth/model/auth.reducer';
import { selectAppStatus, selectIsInitialised } from 'app/app.selectors';
import { selectIsLoggedIn } from 'features/auth/model/auth.selectors';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { ErrorSnackbar } from 'common/components';

function App() {
  const status = useAppSelector<RequestStatusType>(selectAppStatus);
  const isInitialised = useAppSelector<boolean>(selectIsInitialised);
  const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  if (!isInitialised) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  const onLogoutHandler = () => {
    dispatch(logoutTC());
  };

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          {isLoggedIn && (
            <Button onClick={onLogoutHandler} sx={{ fontSize: '17px', marginLeft: 'auto' }} color="inherit">
              Log Out
            </Button>
          )}
        </Toolbar>
        {status === 'loading' && (
          <LinearProgress
            sx={{
              position: 'absolute',
              top: 63,
              width: '100%',
            }}
            color="secondary"
          />
        )}
      </AppBar>
      <Container fixed sx={{ marginTop: '50px' }}>
        <Routes>
          <Route path="/" element={<TodolistsList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
