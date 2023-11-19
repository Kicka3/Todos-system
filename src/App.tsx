import './App.css';
import {TaskType, Todolist} from "./components/todolist/Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./components/addItemForm/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'},
        ]
    );

    const [tasks, setTasks] = useState<TasksStateType>(
        {
            [todolistID1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
            ],
            [todolistID2]: [
                {id: v1(), title: 'Rest API', isDone: true},
                {id: v1(), title: 'GraphQL', isDone: false},
            ]
        }
    );


    const changeTaskFilter = (filterValue: FilterValuesType, todolistID: string) => {
        let totolist = todolists.find(el => el.id === todolistID)
        if (totolist) {
            totolist.filter = filterValue
            setTodolists([...todolists])
        }
    };

    const removeTask = (todolistId: string, taskID: string) => {
        setTasks(
            {...tasks, [todolistId]: [...tasks[todolistId].filter(el => el.id !== taskID)]}
        );
    };

    const addTask = (todolistId: string, titleInput: string) => {
        let newTask = {id: v1(), title: titleInput, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
    };

    const changeTaskStatus = (todolistId: string, taskID: string, newTaskStatus: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskID ? {...el, isDone: newTaskStatus} : el)
        });
    };

    const changeTaskTitle = (todolistId: string, taskID: string, newTaskTitle: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskID ? {...el, title: newTaskTitle} : el)
        });
    };


    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId));
        delete tasks[todolistId]
    };

    const changeTodolistTitle = (todolistId: string, newTodolistTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: newTodolistTitle} : el))
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
        let newTodolistID = todolistID1;
        let newTodolist: TodolistType = {id: newTodolistID, title: titleInput, filter: 'all'}
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [newTodolistID]: []});
    };

    return (
        <div className={"App"}>
            <AddItemForm addItem={addTodolist}/>
            {mapedTodolists}
        </div>
    );
}


export default App;
