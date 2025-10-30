import mongoose, { Schema, Document } from "mongoose";

export interface ISlot {
  time: string;
  capacity: number; 
  remaining: number; 
}

export interface IExperience extends Document {
  title: string;
  location: string;
  price: number;
  description: string;
  image: string;
  category?: string;
  dateSlots: {
    date: string;
    slots: ISlot[];
  }[];
}

const SlotSchema = new Schema(
  {
    time: { type: String, required: true },
    capacity: { type: Number, required: true, default: 10 },
    remaining: { type: Number, required: true, default: 10 }
  },
  { _id: false }
);

const DateSlotSchema = new Schema(
  {
    date: { type: String, required: true },
    slots: { type: [SlotSchema], default: [] }
  },
  { _id: false }
);

const ExperienceSchema = new Schema<IExperience>(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String },
    dateSlots: { type: [DateSlotSchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model<IExperience>("Experience", ExperienceSchema);
