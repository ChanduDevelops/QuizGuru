import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PublicHeader } from '../components/common/PublicHeader';
import { NotificationToast } from '../components/common/NotificationToast';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { authService } from '../services/authService';
import '../styles/form.css';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const { notify } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === '' || password === '') {
      notify('Must enter all fields', 'orange');
      return;
    }

    try {
      const response = await authService.login({ email, password });
      if (response.success && response.data) {
        loginUser(response.data);
        notify('Login successfull!', 'green');
        const targetRoute = response.data.redirect || '/main';
        window.setTimeout(() => {
          navigate(targetRoute);
        }, 2000);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 401) {
          notify('Wrong password!', 'red');
        } else if (status === 404) {
          notify('User not found', 'orange');
        } else {
          notify('Something went wrong! Please try again', 'red');
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
          <h1 className="form-heading">Login</h1>
          <form onSubmit={handleSubmit} id="form">
            <label htmlFor="email">
              <i className="fa fa-envelope"></i>Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="input-field"
              autoComplete="off"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="pswd">
              <i className="fa fa-lock"></i>Password
            </label>
            <input
              type="password"
              name="password"
              id="pswd"
              className="input-field"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Link to="/forgot-password">Forgot Password?</Link>
            <p>
              Don&apos;t have an account?{' '}
              <Link to="/signup">
                Create Account <i className="fa fa-external-link"></i>
              </Link>
            </p>
            <div className="btn-div">
              <button type="submit" className="submit-btn">
                Login
              </button>
            </div>
          </form>
        </section>
        <NotificationToast />
      </main>
    </div>
  );
};
