import React, { useState } from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './styles.scss';
import ToDoForm from "../../../../components/ToDoForm";

TodoList.defaultProps = {
    todoList: [],
    onTodoClick: null
}
TodoList.propTypes = {
    todoList: PropTypes.array,
    onTodoClick: PropTypes.func
}

function TodoList({ onSubmitForm, todoList, onTodoClick, onAddTask, onDeleteTask }) {

    const [todoText, setTodoText] = useState('');

    const handleTodoClick = (item, idx) => {
        if (!onTodoClick) return;
        onTodoClick(item, idx);
    };

    const handleSubmitTask = (e) => {
        e.preventDefault();
        const taskName = todoText;
        setTodoText('');
        onAddTask(taskName);
    };

    const handleDeleteTask = (item) => {
        onDeleteTask(item);
    };

    const handleTodoFormSubmit = (values) => {
        if (onSubmitForm) {
            onSubmitForm(values)
        }
    };

    return (
        <ul className={'todo-list'}>
            <li>
                <ToDoForm onSubmit={handleTodoFormSubmit}/>
            </li>
            {todoList.map((item, idx) => (
                <li key={item.id}
                    className={classnames({
                        completed: item.state === 'completed'
                    })}

                >
                    <input
                        id={item.id}
                        type="checkbox"
                        checked={item.state === 'completed'}
                        onChange={() => handleTodoClick(item, idx)} />
                    <label htmlFor={item.id}>{item.title}</label>
                    <span className={'delete'} onClick={() => handleDeleteTask(item)}>🗑</span>
                </li>
            ))}
            {/* <li>
                <form onSubmit={handleSubmitTask} >
                    <input type="text" onChange={(event) => setTodoText(event.target.value)} value={todoText} />
                    <button type='submit'>Add ToDo</button>
                </form>
            </li> */}
        </ul>
    )
}


export default TodoList;