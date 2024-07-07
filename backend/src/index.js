// Imports
import cors from 'cors';
import express from 'express';
import duck_router from './router/duck-router.js'
import user_router from "./router/user_router.js";
import comment_router from "./router/comment_router.js";
import session from 'express-session';

// Create a host
const app    = express();
const port = 3000;
const corsOptions = { // I needed to leave this because login and register account feature won't work
    origin: 'http://localhost:63342',
    credentials: true
};

// Tell app to use these
app.use(cors(corsOptions));
app.use(express.json());
app.use(session({
    secret: 'DKEY123',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use('/ducks', duck_router)
app.use('/users', user_router)
app.use('/comments', comment_router)

// Connection test
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});