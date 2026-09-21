# 🚆 RailYatra - Railway Ticket Booking & Reservation System

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v7.x-CA4245?style=flat-square&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

A modern, responsive, and full-featured Indian Railways ticket booking web application built with **React**, **Vite**, **Tailwind CSS**, and **Lucide React**. Inspired by the modern IRCTC and Trainline interfaces, **RailYatra** provides an intuitive end-to-end booking flow from station search to coach layout selection, simulated payments, and printable e-tickets with real-time PNR tracking.

---

## ✨ Features

### 🔍 1. Train Search & Station Autocomplete
- **Smart Station Search**: Type city or station codes (e.g., `NDLS`, `MMCT`, `HWH`, `MAS`, `SBC`, `PUNE`).
- **Popular Station Chips**: Instant selection for major Indian rail hubs.
- **One-Click Station Swap**: Fast interchange between Origin and Destination stations with smooth animation.
- **Filters**: Journey date selector, Class preferences (1A, 2A, 3A, 3E, SL, CC, EC, 2S), and Quotas (General, Tatkal, Ladies, Senior Citizen).
- **Popular Corridors**: Quick cards for high-traffic corridors like *Delhi ↔ Mumbai*, *Delhi ↔ Varanasi Vande Bharat*, etc.

### 📋 2. Search Results & Live Train Availability
- **Color-Coded Status Badges**:
  - 🟢 `AVAILABLE` (e.g. `AVL: 42`)
  - 🟡 `RAC` (Reservation Against Cancellation)
  - 🔴 `WAITLIST` (e.g. `WL: 12`)
- **Filter Sidebar**: Filter by departure intervals (Early Morning, Morning, Afternoon, Night) and train types (*Vande Bharat, Rajdhani, Shatabdi, Superfast, Duronto*).
- **Sorting**: Sort by earliest departure time, shortest journey duration, or lowest fare.
- **Live Train Details**: Departure & arrival times, run days, average speeds, and onboard pantry indications.

### 🛋️ 3. Interactive Coach & Berth Visualizer
- **Realistic Coach Diagrams**:
  - **Sleeper / 3AC Compartments**: Visual representation of Indian Railways 8-berth cabins showing Lower (LB), Middle (MB), Upper (UB), Side Lower (SL), and Side Upper (SU).
  - **Chair Car (CC / EC)**: 2×3 and 2×2 row seating with Window, Middle, and Aisle indicators.
- **Visual Seat Selection**: Click any available seat to allocate it directly to specific passengers.
- **Multi-Passenger Booking**: Add up to 6 passengers per ticket with full names, ages, gender, and berth preferences.

### 💳 4. Simulated Checkout & Payment Gateway
- **Realistic Payment Options**:
  - **UPI / QR Code**: Interactive mock QR code scan for GPay, PhonePe, Paytm, and BHIM.
  - **Credit / Debit Cards**: Pre-filled demo sandbox card for instant test clearance.
  - **Net Banking**: Instant simulation for major Indian banks (SBI, HDFC, ICICI, Axis).
- **Realistic Multi-Step Gateway**: Simulates bank handshakes, encryption checks, and berth reservations.
- **Confetti Celebration**: Visual reward animation upon confirmed booking.

### 🎫 5. Official Printable E-Ticket (ERS)
- **Authentic IRCTC Electronic Reservation Slip Layout**:
  - Uniquely generated 10-digit PNR number.
  - Passenger allotment breakdown (Coach, Berth Number, Berth Type, Current Status).
  - Journey details, scheduled departure/arrival platforms, and QR code verification graphic.
- **Print & PDF Support**: Built-in `window.print()` styling that cleanly hides web navigation and action buttons for printing or saving as PDF.

### 🔎 6. Live PNR Status & Cancellation
- **Instant Status Lookup**: Enter any 10-digit PNR to retrieve booking state and charting status (*"Chart Not Prepared"* / *"Chart Prepared"*).
- **Ticket Cancellation**: Direct cancellation flow with automated refund simulation.

### 📂 7. Persistent Trip History (`My Bookings`)
- All bookings and ticket states persist across browser sessions using `localStorage`.
- Filter trips by **All**, **Confirmed**, or **Cancelled**.

