import React, { useState, useEffect } from 'react';
import CustomerTable from '../../components/admin/CustomerTable';
import { useNavigate, useLocation } from 'react-router-dom';

function Customer() {
  const members = [
    { id: 'user001', nickname: 'userone', gender: '남', email: 'userone@gmail.com', date: '2024-06-23' },
    { id: 'user002', nickname: 'usertwo', gender: '여', email: 'usertwo@gmail.com', date: '2024-06-23' },
    { id: 'user003', nickname: 'userthree', gender: '남', email: 'userthree@gmail.com', date: '2024-06-23' },
    { id: 'user004', nickname: 'userfour', gender: '여', email: 'userfour@gmail.com', date: '2024-06-23' },
    { id: 'user005', nickname: 'userfive', gender: '남', email: 'userfive@gmail.com', date: '2024-06-23' },
    { id: 'user006', nickname: 'usersix', gender: '여', email: 'usersix@gmail.com', date: '2024-06-23' },
    { id: 'user007', nickname: 'userseven', gender: '남', email: 'userseven@gmail.com', date: '2024-06-23' },
    { id: 'user008', nickname: 'usereight', gender: '여', email: 'usereight@gmail.com', date: '2024-06-23' },
    { id: 'user001', nickname: 'userone', gender: '남', email: 'userone@gmail.com', date: '2024-06-23' },
    { id: 'user002', nickname: 'usertwo', gender: '여', email: 'usertwo@gmail.com', date: '2024-06-23' },
    { id: 'user003', nickname: 'userthree', gender: '남', email: 'userthree@gmail.com', date: '2024-06-23' },
    { id: 'user004', nickname: 'userfour', gender: '여', email: 'userfour@gmail.com', date: '2024-06-23' },
    { id: 'user001', nickname: 'userone', gender: '남', email: 'userone@gmail.com', date: '2024-06-23' },
    { id: 'user002', nickname: 'usertwo', gender: '여', email: 'usertwo@gmail.com', date: '2024-06-23' },
    { id: 'user003', nickname: 'userthree', gender: '남', email: 'userthree@gmail.com', date: '2024-06-23' },
    { id: 'user004', nickname: 'userfour', gender: '여', email: 'userfour@gmail.com', date: '2024-06-23' },
    { id: 'user001', nickname: 'userone', gender: '남', email: 'userone@gmail.com', date: '2024-06-23' },
    { id: 'user002', nickname: 'usertwo', gender: '여', email: 'usertwo@gmail.com', date: '2024-06-23' },
    { id: 'user003', nickname: 'userthree', gender: '남', email: 'userthree@gmail.com', date: '2024-06-23' },
    { id: 'user004', nickname: 'userfour', gender: '여', email: 'userfour@gmail.com', date: '2024-06-23' },
    { id: 'user001', nickname: 'userone', gender: '남', email: 'userone@gmail.com', date: '2024-06-23' },
    { id: 'user002', nickname: 'usertwo', gender: '여', email: 'usertwo@gmail.com', date: '2024-06-23' },
    { id: 'user003', nickname: 'userthree', gender: '남', email: 'userthree@gmail.com', date: '2024-06-23' },
    { id: 'user004', nickname: 'userfour', gender: '여', email: 'userfour@gmail.com', date: '2024-06-23' },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  // Get the current page number from the URL query parameters
  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('page') || '1', 10);

  const [page, setPage] = useState(currentPage);
  const rowsPerPage = 5;

  const handlePageChange = (event, value) => {
    setPage(value);
    if (value === 1) {
      navigate('/customer');
    } else {
      navigate(`/customer?page=${value}`);
    }
  };

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <CustomerTable
      members={members}
      page={page}
      rowsPerPage={rowsPerPage}
      handlePageChange={handlePageChange}
    />
  );
}

export default Customer;
