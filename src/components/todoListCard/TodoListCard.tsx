import React, {ChangeEvent, FC, useState} from 'react';
import {FilteredValueType} from "../../App";


export type TasksType = {
    id: string,
    title: string,
    isDone: boolean,

}

type TodoListCardPropsType = {
    title: string,
    tasks: Array<TasksType>
    todoID: string
    removeTask: (todolistID: string, taskId: string) => void,
    addTask: (todolistID: string, title: string) => void
    changeFilter: (todolistID: string, nextFilterValue: FilteredValueType) => void,
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    removeTodolist: (todolistID: string) => void
}


const TodoListCard: FC<TodoListCardPropsType> = (props) => {
    const {
        title,
        tasks,
        removeTask,
        addTask,
        changeFilter,
        todoID,
        changeTaskStatus,
        removeTodolist,
        ...setProps
    } = props

    const [taskTitle, setTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);


    const listItems: Array<JSX.Element> | JSX.Element = tasks.map(el => {
        const onClickRemoveTaskHandler = () => {
            removeTask(todoID, el.id)
        }

        const TaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            console.log('МЕНЯЙ!')
            changeTaskStatus(todoID, el.id, e.currentTarget.checked)
        }

        return (
            <li className={"TodoListWrapperLi"}
                key={el.id}>
                <input className={"TodoTask"}
                       type="checkbox"
                       checked={el.isDone}
                       onChange={TaskStatusHandler}/>
                <span>{el.title}</span>
                <button className={"RemoveBtn"}
                        onClick={onClickRemoveTaskHandler}>✖️
                </button>
            </li>
        )
    });

    const TasksList: JSX.Element = tasks.length
        ? <ul>{listItems}</ul>
        : <span className={"EmptyTasksList"}>Your tasks lists is empty</span>


    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(todoID, taskTitle);
            setTaskTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
        setError('');
        console.log(e.currentTarget.value);
    }

    const changeAllFilterHandler = () => {
        changeFilter(props.todoID, 'all');
    }
    const changeActiveFilterHandler = () => {
        changeFilter(props.todoID, 'active');
    }
    const changeComplitedFilterHandler = () => {
        changeFilter(props.todoID, 'completed');
    }

    const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTaskHandler()
        }
    }

    const RemoveTodolistHandler = () => {
        props.removeTodolist(todoID)
    }

    return (
        <div className={"CardWrapper"}>
            <div className="todolistTitleWrapper">
                <h3 className={"CardTitle"}>{title}</h3>
                <button className={"RemoveBtn"}
                        onClick={RemoveTodolistHandler}>✖️
                </button>
            </div>
            <div>
                <div className={"TodoForm"}>
                    <div className="inputWrapper">
                        <input className={error ? "TodoInputError" : "TodoInput"}
                               value={taskTitle}
                               placeholder={"What is the task today?"}
                               onChange={onChangeInputHandler}
                               onKeyPress={keyPressHandler}
                        />
                        <button className={"TodoAddBtn"}
                                onClick={addTaskHandler}
                                disabled={!!error}
                        >+
                        </button>
                        {error && <div className={'error-message'}>{error}</div>}
                    </div>

                </div>

                <div className={"TodoListsWrapper"}>
                    <ul>
                        {TasksList}
                    </ul>
                </div>
            </div>

            <div className={"FilterBtnWrapper"}>
                <button className={"FilterBtn"} onClick={changeAllFilterHandler}>All</button>
                <button className={"FilterBtn"} onClick={changeActiveFilterHandler}>Active</button>
                <button className={"FilterBtn"} onClick={changeComplitedFilterHandler}>Completed</button>
            </div>

        </div>
    );
};

export default TodoListCard;