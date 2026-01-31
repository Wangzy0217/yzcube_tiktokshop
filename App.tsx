import React, { useState } from 'react';
import Header from './components/Header';
import DashboardHeader from './components/DashboardHeader';
import LoginCard from './components/LoginCard';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ManageProducts from './components/ManageProducts';
import AddProducts from './components/AddProducts';
import ProductEditor from './components/ProductEditor';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  // Simple state to simulate login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState('Homepage');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'Homepage':
        return <Dashboard />;
      case 'Manage products':
        return <ManageProducts />;
      case 'Add products':
        return <AddProducts onNavigate={setActivePage} />;
      case 'ProductEditor':
        return <ProductEditor onCancel={() => setActivePage('Add products')} />;
      default:
        // Default to Dashboard if page isn't implemented yet, or show a placeholder
        return <Dashboard />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#f8f8f8] flex flex-col">
        {!isLoggedIn ? (
          <>
            <Header />
            <main className="flex-1 flex justify-center w-full">
              <LoginCard onLogin={handleLogin} />
            </main>
          </>
        ) : (
          <>
            <DashboardHeader />
            <div className="flex flex-1 overflow-hidden">
               <Sidebar activePage={activePage} onNavigate={setActivePage} />
               <main className="flex-1 flex flex-col overflow-y-auto custom-scrollbar h-[calc(100vh-60px)]">
                 {renderContent()}
               </main>
            </div>
          </>
        )}
      </div>
    </LanguageProvider>
  );
};

export default App;