import { Request, Response } from "express";
import Experience from "../models/Experience";
import Booking from "../models/Booking";
import Promo from "../models/Promo";
import mongoose from "mongoose";

export const createBooking = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  try {
    const { experienceId, name, email, phone, date, time, seats = 1, promoCode } = req.body;

     console.log('=== REQUEST BODY ===');
    console.log('experienceId:', experienceId, 'Type:', typeof experienceId);
    console.log('name:', name, 'Type:', typeof name);
    console.log('email:', email, 'Type:', typeof email);
    console.log('phone:', phone, 'Type:', typeof phone);
    console.log('date:', date, 'Type:', typeof date);
    console.log('time:', time, 'Type:', typeof time);
    console.log('seats:', seats, 'Type:', typeof seats);
    console.log('promoCode:', promoCode, 'Type:', typeof promoCode);
    console.log('====================');

    const missingFields = [];
    if (!experienceId) missingFields.push('experienceId');
    if (!name) missingFields.push('name');
    if (!email) missingFields.push('email');
    if (!date) missingFields.push('date');
    if (!time) missingFields.push('time');

    if (missingFields.length > 0) {
      console.log('Missing fields:', missingFields);
      return res.status(400).json({ 
        error: "Missing required fields",
        missingFields: missingFields 
      });
    }

    if (!experienceId || !name || !email || !date || !time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

   
    const convertTo24Hour = (timeStr: string): string => {
      if (!timeStr) return timeStr;
      
    
      if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeStr)) {
        return timeStr;
      }
      

      const timeLower = timeStr.toLowerCase().trim();
      const match = timeLower.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/);
      
      if (!match) {
        throw new Error('Invalid time format');
      }
      
      let [_, hours, minutes, period] = match;
      let hourNum = parseInt(hours);
      
      if (period === 'pm' && hourNum !== 12) {
        hourNum += 12;
      } else if (period === 'am' && hourNum === 12) {
        hourNum = 0;
      }
      
      return `${hourNum.toString().padStart(2, '0')}:${minutes}`;
    };

    const time24 = convertTo24Hour(time);

    // Begin transaction
    session.startTransaction();

    // Use findOneAndUpdate with arrayFilters
    const updated = await Experience.findOneAndUpdate(
      {
        _id: experienceId,
        "dateSlots.date": date,
        "dateSlots.slots.time": time24, 
        "dateSlots.slots.remaining": { $gte: seats }
      },
      {
        $inc: { "dateSlots.$[ds].slots.$[s].remaining": -seats }
      },
      {
        arrayFilters: [{ "ds.date": date }, { "s.time": time24 }], 
        new: true,
        session
      }
    );

    if (!updated) {
      await session.abortTransaction();
      return res.status(400).json({ error: "Slot not available or insufficient remaining seats" });
    }

    // compute price
    const experience = await Experience.findById(experienceId).session(session);
    if (!experience) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Experience not found" });
    }
    const basePrice = experience.price * seats;
    let discount = 0;

    if (promoCode) {
      const promo = await Promo.findOne({ code: promoCode.toUpperCase() }).session(session);
      if (!promo) {
        await session.abortTransaction();
        return res.status(400).json({ error: "Invalid promo code" });
      }
      if (promo.expiresAt && promo.expiresAt < new Date()) {
        await session.abortTransaction();
        return res.status(400).json({ error: "Promo expired" });
      }
      if (promo.usageLimit && (promo.used ?? 0) >= promo.usageLimit) {
        await session.abortTransaction();
        return res.status(400).json({ error: "Promo exhausted" });
      }

      if (promo.type === "PERCENT") discount = Math.round((basePrice * promo.value) / 100);
      else discount = Math.min(promo.value, basePrice);

    
      promo.used = (promo.used || 0) + 1;
      await promo.save({ session });
    }

    const pricePaid = basePrice - discount;

    const booking = new Booking({
      experience: experienceId,
      name,
      email,
      phone,
      date,
      time: time24, 
      seats,
      pricePaid,
      promoCode: promoCode ? promoCode.toUpperCase() : undefined
    });

    await booking.save({ session });

    await session.commitTransaction();
    res.status(201).json({ success: true, booking });
  } catch (err) {
    await session.abortTransaction();
    console.error("Booking error:", err);
    res.status(500).json({ error: "Server error" });
  } finally {
    session.endSession();
  }
};
