import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NotificationToast } from '../components/common/NotificationToast';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { quizService } from '../services/quizService';
import '../styles/admin.css';

export const AdminPage: React.FC = () => {
  const [category, setCategory] = useState('select');
  const [level, setLevel] = useState('select');
  const [qsn, setQsn] = useState('');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [ans, setAns] = useState('select');

  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const { notify } = useNotification();

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logoutUser();
    navigate('/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      category === 'select' ||
      level === 'select' ||
      qsn === '' ||
      a === '' ||
      b === '' ||
      c === '' ||
      d === '' ||
      ans === 'select'
    ) {
      notify('Must enter all fields', 'orange');
      return;
    }

    try {
      const response = await quizService.createQuestion({
        category,
        level,
        qsn,
        a,
        b,
        c,
        d,
        ans,
      });

      if (response.success) {
        notify('Successfully uploaded', 'green');
        setQsn('');
        setA('');
        setB('');
        setC('');
        setD('');
        setAns('select');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        notify('Data already exist in the server', 'orange');
      } else {
        notify('Something went wrong', 'red');
      }
    }
  };

  return (
    <div className="page-admin">
      <header className="header">
        <a href="#" className="logo" onClick={(e) => e.preventDefault()}>
          QuizGuru : Admin
        </a>

        <nav className="navbar">
          <a href="/login" onClick={handleLogout}>
            <i className="fa fa-sign-out"></i> Logout
          </a>
        </nav>
      </header>

      <main className="main">
        <div className="form-container">
          <h1 className="form-heading">Insert data</h1>
          <form onSubmit={handleSubmit}>
            <div className="categories">
              <label htmlFor="category">Category : </label>
              <select
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="select">select</option>
                <option value="arithmetic">Arithmetic</option>
                <option value="quantitative">Quantitative</option>
                <option value="reasoning">Reasoning</option>
                <option value="verbal">Verbal</option>
                <option value="current_affairs">Current Affairs</option>
                <option value="random">Random</option>
              </select>
            </div>

            <div className="levels">
              <label htmlFor="level">Level : </label>
              <select
                name="level"
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="select">select</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="qsn-div">
              <label htmlFor="qsn">Question : </label>
              <textarea
                name="qsn"
                id="qsn"
                rows={3}
                cols={10}
                value={qsn}
                onChange={(e) => setQsn(e.target.value)}
              ></textarea>
            </div>

            <div className="options">
              <div className="option-a">
                <label htmlFor="a">Option A : </label>
                <input
                  type="text"
                  name="a"
                  id="a"
                  className="opt"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                />
              </div>

              <div className="option-b">
                <label htmlFor="b">Option B : </label>
                <input
                  type="text"
                  name="b"
                  id="b"
                  className="opt"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                />
              </div>

              <div className="option-c">
                <label htmlFor="c">Option C : </label>
                <input
                  type="text"
                  name="c"
                  id="c"
                  className="opt"
                  value={c}
                  onChange={(e) => setC(e.target.value)}
                />
              </div>

              <div className="option-d">
                <label htmlFor="d">Option D : </label>
                <input
                  type="text"
                  name="d"
                  id="d"
                  className="opt"
                  value={d}
                  onChange={(e) => setD(e.target.value)}
                />
              </div>

              <div className="correct-ans">
                <label htmlFor="ans">Answer : </label>
                <select
                  name="ans"
                  id="ans"
                  value={ans}
                  onChange={(e) => setAns(e.target.value)}
                >
                  <option value="select">select</option>
                  <option value="a">A</option>
                  <option value="b">B</option>
                  <option value="c">C</option>
                  <option value="d">D</option>
                </select>
              </div>
            </div>

            <div className="upload">
              <button type="submit" id="submit-btn">
                Upload
              </button>
            </div>
          </form>
        </div>

        <NotificationToast />
      </main>
    </div>
  );
};
