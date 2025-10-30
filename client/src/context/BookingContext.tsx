import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Booking, Experience, PromoValidation } from '../types';

interface BookingState {
  experiences: Experience[];
  selectedExperience: Experience | null;
  selectedDate: string;
  selectedTime: string;
  seats: number;
  bookingData: Partial<Booking>;
  promoValidation: PromoValidation | null;
  loading: boolean;
  bookingResult: Booking | null;
}

type BookingAction =
  | { type: 'SET_EXPERIENCES'; payload: Experience[] }
  | { type: 'SELECT_EXPERIENCE'; payload: Experience }
  | { type: 'SELECT_DATE'; payload: string }
  | { type: 'SELECT_TIME'; payload: string }
  | { type: 'SET_SEATS'; payload: number }
  | { type: 'SET_BOOKING_DATA'; payload: Partial<Booking> }
  | { type: 'SET_PROMO_VALIDATION'; payload: PromoValidation }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_BOOKING_RESULT'; payload: Booking }
  | { type: 'RESET_BOOKING' };

const initialState: BookingState = {
  experiences: [],
  selectedExperience: null,
  selectedDate: '',
  selectedTime: '',
  seats: 1,
  bookingData: {},
  promoValidation: null,
  loading: false,
  bookingResult: null,
};

const bookingReducer = (state: BookingState, action: BookingAction): BookingState => {
  switch (action.type) {
    case 'SET_EXPERIENCES':
      return { ...state, experiences: action.payload };
    case 'SELECT_EXPERIENCE':
      return { ...state, selectedExperience: action.payload };
    case 'SELECT_DATE':
      return { ...state, selectedDate: action.payload, selectedTime: '' };
    case 'SELECT_TIME':
      return { ...state, selectedTime: action.payload };
    case 'SET_SEATS':
      return { ...state, seats: action.payload };
    case 'SET_BOOKING_DATA':
      return { ...state, bookingData: { ...state.bookingData, ...action.payload } };
    case 'SET_PROMO_VALIDATION':
      return { ...state, promoValidation: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_BOOKING_RESULT':
      return { ...state, bookingResult: action.payload, loading: false };
    case 'RESET_BOOKING':
      return { ...initialState, experiences: state.experiences };
    default:
      return state;
  }
};

const BookingContext = createContext<{
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
} | null>(null);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};