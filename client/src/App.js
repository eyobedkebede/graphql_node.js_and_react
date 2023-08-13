import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Users from './list_users';
import User from './user';
import AddUser from './add_user';

function App(props) {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users/>}/>
          <Route path="/user/:id" element={<User/>}/>
          <Route path="/adduser" element={<AddUser/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
