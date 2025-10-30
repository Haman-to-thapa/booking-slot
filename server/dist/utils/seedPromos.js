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
exports.seedPromos = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Promo_1 = __importDefault(require("../models/Promo"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const seedPromos = async () => {
    try {
        // Optional: Clear existing promos
        const deleted = await Promo_1.default.deleteMany({});
        console.log(`🧹 Cleared ${deleted.deletedCount} existing promos`);
        const promos = [
            {
                code: "WELCOME20",
                type: "PERCENT",
                value: 20,
                expiresAt: new Date("2027-12-31"),
                usageLimit: 200,
                used: 0,
                description: "Welcome discount for new customers"
            },
            {
                code: "SUMMER25",
                type: "PERCENT",
                value: 25,
                expiresAt: new Date("2024-08-31"),
                usageLimit: 100,
                used: 0,
                description: "Summer special discount"
            },
            {
                code: "FLAT500",
                type: "FLAT",
                value: 500,
                expiresAt: new Date("2026-12-31"),
                usageLimit: 50,
                used: 0,
                description: "Flat ₹500 off"
            },
            {
                code: "WEEKEND15",
                type: "PERCENT",
                value: 15,
                expiresAt: new Date("2024-12-31"),
                usageLimit: 75,
                used: 0,
                description: "Weekend special"
            },
            {
                code: "FIRST50",
                type: "PERCENT",
                value: 50,
                expiresAt: new Date("2026-03-31"),
                usageLimit: 10,
                used: 0,
                description: "50% off for first 10 customers"
            },
            {
                code: "SAVE300",
                type: "FLAT",
                value: 300,
                expiresAt: new Date("2026-06-30"),
                usageLimit: 100,
                used: 0,
                description: "Flat ₹300 off"
            },
            {
                code: "MONSOON30",
                type: "PERCENT",
                value: 30,
                expiresAt: new Date("2026-09-30"),
                usageLimit: 60,
                used: 0,
                description: "Monsoon season discount"
            },
            {
                code: "FREESHIP",
                type: "FLAT",
                value: 200,
                expiresAt: new Date("2027-12-31"),
                usageLimit: 150,
                used: 0,
                description: "Free shipping equivalent"
            },
            {
                code: "LOYALTY10",
                type: "PERCENT",
                value: 10,
                expiresAt: new Date("2029-01-31"),
                usageLimit: 500,
                used: 0,
                description: "Loyalty customer discount"
            },
            {
                code: "FLASH40",
                type: "PERCENT",
                value: 40,
                expiresAt: new Date("2026-02-29"),
                usageLimit: 25,
                used: 0,
                description: "Flash sale - limited time"
            },
            {
                code: "STUDENT15",
                type: "PERCENT",
                value: 15,
                expiresAt: new Date("2027-12-31"),
                usageLimit: 200,
                used: 0,
                description: "Student discount"
            },
            {
                code: "FAMILY25",
                type: "PERCENT",
                value: 25,
                expiresAt: new Date("2028-12-31"),
                usageLimit: 80,
                used: 0,
                description: "Family package discount"
            }
        ];
        const result = await Promo_1.default.insertMany(promos);
        console.log(`✅ Seeded ${result.length} promo codes successfully`);
        // Display created promos
        console.log('\n📋 Created Promo Codes:');
        result.forEach(promo => {
            console.log(`   🏷️  ${promo.code} - ${promo.type} ${promo.value}${promo.type === 'PERCENT' ? '%' : '₹'} (Limit: ${promo.usageLimit})`);
        });
        return result;
    }
    catch (error) {
        console.error(' Seeding promos failed:', error);
        throw error;
    }
};
exports.seedPromos = seedPromos;
// Run if called directly
if (require.main === module) {
    Promise.resolve().then(() => __importStar(require('../config/db'))).then(async (dbModule) => {
        try {
            const connectDB = dbModule.default;
            await connectDB();
            await (0, exports.seedPromos)();
            console.log('\n Promo seeding completed successfully!');
        }
        catch (error) {
            console.error(' Promo seeding failed:', error);
        }
        finally {
            mongoose_1.default.connection.close();
            process.exit(0);
        }
    });
}
