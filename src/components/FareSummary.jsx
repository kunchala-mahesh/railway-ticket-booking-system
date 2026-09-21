import React from 'react';
import { Receipt, ShieldCheck, Tag } from 'lucide-react';

export const FareSummary = ({ baseFare = 0, passengerCount = 1, travelClass = '3A' }) => {
  const isAC = travelClass.includes('A') || travelClass === 'CC' || travelClass === 'EC';
  const subTotal = baseFare * passengerCount;
  const reservationCharge = 40 * passengerCount;
  const superfastCharge = 45;
  const gst = isAC ? Math.round(subTotal * 0.05) : 0;
  const totalAmount = subTotal + reservationCharge + superfastCharge + gst;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24">
      <div className="flex items-center space-x-2 pb-4 border-b border-slate-100">
        <Receipt className="w-5 h-5 text-orange-600" />
        <h3 className="font-bold text-slate-900 text-base">Fare Summary</h3>
      </div>

      <div className="py-4 space-y-3 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Base Fare (₹{baseFare.toLocaleString()} × {passengerCount})</span>
          <span className="font-medium text-slate-800">₹{subTotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Reservation Fee</span>
          <span className="font-medium text-slate-800">₹{reservationCharge}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Superfast Surcharge</span>
          <span className="font-medium text-slate-800">₹{superfastCharge}</span>
        </div>

        {isAC && (
          <div className="flex justify-between text-slate-600">
            <span>GST (5% AC Service Tax)</span>
            <span className="font-medium text-slate-800">₹{gst}</span>
          </div>
        )}

        <div className="pt-3 border-t border-dashed border-slate-200 flex justify-between items-baseline">
          <div>
            <span className="text-base font-bold text-slate-900">Total Payable</span>
            <div className="text-[11px] text-emerald-600 font-medium">All taxes & fees included</div>
          </div>
          <span className="text-2xl font-extrabold text-orange-600">
            ₹{totalAmount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-2xl space-y-2">
        <div className="flex items-center space-x-2 text-xs text-slate-600 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>No hidden convenience fees on mock UPI</span>
        </div>
        <div className="flex items-center space-x-2 text-[11px] text-slate-500">
          <Tag className="w-3.5 h-3.5 text-orange-500 shrink-0" />
          <span>Full refund on confirmed cancellation up to 48 hrs</span>
        </div>
      </div>
    </div>
  );
};
