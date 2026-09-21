import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Ticket, Search, ArrowRight, Printer, Sparkles } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { TicketCard } from '../components/TicketCard';

export const ConfirmationPage = () => {
  const { pnr } = useParams();
  const navigate = useNavigate();
  const { getBookingByPnr, cancelBooking } = useBooking();

  const booking = getBookingByPnr(pnr);

  if (!booking) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold">Booking Not Found</h2>
        <p className="text-xs text-slate-500">We couldn't locate any ticket with PNR: {pnr}</p>
        <Link
          to="/"
          className="inline-block px-6 py-2.5 bg-orange-600 text-white rounded-xl text-xs font-bold"
        >
          Book a Ticket
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Success Notification Banner */}
      <div className="no-print bg-emerald-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-700/80 px-2.5 py-0.5 rounded-full">
                Payment Success
              </span>
              <span className="text-xs text-emerald-100 font-medium">IRCTC E-Ticket Generated</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mt-1">Ticket Confirmed!</h1>
            <p className="text-xs text-emerald-100 mt-0.5">
              An SMS and E-mail copy have been dispatched with your reservation details.
            </p>
          </div>
        </div>

        {/* PNR Box */}
        <div className="bg-slate-950/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center shrink-0">
          <div className="text-[10px] uppercase font-bold text-emerald-200 tracking-widest">Your PNR Number</div>
          <div className="text-2xl font-black font-mono tracking-widest text-white mt-0.5">
            {booking.pnr}
          </div>
        </div>
      </div>

      {/* Action shortcuts */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3 text-xs">
        <Link
          to={`/pnr-status?pnr=${booking.pnr}`}
          className="flex items-center space-x-1.5 text-slate-700 hover:text-orange-600 bg-white border border-slate-200 px-4 py-2 rounded-xl font-medium transition-colors shadow-sm"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Track Live PNR Status</span>
        </Link>

        <div className="flex items-center space-x-2">
          <Link
            to="/my-bookings"
            className="flex items-center space-x-1.5 text-slate-700 hover:text-orange-600 bg-white border border-slate-200 px-4 py-2 rounded-xl font-medium transition-colors shadow-sm"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>My Bookings History</span>
          </Link>

          <Link
            to="/"
            className="flex items-center space-x-1.5 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-xl font-bold transition-colors shadow-sm"
          >
            <span>Book Another Trip</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Render the E-Ticket */}
      <TicketCard booking={booking} onCancel={cancelBooking} />
    </div>
  );
};
