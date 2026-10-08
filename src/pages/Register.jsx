import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi.js';
import { getErrorMessage } from '../api/axiosConfig.js';
import { useAuth } from '../context/AuthContext.jsx';
import { isEmail, isPhone, minLength } from '../utils/validators.js';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setError('Name is required');
    if (!isEmail(form.email)) return setError('Enter a valid email');
    if (!isPhone(form.phone)) return setError('Phone must be 10 digits');
    if (!minLength(form.password, 6)) return setError('Password must be at least 6 characters');
    setError('');
    setLoading(true);
    try {
      login(await registerUser(form));
      navigate('/');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <form className="card auth-card" onSubmit={handleSubmit}>
        <h2>Create account</h2>
        <div className="field"><label>Name</label><input value={form.name} onChange={set('name')} /></div>
        <div className="field"><label>Email</label><input type="email" value={form.email} onChange={set('email')} /></div>
        <div className="field"><label>Phone</label><input value={form.phone} onChange={set('phone')} placeholder="10 digits (optional)" /></div>
        <div className="field"><label>Password</label><input type="password" value={form.password} onChange={set('password')} /></div>
        {error && <p className="error">{error}</p>}
        <button className="btn btn-primary" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
        <p className="muted center">Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
