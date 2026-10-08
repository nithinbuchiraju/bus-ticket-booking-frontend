import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { todayISO } from '../utils/formatDate.js';

export default function SearchForm({ initial = {} }) {
  const navigate = useNavigate();
  const [source, setSource] = useState(initial.source || '');
  const [destination, setDestination] = useState(initial.destination || '');
  const [date, setDate] = useState(initial.date || todayISO());
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!source.trim() || !destination.trim() || !date) return setError('Please fill in all fields');
    if (source.trim().toLowerCase() === destination.trim().toLowerCase())
      return setError('Source and destination cannot be the same');
    setError('');
    const q = new URLSearchParams({ source: source.trim(), destination: destination.trim(), date });
    navigate(`/buses?${q.toString()}`);
  };

  return (
    <form className="search-form card" onSubmit={handleSubmit}>
      <div className="field">
        <label>From</label>
        <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="e.g. Hyderabad" />
      </div>
      <div className="field">
        <label>To</label>
        <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="e.g. Bangalore" />
      </div>
      <div className="field">
        <label>Travel date</label>
        <input type="date" value={date} min={todayISO()} onChange={(e) => setDate(e.target.value)} />
      </div>
      <button className="btn btn-primary" type="submit">Search Buses</button>
      {error && <p className="error full">{error}</p>}
    </form>
  );
}
