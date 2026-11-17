import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { PublicHeader } from '../components/common/PublicHeader';
import { NotificationToast } from '../components/common/NotificationToast';
import { useNotification } from '../context/NotificationContext';
import { authService } from '../services/authService';
import '../styles/form.css';

export const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { notify } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username === '' || email === '' || password === '') {
      notify('Must enter all fields', 'orange');
      return;
    }

    if (password.length < 8) {
      notify('Password length must be more than 8 characters');
      return;
    }

    try {
      const response = await authService.signup({ username, email, password });
      if (response.success) {
        const result = await Swal.fire({
          title: 'Successfully registered!',
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
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        const result = await Swal.fire({
          title: 'User already exists!',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Go to Login page',
        });
        if (result.isConfirmed) {
          navigate('/login');
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
          <h1 className="form-heading">Register</h1>
          <form onSubmit={handleSubmit} id="form">
            <label htmlFor="usrnm">
              <i className="fa fa-user"></i>Usernme
            </label>
            <input
              type="text"
              name="username"
              id="usrnm"
              className="input-field"
              autoComplete="off"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

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

            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
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
