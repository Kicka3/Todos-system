import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "../../App";
import {AddItemForm} from "../addItemForm/AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    tasks: Array<TaskType>
    title: string
    id: string
    removeTask: (todolistId: string, taskID: string) => void
    addTask: (todolistId: string, titleInput: string) => void
    changeTaskFilter: (filterValue: FilterValuesType, todolistID: string) => void
    changeTaskStatus: (todolistId: string, taskID: string, newTaskStatus: boolean) => void
    removeTodolist: (todolistId: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {
        title,
        tasks,
        removeTask,
        addTask,
        changeTaskFilter,
        changeTaskStatus,
        id,
        removeTodolist,
    } = props;

    const mapedTodolists = tasks.map(el => {
        const removeTaskHandler = () => {
            removeTask(id, el.id);
        };

        const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newTaskStatus = e.currentTarget.checked;
            changeTaskStatus(id, el.id, newTaskStatus);
        }

        return (
            <li key={el.id}
                className={el.isDone ? 'IsDone' : ''}>
                <button onClick={removeTaskHandler}>X</button>
                <span>{el.title}</span>
                <input type="checkbox"
                       checked={el.isDone}
                       onChange={changeStatusHandler}
                />
            </li>
        );
    });

    const allFilterHandler = () => {
        changeTaskFilter('all', id);
    };

    const activeFilterHandler = () => {
        changeTaskFilter('active', id);
    };

    const completedFilterHandler = () => {
        changeTaskFilter('completed', id);
    };

    const removeTodoHandler = () => {
        removeTodolist(id);
    };

    const addTaskFromAddItemFrom = (titleInput: string) => {
        addTask(id, titleInput);
    };

    return (
        <div>
            <div className={'TitleWrapper'}>
                <h3>{title}</h3>
                <button onClick={removeTodoHandler}>X</button>
            </div>
            <AddItemForm addItem={addTaskFromAddItemFrom}/>
            <ul>
                {mapedTodolists}
            </ul>
            <div>
                <button onClick={allFilterHandler}>All</button>
                <button onClick={activeFilterHandler}>Active</button>
                <button onClick={completedFilterHandler}>Completed</button>
            </div>
        </div>
    );
};

