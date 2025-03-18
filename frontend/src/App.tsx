import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/header/login';
import { TaskList } from './components/taskForm/task';
import { AddTask } from './components/addTask/AddTask';
import { UpdateTask } from './components/UpdateTask/UpdateTask';
import { Register } from "./components/register/Register";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/taskForm/task" element={<TaskList />} />
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/updateTask/:id" element={<UpdateTask />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  );
};

export default App;
