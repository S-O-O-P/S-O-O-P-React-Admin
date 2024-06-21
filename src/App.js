import React from 'react';
import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Home/Dashboard';
import Customer from './pages/Customer/Customer';
import CustomerDetail from './pages/Customer/Customerdetail';
import Honeypot from './pages/Honeypot/Honeypot';
import HoneypotDetail from './pages/Honeypot/Honeypotdetail';
import '../src/pages/Home/Dashboard.css';
import '../src/pages/Customer/Customer.css';
import '../src/pages/Customer/Customerdetail.css';
import '../src/pages/Honeypot/Honeypot.css';
import '../src/pages/Honeypot/Honeypotdetail.css';
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
            </Routes>
          </Layout>
        </BrowserRouter>
      </>
    );
}
