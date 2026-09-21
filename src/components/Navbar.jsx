import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Train, Search, Ticket, Clock, PhoneCall, Menu, X, ShieldCheck } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="no-print bg-slate-900 text-white sticky top-0 z-50 shadow-md border-b border-slate-800">
      {/* Top emergency & info strip */}
      <div className="bg-slate-950 px-4 py-1.5 text-xs text-slate-400 border-b border-slate-800 flex justify-between items-center">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Indian Rail Reservation Portal Mock</span>
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300">Tatkal Window opens 10:00 AM (AC) & 11:00 AM (Non-AC)</span>
          </div>
          <div className="flex items-center space-x-3">
            <a
              href="tel:139"
              className="flex items-center space-x-1 text-orange-400 hover:text-orange-300 transition-colors font-semibold"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Railway Helpline: 139</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Train className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-bold tracking-tight text-white">Rail<span className="text-orange-400">Yatra</span></span>
                <span className="bg-orange-500/20 text-orange-300 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border border-orange-500/30">Express</span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal leading-tight">Next-Gen Railway Booking</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors ${
                isActive('/') || isActive('/search')
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Book Trains</span>
            </Link>

            <Link
              to="/pnr-status"
              className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors ${
                isActive('/pnr-status')
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>PNR Status</span>
            </Link>

            <Link
              to="/my-bookings"
              className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors ${
                isActive('/my-bookings')
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>My Bookings</span>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
              isActive('/') ? 'bg-orange-600 text-white' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            Book Trains
          </Link>
          <Link
            to="/pnr-status"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
              isActive('/pnr-status') ? 'bg-orange-600 text-white' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            PNR Status Check
          </Link>
          <Link
            to="/my-bookings"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
              isActive('/my-bookings') ? 'bg-orange-600 text-white' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            My Bookings
          </Link>
        </div>
      )}
    </header>
  );
};
