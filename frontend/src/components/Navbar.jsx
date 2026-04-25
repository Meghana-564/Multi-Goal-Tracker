import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaCompass, FaBookmark, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <FaCompass style={{ marginRight: '8px' }} />
        RoadmapBuilder
      </Link>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/dashboard"><FaUser /> Dashboard</Link>
            <Link to="/bookmarks"><FaBookmark /> Bookmarks</Link>
            <button onClick={handleLogout} className="btn btn-secondary">
              <FaSignOutAlt /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
