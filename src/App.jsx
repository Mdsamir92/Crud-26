import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GetUser from './components/GetUser';
import PostForm from './components/AddUser';
import UserUpdate from './components/UserUpdate';
import Signup from './pages/Signup';
import Login from './pages/Login';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostForm />} />
        <Route path="/users" element={<GetUser />} />
        <Route path="/update/:id" element={<UserUpdate />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
