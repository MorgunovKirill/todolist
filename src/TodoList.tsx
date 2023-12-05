import {FC} from "react";
import {Button} from "./Button";
import {TaskType} from "./App";
import Task from "./Task";

type PropsType = {
    title: string,
    tasks: TaskType[]
}

const TodoList: FC<PropsType> = ({title, tasks}) => {
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
                    {tasks.map((task) => {
                        return <Task id={task.id} title={task.title} isDone={task.isDone} />
                    })}
                    {/*{listItems}*/}
                </ul>
                <div>
                    <Button title='All'/>
                    <Button title='Active'/>
                    <Button title='Completed'/>
                    <Button title='Disabled'/>
                </div>
            </div>
        </div>
    )
}

export default TodoList;
