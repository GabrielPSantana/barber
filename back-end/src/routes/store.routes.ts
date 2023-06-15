// Express
import { Router } from "express";
// Helpers
import { verifyToken } from "../helpers/verifyToken";
// Controllers
import StoreController from "../api/StoreController";

// Instance
const store = new StoreController();
const router = Router();
// Routes
router.post("/create", verifyToken, store.save);
router.get("/", store.getAll);

export default router;
