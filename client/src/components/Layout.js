import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen bg-purple-100'>
      {/* Header */}
      <Header />

      {/* Page Content */}
      <div className="container mx-auto p-4 flex-grow">
        {children}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
