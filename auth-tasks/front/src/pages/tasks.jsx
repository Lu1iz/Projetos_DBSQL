import React, { useState, useEffect } from "react";
import {FaTrash, FaEdit, FaArrowLeft} from "react-icons/fa";
import {toast} from "react-toastify";
import api from "../service/api.js";
import { useNavigate } from "react-router-dom";

const Task = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState([]);

    const [editTaskId, setEditTaskId] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if(!user) window.location.href = '/login';
        else loadTask();
    }, []);

    const loadTask = async () => {
        const res = await api.get(`/tasks/${user.id}`);
        setTasks(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if(editTaskId) {
                await api.put(`/tasks/${editTaskId}`, {title, description});
                toast.success('Task atualizada com sucesso!');
            }else {
                await api.post('/tasks', {title, description, userId: user.id});
                toast.success('Task salva com sucesso!')
            }

            setTitle('');
            setDescription('');
            loadTask();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erro ao salvar task!');
        }
    };

    const handleDelete = async (id) => {
        if(!window.confirm('Deseja realmente excluir essa task?')) return;

        try {
            await api.delete(`/tasks/${id}`);
            setTasks(prev => prev.filter(tsk => tsk.id !== id));
            toast.success('Task deletada com sucesso!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erro ao deletar task!');
        }
    };

    const handleEdit = async (task) => {
        setTitle(task.title);
        setDescription(task.description);
        setEditTaskId(task.id);
    };

    return (
        <>
            <div className="container mt-5">
                <button 
                    className="btn btn-outline-dark position-fixed top-0 start-0 m-3 d-flex align-items-center gap-2"
                    onClick={() => navigate('/')}
                    style={{zIndex:1000}}
                >
                    <FaArrowLeft />
                    Back
                </button>
                
                <h1 className="mb-4">Minhas Tasks</h1>

                <form className="mb-4" onSubmit={handleSubmit}>
                    <input
                        className="form-control mb-2"
                        placeholder="Título"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />

                    <textarea 
                        className="form-control mb-2"
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />

                    <button className="btn btn-dark w-100">
                        {editTaskId ? 'Update' : 'Save'}
                    </button>
                </form>

                <div className="row g-4 mt-4">
                    {tasks.map(task => (
                        <div className="col-12 col-md-6 col-lg-4" key={task.id}>
                            <div className="card h-100 shadow-sm task-card">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{task.title}</h5>
                                    <p className="card-text flex-grow-1">{task.description}</p>

                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <small className="text-muted">
                                            {task.createdAt
                                                ? new Date(task.createdAt).toLocaleDateString('pt-BR')
                                                 : '-'}
                                        </small>

                                        <div className="d-flex gap-4">
                                            <FaTrash
                                                style={{cursor: 'pointer'}}
                                                onClick={() => handleDelete(task.id)}
                                            />

                                            <FaEdit
                                                style={{cursor: 'pointer'}}
                                                onClick={() => handleEdit(task)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Task;