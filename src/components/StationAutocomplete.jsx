import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search, Check, ChevronDown } from 'lucide-react';
import { STATIONS } from '../data/mockData';

export const StationAutocomplete = ({ label, value, onChange, placeholder = 'Search station...' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapperRef = useRef(null);

  const selectedStation = STATIONS.find(s => s.code === value);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredStations = STATIONS.filter(s => {
    const search = query.toLowerCase().trim();
    if (!search) return true;
    return (
      s.name.toLowerCase().includes(search) ||
      s.code.toLowerCase().includes(search) ||
      s.city.toLowerCase().includes(search)
    );
  });

  const handleSelect = (code) => {
    onChange(code);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
        {label}
      </label>

      {/* Input trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-slate-300 hover:border-slate-400 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 rounded-xl px-3.5 py-2.5 flex items-center justify-between cursor-pointer transition-all shadow-sm"
      >
        <div className="flex items-center space-x-3 truncate">
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="truncate text-left">
            {selectedStation ? (
              <>
                <div className="font-semibold text-slate-800 text-sm flex items-center space-x-2">
                  <span>{selectedStation.name}</span>
                  <span className="text-xs bg-slate-100 text-slate-700 font-mono px-1.5 py-0.5 rounded border border-slate-200">
                    {selectedStation.code}
                  </span>
                </div>
                <div className="text-xs text-slate-500">{selectedStation.city}, {selectedStation.state}</div>
              </>
            ) : (
              <span className="text-slate-400 text-sm">{placeholder}</span>
            )}
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden max-h-80 flex flex-col animate-in fade-in zoom-in-95 duration-100">
          {/* Search bar inside dropdown */}
          <div className="p-2.5 border-b border-slate-100 bg-slate-50">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                placeholder="Type city or code (e.g. NDLS)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 text-slate-800"
              />
            </div>
          </div>

          {/* Popular pills if no search */}
          {!query && (
            <div className="p-2.5 border-b border-slate-100 bg-slate-50/50">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Popular Stations
              </span>
              <div className="flex flex-wrap gap-1.5">
                {STATIONS.filter(s => s.popular).slice(0, 6).map(s => (
                  <button
                    key={s.code}
                    type="button"
                    onClick={() => handleSelect(s.code)}
                    className="text-xs px-2 py-1 bg-white border border-slate-200 hover:border-orange-400 hover:text-orange-600 rounded-md font-medium text-slate-700 transition-colors"
                  >
                    {s.code} ({s.name})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* List items */}
          <div className="overflow-y-auto flex-1 p-1">
            {filteredStations.length > 0 ? (
              filteredStations.map(station => (
                <div
                  key={station.code}
                  onClick={() => handleSelect(station.code)}
                  className={`px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer text-xs transition-colors ${
                    station.code === value ? 'bg-orange-50 text-orange-950 font-semibold' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-medium text-slate-900 flex items-center space-x-2">
                      <span>{station.name}</span>
                      <span className="bg-slate-100 text-slate-600 px-1 rounded text-[10px] font-mono border">
                        {station.code}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">{station.city}, {station.state}</div>
                  </div>
                  {station.code === value && <Check className="w-4 h-4 text-orange-600" />}
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-slate-500">
                No stations match "{query}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
