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
router.get("/:id", store.getStoreById);
router.get("/getbyuser/:userId",verifyToken, store.getStoreByUserId);
router.delete("/:id", verifyToken, store.removePetById);
router.patch("/:id", verifyToken, store.updateStore);
export default router;
