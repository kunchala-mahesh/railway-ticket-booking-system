import React from 'react';
import { Train, Shield, HelpCircle, Award, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="no-print bg-slate-950 text-slate-400 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                <Train className="w-5 h-5 text-slate-950" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Rail<span className="text-orange-400">Yatra</span></span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              India's premier modern train booking simulation platform. Seamless seat reservation, real-time PNR tracking, and interactive berth layouts.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-medium bg-emerald-950/40 border border-emerald-800/40 p-2 rounded-lg w-fit">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>256-Bit SSL Encrypted Mock Payments</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className="hover:text-orange-400 transition-colors">Search Trains</Link></li>
              <li><Link to="/pnr-status" className="hover:text-orange-400 transition-colors">PNR Status Enquiry</Link></li>
              <li><Link to="/my-bookings" className="hover:text-orange-400 transition-colors">My Bookings & Tickets</Link></li>
              <li><span className="hover:text-orange-400 cursor-pointer transition-colors">Tatkal Booking Guide</span></li>
              <li><span className="hover:text-orange-400 cursor-pointer transition-colors">Refund & Cancellation Rules</span></li>
            </ul>
          </div>

          {/* Popular Trains */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">Popular Trains</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center space-x-1.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span><span>Vande Bharat 2.0 (New Delhi - Varanasi)</span></li>
              <li className="flex items-center space-x-1.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span><span>Mumbai Tejas Rajdhani Express</span></li>
              <li className="flex items-center space-x-1.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span><span>Howrah Rajdhani Special</span></li>
              <li className="flex items-center space-x-1.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span><span>Bengaluru - Chennai Shatabdi</span></li>
              <li className="flex items-center space-x-1.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span><span>Pune - Goa Jan Shatabdi</span></li>
            </ul>
          </div>

          {/* Passenger Support */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">Passenger Support</h4>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-2.5">
              <div className="text-slate-300 font-medium">Customer Care / Rail Madad:</div>
              <div className="text-lg font-bold text-orange-400">139 (Toll Free)</div>
              <p className="text-slate-400 text-[11px]">Security, Medical, Catering & Feedback 24x7</p>
              <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                Mock demonstration app designed for pairing & portfolio purposes.
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} RailYatra India. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Luggage Rules</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
