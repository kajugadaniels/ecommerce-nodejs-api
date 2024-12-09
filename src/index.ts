import express from 'express';
import { user_route } from './routes/user.route';
import { auth_route } from './routes/auth.route';
import './db/db';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.use("/api/users", user_route);
app.use("/api/auth", auth_route);

// JSON parsing error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Bad JSON');
        return res.status(400).json({ message: 'Invalid JSON format' });
    }
    next();
});

// General error-handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(8000, () => {
    console.log("App running on port 8000");
});
