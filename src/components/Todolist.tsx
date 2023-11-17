import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "../App";

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

    const [titleInput, setTitleInput] = useState<string>('');
    const [error, setError] = useState<string | null>(null)

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
        )
    })

    const addTaskHandler = () => {
        if (titleInput.trim() !== '') {
            addTask(id, titleInput.trim());
            setTitleInput('');
        } else {
            setError('Title is required')
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newTitle = e.currentTarget.value;
        setTitleInput(newTitle);
        setError('')
    };

    const pressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const allFilterHandler = () => {
        changeTaskFilter('all', id)
    };

    const activeFilterHandler = () => {
        changeTaskFilter('active', id)
    };

    const completedFilterHandler = () => {
        changeTaskFilter('completed', id)
    }

    const removeTodoHandler = () => {
        removeTodolist(id)
    }

    return (
        <div>
            <div className={'TitleWrapper'}>
                <h3>{title}</h3>
                <button onClick={removeTodoHandler}>X</button>
            </div>
            <div>
                <input type="text"
                       value={titleInput}
                       onChange={onChangeHandler}
                       onKeyPress={pressEnterHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}
                >+
                </button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
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

