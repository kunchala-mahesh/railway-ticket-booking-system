import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, Trash2, ShieldCheck, Mail, Phone, AlertCircle, Train, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { CoachLayout } from '../components/CoachLayout';
import { FareSummary } from '../components/FareSummary';

export const BookingPage = () => {
  const navigate = useNavigate();
  const { activeBooking, updatePassengers, updateContactInfo, setAssignedBerths, searchParams } = useBooking();

  const train = activeBooking.train;
  const selectedClass = activeBooking.selectedClass;

  // Local state initialized from context
  const [passengers, setPassengers] = useState(
    activeBooking.passengers && activeBooking.passengers.length > 0
      ? activeBooking.passengers
      : [{ id: 'p-1', name: '', age: '', gender: 'Male', berthPreference: 'No Preference', foodPreference: 'Veg', seatAssigned: '' }]
  );

  const [contactInfo, setContactInfo] = useState({
    email: activeBooking.contactInfo?.email || 'passenger@example.com',
    phone: activeBooking.contactInfo?.phone || '9876543210'
  });

  const [selectedSeats, setSelectedSeats] = useState(activeBooking.assignedBerths || []);
  const [errors, setErrors] = useState({});

  if (!train || !selectedClass) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto">
          <Train className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">No Train Selected</h2>
        <p className="text-xs text-slate-500">Please choose a train and class from the search results to start booking.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-500 transition-colors"
        >
          Go to Search
        </button>
      </div>
    );
  }

  const handleAddPassenger = () => {
    if (passengers.length >= 6) {
      alert('Maximum 6 passengers allowed per ticket booking.');
      return;
    }
    const newPassenger = {
      id: `p-${Date.now()}`,
      name: '',
      age: '',
      gender: 'Male',
      berthPreference: 'No Preference',
      foodPreference: 'Veg',
      seatAssigned: ''
    };
    setPassengers([...passengers, newPassenger]);
  };

  const handleRemovePassenger = (id) => {
    if (passengers.length === 1) return;
    const updated = passengers.filter(p => p.id !== id);
    setPassengers(updated);
    // adjust selected seats if needed
    if (selectedSeats.length > updated.length) {
      setSelectedSeats(selectedSeats.slice(0, updated.length));
    }
  };

  const handlePassengerChange = (id, field, value) => {
    setPassengers(prev =>
      prev.map(p => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const validateForm = () => {
    const newErrors = {};
    passengers.forEach((p, idx) => {
      if (!p.name || p.name.trim().length < 2) {
        newErrors[`name_${idx}`] = 'Full name is required (min 2 chars)';
      }
      if (!p.age || isNaN(p.age) || p.age < 1 || p.age > 115) {
        newErrors[`age_${idx}`] = 'Valid age (1-115) required';
      }
    });

    if (!contactInfo.email || !/\S+@\S+\.\S+/.test(contactInfo.email)) {
      newErrors.email = 'Valid email is required for E-ticket';
    }
    if (!contactInfo.phone || contactInfo.phone.length < 10) {
      newErrors.phone = 'Valid 10-digit mobile number required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceed = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Attach seats to passengers
    const mappedPassengers = passengers.map((p, idx) => {
      const seat = selectedSeats[idx];
      return {
        ...p,
        seatAssigned: seat ? `${seat.coach} - ${seat.berthNum} (${seat.berthType})` : `Auto / Coach B3 / ${20 + idx}`
      };
    });

    updatePassengers(mappedPassengers);
    updateContactInfo(contactInfo);
    setAssignedBerths(selectedSeats);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Breadcrumb & Train Summary Header */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-orange-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to search results</span>
      </button>

      {/* Selected Journey Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="bg-orange-500 text-white font-mono text-xs font-bold px-2 py-0.5 rounded">
              #{train.number}
            </span>
            <h2 className="text-xl font-bold">{train.name}</h2>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <span>{train.from}</span>
            <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
            <span>{train.to}</span>
            <span>•</span>
            <span>Date: <strong>{searchParams.date}</strong></span>
            <span>•</span>
            <span>Dep: <strong>{train.departureTime}</strong></span>
          </div>
        </div>

        <div className="flex items-center space-x-4 bg-slate-800/80 border border-slate-700 p-3 rounded-xl">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Class Selected</span>
            <span className="text-base font-extrabold text-white">{selectedClass.name} ({selectedClass.code})</span>
          </div>
          <div className="border-l border-slate-700 pl-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Fare / Person</span>
            <span className="text-base font-extrabold text-orange-400">₹{selectedClass.fare}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Passenger Details + Seat Map + Contact */}
        <div className="lg:col-span-2 space-y-6">
          {/* Passenger Input List */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Passenger Information</h3>
                <p className="text-xs text-slate-500">Provide details as printed on government ID card</p>
              </div>
              <button
                type="button"
                onClick={handleAddPassenger}
                className="flex items-center space-x-1.5 text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-3.5 py-1.5 rounded-xl transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ Add Passenger</span>
              </button>
            </div>

            <div className="space-y-4">
              {passengers.map((p, index) => (
                <div key={p.id} className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 relative space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                    <span className="bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                      Passenger {index + 1}
                    </span>
                    {passengers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePassenger(p.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Remove Passenger"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    {/* Name */}
                    <div className="sm:col-span-5">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={p.name}
                        onChange={(e) => handlePassengerChange(p.id, 'name', e.target.value)}
                        className={`w-full bg-white border ${
                          errors[`name_${index}`] ? 'border-red-500' : 'border-slate-300'
                        } rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-orange-500`}
                      />
                      {errors[`name_${index}`] && (
                        <span className="text-[10px] text-red-500 block mt-0.5">{errors[`name_${index}`]}</span>
                      )}
                    </div>

                    {/* Age */}
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                        Age *
                      </label>
                      <input
                        type="number"
                        placeholder="Age"
                        value={p.age}
                        min="1"
                        max="115"
                        onChange={(e) => handlePassengerChange(p.id, 'age', e.target.value)}
                        className={`w-full bg-white border ${
                          errors[`age_${index}`] ? 'border-red-500' : 'border-slate-300'
                        } rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-orange-500`}
                      />
                      {errors[`age_${index}`] && (
                        <span className="text-[10px] text-red-500 block mt-0.5">{errors[`age_${index}`]}</span>
                      )}
                    </div>

                    {/* Gender */}
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                        Gender
                      </label>
                      <select
                        value={p.gender}
                        onChange={(e) => handlePassengerChange(p.id, 'gender', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-2 py-2 text-xs font-medium focus:outline-none focus:border-orange-500"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Transgender">Other</option>
                      </select>
                    </div>

                    {/* Berth Preference */}
                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                        Berth Pref.
                      </label>
                      <select
                        value={p.berthPreference}
                        onChange={(e) => handlePassengerChange(p.id, 'berthPreference', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-2 py-2 text-xs font-medium focus:outline-none focus:border-orange-500"
                      >
                        <option value="No Preference">No Preference</option>
                        <option value="Lower">Lower Berth</option>
                        <option value="Middle">Middle Berth</option>
                        <option value="Upper">Upper Berth</option>
                        <option value="Side Lower">Side Lower</option>
                        <option value="Side Upper">Side Upper</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Coach Layout */}
          <CoachLayout
            travelClass={selectedClass.code}
            passengerCount={passengers.length}
            selectedSeats={selectedSeats}
            onSelectSeat={setSelectedSeats}
          />

          {/* Contact Details */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Contact Details</h3>
              <p className="text-xs text-slate-500">Your E-ticket and PNR status alerts will be sent here</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-orange-500"
                    placeholder="name@example.com"
                  />
                </div>
                {errors.email && <span className="text-[10px] text-red-500 block mt-0.5">{errors.email}</span>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Mobile Number (10 digits) *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    maxLength={10}
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-orange-500"
                    placeholder="9876543210"
                  />
                </div>
                {errors.phone && <span className="text-[10px] text-red-500 block mt-0.5">{errors.phone}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Fare Summary & Checkout Button */}
        <div className="space-y-4">
          <FareSummary
            baseFare={selectedClass.fare}
            passengerCount={passengers.length}
            travelClass={selectedClass.code}
          />

          <button
            type="button"
            onClick={handleProceed}
            className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-orange-600/30 transition-all flex items-center justify-center space-x-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
