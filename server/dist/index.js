"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const experience_1 = __importDefault(require("./routes/experience"));
const booking_1 = __importDefault(require("./routes/booking"));
const promo_1 = __importDefault(require("./routes/promo"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['https://booking-slot-1.onrender.com'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
}));
app.use(express_1.default.json());
app.use("/api/experiences", experience_1.default);
app.use("/api/bookings", booking_1.default);
app.use("/api/promo", promo_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
