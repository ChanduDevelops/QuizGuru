import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { MainNavbar } from '../components/layout/MainNavbar';
import { NotificationToast } from '../components/common/NotificationToast';
import { useNotification } from '../context/NotificationContext';
import { quizService } from '../services/quizService';
import { QuestionItem, QuizOptionKey } from '../types/quiz.types';
import '../styles/nav.css';
import '../styles/qsns.css';

const TEST_DURATION_MINUTES = 30;

export const QuizPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const testCategory = searchParams.get('testCategory');
  const testLevel = searchParams.get('testLevel');

  const navigate = useNavigate();
  const { notify } = useNotification();

  const [qsnSet, setQsnSet] = useState<QuestionItem[]>([]);
  const [currentQsnNo, setCurrentQsnNo] = useState(0);
  const [selectedOption, setSelectedOption] = useState<QuizOptionKey | null>(null);

  const [noticeSeconds, setNoticeSeconds] = useState(14);
  const [startEnabled, setStartEnabled] = useState(false);
  const [examStarted, setExamStarted] = useState(false);

  const [timerDisplay, setTimerDisplay] = useState('01:30:00');
  const [timerDanger, setTimerDanger] = useState(false);

  const examIntervalRef = useRef<number | null>(null);
  const qsnSetRef = useRef<QuestionItem[]>([]);
  const currentQsnNoRef = useRef(0);
  const selectedOptionRef = useRef<QuizOptionKey | null>(null);

  qsnSetRef.current = qsnSet;
  currentQsnNoRef.current = currentQsnNo;
  selectedOptionRef.current = selectedOption;

  useEffect(() => {
    if (!testCategory || !testLevel) {
      navigate('/main', { replace: true });
      return;
    }

    let cancelled = false;

    quizService
      .fetchQuestions(testCategory, testLevel)
      .then((data) => {
        if (cancelled) return;
        const initialized = data.map((q) => ({
          ...q,
          checked: false,
          userAnswer: null,
        }));
        setQsnSet(initialized);
      })
      .catch(() => {
        if (cancelled) return;
        notify('Questions not found! Try again later!!', 'red');
        window.setTimeout(() => {
          navigate('/main');
        }, 2000);
      });

    return () => {
      cancelled = true;
    };
  }, [testCategory, testLevel, navigate, notify]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNoticeSeconds((prev) => {
        if (prev <= 0) {
          window.clearInterval(timer);
          setStartEnabled(true);
          return -1;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (examIntervalRef.current) {
        window.clearInterval(examIntervalRef.current);
      }
    };
  }, []);

  const exitFullScreen = useCallback(() => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    setExamStarted(false);
  }, []);

  const calculateAndSubmitScore = useCallback(async () => {
    if (examIntervalRef.current) {
      window.clearInterval(examIntervalRef.current);
    }

    const updatedSet = [...qsnSetRef.current];
    const idx = currentQsnNoRef.current;
    if (updatedSet[idx] && selectedOptionRef.current !== null && !updatedSet[idx].userAnswer) {
      updatedSet[idx] = {
        ...updatedSet[idx],
        userAnswer: selectedOptionRef.current,
        checked: true,
      };
    }

    let correctAnswerCount = 0;
    let unattemptedCount = 0;

    updatedSet.forEach((q) => {
      if (q.userAnswer) {
        if (q.userAnswer === q.ans) {
          correctAnswerCount++;
        }
      } else {
        unattemptedCount++;
      }
    });

    const wrongAnswerCount = updatedSet.length - (correctAnswerCount + unattemptedCount);

    exitFullScreen();

    try {
      await quizService.submitReport({
        category: testCategory || undefined,
        level: testLevel || undefined,
        correctAnswerCount,
        wrongAnswerCount,
        unattemptedCount,
      });

      navigate('/report', {
        state: {
          correctAnswerCount,
          wrongAnswerCount,
          unattemptedCount,
        },
      });
    } catch {
      notify('Something went wrong, Try again later', 'red');
    }
  }, [exitFullScreen, navigate, notify, testCategory, testLevel]);

  const startTimer = useCallback(() => {
    const remainingTime = TEST_DURATION_MINUTES * 60 * 1000;
    const countDownDate = new Date().getTime() + remainingTime;

    examIntervalRef.current = window.setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        if (examIntervalRef.current) {
          window.clearInterval(examIntervalRef.current);
        }
        calculateAndSubmitScore();
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimerDisplay(
        `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${
          seconds < 10 ? '0' : ''
        }${seconds}`
      );

      if (distance < 2 * 60 * 1000) {
        setTimerDanger(true);
      }
    }, 1000);
  }, [calculateAndSubmitScore]);

  const handleStartClick = () => {
    if (!startEnabled) return;

    if (qsnSet.length === 0) {
      notify('Questions not found! Try again later!!', 'red');
      return;
    }

    Swal.fire({
      title: 'Alert!',
      text: 'You are about to enter full screen mode!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, start test',
    }).then((result) => {
      if (result.isConfirmed) {
        const elem = document.documentElement;
        if (!document.fullscreenElement && elem.requestFullscreen) {
          elem.requestFullscreen().catch(() => {});
        }
        setExamStarted(true);
        setSelectedOption(null);
        startTimer();
      }
    });
  };

  const handleNext = () => {
    setQsnSet((prev) =>
      prev.map((q, idx) =>
        idx === currentQsnNo
          ? { ...q, userAnswer: selectedOption, checked: true }
          : q
      )
    );

    if (currentQsnNo >= qsnSet.length - 1) {
      notify('This is the last question!', 'orange');
      return;
    }

    setCurrentQsnNo((prev) => prev + 1);
    setSelectedOption(null);
  };

  const handleSubmitTest = () => {
    Swal.fire({
      title: 'Alert!',
      text: 'Do you really want to submit the test?',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: '#357cb4',
      confirmButtonText: 'Yes, End test',
    }).then((result) => {
      if (result.isConfirmed) {
        calculateAndSubmitScore();
      }
    });
  };

  const currentQuestion = qsnSet[currentQsnNo];
  const formattedStartLabel =
    startEnabled || noticeSeconds < 0
      ? 'Start'
      : noticeSeconds < 10
      ? `00:0${noticeSeconds}`
      : `00:${noticeSeconds}`;

  const capitalize = (val?: string) =>
    val ? val.charAt(0).toUpperCase() + val.slice(1) : '';

  return (
    <div className="page-quiz">
      <MainNavbar hidden={examStarted} />

      <div className={`nc-main ${examStarted ? 'main-hidden' : 'main-visible'}`}>
        <section className={`notice-container ${examStarted ? 'nc-hidden' : 'nc-visible'}`}>
          <h1 className="heading">Note</h1>
          <ul className="instructions">
            <li>
              You must only attempt this exam once. Any additional attempts should only be used in
              the event where a serious technical issue has occurred and supporting evidence
              supporting this will be required.
            </li>
            <li>
              You are not permitted to obtain assistance by improper means or ask for help from or
              give help to any other person.
            </li>
            <li>
              You are not permitted to take screenshots, record the screen, copy and paste
              questions or answers or otherwise attempt to take any of the content of this exam
              out of the exam for any purpose.
            </li>
            <li>
              You are not permitted to post any requests for clarification of exam content. Answer
              all questions to the best of your ability and perception of the questions intent,
              make reasonable assumptions if necessary, to answer all questions. UTS assessments
              never apply negative marking techniques.
            </li>
            <li>Misconduct action will be taken against you if you breach portal rules.</li>
          </ul>
          <button
            type="button"
            className={`start-btn ${startEnabled ? 'start-enable' : ''}`}
            onClick={handleStartClick}
          >
            {formattedStartLabel}
          </button>
        </section>
      </div>

      <div className={`qsns-main ${examStarted ? 'main-visible' : 'main-hidden'}`}>
        <div className="qsn-nav">
          <div className="category">{capitalize(currentQuestion?.category || testCategory || 'Aptitude')}</div>
          <em className="level-type">{capitalize(currentQuestion?.level || testLevel || 'Easy')}</em>
          <div className="timer" style={timerDanger ? { color: 'red' } : undefined}>
            {timerDisplay}
          </div>
          <button type="button" id="end-test" onClick={handleSubmitTest}>
            Submit test
          </button>
        </div>

        <div className="qsn-container">
          <div className="qsn">
            <span className="qsn-no">Q. </span>
            {currentQuestion?.qsn}
          </div>

          <div className="options">
            {(
              [
                { cls: 'opt1', id: 'option1', key: 'a', text: currentQuestion?.a },
                { cls: 'opt2', id: 'option2', key: 'b', text: currentQuestion?.b },
                { cls: 'opt3', id: 'option3', key: 'c', text: currentQuestion?.c },
                { cls: 'opt4', id: 'option4', key: 'd', text: currentQuestion?.d },
              ] as const
            ).map((opt) => (
              <div
                key={opt.id}
                className={opt.cls}
                onClick={() => setSelectedOption(opt.key)}
              >
                <input
                  type="radio"
                  name="option"
                  className="option"
                  id={opt.id}
                  checked={selectedOption === opt.key}
                  onChange={() => setSelectedOption(opt.key)}
                />
                <label htmlFor={opt.id} className={opt.id}>
                  {opt.text}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="below-nav">
          <button
            type="button"
            id="clear-btn"
            className="below-btn"
            onClick={() => setSelectedOption(null)}
          >
            Clear selection
          </button>
          <button type="button" id="next-btn" className="below-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>

      <NotificationToast />
    </div>
  );
};
