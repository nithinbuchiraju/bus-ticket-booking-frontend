import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cancelBooking, getMyBookings } from '../api/bookingApi.js';
import { getErrorMessage } from '../api/axiosConfig.js';
import BookingCard from '../components/BookingCard.jsx';
import Loader from '../components/Loader.jsx';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    getMyBookings()
      .then(setBookings)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    setCancellingId(id);
    setError('');
    try {
      const updated = await cancelBooking(id);
      setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) return <Loader text="Loading your bookings..." />;

  return (
    <div>
      <h2 className="section-title">My Bookings</h2>
      {error && <p className="error">{error}</p>}
      {bookings.length === 0 ? (
        <div className="card empty">
          You have no bookings yet. <Link to="/">Search for a bus</Link>
        </div>
      ) : (
        <div className="list">
          {bookings.map((b) => (
            <BookingCard key={b.id} booking={b} onCancel={handleCancel} cancelling={cancellingId === b.id} />
          ))}
        </div>
      )}
    </div>
  );
}
