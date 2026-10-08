import { Link, Navigate, useLocation } from 'react-router-dom';
import BookingCard from '../components/BookingCard.jsx';
import { formatCurrency } from '../utils/formatDate.js';

export default function BookingConfirmation() {
  const { state } = useLocation();
  const bookings = state?.bookings;
  if (!bookings || bookings.length === 0) return <Navigate to="/my-bookings" replace />;

  const total = bookings.reduce((sum, b) => sum + Number(b.totalAmount), 0);

  return (
    <div>
      <div className="card success">
        <h2>✅ Booking confirmed!</h2>
        <p>{bookings.length} ticket(s) booked. Total paid: <strong>{formatCurrency(total)}</strong></p>
      </div>
      <div className="list">
        {bookings.map((b) => <BookingCard key={b.id} booking={b} />)}
      </div>
      <p className="center"><Link className="btn btn-primary" to="/my-bookings">View all my bookings</Link></p>
    </div>
  );
}
