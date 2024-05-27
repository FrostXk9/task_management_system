import { getMessages, getMessage, sendMessage } from "../Modules/messages.js";

export default {

    allMsgs : async (req, res) => {
        try {
            res.send(await getMessages());
            
        } catch (error) {

            console.log(error);

        }
    },

    singleMessage: async (req, res) => {
        try {

            res.send(await getMessage(+req.params.id));

        } catch (error) {

            console.log(error);

        }
    },

    sendToPeer: async (req, res) => {
        try {
            let { content } = req.body;
            await sendMessage(content);
            res.send({
                msgData: "success",
                responseStatus: 200
            });
        } catch (error) {
            console.log(error)
        }
    }
}