import mongoose from 'mongoose';
import Experience from '../models/Experience';
import dotenv from 'dotenv'

dotenv.config()

export const seed = async () => {
  try {
    const count = await Experience.countDocuments();
    if (count > 0) {
      console.log(' Database already seeded');
      return;
    }
    
const getDateOffsetStr = (days:number) => {
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
    
    const result = await Experience.insertMany(experiences);
    console.log(` Seeded ${result.length} experiences successfully`);
    return result;
  } catch (error) {
    console.error(' Seeding failed:', error);
    throw error;
  }
};

if (require.main === module) {
  import('../config/db').then(async (dbModule) => {
    try {
      const connectDB = dbModule.default;
      await connectDB();
      await seed();
      console.log(' Seeding completed successfully');
    } catch (error) {
      console.error(' Seeding failed:', error);
    } finally {
      mongoose.connection.close();
    }
  });
}