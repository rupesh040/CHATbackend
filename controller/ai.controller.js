import AiModel from "../models/ai.model.js";
import User from "../models/user.model.js";

export const saveAiMessage = async () => {
    const { aires, userMessage } = req.body;
    const userId = req.user._id;
    try {
        const newMessage = new Message({
        userId,
        aires,
        userMessage
    });
    await newMessage.save();
    res.status(200).json(newMessage)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }

}

export const getAiMessage = async () => {
    try {
        const userId = req.user._id;
        const messages = await AiModel.find(userId)
        res.status(200).json(messages)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}