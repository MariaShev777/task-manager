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
import Grid from "@mui/material/Grid";


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
                <TodolistsList />
            </Container>

        </div>
    )
}

export default App;
