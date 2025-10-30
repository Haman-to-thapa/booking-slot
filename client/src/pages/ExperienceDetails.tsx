import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { experienceAPI } from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useBooking } from '../context/BookingContext';
import type { DateSlot, Experience } from '../types';

export const ExperienceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useBooking();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [search, setSearch] = useState("");


  useEffect(() => {
    const fetchExperience = async () => {
      if (!id) return;
      try {
        const response = await experienceAPI.getById(id);
        setExperience(response.data);
        dispatch({ type: 'SELECT_EXPERIENCE', payload: response.data });
      } catch (err) {
        console.error('Failed to fetch experience:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id, dispatch]);

  const handleBookNow = () => {
    if (selectedDate && selectedTime && experience) {
      dispatch({ type: 'SELECT_DATE', payload: selectedDate });
      dispatch({ type: 'SELECT_TIME', payload: selectedTime });
      navigate('/checkout');
    }
  };

  const getAvailableSlots = (): DateSlot[] => {
    if (!experience) return [];
    return experience.dateSlots.filter(slot =>
      slot.slots.some(timeSlot => timeSlot.remaining > 0)
    );
  };

  const getTimesForSelectedDate = () => {
    if (!selectedDate || !experience) return [];
    const dateSlot = experience.dateSlots.find(slot => slot.date === selectedDate);
    return dateSlot ? dateSlot.slots.filter(slot => slot.remaining > 0) : [];
  };
  const formatDateShort = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTimeTo12Hour = (time24: string): string => {
    const [hours, minutes] = time24.split(':');
    const hourNum = parseInt(hours);
    const period = hourNum >= 12 ? 'pm' : 'am';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
  };

  if (loading) return <LoadingSpinner />;
  if (!experience) return <div>Experience not found</div>;

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
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-pink-400 focus:outline-none px-3 py-2 rounded w-72"
          />
          <button className="bg-yellow-400 text-black px-4 py-2 rounded font-medium hover:bg-yellow-500">
            Search
          </button>
        </div>
      </header>


      <div className="max-w-4xl mx-auto px-4 py-8">


        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Kayaking
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Curated small-group experience. Certified guide. Safety first with gear included.
            Helmet and Life jackets along with an expert will accompany in kayaking.
          </p>
        </div>

        <div className="mb-8">
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose date</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {getAvailableSlots().map((slot) => (
              <button
                key={slot.date}
                onClick={() => setSelectedDate(slot.date)}
                className={` px-6 py-3 border-2 rounded-lg text-center min-w-[120px] transition-colors ${selectedDate === slot.date
                  ? 'border-blue-600 bg-blue-600 text-white font-semibold'
                  : 'border-gray-300 text-gray-700 hover:border-blue-400'
                  }`}
              >
                {formatDateShort(slot.date)}
              </button>
            ))}
          </div>
        </div>


        {selectedDate && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose time</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {getTimesForSelectedDate().map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`px-6 py-3 border-2 rounded-lg text-center min-w-[140px] transition-colors ${selectedTime === slot.time
                    ? 'border-blue-600 bg-blue-600 text-white font-semibold'
                    : 'border-gray-300 text-gray-700 hover:border-blue-400'
                    }`}
                >
                  <div className="font-medium">
                    {formatTimeTo12Hour(slot.time)}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {slot.remaining} seats left
                  </div>
                </button>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-2">
              All times are in IST (UTC +5:30)
            </p>
          </div>
        )}


        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed">
              Small groups, certified guides, and safety briefing. Minimum age 10.
              <br /><br />
              <strong>What's included:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                <li>Professional certified guide</li>
                <li>Safety equipment (helmet, life jacket)</li>
                <li>Small group experience (max 8 people)</li>
                <li>Safety briefing and training</li>
                <li>All necessary kayaking equipment</li>
              </ul>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-3xl font-bold text-gray-900">
                ₹{experience.price}
                <span className="text-lg text-gray-600 font-normal ml-2">per person</span>
              </div>
              <div className="text-gray-500 text-sm mt-1">
                Total for {selectedTime ? '1 person' : '...'} • Free cancellation
              </div>
            </div>

            <button
              onClick={handleBookNow}
              disabled={!selectedDate || !selectedTime}
              className={`px-12 py-4 rounded-lg font-semibold text-lg transition-colors min-w-[200px] ${!selectedDate || !selectedTime
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
              {!selectedDate || !selectedTime ? 'Select date & time' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};