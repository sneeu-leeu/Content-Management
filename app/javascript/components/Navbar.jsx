import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-4">
      <Link className="navbar-brand" to="/">CORSAIR.DELIVERY</Link>
    </nav>
  );
};

export default Navbar;