import React from 'react';
import { Link } from 'react-router-dom';

export const PublicHeader: React.FC = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        QuizGuru
      </Link>

      <nav className="navbar">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
