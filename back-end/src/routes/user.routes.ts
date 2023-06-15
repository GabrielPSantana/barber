// Express
import { Router } from "express";
// Controllers
import UserController from "../api/UserController";

// Instance
const user = new UserController();
const router = Router();
// Routes
router.post("/register", user.register);
router.post("/login", user.login);
router.get("/:id", user.getUserById);
router.get("/", user.getAll);

export default router;
