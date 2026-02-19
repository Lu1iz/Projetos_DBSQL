const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes.js');
const taskRoutes = require('./routes/taskRoutes.js');
const errorHandler = require('./middlewares/errorHandler.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (__, res) => {
    res.json({message: 'API rodando!'});
});

app.use(errorHandler);

module.exports = app;