import React, { useState } from 'react';
import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
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
import '../src/pages/Home/Dashboard.css';
import '../src/pages/Customer/Customerdetail.css';
import '../src/pages/Honeypot/Honeypotdetail.css';
import './pages/EventsInfo/EventsDetail.css'
import GlobalStyles from './styles/GlobalStyles';
import Layout from './layouts/Layout'; // Layout 경로 추가
import Login from './components/admin/Login';
import NoticeRegistPage from './pages/Notice/NoticeRegist';
import ScrollToTop from './components/admin/ScrolltoTop';

export default function App() {
  const [user, setUser] = useState(null); // 사용자 정보 상태

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
      <ScrollToTop />
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
                  <Route path="inquiry" element={<Inquiry />} />
                  <Route path="events" element={<Events />} />
                  <Route path="events/:id" element={<EventsDetail/>} />
                  <Route path='noticeregist' element={<NoticeRegistPage/>}/>
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}