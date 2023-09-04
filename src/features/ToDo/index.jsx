import React, { useState } from "react";
import PropTypes from 'prop-types'
import TodoList from "./components/ToDoList";
import './styles.scss';


function TodoFeature(props) {
    const initTodoList = [
        {
            id: 1,
            title: 'Set the picnic plaining',
            state: 'completed'
        },
        {
            id: 2,
            title: 'Call Mr. Phong for the new order',
            state: 'new'
        },
        {
            id: 3,
            title: 'Check email',
            state: 'new'
        }
    ];

    const [todoList, setTodoList] = useState(initTodoList);
    const [filterState, setFilterState] = useState('all');

    const handleTodoClick = (item, idx) => {
        const newtodoList = [...todoList];
        newtodoList[idx] = {
            ...newtodoList[idx],
            state: newtodoList[idx].state === 'new' ? 'completed' : 'new',
        };
        setTodoList(newtodoList);

    };
    const handleAddTask = (taskName) => {
        console.log(taskName)
        const newtodoList = [...todoList];
        const idx = Math.max(...todoList.map(item => item.id));
        newtodoList.push({
            id: idx + 1,
            title: taskName,
            state: 'new'
        })
        setTodoList(newtodoList)
    };

    const handleDeleteTask = (item) => {
        const newtodoList = [...todoList];
        let delete_idx = newtodoList.find(el => item.id === el.id);
        newtodoList.splice(delete_idx, 1);
        setTodoList(newtodoList);
    };

    const handleShowAll = () => {
        setFilterState('all');
    };
    const handleCompletedAll = () => {
        setFilterState('completed');

    };
    const handleShowNewAll = () => {
        setFilterState('new');
    };

    const renderedTodoList = todoList.filter(item => filterState === 'all' || item.state === filterState);

    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>To Do Today</h3>
            <div className={"filter-buttons"}>
                <button onClick={handleShowAll}>Show All</button>
                <button onClick={handleCompletedAll}>Show Completed</button>
                <button onClick={handleShowNewAll}>Show New</button>
            </div>
            <TodoList todoList={renderedTodoList}
                onTodoClick={handleTodoClick}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask} />
        </div>
    )
}

export default TodoFeature;