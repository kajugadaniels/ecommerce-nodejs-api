import express from 'express';
import { user_route } from './routes/user.route';
import { auth_route } from './routes/auth.route';
import './db/db';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.use("/api/users", user_route);
app.use("/api/auth", auth_route);

// Error-handling middleware (optional but recommended)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(8000, () => {
    console.log("App running on port 8000");
});
