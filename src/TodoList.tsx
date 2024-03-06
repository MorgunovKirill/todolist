import React, {FC} from "react";
import Task from "./Task";
import {AddItemForm} from "./AddItemForm";
import {Delete} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import {FilterValuesType} from "./types";
import {useApp} from "./hooks/useApp";


type PropsType = {
    todolistId: string
    title: string,
    activeFilter: FilterValuesType,
}

const TodoList: FC<PropsType> = (
    {
        todolistId,
        title,
        activeFilter,
    }) => {

    const {
        filteredTasksForTodoList,
        addTaskHandler,
        onAllClickHandler,
        onActiveClickHandler,
        onCompletedClickHandler,
        removeTodolist
    } = useApp(todolistId, activeFilter);

    return (
        <div className='todolist'>
            <div className='todolist'>
                <h3>
                    {title}
                    <IconButton aria-label="delete" onClick={removeTodolist}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTaskHandler}/>
                <ul>
                    {filteredTasksForTodoList.map((task) => {
                        return <Task
                            key={task.id}
                            todoListId={todolistId}
                            task={task}
                        />
                    })}
                </ul>
                <div>
                    <Button
                        variant={activeFilter === 'all' ? "outlined" : "contained"}
                        onClick={onAllClickHandler}
                        color='success'>All</Button>
                    <Button
                        variant={activeFilter === 'active' ? "outlined" : "contained"}
                        onClick={onActiveClickHandler}
                        color='error'>Active</Button>
                    <Button
                        variant={activeFilter === 'completed' ? "outlined" : "contained"}
                        onClick={onCompletedClickHandler}
                        color='primary'>Completed</Button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(TodoList);
