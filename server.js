import { config } from 'dotenv';
config();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import taskRouter from './Routes/taskRoute.js';
import authentication from './Middleware/verifyToken.js';
import userRoute from './Routes/userRoute.js'
import userTasksRoute from './Routes/userTaskRoute.js'

const app = express();

const PORT_ADDON = process.env.MYSQL_ADDON_PORT;



app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// dummy script
app.get('/', (req, res) => {
    res.send("Hello my world")
})

// paths
app.post('/login', authentication, (req, res) => {
    // sent response in middleware
})
app.delete('/logout', authentication, (req, res) => {
    res.send({
        msg: 'logged out successfully! '
    })
})
app.use('/tasks', taskRouter);
app.use('/users', userRoute);
app.use('/myTasks', userTasksRoute);


app.listen(PORT_ADDON, console.log(`server is running on http://localhost:${PORT_ADDON}`))