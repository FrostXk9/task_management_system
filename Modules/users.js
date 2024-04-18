import { pool } from "../Config/config.js";

const getUsers = async () => {
    const [users] = await pool.query(`
        SELECT * FROM users
    `);

    return users;
}

const getUser = async (user_id) => {
    const [user] = await pool.query(`
        SELECT * FROM users WHERE user_id = ?
    `, [user_id]);

    return user;
}

const addUser = async (user_name, user_role, user_email, user_password, user_phoneNo, user_img) => {

    const [user] = await pool.query(`
        INSERT INTO users (user_name, user_role, user_email, user_password, user_phoneNo, user_img) VALUES (?, ?, ?, ?, ?, ?)
    `, [user_name, user_role, user_email, user_password, user_phoneNo, user_img]); 

    return user.insertId;  

}

const deleteUser = async (user_id) => {
    const [user] = await pool.query(`
        DELETE FROM users WHERE user_id = ?
    `, user_id);
}

const updateUser = async (user_name, user_role, user_email, user_password, user_phoneNo, user_img, user_id) => {
    const [user] = await pool.query(`
        UPDATE users SET user_name = ?, user_role = ?, user_email = ?, user_password = ?, user_phoneNo = ?, user_img = ? WHERE user_id = ?
    `, [user_name, user_role, user_email, user_password, user_phoneNo, user_img, user_id])
}

const userLogin = async (user_role, user_email) => {
    const [[{user_password}]] = await pool.query(`
        SELECT user_password FROM users WHERE user_role = ? AND user_email = ?
    `, [user_role, user_email]);

    return user_password; 

}

const selectLoggedInUser = async (user_email) => {
    const [Activeuser] = await pool.query(`
        SELECT * FROM users WHERE user_email = ?
    `, [user_email])
    return Activeuser;
}

const userProfileImg = async (profile_img) => {
    const [img] = await pool.query(`
        INSERT INTO users (user_img) VALUES (?)
    `, [profile_img])
    return img.insertId
}

export {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser,
    userLogin,
    selectLoggedInUser,
    userProfileImg
}