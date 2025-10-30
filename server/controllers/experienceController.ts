import { Request, Response } from "express";
import Experience from "../models/Experience";

export const getExperiences = async (req: Request, res: Response) => {
  try {
    const items = await Experience.find().select("title location price image category");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const exp = await Experience.findById(id);
    if (!exp) return res.status(404).json({ error: "Experience not found" });
    res.json(exp);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
