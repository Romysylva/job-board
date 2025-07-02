import React from "react";

const Footer = () => {
  return (
    <footer className=" footer__width bg-gray-800 text-white items-center text-center py-3 flex justify-between px-6 py-4 flex-wrap ">
      <div className="space-x-6">
        <a href="/" className="hover:underline">
          Privacy Policy
        </a>
        <a href="/" className="hover:underline">
          Terms of Service
        </a>
        <a href="/" className="hover:underline">
          Contact
        </a>
      </div>
      <div>
        <p className="text-sm">© 2025 Job Board App. All rights reserved.</p>
      </div>
      <div className="space-x-4">
        <span>Follow us:</span>
        <a href="/" className="hover:underline">
          Facebook
        </a>
        <a href="/" className="hover:underline">
          Twitter
        </a>
        <a href="/" className="hover:underline">
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
// static bottom-0 p-3
