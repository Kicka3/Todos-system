import React, {useState} from 'react';
import './App.css';
import TodoListCard, {TasksType} from "./components/todoListCard/TodoListCard";



export type FilteredValueType = 'all' | 'active' | 'completed';

function App() {
    const todoListTitle1: string = "What to learn";

    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: crypto.randomUUID(), titleTask: "HTML&CSS", isDone: true},
        {id: crypto.randomUUID(), titleTask: "JS", isDone: true},
        {id: crypto.randomUUID(), titleTask: "TS", isDone: false},
        {id: crypto.randomUUID(), titleTask: "React", isDone: false},
        {id: crypto.randomUUID(), titleTask: "Redux", isDone: false},
    ]);

    // Переделал на метод с фильтром
    // const removeTask = (taskId: number) => {
    //     const newState: Array<TasksType> = [];
    //     for (let i = 0; i < tasks.length; i++) {
    //         if (tasks[i].id !== taskId) {
    //             newState.push(tasks[i])
    //         }
    //     }
    //     setTasks(newState);
    // }
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }




    const [filter, setFilter] = useState<FilteredValueType>('all')

    const getFilteredTaskForRender = (allTasks: Array<TasksType>, filterValue: FilteredValueType) => {
        if (filterValue === 'active') {
            return allTasks.filter(task => task.isDone === false)
        }
        if (filterValue === 'completed') {
            return allTasks.filter(task => task.isDone === true)
        }
        return allTasks;
    }

    const filteredTasksForRender: Array<TasksType> = getFilteredTaskForRender(tasks, filter)
    const changeFilter = (nextFilterValue: FilteredValueType) => {
        setFilter(nextFilterValue);
    }
    return (
        <div className="App">
            <TodoListCard title={todoListTitle1}
                          tasks={filteredTasksForRender}
                          removeTask={removeTask}
                          changeFilter={changeFilter}/>
        </div>
    )
}

export default App;
