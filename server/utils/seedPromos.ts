import mongoose from 'mongoose';
import Promo from '../models/Promo';
import dotenv from 'dotenv';

dotenv.config();

export const seedPromos = async () => {
  try {
    // Optional: Clear existing promos
    const deleted = await Promo.deleteMany({});
    console.log(`🧹 Cleared ${deleted.deletedCount} existing promos`);
    
    const promos = [
      {
        code: "WELCOME20",
        type: "PERCENT" as const,
        value: 20,
        expiresAt: new Date("2027-12-31"),
        usageLimit: 200,
        used: 0,
        description: "Welcome discount for new customers"
      },
      {
        code: "SUMMER25", 
        type: "PERCENT" as const,
        value: 25,
        expiresAt: new Date("2024-08-31"),
        usageLimit: 100,
        used: 0,
        description: "Summer special discount"
      },
      {
        code: "FLAT500",
        type: "FLAT" as const,
        value: 500,
        expiresAt: new Date("2026-12-31"),
        usageLimit: 50,
        used: 0,
        description: "Flat ₹500 off"
      },
      {
        code: "WEEKEND15",
        type: "PERCENT" as const,
        value: 15,
        expiresAt: new Date("2024-12-31"),
        usageLimit: 75,
        used: 0,
        description: "Weekend special"
      },
      {
        code: "FIRST50",
        type: "PERCENT" as const,
        value: 50,
        expiresAt: new Date("2026-03-31"),
        usageLimit: 10,
        used: 0,
        description: "50% off for first 10 customers"
      },
      {
        code: "SAVE300",
        type: "FLAT" as const,
        value: 300,
        expiresAt: new Date("2026-06-30"),
        usageLimit: 100,
        used: 0,
        description: "Flat ₹300 off"
      },
      {
        code: "MONSOON30",
        type: "PERCENT" as const,
        value: 30,
        expiresAt: new Date("2026-09-30"),
        usageLimit: 60,
        used: 0,
        description: "Monsoon season discount"
      },
      {
        code: "FREESHIP",
        type: "FLAT" as const,
        value: 200,
        expiresAt: new Date("2027-12-31"),
        usageLimit: 150,
        used: 0,
        description: "Free shipping equivalent"
      },
      {
        code: "LOYALTY10",
        type: "PERCENT" as const,
        value: 10,
        expiresAt: new Date("2029-01-31"),
        usageLimit: 500,
        used: 0,
        description: "Loyalty customer discount"
      },
      {
        code: "FLASH40",
        type: "PERCENT" as const,
        value: 40,
        expiresAt: new Date("2026-02-29"),
        usageLimit: 25,
        used: 0,
        description: "Flash sale - limited time"
      },
      {
        code: "STUDENT15",
        type: "PERCENT" as const,
        value: 15,
        expiresAt: new Date("2027-12-31"),
        usageLimit: 200,
        used: 0,
        description: "Student discount"
      },
      {
        code: "FAMILY25",
        type: "PERCENT" as const,
        value: 25,
        expiresAt: new Date("2028-12-31"),
        usageLimit: 80,
        used: 0,
        description: "Family package discount"
      }
    ];
    
    const result = await Promo.insertMany(promos);
    console.log(`✅ Seeded ${result.length} promo codes successfully`);
    
    // Display created promos
    console.log('\n📋 Created Promo Codes:');
    result.forEach(promo => {
      console.log(`   🏷️  ${promo.code} - ${promo.type} ${promo.value}${promo.type === 'PERCENT' ? '%' : '₹'} (Limit: ${promo.usageLimit})`);
    });
    
    return result;
  } catch (error) {
    console.error(' Seeding promos failed:', error);
    throw error;
  }
};

// Run if called directly
if (require.main === module) {
  import('../config/db').then(async (dbModule) => {
    try {
      const connectDB = dbModule.default;
      await connectDB();
      await seedPromos();
      console.log('\n Promo seeding completed successfully!');
    } catch (error) {
      console.error(' Promo seeding failed:', error);
    } finally {
      mongoose.connection.close();
      process.exit(0);
    }
  });
}