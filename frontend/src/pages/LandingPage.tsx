import React from 'react';
import { Link } from 'react-router-dom';
import { PublicHeader } from '../components/common/PublicHeader';
import '../styles/index_style.css';

export const LandingPage: React.FC = () => {
  return (
    <div className="page-landing">
      <PublicHeader />
      <main className="main">
        <section className="left">
          <div className="title">
            <h1>
              <strong>
                <q>
                  Genius is 10% inspiration,
                  <br />
                  <span style={{ paddingLeft: "10rem" }}></span>90% perspiration.
                </q>
                <br />
                <br />
                <span style={{ paddingLeft: "16rem" }}></span><i> - Thomas Edison</i>
              </strong>
            </h1>
          </div>
          <Link className="btn" to="/login">
            Take a Quiz <i className="fa fa-external-link"></i>
          </Link>
        </section>
        <section className="float-image"></section>
      </main>
    </div>
  );
};
