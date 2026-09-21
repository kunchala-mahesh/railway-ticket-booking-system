export const STATIONS = [
  { code: 'NDLS', name: 'New Delhi', city: 'New Delhi', state: 'Delhi', popular: true },
  { code: 'MMCT', name: 'Mumbai Central', city: 'Mumbai', state: 'Maharashtra', popular: true },
  { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata', state: 'West Bengal', popular: true },
  { code: 'MAS', name: 'Chennai Central', city: 'Chennai', state: 'Tamil Nadu', popular: true },
  { code: 'SBC', name: 'KSR Bengaluru', city: 'Bengaluru', state: 'Karnataka', popular: true },
  { code: 'PUNE', name: 'Pune Junction', city: 'Pune', state: 'Maharashtra', popular: true },
  { code: 'ADI', name: 'Ahmedabad Junction', city: 'Ahmedabad', state: 'Gujarat', popular: true },
  { code: 'BSB', name: 'Varanasi Junction', city: 'Varanasi', state: 'Uttar Pradesh', popular: true },
  { code: 'CNB', name: 'Kanpur Central', city: 'Kanpur', state: 'Uttar Pradesh', popular: false },
  { code: 'LKO', name: 'Lucknow Charbagh', city: 'Lucknow', state: 'Uttar Pradesh', popular: true },
  { code: 'JP', name: 'Jaipur Junction', city: 'Jaipur', state: 'Rajasthan', popular: true },
  { code: 'HYB', name: 'Hyderabad Deccan', city: 'Hyderabad', state: 'Telangana', popular: true },
  { code: 'GHY', name: 'Guwahati', city: 'Guwahati', state: 'Assam', popular: false },
  { code: 'PNBE', name: 'Patna Junction', city: 'Patna', state: 'Bihar', popular: true },
  { code: 'BPL', name: 'Bhopal Junction', city: 'Bhopal', state: 'Madhya Pradesh', popular: false },
  { code: 'JAT', name: 'Jammu Tawi', city: 'Jammu', state: 'Jammu & Kashmir', popular: false },
  { code: 'GOA', name: 'Madgaon Junction', city: 'Goa', state: 'Goa', popular: true },
  { code: 'BBS', name: 'Bhubaneswar', city: 'Bhubaneswar', state: 'Odisha', popular: false },
  { code: 'ASR', name: 'Amritsar Junction', city: 'Amritsar', state: 'Punjab', popular: false },
  { code: 'CBE', name: 'Coimbatore Main', city: 'Coimbatore', state: 'Tamil Nadu', popular: false }
];

export const TRAVEL_CLASSES = [
  { code: 'ALL', name: 'All Classes' },
  { code: '1A', name: 'AC First Class (1A)', type: 'sleeper' },
  { code: '2A', name: 'AC 2 Tier (2A)', type: 'sleeper' },
  { code: '3A', name: 'AC 3 Tier (3A)', type: 'sleeper' },
  { code: '3E', name: 'AC 3 Economy (3E)', type: 'sleeper' },
  { code: 'SL', name: 'Sleeper (SL)', type: 'sleeper' },
  { code: 'EC', name: 'Exec. Chair Car (EC)', type: 'chair' },
  { code: 'CC', name: 'AC Chair Car (CC)', type: 'chair' },
  { code: '2S', name: 'Second Sitting (2S)', type: 'chair' }
];

export const QUOTAS = [
  { code: 'GN', name: 'General Quota' },
  { code: 'TQ', name: 'Tatkal Quota' },
  { code: 'LD', name: 'Ladies Quota' },
  { code: 'SS', name: 'Senior Citizen / Lower Berth' }
];

export const POPULAR_ROUTES = [
  { from: 'NDLS', to: 'MMCT', fromName: 'New Delhi', toName: 'Mumbai Central', time: '15h 32m', trainsCount: 14, tag: 'Most Popular' },
  { from: 'NDLS', to: 'BSB', fromName: 'New Delhi', toName: 'Varanasi', time: '08h 00m', trainsCount: 8, tag: 'Vande Bharat' },
  { from: 'SBC', to: 'MAS', fromName: 'Bengaluru', toName: 'Chennai Central', time: '04h 25m', trainsCount: 18, tag: 'Express Corridor' },
  { from: 'MMCT', to: 'ADI', fromName: 'Mumbai Central', toName: 'Ahmedabad', time: '05h 25m', trainsCount: 22, tag: 'High Speed' },
  { from: 'HWH', to: 'NDLS', fromName: 'Howrah', toName: 'New Delhi', time: '17h 05m', trainsCount: 10, tag: 'Rajdhani Route' },
  { from: 'PUNE', to: 'GOA', fromName: 'Pune', toName: 'Madgaon (Goa)', time: '09h 45m', trainsCount: 6, tag: 'Scenic Travel' }
];

export const TRAINS = [
  {
    id: 'tr-22436',
    number: '22436',
    name: 'Vande Bharat Express',
    type: 'Vande Bharat',
    from: 'NDLS',
    to: 'BSB',
    departureTime: '06:00',
    arrivalTime: '14:00',
    duration: '08h 00m',
    runsOn: ['Mon', 'Tue', 'Wed', 'Fri', 'Sat', 'Sun'],
    pantryAvailable: true,
    avgSpeed: '95 km/h',
    classes: [
      { code: 'CC', name: 'AC Chair Car', fare: 1750, status: 'AVAILABLE', seats: 54 },
      { code: 'EC', name: 'Exec Chair Car', fare: 3300, status: 'AVAILABLE', seats: 12 }
    ]
  },
  {
    id: 'tr-12952',
    number: '12952',
    name: 'Mumbai Tejas Rajdhani',
    type: 'Rajdhani',
    from: 'NDLS',
    to: 'MMCT',
    departureTime: '16:55',
    arrivalTime: '08:35',
    duration: '15h 40m',
    runsOn: ['Daily'],
    pantryAvailable: true,
    avgSpeed: '89 km/h',
    classes: [
      { code: '1A', name: 'AC First Class', fare: 4920, status: 'AVAILABLE', seats: 4 },
      { code: '2A', name: 'AC 2 Tier', fare: 2980, status: 'AVAILABLE', seats: 28 },
      { code: '3A', name: 'AC 3 Tier', fare: 2150, status: 'RAC', seats: 8 }
    ]
  },
  {
    id: 'tr-12954',
    number: '12954',
    name: 'August Kranti Tejas Rajdhani',
    type: 'Rajdhani',
    from: 'NDLS',
    to: 'MMCT',
    departureTime: '17:15',
    arrivalTime: '10:05',
    duration: '16h 50m',
    runsOn: ['Daily'],
    pantryAvailable: true,
    avgSpeed: '84 km/h',
    classes: [
      { code: '1A', name: 'AC First Class', fare: 4780, status: 'RAC', seats: 2 },
      { code: '2A', name: 'AC 2 Tier', fare: 2860, status: 'AVAILABLE', seats: 16 },
      { code: '3A', name: 'AC 3 Tier', fare: 2040, status: 'AVAILABLE', seats: 42 },
      { code: '3E', name: 'AC 3 Economy', fare: 1890, status: 'AVAILABLE', seats: 68 }
    ]
  },
  {
    id: 'tr-12908',
    number: '12908',
    name: 'Maharashtra Sampark Kranti',
    type: 'Superfast',
    from: 'NDLS',
    to: 'MMCT',
    departureTime: '07:15',
    arrivalTime: '02:40',
    duration: '19h 25m',
    runsOn: ['Mon', 'Thu'],
    pantryAvailable: true,
    avgSpeed: '75 km/h',
    classes: [
      { code: '2A', name: 'AC 2 Tier', fare: 2240, status: 'AVAILABLE', seats: 14 },
      { code: '3A', name: 'AC 3 Tier', fare: 1560, status: 'AVAILABLE', seats: 52 },
      { code: 'SL', name: 'Sleeper', fare: 590, status: 'AVAILABLE', seats: 110 },
      { code: '2S', name: 'Second Sitting', fare: 360, status: 'AVAILABLE', seats: 40 }
    ]
  },
  {
    id: 'tr-12302',
    number: '12302',
    name: 'Howrah Rajdhani Express',
    type: 'Rajdhani',
    from: 'NDLS',
    to: 'HWH',
    departureTime: '16:50',
    arrivalTime: '09:55',
    duration: '17h 05m',
    runsOn: ['Daily'],
    pantryAvailable: true,
    avgSpeed: '86 km/h',
    classes: [
      { code: '1A', name: 'AC First Class', fare: 4850, status: 'AVAILABLE', seats: 6 },
      { code: '2A', name: 'AC 2 Tier', fare: 2940, status: 'AVAILABLE', seats: 19 },
      { code: '3A', name: 'AC 3 Tier', fare: 2110, status: 'AVAILABLE', seats: 48 }
    ]
  },
  {
    id: 'tr-12008',
    number: '12008',
    name: 'Shatabdi Express',
    type: 'Shatabdi',
    from: 'SBC',
    to: 'MAS',
    departureTime: '06:00',
    arrivalTime: '11:00',
    duration: '05h 00m',
    runsOn: ['Mon', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    pantryAvailable: true,
    avgSpeed: '72 km/h',
    classes: [
      { code: 'CC', name: 'AC Chair Car', fare: 980, status: 'AVAILABLE', seats: 74 },
      { code: 'EC', name: 'Exec Chair Car', fare: 1940, status: 'AVAILABLE', seats: 18 }
    ]
  },
  {
    id: 'tr-20608',
    number: '20608',
    name: 'Vande Bharat Express',
    type: 'Vande Bharat',
    from: 'SBC',
    to: 'MAS',
    departureTime: '14:45',
    arrivalTime: '19:15',
    duration: '04h 30m',
    runsOn: ['Mon', 'Tue', 'Thu', 'Fri', 'Sat', 'Sun'],
    pantryAvailable: true,
    avgSpeed: '80 km/h',
    classes: [
      { code: 'CC', name: 'AC Chair Car', fare: 1040, status: 'AVAILABLE', seats: 88 },
      { code: 'EC', name: 'Exec Chair Car', fare: 2110, status: 'AVAILABLE', seats: 24 }
    ]
  },
  {
    id: 'tr-12009',
    number: '12009',
    name: 'Mumbai - Ahmedabad Shatabdi',
    type: 'Shatabdi',
    from: 'MMCT',
    to: 'ADI',
    departureTime: '06:20',
    arrivalTime: '12:45',
    duration: '06h 25m',
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    pantryAvailable: true,
    avgSpeed: '78 km/h',
    classes: [
      { code: 'CC', name: 'AC Chair Car', fare: 1110, status: 'AVAILABLE', seats: 62 },
      { code: 'EC', name: 'Exec Chair Car', fare: 2220, status: 'AVAILABLE', seats: 15 }
    ]
  },
  {
    id: 'tr-20901',
    number: '20901',
    name: 'Vande Bharat Express',
    type: 'Vande Bharat',
    from: 'MMCT',
    to: 'ADI',
    departureTime: '06:00',
    arrivalTime: '11:25',
    duration: '05h 25m',
    runsOn: ['Mon', 'Tue', 'Wed', 'Fri', 'Sat', 'Sun'],
    pantryAvailable: true,
    avgSpeed: '91 km/h',
    classes: [
      { code: 'CC', name: 'AC Chair Car', fare: 1380, status: 'AVAILABLE', seats: 45 },
      { code: 'EC', name: 'Exec Chair Car', fare: 2650, status: 'AVAILABLE', seats: 8 }
    ]
  },
  {
    id: 'tr-12129',
    number: '12129',
    name: 'Azad Hind Express',
    type: 'Superfast',
    from: 'PUNE',
    to: 'HWH',
    departureTime: '18:35',
    arrivalTime: '03:55',
    duration: '33h 20m',
    runsOn: ['Daily'],
    pantryAvailable: true,
    avgSpeed: '63 km/h',
    classes: [
      { code: '2A', name: 'AC 2 Tier', fare: 2790, status: 'AVAILABLE', seats: 12 },
      { code: '3A', name: 'AC 3 Tier', fare: 1940, status: 'AVAILABLE', seats: 36 },
      { code: 'SL', name: 'Sleeper', fare: 735, status: 'RAC', seats: 14 }
    ]
  },
  {
    id: 'tr-12424',
    number: '12424',
    name: 'Dibrugarh Rajdhani Express',
    type: 'Rajdhani',
    from: 'NDLS',
    to: 'GHY',
    departureTime: '16:20',
    arrivalTime: '19:40',
    duration: '27h 20m',
    runsOn: ['Daily'],
    pantryAvailable: true,
    avgSpeed: '72 km/h',
    classes: [
      { code: '1A', name: 'AC First Class', fare: 5690, status: 'AVAILABLE', seats: 2 },
      { code: '2A', name: 'AC 2 Tier', fare: 3480, status: 'AVAILABLE', seats: 10 },
      { code: '3A', name: 'AC 3 Tier', fare: 2470, status: 'WL', seats: 25 }
    ]
  },
  {
    id: 'tr-12051',
    number: '12051',
    name: 'Jan Shatabdi Express',
    type: 'Jan Shatabdi',
    from: 'PUNE',
    to: 'GOA',
    departureTime: '05:25',
    arrivalTime: '14:10',
    duration: '08h 45m',
    runsOn: ['Daily'],
    pantryAvailable: true,
    avgSpeed: '65 km/h',
    classes: [
      { code: 'CC', name: 'AC Chair Car', fare: 910, status: 'AVAILABLE', seats: 40 },
      { code: '2S', name: 'Second Sitting', fare: 295, status: 'AVAILABLE', seats: 120 }
    ]
  }
];

// Helper to generate dynamic matching trains even if not strictly in base mock
export const findTrains = (fromCode, toCode) => {
  const direct = TRAINS.filter(t => t.from === fromCode && t.to === toCode);
  if (direct.length > 0) return direct;

  // Fallback realistic generator for any station pair so users can search anything
  const fromStation = STATIONS.find(s => s.code === fromCode) || { name: fromCode, code: fromCode };
  const toStation = STATIONS.find(s => s.code === toCode) || { name: toCode, code: toCode };

  return [
    {
      id: `tr-gen-${fromCode}-${toCode}-1`,
      number: '12845',
      name: `${fromStation.name} - ${toStation.name} Superfast Express`,
      type: 'Superfast',
      from: fromCode,
      to: toCode,
      departureTime: '07:30',
      arrivalTime: '21:15',
      duration: '13h 45m',
      runsOn: ['Daily'],
      pantryAvailable: true,
      avgSpeed: '76 km/h',
      classes: [
        { code: '2A', name: 'AC 2 Tier', fare: 2350, status: 'AVAILABLE', seats: 18 },
        { code: '3A', name: 'AC 3 Tier', fare: 1640, status: 'AVAILABLE', seats: 46 },
        { code: 'SL', name: 'Sleeper', fare: 620, status: 'AVAILABLE', seats: 84 }
      ]
    },
    {
      id: `tr-gen-${fromCode}-${toCode}-2`,
      number: '20812',
      name: `${fromStation.name} - ${toStation.name} Vande Bharat`,
      type: 'Vande Bharat',
      from: fromCode,
      to: toCode,
      departureTime: '14:20',
      arrivalTime: '22:10',
      duration: '07h 50m',
      runsOn: ['Mon', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      pantryAvailable: true,
      avgSpeed: '92 km/h',
      classes: [
        { code: 'CC', name: 'AC Chair Car', fare: 1580, status: 'AVAILABLE', seats: 62 },
        { code: 'EC', name: 'Exec Chair Car', fare: 2890, status: 'AVAILABLE', seats: 14 }
      ]
    },
    {
      id: `tr-gen-${fromCode}-${toCode}-3`,
      number: '12290',
      name: `${fromStation.name} Special Duronto`,
      type: 'Duronto',
      from: fromCode,
      to: toCode,
      departureTime: '21:40',
      arrivalTime: '11:20',
      duration: '13h 40m',
      runsOn: ['Tue', 'Fri', 'Sun'],
      pantryAvailable: true,
      avgSpeed: '82 km/h',
      classes: [
        { code: '1A', name: 'AC First Class', fare: 4450, status: 'AVAILABLE', seats: 5 },
        { code: '2A', name: 'AC 2 Tier', fare: 2750, status: 'RAC', seats: 6 },
        { code: '3A', name: 'AC 3 Tier', fare: 1980, status: 'AVAILABLE', seats: 32 }
      ]
    }
  ];
};
