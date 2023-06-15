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
router.get("/:id", store.getStoreById)
router.delete("/:id", verifyToken, store.removePetById);

export default router;
