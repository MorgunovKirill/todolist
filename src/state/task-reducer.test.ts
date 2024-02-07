import {v1} from "uuid";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TasksStateType, TaskType} from "../App";

let state: TasksStateType;
let todoListId1: string;
let todoListId2: string;
let todoListId3: string;

beforeEach(() => {
        todoListId1 = v1()
        todoListId2 = v1()
        todoListId3 = v1()
        state = {
            [todoListId1]: [
                {id: '1', title: 'HTML', isDone: true},
                {id: '2', title: 'CSS', isDone: true},
                {id: '3', title: 'JS', isDone: false},
            ],
            [todoListId2]: [
                {id: '1', title: 'beer', isDone: true},
                {id: '2', title: 'fish', isDone: true},
                {id: '3', title: 'bread', isDone: false},
                {id: '4', title: 'cheeps', isDone: false},
                {id: '5', title: 'cheese', isDone: false},
            ],
            [todoListId3]: [
                {id: '1', title: 'bar', isDone: false},
                {id: '2', title: 'chess', isDone: true},
                {id: '3', title: 'books', isDone: false},
            ]
        }
    }
)

test('2 todolist should be incremented by 1 new Task', () => {
    //action
    const newState = tasksReducer(state, addTaskAC(todoListId2, 'New title'))

    //expectation

    expect(newState[todoListId2].length).toBe(6)

})


test('1 todolist 1 task should be removed', () => {
    const taskIdToChange = '1'

    //action
    const newState = tasksReducer(state, removeTaskAC(todoListId1, taskIdToChange))

    //expectation

    expect(newState[todoListId1].length).toBe(2)
    expect(newState[todoListId1].every(task => task.id !== taskIdToChange)).toBeTruthy()
})


test('First Task of 3 todolist title should be changed to "Bar"', () => {
    const taskIdToChange = '1'

    //action
    const newState = tasksReducer(state, changeTaskTitleAC(todoListId3, taskIdToChange, 'Bar'))

    //expectation

    expect(newState[todoListId3].find((el) => el.id === taskIdToChange)?.title).toBe('Bar')
})


test('Second Task of 2 todolist title should be changed to false"', () => {
    const taskIdToChange = '2'

    //action
    const newState = tasksReducer(state, changeStatusAC(todoListId2, taskIdToChange, false))

    //expectation

    expect(newState[todoListId1].find((el) => el.id === taskIdToChange)?.isDone).toBeTruthy()
    expect(newState[todoListId2].find((el) => el.id === taskIdToChange)?.isDone).toBeFalsy()
})
