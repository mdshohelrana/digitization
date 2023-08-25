module.exports = (err, req, res, next) => {
    // Log the error for debugging or auditing
    console.error(err.stack);

    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized' });
    } else {
        next(err);
    }

    // Generic error response
    res.status(500).json({
        message: 'An unexpected error occurred!',
    });
};
