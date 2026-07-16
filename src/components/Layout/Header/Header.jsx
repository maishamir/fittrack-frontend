import React from "react";
import logo from "../../../assets/fitTrack-logo.png";
import "./Header.scss"
import { useNavigate } from "react-router-dom";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

function Header() {
  const navigate = useNavigate();
  return (
    // <header className="header">
    //   <img src={logo} alt="FitTrack Logo" onClick={() => navigate('/')} />
    //   <h1 onClick={() => navigate('/')}>FitTrack</h1>
    // </header>
    <header className="header">
      <div className="header__content">
        <img src={logo} alt="FitTrack Logo" onClick={() => { navigate('/') }} />
        <h1 onClick={() => navigate('/')}>FitTrack</h1>
      </div>

      <div className="header__auth">
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </header>
  );
}

export default Header;
