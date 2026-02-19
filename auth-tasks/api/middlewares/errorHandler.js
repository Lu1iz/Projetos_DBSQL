const errorHandler = (err, req, res, next) => {
    console.error(err.message);

    return res.status(400).json({
        message: err.message || 'Erro interno no servidor!'
    });
};

module.exports = errorHandler;