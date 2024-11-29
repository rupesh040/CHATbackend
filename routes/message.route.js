import express from "express";
import { getAiMessages, getMessages, getUsers, sendAiMessage, sendMessage } from "../controller/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users",protectRoute, getUsers);
router.get("/:id",protectRoute, getMessages);
router.post("/send/:id",protectRoute,sendMessage);
router.post("/save",protectRoute,sendAiMessage);
router.post("/get",protectRoute,getAiMessages);

export default router;
