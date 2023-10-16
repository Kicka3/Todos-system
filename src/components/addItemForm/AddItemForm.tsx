import React, {ChangeEvent, useState} from 'react';

type AddItemFormType = {}

export const AddItemForm: React.FC<AddItemFormType> = (props) => {
    const { } = props

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
    const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTaskHandler()
        }
    }
    return (
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
    );
};

