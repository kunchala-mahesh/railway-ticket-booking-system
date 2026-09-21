import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Clock, AlertCircle, CheckCircle2, XCircle, Train, ShieldCheck, RefreshCw } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { TicketCard } from '../components/TicketCard';

export const PNRStatusPage = () => {
  const [urlParams] = useSearchParams();
  const { getBookingByPnr, bookings, cancelBooking } = useBooking();

  const [pnrInput, setPnrInput] = useState('');
  const [searchedBooking, setSearchedBooking] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');

  // Preload from URL if present
  useEffect(() => {
    const pnrParam = urlParams.get('pnr');
    if (pnrParam) {
      setPnrInput(pnrParam);
      handleSearchPnr(pnrParam);
    }
  }, [urlParams]);

  const handleSearchPnr = (pnrToSearch) => {
    const target = (pnrToSearch || pnrInput).trim();
    if (!target) {
      setError('Please enter a 10-digit PNR number');
      return;
    }
    if (target.length < 8) {
      setError('Invalid PNR number format. Must be a 10-digit number.');
      return;
    }

    setError('');
    const result = getBookingByPnr(target);
    setSearchedBooking(result);
    setHasSearched(true);
  };

  const handleCancelTicket = (pnr) => {
    cancelBooking(pnr);
    const updated = getBookingByPnr(pnr);
    setSearchedBooking(updated);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full border border-orange-200">
          <Clock className="w-3.5 h-3.5" />
          <span>Real-time Indian Railways PNR Inquiry</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900">Check PNR Status</h1>
        <p className="text-xs text-slate-500">
          Enter your 10-digit Passenger Name Record (PNR) number to inspect live reservation status, coach allocations, and charting state.
        </p>
      </div>

      {/* PNR Search Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 max-w-2xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchPnr();
          }}
          className="space-y-4"
        >
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              maxLength={10}
              placeholder="Enter 10-digit PNR (e.g. 2847192034)"
              value={pnrInput}
              onChange={(e) => {
                setPnrInput(e.target.value.replace(/\D/g, ''));
                setError('');
              }}
              className="w-full pl-12 pr-32 py-4 bg-slate-50 border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 rounded-2xl text-base sm:text-lg font-mono font-bold text-slate-900 tracking-wider transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              Get Status
            </button>
          </div>

          {error && <p className="text-xs text-red-600 font-medium">⚠️ {error}</p>}

          {/* Quick sample PNR pills */}
          {bookings.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium text-[11px]">Recent Bookings:</span>
              {bookings.slice(0, 3).map(b => (
                <button
                  key={b.pnr}
                  type="button"
                  onClick={() => {
                    setPnrInput(b.pnr);
                    handleSearchPnr(b.pnr);
                  }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-orange-50 hover:text-orange-600 border border-slate-200 rounded-lg font-mono text-[11px] font-semibold text-slate-700 transition-colors"
                >
                  {b.pnr} ({b.trainNumber})
                </button>
              ))}
            </div>
          )}
        </form>
      </div>

      {/* Result Section */}
      {hasSearched && (
        <div className="animate-in fade-in duration-200">
          {searchedBooking ? (
            <div className="space-y-6">
              {/* Quick Status Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-400 font-bold uppercase">Current PNR Status</span>
                    {searchedBooking.status === 'CONFIRMED' ? (
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-full">
                        CONFIRMED (CNF)
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 text-xs font-black px-2.5 py-0.5 rounded-full">
                        CANCELLED
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {searchedBooking.trainNumber} - {searchedBooking.trainName}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {searchedBooking.from} → {searchedBooking.to} • Journey Date: <strong>{searchedBooking.travelDate}</strong>
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs space-y-1">
                  <div className="text-slate-400 uppercase font-semibold text-[10px]">Charting Status</div>
                  <div className="font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg border inline-block">
                    Chart Not Prepared
                  </div>
                </div>
              </div>

              {/* Full E-Ticket slip */}
              <TicketCard booking={searchedBooking} onCancel={handleCancelTicket} />
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No Booking Found</h3>
              <p className="text-xs text-slate-500">
                The PNR <strong>{pnrInput}</strong> was not found in active records or may have expired after completion of travel.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
