import { pool } from "../Config/config.js";

const getMessages = async () => {
    const [ messages ] = await pool.query(`
        SELECT * FROM comments_table
    `);
    return messages;
}

const getMessage = async (user_id) => {
    const [ message ] = await pool.query(`
        SELECT * FROM comments_table WHERE comment_id = ?
    `, [user_id]);
    return message;
}

// console.log(await getMessage(2))

const sendMessage = async (content) => {
    const [ message ] =  await pool.query(`
    INSERT INTO comments_table (content) VALUES(?)
    `, [content]); 
    
    return message.insertId;
}

const deleteMessage = async (comment_id) => {
    const [message] = await pool.query(`
        DELETE FROM comments_table WHERE comment_id = ?
    `, [comment_id])
}
 
// console.log(await sendMessage('Hello user welcome to chat', 4))

export {
    getMessages,
    getMessage,
    sendMessage,
    deleteMessage
}