import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { PublicHeader } from '../components/common/PublicHeader';
import { NotificationToast } from '../components/common/NotificationToast';
import { useNotification } from '../context/NotificationContext';
import { authService } from '../services/authService';
import '../styles/form.css';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const navigate = useNavigate();
  const { notify } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== password2) {
      notify("Password didn't match", 'orange');
      return;
    }

    if (password.length < 8) {
      notify('Password length must be at least 8 characters', 'orange');
      return;
    }

    try {
      const response = await authService.resetPassword({ email, password });
      if (response.success) {
        const result = await Swal.fire({
          title: 'Successfully updated password!',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Go to Login page',
        });
        if (result.isConfirmed) {
          navigate('/login');
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        const result = await Swal.fire({
          title: 'User not found!',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Go to Register page',
        });
        if (result.isConfirmed) {
          navigate('/signup');
        }
      } else {
        notify('Something went wrong! Please try again', 'red');
      }
    }
  };

  return (
    <div className="page-form">
      <PublicHeader />
      <main className="main">
        <section className="form-container">
          <h1 className="form-heading">Reset Password</h1>
          <form onSubmit={handleSubmit} id="form">
            <label htmlFor="email">
              <i className="fa fa-envelope"></i>Email
            </label>
            <input
              type="text"
              required
              name="email"
              id="email"
              className="input-field"
              autoComplete="off"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="pswd">
              <i className="fa fa-lock"></i>Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="pswd"
              className="input-field"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="pswd2">
              <i className="fa fa-lock"></i>Confirm password
            </label>
            <input
              type="password"
              name="password2"
              id="pswd2"
              className="input-field"
              placeholder="Re-enter new password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />

            <div className="login-signup">
              <Link to="/login">
                Login <i className="fa fa-external-link"></i>
              </Link>
              <Link to="/signup">
                Create Account <i className="fa fa-external-link"></i>
              </Link>
            </div>
            <div className="btn-div">
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
        </section>
        <NotificationToast />
      </main>
    </div>
  );
};
