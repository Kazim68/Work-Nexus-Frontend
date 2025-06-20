import React from 'react';
import Navbar from '../Navbar';

const logo = 'https://d194k6uxa928vc.cloudfront.net/assets/Landing%20Page%20Icons/Work%20Nexus%20Logo(cropped)%20copy.png';
const bgContact = 'https://d194k6uxa928vc.cloudfront.net/assets/Landing%20Page%20Icons/Background%20Pics/5-Common-HR-Challenges-1024x532.jpg';

const homeLogo = 'https://d194k6uxa928vc.cloudfront.net/assets/Landing%20Page%20Icons/About%20Us/home.png';
const modulesLogo = 'https://d194k6uxa928vc.cloudfront.net/assets/Landing%20Page%20Icons/About%20Us/3d-design.png';
const servicesLogo = 'https://d194k6uxa928vc.cloudfront.net/assets/Landing%20Page%20Icons/About%20Us/public-service.png';
const aimLogo = 'https://d194k6uxa928vc.cloudfront.net/assets/Landing%20Page%20Icons/About%20Us/goal.png';

import { Mail, Phone } from 'lucide-react';

const ContactUs = () => {
    return (
        <div
            className="min-h-screen flex flex-col bg-cover bg-center text-white overflow-x-hidden"
            style={{
                backgroundImage: `url(${bgContact})`,
                backgroundAttachment: 'fixed',
            }}
        >
            <Navbar />

            {/* Header Card */}
            <div className="pt-32 sm:pt-36 px-4">
                <div className="relative bg-orange-500 text-black rounded-xl py-6 px-6 sm:px-10 md:px-12 w-full max-w-4xl mx-auto shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                        <p className="text-lg md:text-xl font-semibold">
                            Let's Get Your Company Setup <br /> and Start Growing!
                        </p>
                        <div className="flex justify-end items-center mt-4 md:mt-0 relative">
                            <button className="relative bg-black text-white px-6 py-2 rounded-md hover:bg-[#777987] transition duration-300 font-semibold shadow-md overflow-hidden">
                                <span className="relative z-10 inline-block text-center w-full text-sm md:text-xl">Join Us</span>
                                <div
                                    className="absolute inset-0 bg-[#777878] rounded-md"
                                    style={{
                                        clipPath: 'polygon(80% 0%, 100% 0%, 100% 100%, 60% 100%)',
                                        left: '40%',
                                        maxWidth: '100%',
                                    }}
                                ></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Yellow Section */}
            <div className="mt-auto">
                <div className="bg-orange-500 px-4 py-10 sm:px-6 md:px-12 lg:px-20 lg:py-16 overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-black">
                        
                        {/* Brand Section */}
                        <div>
                            <p className="text-xl sm:text-2xl font-bold leading-snug text-white">
                                SEAMLESS.<br />FAST.<br />RELIABLE.
                            </p>
                        </div>

                        {/* Explore Section */}
                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3">Explore</h3>
                            <ul className="space-y-2 text-sm sm:text-base">
                                <li className="flex items-center gap-2"><img src={homeLogo} alt="Home" className="w-4 h-4" /> Home</li>
                                <li className="flex items-center gap-2"><img src={modulesLogo} alt="Modules" className="w-4 h-4" /> Modules</li>
                                <li className="flex items-center gap-2"><img src={servicesLogo} alt="Services" className="w-4 h-4" /> Services</li>
                                <li className="flex items-center gap-2"><img src={aimLogo} alt="Aim" className="w-4 h-4" /> Our Aim</li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3">Contact Us</h3>
                            <ul className="space-y-2 text-sm sm:text-base">
                                <li className="flex items-center gap-2"><Phone size={16} /> +92 123456789</li>
                                <li className="flex items-center gap-2"><Mail size={16} /> wicked6797@gmail.com</li>
                                <li className="flex items-center gap-2"><Mail size={16} /> voidzero1213@gmail.com</li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3">Newsletter</h3>
                            <div className="bg-black p-2 rounded-md flex items-center justify-between">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="bg-transparent text-white outline-none w-full px-2 text-sm"
                                />
                                <button className="text-orange-500 font-bold text-lg">📧</button>
                            </div>
                            <p className="text-xs sm:text-sm mt-2 text-white">
                                Subscribe to our Newsletter. Don't worry, we hate spam too!
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
