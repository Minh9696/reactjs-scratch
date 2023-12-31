import React, {useEffect, useState} from 'react';
import TodoList from '../../components/ToDoList';
import {useNavigate, useLocation, useResolvedPath} from 'react-router-dom';
import queryString from 'query-string';
import { Button, Typography } from '@mui/material';
import { FilterAltOutlined } from '@mui/icons-material';

function ListPage(props) {
  const initTodoList = [
    {
      id: 1,
      title: 'Set the picnic plaining',
      state: 'completed',
    },
    {
      id: 2,
      title: 'Call Mr. Phong for the new order',
      state: 'new',
    },
    {
      id: 3,
      title: 'Check email',
      state: 'new',
    },
  ];
  const location = useLocation();
  let navigate = useNavigate();
  const url = useResolvedPath("").pathname;

  const [todoList, setTodoList] = useState(initTodoList);
  const [filterState, setFilterState] = useState(() => {
    const params = queryString.parse(location.search);
    return (['completed', 'new', 'all'].includes(params.state) && params.state) || 'all';
  });

  useEffect(() => {
    const params = queryString.parse(location.search);
    setFilterState(params.state || 'all');
  }, [location.search]);

  const handleTodoClick = (item, idx) => {
    const newtodoList = [...todoList];
    newtodoList[idx] = {
      ...newtodoList[idx],
      state: newtodoList[idx].state === 'new' ? 'completed' : 'new',
    };
    setTodoList(newtodoList);
  };
  const handleAddTask = (taskName) => {
    const newtodoList = [...todoList];
    const idx = Math.max(...todoList.map((item) => item.id));
    newtodoList.push({
      id: idx + 1,
      title: taskName,
      state: 'new',
    });
    setTodoList(newtodoList);
  };

  const handleDeleteTask = (item) => {
    const newtodoList = [...todoList];
    let delete_idx = newtodoList.findIndex((el) => item.id === el.id);
    newtodoList.splice(delete_idx, 1);
    setTodoList(newtodoList);
  };

  const handleShowAll = () => {
    let queryParams = {state: 'all'};
    const search = queryString.stringify(queryParams);
    navigate(`${url}?${search}`);
  };
  const handleShowCompleted = () => {
    let queryParams = {state: 'completed'};
    const search = queryString.stringify(queryParams);
    navigate(`${url}?${search}`);

  };
  const handleShowNew = () => {
    let queryParams = {state: 'new'};
    const search = queryString.stringify(queryParams);
    navigate(`${url}?${search}`);

  };

  const renderedTodoList = todoList.filter((item) => filterState === 'all' || item.state === filterState);

  const handleTodoFormSubmit = (values) => {
        console.log('values form submit', values);
        const {title} = values;
        if (title) {
          handleAddTask(title);
        };
  }

  return (
    <div>
        <Typography style={{textAlign: 'center', margin: '32px'}} component='h4' variant='h4'>Todo Today</Typography>
        <div className={'filter-buttons'} style={{textAlign: 'center'}}>
            <Button style={{margin: '0px 10px'}} startIcon={<FilterAltOutlined/>} onClick={handleShowAll}>Show All</Button>
            <Button style={{margin: '0px 10px'}} startIcon={<FilterAltOutlined/>} onClick={handleShowCompleted}>Show Completed</Button>
            <Button style={{margin: '0px 10px'}} startIcon={<FilterAltOutlined/>} onClick={handleShowNew}>Show New</Button>
        </div>
        <TodoList 
            onSubmitForm={handleTodoFormSubmit}
            todoList={renderedTodoList}
            onTodoClick={handleTodoClick}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
        />
    </div>
  );
}

export default ListPage;
