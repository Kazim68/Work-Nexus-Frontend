import React, { useState, useEffect } from 'react';
import logo from "../../../assets/Landing Page Icons/Work Nexus Logo(cropped) copy.png";

const Navbar = () => {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [animate, setAnimate] = useState(false);

    const quotes = [
        "Progress is built on consistent effort, not perfection.",
        "Keep showing up—results follow commitment.",
        "The work you put in today shapes your tomorrow.",
        "Small progress is still progress—keep moving.",
        "Every task done is a step forward.",
        "Growth comes from doing, not waiting.",
        "Don't measure speed—measure direction.",
        "Effort compounds; stay the course.",
        "Your grind today is your gain tomorrow.",
        "Work hard in silence, let results speak volumes.",
        "One focused hour can change your whole week.",
        "Don't stop when you're tired—stop when you're done.",
        "Progress hides in persistence.",
        "Nothing works unless you do.",
        "Success is the sum of small efforts, repeated daily.",
        "Start where you are, use what you have, do what you can.",
        "The secret to getting ahead is getting started.",
        "Action beats intention every time.",
        "Your best work begins when excuses end.",
        "Keep building—it's not wasted if it moves you forward."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimate(true);
            setTimeout(() => {
                setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
                setAnimate(false);
            }, 1000);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <nav className="fixed top-0 w-full z-50 bg-black shadow-md transition-all duration-300">
            <div className="flex items-center justify-between py-3 max-w-7xl mx-auto px-4">
                {/* Logo */}
                <div className="flex-shrink-0 flex justify-start">
                    <img src={logo} className="h-12 w-auto" alt="Logo" />
                </div>


                {/* Desktop Quotes */}
                <div className="hidden lg:flex ml-auto font-semibold text-white text-lg w-[600px] h-[50px] items-center justify-end overflow-hidden">
                    <div
                        className={`transition-all duration-1000 ease-in-out ${animate ? "-translate-y-10 opacity-0" : "translate-y-0 opacity-100"}`}
                        key={currentQuoteIndex}
                    >
                        {quotes[currentQuoteIndex]}
                    </div>
                </div>

                {/* Mobile Toggle Button */}
                <button
                    className="lg:hidden text-white focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu with Quote */}
            {isMenuOpen && (
                <div className="lg:hidden bg-black bg-opacity-95 text-white py-4 px-6">
                    <div className="text-center font-semibold text-orange-400">{quotes[currentQuoteIndex]}</div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
