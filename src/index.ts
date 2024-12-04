import express from 'express'
import { user_route } from './routes/user.route'
import './db/db'
const app = express()

app.use("/api/users", user_route)

app.listen(8000, () => {
    console.log("App running on port 8000")
})