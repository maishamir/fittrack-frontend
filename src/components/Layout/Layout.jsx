//react layout component
import React from "react";
import "./Layout.scss";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <div className="layout__content">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
