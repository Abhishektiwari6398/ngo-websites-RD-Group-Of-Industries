import React from 'react'
import Image from 'next/image';
// ...existing code...
import imageUrlBuilder from '@sanity/image-url'
import { client } from '../lib/client'

// Build image URLs
const builder = imageUrlBuilder(client)
const urlFor = (source) => builder.image(source)

export default function About({ aboutData }) {
  if (!aboutData) return null

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left Content */}
          <div className="space-y-8">
            {/* Heading */}
            <div className="flex items-center space-x-4">
              <div className="w-[85px] border-[5px] border-[#FFB338]"></div>
              <h1 className="text-6xl font-bold text-[#141414]">
                {aboutData.title}
              </h1>
            </div>

            {/* Description */}
            <p className="text-[22px] leading-relaxed text-justify text-[#000000]">
              {aboutData.description}
            </p>

            {/* Stats Section */}
            <div className="flex flex-wrap gap-4 mt-10">
              {aboutData.stats?.map((stat, index) => (
                <div
                  key={index}
                  className="w-[160px] h-[200px] bg-[#FFB338] rounded-t-full flex flex-col items-center justify-center text-white shadow-lg"
                >
                  <div className="text-[36px] font-extrabold">{stat.number}</div>
                  <div className="text-[18px] font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-[400px] h-[650px] border-[8px] border-[#FFB32666] rounded-b-full overflow-hidden">
              <Image
                src={urlFor(aboutData.portrait).url()}
                alt="About Portrait"
                width={400}
                height={650}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
