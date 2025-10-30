"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Experience_1 = __importDefault(require("../models/Experience"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const seed = async () => {
    try {
        const count = await Experience_1.default.countDocuments();
        if (count > 0) {
            console.log(' Database already seeded');
            return;
        }
        const getDateOffsetStr = (days) => {
            const date = new Date();
            date.setDate(date.getDate() + days);
            return date.toISOString().split('T')[0];
        };
        const experiences = [
            {
                title: "Kayaking",
                location: "Udupi",
                price: 999,
                description: "Curated small-group experience. Certified guide. Safety first with gear included.",
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
                category: "Adventure",
                dateSlots: [
                    {
                        date: getDateOffsetStr(1),
                        slots: [
                            { time: "08:00", capacity: 8, remaining: 8 },
                            { time: "10:00", capacity: 8, remaining: 8 }
                        ]
                    },
                    {
                        date: getDateOffsetStr(2),
                        slots: [
                            { time: "08:00", capacity: 8, remaining: 8 },
                            { time: "14:00", capacity: 8, remaining: 8 }
                        ]
                    }
                ]
            },
            {
                title: "Nandi Hills Sunrise",
                location: "Bangalore",
                price: 899,
                description: "Sunrise trek to Nandi Hills with transport and guide included.",
                image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
                category: "Nature",
                dateSlots: [
                    {
                        date: getDateOffsetStr(1),
                        slots: [
                            { time: "05:00", capacity: 20, remaining: 20 }
                        ]
                    },
                    {
                        date: getDateOffsetStr(3),
                        slots: [
                            { time: "05:00", capacity: 20, remaining: 20 }
                        ]
                    }
                ]
            },
            {
                title: "Coffee Trail",
                location: "Coorg",
                price: 1299,
                description: "Guided coffee plantation walk with tasting session.",
                image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
                category: "Food",
                dateSlots: [
                    {
                        date: getDateOffsetStr(2),
                        slots: [
                            { time: "09:00", capacity: 15, remaining: 15 }
                        ]
                    }
                ]
            },
            {
                title: "Boat Cruise",
                location: "Sunderbans",
                price: 999,
                description: "Relaxing boat cruise with refreshments.",
                image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=80",
                category: "Relax",
                dateSlots: [
                    {
                        date: getDateOffsetStr(4),
                        slots: [{ time: "11:00", capacity: 30, remaining: 30 }]
                    }
                ]
            },
            {
                title: "Bunjee Jumping",
                location: "Manali",
                price: 999,
                description: "Adrenaline-pumping bunjee jump with safety briefing and gear.",
                image: "https://images.unsplash.com/photo-1520975922131-0a52b62cc5a3?auto=format&fit=crop&w=1200&q=80",
                category: "Adventure",
                dateSlots: [
                    {
                        date: getDateOffsetStr(5),
                        slots: [{ time: "09:00", capacity: 10, remaining: 10 }]
                    }
                ]
            },
            {
                title: "Wildlife Safari",
                location: "Ranthambore",
                price: 1999,
                description: "Exciting jungle safari with expert naturalist. Chance to spot tigers and other wildlife.",
                image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
                category: "Wildlife",
                dateSlots: [
                    {
                        date: getDateOffsetStr(2),
                        slots: [
                            { time: "06:00", capacity: 12, remaining: 12 },
                            { time: "15:00", capacity: 12, remaining: 12 }
                        ]
                    },
                    {
                        date: getDateOffsetStr(4),
                        slots: [
                            { time: "06:00", capacity: 12, remaining: 12 }
                        ]
                    }
                ]
            },
            {
                title: "Beach Camping",
                location: "Goa",
                price: 1499,
                description: "Overnight beach camping experience with bonfire, barbecue, and water sports.",
                image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80",
                category: "Camping",
                dateSlots: [
                    {
                        date: getDateOffsetStr(3),
                        slots: [{ time: "16:00", capacity: 25, remaining: 25 }]
                    },
                    {
                        date: getDateOffsetStr(6),
                        slots: [{ time: "16:00", capacity: 25, remaining: 25 }]
                    }
                ]
            },
            {
                title: "Heritage Walk",
                location: "Delhi",
                price: 799,
                description: "Guided historical tour of Old Delhi with local food tasting.",
                image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1200&q=80",
                category: "Culture",
                dateSlots: [
                    {
                        date: getDateOffsetStr(1),
                        slots: [
                            { time: "08:00", capacity: 20, remaining: 20 },
                            { time: "16:00", capacity: 20, remaining: 20 }
                        ]
                    },
                    {
                        date: getDateOffsetStr(3),
                        slots: [
                            { time: "08:00", capacity: 20, remaining: 20 }
                        ]
                    }
                ]
            }
        ];
        const result = await Experience_1.default.insertMany(experiences);
        console.log(` Seeded ${result.length} experiences successfully`);
        return result;
    }
    catch (error) {
        console.error(' Seeding failed:', error);
        throw error;
    }
};
exports.seed = seed;
if (require.main === module) {
    Promise.resolve().then(() => __importStar(require('../config/db'))).then(async (dbModule) => {
        try {
            const connectDB = dbModule.default;
            await connectDB();
            await (0, exports.seed)();
            console.log(' Seeding completed successfully');
        }
        catch (error) {
            console.error(' Seeding failed:', error);
        }
        finally {
            mongoose_1.default.connection.close();
        }
    });
}
