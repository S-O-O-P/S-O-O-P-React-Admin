import React from 'react';
import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Home/Dashboard';
import Customer from './pages/Customer/Customer';
import CustomerDetail from './pages/Customer/Customerdetail';
import Honeypot from './pages/Honeypot/Honeypot';
import HoneypotDetail from './pages/Honeypot/Honeypotdetail';
import Inquiry from './pages/Customer/Inquiry';
import '../src/pages/Home/Dashboard.css';
import '../src/pages/Customer/Customer.css';
import '../src/pages/Customer/Customerdetail.css';
import '../src/pages/Honeypot/Honeypot.css';
import '../src/pages/Honeypot/Honeypotdetail.css';
import { GlobalStyles } from '@mui/material';
import Sidebar from './components/commons/Sidebar';
export default function App() {

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', height: '100%' }}>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="/home" element={<Dashboard />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/customer/:id" element={<CustomerDetail />} />
              <Route path='/honeypot' element={<Honeypot />} />
              <Route path="/honeypot/:no" element={<HoneypotDetail />} />
              <Route path='/inquiryanswer' element={<Inquiry />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}