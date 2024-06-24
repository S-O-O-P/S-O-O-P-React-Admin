import React from 'react';
import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Home/Dashboard';
import Customer from './pages/Customer/Customer';
import CustomerDetail from './pages/Customer/Customerdetail';
import Honeypot from './pages/Honeypot/Honeypot';
import HoneypotDetail from './pages/Honeypot/Honeypotdetail';
import Notice from './pages/Notice/Notice';
import Inquiry from './pages/Inquiry/Inquiry';
import Events from './pages/EventsInfo/Events';
import EventsDetail from './pages/EventsInfo/EventsDetail';
import '../src/pages/Home/Dashboard.css';
import '../src/pages/Customer/Customer.css';
import '../src/pages/Customer/Customerdetail.css';
import '../src/pages/Honeypot/Honeypot.css';
import '../src/pages/Honeypot/Honeypotdetail.css';
import '../src/pages/Notice/Notice.css';
import '../src/pages/Inquiry/Inquiry.css';
import './pages/EventsInfo/Events.css';
import './pages/EventsInfo/EventsDetail.css'
import { GlobalStyles } from '@mui/material';
import Layout from './layouts/Layout'; // Layout 경로 추가

export default function App() {
    return (
      <>      
        <GlobalStyles/>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="/home" element={<Dashboard />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/customer/:id" element={<CustomerDetail />} />
              <Route path='/honeypot' element={<Honeypot />} />
              <Route path="/honeypot/:no" element={<HoneypotDetail />} />
              <Route path='/notice' element={<Notice/>} />
              <Route path='/inquiry' element={<Inquiry/>} />
              <Route path='/events' element={<Events/>} />
              <Route path="/events/:id" element={<EventsDetail />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </>
    );
}
