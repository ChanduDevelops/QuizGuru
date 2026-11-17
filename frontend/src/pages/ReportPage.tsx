import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { MainNavbar } from '../components/layout/MainNavbar';
import { Footer } from '../components/common/Footer';
import { NotificationToast } from '../components/common/NotificationToast';
import { quizService } from '../services/quizService';
import { ReportData } from '../types/quiz.types';
import '../styles/nav.css';
import '../styles/report.css';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

export const ReportPage: React.FC = () => {
  const location = useLocation();
  const stateData = location.state as ReportData | null;

  const [report, setReport] = useState<ReportData>({
    correctAnswerCount: stateData?.correctAnswerCount ?? 0,
    wrongAnswerCount: stateData?.wrongAnswerCount ?? 0,
    unattemptedCount: stateData?.unattemptedCount ?? 0,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (stateData) {
      setReport(stateData);
      return;
    }

    quizService
      .getLatestReport()
      .then((data) => {
        setReport(data);
      })
      .catch(() => { });
  }, [stateData]);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: ['correct answers', 'wrong answers', 'not attempted'],
        datasets: [
          {
            label: '',
            data: [
              report.correctAnswerCount,
              report.wrongAnswerCount,
              report.unattemptedCount,
            ],
            borderColor: '#3f4653',
            backgroundColor: ['green', 'red', 'yellow'],
            borderWidth: 1,
            borderRadius: 2
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [report]);

  const totalQuestions =
    report.correctAnswerCount + report.wrongAnswerCount + report.unattemptedCount;

  let endMessage = '--- You performed well !! ---';
  if (totalQuestions > 0) {
    if (report.correctAnswerCount >= 0.75 * totalQuestions) {
      endMessage = '--- You nailed it !! ---';
    } else if (report.correctAnswerCount <= 0.3 * totalQuestions) {
      endMessage = '--- Better luck next time ---';
    } else {
      endMessage = '--- You performed well !! ---';
    }
  }

  return (
    <div className="page-report">
      <MainNavbar />
      <main className="main">
        <section className="report-container">
          <h1 className="report-heading">Analysis Report</h1>
          <div className="graph">
            <div className="pie-chart">
              <canvas id="myChart" ref={canvasRef}></canvas>
            </div>
            <div className="report-section">
              <p className="correct-ans">
                <span className="icon green">&#10004;</span>
                Correct answers
                <span className="count" id="crt-cnt">
                  {report.correctAnswerCount}
                </span>
              </p>
              <p className="wrong-ans">
                <span className="icon red">&#10006;</span>
                Wrong answers
                <span className="count" id="wrng-cnt">
                  {report.wrongAnswerCount}
                </span>
              </p>
              <p className="un-ans">
                <i className="fa fa-question icon yellow"></i>
                Not answered
                <span className="count" id="unans-cnt">
                  {report.unattemptedCount}
                </span>
              </p>
            </div>
          </div>
          <div className="end-msg">{endMessage}</div>
        </section>

        <NotificationToast />
      </main>
      <Footer />
    </div>
  );
};
