// Express
import { Router } from "express";
import { verifyToken } from "../helpers/verifyToken";
// Controllers
import UserController from "../controllers/UserController";

// Instance
const user = new UserController();
const router = Router();

// Routes
router.post("/register", user.register);
router.post("/login", user.login);
router.get("/:id", user.getUserById);
router.get("/", user.getAll);
router.put("/:id",verifyToken , user.edit);
router.delete("/:id", user.delete);

export default router;
