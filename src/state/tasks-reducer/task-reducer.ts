import {TasksStateType, TodolistType} from "../../App";
import {v1} from "uuid";
import exp from "constants";
import {AddTodolistACType} from "../todolists-reducer/todolists-reducer";

type MainTypeTaskReducer =
    addTaskACType
    | removeTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | AddTodolistACType


let initialState: TasksStateType = {};
export const tasksReducer = (state: TasksStateType = initialState, action: MainTypeTaskReducer): TasksStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.payload.titleInput, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskID)
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskID ? {
                    ...el,
                    isDone: action.payload.newTaskStatus
                } : el)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskID ? {
                    ...el,
                    title: action.payload.newTaskTitle
                } : el)
            }
        }
        case "ADD-TODOLIST": {
            return {[action.payload.todolistID]: [], ...state}
        }
        default:
            return state
    }
};

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, titleInput: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId: todolistId,
            titleInput: titleInput,
        }
    } as const
};


type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId: todolistId,
            taskID: taskID,
        }
    } as const
};

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, taskID: string, newTaskStatus: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistId,
            taskID,
            newTaskStatus,
        }
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, taskID: string, newTaskTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId,
            taskID,
            newTaskTitle,

        }
    } as const
}

