import SearchForm from '../components/SearchForm.jsx';

export default function Home() {
  return (
    <div>
      <section className="hero">
        <h1>Book your bus tickets in minutes</h1>
        <p>Search buses, pick your seats, and travel hassle-free.</p>
      </section>
      <SearchForm />
      <section className="features">
        <div className="card"><h3>🔎 Easy search</h3><p>Find buses by source, destination and travel date.</p></div>
        <div className="card"><h3>💺 Choose your seat</h3><p>See live seat availability and pick the seats you like.</p></div>
        <div className="card"><h3>🎟️ Manage bookings</h3><p>View your tickets and cancel anytime before the trip.</p></div>
      </section>
    </div>
  );
}
