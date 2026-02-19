const authService = require('../services/authServices.js');

const register = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password) return res.status(400).json({message: 'Preencha todos os campos!'});

        const user = await authService.registerUser({name, email, password});

        return res.status(201).json({
            message: 'Usuário registrado com sucesso!',
            user
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) return res.status(400).json({message: 'Email e senha são obrigatórios!'});

        const user = await authService.loginUser({email, password});

        return res.status(200).json({
            message: 'Usuário logado!',
            user
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {register, login};