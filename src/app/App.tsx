import React from "react";
import './App.css';
import {TaskType} from "../api/tasks-api";
import {Menu} from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";


export type TasksStateType = {
    [key: string]: TaskType[]
}


function App() {

    return (
        <div className="App">
            <AppBar position="static" sx={{marginBottom: '70px'}}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl" fixed>
                <TodolistsList />
            </Container>

        </div>
    )
}

export default App;
