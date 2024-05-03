import { getTasks, getTask, addTask, deleteTask, editTask, usersTasks, assignTaskToUser, UpdateTaskStatus, deletePersonalTask} from "../Modules/tasks.js";


export default {
    fetchTasks : async (req, res) => {
        try {
            res.send(await getTasks(req.body.taskname))
        } catch (err) {
            res.sendStatus(404)
        }
    },
    fetchTask : async (req, res) => {
        try { 

            res.send(await getTask(+req.params.id));

        } catch (error) {

            res.sendStatus(404);

        }
    },
    AddTask : async (req, res) => {
        try {

            const {taskname, taskdeadline, completed, created} = req.body;

            await addTask(taskname, taskdeadline, completed, created)

            res.send(getTasks());

        } catch (error) {

            res.sendStatus(403)

        }
    },
    removeTask : async (req, res) => {
        try {

            await deleteTask(+req.params.id);

            res.send(await getTasks());

        } catch (error) {

            res.sendStatus(404);

        }
    },
    taskEdit : async (req, res) => {
        try {

            let {taskname, taskdeadline, completed, created} = req.body

            const [task] = await getTask(+req.params.id);

            taskname ? taskname : {taskname} = task

            taskdeadline ? taskdeadline : {taskdeadline} = task

            completed ? completed : {completed} = task

            created ? created : {created} = task

            await editTask(taskname, taskdeadline, completed, created, +req.params.id)

            res.send(await getTasks())

        } catch (error) {
            
            res.sendStatus(404)

        }
    },
    userTasks : async (req, res) => {
        try {
            
            const { user_id } = req.query

            let data = await usersTasks(user_id);

            res.send({
                tasks : data
            })

        } catch (error) {
            
            res.sendStatus(404)

        }
    },
    assignTask : async (req, res) => {

        const {user_id} = req.query;

        const {taskId} = +req.params.id;

        await assignTaskToUser(taskId, user_id);

        const usersTaskData = await usersTasks(user_id);

        res.send({
            data : usersTaskData,
            msg : 'Hello a new task has been assigned to you',
            sentMsg : `successfully sent`
        })

    },
    setTaskState : async (req, res) => {
        try {

            let {completed} = req.body

            await UpdateTaskStatus(completed, +req.params.id)

            res.send(getTasks())
            
        } catch (error) {

            res.sendStatus(404)
            
        }
    },
    removePersonalTask : async (req, res) => {

        const {taskId} = +req.params.id;

        const {user_id} = req.query;

        await deletePersonalTask(taskId, user_id)

        res.send(await usersTasks(user_id));

    },
}