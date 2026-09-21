import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, ArrowRight, Clock, Train, Utensils, Zap, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { findTrains, STATIONS, TRAVEL_CLASSES } from '../data/mockData';

export const SearchResultsPage = () => {
  const navigate = useNavigate();
  const { searchParams, updateSearchParams, setBookingTrain } = useBooking();

  const [selectedTrainType, setSelectedTrainType] = useState('ALL');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('ALL');
  const [sortBy, setSortBy] = useState('DEPARTURE'); // DEPARTURE | DURATION | PRICE

  const fromStation = STATIONS.find(s => s.code === searchParams.from) || { name: searchParams.from, code: searchParams.from };
  const toStation = STATIONS.find(s => s.code === searchParams.to) || { name: searchParams.to, code: searchParams.to };

  const rawTrains = useMemo(() => {
    return findTrains(searchParams.from, searchParams.to);
  }, [searchParams.from, searchParams.to]);

  // Filter & Sort
  const filteredTrains = useMemo(() => {
    return rawTrains
      .filter(train => {
        // Filter by Train Type
        if (selectedTrainType !== 'ALL' && train.type !== selectedTrainType) {
          return false;
        }

        // Filter by Class if not ALL
        if (searchParams.travelClass !== 'ALL') {
          const hasClass = train.classes.some(c => c.code === searchParams.travelClass);
          if (!hasClass) return false;
        }

        // Filter by Departure Time Slot
        if (selectedTimeSlot !== 'ALL') {
          const hour = parseInt(train.departureTime.split(':')[0], 10);
          if (selectedTimeSlot === 'EARLY' && (hour < 0 || hour >= 6)) return false;
          if (selectedTimeSlot === 'MORNING' && (hour < 6 || hour >= 12)) return false;
          if (selectedTimeSlot === 'AFTERNOON' && (hour < 12 || hour >= 18)) return false;
          if (selectedTimeSlot === 'NIGHT' && hour < 18) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'DEPARTURE') {
          return a.departureTime.localeCompare(b.departureTime);
        }
        if (sortBy === 'DURATION') {
          return a.duration.localeCompare(b.duration);
        }
        if (sortBy === 'PRICE') {
          const minFareA = Math.min(...a.classes.map(c => c.fare));
          const minFareB = Math.min(...b.classes.map(c => c.fare));
          return minFareA - minFareB;
        }
        return 0;
      });
  }, [rawTrains, selectedTrainType, selectedTimeSlot, sortBy, searchParams.travelClass]);

  const handleBookClass = (train, travelClass) => {
    setBookingTrain(train, travelClass);
    navigate(`/book/${train.id}?class=${travelClass.code}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Route header strip */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3 text-lg sm:text-2xl font-black text-slate-900">
            <span>{fromStation.name}</span>
            <span className="text-slate-400 font-mono text-sm">({fromStation.code})</span>
            <ArrowRight className="w-5 h-5 text-orange-500 shrink-0" />
            <span>{toStation.name}</span>
            <span className="text-slate-400 font-mono text-sm">({toStation.code})</span>
          </div>
          <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
            <span>Date: <strong className="text-slate-800">{searchParams.date}</strong></span>
            <span>•</span>
            <span>Quota: <strong className="text-slate-800">{searchParams.quota}</strong></span>
            <span>•</span>
            <span>Class: <strong className="text-slate-800">{searchParams.travelClass}</strong></span>
            <span>•</span>
            <span className="text-orange-600 font-bold">{filteredTrains.length} Trains Found</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-4 py-2 rounded-xl transition-colors self-start md:self-auto"
        >
          Modify Search
        </button>
      </div>

      {/* Main Content: Sidebar Filters + Train Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Filter Sidebar */}
        <aside className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Filter className="w-4 h-4 text-orange-600" />
              <span>Filter Trains</span>
            </h3>
            <button
              onClick={() => {
                setSelectedTrainType('ALL');
                setSelectedTimeSlot('ALL');
                setSortBy('DEPARTURE');
              }}
              className="text-[11px] text-orange-600 hover:underline font-semibold"
            >
              Reset
            </button>
          </div>

          {/* Sort Option */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-orange-500"
            >
              <option value="DEPARTURE">Departure: Early First</option>
              <option value="DURATION">Duration: Fastest First</option>
              <option value="PRICE">Price: Lowest First</option>
            </select>
          </div>

          {/* Departure Time Slots */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Departure Time
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'ALL', label: 'All Times' },
                { id: 'EARLY', label: '00:00 - 06:00' },
                { id: 'MORNING', label: '06:00 - 12:00' },
                { id: 'AFTERNOON', label: '12:00 - 18:00' },
                { id: 'NIGHT', label: '18:00 - 24:00' }
              ].map(slot => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSelectedTimeSlot(slot.id)}
                  className={`p-2 rounded-xl text-center border text-[11px] font-medium transition-all ${
                    selectedTimeSlot === slot.id
                      ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>

          {/* Train Types */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Train Type
            </label>
            <div className="space-y-1.5 text-xs">
              {['ALL', 'Vande Bharat', 'Rajdhani', 'Shatabdi', 'Superfast', 'Duronto'].map(type => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer text-slate-700 hover:text-slate-900">
                  <input
                    type="radio"
                    name="trainType"
                    checked={selectedTrainType === type}
                    onChange={() => setSelectedTrainType(type)}
                    className="text-orange-600 focus:ring-orange-500"
                  />
                  <span>{type === 'ALL' ? 'All Train Types' : type}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Train Listings */}
        <main className="lg:col-span-3 space-y-4">
          {filteredTrains.length > 0 ? (
            filteredTrains.map(train => (
              <div
                key={train.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm p-6 space-y-4 transition-all"
              >
                {/* Train Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-bold text-slate-900">{train.name}</h3>
                      <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                        #{train.number}
                      </span>
                      {train.type === 'Vande Bharat' && (
                        <span className="bg-orange-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          High Speed
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
                      <span>Runs on: <strong className="text-slate-700">{train.runsOn.join(', ')}</strong></span>
                      {train.pantryAvailable && (
                        <>
                          <span>•</span>
                          <span className="flex items-center space-x-1 text-emerald-700 font-medium">
                            <Utensils className="w-3 h-3" />
                            <span>Pantry / Food Available</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Train Schedule Timeline */}
                <div className="grid grid-cols-3 sm:grid-cols-5 items-center text-center sm:text-left gap-2 py-2 bg-slate-50 p-4 rounded-xl">
                  {/* Origin */}
                  <div>
                    <div className="text-lg font-black text-slate-900">{train.departureTime}</div>
                    <div className="text-xs font-bold text-slate-700">{fromStation.name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{train.from}</div>
                  </div>

                  {/* Middle Duration */}
                  <div className="col-span-1 sm:col-span-3 flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-600 mb-1 flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{train.duration}</span>
                    </span>
                    <div className="w-full flex items-center space-x-2 px-2">
                      <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                      <div className="flex-1 border-t-2 border-dashed border-slate-300"></div>
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1">{train.avgSpeed || '80 km/h'}</span>
                  </div>

                  {/* Destination */}
                  <div className="text-right">
                    <div className="text-lg font-black text-slate-900">{train.arrivalTime}</div>
                    <div className="text-xs font-bold text-slate-700">{toStation.name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{train.to}</div>
                  </div>
                </div>

                {/* Available Classes Grid */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Select Class & Check Availability
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {train.classes.map(c => {
                      const isAvail = c.status === 'AVAILABLE';
                      const isRAC = c.status === 'RAC';

                      return (
                        <div
                          key={c.code}
                          className="bg-white border-2 border-slate-200 hover:border-orange-500 rounded-xl p-3 flex flex-col justify-between transition-all hover:shadow-md group"
                        >
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-extrabold text-slate-900">{c.code}</span>
                              <span className="text-sm font-black text-orange-600">₹{c.fare}</span>
                            </div>
                            <div className="text-[11px] text-slate-400 line-clamp-1">{c.name}</div>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-100 flex flex-col space-y-2">
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  isAvail
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : isRAC
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {isAvail ? `AVL: ${c.seats}` : isRAC ? `RAC: ${c.seats}` : `WL: ${c.seats}`}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleBookClass(train, c)}
                              className="w-full py-1.5 px-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center space-x-1 shadow-sm"
                            >
                              <span>Book Now</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto">
                <Train className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No trains found for this selection</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try modifying your filters or selecting "All Classes" to view other available connections.
              </p>
              <button
                onClick={() => {
                  setSelectedTrainType('ALL');
                  setSelectedTimeSlot('ALL');
                  updateSearchParams({ travelClass: 'ALL' });
                }}
                className="text-xs font-bold text-orange-600 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
