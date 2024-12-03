import express from 'express'
import { user_route } from './routes/user.route'
const app = express()

app.use("/api/users", user_route)

app.listen(8000, () => {
    console.log("App running on port 8000")
})