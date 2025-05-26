// pages/index.js

import React from "react";
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import NewsEventsPage from "../components/News&Events";
import OurPublications from "../components/OurPublications";
import Members from "../components/Members";
import Facts from "../components/Facts";
import Footer from "../components/Footer";
import GallerySection from '../components/Gallery';




import { client } from "../lib/client";

export default function Home({
  navbarData,
  heroData,
  aboutData,
  newsData,
  eventsData,
  publicationsData,
  membersData
  , galleryData

}) {
  return (
    <>
      <Navbar navbarData={navbarData} />
      <div style={{ position: 'relative', minHeight: '110vh' }}>
        <Hero heroData={heroData} />
      </div>
      <About aboutData={aboutData} />
      <NewsEventsPage newsData={newsData} eventsData={eventsData} />
      <OurPublications publicationsData={publicationsData} />
      <Members membersData={membersData} />
      <GallerySection galleryData={galleryData} />
      <Facts />
      <Footer />
    </>
  );
}

// ✅ Static Site Generation
export async function getStaticProps() {
  try {
    const navbarQuery = `*[_type == "navbar"][0]{
      logo{
        text,
        image{
          asset->{ _id, url }
        }
      },
      navigationLinks[] | order(order asc){
        title,
        url,
        isActive,
        order
      },
      ctaButton{
        text,
        url,
        isVisible
      },
      styles{
        backgroundColor,
        textColor,
        isSticky
      }
    }`;

    const heroQuery = `*[_type == "hero"][0]{
      mainHeading{
        line1, researchText, andText, studyText, centerText
      },
      subtitle,
      buttons{
        button1{ text, url, isVisible },
        button2{ text, url, isVisible }
      },
      sidebarSections[] | order(order asc){
        title, description, icon{ asset->{ _id, url } }, order, isActive
      },
      portraitImages{
        mainPortrait{ asset->{ _id, url } },
        altText,
        showMultipleCopies
      },
      styling{
        primaryColor, buttonColor, backgroundColor, textColor, subtitleColor
      }
    }`;

    const aboutQuery = `*[_type == "about"][0]{
      title,
      description,
      stats[]{ number, label },
      portrait{ asset->{ _id, url } }
    }`;

    // News & Events Queries
    const newsQuery = `*[_type == "newsEvents" && category == "news"] | order(publishedAt desc)[0...3]{
      _id,
      title,
      slug,
      description,
      image{
        asset->{ _id, url },
        alt
      },
      category,
      publishedAt,
      author,
      featured,
      tags
    }`;

    const eventsQuery = `*[_type == "newsEvents" && category == "events"] | order(publishedAt desc)[0...3]{
      _id,
      title,
      slug,
      description,
      image{
        asset->{ _id, url },
        alt
      },
      category,
      publishedAt,
      author,
      featured,
      tags
    }`;

    // Publications Query
    const publicationsQuery = `*[_type == "publications"] | order(publishedAt desc)[0...3]{
      _id,
      title,
      slug,
      description,
      image{
        asset->{ _id, url },
        alt
      },
      category,
      authors[]{
        name,
        isPrimary,
        affiliation
      },
      publishedAt,
      journal,
      keywords,
      citations,
      featured,
      openAccess,
      url,
      pdfFile{
        asset->{ _id, url }
      },
      researchArea
    }`;

    // Members Query
    const membersQuery = `*[_type == "members"][0]{
      title,
      members[] | order(order asc){
        name,
        description,
        image{
          asset->{ _id, url },
          alt
        },
        order
      },
      styling{
        titleNormalColor,
        titleHighlightColor,
        backgroundColor
      }
    }`;
    const galleryQuery = `*[_type == "gallery"][0]{
  images[]{
    image{
      asset->{ _id, url }
    },
    alt,
    size
  }
}`;


    const [
      navbarData,
      heroData,
      aboutData,
      newsData,
      eventsData,
      publicationsData,
      membersData,
      galleryData
    ] = await Promise.all([
      client.fetch(navbarQuery),
      client.fetch(heroQuery),
      client.fetch(aboutQuery),
      client.fetch(newsQuery),
      client.fetch(eventsQuery),
      client.fetch(publicationsQuery),
      client.fetch(membersQuery),
      client.fetch(galleryQuery)
    ]);

    return {
      props: {
        navbarData: navbarData || null,
        heroData: heroData || null,
        aboutData: aboutData || null,
        newsData: newsData || [],
        eventsData: eventsData || [],
        publicationsData: publicationsData || [],
        membersData: membersData || null,
        galleryData: galleryData?.images || []
      },
      revalidate: 60 // Revalidate every minute
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      props: {
        navbarData: null,
        heroData: null,
        aboutData: null,
        newsData: [],
        eventsData: [],
        publicationsData: [],
        membersData: null,
        galleryData: []
      },
      revalidate: 10 // Shorter revalidation on error
    };
  }
}