import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { MainNavbar } from '../components/layout/MainNavbar';
import { Footer } from '../components/common/Footer';
import { NotificationToast } from '../components/common/NotificationToast';
import { useNotification } from '../context/NotificationContext';
import { contactService } from '../services/contactService';
import '../styles/nav.css';
import '../styles/form.css';
import '../styles/contactus.css';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const { notify } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await contactService.submitMessage({
        name,
        phone,
        email,
        subject,
        message,
      });

      if (response.success) {
        notify('message sent successfully!', 'green');
        Swal.fire({
          title: 'Success',
          text: 'Message sent successfully!',
          icon: 'success',
        });
        setName('');
        setPhone('');
        setEmail('');
        setSubject('');
        setMessage('');
      }
    } catch {
      notify('Something went wrong! Please try again', 'red');
    }
  };

  return (
    <div className="page-contact">
      <MainNavbar />
      <main className="main">
        <section className="contact" id="contact">
          <h2 className="heading">Contact Us</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-boxes">
              <div className="input-box">
                <div className="input-field">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    autoComplete="off"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <input
                    type="number"
                    maxLength={10}
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    autoComplete="off"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-box">
                <div className="input-field">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="off"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Email Subject"
                    autoComplete="off"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="textarea-field">
              <textarea
                name="message"
                id="message"
                cols={30}
                rows={10}
                placeholder="Your Message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <div className="btn-box">
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
        </section>

        <NotificationToast />
      </main>
      <Footer />
    </div>
  );
};
