import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import logo from './assets/images/logo.svg';
import user from "./assets/images/user.png";
import {  FaChevronDown, FaUserAlt, FaBell, FaCog } from 'react-icons/fa'; // Updated icons

import { LuChartPie, LuWalletMinimal } from "react-icons/lu";
import { BiHomeAlt } from "react-icons/bi";
import { FaListCheck } from "react-icons/fa6";
import { PiHandCoins } from "react-icons/pi";

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
      <header className="bg-white text-white py-4 border-b fixed w-full" style={{ zIndex: 1000 }}>
        <nav className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <img
                src={logo}
                alt="TravelApp Logo"
                className="h-8 w-auto"
              />
            </Link>
            <div className="relative flex-grow border rounded">
              <input
                type="text"
                placeholder="Search..."
                className="p-2 rounded text-gray-700 w-64"
                onClick={handleSearchClick}
              />
            </div>
          </div>
          <div className="flex items-center space-x-8 pl-4 mr-4  ">
            <div className="flex space-x-4 text-gray-500 text-xs border-r pr-4">
              <div className="flex flex-col items-center ">
              <BiHomeAlt className="text-2xl"/>
                <span className="text-xs">Home</span>
              </div>
              <div className="flex flex-col items-center">
              <LuWalletMinimal className="text-2xl"/>
                <span >Wallet</span>
              </div>
              <div className="flex flex-col items-center">
                <LuChartPie className="text-2xl" />
                <span >Dashboard</span>
              </div>
              <div className="flex flex-col items-center">
                <FaListCheck className="text-2xl" />
                <span >Plan a Trip</span>
              </div>
              <div className="flex flex-col items-center">
                <PiHandCoins className="text-2xl" />
                <span >Commission for Life</span>
              </div>
              
            </div>

            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Button
              </button>
              
              <div className="flex space-x-4">
                <FaBell className="text-xl text-gray-700" />
                <FaCog className="text-xl text-gray-700" />
                <FaUserAlt className="text-xl text-gray-700" />
              </div>

              <div className="flex items-center space-x-2">
                <img
                  src={user}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <FaChevronDown className="text-xl text-gray-700" />
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Select Search Type</h2>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/flights"
                  className="block py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={closeModal}
                >
                  Flights
                </Link>
              </li>
              <li>
                <Link
                  to="/hotels"
                  className="block py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={closeModal}
                >
                  Hotels
                </Link>
              </li>
              <li>
                <Link
                  to="/activities"
                  className="block py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={closeModal}
                >
                  Activities
                </Link>
              </li>
            </ul>
            <button
              onClick={closeModal}
              className="mt-6 w-full py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <main className="container mx-auto py-6 pt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
