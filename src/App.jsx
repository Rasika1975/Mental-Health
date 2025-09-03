import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import ChatbotPage from './pages/ChatbotPage';
import ScreeningPage from './pages/ScreeningPage';
import ResourcesPage from './pages/ResourcesPage';
import ForumPage from './pages/ForumPage';
import BookingPage from './pages/BookingPage';
import CounselorDashboard from './pages/CounselorDashboard';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes with Main Layout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
            <Route path="/screening" element={<ScreeningPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/booking" element={<BookingPage />} />
          </Route>

          {/* Dashboard Routes with Dashboard Layout */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="counselor" element={<CounselorDashboard />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;