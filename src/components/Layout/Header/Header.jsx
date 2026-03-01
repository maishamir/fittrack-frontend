import React from "react";
import logo from "../../../assets/fitTrack-logo.png";
import "./Header.scss"
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <img src={logo} alt="FitTrack Logo" onClick={() => navigate('/')} />
      <h1 onClick={() => navigate('/')}>FitTrack</h1>
    </header>
  );
}

export default Header;
