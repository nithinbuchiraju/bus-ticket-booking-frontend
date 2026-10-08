import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand">🚌 BusBooking</Link>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          {user && <NavLink to="/my-bookings">My Bookings</NavLink>}
          {user?.role === 'ADMIN' && <NavLink to="/admin/add-bus">Add Bus</NavLink>}
          {user ? (
            <>
              <span className="nav-user">Hi, {user.name}</span>
              <button className="btn btn-outline btn-sm" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
