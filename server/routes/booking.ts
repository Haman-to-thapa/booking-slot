import { Router } from "express";
import { createBooking } from "../controllers/bookingsController";

const router = Router();
router.post("/", createBooking);

export default router;
