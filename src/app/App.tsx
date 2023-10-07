import React, {useEffect} from "react";
import './App.css';
import {Menu} from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import LinearProgress from '@mui/material/LinearProgress';
import {useAppDispatch, useAppSelector} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {CircularProgress} from "@mui/material";
import {logoutTC} from "../features/Login/auth-reducer";



function App() {
    const status = useAppSelector<RequestStatusType>(state => state.app.status);
    const isInitialised = useAppSelector<boolean>(state => state.app.isInitialised);
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAppTC());
    }, [])


    if (!isInitialised) {
        return <div
            style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
            <CircularProgress color="secondary"/>
        </div>
    }


    const onLogoutHandler = () => {
        dispatch(logoutTC());
    }

    return (
        <div className="App" >
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button onClick={onLogoutHandler} sx={{fontSize: '17px', marginLeft: 'auto'}}
                                           color="inherit">Log Out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container fixed sx={{marginTop: '50px'}}>
                <Routes>
                    <Route path='/' element={<TodolistsList />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path='*' element={<Navigate to='/404'/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App;
