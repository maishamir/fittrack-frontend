import React from "react";
import logo from "../../assets/fitTrack-logo.png";
import "./Header.scss"

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="" />
      <h1>FitTrack</h1>
    </header>
  );
}

export default Header;
