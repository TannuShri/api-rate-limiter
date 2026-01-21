import express from "express";
import apiKeyAuth from "../middleware/apiKeyAuth.js"
import { rotateApiKey } from "../controllers/apiKeyController.js";

const router=express.Router();

router.post("/rotate",apiKeyAuth,rotateApiKey);

export default router;