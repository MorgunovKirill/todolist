import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolist-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodolistDomainType, TodolistType} from '../types';


let startState:  Array<TodolistDomainType>;
let todoListId1: string;
let todoListId2: string;

beforeEach(
    () => {
        todoListId1 = v1()
        todoListId2 = v1()
        startState = [
            {id: todoListId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
            {id: todoListId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
        ]
    }
)

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todoListId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});


test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todoListId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";
    const endState = todolistsReducer(startState, changeTodolistFilterAC(todoListId2 ,newFilter));
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
