export default function Seat({ seat, selected, onToggle }) {
  let cls = 'seat';
  if (seat.booked) cls += ' booked';
  else if (selected) cls += ' selected';

  return (
    <button
      type="button"
      className={cls}
      disabled={seat.booked}
      onClick={() => onToggle(seat.id)}
      title={seat.booked ? 'Already booked' : `Seat ${seat.seatNumber}`}
    >
      {seat.seatNumber}
    </button>
  );
}
