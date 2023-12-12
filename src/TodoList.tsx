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
    const [newTaskTitle, setNewTaskTitle] = useState("asdds");
    const addTaskHandler = () => {
        addTask(newTaskTitle);
        setNewTaskTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
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
                        onKeyPress={onKeyPressHandler}
                    />
                    <button
                        onClick={addTaskHandler}
                    >+
                    </button>
                </div>
                <ul>
                    {/*{tasks.map((task) => {*/}
                    {/*    return <Task key={task.id} id={task.id} title={task.title} isDone={task.isDone} removeTask={task.removeTask}  />*/}
                    {/*})}*/}
                    {tasks.map((task) => {
                        const removeTaskHandler = () => {
                            removeTask(task.id)
                        }
                        return <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={removeTaskHandler}>Х
                            </button>
                        </li>
                    })
                    }
                </ul>
                <div>
                    <button onClick={() => {
                        changeFilter('all')
                    }}>All
                    </button>
                    <button onClick={() => {
                        changeFilter('active')
                    }}>Active
                    </button>
                    <button onClick={() => {
                        changeFilter('completed')
                    }}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TodoList;
