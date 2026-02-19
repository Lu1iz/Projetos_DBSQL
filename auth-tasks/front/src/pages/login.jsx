import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import api from "../service/api.js";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post('/auth/login', {email, password});
            localStorage.setItem('user', JSON.stringify(res.data.user));
            toast.success('Login realizado com sucesso!');

            navigate('/tasks');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erro ao realizar Login!');
        }
    };

    return (
        <>
            <div className="w-100 position-fixed top-0 start-0 d-flex justify-content-center align-items-center header">
                <h1 className="display-4 text-dark m-0">Login</h1>    
            </div> 

            <div className="min-vh-100 d-flex justify-content-center align-items-center">
                <div className="container mt-5 text-white" style={{ maxWidth: '400px' }}>
                    <form onSubmit={handleSubmit}>
                        <label className="text-dark" htmlFor="email">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="form-control mb-3"
                            name="email"
                            autoComplete="off"
                        />

                        <label className="text-dark">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="form-control mb-4"
                            name="password"
                            autoComplete="off"
                        />

                        <button type="submit" className="btn btn-purple w-100">Login</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;