import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBus, getSeats } from '../api/busApi.js';
import { createBooking } from '../api/bookingApi.js';
import { getErrorMessage } from '../api/axiosConfig.js';
import SeatLayout from '../components/SeatLayout.jsx';
import PassengerForm from '../components/PassengerForm.jsx';
import Loader from '../components/Loader.jsx';
import { formatCurrency, formatDate, formatTime } from '../utils/formatDate.js';

const MAX_SEATS = 6;

export default function SeatSelection() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bus, setBus] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState([]);
  const [passengers, setPassengers] = useState({}); // seatId -> { passengerName, passengerAge }
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const load = () =>
    Promise.all([getBus(id), getSeats(id)])
      .then(([b, s]) => {
        setBus(b);
        setSeats(s);
      })
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const toggleSeat = (seatId) => {
    setError('');
    setSelected((prev) => {
      if (prev.includes(seatId)) return prev.filter((x) => x !== seatId);
      if (prev.length >= MAX_SEATS) {
        setError(`You can book at most ${MAX_SEATS} seats at a time`);
        return prev;
      }
      return [...prev, seatId];
    });
  };

  const seatNumber = (seatId) => seats.find((s) => s.id === seatId)?.seatNumber;

  const handleBook = async () => {
    if (selected.length === 0) return setError('Please select at least one seat');
    const list = selected.map((seatId) => {
      const p = passengers[seatId] || {};
      return { seatId, passengerName: (p.passengerName || '').trim(), passengerAge: p.passengerAge ? Number(p.passengerAge) : null };
    });
    if (list.some((p) => !p.passengerName)) return setError('Enter a name for every selected seat');

    setError('');
    setSubmitting(true);
    try {
      const bookings = await createBooking({ busId: Number(id), passengers: list });
      navigate('/confirmation', { state: { bookings } });
    } catch (err) {
      setError(getErrorMessage(err));
      setSelected([]);
      load(); // refresh seat availability (a seat may have just been taken)
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader text="Loading seats..." />;
  if (!bus) return <p className="error">{error || 'Bus not found'}</p>;

  const total = Number(bus.fare) * selected.length;

  return (
    <div className="seat-page">
      <div className="card">
        <h2>{bus.busName} <span className="tag">{bus.busType}</span></h2>
        <p>{bus.source} → {bus.destination} · {formatDate(bus.travelDate)} · Departs {formatTime(bus.departureTime)}</p>
        <p className="muted">Fare per seat: {formatCurrency(bus.fare)}</p>
      </div>

      <div className="seat-columns">
        <div className="card">
          <h3>Select seats</h3>
          <SeatLayout seats={seats} selected={selected} onToggle={toggleSeat} />
        </div>

        <div className="card">
          <h3>Passenger details</h3>
          {selected.length === 0 && <p className="muted">Pick a seat to enter passenger details.</p>}
          {selected.map((seatId) => (
            <PassengerForm
              key={seatId}
              seatNumber={seatNumber(seatId)}
              value={passengers[seatId] || { passengerName: '', passengerAge: '' }}
              onChange={(v) => setPassengers({ ...passengers, [seatId]: v })}
            />
          ))}
          <div className="summary">
            <span>{selected.length} seat(s)</span>
            <strong>Total: {formatCurrency(total)}</strong>
          </div>
          {error && <p className="error">{error}</p>}
          <button className="btn btn-primary full" disabled={submitting || selected.length === 0} onClick={handleBook}>
            {submitting ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </div>
  );
}
