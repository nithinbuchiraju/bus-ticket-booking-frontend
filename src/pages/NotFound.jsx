import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="card empty">
      <h2>404 – Page not found</h2>
      <p><Link to="/">Go back home</Link></p>
    </div>
  );
}
