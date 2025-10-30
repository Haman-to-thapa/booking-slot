import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { promoAPI, bookingAPI } from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useBooking();
  const { selectedExperience, selectedDate, selectedTime, seats, promoValidation } = state;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [promoCode, setPromoCode] = useState('');
  const [validatingPromo, setValidatingPromo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const basePrice = selectedExperience ? selectedExperience.price * seats : 0;
  const discount = promoValidation?.discount || 0;
  const finalPrice = basePrice - discount;

  useEffect(() => {
    if (!selectedExperience) {
      navigate('/');
    }
  }, [selectedExperience, navigate]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\+\d{10,}$/.test(formData.phone)) newErrors.phone = 'Phone must be in international format';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleValidatePromo = async () => {
    if (!promoCode.trim()) return;

    setValidatingPromo(true);
    try {
      const response = await promoAPI.validate(promoCode, basePrice);
      dispatch({ type: 'SET_PROMO_VALIDATION', payload: response.data });
    } catch (error: any) {
      dispatch({
        type: "SET_PROMO_VALIDATION",
        payload: {
          valid: false,
          discount: 0,
          message: error.response?.data?.message || "invalid promo code"
        }
      });
    } finally {
      setValidatingPromo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const bookingData = {
        experienceId: selectedExperience!._id,
        ...formData,
        date: selectedDate,
        time: selectedTime,
        seats,
        promoCode: promoValidation?.valid ? promoCode : undefined,
      };

      const response = await bookingAPI.create(bookingData);
      dispatch({ type: 'SET_BOOKING_RESULT', payload: response.data.booking });
      navigate('/result');
    } catch (error: any) {
      console.error('Booking failed:', error);
      alert(error.response?.data?.error || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  const formatTimeTo12Hour = (time24: string): string => {
    const [hours, minutes] = time24.split(':');
    const hourNum = parseInt(hours);
    const period = hourNum >= 12 ? 'pm' : 'am';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
  };

  if (!selectedExperience) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-white">

      <header className="flex justify-between items-center py-4 px-6 bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center space-x-2">

          <span className="font-semibold text-lg">highway delite</span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search experiences"
            className="border border-pink-400 focus:outline-none px-3 py-2 rounded w-72"
          />
          <button className="bg-yellow-400 text-black px-4 py-2 rounded font-medium hover:bg-yellow-500">
            Search
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600 mb-8">Complete your booking by providing your details</p>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Information</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="+919876543210"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Promo Code</h3>
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Enter promo code"
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={handleValidatePromo}
                      disabled={validatingPromo || !promoCode.trim()}
                      className="bg-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {validatingPromo ? 'Applying...' : 'Apply'}
                    </button>
                  </div>

                  {promoValidation && (
                    <div className={`mt-3 text-sm ${promoValidation.valid ? 'text-green-600' : 'text-red-600'}`}>
                      {promoValidation.valid ? (
                        <div className="flex items-center space-x-2">
                          <span>✅</span>
                          <span>
                            {promoValidation.promo?.code} applied! Discount: ₹{promoValidation.discount}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>❌</span>
                          <span>{promoValidation.message}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <LoadingSpinner />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="xl:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Summary</h2>

              {/* Experience Info */}
              <div className="flex items-start space-x-4 mb-6">
                <img
                  src={selectedExperience.image}
                  alt={selectedExperience.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">{selectedExperience.title}</h3>
                  <p className="text-gray-600 text-sm">{selectedExperience.location}</p>
                  <p className="text-blue-600 font-semibold mt-1">₹{selectedExperience.price} per person</p>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Date</span>
                  <span className="font-semibold text-gray-900">
                    {new Date(selectedDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Time</span>
                  <span className="font-semibold text-gray-900">
                    {formatTimeTo12Hour(selectedTime)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Seats</span>
                  <span className="font-semibold text-gray-900">{seats} {seats === 1 ? 'person' : 'people'}</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Base Price ({seats} × ₹{selectedExperience.price})</span>
                  <span>₹{basePrice}</span>
                </div>

                {promoValidation?.valid && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({promoValidation.promo?.code})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-3">
                  <span>Total Amount</span>
                  <span>₹{finalPrice}</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <span className="text-blue-600">ℹ️</span>
                  <div className="text-sm text-blue-700">
                    <p className="font-medium">Free cancellation</p>
                    <p className="mt-1">Cancel up to 24 hours before your experience for a full refund</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};