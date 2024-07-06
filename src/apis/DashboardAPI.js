// DashboardAPI.js
import axios from 'axios';

const baseURL = 'http://localhost:8080/dashboard';

export const fetchMonthlyHoneyCount = async () => {
  const response = await axios.get(`${baseURL}/monthly-honey-count`);
  return response.data.monthlyHoneyCount;
};

export const fetchGenreHoneyCount = async () => {
  const response = await axios.get(`${baseURL}/genre-honey-count`);
  return response.data.genreHoneyCount;
};

export const fetchTodayMatchingCount = async () => {
  const response = await axios.get(`${baseURL}/today-matching-count`);
  return response.data.todayMatchingCount;
};

export const fetchTotalMatchingCount = async () => {
  const response = await axios.get(`${baseURL}/total-matching-count`);
  return response.data.totalMatchingCount;
};

export const fetchTodayInquiryCount = async () => {
  const response = await axios.get(`${baseURL}/today-inquiry-count`);
  return response.data.todayInquiryCount;
};

export const fetchTotalInquiryCount = async () => {
  const response = await axios.get(`${baseURL}/total-inquiry-count`);
  return response.data.totalInquiryCount;
};

export const fetchTodayHoneyCount = async () => {
  const response = await axios.get(`${baseURL}/today-honey-count`);
  return response.data.todayHoneyCount;
};

export const fetchTotalReportCount = async () => {
  const response = await axios.get(`${baseURL}/total-report-count`);
  return response.data.totalReportCount;
};

export const fetchTodayReportCount = async () => {
  const response = await axios.get(`${baseURL}/today-report-count`);
  return response.data.todayReportCount;
};

export const fetchReportData = async () => {
  const response = await axios.get(`${baseURL}/reports`);
  return response.data.reports;
};

export const fetchInquiryData = async () => {
  const response = await axios.get(`${baseURL}/inquiries`);
  return response.data.inquiries;
};

export const fetchNotices = async () => {
  const response = await axios.get(`${baseURL}/notices`);
  return response.data.notices;
};

export const fetchDashboardData = async () => {
  const sampleMonthlyHoneyCount = [
    { month: '04월', honey_count: 6 },
    { month: '05월', honey_count: 8 },
    { month: '06월', honey_count: 10 },
  ];
  const sampleGenreHoneyCount = [
    { genre: '행사/축제', honey_count: 4 },
  ];

  try {
    const [
      monthlyHoneyCount,
      genreHoneyCount,
      todayMatchingCount,
      totalMatchingCount,
      todayInquiryCount,
      totalInquiryCount,
      todayHoneyCount,
      totalReportCount,
      todayReportCount,
      reportData,
      inquiryData,
      notices,
    ] = await Promise.all([
      fetchMonthlyHoneyCount(),
      fetchGenreHoneyCount(),
      fetchTodayMatchingCount(),
      fetchTotalMatchingCount(),
      fetchTodayInquiryCount(),
      fetchTotalInquiryCount(),
      fetchTodayHoneyCount(),
      fetchTotalReportCount(),
      fetchTodayReportCount(),
      fetchReportData(),
      fetchInquiryData(),
      fetchNotices(),
    ]);

    return {
      monthlyHoneyCount: [...monthlyHoneyCount, ...sampleMonthlyHoneyCount].sort((a, b) => parseInt(a.month) - parseInt(b.month)),
      genreHoneyCount: [...genreHoneyCount, ...sampleGenreHoneyCount],
      todayMatchingCount,
      totalMatchingCount,
      todayInquiryCount,
      totalInquiryCount,
      todayHoneyCount,
      totalReportCount,
      todayReportCount,
      reportData,
      inquiryData,
      notices,
    };
  } catch (error) {
    console.error("There was an error fetching the dashboard data!", error);
    throw error;
  }
};
