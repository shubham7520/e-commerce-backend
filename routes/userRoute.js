import { Router } from "express";
import { login, signUp } from "../controllers/userController.js";
const router = Router();

router.post("/user/signup", signUp);
router.post("/user/login", login);
export default router;
