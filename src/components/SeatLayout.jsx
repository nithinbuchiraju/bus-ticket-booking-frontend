import Seat from './Seat.jsx';

export default function SeatLayout({ seats, selected, onToggle }) {
  return (
    <div className="seat-layout">
      <div className="legend">
        <span><i className="dot available" /> Available</span>
        <span><i className="dot selected" /> Selected</span>
        <span><i className="dot booked" /> Booked</span>
      </div>
      <div className="driver">🧑‍✈️ Driver</div>
      <div className="seat-grid">
        {seats.map((s) => (
          <Seat key={s.id} seat={s} selected={selected.includes(s.id)} onToggle={onToggle} />
        ))}
      </div>
    </div>
  );
}
