import mongoose from "mongoose";

const aiSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userMessage: {
        type: String,
        required: true,
    },
    aires: {
        type: String,
        required: true,
    },
},
    { timestamps: true }

);

const AiModel = mongoose.model("Ai", aiSchema);
export default AiModel;