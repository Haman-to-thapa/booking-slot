"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExperienceById = exports.getExperiences = void 0;
const Experience_1 = __importDefault(require("../models/Experience"));
const getExperiences = async (req, res) => {
    try {
        const items = await Experience_1.default.find().select("title location price image category");
        res.json(items);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
exports.getExperiences = getExperiences;
const getExperienceById = async (req, res) => {
    try {
        const { id } = req.params;
        const exp = await Experience_1.default.findById(id);
        if (!exp)
            return res.status(404).json({ error: "Experience not found" });
        res.json(exp);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
exports.getExperienceById = getExperienceById;
