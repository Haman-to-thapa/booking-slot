import { Router } from "express";
import { getExperienceById, getExperiences } from "../controllers/experienceController";


const router = Router();
router.get("/", getExperiences);
router.get("/:id", getExperienceById);

export default router;
