import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, ArrowRight, Train, CheckCircle2, XCircle, Search, Calendar, ChevronRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const MyBookingsPage = () => {
  const { bookings, cancelBooking } = useBooking();
  const [filter, setFilter] = useState('ALL'); // ALL | CONFIRMED | CANCELLED

  const filteredBookings = bookings.filter(b => {
    if (filter === 'CONFIRMED') return b.status === 'CONFIRMED';
    if (filter === 'CANCELLED') return b.status === 'CANCELLED';
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">My Bookings & E-Tickets</h1>
          <p className="text-xs text-slate-500">Manage your reservations, download tickets, or check PNR status</p>
        </div>

        <Link
          to="/"
          className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold transition-colors shadow-sm self-start sm:self-auto flex items-center space-x-1.5"
        >
          <span>+ Book New Ticket</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 text-xs">
        {[
          { id: 'ALL', label: `All Trips (${bookings.length})` },
          { id: 'CONFIRMED', label: `Confirmed (${bookings.filter(b => b.status === 'CONFIRMED').length})` },
          { id: 'CANCELLED', label: `Cancelled (${bookings.filter(b => b.status === 'CANCELLED').length})` }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              filter === tab.id
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map(b => {
            const isConfirmed = b.status === 'CONFIRMED';
            return (
              <div
                key={b.pnr}
                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-6 shadow-sm space-y-4 transition-all"
              >
                {/* Top Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                      <Train className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base font-bold text-slate-900">{b.trainName}</h3>
                        <span className="text-xs font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
                          #{b.trainNumber}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">
                        Class: <strong>{b.travelClass}</strong> • Quota: <strong>{b.quota || 'GN'}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-left sm:text-right">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">PNR Number</div>
                      <div className="font-mono font-bold text-sm text-slate-800">{b.pnr}</div>
                    </div>
                    {isConfirmed ? (
                      <span className="flex items-center space-x-1 text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>CONFIRMED</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 text-[11px] font-bold bg-red-100 text-red-800 px-2.5 py-1 rounded-full">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>CANCELLED</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Schedule details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl text-xs">
                  <div>
                    <span className="text-slate-400 uppercase font-semibold text-[10px] block">Departure</span>
                    <div className="font-bold text-slate-900 text-sm">{b.departureTime} hrs</div>
                    <div className="text-slate-600">{b.fromName || b.from} ({b.from})</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{b.travelDate}</div>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-orange-500" />
                    <span className="text-[11px] text-slate-400 mt-1">Confirmed Direct Run</span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-slate-400 uppercase font-semibold text-[10px] block">Arrival</span>
                    <div className="font-bold text-slate-900 text-sm">{b.arrivalTime} hrs</div>
                    <div className="text-slate-600">{b.toName || b.to} ({b.to})</div>
                  </div>
                </div>

                {/* Passengers summary & Action buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 gap-4 text-xs">
                  <div className="text-slate-600">
                    <span>Passengers: <strong>{b.passengers ? b.passengers.length : 1}</strong></span>
                    <span className="mx-2">•</span>
                    <span>Total Fare: <strong className="text-slate-900 font-bold">₹{b.totalFare?.toLocaleString() || '1,450'}</strong></span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/confirmation/${b.pnr}`}
                      className="px-3.5 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold transition-colors shadow-sm"
                    >
                      View / Print E-Ticket
                    </Link>

                    <Link
                      to={`/pnr-status?pnr=${b.pnr}`}
                      className="px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
                    >
                      PNR Status
                    </Link>

                    {isConfirmed && (
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Cancel reservation for PNR ${b.pnr}?`)) {
                            cancelBooking(b.pnr);
                          }
                        }}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 border border-red-200 rounded-xl font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto">
            <Ticket className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Bookings in this Category</h3>
          <p className="text-xs text-slate-500">
            You don't have any matching tickets right now. Book your next journey with our seamless seat selector!
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-2.5 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-500 transition-colors"
          >
            Start Train Search
          </Link>
        </div>
      )}
    </div>
  );
};
