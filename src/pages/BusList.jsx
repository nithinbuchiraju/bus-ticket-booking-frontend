import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchBuses } from '../api/busApi.js';
import { getErrorMessage } from '../api/axiosConfig.js';
import SearchForm from '../components/SearchForm.jsx';
import BusCard from '../components/BusCard.jsx';
import Loader from '../components/Loader.jsx';
import { formatDate } from '../utils/formatDate.js';

export default function BusList() {
  const [params] = useSearchParams();
  const source = params.get('source') || '';
  const destination = params.get('destination') || '';
  const date = params.get('date') || '';

  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!source || !destination || !date) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    searchBuses({ source, destination, date })
      .then(setBuses)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [source, destination, date]);

  return (
    <div>
      <SearchForm initial={{ source, destination, date }} />
      {source && (
        <h2 className="section-title">
          {source} → {destination} <span className="muted">· {formatDate(date)}</span>
        </h2>
      )}
      {loading && <Loader text="Searching buses..." />}
      {error && <p className="error">{error}</p>}
      {!loading && !error && source && buses.length === 0 && (
        <div className="card empty">No buses found for this route and date. Try another date.</div>
      )}
      <div className="list">
        {buses.map((b) => <BusCard key={b.id} bus={b} />)}
      </div>
    </div>
  );
}
