import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, QrCode, CreditCard, Landmark, CheckCircle2, Lock, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import confetti from 'canvas-confetti';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { activeBooking, createBooking, searchParams } = useBooking();

  const [paymentMethod, setPaymentMethod] = useState('UPI'); // UPI | CARD | NETBANKING
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');

  const train = activeBooking.train;
  const selectedClass = activeBooking.selectedClass;
  const passengers = activeBooking.passengers;

  if (!train || !selectedClass) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold">Session Expired</h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 bg-orange-600 text-white rounded-xl text-xs font-bold"
        >
          Return Home
        </button>
      </div>
    );
  }

  const baseFare = selectedClass.fare;
  const passengerCount = passengers.length;
  const subTotal = baseFare * passengerCount;
  const reservationCharge = 40 * passengerCount;
  const superfastCharge = 45;
  const isAC = selectedClass.code.includes('A') || selectedClass.code === 'CC' || selectedClass.code === 'EC';
  const gst = isAC ? Math.round(subTotal * 0.05) : 0;
  const totalAmount = subTotal + reservationCharge + superfastCharge + gst;

  const handlePayNow = () => {
    setIsProcessing(true);
    setProcessingStep('Connecting to Indian Rail PG Secure Gateway...');

    setTimeout(() => {
      setProcessingStep('Authorizing payment with bank server...');
    }, 900);

    setTimeout(() => {
      setProcessingStep('Reserving berths & generating IRCTC PNR...');
    }, 1800);

    setTimeout(() => {
      // Create confirmed booking
      const newBooking = createBooking({
        trainNumber: train.number,
        trainName: train.name,
        from: train.from,
        to: train.to,
        fromName: searchParams.fromName || train.from,
        toName: searchParams.toName || train.to,
        departureTime: train.departureTime,
        arrivalTime: train.arrivalTime,
        travelDate: searchParams.date,
        travelClass: selectedClass.code,
        quota: searchParams.quota,
        totalFare: totalAmount,
        passengers: passengers.map(p => ({
          name: p.name,
          age: p.age,
          gender: p.gender,
          berthPreference: p.berthPreference,
          seatAssigned: p.seatAssigned
        })),
        contactInfo: activeBooking.contactInfo
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }

      setIsProcessing(false);
      navigate(`/confirmation/${newBooking.pnr}`);
    }, 2800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-orange-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to passenger details</span>
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <h2 className="text-xl font-black text-slate-900">Review & Payment</h2>
          <p className="text-xs text-slate-500">Secure 256-Bit mock payment gateway simulation</p>
        </div>
        <div className="flex items-center space-x-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl font-medium self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>IRCTC Verified Safe Pay</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Payment Method Selection */}
        <div className="md:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Choose Payment Method
            </h3>

            {/* Payment Tabs */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1 text-xs font-bold transition-all ${
                  paymentMethod === 'UPI'
                    ? 'bg-orange-50 border-orange-500 text-orange-700 ring-2 ring-orange-500/20'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <QrCode className="w-5 h-5 text-orange-600" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('CARD')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1 text-xs font-bold transition-all ${
                  paymentMethod === 'CARD'
                    ? 'bg-orange-50 border-orange-500 text-orange-700 ring-2 ring-orange-500/20'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-5 h-5 text-orange-600" />
                <span>Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('NETBANKING')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1 text-xs font-bold transition-all ${
                  paymentMethod === 'NETBANKING'
                    ? 'bg-orange-50 border-orange-500 text-orange-700 ring-2 ring-orange-500/20'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Landmark className="w-5 h-5 text-orange-600" />
                <span>Net Banking</span>
              </button>
            </div>

            {/* Tab Body: UPI */}
            {paymentMethod === 'UPI' && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-center">
                <div className="w-40 h-40 bg-white mx-auto p-3 rounded-2xl border-2 border-slate-300 shadow-sm flex flex-col items-center justify-center">
                  <div className="w-full h-full grid grid-cols-4 gap-1 p-1 bg-slate-900 rounded-lg">
                    <div className="bg-white rounded-sm col-span-2 row-span-2"></div>
                    <div className="bg-white rounded-sm"></div>
                    <div className="bg-white rounded-sm"></div>
                    <div className="bg-white rounded-sm col-span-2"></div>
                    <div className="bg-white rounded-sm col-span-2 row-span-2"></div>
                    <div className="bg-white rounded-sm"></div>
                  </div>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p className="font-bold text-slate-800">Scan QR with GPay, PhonePe, Paytm or BHIM</p>
                  <p className="text-[11px] text-slate-400 font-mono">UPI ID: irctc.mock@rail</p>
                </div>
              </div>
            )}

            {/* Tab Body: Card */}
            {paymentMethod === 'CARD' && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Card Number</label>
                  <input
                    type="text"
                    readOnly
                    value="4242 •••• •••• 4242"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-700 font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Expiry</label>
                    <input
                      type="text"
                      readOnly
                      value="12 / 28"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">CVV</label>
                    <input
                      type="password"
                      readOnly
                      value="•••"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-700 font-mono"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-emerald-600 font-medium">✓ Auto-filled demo sandbox card for instant testing</p>
              </div>
            )}

            {/* Tab Body: Net Banking */}
            {paymentMethod === 'NETBANKING' && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
                <label className="block text-[11px] font-bold text-slate-500 uppercase">Select Bank</label>
                <div className="grid grid-cols-2 gap-2">
                  {['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank'].map(bank => (
                    <button
                      key={bank}
                      type="button"
                      className="p-2.5 bg-white border border-slate-200 hover:border-orange-500 rounded-xl text-left font-medium text-slate-800 transition-colors"
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pay Button / Processing Status */}
            {isProcessing ? (
              <div className="p-6 bg-orange-50 border border-orange-200 rounded-2xl text-center space-y-3">
                <Loader2 className="w-8 h-8 text-orange-600 animate-spin mx-auto" />
                <div className="font-bold text-slate-900 text-sm">{processingStep}</div>
                <p className="text-[11px] text-slate-500">Please do not refresh or close this tab...</p>
              </div>
            ) : (
              <button
                type="button"
                onClick={handlePayNow}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base rounded-2xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>Simulate Pay ₹{totalAmount.toLocaleString()} & Confirm PNR</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="md:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100">
            Booking Summary
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Train</span>
              <span className="font-bold text-slate-900 text-sm">{train.number} - {train.name}</span>
            </div>

            <div className="flex justify-between">
              <div>
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Route</span>
                <span className="font-semibold text-slate-800">{train.from} → {train.to}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Class</span>
                <span className="font-semibold text-slate-800">{selectedClass.code}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 font-bold block text-[10px] uppercase mb-1">
                Passengers ({passengers.length})
              </span>
              <ul className="space-y-1">
                {passengers.map((p, idx) => (
                  <li key={idx} className="flex justify-between text-slate-700 bg-slate-50 px-2 py-1 rounded">
                    <span>{idx + 1}. {p.name || `Passenger ${idx + 1}`} ({p.age} Yrs)</span>
                    <span className="font-mono text-emerald-700 font-semibold">{p.seatAssigned?.split('(')[0] || 'Auto'}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1.5">
              <div className="flex justify-between text-slate-500">
                <span>Base Fare</span>
                <span>₹{subTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Reservation & Superfast</span>
                <span>₹{reservationCharge + superfastCharge}</span>
              </div>
              {isAC && (
                <div className="flex justify-between text-slate-500">
                  <span>GST (5%)</span>
                  <span>₹{gst}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-slate-900 text-base">
                <span>Total Amount</span>
                <span className="text-orange-600">₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
