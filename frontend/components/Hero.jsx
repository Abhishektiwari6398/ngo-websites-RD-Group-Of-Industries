import React from "react";
import { Bricolage_Grotesque, Poppins, DM_Sans } from "next/font/google";
import Image from "next/image";

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], weight: ['300', '400', '600', '700'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400'] });

export default function Hero({ heroData }) {
    // Fallback data if no Sanity data is provided
    const defaultData = {
        mainHeading: {
            line1: "Mahapandit Rahul Sankrityayan",
            researchText: "Research",
            andText: " & ",
            studyText: "Study",
            centerText: " center"
        },
        subtitle: "Discover the Legacy of Rahul Sankrityayan\nPreserving Knowledge, Inspiring Generations — through research, education, and cultural heritage.",
        buttons: {
            button1: { text: "Explore our work", url: "#", isVisible: true },
            button2: { text: "Join as a Member", url: "#", isVisible: true }
        },
        sidebarSections: [
            {
                title: "Children Help",
                description: "Children help involves supporting kids in their growth, learning, and well-being through guidance, care, and encouragement.",
                icon: { asset: { url: "/images/children-help-icon.png" } },
                order: 1,
                isActive: true
            },
            {
                title: "Social Welfare",
                description: "Welfare efforts to programs with support towards inclusion to bridge the basic well-being of marginalized communities through research and education.",
                icon: { asset: { url: "/images/social-welfare-icon.png" } },
                order: 2,
                isActive: true
            },
            {
                title: "Helping Old Aged Peoples",
                description: "Dedicated support systems providing care, assistance with daily activities, social integration activities ensuring they live with dignity and respect.",
                icon: { asset: { url: "/images/old-aged-icon.png" } },
                order: 3,
                isActive: true
            },
            {
                title: "Helping Homeless Peoples",
                description: "Helping homeless people recover, offering shelter from suffering, relief to feed and care to improve their living conditions.",
                icon: { asset: { url: "/images/homeless-icon.png" } },
                order: 4,
                isActive: true
            }
        ],
        portraitImages: {
            mainPortrait: { asset: { url: "" } },
            altText: "Rahul Sankrityayan Portrait",
            showMultipleCopies: true
        },
        styling: {
            primaryColor: "#FFB222",
            buttonColor: "#FFB222",
            backgroundColor: "#ffffff",
            textColor: "#000000",
            subtitleColor: "#5C5C5C"
        }
    };

    // Use Sanity data if available, otherwise use default data
    const data = heroData || defaultData;
    const { mainHeading, subtitle, buttons, sidebarSections, portraitImages, styling } = data;

    // Sort sidebar sections by order
    const sortedSections = sidebarSections?.filter(section => section.isActive)
                                         .sort((a, b) => a.order - b.order) || [];

    return (
        <div className="main-container">
            {/* Main Heading */}
            <div className="main-heading">
                <h1 className={bricolage.className}>
                    <span className="line1" style={{ color: styling?.textColor }}>
                        {mainHeading?.line1}
                    </span>
                    <span className="line2">
                        <span className="research-text" style={{ color: styling?.primaryColor }}>
                            — {mainHeading?.researchText}
                        </span>
                        <span className="and-text" style={{ color: styling?.textColor }}>
                            {mainHeading?.andText}
                        </span>
                        <span className="study-text" style={{ color: styling?.primaryColor }}>
                            {mainHeading?.studyText}
                        </span>
                        <span className="center-text" style={{ color: styling?.textColor }}>
                            {mainHeading?.centerText}
                        </span>
                    </span>
                </h1>
            </div>

            {/* Subtitle */}
            <div 
                className={`subtitle ${poppins.className}`}
                style={{ color: styling?.subtitleColor }}
            >
                {subtitle?.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        {index < subtitle.split('\n').length - 1 && <br />}
                    </React.Fragment>
                ))}
            </div>

            {/* Buttons */}
            {buttons?.button1?.isVisible && (
                <button 
                    className="button-1"
                    style={{ background: `linear-gradient(135deg, ${styling?.buttonColor})` }}
                    onClick={() => buttons.button1.url && window.open(buttons.button1.url, '_blank')}
                >
                    <span className={dmSans.className}>{buttons.button1.text}</span>
                </button>
            )}

            {buttons?.button2?.isVisible && (
                <button 
                    className="button-2"
                    style={{ background: `linear-gradient(135deg, ${styling?.buttonColor})` }}
                    onClick={() => buttons.button2.url && window.open(buttons.button2.url, '_blank')}
                >
                    <span className={dmSans.className}>{buttons.button2.text}</span>
                </button>
            )}

            {/* Sidebar Sections */}
            {sortedSections.map((section, index) => {
                const sectionClasses = ['children-help', 'social-welfare', 'old-aged', 'homeless'];
                const iconClasses = ['children-help-icon', 'social-welfare-icon', 'old-aged-icon', 'homeless-icon'];
                
                return (
                    <div key={section.order || index} className={`sidebar-section ${sectionClasses[index] || 'custom-section'}`}>
                        <div className="section-title">{section.title}</div>
                        <div className={`section-icon ${iconClasses[index] || 'custom-icon'}`} style={{ background: styling?.primaryColor }}>
                            {section.icon?.asset?.url && (
                                <Image
                                    src={section.icon.asset.url}
                                    alt={section.title}
                                    width={24}
                                    height={24}
                                    className="icon-image"
                                />
                            )}
                        </div>
                        <div className="section-desc">{section.description}</div>
                    </div>
                );
            })}

            {/* Portrait Images */}
            {portraitImages?.showMultipleCopies && portraitImages?.mainPortrait?.asset?.url && 
                ["1", "2", "3", "4"].map((id, i) => (
                    <div key={i} className={`image-container image-${id}`}>
                        <Image
                            src={portraitImages.mainPortrait.asset.url}
                            alt={`${portraitImages.altText} ${id}`}
                            fill
                            className="portrait-image"
                            style={{ objectFit: 'cover' }}
                            priority={i === 0} // Only first image gets priority
                        />
                    </div>
                ))
            }

            <style jsx>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                .main-container {
                    width: 100%;
                    position: relative;
                    background: ${styling?.backgroundColor || '#ffffff'};
                }
                .main-heading {
                    position: absolute;
                    top: 40px;
                    left: 220px;
                    width: 1200px;
                    height: 172px;
                }
                .main-heading h1 {
                    font-weight: 600;
                    font-size: 50px;
                    line-height: 100%;
                    margin: 0;
                    padding: 0;
                }
                .line1 {
                    display: block;
                    margin-bottom: 10px;
                }
                .subtitle {
                    position: absolute;
                    top: 170px;
                    left: 220px;
                    width: 1014px;
                    font-weight: 400;
                    font-size: 20px;
                }
                .button-1, .button-2 {
                    position: absolute;
                    top: 280px;
                    width: 183px;
                    height: 46.25px;
                    border-radius: 25px 10px 25px 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                    font-family: Arial, sans-serif;
                    font-weight: bold;
                    border: none;
                    color: #fff;
                }
                .button-1 {
                    left: 220px;
                }
                .button-2 {
                    left: 430px;
                }
                .button-1 span, .button-2 span {
                    color: white;
                }
                .button-1:hover, .button-2:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
                }
                .sidebar-section {
                    position: absolute;
                    left: 140px;
                    padding: 10px;
                    border-radius: 12px;
                }
                .section-title {
                    font-weight: 600;
                    font-size: 18px;
                    color: #666;
                }
                .section-icon {
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    overflow: hidden;
                }
                :global(.icon-image) {
                    border-radius: 50%;
                    object-fit: cover;
                }
                .section-desc {
                    font-weight: 300;
                    font-size: 10px;
                    color: #919191;
                    margin-top: 4px;
                }
                .children-help {
                    top: 380px;
                    width: 250px;
                }
                .children-help-icon {
                    left: 158px;
                    top: -9px;
                }
                .social-welfare {
                    top: 480px;
                    width: 250px;
                }
                .social-welfare-icon {
                    left: 230px;
                    top: 10px;
                }
                .old-aged {
                    top: 600px;
                    width: 290px;
                }
                .old-aged-icon {
                    left: 300px;
                    top: 0px;
                }
                .homeless {
                    top: 700px;
                    width: 350px;
                }
                .homeless-icon {
                    left: 360px;
                    top: 5px;
                }
                .image-container {
                    position: absolute;
                    top: 380px;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                }
                .image-1 {
                    left: 350px;
                    width: 295px;
                    height: 415px;
                    background: linear-gradient(135deg, #2c1810, #4a2c1a);
                    clip-path: polygon(1000% 0%, 100% 100%, 0% 0%);
                }
                .image-2 {
                    left: 650px;
                    width: 300px;
                    height: 415px;
                    background: linear-gradient(135deg, #2c1810, #4a2c1a);
                }
                .image-3 {
                    left: 955px;
                    width: 300px;
                    height: 415px;
                    background: linear-gradient(135deg, #2c1810, #4a2c1a);
                }
                .image-4 {
                    left: 1264px;
                    width: 250px;
                    height: 415px;
                    background: linear-gradient(135deg, #2c1810, #4a2c1a);
                }
                :global(.portrait-image) {
                    border-radius: 12px;
                    transition: transform 0.3s ease;
                }
                .image-container:hover :global(.portrait-image) {
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    );
}