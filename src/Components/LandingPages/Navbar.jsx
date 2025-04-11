import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../../assets/Landing Page Icons/Work_Nexus_Logo.png";

const Navbar = ({ navBg = "bg-black", navLinkColor = "text-white" }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Modules', path: '/modules' },
        { name: 'Services', path: '/services' },
        { name: 'Aim', path: '/aim' },
        { name: 'Contact Us', path: '/contact' },
    ];

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
      <nav className={`fixed top-0 w-full z-50 ${navBg} ${navBg.includes('transparent') ? '' : 'shadow-md'}`}>
            <div className="flex items-center justify-between py-4 max-w-7xl mx-auto px-4">
                {/* Logo */}
                <div className="flex text-xl md:text-2xl">
                    <img src={logo} className='h-14 w-auto' alt="Logo" />
                </div>

                {/* Navbar buttons */}
                <div className="hidden lg:flex ml-auto mr-8 space-x-8 font-medium">
                    {navLinks.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                `py-2 px-1 transition-colors duration-200 hover:text-orange-400 ${isActive ? 'text-orange-400' : navLinkColor}`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}

                    <button className="relative bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-[#777987] transition duration-300 font-semibold shadow-md">
                        <span className="relative z-10 inline-block text-center w-full text-sm md:text-xl">Join Us</span>
                        <div
                            className="absolute inset-0 bg-[#777878] rounded-md"
                            style={{
                                clipPath: 'polygon(80% 0%, 100% 0%, 100% 100%, 60% 100%)',
                                left: '40%',
                            }}
                        ></div>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-white focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full text-white">
                    <div className="flex flex-col items-end space-y-4 bg-black bg-opacity-50 py-4 px-8">
                        {navLinks.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.path}
                                onClick={handleLinkClick}
                                className={({ isActive }) =>
                                    `px-4 py-2 transition-colors duration-200 bg-black bg-opacity-0 hover:bg-opacity-90 hover:text-orange-400 w-max ${isActive ? 'text-orange-400' : navLinkColor}`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
