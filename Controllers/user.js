import { getUsers, getUser, deleteUser, updateUser } from '../Modules/users.js';


export default {
    fetchUsers : async (req, res) => {
        res.send(await getUsers(req.body.user_name))
    },
    fetchUser : async (req, res) => {
        try {
            res.send(await getUser(+req.params.id))
        } catch (error) {
            console.error(error)
        }
    },
    insertUserToDB : async (req, res) => {
        try {
            res.send({
                userMsg: 'You have signed up succesfully',
                adminMsg: 'You have created a user successfully'
            })
        } catch (error) {
            console.error(error)
        }
    },
    removeUserFromDB : async (req, res) => {
        try {
            
            await deleteUser(+req.params.id)

            res.send(await getUsers())

        } catch (error) {

            console.error(error)
            
        }
    },
    updateExistingUser : async (req, res) => {
        try {
            let {user_name, user_role, user_email, user_password, user_phoneNo, user_img} = req.body;

            const [user] = await getUser(+req.params.id)

            user_name ? user_name : {user_name} = user

            user_role ? user_role : {user_role} = user

            user_email ? user_email : {user_email} = user

            user_password ? user_password : {user_password} = user

            user_phoneNo ? user_phoneNo : {user_phoneNo} = user

            user_img ? user_img : {user_img} = user

            await updateUser(user_name, user_role, user_email, user_password, user_phoneNo, user_img, +req.params.id);

            res.send(await getUsers())
            
        } catch (error) {
            console.error(error)
        }
    }
}