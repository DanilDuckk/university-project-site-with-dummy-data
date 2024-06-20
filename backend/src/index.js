// Imports
import cors from 'cors';
import express from 'express';
import duck_router from './router/duck-router.js'
import user_router from "./router/user_router.js";
import comment_router from "./router/comment_router.js";
import session from 'express-session';

// Create a host
const app = express();
const port = 3000;
const corsOptions = {
    origin: 'http://localhost:63343/26/frontend/index.html?',
    credentials: true
};

// Tell app to use these
app.use(cors());
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


