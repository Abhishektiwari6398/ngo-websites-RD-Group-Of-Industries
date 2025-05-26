import React, { useState, useEffect } from "react";
import { client } from "../lib/client"; // Adjust path according to your setup
import Link from "next/link";

export default function Navbar() {
    const [navbarData, setNavbarData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Sanity query to fetch navbar data
    const navbarQuery = `*[_type == "navbar"][0]{
        logo,
        navigationLinks[] | order(order asc),
        ctaButton,
        styles
    }`;

    useEffect(() => {
        const fetchNavbarData = async () => {
            try {
                const data = await client.fetch(navbarQuery);
                setNavbarData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching navbar data:", error);
                setLoading(false);
            }
        };

        fetchNavbarData();
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileMenuOpen && !event.target.closest('.navbar-container')) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobileMenuOpen]);

    // Close mobile menu on window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileMenuOpen]);

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    if (loading) {
        return (
            <header className="relative w-full max-w-7xl h-14 sm:h-16 md:h-20 lg:h-[83px] mt-3 sm:mt-4 md:mt-5 lg:mt-[35px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-0">
                <div className="bg-gray-200 animate-pulse rounded-full h-full flex items-center justify-center">
                    <div className="text-gray-500 text-xs sm:text-sm md:text-base">Loading...</div>
                </div>
            </header>
        );
    }

    if (!navbarData) {
        return (
            <header className="relative w-full max-w-7xl h-14 sm:h-16 md:h-20 lg:h-[83px] mt-3 sm:mt-4 md:mt-5 lg:mt-[39px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-0">
                <div className="bg-red-100 rounded-full h-full flex items-center justify-center">
                    <div className="text-red-500 text-xs sm:text-sm md:text-base">Failed to load navbar data</div>
                </div>
            </header>
        );
    }

    const { logo, navigationLinks, ctaButton, styles } = navbarData;

    return (
        <header
            className={`navbar-container relative w-full max-w-7xl mt-3 sm:mt-4 md:mt-5 lg:mt-[39px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-0 ${styles?.isSticky ? 'sticky top-0 z-50' : ''}`}
        >
            <div
                className="shadow-md rounded-2xl sm:rounded-3xl lg:rounded-[100px] px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-3.5 lg:py-[11px]"
                style={{
                    backgroundColor: styles?.backgroundColor || '#FFB338',
                    backgroundOpacity: '0.3'
                }}
            >
                <nav className="flex items-center justify-between h-full min-h-[40px] sm:min-h-[44px] md:min-h-[48px] lg:min-h-[61px]">
                    {/* Logo */}
                    <div className="flex-shrink-0 z-10">
                        {logo?.image ? (
                            <img
                                src={logo.image.asset.url}
                                alt={logo.text || 'Logo'}
                                className="h-5 sm:h-6 md:h-7 lg:h-10 w-auto object-contain"
                            />
                        ) : (
                            <div
                                className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold"
                                style={{ color: styles?.textColor || '#374151' }}
                            >
                                {logo?.text || 'LOGO'}
                            </div>
                        )}
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-1 md:space-x-2 lg:space-x-2 xl:space-x-4">
                        <ul className="flex items-center space-x-1 md:space-x-1.5 lg:space-x-2 xl:space-x-2 mr-60">
                            {navigationLinks?.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.url || '#'} legacyBehavior>
                                        <a
                                            className={`font-medium px-1.5 sm:px-2 md:px-2.5 lg:px-2 xl:px-3 py-1 sm:py-1.5 md:py-2 lg:py-2 rounded-md transition duration-300 whitespace-nowrap text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base ${
                                                link.isActive
                                                    ? 'text-white bg-orange-400 hover:bg-orange-500'
                                                    : 'text-gray-700 hover:text-orange-600 hover:bg-orange-100'
                                            }`}
                                        >
                                            {link.title}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Desktop CTA Button */}
                        {ctaButton?.isVisible && (
                            <button
                                className="bg-orange-400 text-white font-bold py-1 sm:py-1.5 md:py-2 lg:py-2 px-2 sm:px-2.5 md:px-3 lg:px-3 xl:px-4 rounded-full shadow-lg hover:bg-orange-500 transition duration-300 flex-shrink-0 ml-1 sm:ml-2 md:ml-3 lg:ml-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base"
                                onClick={() => ctaButton.url && window.open(ctaButton.url, '_blank')}
                            >
                                {ctaButton.text || 'Button'}
                            </button>
                        )}
                    </div>

                    {/* Mobile/Tablet Menu Button */}
                    <button
                        className="lg:hidden flex flex-col items-center justify-center w-5 sm:w-6 md:w-7 lg:w-8 h-5 sm:h-6 md:h-7 lg:h-8 space-y-0.5 sm:space-y-1 focus:outline-none z-10"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <div
                            className={`w-3 sm:w-4 md:w-5 lg:w-6 h-[2px] sm:h-0.5 transition-all duration-300 ${
                                isMobileMenuOpen ? 'rotate-45 translate-y-1 sm:translate-y-1.5 md:translate-y-2' : ''
                            }`}
                            style={{ backgroundColor: styles?.textColor || '#374151' }}
                        ></div>
                        <div
                            className={`w-3 sm:w-4 md:w-5 lg:w-6 h-[2px] sm:h-0.5 transition-all duration-300 ${
                                isMobileMenuOpen ? 'opacity-0' : ''
                            }`}
                            style={{ backgroundColor: styles?.textColor || '#374151' }}
                        ></div>
                        <div
                            className={`w-3 sm:w-4 md:w-5 lg:w-6 h-[2px] sm:h-0.5 transition-all duration-300 ${
                                isMobileMenuOpen ? '-rotate-45 -translate-y-1 sm:-translate-y-1.5 md:-translate-y-2' : ''
                            }`}
                            style={{ backgroundColor: styles?.textColor || '#374151' }}
                        ></div>
                    </button>
                </nav>

                {/* Mobile/Tablet Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden absolute top-full left-3 sm:left-4 md:left-6 right-3 sm:right-4 md:right-6 mt-1 sm:mt-2 bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-40">
                        {/* Mobile Navigation Links */}
                        <ul className="py-1 sm:py-2 md:py-3">
                            {navigationLinks?.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.url || '#'} legacyBehavior>
                                        <a
                                            className={`block px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 font-medium transition duration-300 text-xs sm:text-sm md:text-base ${
                                                link.isActive
                                                    ? 'text-white bg-orange-400'
                                                    : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                                            }`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.title}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile CTA Button */}
                        {ctaButton?.isVisible && (
                            <div className="px-3 sm:px-4 md:px-5 pb-2 sm:pb-3 md:pb-4">
                                <button
                                    className="w-full bg-orange-400 text-white font-bold py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 rounded-full shadow-lg hover:bg-orange-500 transition duration-300 text-xs sm:text-sm md:text-base"
                                    onClick={() => {
                                        ctaButton.url && window.open(ctaButton.url, '_blank');
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    {ctaButton.text || 'Button'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}