import express, { ErrorRequestHandler } from 'express';
import { user_route } from './routes/user.route';
import { auth_route } from './routes/auth.route';
import './db/db';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Logging middleware
app.use(morgan('dev'));

// Define routes
app.use("/api/users", user_route);
app.use("/api/auth", auth_route);

// JSON parsing error handler
const jsonErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && (err as any).status === 400 && 'body' in err) {
        console.error('Bad JSON');
        res.status(400).json({ message: 'Invalid JSON format' });
    } else {
        next();
    }
};

app.use(jsonErrorHandler);

// General error-handling middleware
const generalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
};

app.use(generalErrorHandler);

app.listen(8000, () => {
    console.log("App running on port 8000");
});
