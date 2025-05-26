import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../lib/client'; // Assuming you have this utility for Sanity images

const NewsEventsPage = ({ newsData, eventsData }) => {
    // Helper function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Helper function to truncate description
    const truncateDescription = (text, maxLength = 200) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const NewsCard = ({ item }) => (
        <div className="rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 mb-6">
            {/* Mobile Layout - Vertical Stack */}
            <div className="block md:hidden">
                {/* Image */}
                <div className="relative w-full h-48 bg-[#969696]">
                    {item.image ? (
                        <Image
                            src={urlFor(item.image).width(400).height(200).url()}
                            alt={item.image.alt || item.title}
                            fill
                            className="object-cover rounded-t-lg"
                        />
                    ) : (
                        <div className="w-full h-full bg-[#969696] rounded-t-lg flex items-center justify-center">
                            <span className="text-white text-sm">No Image</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 bg-[#F0F0F0]">
                    <h3 className="font-[Poppins] font-semibold text-lg sm:text-xl leading-[100%] tracking-[-0.02em]">
                        {item.title}
                    </h3>
                    <p className="font-[DM_Sans] text-sm leading-[120%] tracking-[0em] text-justify mt-3">
                        {truncateDescription(item.description, 150)}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-2">
                        <p className="font-[DM_Sans] text-xs leading-[100%] tracking-[-0.02em] text-gray-600">
                            {item.author && `${item.author} - `}{formatDate(item.publishedAt)}
                        </p>
                        {item.featured && (
                            <span className="bg-[#FFB338] text-white px-2 py-1 rounded text-xs font-medium self-start sm:self-auto">
                                Featured
                            </span>
                        )}
                    </div>
                    
                    {/* Button */}
                    <div className="mt-4 text-right">
                        <Link href={`/${item.category}/${item.slug.current}`}>
                            <button className="bg-[#FFB338] hover:bg-orange-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200">
                             और पढ़ें →
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Desktop Layout - Horizontal */}
            <div className="hidden md:flex">
                {/* Left Side - Image */}
                <div className="relative w-48 h-auto flex-shrink-0 bg-[#969696]">
                    {item.image ? (
                        <Image
                            src={urlFor(item.image).width(300).height(200).url()}
                            alt={item.image.alt || item.title}
                            fill
                            className="object-cover rounded-l-lg"
                        />
                    ) : (
                        <div className="w-full h-full bg-[#969696] rounded-l-lg flex items-center justify-center">
                            <span className="text-white text-sm">No Image</span>
                        </div>
                    )}
                </div>

                {/* Right Side - Content */}
                <div className="flex-1 p-4 flex flex-col justify-between bg-[#F0F0F0]">
                    <div>
                        <h3 className="font-[Poppins] font-semibold text-[24px] lg:text-[32px] leading-[100%] tracking-[-0.02em]">
                            {item.title}
                        </h3>
                        <p className="font-[DM_Sans] text-[12px] leading-[120%] tracking-[0em] text-justify mt-3">
                            {truncateDescription(item.description)}
                        </p>
                        <div className="flex items-center justify-between mt-4">
                            <p className="font-[DM_Sans] text-[12px] leading-[100%] tracking-[-0.02em] text-gray-600">
                                {item.author && `${item.author} - `}{formatDate(item.publishedAt)}
                            </p>
                            {item.featured && (
                                <span className="bg-[#FFB338] text-white px-2 py-1 rounded text-xs font-medium">
                                    Featured
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Button at bottom */}
                    <div className="mt-4 text-right">
                        <Link href={`/${item.category}/${item.slug.current}`}>
                            <button className="bg-[#FFB338] hover:bg-orange-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200">
                             और पढ़ें →
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Header */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                    {/* News Section */}
                    <div>
                        <div className="flex items-center mb-6 sm:mb-8">
                            <div className="w-12 sm:w-20 h-1 border-[3px] border-[#FFB338] mr-3 sm:mr-4"></div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl leading-[100%] font-[700] font-inter text-[#141414]">
                                समाचार
                            </h1>
                        </div>

                        <div>
                            {newsData && newsData.length > 0 ? (
                                newsData.map((item) => (
                                    <NewsCard key={item._id} item={item} />
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No news items available.</p>
                                </div>
                            )}
                        </div>

                        <div className="text-left mt-6">
                            <Link
                                href="/news"
                                className="text-orange-500 hover:text-orange-600 font-medium text-sm hover:underline transition-colors duration-200"
                            >
                               सभी को देखें →
                            </Link>
                        </div>
                    </div>

                    {/* Events Section */}
                    <div>
                        <div className="flex items-center justify-start lg:justify-end mb-6 sm:mb-8">
                            <div className="w-12 sm:w-20 h-1 border-[3px] border-[#FFB338] mr-3 sm:mr-4 lg:hidden"></div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl leading-[100%] font-[700] font-inter text-[#141414]">
                                घटनाएँ
                            </h1>
                            <div className="hidden lg:block w-20 h-1 border-[3px] border-[#FFB338] ml-4"></div>
                        </div>

                        <div>
                            {eventsData && eventsData.length > 0 ? (
                                eventsData.map((item) => (
                                    <NewsCard key={item._id} item={item} />
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No events available.</p>
                                </div>
                            )}
                        </div>

                        <div className="text-left lg:text-right mt-6">
                            <Link
                                href="/events"
                                className="text-orange-500 hover:text-orange-600 font-medium text-sm hover:underline transition-colors duration-200"
                            >
                               सभी को देखें →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsEventsPage;