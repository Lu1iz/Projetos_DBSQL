import React from "react";
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className="jumbotron centered">
            <div className="container">
                <img className="logo-saleszap" src="/img/logo-saleszap.png" alt="logo" />
                <i className="fas fa-key fa-6x"></i>
                <h1 className="display-3">To-do List</h1>
                <p className="lead">Guarde suas tarefas e não procrastine</p>  <hr />
                <div className="buttons">
                    <Link className="btn btn-light btn-lg" to="/register">Registrar</Link>
                    <Link className="btn btn-purple btn-lg" to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;