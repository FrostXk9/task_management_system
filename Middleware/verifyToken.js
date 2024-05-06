import { config } from 'dotenv';
config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { addUser, userLogin, selectLoggedInUser } from '../Modules/users.js';


const authentication = async (req, res, next) => {

    const {user_name, user_role, user_email, user_password, user_phoneNo} = req.body

    try {

        const targetUser = await userLogin(user_role, user_email);

        const activeUser = await selectLoggedInUser(user_email);

        bcrypt.compare(user_password, targetUser, (err, result) => {

            if(err) throw err

            if(result === true) {
               const {user_role, user_email} = req.body;

               const token =  jwt.sign({user_role : user_role, user_email : user_email}, process.env.USER_TOKEN, {expiresIn: '1d'});

               res.cookie('jwt', token, {httpOnly: false, expiresIn: '1d'});
                console.log("login successful");
               res.send({
                    userInServer: activeUser,
                    token : token,
                    userRole : user_role,
                    userName: user_name,
                    msg: 'You have logged in!'
               });

               next()
               
            } else {

                res.send({
                    code : res.statusCode,
                    msg: 'Passwords seem to not match'
                })

            }

        })
        
    } catch (error) {

        console.error('Error during authentication:', error);
        res.status(500).send({ msg: 'Internal server error' });
        
    }

}

export default authentication;