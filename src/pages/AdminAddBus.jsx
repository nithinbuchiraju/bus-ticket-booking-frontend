import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createBus } from '../api/busApi.js';
import { getErrorMessage } from '../api/axiosConfig.js';
import { formatDate, formatCurrency, todayISO } from '../utils/formatDate.js';

const BUS_TYPES = ['AC Sleeper', 'Non-AC Sleeper', 'AC Semi-Sleeper', 'AC Seater', 'Non-AC Seater'];

const EMPTY = {
  busName: '',
  busType: BUS_TYPES[0],
  source: '',
  destination: '',
  travelDate: todayISO(),
  departureTime: '',
  arrivalTime: '',
  fare: '',
  totalSeats: '40',
};

export default function AdminAddBus() {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');
  const [created, setCreated] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreated(null);

    if (!form.busName.trim() || !form.source.trim() || !form.destination.trim())
      return setError('Bus name, source and destination are required');
    if (form.source.trim().toLowerCase() === form.destination.trim().toLowerCase())
      return setError('Source and destination cannot be the same');
    if (!form.departureTime || !form.arrivalTime) return setError('Departure and arrival times are required');
    if (!(Number(form.fare) > 0)) return setError('Fare must be greater than 0');
    const seats = Number(form.totalSeats);
    if (!Number.isInteger(seats) || seats < 1 || seats > 100) return setError('Total seats must be between 1 and 100');

    setError('');
    setLoading(true);
    try {
      const bus = await createBus({
        busName: form.busName.trim(),
        busType: form.busType,
        source: form.source.trim(),
        destination: form.destination.trim(),
        travelDate: form.travelDate,
        departureTime: form.departureTime,
        arrivalTime: form.arrivalTime,
        fare: Number(form.fare),
        totalSeats: seats,
      });
      setCreated(bus);
      setForm({ ...EMPTY, travelDate: form.travelDate }); // keep the date for adding several buses quickly
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <form className="card admin-card" onSubmit={handleSubmit}>
        <h2>Add a new bus</h2>
        <p className="muted">Seats are generated automatically (4 per row: A1–A4, B1–B4, ...).</p>

        {created && (
          <div className="card success">
            ✅ <strong>{created.busName}</strong> added: {created.source} → {created.destination} on{' '}
            {formatDate(created.travelDate)}, {formatCurrency(created.fare)} · {created.totalSeats} seats.{' '}
            <Link to={`/buses?source=${encodeURIComponent(created.source)}&destination=${encodeURIComponent(created.destination)}&date=${created.travelDate}`}>
              View in search
            </Link>
          </div>
        )}

        <div className="form-grid">
          <div className="field"><label>Bus name</label><input value={form.busName} onChange={set('busName')} /></div>
          <div className="field">
            <label>Bus type</label>
            <select value={form.busType} onChange={set('busType')}>
              {BUS_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="field"><label>From</label><input value={form.source} onChange={set('source')} /></div>
          <div className="field"><label>To</label><input value={form.destination} onChange={set('destination')} /></div>
          <div className="field"><label>Travel date</label><input type="date" min={todayISO()} value={form.travelDate} onChange={set('travelDate')} /></div>
          <div className="field"><label>Fare per seat (₹)</label><input type="number" min="1" value={form.fare} onChange={set('fare')} /></div>
          <div className="field"><label>Departure time</label><input type="time" value={form.departureTime} onChange={set('departureTime')} /></div>
          <div className="field"><label>Arrival time</label><input type="time" value={form.arrivalTime} onChange={set('arrivalTime')} /></div>
          <div className="field"><label>Total seats</label><input type="number" min="1" max="100" value={form.totalSeats} onChange={set('totalSeats')} /></div>
        </div>

        {error && <p className="error">{error}</p>}
        <button className="btn btn-primary" disabled={loading}>{loading ? 'Adding...' : 'Add Bus'}</button>
      </form>
    </div>
  );
}
