// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Home/Dashboard';
import Customer from './pages/Customer/Customer';
import CustomerDetail from './pages/Customer/Customerdetail';
import Honeypot from './pages/Honeypot/Honeypot';
import HoneypotDetail from './pages/Honeypot/Honeypotdetail';
import InquiryAnswer from './pages/Inquiry/InquiryAnswer';
import Notice from './pages/Notice/Notice';
import Inquiry from './pages/Inquiry/Inquiry';
import Events from './pages/EventsInfo/Events';
import EventsDetail from './pages/EventsInfo/EventsDetail';
import GlobalStyles from './styles/GlobalStyles';
import Layout from './layouts/Layout';
import Login from './components/admin/Login';
import NoticeDetail from './pages/Notice/NoticeDetail';
import ScrollToTop from './components/admin/ScrolltoTop';
import ErrorBoundary from './components/admin/ErrorBoundary';


export default function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <GlobalStyles />
      <Router>
        <ScrollToTop />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route
              path="/*"
              element={
                <Layout user={user}>
                  <Routes>
                    <Route path="home" element={<Dashboard />} />
                    <Route path="customer" element={<Customer />} />
                    <Route path="customer/:userCode" element={<CustomerDetail />} />
                    <Route path="honeypot" element={<Honeypot />} />
                    <Route path="honeypot/:honeypotCode" element={<HoneypotDetail />} />
                    <Route path="inquiry/:inquiryCode" element={<InquiryAnswer />} />
                    <Route path="notice" element={<Notice />} />
                    <Route path="notice/:id" element={<NoticeDetail />} />
                    <Route path="inquiry" element={<Inquiry />} />
                    <Route path="events" element={<Events />} />
                    <Route path="events/:id" element={<EventsDetail />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
        </ErrorBoundary>
      </Router>
    </>
  );
}
