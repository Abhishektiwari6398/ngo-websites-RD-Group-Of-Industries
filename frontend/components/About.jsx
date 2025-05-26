import React from 'react';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../lib/client';

// Build image URLs
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function About({ aboutData }) {
  if (!aboutData) return null;

  return (
    <div className="min-h-screen py-4 sm:py-6 md:py-8 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-12 bg-white mt-6 sm:mt-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Heading */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 sm:w-12 md:w-14 lg:w-16 border-[3px] sm:border-[4px] md:border-[5px] border-[#FFB338]"></div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#141414]">
                {aboutData.title}
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] leading-relaxed text-justify text-[#000000]">
              {aboutData.description}
            </p>

            {/* Stats Section */}
            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-5 mt-4 sm:mt-6 md:mt-8 lg:mt-10">
              {aboutData.stats?.map((stat, index) => (
                <div
                  key={index}
                  className="w-[100px] h-[120px] sm:w-[120px] sm:h-[140px] md:w-[140px] md:h-[160px] lg:w-[160px] lg:h-[180px] xl:w-[180px] xl:h-[200px] bg-[#FFB338] rounded-t-full flex flex-col items-center justify-center text-white shadow-lg"
                >
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-[36px] font-extrabold">{stat.number}</div>
                  <div className="text-sm sm:text-base md:text-[16px] lg:text-[18px] font-medium text-center px-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center md:justify-end mt-6 sm:mt-8 md:mt-0">
            <div className="w-[180px] h-[280px] sm:w-[220px] sm:h-[350px] md:w-[280px] md:h-[450px] lg:w-[350px] lg:h-[550px] xl:w-[400px] xl:h-[650px] border-[4px] sm:border-[6px] md:border-[8px] border-[#FFB32666] rounded-b-full overflow-hidden">
              <Image
                src={urlFor(aboutData.portrait).url()}
                alt="About Portrait"
                width={400}
                height={650}
                className="w-full h-full object-cover"
                sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1024px) 280px, (max-width: 1280px) 350px, 400px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}