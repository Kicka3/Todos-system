import React, {FC} from 'react';
import {FilteredValueType} from "../../App";


export type TasksType = {
    id: string,
    titleTask: string,
    isDone: boolean,

}

type TodoListCardPropsType = {
    title: string,
    tasks: Array<TasksType>,
    removeTask: (taskId: string) => void,
    changeFilter: (nextFilterValue: FilteredValueType) => void,
}


const TodoListCard: FC<TodoListCardPropsType> = ({
                                                     title,
                                                     tasks,
                                                     removeTask,
                                                     changeFilter
                                                 }) => {


    const listItems: Array<JSX.Element> | JSX.Element = tasks.map(el => {

        const onClickRemoveTaskHandler = () => {
            console.log(el.id)
            removeTask(el.id)
        }

        return (
            <li className={"TodoListWrapperLi"}
                key={el.id}>
                <input className={"TodoTask"}
                       type="checkbox"
                       checked={el.isDone}/>
                <span>{el.titleTask}</span>
                <button className={"RemoveBtn"}
                        onClick={onClickRemoveTaskHandler}>✖️
                </button>
            </li>
        )
    });

    const TasksList: JSX.Element = tasks.length
        ? <ul>{listItems}</ul>
        : <span className={"EmptyTasksList"}>Your tasks lists is empty</span>

    return (
        <div className={"CardWrapper"}>
            <h3 className={"CardTitle"}>{title}</h3>

            <div>
                <div className={"TodoForm"}>
                    <input className={"TodoInput"} placeholder={"What is the task today?"}/>
                    <button className={"TodoAddBtn"}>+</button>
                </div>

                <div className={"TodoListsWrapper"}>
                    <ul>
                        {TasksList}
                    </ul>
                </div>
            </div>

            <div className={"FilterBtnWrapper"}>
                <button className={"FilterBtn"} onClick={() => changeFilter('all')}>All</button>
                <button className={"FilterBtn"} onClick={() => changeFilter('active')}>Active</button>
                <button className={"FilterBtn"} onClick={() => changeFilter('completed')}>Completed</button>
            </div>

        </div>
    );
};

export default TodoListCard;