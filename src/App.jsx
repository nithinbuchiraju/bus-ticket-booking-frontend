import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import BusList from './pages/BusList.jsx';
import SeatSelection from './pages/SeatSelection.jsx';
import BookingConfirmation from './pages/BookingConfirmation.jsx';
import MyBookings from './pages/MyBookings.jsx';
import AdminAddBus from './pages/AdminAddBus.jsx';
import AdminBuses from './pages/AdminBuses.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/buses" element={<BusList />} />
          <Route
            path="/buses/:id/seats"
            element={
              <ProtectedRoute>
                <SeatSelection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/confirmation"
            element={
              <ProtectedRoute>
                <BookingConfirmation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-bus"
            element={
              <ProtectedRoute adminOnly>
                <AdminAddBus />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/buses"
            element={
              <ProtectedRoute adminOnly>
                <AdminBuses />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}