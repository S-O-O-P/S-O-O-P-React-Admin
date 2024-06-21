import { Outlet } from 'react-router-dom';
import Sidebar from '../components/commons/Sidebar';


export default function Layout(){

    return(
        <>
            <Sidebar/>
            <Outlet/>
        </>
    );
}