import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const BookingResult: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useBooking();
  const { bookingResult, selectedExperience } = state;

  useEffect(() => {
    if (!bookingResult) {
      navigate('/');
    }
  }, [bookingResult, navigate]);

  const handleNewBooking = () => {
    dispatch({ type: 'RESET_BOOKING' });
    navigate('/');
  };

  const handleViewBooking = () => {
    alert(`Booking ID: ${bookingResult?._id}\nKeep this ID for reference.`);
  };

  if (!bookingResult) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-8">
            Your booking has been successfully confirmed. We've sent a confirmation email to {bookingResult.email}.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-semibold mb-4">Booking Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700">Experience</h3>
                <p className="text-gray-600">{selectedExperience?.title}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Location</h3>
                <p className="text-gray-600">{selectedExperience?.location}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Date & Time</h3>
                <p className="text-gray-600">
                  {new Date(bookingResult.date).toLocaleDateString()} at {bookingResult.time}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Guests</h3>
                <p className="text-gray-600">{bookingResult.seats} {bookingResult.seats === 1 ? 'person' : 'people'}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Booking ID</h3>
                <p className="text-gray-600 font-mono">{bookingResult._id}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Total Paid</h3>
                <p className="text-2xl font-bold text-primary">₹{bookingResult.pricePaid}</p>
              </div>
            </div>

            {bookingResult.promoCode && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-green-700">
                  <span className="font-semibold">Promo Applied:</span> {bookingResult.promoCode}
                </p>
              </div>
            )}
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-blue-800 mb-2">What's Next?</h3>
            <ul className="text-blue-700 list-disc list-inside space-y-1">
              <li>You'll receive a confirmation email within 5 minutes</li>
              <li>Present your booking ID at the venue</li>
              <li>Arrive 15 minutes before your scheduled time</li>
              <li>Contact support if you have any questions</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleViewBooking}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
            >
              View Booking Details
            </button>
            <button
              onClick={handleNewBooking}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Book Another Experience
            </button>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Need help? Contact our support team at{' '}
              <a href="mailto:support@experiences.com" className="text-primary hover:underline">
                support@experiences.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};