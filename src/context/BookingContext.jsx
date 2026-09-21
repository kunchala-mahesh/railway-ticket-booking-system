import React, { createContext, useContext, useState, useEffect } from 'react';
import { STATIONS, TRAINS } from '../data/mockData';

const BookingContext = createContext();

const SAMPLE_INITIAL_BOOKINGS = [
  {
    pnr: '2847192034',
    trainNumber: '22436',
    trainName: 'Vande Bharat Express',
    from: 'NDLS',
    to: 'BSB',
    fromName: 'New Delhi',
    toName: 'Varanasi Junction',
    departureTime: '06:00',
    arrivalTime: '14:00',
    travelDate: '2026-09-25',
    travelClass: 'CC',
    quota: 'GN',
    bookingDate: '2026-09-20',
    totalFare: 3680,
    status: 'CONFIRMED',
    passengers: [
      { name: 'Amit Sharma', age: 34, gender: 'Male', berthPreference: 'Window', seatAssigned: 'C2 - 24 (Window)' },
      { name: 'Priya Sharma', age: 31, gender: 'Female', berthPreference: 'Aisle', seatAssigned: 'C2 - 25 (Aisle)' }
    ]
  },
  {
    pnr: '8392019485',
    trainNumber: '12952',
    trainName: 'Mumbai Tejas Rajdhani',
    from: 'NDLS',
    to: 'MMCT',
    fromName: 'New Delhi',
    toName: 'Mumbai Central',
    departureTime: '16:55',
    arrivalTime: '08:35',
    travelDate: '2026-09-28',
    travelClass: '3A',
    quota: 'GN',
    bookingDate: '2026-09-18',
    totalFare: 2280,
    status: 'CONFIRMED',
    passengers: [
      { name: 'Vikram Mehta', age: 48, gender: 'Male', berthPreference: 'Lower', seatAssigned: 'B3 - 12 (Lower)' }
    ]
  }
];

export const BookingProvider = ({ children }) => {
  // Search parameters
  const [searchParams, setSearchParams] = useState({
    from: 'NDLS',
    to: 'MMCT',
    date: new Date().toISOString().split('T')[0],
    travelClass: 'ALL',
    quota: 'GN'
  });

  // Active in-progress booking
  const [activeBooking, setActiveBooking] = useState({
    train: null,
    selectedClass: null,
    passengers: [
      { id: 'p-1', name: '', age: '', gender: 'Male', berthPreference: 'No Preference', foodPreference: 'Veg', seatAssigned: '' }
    ],
    contactInfo: {
      email: '',
      phone: ''
    },
    assignedBerths: []
  });

  // Stored Bookings
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('railway_bookings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load bookings from localStorage', e);
    }
    return SAMPLE_INITIAL_BOOKINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('railway_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed to save bookings to localStorage', e);
    }
  }, [bookings]);

  // Helper to generate realistic random 10 digit PNR
  const generatePNR = () => {
    const firstDigit = Math.floor(Math.random() * 8) + 2; // 2 to 9
    let rest = '';
    for (let i = 0; i < 9; i++) {
      rest += Math.floor(Math.random() * 10);
    }
    return `${firstDigit}${rest}`;
  };

  const createBooking = (bookingData) => {
    const pnr = generatePNR();
    const newBooking = {
      ...bookingData,
      pnr,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'CONFIRMED'
    };

    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (pnr) => {
    setBookings(prev =>
      prev.map(b => (b.pnr === pnr ? { ...b, status: 'CANCELLED', cancelledAt: new Date().toISOString() } : b))
    );
  };

  const getBookingByPnr = (pnr) => {
    if (!pnr) return null;
    const cleanPnr = pnr.trim().replace(/-/g, '');
    return bookings.find(b => b.pnr === cleanPnr) || null;
  };

  const updateSearchParams = (newParams) => {
    setSearchParams(prev => ({ ...prev, ...newParams }));
  };

  const setBookingTrain = (train, travelClass) => {
    setActiveBooking(prev => ({
      ...prev,
      train,
      selectedClass: travelClass,
      assignedBerths: []
    }));
  };

  const updatePassengers = (passengers) => {
    setActiveBooking(prev => ({
      ...prev,
      passengers
    }));
  };

  const updateContactInfo = (contactInfo) => {
    setActiveBooking(prev => ({
      ...prev,
      contactInfo
    }));
  };

  const setAssignedBerths = (assignedBerths) => {
    setActiveBooking(prev => ({
      ...prev,
      assignedBerths
    }));
  };

  return (
    <BookingContext.Provider
      value={{
        searchParams,
        updateSearchParams,
        activeBooking,
        setBookingTrain,
        updatePassengers,
        updateContactInfo,
        setAssignedBerths,
        bookings,
        createBooking,
        cancelBooking,
        getBookingByPnr
      }}
    >
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
