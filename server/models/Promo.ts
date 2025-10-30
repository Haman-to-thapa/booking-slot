import mongoose, { Schema, Document } from "mongoose";

export interface IPromo extends Document {
  code: string;
  type: "PERCENT" | "FLAT";
  value: number; 
  expiresAt?: Date;
  usageLimit?: number; 
  used?: number;
}

const PromoSchema = new Schema<IPromo>({
  code: { type: String, required: true, unique: true, uppercase: true },
  type: { type: String, enum: ["PERCENT", "FLAT"], required: true },
  value: { type: Number, required: true },
  expiresAt: { type: Date },
  usageLimit: { type: Number },
  used: { type: Number, default: 0 }
});

export default mongoose.model<IPromo>("Promo", PromoSchema);
