import {ChangeEvent, KeyboardEvent, FC, useState} from "react";
import {Button} from "./Button";
import {FilterValuesType} from "./App";
import Task from "./Task";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type PropsType = {
    title: string,
    tasks: TaskType[]
    addTask: (newTitle: string) => void
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
}

const TodoList: FC<PropsType> = ({title, tasks, addTask, removeTask, changeFilter}) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const addTaskHandler = () => {
        if (newTaskTitle) {
            addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div className='todolist'>
            <div className='todolist'>
                <h3>{title}</h3>
                <div>
                    <input
                        value={newTaskTitle}
                        onChange={onChangeHandler}
                        onKeyDown={onKeyPressHandler}
                    />
                    <Button title="+" callBack={addTaskHandler} isDisabled={!newTaskTitle}/>
                </div>
                <ul>
                    {tasks.map((task) => {
                        return <Task task={task} removeTask={removeTask} />
                    })}
                    {/*{tasks.map((task) => {*/}
                    {/*    const removeTaskHandler = () => {*/}
                    {/*        removeTask(task.id)*/}
                    {/*    }*/}
                    {/*    return <li key={task.id}>*/}
                    {/*        <input type="checkbox" checked={task.isDone}/>*/}
                    {/*        <span>{task.title}</span>*/}
                    {/*        <Button title='X' callBack={removeTaskHandler}/>*/}
                    {/*    </li>*/}
                    {/*})*/}
                    {/*}*/}
                </ul>
                <div>
                    <Button title='All' callBack={() => {
                        changeFilter('all')
                    }}/>
                    <Button title='Active' callBack={() => {
                        changeFilter('active')
                    }}/>
                    <Button title='Completed' callBack={() => {
                        changeFilter('completed')
                    }}/>
                </div>
            </div>
        </div>
    )
}

export default TodoList;
