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


    const changeAllFilterHandler = () => {
        changeFilter(props.todoID, 'all');
    }
    const changeActiveFilterHandler = () => {
        changeFilter(props.todoID, 'active');
    }
    const changeComplitedFilterHandler = () => {
        changeFilter(props.todoID, 'completed');
    }




    const RemoveTodolistHandler = () => {
        props.removeTodolist(todoID)
    }

    return (
        <div className={"CardWrapper"}>
            <div className="todolistTitleWrapper">
                <h3 className={"CardTitle"}>{title}
                    <button className={"RemoveBtn"}
                            onClick={RemoveTodolistHandler}>✖️
                    </button>
                </h3>
            </div>
            <div>


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