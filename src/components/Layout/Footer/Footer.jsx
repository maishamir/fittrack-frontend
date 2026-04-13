import React, { useState } from "react";
import { Home, Plus, CalendarDays } from "lucide-react";
import "./Footer.scss";
import { useLocation, useNavigate } from "react-router-dom";
function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  let activePage = location.pathname;

  return (
    <footer className="footer">
      <ul className="footer__list">
        <li>
          <div
            className="footer__item"
            onClick={() => {
              navigate("/");
            }}
          >
            <Home
              className={`footer__label ${activePage === "/" ? "footer__icon--active" : ""}`}
            />
            <small
              className={`footer__label ${activePage === "/" ? "footer__label--active" : ""}`}
            >
              Home
            </small>
          </div>
        </li>
        <li>
          <div
            className="footer__item"
            onClick={() => {
              navigate("/calendar");
            }}
          >
            <CalendarDays
              className={`footer__label ${activePage === "/calendar" ? "footer__icon--active" : ""}`}
            />
            <small
              className={`footer__label ${activePage === "/calendar" ? "footer__label--active" : ""}`}
            >
              Calendar
            </small>
          </div>
        </li>
        <li>
          <div
            className="footer__item"
            onClick={() => {
              navigate("/routines");
            }}
          >
            <Plus
              className={`footer__label ${activePage === "/routines" ? "footer__icon--active" : ""}`}
            />
            <small
              className={`footer__label ${activePage === "/routines" ? "footer__label--active" : ""}`}
            >
              Routines
            </small>
          </div>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
