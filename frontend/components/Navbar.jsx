import React, { useState, useEffect } from "react";
import { client } from "../lib/client"; // Adjust path according to your setup

export default function Navbar() {
    const [navbarData, setNavbarData] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <header className="relative w-full max-w-[1300px] h-[83px] mt-[39px] left-[130px] bg-gray-200 animate-pulse rounded-[100px]">
                <div className="flex items-center justify-center h-full">
                    <div className="text-gray-500">Loading...</div>
                </div>
            </header>
        );
    }

    if (!navbarData) {
        return (
            <header className="relative w-full max-w-[1300px] h-[83px] mt-[39px] left-[130px] bg-red-100 rounded-[100px] flex items-center justify-center">
                <div className="text-red-500">Failed to load navbar data</div>
            </header>
        );
    }

    const { logo, navigationLinks, ctaButton, styles } = navbarData;

    return (
        <header 
            className={`relative w-full max-w-[1300px] h-[83px] mt-[39px] left-[130px] shadow-md rounded-[100px] pt-[11px] pr-[15px] pb-[11px] pl-[30px] flex items-center justify-between ${styles?.isSticky ? 'sticky top-0 z-50' : ''}`}
            style={{
                backgroundColor: styles?.backgroundColor || '#FFB338',
                backgroundOpacity: '0.3'
            }}
        >
            <nav className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl font-bold rounded-md"
                     style={{ color: styles?.textColor || '#374151' }}>
                    {logo?.image ? (
                        <img 
                            src={logo.image.asset.url} 
                            alt={logo.text || 'Logo'} 
                            className="h-10 w-auto"
                        />
                    ) : (
                        logo?.text || 'LOGO'
                    )}
                </div>

                {/* Navigation Links */}
                <ul className="flex space-x-6">
                    {navigationLinks?.map((link, index) => (
                        <li key={index}>
                            <a 
                                href={link.url || '#'} 
                                className={`font-medium px-3 py-2 rounded-md transition duration-300 ${
                                    link.isActive 
                                        ? 'text-white bg-orange-400 hover:bg-orange-500' 
                                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-100'
                                }`}
                            >
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                {ctaButton?.isVisible && (
                    <button 
                        className="bg-orange-400 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-orange-500 transition duration-300"
                        onClick={() => ctaButton.url && window.open(ctaButton.url, '_blank')}
                    >
                        {ctaButton.text || 'Button'}
                    </button>
                )}
            </nav>
        </header>
    );
}