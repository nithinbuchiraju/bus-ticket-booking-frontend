import { Link } from 'react-router-dom';
import { formatDate, formatTime, formatCurrency } from '../utils/formatDate.js';

export default function BusCard({ bus }) {
  return (
    <div className="card bus-card">
      <div className="bus-main">
        <h3>{bus.busName}</h3>
        <span className="tag">{bus.busType || 'Standard'}</span>
        <p className="muted">{formatDate(bus.travelDate)}</p>
      </div>
      <div className="bus-route">
        <div>
          <strong>{formatTime(bus.departureTime)}</strong>
          <div className="muted">{bus.source}</div>
        </div>
        <span className="arrow">→</span>
        <div>
          <strong>{formatTime(bus.arrivalTime)}</strong>
          <div className="muted">{bus.destination}</div>
        </div>
      </div>
      <div className="bus-side">
        <div className="price">{formatCurrency(bus.fare)}</div>
        <div className={bus.availableSeats > 0 ? 'seats-left' : 'seats-left none'}>
          {bus.availableSeats > 0 ? `${bus.availableSeats} seats left` : 'Sold out'}
        </div>
        {bus.availableSeats > 0 ? (
          <Link className="btn btn-primary btn-sm" to={`/buses/${bus.id}/seats`}>Select Seats</Link>
        ) : (
          <button className="btn btn-sm" disabled>Sold out</button>
        )}
      </div>
    </div>
  );
}
