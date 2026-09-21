import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftRight, Calendar, Users, Shield, Zap, RefreshCw, Compass, CheckCircle2 } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { StationAutocomplete } from '../components/StationAutocomplete';
import { TRAVEL_CLASSES, QUOTAS, POPULAR_ROUTES } from '../data/mockData';

export const HomePage = () => {
  const navigate = useNavigate();
  const { searchParams, updateSearchParams } = useBooking();

  const [from, setFrom] = useState(searchParams.from);
  const [to, setTo] = useState(searchParams.to);
  const [date, setDate] = useState(searchParams.date);
  const [travelClass, setTravelClass] = useState(searchParams.travelClass);
  const [quota, setQuota] = useState(searchParams.quota);
  const [error, setError] = useState('');

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!from || !to) {
      setError('Please select both Origin and Destination stations.');
      return;
    }
    if (from === to) {
      setError('Origin and Destination stations cannot be the same.');
      return;
    }

    setError('');
    updateSearchParams({ from, to, date, travelClass, quota });
    navigate('/search');
  };

  const handleQuickRoute = (route) => {
    setFrom(route.from);
    setTo(route.to);
    updateSearchParams({ from: route.from, to: route.to, date, travelClass, quota });
    navigate('/search');
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Search Section */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pt-10 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
            <span className="inline-flex items-center space-x-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-semibold px-3 py-1 rounded-full">
              <Zap className="w-3.5 h-3.5" />
              <span>Instant Confirmation & Real-time Live Availability</span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Book Train Tickets <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Fast & Hassle-Free</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              Check live seat availability, select interactive berths, and download confirmed e-tickets in seconds.
            </p>
          </div>

          {/* Search Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-800">
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-center space-x-2">
                <span>⚠️ {error}</span>
              </div>
            )}

            <form onSubmit={handleSearch} className="space-y-6">
              {/* Origin / Destination Grid */}
              <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center">
                {/* From Station */}
                <div className="md:col-span-5">
                  <StationAutocomplete
                    label="From Station"
                    value={from}
                    onChange={setFrom}
                    placeholder="Enter origin station or city..."
                  />
                </div>

                {/* Swap Button */}
                <div className="md:col-span-1 flex justify-center pt-5">
                  <button
                    type="button"
                    onClick={handleSwap}
                    title="Swap Stations"
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-orange-100 hover:text-orange-600 border border-slate-200 flex items-center justify-center transition-all shadow-sm hover:rotate-180"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </button>
                </div>

                {/* To Station */}
                <div className="md:col-span-5">
                  <StationAutocomplete
                    label="To Station"
                    value={to}
                    onChange={setTo}
                    placeholder="Enter destination station or city..."
                  />
                </div>
              </div>

              {/* Date, Class, Quota Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Journey Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-white border border-slate-300 hover:border-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Class */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Class
                  </label>
                  <select
                    value={travelClass}
                    onChange={(e) => setTravelClass(e.target.value)}
                    className="w-full bg-white border border-slate-300 hover:border-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 transition-all shadow-sm"
                  >
                    {TRAVEL_CLASSES.map(tc => (
                      <option key={tc.code} value={tc.code}>{tc.name}</option>
                    ))}
                  </select>
                </div>

                {/* Quota */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Quota
                  </label>
                  <select
                    value={quota}
                    onChange={(e) => setQuota(e.target.value)}
                    className="w-full bg-white border border-slate-300 hover:border-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 transition-all shadow-sm"
                  >
                    {QUOTAS.map(q => (
                      <option key={q.code} value={q.code}>{q.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-base rounded-2xl shadow-xl shadow-orange-600/30 hover:shadow-orange-600/50 transition-all flex items-center justify-center space-x-2"
                >
                  <Zap className="w-5 h-5 fill-current" />
                  <span>Search Available Trains</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
              <Compass className="w-6 h-6 text-orange-600" />
              <span>Popular Rail Routes</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Direct booking for the most traveled corridors in India
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_ROUTES.map((route, idx) => (
            <div
              key={idx}
              onClick={() => handleQuickRoute(route)}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-orange-400 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full border border-orange-200">
                    {route.tag}
                  </span>
                  <span className="text-xs text-slate-400">{route.trainsCount} Daily Trains</span>
                </div>

                <div className="flex items-center space-x-3 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {route.fromName}
                    </h3>
                    <span className="text-xs font-mono text-slate-400">{route.from}</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <span className="text-[10px] text-slate-400">{route.time}</span>
                    <div className="w-full border-t border-dashed border-slate-300 relative my-1">
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">▶</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {route.toName}
                    </h3>
                    <span className="text-xs font-mono text-slate-400">{route.to}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-orange-600 font-semibold">
                <span>Check Availability</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Book With RailYatra */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl font-bold">The Modern Railway Booking Experience</h2>
            <p className="text-xs text-slate-400 mt-1">Engineered for speed, accuracy, and clarity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 flex flex-col items-start space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold">Interactive Seat Selection</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Choose your favorite Lower Berth, Side Upper, or Window seat with our live coach visualizer before booking.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 flex flex-col items-start space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold">Instant PNR Generation</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Receive verifiable 10-digit PNRs immediately upon payment simulation with complete passenger seat allotments.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 flex flex-col items-start space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold">Hassle-Free Cancellation</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cancel confirmed tickets anytime directly via the PNR status tracker with immediate mock refund calculations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
