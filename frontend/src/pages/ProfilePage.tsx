import React, { useEffect, useState } from 'react';
import { MainNavbar } from '../components/layout/MainNavbar';
import { Footer } from '../components/common/Footer';
import { NotificationToast } from '../components/common/NotificationToast';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { userService } from '../services/userService';
import { UserProfile } from '../types/auth.types';
import '../styles/nav.css';
import '../styles/profile.css';

export const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const { notify } = useNotification();

    const [profile, setProfile] = useState<UserProfile>({
        username: user?.username ?? '',
        email: user?.email ?? '',
        role: user?.role ?? 'ROLE_USER',
        totalQuizzesTaken: 0,
        recentReports: [],
    });

    useEffect(() => {
        userService
            .getProfile()
            .then((data) => setProfile(data))
            .catch(() => {
                notify('Could not load full profile details', 'red');
            });
    }, [notify]);

    const roleLabel = profile.role === 'ROLE_ADMIN' ? 'Admin' : 'Student';

    return (
        <div className="page-profile">
        <MainNavbar />
        <main className="main">
        <section className="profile-container">
        <div className="profile-header">
        <i className="fa fa-user-circle-o avatar-icon"></i>
            <div className="user-meta">
    <h1>{profile.username}</h1>
    <p>
    <i className="fa fa-envelope"></i> {profile.email}
        </p>
        <span className="role-badge">{roleLabel}</span>
        </div>
        </div>

        <div className="stats-row">
    <div className="stat-card">
    <div className="stat-label">Total Quizzes Taken</div>
    <div className="stat-value">{profile.totalQuizzesTaken}</div>
    </div>
    </div>

    <div>
    <h2 className="history-heading">Recent Quiz Attempts</h2>
    {profile.recentReports.length === 0 ? (
        <p className="empty-history">No quizzes attempted yet.</p>
    ) : (
        <table className="history-table">
            <thead>
                <tr>
                    <th>Category</th>
            <th>Level</th>
            <th>Correct</th>
            <th>Wrong</th>
            <th>Unattempted</th>
            <th>Date</th>
            </tr>
            </thead>
            <tbody>
            {profile.recentReports.map((report, index) => (
                    <tr key={report.id ?? index}>
                        <td>{report.category ?? '-'}</td>
                        <td>{report.level ?? '-'}</td>
                        <td>{report.correctAnswerCount}</td>
                        <td>{report.wrongAnswerCount}</td>
                        <td>{report.unattemptedCount}</td>
                        <td>
                        {report.submittedAt
                                ? new Date(report.submittedAt).toLocaleDateString()
                                : '-'}
                        </td>
                        </tr>
                ))}
            </tbody>
            </table>
    )}
    </div>
    </section>

    <NotificationToast />
    </main>
    <Footer />
    </div>
);
};