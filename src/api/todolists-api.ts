import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '0bcedaa4-1f0f-4539-8da0-be2bd092c459'
    }
})

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistType>('todo-lists');
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists/', {title});
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title});
    },
}



type TodolistType = {
    id: string,
    title: string,
    addedDate: Date,
    order: number
}

type ResponseType<D = {}> = {
    data: D
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}