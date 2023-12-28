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
    id: string
    title: string,
    activeFilter: FilterValuesType,
    tasks: TaskType[]
    addTask: (newTitle: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodolistById: (todoListId: string) => void
}

const TodoList: FC<PropsType> = (
    {
        id,
        title,
        activeFilter,
        tasks,
        addTask,
        removeTask,
        changeFilter,
        changeStatus,
        removeTodolistById
    }) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [newTaskTitleError, setNewTaskTitleError] = useState<string | null>(null);
    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            setNewTaskTitleError('')
            addTask(newTaskTitle, id);
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

    const removeTodolist = (todolistId: string) => {
        removeTodolistById(todolistId);
    }

    return (
        <div className='todolist'>
            <div className='todolist'>
                <h3>{title} <Button title={'X'} callBack={() => removeTodolist(id)}/> </h3>
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
                        return <Task todoListId={id} key={task.id} task={task} removeTask={removeTask} changeStatus={changeStatus}/>
                    })}
                </ul>
                <div>
                    <Button
                        className={activeFilter === 'all' ? 'active-filter' : ''}
                        title='All'
                        callBack={() => changeFilter('all', id)}/>
                    <Button
                        className={activeFilter === 'active' ? 'active-filter' : ''}
                        title='Active'
                        callBack={() => changeFilter('active', id)}/>
                    <Button
                        className={activeFilter === 'completed' ? 'active-filter' : ''}
                        title='Completed'
                        callBack={() => changeFilter('completed', id)}/>
                </div>
            </div>
        </div>
    )
}

export default TodoList;
