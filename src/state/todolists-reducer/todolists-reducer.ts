import {FilterValuesType, TodolistType} from "../../App";
import {v1} from "uuid";


type MainTypeTodolistReducer =
    RemoveTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType
    | AddTodolistACType

export const todolistsReducer = (state: TodolistType[], action: MainTypeTodolistReducer): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todolistID)
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.todolistId ? {
                ...el,
                title: action.payload.newTodolistTitle
            } : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.payload.todolistID ? {
                ...el,
                filter: action.payload.filterValue
            } : el)
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = {id: action.payload.todolistID, title: action.payload.titleInput, filter: 'all'};
            return [newTodolist, ...state]
        }
        default:
            return state
    }
};


type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistID: todolistID
        }
    } as const
};

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId: todolistId,
            newTodolistTitle: newTodolistTitle,
        }
    } as const
};

type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (filterValue: FilterValuesType, todolistID: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            filterValue,
            todolistID
        }
    } as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (titleInput: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            titleInput,
            todolistID: v1()
        }
    } as const
}