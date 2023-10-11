import React from 'react'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import TodoFeature from './features/ToDo';
import Clock from './features/Clock';
import NotFound from './components/NotFound';
import CounterFeature from './features/Counter';
import Header from './components/Header';

function App() {
  return (
    <div className='App'>
      <Header/>
      <Routes>
        <Route path='/' element={<TodoFeature/>} exact />
        <Route path='/todo' element={<TodoFeature/>} />
        <Route path='/clock' element={<Clock/>} />
        <Route path='/counter' element={<CounterFeature/>} />
        <Route element={NotFound} />
      </Routes>
    </div>
  );
}

export default App;
