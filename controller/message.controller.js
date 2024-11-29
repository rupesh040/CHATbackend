import User from "../models/user.model.js";
import Message from "../models/message.model.js"
import { getReceiverSocketId, io } from "../config/socket.js";
export const getUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(users)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userTochatId } = req.params;
        const senderId = req.user._id;
        const messages = await Message.find({ $or: [{ senderId, receiverId: userTochatId }, { senderId: userTochatId, receiverId: senderId }] })
        res.status(200).json(messages)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const getAiMessages = async (req, res) => {
    try {
        const userId = req.user._id;
        const messages = await Message.find({ $or: [{ senderId: userId, receiverId: userId }, { senderId: userId, receiverId: userId }] })
        res.status(200).json(messages)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error"  })
    }
}


export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image
        });
        await newMessage.save();

        // todo: realtime functionality goes here => socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(200).json(newMessage)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}


export const sendAiMessage = async (req,res) => {
    try {
    const { text } = req.body;
    const senderId = req.user._id;
    const receiverId = req.user._id;
    const newMessage = new Message({
        senderId,
        receiverId,
        text
    });
    await newMessage.save();
    res.status(200).json(newMessage)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}