import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import GlobalStyles from './styles/GlobalStyles';
import LoginPage from './pages/login/LoginPage';
import SignUpPage from './pages/login/SignUp';
import MyPage from './pages/mypage/MyPage';
import Cs from './pages/serviceCenter/Cs';
import Faq from './pages/serviceCenter/Faq';
import Notice from './pages/serviceCenter/Notice';
import Inquiry from './pages/serviceCenter/Inquiry';
import Main from './pages/main/samaple';
import HoneyLayout from './layouts/HoneyLayout';
import Today from './pages/socializing/Today';
import Genre from './pages/socializing/Genre';
import Date from './pages/socializing/Date';
import CultureInfo from './pages/cultureInfo/CultureInfo';
import CompletedPage from './pages/login/CompletedPage'


export default function App() {

    return (
   <>      
    <GlobalStyles/>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
            
            </Route>                
          </Routes>
      </BrowserRouter>
     </>
    );
}