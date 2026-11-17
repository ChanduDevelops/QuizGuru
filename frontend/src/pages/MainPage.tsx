import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainNavbar } from '../components/layout/MainNavbar';
import { NotificationToast } from '../components/common/NotificationToast';
import { QUIZ_CATEGORIES, QUIZ_LEVELS } from '../constants/quizCategories';
import '../styles/nav.css';
import '../styles/main.css';

export const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLevelClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    categorySlug: string,
    levelValue: string
  ) => {
    e.preventDefault();
    navigate(`/quiz?testCategory=${categorySlug}&testLevel=${levelValue}`);
  };

  return (
    <div className="page-main">
      <MainNavbar />
      <main className="main">
        <div className="greet">
          <h1 className="heading">Welcome to QuizGuru.com!</h1>
          <p className="message">
            Aptitude questions and answers for your training and competitive exams!
          </p>
        </div>

        <section className="main-container">
          <div className="row">
            {QUIZ_CATEGORIES.map((category) => (
              <div className="column" key={category.slug}>
                <h1 className="column-heading">{category.label}</h1>
                <div className="level-type">
                  {QUIZ_LEVELS.map((lvl) => (
                    <a
                      key={lvl.value}
                      href="#"
                      className={`level ${lvl.value}`}
                      onClick={(e) => handleLevelClick(e, category.slug, lvl.value)}
                    >
                      {lvl.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <NotificationToast />
        </section>
      </main>
    </div>
  );
};
