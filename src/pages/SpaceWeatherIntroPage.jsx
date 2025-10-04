import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import VideoPlayer from '../components/common/VideoPlayer';
import ContentBlock from '../components/common/ContentBlock';
import './SpaceWeatherIntroPage.css';

const pageVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const cardVariants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.3 } } };
const tabContentVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

function SpaceWeatherIntroPage() {
  const introVideoId = "o_19v5bntm8";
  const [activeTab, setActiveTab] = useState('story');

  useEffect(() => {
    document.body.classList.add('intro-page-active-background');
    return () => {
      document.body.classList.remove('intro-page-active-background');
    };
  }, []);

  const liveSpaceWeatherImages = [
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Space_weather_effects.jpg/960px-Space_weather_effects.jpg', alt: 'Diagram of Space Weather Effects' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Aviation_radiation_environment.png/800px-Aviation_radiation_environment.png', alt: 'Aviation Radiation Environment Diagram' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/ExtremeEvent_20031026-00h_20031106-24h.jpg/1280px-ExtremeEvent_20031026-00h_20031106-24h.jpg', alt: 'Graph of the 2003 Halloween Solar Storms' },
  ];

  return (
    <motion.div
      className="page-container space-weather-intro-container"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <h1>What is Space Weather?</h1>
      <motion.div className="intro-content-card" variants={cardVariants}>
        <div className="tab-buttons">
          <button className={`tab-button ${activeTab === 'video' ? 'active' : ''}`} onClick={() => setActiveTab('video')}>Watch Video Intro</button>
          <button className={`tab-button ${activeTab === 'story' ? 'active' : ''}`} onClick={() => setActiveTab('story')}>Read Detailed Explanation</button>
        </div>
        {activeTab === 'video' && (
          <motion.div key="video-tab" variants={tabContentVariants} initial="hidden" animate="visible">
            <h2>Understanding Space Weather</h2>
            <div className="video-player-container"><VideoPlayer videoId='space weather2.mp4' /></div>
            <p>This video provides a great overview. For more in-depth information and visuals, switch to the "Read Detailed Explanation" tab!</p>
          </motion.div>
        )}
        {activeTab === 'story' && (
          <motion.div key="story-tab" variants={tabContentVariants} initial="hidden" animate="visible" className="story-content">
            <ContentBlock title="Key Sources & Impacts" imgSrc={liveSpaceWeatherImages[0].src} imgAlt={liveSpaceWeatherImages[0].alt}>
              <p>Space weather refers to the dynamic conditions in space driven by the Sun's activity, which can pose risks to our technology.</p>
              <ul>
                <li><strong>Solar Flares:</strong> Sudden bursts of radiation disrupting communications.</li>
                <li><strong>CMEs:</strong> Massive clouds of plasma causing geomagnetic storms.</li>
                <li><strong>Impacts in Space:</strong> Radiation risks to astronauts and damage to satellite electronics, solar cells, and navigation.</li>
              </ul>
            </ContentBlock>
            <ContentBlock title="Analyzing an Extreme Event" imgSrc={liveSpaceWeatherImages[2].src} imgAlt={liveSpaceWeatherImages[2].alt}>
              <p>This graph shows real data from the massive solar storm of October–November 2003.
The top panel displays strong solar X-ray flares, including intense X-class flares.
The middle panel shows a spike in solar proton radiation, indicating a major radiation storm.
Cosmic rays drop during the storm (Forbush decrease), seen in the third panel.
The bottom panel reveals major magnetic field disturbances, causing geomagnetic storms.
This event caused GPS errors, satellite issues, and power grid problems.
It also led to flight rerouting and strong auroras.
It was one of the most extreme space weather events ever recorded.</p>
            </ContentBlock>
            <ContentBlock title="Sources of Space Radiation" imgSrc={liveSpaceWeatherImages[1].src} imgAlt={liveSpaceWeatherImages[1].alt}>
               <p>This diagram shows how radiation from space affects the atmosphere and flights.
SEP (Solar Energetic Particles) from the Sun and GCR (Galactic Cosmic Rays) from deep space hit Earth.
Earth’s magnetic field protects us, but particles still enter near the poles.
When they strike the upper atmosphere, they create a cascade of secondary particles.
These include protons, neutrons, muons, and electromagnetic (EM) particles.
Airplanes flying at high altitudes can be exposed to this radiation.
Radiation levels are highest at flight altitudes, lower at ground level.
That’s why monitoring space radiation is important for aviation safety</p>
            </ContentBlock>
          </motion.div>
        )}
      </motion.div>
      <Link to="/hub" className="button-link" style={{ marginTop: '3rem' }}>Continue to the Mission Hub</Link>
    </motion.div>
  );
}

export default SpaceWeatherIntroPage;