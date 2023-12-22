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
    activeFilter: FilterValuesType,
    tasks: TaskType[]
    addTask: (newTitle: string) => void
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}

const TodoList: FC<PropsType> = (
    {
        title,
        activeFilter,
        tasks,
        addTask,
        removeTask,
        changeFilter,
        changeStatus
    }) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [newTaskTitleError, setNewTaskTitleError] = useState<string | null>(null);
    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            setNewTaskTitleError('')
            addTask(newTaskTitle);
            setNewTaskTitle('')
        } else {
            setNewTaskTitleError('Field required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setNewTaskTitleError(null);
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
                        className={newTaskTitleError ? 'error' : ''}
                    />
                    <Button title="+" callBack={addTaskHandler}/>
                    {newTaskTitleError && <div className='error-message'>{newTaskTitleError}</div>}
                </div>
                <ul>
                    {tasks.map((task) => {
                        return <Task key={task.id} task={task} removeTask={removeTask} changeStatus={changeStatus}/>
                    })}
                </ul>
                <div>
                    <Button
                        className={activeFilter === 'all' ? 'active-filter' : ''}
                        title='All'
                        callBack={() => {
                            changeFilter('all')
                        }}/>
                    <Button
                        className={activeFilter === 'active' ? 'active-filter' : ''}
                        title='Active'
                        callBack={() => {
                            changeFilter('active')
                        }}/>
                    <Button
                        className={activeFilter === 'completed' ? 'active-filter' : ''}
                        title='Completed'
                        callBack={() => {
                            changeFilter('completed')
                        }}/>
                </div>
            </div>
        </div>
    )
}

export default TodoList;
