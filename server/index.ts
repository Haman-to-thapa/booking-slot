import express, {Application} from 'express'
import dotenv from "dotenv";
import cors from "cors";
import connectDB from './config/db';
import experiencesRoutes from "./routes/experience";
import bookingsRoutes from "./routes/booking";
import promoRoutes from "./routes/promo";



dotenv.config();
connectDB();

const app: Application = express();


app.use(cors({
  origin: ['https://booking-slot-1.onrender.com'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.use("/api/experiences", experiencesRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/promo", promoRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));