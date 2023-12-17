import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Menu } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import { useActions, useAppSelector } from 'common/hooks';
import { RequestStatusType } from 'app/app.reducer';
import { selectAppStatus } from 'app/app.selectors';
import { authThunks } from 'features/auth/model/auth.reducer';
import { selectIsLoggedIn } from 'features/auth/model/auth.selectors';

export const AppHeader = () => {
  const status = useAppSelector<RequestStatusType>(selectAppStatus);
  const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn);

  const { logout } = useActions(authThunks);

  const onLogoutHandler = () => {
    logout();
  };

  return (
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
  );
};
