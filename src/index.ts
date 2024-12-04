import express from 'express';
import { user_route } from './routes/user.route';
import './db/db';
import { auth_route } from './routes/auth.route';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/auth", auth_route);
app.use("/api/users", user_route);

app.listen(8000, () => {
    console.log("App running on port 8000");
});
