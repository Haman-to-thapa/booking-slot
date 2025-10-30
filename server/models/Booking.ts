import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  experience: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  date: string; 
  time: string; 
  seats: number;
  pricePaid: number;
  promoCode?: string | null;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    experience: { type: Schema.Types.ObjectId, ref: "Experience", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    seats: { type: Number, required: true, min: 1 },
    pricePaid: { type: Number, required: true },
    promoCode: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>("Booking", BookingSchema);
