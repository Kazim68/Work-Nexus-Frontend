import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

import logo from "../../assets/Landing Page Icons/Work Nexus Logo(cropped) copy.png";

const Navbar = ({ navBg = "transparent", navLinkColor = "text-white" }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navLinks = [
        { name: 'Home', target: 'home' },
        { name: 'Modules', target: 'modules' },
        { name: 'Services', target: 'services' },
        { name: 'Aim', target: 'aim' },
        { name: 'Contact Us', target: 'contact' },
    ];

    useEffect(() => {
        if (navBg !== "transparent") return;

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navBg]);

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    const finalNavBg = navBg === "transparent"
        ? (isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent")
        : navBg;

    const finalNavLinkColor = navBg === "transparent"
        ? (isScrolled ? "text-white" : "text-black")
        : navLinkColor;

    return (
        <nav className={`fixed top-0 w-full z-50 ${finalNavBg} ${finalNavBg.includes('transparent') ? '' : 'shadow-md'} transition-colors duration-300`}>
            <div className="flex items-center justify-between py-5 max-w-7xl mx-auto px-4"> {/* Increased py-5 */}
                <img src={logo} className='h-16 w-auto' alt="Logo" /> {/* Increased logo height */}

                <div className="hidden lg:flex ml-auto mr-8 space-x-10 font-semibold text-lg"> {/* Increased font size & spacing */}
                    {navLinks.map((item, index) => (
                        <Link
                            key={index}
                            to={item.target}
                            spy={true}
                            smooth={true}
                            duration={500}
                            offset={-100} // Increased offset for larger navbar
                            onClick={handleLinkClick}
                            className={`cursor-pointer relative py-3 px-2 transition-all duration-300 hover:text-orange-400 ${finalNavLinkColor}
                    before:content-[''] before:absolute before:-bottom-1 before:left-0 
                    before:h-[2px] before:w-0 hover:before:w-full before:bg-orange-400 
                    before:transition-all before:duration-300`}
                        >
                            {item.name}
                        </Link>
                    ))}

                    <Link to='/signup'>
                        <button className="relative bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-[#777987] transition duration-300 font-semibold shadow-md text-lg">
                            <span className="relative z-10 inline-block text-center w-full">Join Us</span>
                            <div
                                className="absolute inset-0 bg-[#777878] rounded-md"
                                style={{
                                    clipPath: 'polygon(80% 0%, 100% 0%, 100% 100%, 60% 100%)',
                                    left: '40%',
                                }}
                            ></div>
                        </button>
                    </Link>
                </div>

                {/* Mobile toggle button */}
                <button
                    className={`lg:hidden ${finalNavLinkColor} focus:outline-none`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-black bg-opacity-90 text-white text-lg">
                    <div className="flex flex-col items-end space-y-6 py-6 px-8">
                        {navLinks.map((item, index) => (
                            <Link
                                key={index}
                                to={item.target}
                                spy={true}
                                smooth={true}
                                duration={500}
                                offset={-100} // Adjust offset for larger navbar
                                onClick={handleLinkClick}
                                className="cursor-pointer hover:text-orange-400 transition"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>

    );
};

export default Navbar;