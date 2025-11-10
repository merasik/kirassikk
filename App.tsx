import React from 'react';
import { useAppContext } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import DatabasePage from './pages/DatabasePage';
import ProfilePage from './pages/ProfilePage';
import OnboardingPage from './pages/OnboardingPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutUsPage from './pages/AboutUsPage';
import ForumPage from './pages/ForumPage';
import ParentsPage from './pages/ParentsPage';
import LoginModal from './components/LoginModal';
import { Page } from './types';

const App: React.FC = () => {
  const { currentPage, user, isLoginModalOpen, closeLoginModal } = useAppContext();

  const renderPage = () => {
    if (!user && (currentPage === Page.Profile || currentPage === Page.Portfolio)) {
        return <OnboardingPage />;
    }

    switch (currentPage) {
      case Page.Home:
        return <HomePage />;
      case Page.Course:
        return <CoursePage />;
      case Page.Database:
        return <DatabasePage />;
      case Page.Profile:
        return <ProfilePage />;
      case Page.Onboarding:
        return <OnboardingPage />;
      case Page.Portfolio:
        return <PortfolioPage />;
      case Page.About:
        return <AboutUsPage />;
      case Page.Parents:
        return <ParentsPage />;
      case Page.Forum:
        return <ForumPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F7F9FC] text-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      <Footer />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
};

export default App;