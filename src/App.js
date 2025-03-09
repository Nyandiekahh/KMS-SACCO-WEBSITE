import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, SignedIn, SignedOut } from '@clerk/clerk-react';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import MembershipPage from './pages/MembershipPage';
import ContactPage from './pages/ContactPage';
import LoanApplicationPage from './pages/LoanApplicationPage';
import DashboardPage from './pages/DashboardPage';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  
  if (!isLoaded) {
    // You can show a loading spinner here
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  if (!isSignedIn) {
    // Redirect to homepage if not signed in
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App bg-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Public Route - Accessible to everyone */}
            <Route path="/loan-application" element={<LoanApplicationPage />} />
            
            {/* Protected Route - Only for authenticated users */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;