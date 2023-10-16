import React, {useState} from 'react';
import './App.css';
import TodoListCard, {TasksType} from "./components/todoListCard/TodoListCard";


export type FilteredValueType = 'all' | 'active' | 'completed';

function App() {
    type TodolistsType = {
        id: string
        title: string
        filter: FilteredValueType
    }

    type TaskStateType = {
        [key: string]: TasksType[]
    }

    let todolistID1 = crypto.randomUUID()
    let todolistID2 = crypto.randomUUID()

    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true},
            {id: crypto.randomUUID(), title: 'JS', isDone: true},
            {id: crypto.randomUUID(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: crypto.randomUUID(), title: 'Rest API', isDone: true},
            {id: crypto.randomUUID(), title: 'GraphQL', isDone: false},
        ]
    })


    const removeTask = (todolistID: string, taskId: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskId)})
    }

    const addTask = (todolistID: string, title: string) => {
        let newTask = {id: crypto.randomUUID(), title: title, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        console.log('OK, Хочу поменять статус')
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, isDone} : el)})
    }

    const changeFilter = (todolistID: string, nextFilterValue: FilteredValueType) => {
        let todolist = todolists.find(tl => tl.id === todolistID);
        if (todolist) {
            todolist.filter = nextFilterValue
        }
        setTodolists([...todolists]);
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID));
        delete tasks[todolistID]
        setTasks({...tasks});
    }

    const addItem = () => {
        console.log('Кто я?!')
    }

    return (
        <div className="App">
            {todolists.map(tl => {
                let tasksForTodoList = tasks[tl.id]
                if (tl.filter === 'active') {
                    tasksForTodoList = tasks[tl.id].filter(el => !el.isDone)
                }
                if (tl.filter === 'completed') {
                    tasksForTodoList = tasks[tl.id].filter(el => el.isDone)
                }
                return (
                    <TodoListCard key={tl.id}
                                  title={tl.title}
                                  tasks={tasksForTodoList}
                                  todoID={tl.id}
                                  removeTask={removeTask}
                                  addTask={addTask}
                                  changeFilter={changeFilter}
                                  changeTaskStatus={changeTaskStatus}
                                  removeTodolist={removeTodolist}

                                  addItem={addItem}
                    />
                )
            })}
        </div>
    )
}

export default App;
