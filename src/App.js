import React from 'react'
import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import TodoFeature from './features/ToDo';
import Clock from './features/Clock';
import NotFound from './components/NotFound';
import CounterFeature from './features/Counter';

function App() {
  return (
    <div className='App'>
      Header
      <p><NavLink to="/todo" >Todo</NavLink></p>
      <p><NavLink to="/clock" >Clock</NavLink></p>
      <Routes>
        <Route path='/' element={<TodoFeature/>} exact />
        <Route path='/todo' element={<TodoFeature/>} />
        <Route path='/clock' element={<Clock/>} />
        <Route path='/counter' element={<CounterFeature/>} />
        <Route element={NotFound} />
      </Routes>
      Footer
    </div>
  );
}

export default App;
