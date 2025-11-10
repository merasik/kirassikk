import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Page } from '../types';

const Header: React.FC = () => {
  const { currentPage, setCurrentPage, user, logout, openLoginModal } = useAppContext();

  const navLinkClasses = (page: Page) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
      currentPage === page
        ? 'bg-[#4285F4] text-white'
        : 'text-gray-600 hover:bg-blue-100'
    }`;

  return (
    <header className="bg-white/90 backdrop-blur-lg shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage(Page.Home)}>
            <svg className="h-12 w-auto" viewBox="0 0 155 45">
                <text x="0" y="30" fontFamily="sans-serif" fontSize="32" fontWeight="bold" fill="#374151">Uni</text>
                <text x="50" y="30" fontFamily="sans-serif" fontSize="32" fontWeight="bold" fill="#374151">M</text>
                <g>
                    <text x="75" y="30" fontFamily="sans-serif" fontSize="32" fontWeight="bold" fill="#4285F4">A</text>
                    <circle cx="90" cy="18" r="15" stroke="#4285F4" strokeWidth="3" fill="none"/>
                    <line x1="102" y1="30" x2="109" y2="37" stroke="#4285F4" strokeWidth="5" strokeLinecap="round"/>
                </g>
                <g>
                    <text x="115" y="30" fontFamily="sans-serif" fontSize="32" fontWeight="bold" fill="#374151">P</text>
                    {/* The Ray/Sparkle to the North-East of P */}
                    <g transform="translate(138, 8)" fill="#F59E0B">
                        <path d="M 0 -5 L 1.5 -1.5 L 5 0 L 1.5 1.5 L 0 5 L -1.5 1.5 L -5 0 L -1.5 -1.5 Z" />
                    </g>
                </g>
            </svg>
          </div>
          <nav className="hidden md:flex items-center space-x-2 bg-gray-100/80 p-1 rounded-full">
            <button onClick={() => setCurrentPage(Page.About)} className={navLinkClasses(Page.About)}>
              О нас
            </button>
            <button onClick={() => setCurrentPage(Page.Parents)} className={navLinkClasses(Page.Parents)}>
              Родителям
            </button>
            <button onClick={() => setCurrentPage(Page.Forum)} className={navLinkClasses(Page.Forum)}>
              Форум
            </button>
            <button onClick={() => setCurrentPage(Page.Course)} className={navLinkClasses(Page.Course)}>
              Курс
            </button>
            <button onClick={() => setCurrentPage(Page.Database)} className={navLinkClasses(Page.Database)}>
              Университеты
            </button>
          </nav>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button onClick={() => setCurrentPage(Page.Profile)} className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#4285F4] text-white flex items-center justify-center font-bold text-lg">
                        {user.nickname.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline text-gray-700 font-semibold">{user.nickname}</span>
                </button>
                <button onClick={logout} className="text-sm font-medium text-gray-500 hover:text-blue-600">
                    Выйти
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                    onClick={openLoginModal}
                    className="bg-gray-100 text-blue-600 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                    Войти
                </button>
                <button
                  onClick={() => setCurrentPage(Page.Onboarding)}
                  className="bg-[#4285F4] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all shadow-sm"
                >
                  Регистрация
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;