import React from 'react';
import { MainNavbar } from '../components/layout/MainNavbar';
import { NotificationToast } from '../components/common/NotificationToast';
import '../styles/nav.css';
import '../styles/about.css';

export const AboutPage: React.FC = () => {
  return (
    <div className="page-about flex-container">
      <MainNavbar />
      <main className="main">
        <section className="section1">
          <div className="image">
            <img src="/images/about_image1.jpg" alt="" />
          </div>
          <div className="content">
            <h1 className="heading">Get to know us</h1>
            <div className="summary">
              <p>
                Welcome to QuizGuru, your ultimate destination for interactive and challenging quiz
                tests!
              </p>
              <p>
                At QuizGuru, we believe in the power of knowledge and the joy of learning. Our
                platform is designed to provide a stimulating environment for individuals of all
                ages and backgrounds to test their skills and expand their horizons.
              </p>
            </div>
          </div>
        </section>

        <section className="section2">
          <div className="content">
            <h1 className="heading">Our Mission</h1>
            <div className="summary">
              <p>
                Our mission at QuizGuru is to foster a culture of continuous learning and
                intellectual curiosity. We aim to empower individuals by offering a diverse range
                of quiz tests covering various topics such as verbal, arithmetic, quantitative,
                reasoning, and current affairs. Through engaging and thought-provoking questions,
                we strive to enhance critical thinking and problem-solving abilities.
              </p>
            </div>
          </div>
          <div className="image">
            <img src="/images/about_image2.jpg" alt="" />
          </div>
        </section>

        <section className="section3">
          <div className="image">
            <img src="/images/about_image3.jpg" alt="" />
          </div>
          <div className="content">
            <h1 className="heading">What Sets Us Apart</h1>
            <div className="summary">
              <dl>
                <dt>1. Comprehensive Content:</dt>
                <dd>
                  Explore a wide array of quiz categories, meticulously curated to cater to
                  different interests and knowledge levels.
                </dd>
                <dt>2. User-Friendly Interface:</dt>
                <dd>
                  We prioritize a seamless and user-friendly experience. Navigate through our
                  platform effortlessly and enjoy a smooth quiz-taking process.
                </dd>
                <dt>3. Educational Value:</dt>
                <dd>
                  QuizGuru is not just about testing; it&apos;s about learning. Each quiz is
                  designed to provide valuable insights and information, encouraging a deeper
                  understanding of the subject matter.
                </dd>
              </dl>
            </div>
          </div>
        </section>

        <section className="section4">
          <div className="content">
            <h1 className="heading">Our Commitment</h1>
            <div className="summary">
              <p>
                At QuizGuru, we are committed to maintaining the highest standards of quality,
                accuracy, and fairness in our quiz content. We continuously update and expand our
                question bank to ensure that our users receive most relevant and up-to-date
                information.
              </p>
            </div>
          </div>
          <div className="image">
            <img src="/images/about_image4.jpg" alt="" />
          </div>
        </section>

        <section className="section5">
          <div className="image">
            <img src="/images/about_image5.jpg" alt="" />
          </div>
          <div className="content">
            <h1 className="heading">Join Us on the Learning Journey</h1>
            <div className="summary">
              <p>
                Whether you are a student aiming to sharpen your academic skills, a professional
                looking for mental stimulation, or simply someone who loves a good challenge,
                QuizGuru is the place for you. Embark on a journey of discovery, test your limits,
                and uncover the joy of lifelong learning.
              </p>
              <p>
                Thank you for choosing QuizGuru as your go-to platform for quiz tests. Let&apos;s
                learn, grow, and quiz together!
              </p>
            </div>
          </div>
        </section>

        <NotificationToast />
      </main>
    </div>
  );
};
