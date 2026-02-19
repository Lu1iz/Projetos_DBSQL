const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository.js');

const registerUser = async ({name, email, password}) => {
    const existingUser = await userRepository.findByEmail(email);

    if(existingUser) throw new Error('Usuário já cadastrado!');

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await userRepository.createUser(name, email, hashedPassword);

    return {
        id: userId, name, email
    };
};

const loginUser = async ({email, password}) => {
    const user = await userRepository.findByEmail(email);
    if(!user) throw new Error('Credenciais inválidas!');

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) throw new Error('Credencias inválidas');

    return {
        id: user.id,
        name: user.name,
        email: user.email
    };
};

module.exports = {registerUser, loginUser};