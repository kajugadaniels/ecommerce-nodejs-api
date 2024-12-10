import express, { ErrorRequestHandler } from 'express';
import { user_route } from './routes/user.route';
import { auth_route } from './routes/auth.route';
import { category_route } from './routes/category.route';
import { size_route } from './routes/size.route';
import './db/db';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { apiLimiter } from './middleware/rateLimiter.middleware';

dotenv.config();

const app = express();

// Apply rate limiting to all API routes
app.use('/api/', apiLimiter);

// Middleware to parse JSON bodies
app.use(express.json());

// CORS Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// Logging middleware
app.use(morgan('dev'));

// Define routes
app.use("/api/users", user_route);
app.use("/api/auth", auth_route);
app.use("/api/categories", category_route);
app.use("/api/sizes", size_route);

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
