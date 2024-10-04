import React from 'react';
import './Header.css';
function Header() {
  return (
    <div className="container">
    <header className="head">
      <img src="https://itai.escet.online/SCETLogo.jpg" alt="Left Logo" className="logo logo-left" />
      <div className="header-text">
        <h1>Sarvajanik College of Engg. & Tech.</h1>
        <h2>Artifical Intelligence and Data Science</h2>
      </div>
      <img src="https://itai.escet.online/SULogo.jpg" alt="Right Logo" className="logo logo-right" />
    </header>
    <div className="main-content"></div>
  </div>
  );
}

export default Header;