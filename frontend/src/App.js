import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Create from "./components/Create";

function App() {
    
    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path="/" element = {<Home/>} exact/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create" element={<Create />} />
            </Routes>
        </div>
    );
}

export default App;
