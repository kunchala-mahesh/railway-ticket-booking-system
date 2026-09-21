import React from 'react';
import { Printer, Download, Train, AlertCircle, CheckCircle2, XCircle, Share2 } from 'lucide-react';

export const TicketCard = ({ booking, onCancel }) => {
  if (!booking) return null;

  const isConfirmed = booking.status === 'CONFIRMED';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-xl overflow-hidden max-w-4xl mx-auto my-6 print:m-0 print:border-none print:shadow-none">
      {/* Top action bar (hidden on print) */}
      <div className="no-print bg-slate-900 text-white px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          {isConfirmed ? (
            <span className="flex items-center space-x-1.5 text-xs font-semibold bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>BOOKING CONFIRMED</span>
            </span>
          ) : (
            <span className="flex items-center space-x-1.5 text-xs font-semibold bg-red-500/20 text-red-400 px-3 py-1 rounded-full border border-red-500/30">
              <XCircle className="w-3.5 h-3.5" />
              <span>TICKET CANCELLED</span>
            </span>
          )}
          <span className="text-xs text-slate-400 font-mono">PNR: {booking.pnr}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print E-Ticket</span>
          </button>

          {isConfirmed && onCancel && (
            <button
              onClick={() => {
                if (window.confirm(`Are you sure you want to cancel PNR ${booking.pnr}?`)) {
                  onCancel(booking.pnr);
                }
              }}
              className="flex items-center space-x-1 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 px-3 py-2 rounded-lg border border-red-800 transition-colors"
            >
              Cancel Booking
            </button>
          )}
        </div>
      </div>

      {/* Printable Railway E-Ticket Body */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Ticket Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b-2 border-slate-800 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold text-xl shadow">
              <Train className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black tracking-tight text-slate-900 uppercase">
                Indian Railways / IRCTC
              </h2>
              <p className="text-xs text-slate-500 font-medium tracking-wider uppercase">
                Electronic Reservation Slip (ERS) - Normal User
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">PNR Number</div>
            <div className="text-xl md:text-2xl font-black font-mono tracking-widest text-orange-600">
              {booking.pnr.slice(0, 3)}-{booking.pnr.slice(3, 6)}-{booking.pnr.slice(6)}
            </div>
          </div>
        </div>

        {/* Train & Journey Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-400 font-semibold block uppercase text-[10px]">Train No. & Name</span>
            <span className="font-bold text-slate-900 text-sm">{booking.trainNumber} - {booking.trainName}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block uppercase text-[10px]">Class & Quota</span>
            <span className="font-bold text-slate-900 text-sm">{booking.travelClass} | {booking.quota || 'General (GN)'}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block uppercase text-[10px]">Date of Journey</span>
            <span className="font-bold text-slate-900 text-sm">{booking.travelDate}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block uppercase text-[10px]">Booking Date</span>
            <span className="font-bold text-slate-900 text-sm">{booking.bookingDate || 'Recent'}</span>
          </div>
        </div>

        {/* Route Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-start space-x-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 mt-1.5 shrink-0 ring-4 ring-emerald-100"></div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Boarding From</span>
              <h4 className="text-base font-bold text-slate-900">{booking.fromName || booking.from} ({booking.from})</h4>
              <div className="text-sm font-semibold text-orange-600 mt-0.5">
                Departure: {booking.departureTime} hrs
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-3 h-3 rounded-full bg-orange-500 mt-1.5 shrink-0 ring-4 ring-orange-100"></div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Destination</span>
              <h4 className="text-base font-bold text-slate-900">{booking.toName || booking.to} ({booking.to})</h4>
              <div className="text-sm font-semibold text-slate-700 mt-0.5">
                Arrival: {booking.arrivalTime} hrs
              </div>
            </div>
          </div>
        </div>

        {/* Passenger Table */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Passenger Details & Seat Allotment
          </h3>
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                  <th className="py-2.5 px-4">#</th>
                  <th className="py-2.5 px-4">Passenger Name</th>
                  <th className="py-2.5 px-4">Age / Gender</th>
                  <th className="py-2.5 px-4">Preference</th>
                  <th className="py-2.5 px-4">Booking Status / Berth</th>
                  <th className="py-2.5 px-4">Current Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {booking.passengers && booking.passengers.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-2.5 px-4 font-bold text-slate-500">{idx + 1}</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900">{p.name || `Passenger ${idx + 1}`}</td>
                    <td className="py-2.5 px-4 text-slate-600">{p.age} Yrs / {p.gender}</td>
                    <td className="py-2.5 px-4 text-slate-500">{p.berthPreference || 'No Pref'}</td>
                    <td className="py-2.5 px-4 font-mono font-bold text-emerald-700">
                      {isConfirmed ? (p.seatAssigned || `CNF / Coach B2 / ${24 + idx}`) : 'CANCELLED'}
                    </td>
                    <td className="py-2.5 px-4">
                      {isConfirmed ? (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                          CONFIRMED (CNF)
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded">
                          CAN
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fare and Mock QR Code Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
          <div className="sm:col-span-2 space-y-1 text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Ticket Fare</span>
            <div className="text-2xl font-black text-slate-900">₹{booking.totalFare?.toLocaleString() || '1,450'}</div>
            <p className="text-slate-500 text-[11px]">
              Payment Mode: Online (Instant Mock Clearing) • IRCTC Transaction ID: #{booking.pnr}TXN99
            </p>
          </div>

          {/* QR Code Graphic Mock */}
          <div className="flex items-center sm:justify-end space-x-3">
            <div className="w-20 h-20 bg-slate-950 p-2 rounded-xl flex flex-col justify-between items-center text-[8px] text-white">
              <div className="w-full h-full grid grid-cols-4 gap-1 p-0.5 bg-white rounded">
                <div className="bg-slate-950 rounded-sm col-span-2 row-span-2"></div>
                <div className="bg-slate-950 rounded-sm"></div>
                <div className="bg-slate-950 rounded-sm"></div>
                <div className="bg-slate-950 rounded-sm col-span-2"></div>
                <div className="bg-slate-950 rounded-sm col-span-2 row-span-2"></div>
                <div className="bg-slate-950 rounded-sm"></div>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              <div>QR VERIFIED</div>
              <div>TC ID: 8840</div>
              <div>{booking.travelDate}</div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-900 space-y-1">
          <div className="font-bold flex items-center space-x-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>Important Passenger Guidelines</span>
          </div>
          <p>
            1. One of the passengers booked on an e-ticket must carry an original government-issued photo ID (Aadhaar Card, Voter ID, Passport, Driving License, Pan Card) during the journey.
          </p>
          <p>
            2. Fully waitlisted tickets cancelled automatically after chart preparation. Confirmed tickets can be cancelled online up to 4 hours before train departure.
          </p>
        </div>
      </div>
    </div>
  );
};
