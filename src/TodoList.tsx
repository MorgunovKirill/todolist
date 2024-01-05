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
    todolistId: string
    title: string,
    activeFilter: FilterValuesType,
    tasks: TaskType[]
    addTask: (todoListId: string, newTitle: string) => void
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    changeStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    removeTodolistById: (todoListId: string) => void
}

const TodoList: FC<PropsType> = (
    {
        todolistId,
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
    const filteredTasksForTodoList = getFilteredTasks(tasks, activeFilter);

    function getFilteredTasks(tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> {
        let filteredTasks = tasks;
        if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.isDone)
        }
        if (filter === 'active') {
            filteredTasks = tasks.filter(task => !task.isDone)
        }
        return filteredTasks;
    }

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            setNewTaskTitleError('')
            addTask(todolistId, newTaskTitle);
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
                <h3>{title} <Button title={'X'} callBack={() => removeTodolist(todolistId)}/> </h3>
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
                    {filteredTasksForTodoList.map((task) => {
                        return <Task
                            key={task.id}
                            todoListId={todolistId}
                            task={task}
                            removeTask={removeTask}
                            changeStatus={changeStatus}
                        />
                    })}
                </ul>
                <div>
                    <Button
                        className={activeFilter === 'all' ? 'active-filter' : ''}
                        title='All'
                        callBack={() => changeFilter(todolistId,'all')}/>
                    <Button
                        className={activeFilter === 'active' ? 'active-filter' : ''}
                        title='Active'
                        callBack={() => changeFilter(todolistId, 'active')}/>
                    <Button
                        className={activeFilter === 'completed' ? 'active-filter' : ''}
                        title='Completed'
                        callBack={() => changeFilter(todolistId,'completed')}/>
                </div>
            </div>
        </div>
    )
}

export default TodoList;
