import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import Home from "./pages/home.jsx";
import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import Task from "./pages/tasks.jsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/tasks" element={<Task />} />
                </Routes>
            </BrowserRouter>

            <ToastContainer autoClose={3000} position="bottom-left" />
        </>
    )
}

export default App;