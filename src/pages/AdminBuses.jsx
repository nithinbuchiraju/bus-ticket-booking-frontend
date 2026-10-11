import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllBuses } from '../api/busApi.js';
import { getErrorMessage } from '../api/axiosConfig.js';
import { formatDate, formatCurrency } from '../utils/formatDate.js';

export default function AdminBuses() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadBuses = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getAllBuses();
      setBuses(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBuses();
  }, []);

  return (
    <div>
      <div className="section-title">
        <h2>Manage Buses</h2>
        <p className="muted">View all buses available in the system.</p>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={loadBuses} disabled={loading}>
          {loading ? 'Loading...' : 'Refresh Buses'}
        </button>
        <Link className="btn btn-primary" to="/admin/add-bus">
          Add New Bus
        </Link>
      </div>

      {loading && <p>Loading buses...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && buses.length === 0 && (
        <div className="card empty">No buses found.</div>
      )}

      {!loading && !error && buses.length > 0 && (
        <>
          <p className="muted">Total buses: {buses.length}</p>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Bus Name</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>From</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>To</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Travel Date</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Fare</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Seats</th>
                </tr>
              </thead>
              <tbody>
                {buses.map((bus) => (
                  <tr key={bus.id}>
                    <td style={{ padding: '12px' }}>{bus.busName}</td>
                    <td style={{ padding: '12px' }}>{bus.busType || '-'}</td>
                    <td style={{ padding: '12px' }}>{bus.source}</td>
                    <td style={{ padding: '12px' }}>{bus.destination}</td>
                    <td style={{ padding: '12px' }}>
                      {bus.travelDate ? formatDate(bus.travelDate) : '-'}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {bus.fare != null ? formatCurrency(bus.fare) : '-'}
                    </td>
                    <td style={{ padding: '12px' }}>{bus.totalSeats ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}