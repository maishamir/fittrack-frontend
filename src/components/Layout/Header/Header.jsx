import React, { useEffect } from "react";
import logo from "../../../assets/fitTrack-logo.png";
import "./Header.scss"
import { useNavigate } from "react-router-dom";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { useUser } from "@clerk/react";
import { createUser } from "../../../api/users";

function Header() {
  const navigate = useNavigate();
  const { user } = useUser();
  useEffect(() => {
    if (!user) {
      return;
    }
    async function createNewUser() {

      const userData = {
        id: user?.id,
        email: user?.emailAddresses[0].emailAddress,
        firstName: user?.firstName,
        lastName: user?.lastName,
      }
      const response = await createUser(userData);
    }
    createNewUser();
  }, [user])
  return (
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
