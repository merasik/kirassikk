
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Page, UserProfile, Mentor, University } from '../types';

interface AppContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  user: UserProfile | null;
  login: (user: UserProfile) => void;
  logout: () => void;
  updateUser: (data: Partial<UserProfile>) => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);


  const login = (userData: UserProfile) => {
    setUser(userData);
    setCurrentPage(Page.Profile); 
    setIsLoginModalOpen(false);
  };
  
  const logout = () => {
    setUser(null);
    setCurrentPage(Page.Home);
  };

  const updateUser = (data: Partial<UserProfile>) => {
    setUser(prevUser => prevUser ? { ...prevUser, ...data } : null);
  };
  
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <AppContext.Provider value={{ currentPage, setCurrentPage, user, login, logout, updateUser, isLoginModalOpen, openLoginModal, closeLoginModal }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
