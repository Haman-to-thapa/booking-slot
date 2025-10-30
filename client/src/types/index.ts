export interface Experience {
  _id: string;
  title: string;
  location: string;
  price: number;
  description: string;
  image: string;
  category: string;
  dateSlots: DateSlot[];
}

export interface DateSlot {
  date: string;
  slots: TimeSlot[];
}

export interface TimeSlot {
  time: string;
  capacity: number;
  remaining: number;
}

export interface Booking {
  _id?: string;
  experience: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  seats: number;
  pricePaid: number;
  promoCode?: string;
}

export interface PromoValidation {
  valid: boolean;
  discount: number;
  promo?: {
    code: string;
    type: 'PERCENT' | 'FLAT';
    value: number;
  };
  message?: string;
}