import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <ul>
        <li className="copyright">&#169; 2023 by QuizGuru | All Rights Reserved.</li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
      </ul>
    </footer>
  );
};
