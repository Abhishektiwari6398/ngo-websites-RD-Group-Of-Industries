import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../lib/client'; // Assuming you have this utility for Sanity images

const PublicationsSection = ({ publicationsData }) => {
  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Helper function to get primary author
  const getPrimaryAuthor = (authors) => {
    if (!authors || authors.length === 0) return 'Unknown Author';
    const primaryAuthor = authors.find(author => author.isPrimary) || authors[0];
    return primaryAuthor.name;
  };

  // Helper function to truncate description
  const truncateDescription = (text, maxLength = 120) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Helper function to format category display
  const formatCategory = (category) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const PublicationCard = ({ publication }) => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 w-full bg-[#969696]">
        {publication.image ? (
          <Image
            src={urlFor(publication.image).width(400).height(300).url()}
            alt={publication.image.alt || publication.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#969696] flex items-center justify-center">
            <span className="text-white text-sm">No Image</span>
          </div>
        )}
        {publication.featured && (
          <div className="absolute top-2 right-2 bg-[#FFB338] text-white px-2 py-1 rounded text-xs font-medium">
            Featured
          </div>
        )}
        {publication.openAccess && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
            Open Access
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {publication.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {truncateDescription(publication.description)}
        </p>
        
        {/* Meta Information */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-4 h-4 bg-orange-400 rounded-sm mr-2"></div>
            <span>{formatCategory(publication.category)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-4 h-4 bg-orange-400 rounded-sm mr-2"></div>
            <span>{getPrimaryAuthor(publication.authors)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-4 h-4 bg-orange-400 rounded-sm mr-2"></div>
            <span>{formatDate(publication.publishedAt)}</span>
          </div>

          {/* Journal/Conference */}
          {publication.journal && (
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-4 h-4 bg-orange-400 rounded-sm mr-2"></div>
              <span className="italic">{publication.journal}</span>
            </div>
          )}

          {/* Citation count */}
          {publication.citations && (
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-4 h-4 bg-orange-400 rounded-sm mr-2"></div>
              <span>{publication.citations} citations</span>
            </div>
          )}
        </div>
        
        {/* Keywords */}
        {publication.keywords && publication.keywords.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {publication.keywords.slice(0, 3).map((keyword, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                >
                  {keyword}
                </span>
              ))}
              {publication.keywords.length > 3 && (
                <span className="text-gray-500 text-xs">+{publication.keywords.length - 3}</span>
              )}
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="space-y-2">
          <Link href={`/publications/${publication.slug.current}`}>
            <button className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 px-4 rounded font-medium transition-colors duration-200">
             और पढ़ें →
            </button>
          </Link>
          
          {/* Additional action buttons */}
          <div className="flex space-x-2">
            {publication.url && (
              <a
                href={publication.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded text-sm font-medium transition-colors duration-200 text-center"
              >
                View Online
              </a>
            )}
            {publication.pdfFile && (
              <a
                href={publication.pdfFile.asset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-2 px-3 rounded text-sm font-medium transition-colors duration-200 text-center"
              >
                PDF
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h2 className="font-inter font-bold text-[50px] lg:text-[70px] leading-[100%] tracking-[-0.06em]">
            हमारे <span className="font-inter font-bold text-[50px] lg:text-[70px] leading-[100%] tracking-[-0.06em] text-[#FFB338]"> प्रकाशन </span>
          </h2>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {publicationsData && publicationsData.length > 0 ? (
            publicationsData.map((publication) => (
              <PublicationCard key={publication._id} publication={publication} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No publications available.</p>
            </div>
          )}
        </div>
        
        {/* View All Link */}
        <div className="text-center">
          <Link 
            href="/publications" 
            className="text-gray-700 hover:text-orange-400 font-medium text-lg hover:underline transition-colors duration-200"
          >
          सभी को देखें →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublicationsSection;