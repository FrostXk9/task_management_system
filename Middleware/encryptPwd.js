import { addUser } from "../Modules/users.js";
import fs from 'fs';
import path from "path";
import { hash } from "bcrypt";

const onHash = (req, res, next) => {
    try {
        // exclude user img
        const { user_name, user_role, user_email, user_password, user_phoneNo, user_img } = req.body;

        // because it is not a req from the body but its a req as a file
        // const filePath = req.file ? req.file.path : null;

        if (!user_name || !user_role || !user_email || !user_password || !user_phoneNo || !user_img) {
            return res.status(400).send({
                msg: 'Incomplete user data.'
            });
        }

        hash(user_password, 10, async (err, hashPwd) => {
            
            if (err) {

                console.error('Error hashing password:', err);

                return res.status(500).send('Internal server error.');

            }

            try {

                // const fileData = await fs.promises.readFile(filePath);

                await addUser(user_name, user_role, user_email, hashPwd, user_phoneNo, user_img);

                console.log(`User ${user_name} added successfully.`);

                next(); 
 
            } catch (error) {

                console.error('Error reading file or adding user:', error);

                return res.status(500).send('Internal server error.');

            }
        });
    } catch (error) {
        
        console.error('Error processing user data:', error);

        return res.status(500).send('Internal server error.');

    }
};

export default onHash;