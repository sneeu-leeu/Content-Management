import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-4" style={{ position: 'fixed', bottom: 0, width: '100%', textAlign: 'center' }}>
      <div className="container p-4">
        &copy; {new Date().getFullYear()} CORSAIR.DELIVERY
      </div>
    </footer>
  );
};

export default Footer;