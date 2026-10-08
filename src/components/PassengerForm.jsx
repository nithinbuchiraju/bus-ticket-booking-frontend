export default function PassengerForm({ seatNumber, value, onChange }) {
  return (
    <div className="passenger-row">
      <span className="seat-chip">{seatNumber}</span>
      <input
        placeholder="Passenger name"
        value={value.passengerName}
        onChange={(e) => onChange({ ...value, passengerName: e.target.value })}
      />
      <input
        type="number"
        min="1"
        max="120"
        placeholder="Age"
        className="age-input"
        value={value.passengerAge}
        onChange={(e) => onChange({ ...value, passengerAge: e.target.value })}
      />
    </div>
  );
}
