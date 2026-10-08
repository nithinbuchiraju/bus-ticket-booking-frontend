import { formatDate, formatTime, formatCurrency, formatDateTime, todayISO } from '../utils/formatDate.js';

export default function BookingCard({ booking, onCancel, cancelling }) {
  const confirmed = booking.status === 'CONFIRMED';
  const upcoming = booking.travelDate >= todayISO();

  return (
    <div className="card booking-card">
      <div>
        <h3>{booking.busName}</h3>
        <p>{booking.source} → {booking.destination}</p>
        <p className="muted">
          {formatDate(booking.travelDate)} · Departs {formatTime(booking.departureTime)}
        </p>
        <p className="muted">Booked on {formatDateTime(booking.bookingDate)}</p>
      </div>
      <div>
        <p><strong>{booking.passengerName}</strong>{booking.passengerAge ? `, ${booking.passengerAge}` : ''}</p>
        <p>Seat <span className="seat-chip">{booking.seatNumber}</span></p>
        <p className="price">{formatCurrency(booking.totalAmount)}</p>
      </div>
      <div className="booking-actions">
        <span className={`status ${booking.status.toLowerCase()}`}>{booking.status}</span>
        {confirmed && upcoming && onCancel && (
          <button className="btn btn-outline btn-sm" disabled={cancelling} onClick={() => onCancel(booking.id)}>
            {cancelling ? 'Cancelling...' : 'Cancel'}
          </button>
        )}
      </div>
    </div>
  );
}
