import React, { useState } from "react";
import './Footer.css';
function Footer() {
  return (
    <div className="footer-container flex relative mt-20">
      {/* Footer Heading */}
      <div className="footer-heading font-Manrope absolute sm:left-1/2 top-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:text-center">
        <h1>Version 1.0.1 | Copyright Reserved By RADS4VETS © 2024</h1>
      </div>
    </div>
  );
}
export default Footer;