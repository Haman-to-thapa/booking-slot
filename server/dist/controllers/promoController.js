"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePromo = void 0;
const Promo_1 = __importDefault(require("../models/Promo"));
const validatePromo = async (req, res) => {
    try {
        const { code, amount } = req.body;
        console.log('=== PROMO VALIDATION REQUEST ===');
        console.log('Code:', code, 'Type:', typeof code);
        console.log('Amount:', amount, 'Type:', typeof amount);
        if (!code)
            return res.status(400).json({ valid: false, message: "Promo code required" });
        const searchCode = code.toUpperCase();
        console.log('Searching for code:', searchCode);
        const promo = await Promo_1.default.findOne({ code: searchCode });
        console.log('Found promo:', promo);
        if (!promo) {
            console.log('Promo not found in database');
            return res.status(404).json({ valid: false, message: "Invalid promo" });
        }
        console.log('Promo details:', {
            code: promo.code,
            expiresAt: promo.expiresAt,
            currentDate: new Date(),
            isExpired: promo.expiresAt && promo.expiresAt < new Date()
        });
        if (promo.expiresAt && promo.expiresAt < new Date()) {
            console.log('Promo expired');
            return res.status(400).json({ valid: false, message: "Promo expired" });
        }
        if (promo.usageLimit && (promo.used ?? 0) >= promo.usageLimit) {
            console.log('Promo usage limit reached');
            return res.status(400).json({ valid: false, message: "Promo exhausted" });
        }
        let discount = 0;
        if (typeof amount === "number") {
            if (promo.type === "PERCENT")
                discount = Math.round((amount * promo.value) / 100);
            else
                discount = Math.min(promo.value, amount);
        }
        console.log('Promo validation successful, discount:', discount);
        res.json({ valid: true, discount, promo: { code: promo.code, type: promo.type, value: promo.value } });
    }
    catch (err) {
        console.error('Promo validation error:', err);
        res.status(500).json({ valid: false, message: "Server error" });
    }
};
exports.validatePromo = validatePromo;
