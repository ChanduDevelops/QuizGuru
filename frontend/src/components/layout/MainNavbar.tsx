import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QUIZ_CATEGORIES, QUIZ_LEVELS } from '../../constants/quizCategories';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

interface MainNavbarProps {
  hidden?: boolean;
}

export const MainNavbar: React.FC<MainNavbarProps> = ({ hidden = false }) => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const sideNavRef = useRef<HTMLElement | null>(null);
  const menuIconRef = useRef<HTMLSpanElement | null>(null);
  const profileDivRef = useRef<HTMLDivElement | null>(null);
  const profileIconRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const { notify } = useNotification();

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        profileIconRef.current &&
        profileDivRef.current &&
        !profileIconRef.current.contains(target) &&
        !profileDivRef.current.contains(target)
      ) {
        setProfileOpen(false);
      }

      if (
        menuIconRef.current &&
        sideNavRef.current &&
        !menuIconRef.current.contains(target) &&
        !sideNavRef.current.contains(target)
      ) {
        setSideNavOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  const handleSignout = (e: React.MouseEvent) => {
    e.preventDefault();
    logoutUser();
    navigate('/login');
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        notify('Link copied!', 'blue');
      })
      .catch(() => {
        notify("Couldn't copy link!", 'red');
      });
  };

  const handleCategorySelect = (
    e: React.MouseEvent<HTMLAnchorElement>,
    categorySlug: string,
    levelValue: string
  ) => {
    e.preventDefault();
    setSideNavOpen(false);
    navigate(`/quiz?testCategory=${categorySlug}&testLevel=${levelValue}`);
  };

  return (
    <header className={`header ${hidden ? 'hdr-hidden' : 'hdr-visible'}`}>
      <aside
        ref={sideNavRef}
        className={`side-nav ${sideNavOpen ? 'sn-visible' : 'sn-hidden'}`}
      >
        <ul className="nav-container">
          <li>
            <Link to="/main" className="item" onClick={() => setSideNavOpen(false)}>
              <span className="icon">
                <i className="fa fa-home"></i>
              </span>
              Home
            </Link>
          </li>

          {QUIZ_CATEGORIES.map((category) => (
            <li className="item" key={category.slug}>
              <span className="icon">
                <i className={category.iconClass}></i>
              </span>
              <span className="item-heading">{category.sidebarLabel}</span>
              <i className="fa fa-angle-right icon-expand"></i>

              <ul className="dropdown">
                {QUIZ_LEVELS.map((lvl) => (
                  <li key={lvl.value}>
                    <a
                      href="#"
                      className={`level ${lvl.value}`}
                      onClick={(e) => handleCategorySelect(e, category.slug, lvl.value)}
                    >
                      {lvl.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}

          <li className="item" id="share" onClick={handleShare}>
            <span className="icon">
              <i className="fa fa-link"></i>
            </span>
            Share friend
          </li>

          <li>
            <Link to="/contact" className="item" onClick={() => setSideNavOpen(false)}>
              <span className="icon">
                <i className="fa fa-bug"></i>
              </span>
              Report
            </Link>
          </li>

          <li>
            <button type="button" className="signout nav-signout" onClick={handleSignout}>
              Sign out
            </button>
          </li>
        </ul>
      </aside>

      <div className="menu-and-logo">
        <span
          ref={menuIconRef}
          className="menu-icon"
          onClick={() => setSideNavOpen((prev) => !prev)}
        >
          <i className={`fa ic ${sideNavOpen ? 'fa-close' : 'fa-navicon'}`}></i>
        </span>
        <Link to="/main" className="logo">
          QuizGuru
        </Link>
      </div>

      <nav className="navbar">
        <ul>
          <li>
            <Link to="/main">
              <i className="fa fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/about">
              <i className="fa fa-info-circle"></i> About Us
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <i className="fa fa-envelope"></i> Contact Us
            </Link>
          </li>

          <li>
            <div
              ref={profileIconRef}
              id="profile-icon"
              onClick={() => setProfileOpen((prev) => !prev)}
            >
              <i className="fa fa-user-circle-o"></i>
            </div>
            <div
              ref={profileDivRef}
              className={`profile-div ${profileOpen ? 'pd-visible' : 'pd-hidden'}`}
            >
              <Link
                  to="/profile"
                  className="profile"
                  onClick={() => setProfileOpen(false)}
              >
                Profile <i className="fa fa-angle-right"></i>
              </Link>
              <button type="button" className="signout" onClick={handleSignout}>
                Sign out
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};
