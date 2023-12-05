import {FC} from "react";
import {Button} from "./Button";
import {FilterValuesType, TaskType} from "./App";
import Task from "./Task";

type PropsType = {
    title: string,
    tasks: TaskType[]
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}

const TodoList: FC<PropsType> = ({title, tasks, removeTask, changeFilter}) => {
    // const listItems: Array<JSX.Element> = [];
    //
    // for (let i = 0; i < tasks.length; i++) {
    //     const listItem: JSX.Element = <li key={tasks[i].id}>
    //         <input type="checkbox" checked={tasks[i].isDone}/>
    //         <span>{tasks[i].title}</span></li>
    //     listItems.push(listItem);
    // }

    return (
        <div className='todolist'>
            <div className='todolist'>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <Button title="+"/>
                </div>
                <ul>
                    {/*{tasks.map((task) => {*/}
                    {/*    return <Task key={task.id} id={task.id} title={task.title} isDone={task.isDone} removeTask={task.removeTask}  />*/}
                    {/*})}*/}
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={() => {
                                removeTask(task.id)
                            }}>Х
                            </button>
                        </li>))
                    }
                    {/*{listItems}*/}
                </ul>
                <div>
                    {/*<Button title='All'/>*/}
                    {/*<Button title='Active'/>*/}
                    {/*<Button title='Completed'/>*/}
                    <button onClick={() => {changeFilter('all')}}>All</button>
                    <button onClick={() => {changeFilter('active')}}>Active</button>
                    <button onClick={() => {changeFilter('completed')}}>Completed</button>
                </div>
            </div>
        </div>
    )
}

export default TodoList;
