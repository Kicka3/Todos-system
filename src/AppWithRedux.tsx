import './App.css';
import {TaskType, Todolist} from "./components/todolist/Todolist";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasks-reducer/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store/Store";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();


    const changeTaskFilter = (filterValue: FilterValuesType, todolistID: string) => {
        const action = changeTodolistFilterAC(filterValue, todolistID);
        dispatch(action)
    };

    const removeTask = (todolistId: string, taskID: string) => {
        const action = removeTaskAC(todolistId, taskID);
        dispatch(action);
    };

    const addTask = (todolistId: string, titleInput: string) => {
        const action = addTaskAC(todolistId, titleInput);
        dispatch(action);
    };

    const changeTaskStatus = (todolistId: string, taskID: string, newTaskStatus: boolean) => {
        const action = changeTaskStatusAC(todolistId, taskID, newTaskStatus);
        dispatch(action);
    };

    const changeTaskTitle = (todolistId: string, taskID: string, newTaskTitle: string) => {
        const action = changeTaskTitleAC(todolistId, taskID, newTaskTitle);
        dispatch(action);
    };


    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId);
        dispatch(action);
    };

    const changeTodolistTitle = (todolistId: string, newTodolistTitle: string) => {
        const action = changeTodolistTitleAC(todolistId, newTodolistTitle)
        dispatch(action);
    };

    const mapedTodolists = todolists.map(el => {
        let allTodolistTasks = tasks[el.id]
        let tasksForTodolist = allTodolistTasks

        if (el.filter === 'active') {
            tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
        }
        if (el.filter === 'completed') {
            tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
        }
        return <Todolist key={el.id}
                         id={el.id}
                         tasks={tasksForTodolist}
                         title={el.title}
                         removeTask={removeTask}
                         addTask={addTask}
                         changeTaskFilter={changeTaskFilter}
                         changeTaskStatus={changeTaskStatus}
                         removeTodolist={removeTodolist}
                         changeTaskTitle={changeTaskTitle}
                         changeTodolistTitle={changeTodolistTitle}
        />
    });

    const addTodolist = (titleInput: string) => {
        const action = addTodolistAC(titleInput);
        dispatch(action);
    };

    return (
        <div className={"App"}>
            <AddItemForm addItem={addTodolist}/>
            {mapedTodolists}
        </div>
    );
}
export default AppWithRedux;
