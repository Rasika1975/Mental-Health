import React, { useState } from 'react';
import { FiCalendar, FiClock, FiUser, FiPhone, FiVideo, FiMessageCircle, FiStar, FiMapPin, FiCheckCircle } from 'react-icons/fi';

const BookingPage = () => {
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionType, setSessionType] = useState('video');
  const [bookingStep, setBookingStep] = useState('counselors'); // counselors, schedule, details, confirmation
  const [bookingDetails, setBookingDetails] = useState({
    reason: '',
    urgency: 'normal',
    previousSession: false,
    preferences: ''
  });

  const counselors = [
    {
      id: 1,
      name: 'Dr. Aastha',
      title: 'Licensed Clinical Psychologist',
      specialization: 'Anxiety, Depression, Academic Stress',
      experience: '40+ years',
      rating: 4.9,
      reviews: 124,
      image: 'https://via.placeholder.com/150x150/3B82F6/FFFFFF?text=SJ',
      availability: 'Available Today',
      languages: ['English', 'Spanish','hindi','marathi'],
      sessionTypes: ['video', 'phone', 'in-person']
    },
    
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];
  

  const getNextWeekDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      });
    }
    return dates;
  };

  const handleBooking = () => {
    // In a real app, this would make an API call
    console.log('Booking:', {
      counselor: selectedCounselor,
      date: selectedDate,
      time: selectedTime,
      type: sessionType,
      details: bookingDetails
    });
    setBookingStep('confirmation');
  };

  const resetBooking = () => {
    setSelectedCounselor(null);
    setSelectedDate('');
    setSelectedTime('');
    setSessionType('video');
    setBookingStep('counselors');
    setBookingDetails({
      reason: '',
      urgency: 'normal',
      previousSession: false,
      preferences: ''
    });
  };

  if (bookingStep === 'confirmation') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="text-white text-2xl" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your appointment has been successfully scheduled.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Appointment Details</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FiUser className="text-gray-500" />
                <span><strong>Counselor:</strong> {counselors.find(c => c.id === selectedCounselor)?.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiCalendar className="text-gray-500" />
                <span><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiClock className="text-gray-500" />
                <span><strong>Time:</strong> {selectedTime}</span>
              </div>
              <div className="flex items-center space-x-3">
                {sessionType === 'video' && <FiVideo className="text-gray-500" />}
                {sessionType === 'phone' && <FiPhone className="text-gray-500" />}
                {sessionType === 'in-person' && <FiMapPin className="text-gray-500" />}
                <span><strong>Session Type:</strong> {sessionType.charAt(0).toUpperCase() + sessionType.slice(1)}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-blue-700">
              <strong>What's Next?</strong> You'll receive a confirmation email with session details and preparation tips. 
              The counselor may contact you 15 minutes before your appointment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetBooking}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Book Another Session
            </button>
            
            <a
              href="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Book a Counselor</h1>
        <p className="text-xl text-gray-600">
          Schedule a confidential session with one of our licensed mental health professionals.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {['counselors', 'schedule', 'details'].map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                bookingStep === step
                  ? 'bg-blue-600 text-white'
                  : ['counselors', 'schedule', 'details'].indexOf(bookingStep) > index
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}>
                {['counselors', 'schedule', 'details'].indexOf(bookingStep) > index ? '✓' : index + 1}
              </div>
              <span className={`ml-2 ${bookingStep === step ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                {step.charAt(0).toUpperCase() + step.slice(1)}
              </span>
              {index < 2 && <div className="w-8 h-0.5 bg-gray-300 ml-4"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Select Counselor */}
      {bookingStep === 'counselors' && (
        <div className="space-y-6">
          {counselors.map((counselor) => (
            <div
              key={counselor.id}
              className={`bg-white rounded-xl p-6 shadow-lg cursor-pointer transition-all duration-300 ${
                selectedCounselor === counselor.id
                  ? 'ring-2 ring-blue-500 shadow-xl'
                  : 'hover:shadow-xl hover:-translate-y-1'
              }`}
              onClick={() => setSelectedCounselor(counselor.id)}
            >
              <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
                <img
                  src={counselor.image}
                  alt={counselor.name}
                  className="w-24 h-24 rounded-full mx-auto lg:mx-0"
                />
                
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{counselor.name}</h3>
                      <p className="text-blue-600 font-medium">{counselor.title}</p>
                    </div>
                    
                    <div className="flex items-center space-x-1 mt-2 lg:mt-0">
                      <FiStar className="text-yellow-500 fill-current" />
                      <span className="font-medium">{counselor.rating}</span>
                      <span className="text-gray-500">({counselor.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">
                    <strong>Specialization:</strong> {counselor.specialization}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <span><strong>Experience:</strong> {counselor.experience}</span>
                    <span><strong>Languages:</strong> {counselor.languages.join(', ')}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-green-600 font-medium">{counselor.availability}</span>
                    <div className="flex space-x-2">
                      {counselor.sessionTypes.map((type) => (
                        <span key={type} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full capitalize">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="text-center">
            <button
              onClick={() => setBookingStep('schedule')}
              disabled={!selectedCounselor}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Continue to Schedule
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Select Date & Time */}
      {bookingStep === 'schedule' && (
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Date & Time</h2>
          
          {/* Session Type */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Type</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { type: 'video', icon: FiVideo, label: 'Video Call', desc: 'Secure video session' },
                { type: 'phone', icon: FiPhone, label: 'Phone Call', desc: 'Audio-only session' },
                { type: 'in-person', icon: FiMapPin, label: 'In-Person', desc: 'Campus office visit' }
              ].map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.type}
                    onClick={() => setSessionType(option.type)}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      sessionType === option.type
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="text-2xl mx-auto mb-2" />
                    <div className="text-sm font-medium">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {getNextWeekDates().map((date) => (
                <button
                  key={date.value}
                  onClick={() => setSelectedDate(date.value)}
                  className={`p-3 border-2 rounded-lg text-center transition-all ${
                    selectedDate === date.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-sm font-medium">{date.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Time</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 border-2 rounded-lg font-medium transition-all ${
                    selectedTime === time
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setBookingStep('counselors')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            
            <button
              onClick={() => setBookingStep('details')}
              disabled={!selectedDate || !selectedTime}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Booking Details */}
      {bookingStep === 'details' && (
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Session Details</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What would you like to discuss? (Optional)
              </label>
              <textarea
                value={bookingDetails.reason}
                onChange={(e) => setBookingDetails(prev => ({ ...prev, reason: e.target.value }))}
                placeholder="Brief description of what you'd like to talk about..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Urgency Level
              </label>
              <select
                value={bookingDetails.urgency}
                onChange={(e) => setBookingDetails(prev => ({ ...prev, urgency: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low - General wellness check</option>
                <option value="normal">Normal - Regular support needed</option>
                <option value="high">High - Urgent support needed</option>
              </select>
            </div>

            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={bookingDetails.previousSession}
                  onChange={(e) => setBookingDetails(prev => ({ ...prev, previousSession: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">I have had previous sessions with this counselor</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Preferences or Requirements (Optional)
              </label>
              <textarea
                value={bookingDetails.preferences}
                onChange={(e) => setBookingDetails(prev => ({ ...prev, preferences: e.target.value }))}
                placeholder="Any specific preferences, accessibility needs, or other requirements..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <p className="text-yellow-700 text-sm">
              <strong>Privacy Notice:</strong> All session details are confidential and protected by HIPAA regulations. 
              Only you and your assigned counselor will have access to this information.
            </p>
          </div>

          <div className="flex space-x-4 mt-8">
            <button
              onClick={() => setBookingStep('schedule')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            
            <button
              onClick={handleBooking}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;