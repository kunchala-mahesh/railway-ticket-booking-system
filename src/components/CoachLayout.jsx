import React from 'react';
import { Armchair, Check, Info } from 'lucide-react';

export const CoachLayout = ({ travelClass, passengerCount, selectedSeats = [], onSelectSeat }) => {
  const isChairCar = travelClass === 'CC' || travelClass === 'EC' || travelClass === '2S';
  const coachCode = isChairCar
    ? travelClass === 'EC' ? 'E1' : 'C2'
    : travelClass === '1A' ? 'H1' : travelClass === '2A' ? 'A2' : travelClass === 'SL' ? 'S4' : 'B3';

  // Generate 24 seats/berths representation
  // In sleeper: Cabin 1 (1-8), Cabin 2 (9-16), Cabin 3 (17-24)
  // 1: LB, 2: MB, 3: UB, 4: LB, 5: MB, 6: UB, 7: SL, 8: SU
  const sleeperBerths = [
    { num: 1, type: 'LB', name: 'Lower', occupied: false },
    { num: 2, type: 'MB', name: 'Middle', occupied: true },
    { num: 3, type: 'UB', name: 'Upper', occupied: false },
    { num: 4, type: 'LB', name: 'Lower', occupied: true },
    { num: 5, type: 'MB', name: 'Middle', occupied: false },
    { num: 6, type: 'UB', name: 'Upper', occupied: false },
    { num: 7, type: 'SL', name: 'Side Lower', occupied: false },
    { num: 8, type: 'SU', name: 'Side Upper', occupied: true },

    { num: 9, type: 'LB', name: 'Lower', occupied: false },
    { num: 10, type: 'MB', name: 'Middle', occupied: false },
    { num: 11, type: 'UB', name: 'Upper', occupied: true },
    { num: 12, type: 'LB', name: 'Lower', occupied: false },
    { num: 13, type: 'MB', name: 'Middle', occupied: false },
    { num: 14, type: 'UB', name: 'Upper', occupied: false },
    { num: 15, type: 'SL', name: 'Side Lower', occupied: false },
    { num: 16, type: 'SU', name: 'Side Upper', occupied: false },

    { num: 17, type: 'LB', name: 'Lower', occupied: true },
    { num: 18, type: 'MB', name: 'Middle', occupied: true },
    { num: 19, type: 'UB', name: 'Upper', occupied: false },
    { num: 20, type: 'LB', name: 'Lower', occupied: false },
    { num: 21, type: 'MB', name: 'Middle', occupied: false },
    { num: 22, type: 'UB', name: 'Upper', occupied: false },
    { num: 23, type: 'SL', name: 'Side Lower', occupied: true },
    { num: 24, type: 'SU', name: 'Side Upper', occupied: false }
  ];

  // Chair car seats (3 left, aisle, 2 right)
  const chairSeats = Array.from({ length: 24 }, (_, i) => {
    const num = i + 1;
    const posInRow = num % 5;
    let type = 'Window';
    if (posInRow === 2 || posInRow === 0) type = 'Aisle';
    else if (posInRow === 1) type = 'Middle';
    const occupied = [3, 4, 8, 11, 15, 19, 22].includes(num);
    return { num, type, name: type, occupied };
  });

  const seats = isChairCar ? chairSeats : sleeperBerths;

  const handleSeatClick = (seat) => {
    if (seat.occupied) return;

    const seatId = `${coachCode}-${seat.num}`;
    const isAlreadySelected = selectedSeats.some(s => s.id === seatId);

    if (isAlreadySelected) {
      onSelectSeat(selectedSeats.filter(s => s.id !== seatId));
    } else {
      if (selectedSeats.length >= passengerCount) {
        // Replace oldest or cap at passenger count
        onSelectSeat([...selectedSeats.slice(1), { id: seatId, coach: coachCode, berthNum: seat.num, berthType: seat.name }]);
      } else {
        onSelectSeat([...selectedSeats, { id: seatId, coach: coachCode, berthNum: seat.num, berthType: seat.name }]);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <span>Interactive Coach Layout</span>
            <span className="bg-orange-100 text-orange-700 text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold">
              Coach {coachCode}
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Select up to <strong className="text-slate-800">{passengerCount}</strong> seat(s) for your passengers ({selectedSeats.length}/{passengerCount} selected)
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-3 text-[11px] text-slate-600">
          <div className="flex items-center space-x-1">
            <div className="w-3.5 h-3.5 rounded bg-emerald-50 border border-emerald-400"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3.5 h-3.5 rounded bg-orange-500 text-white flex items-center justify-center text-[9px] font-bold">
              ✓
            </div>
            <span>Selected</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3.5 h-3.5 rounded bg-slate-200 border border-slate-300"></div>
            <span>Booked</span>
          </div>
        </div>
      </div>

      {/* Train Coach Container Visual */}
      <div className="mt-6 overflow-x-auto pb-4">
        <div className="min-w-[640px] bg-slate-100 p-4 rounded-2xl border-4 border-slate-300 relative shadow-inner">
          {/* Coach Doors Indicators */}
          <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-slate-400 font-bold px-4 mb-3 border-b border-dashed border-slate-300 pb-1">
            <span>⬅ Entrance / Restroom</span>
            <span className="text-slate-700 font-mono text-xs">COACH {coachCode} ({travelClass})</span>
            <span>Restroom / Next Coach ➡</span>
          </div>

          {!isChairCar ? (
            /* Sleeper / 3AC Compartments View (3 cabins shown) */
            <div className="grid grid-cols-3 gap-4">
              {[0, 1, 2].map(cabinIdx => {
                const cabinSeats = seats.slice(cabinIdx * 8, cabinIdx * 8 + 8);
                const leftBerths = cabinSeats.slice(0, 3); // LB, MB, UB
                const rightBerths = cabinSeats.slice(3, 6); // LB, MB, UB
                const sideBerths = cabinSeats.slice(6, 8); // SL, SU

                return (
                  <div key={cabinIdx} className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div className="text-[10px] font-bold text-slate-400 mb-2 uppercase text-center border-b pb-1">
                      Compartment {cabinIdx + 1}
                    </div>

                    {/* Main 6 Berths Bay */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="space-y-1.5">
                        {leftBerths.map(seat => {
                          const seatId = `${coachCode}-${seat.num}`;
                          const isSelected = selectedSeats.some(s => s.id === seatId);
                          return (
                            <button
                              key={seat.num}
                              type="button"
                              disabled={seat.occupied}
                              onClick={() => handleSeatClick(seat)}
                              className={`w-full py-1.5 px-2 rounded-lg text-xs font-medium flex items-center justify-between border transition-all ${
                                seat.occupied
                                  ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-orange-600 text-white border-orange-600 shadow-md scale-102'
                                  : 'bg-emerald-50/50 hover:bg-emerald-100 text-slate-800 border-emerald-300 hover:border-emerald-500'
                              }`}
                            >
                              <span className="font-bold">#{seat.num}</span>
                              <span className="text-[10px] uppercase opacity-80">{seat.type}</span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="space-y-1.5">
                        {rightBerths.map(seat => {
                          const seatId = `${coachCode}-${seat.num}`;
                          const isSelected = selectedSeats.some(s => s.id === seatId);
                          return (
                            <button
                              key={seat.num}
                              type="button"
                              disabled={seat.occupied}
                              onClick={() => handleSeatClick(seat)}
                              className={`w-full py-1.5 px-2 rounded-lg text-xs font-medium flex items-center justify-between border transition-all ${
                                seat.occupied
                                  ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-orange-600 text-white border-orange-600 shadow-md scale-102'
                                  : 'bg-emerald-50/50 hover:bg-emerald-100 text-slate-800 border-emerald-300 hover:border-emerald-500'
                              }`}
                            >
                              <span className="font-bold">#{seat.num}</span>
                              <span className="text-[10px] uppercase opacity-80">{seat.type}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Gangway / Aisle */}
                    <div className="my-1 border-t border-dashed border-slate-200 text-center py-0.5 text-[9px] text-slate-400 tracking-widest uppercase">
                      ┄ Aisle ┄
                    </div>

                    {/* Side Berths */}
                    <div className="space-y-1.5 mt-1">
                      {sideBerths.map(seat => {
                        const seatId = `${coachCode}-${seat.num}`;
                        const isSelected = selectedSeats.some(s => s.id === seatId);
                        return (
                          <button
                            key={seat.num}
                            type="button"
                            disabled={seat.occupied}
                            onClick={() => handleSeatClick(seat)}
                            className={`w-full py-1 px-2 rounded-lg text-xs font-medium flex items-center justify-between border transition-all ${
                              seat.occupied
                                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                                : isSelected
                                ? 'bg-orange-600 text-white border-orange-600 shadow-md scale-102'
                                : 'bg-emerald-50/50 hover:bg-emerald-100 text-slate-800 border-emerald-300 hover:border-emerald-500'
                            }`}
                          >
                            <span className="font-bold">#{seat.num}</span>
                            <span className="text-[10px] uppercase opacity-80">{seat.type}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Chair Car Layout */
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map(rowIdx => {
                const rowSeats = seats.slice(rowIdx * 6, rowIdx * 6 + 6);
                return (
                  <div key={rowIdx} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm space-y-2">
                    <div className="text-[10px] text-center font-bold text-slate-400 uppercase">Row {rowIdx + 1}</div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {rowSeats.slice(0, 3).map(seat => {
                        const seatId = `${coachCode}-${seat.num}`;
                        const isSelected = selectedSeats.some(s => s.id === seatId);
                        return (
                          <button
                            key={seat.num}
                            type="button"
                            disabled={seat.occupied}
                            onClick={() => handleSeatClick(seat)}
                            className={`p-1.5 rounded-lg text-center border transition-all ${
                              seat.occupied
                                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                                : isSelected
                                ? 'bg-orange-600 text-white border-orange-600 shadow-md'
                                : 'bg-emerald-50/50 hover:bg-emerald-100 text-slate-800 border-emerald-300'
                            }`}
                          >
                            <Armchair className="w-4 h-4 mx-auto mb-0.5 opacity-80" />
                            <div className="text-[11px] font-bold">#{seat.num}</div>
                          </button>
                        );
                      })}
                    </div>
                    <div className="border-t border-dashed border-slate-200 my-1"></div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {rowSeats.slice(3, 6).map(seat => {
                        const seatId = `${coachCode}-${seat.num}`;
                        const isSelected = selectedSeats.some(s => s.id === seatId);
                        return (
                          <button
                            key={seat.num}
                            type="button"
                            disabled={seat.occupied}
                            onClick={() => handleSeatClick(seat)}
                            className={`p-1.5 rounded-lg text-center border transition-all ${
                              seat.occupied
                                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                                : isSelected
                                ? 'bg-orange-600 text-white border-orange-600 shadow-md'
                                : 'bg-emerald-50/50 hover:bg-emerald-100 text-slate-800 border-emerald-300'
                            }`}
                          >
                            <Armchair className="w-4 h-4 mx-auto mb-0.5 opacity-80" />
                            <div className="text-[11px] font-bold">#{seat.num}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center space-x-2 text-xs text-slate-600">
        <Info className="w-4 h-4 text-orange-600 shrink-0" />
        <span>
          <strong>Note:</strong> Berth allocation is subject to Indian Railways passenger quota logic. If unselected, optimal berths are automatically assigned based on passenger age & preferences.
        </span>
      </div>
    </div>
  );
};
