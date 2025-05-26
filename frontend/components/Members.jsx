import React from 'react';
import Image from 'next/image';

const HonorableMembersSection = ({ membersData }) => {
  // Fallback data
  const fallbackMembers = [
    {
      id: 1,
      name: "Mahapandit Rahul Sankrityayan",
      description: "Author, historian, polyglot, writer and father of Hindi travel literature",
      image: "/images/placeholder-member.jpg"
    },
    {
      id: 2,
      name: "Miss Meera Joshi",
      description: "Actress of Bollywood industry",
      image: "/images/placeholder-member.jpg"
    },
    {
      id: 3,
      name: "MR. Ankit Sharma",
      description: "Expert of Funds and Financial Affairs",
      image: "/images/placeholder-member.jpg"
    },
    {
      id: 4,
      name: "MR. Shayam Gupta",
      description: "Social MR. & MLA",
      image: "/images/placeholder-member.jpg"
    },
    {
      id: 5,
      name: "MR. Aarav Kumar",
      description: "Ancient Archaeologist",
      image: "/images/placeholder-member.jpg"
    },
    {
      id: 6,
      name: "MR. Adarsh Pandit",
      description: "Expert PYCC",
      image: "/images/placeholder-member.jpg"
    },
    {
      id: 7,
      name: "MR. Ramesh Sharma",
      description: "Expert of Historiography",
      image: "/images/placeholder-member.jpg"
    },
    {
      id: 8,
      name: "MR. Suraj Singh",
      description: "Social Activist",
      image: "/images/placeholder-member.jpg"
    }
  ];

  // Use Sanity data if available, otherwise fallback
  const members = membersData?.members || fallbackMembers;
  const title = membersData?.title || "हमारे  माननीय  सदस्यगण";
  const styling = membersData?.styling || {
    titleNormalColor: '#000000',
    titleHighlightColor: '#FFB338',
    backgroundColor: '#ffffff'
  };

  // Helper function to get image URL
  const getImageUrl = (member) => {
    if (member.image?.asset?.url) {
      return member.image.asset.url;
    }
    return member.image || "/images/placeholder-member.jpg";
  };

  // Helper function to get image alt text
  const getImageAlt = (member) => {
    return member.image?.alt || member.name;
  };

  const MemberCard = ({ member }) => (
    <div className="relative group cursor-pointer">
      {/* Member Image */}
      <div className="relative h-80 w-full rounded-lg overflow-hidden">
        <Image
          src={getImageUrl(member)}
          alt={getImageAlt(member)}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Ss6mRDkvl9BuOc3cyEHSXnoLt0HfywQCOTgfe4fHoNV2XkOLHuQ/"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-50"></div>
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-bold mb-2 leading-tight">
            {member.name}
          </h3>
          <p className="text-sm opacity-90 leading-relaxed">
            {member.description}
          </p>
        </div>
      </div>
    </div>
  );

  // Parse title for highlighting "HONORABLE"
  const renderTitle = () => {
    const words = title.split(' ');
    
    return (
      <h2 className="font-inter font-bold text-[65px] leading-[100%] tracking-[-0.06em]">
        {words.map((word, index) => {
          const isHonorableWord = word.toUpperCase().includes('माननीय');
          return (
            <span
              key={index}
              className={`font-inter font-bold leading-[100%] tracking-[-0.06em] ${
                isHonorableWord ? 'text-[70px]' : 'text-[65px]'
              }`}
              style={{ 
                color: isHonorableWord ? styling.titleHighlightColor : styling.titleNormalColor
              }}
            >
              {word}{index < words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </h2>
    );
  };

  return (
    <div className="py-16" style={{ backgroundColor: styling.backgroundColor }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          {renderTitle()}
        </div>
        
        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <MemberCard key={member._id || member.id || index} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HonorableMembersSection;