---

## 🏗️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern component-based UI framework |
| **Vite 8** | High-performance build tool and dev server |
| **Tailwind CSS v4** | Modern utility-first CSS styling with `@tailwindcss/vite` |
| **React Router v7** | Client-side page routing and navigation |
| **Lucide React** | Clean, accessible iconography |
| **Canvas Confetti** | Booking confirmation celebration animation |
| **Context API + LocalStorage** | Global state management with offline persistence |

---

## 📁 Project Structure

```
railway-ticket-booking/
├── index.html                      # HTML entry with custom typography
├── package.json                    # Project dependencies and npm scripts
├── vite.config.js                  # Vite configuration with Tailwind v4 plugin
├── public/                         # Static assets
└── src/
    ├── index.css                   # Tailwind CSS imports & print styles
    ├── main.jsx                    # React root mounting
    ├── App.jsx                     # Router config and root application shell
    ├── context/
    │   └── BookingContext.jsx      # Global state, PNR generator, and persistence
    ├── data/
    │   └── mockData.js             # Stations, realistic trains, routes, classes & quotas
    ├── components/
    │   ├── Navbar.jsx              # Responsive header with 24x7 helpline info
    │   ├── Footer.jsx              # Official-styled railway portal footer
    │   ├── StationAutocomplete.jsx # Autocomplete station search with quick chips
    │   ├── CoachLayout.jsx         # Interactive visual seat & berth selector
    │   ├── FareSummary.jsx         # Dynamic pricing & fee breakdown
    │   └── TicketCard.jsx          # Printable IRCTC ERS ticket
    └── pages/
        ├── HomePage.jsx            # Hero search banner & popular corridors
        ├── SearchResultsPage.jsx   # Train listings, filters & live class availability
        ├── BookingPage.jsx         # Multi-passenger form & seat selector
        ├── CheckoutPage.jsx        # Simulated payment gateway
        ├── ConfirmationPage.jsx    # Success screen & printable e-ticket
        ├── PNRStatusPage.jsx       # 10-digit PNR tracker & cancellation
        └── MyBookingsPage.jsx      # Trip management dashboard
```

---

## 🚦 Getting Started

### Prerequisites
Make sure you have **Node.js** (v18 or newer) and **npm** installed on your system.

```bash
node -v
npm -v
```

### Installation

1. Navigate to the project directory:
   ```bash
   cd "C:\Users\gopes\Desktop\railway booking system\railway-ticket-booking"
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
   *(On Windows PowerShell, use `npm.cmd install` if script execution is restricted).*

3. Start the local development server:
   ```bash
   npm run dev
   ```
   *(Or `npm.cmd run dev`)*

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## 🛠️ Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR) |
| `npm run build` | Bundles and optimizes the app for production in the `/dist` directory |
| `npm run preview` | Locally previews the production build |
| `npm run lint` | Runs the Oxlint linter on source files |

---

## 📖 Application Walkthrough & Test Flow

1. **Search Trains**:
   - On the homepage, select **From**: *New Delhi (NDLS)* and **To**: *Mumbai Central (MMCT)*.
   - Pick your desired journey date and click **Search Available Trains**.
2. **Select Class**:
   - Filter by *Rajdhani* or *Vande Bharat* trains.
   - Click **Book Now** on `3A` or `CC`.
3. **Select Berth & Enter Details**:
   - Add passenger names and ages.
   - Scroll down to the **Interactive Coach Layout** to choose specific berth positions (Lower, Middle, Upper, etc.).
   - Click **Proceed to Checkout**.
4. **Make Mock Payment**:
   - Select **UPI / QR** or **Demo Card**.
   - Click **Simulate Pay & Confirm PNR**.
5. **View & Print Ticket**:
   - Review your generated 10-digit PNR and click **Print E-Ticket** to preview the print layout.
6. **Check PNR**:
   - Navigate to **PNR Status**, paste your PNR, and view live status or cancel the ticket.

---

## 📄 License

This project is created for educational, portfolio, and demonstration purposes. Distributed under the MIT License.
