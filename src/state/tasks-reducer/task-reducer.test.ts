import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./task-reducer";
import {TasksStateType, TodolistType} from "../../App";



let startState: TasksStateType
beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    };
});

test('correct task should be added to correct array', () => {


    const action = addTaskAC('todolistId2', 'juce');

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce');
    expect(endState['todolistId2'][0].isDone).toBe(false);
});

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('todolistId2', '2');

    const endState = tasksReducer(startState, action);

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    });
});

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('todolistId2', '2', false);

    const endState = tasksReducer(startState, action);

    expect(startState['todolistId2'][1].isDone).toBe(true);
    expect(endState['todolistId2'][1].isDone).toBe(false);
});
test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('todolistId2', '2', false);

    const endState = tasksReducer(startState, action);

    expect(startState['todolistId2'][1].isDone).toBe(true);
    expect(endState['todolistId2'][1].isDone).toBe(false);
});

test('title of specified task should be changed', () => {

    let newTaskTitle = 'new TASK'
    const action = changeTaskTitleAC('todolistId2', '2', newTaskTitle);

    const endState = tasksReducer(startState, action);

    expect(startState['todolistId2'][1].title).toBe('milk');
    expect(endState['todolistId2'][1].title).toBe(newTaskTitle);
});
