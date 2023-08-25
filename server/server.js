const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const app = express();

// Import routes
const uploadRoutes = require('./routes/upload');
const downloadRoutes = require('./routes/download');
const authRoutes = require('./routes/auth');

// Middlewares
const errorHandler = require('./middlewares/errorHandler');

app.use(bodyParser.json());

// Setup session and passport
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Routes
app.use('/auth', authRoutes);
app.use('/upload', passport.authenticate('jwt', { session: false }), uploadRoutes);
app.use('/download', passport.authenticate('jwt', { session: false }), downloadRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
