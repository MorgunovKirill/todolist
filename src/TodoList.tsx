import {FC} from "react";
import {Button} from "./Button";
import {FilterValuesType, TaskType} from "./App";
import Task from "./Task";
import {AddItemForm} from "./AddItemForm";


type PropsType = {
    todolistId: string
    title: string,
    activeFilter: FilterValuesType,
    tasks: TaskType[]
    addTask: (todoListId: string, newTitle: string) => void
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    changeStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todoListId: string, taskId: string, title: string) => void
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
        changeTaskTitle,
        removeTodolistById
    }) => {

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

    const removeTodolist = (todolistId: string) => {
        removeTodolistById(todolistId);
    }

    const addTaskHandler = (title: string) => {
        addTask(todolistId, title)
    }

    return (
        <div className='todolist'>
            <div className='todolist'>
                <h3>{title} <Button title={'X'} callBack={() => removeTodolist(todolistId)}/> </h3>
                <AddItemForm addItem={addTaskHandler} />
                <ul>
                    {filteredTasksForTodoList.map((task) => {
                        return <Task
                            key={task.id}
                            todoListId={todolistId}
                            task={task}
                            removeTask={removeTask}
                            changeStatus={changeStatus}
                            changeTaskTitle={changeTaskTitle}
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
