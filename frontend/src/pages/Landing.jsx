import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Hero Section  include image*/}
      <section
        className="relative flex flex-col items-center justify-center w-full bg-cover bg-center py-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black opacity-30"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 w-full max-w-[1920px] mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Welcome to E-Vote
          </h1>
          <p className="text-gray-200 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            Your trusted online voting platform for secure, transparent, and accessible elections.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Link
              to="/login"
              className="block w-64 text-center bg-indigo-500 text-white py-3 px-6 rounded-xl hover:bg-indigo-600 transition-all duration-300 shadow-lg"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block w-64 text-center bg-teal-500 text-white py-3 px-6 rounded-xl hover:bg-teal-600 transition-all duration-300 shadow-lg"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-[1920px] mx-auto py-16 px-6">
        <h2 className="text-3xl font-semibold text-white text-center mb-12">
          Why Choose E-Voting?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-medium text-indigo-500 mb-2">Security First</h3>
            <p className="text-gray-600">
              E-Vote uses end-to-end encryption to ensure your vote remains private and tamper-proof. Blockchain technology creates an immutable record, making fraud nearly impossible.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-medium text-indigo-500 mb-2">Accessibility</h3>
            <p className="text-gray-600">
              Vote from anywhere with an internet connection. E-voting eliminates physical polling stations, making it easier for people with disabilities or in remote areas to participate.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-medium text-indigo-500 mb-2">Transparency</h3>
            <p className="text-gray-600">
              Digital audit trails allow real-time monitoring and verification. E-Vote ensures every vote is counted accurately, with results available instantly.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-medium text-indigo-500 mb-2">Did You Know?</h3>
            <p className="text-gray-600">
              Estonia pioneered nationwide e-voting in 2005, with over 44% of votes cast online in 2019. E-voting is now used in countries like Switzerland and Brazil.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="w-full max-w-[1920px] mx-auto py-16 px-6 bg-gray-800">
        <h2 className="text-3xl font-semibold text-white text-center mb-12">
          Contact Us
        </h2>
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-lg p-8 w-full lg:w-1/2">
            <h3 className="text-xl font-medium text-indigo-500 mb-4">Get in Touch</h3>
            <p className="text-gray-600 mb-4">
              Have questions or need support? Reach out to us—we’re here to help!
            </p>
            <ul className="space-y-3 text-gray-600">
              <li>
                <span className="font-medium">Email:</span>{" "}
                <a href="mailto:support@evote.com" className="text-indigo-500 hover:underline">
                  support@evote.com
                </a>
              </li>
              <li>
                <span className="font-medium">Phone:</span>{" "}
                <a href="tel:+1234567890" className="text-indigo-500 hover:underline">
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <span className="font-medium">Address:</span> 123 Election Ave, Democracy City, 90210
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8 w-full lg:w-1/2">
            <h3 className="text-xl font-medium text-indigo-500 mb-4">Send Us a Message</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="4"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-gray-300 py-8">
        <div className="max-w-[1920px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white">E-Vote</h3>
              <p className="text-gray-400">Empowering Democracy</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
              <Link to="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} E-Vote. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
