"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingsController_1 = require("../controllers/bookingsController");
const router = (0, express_1.Router)();
router.post("/", bookingsController_1.createBooking);
exports.default = router;
