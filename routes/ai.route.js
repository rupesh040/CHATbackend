import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAiMessage, saveAiMessage } from "../controller/ai.controller.js";

const router = express.Router();

router.post("/save",protectRoute, saveAiMessage);
router.get("/getaimessage",protectRoute, getAiMessage);

export default router;
