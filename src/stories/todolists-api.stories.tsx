import {useEffect, useState} from "react";
import {todolistsApi} from "../api/todolists-api";


export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsApi.getTodolists()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    )
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '5a53d600-ed86-428b-ac22-bff6f24e160d';
        todolistsApi.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    )
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = 'MASHA';
        todolistsApi.createTodolist(title)
            .then((res) => {
                setState(res.data);
            })
    }, [])


    return (
        <div>{JSON.stringify(state)}</div>
    )
}

export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '5fe80771-1c9c-4686-b5b3-61df485e01ba';
        const title = 'SHEV';
        todolistsApi.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    )
}