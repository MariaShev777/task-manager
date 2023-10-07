import React from "react";
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
import {useAppSelector} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar";
import {TaskType} from "../api/todolists-api";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";


export type TasksStateType = {
    [key: string]: TaskType[]
}


function App() {

    const status = useAppSelector<RequestStatusType>(state => state.app.status);


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
                    <Button color="inherit">Login</Button>
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
