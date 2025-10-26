'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import StraightTrackLanes from './StraightTrackLanes';

interface HoverArea {
  text: string;
  imageAlt: string;
}

export default function AboutSection() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const aboutText = [
    { 
      text: "hi, I'm kaja skerlj and i grew up in slovenia.", 
      hover: 'slovenia',
      image: '/photos/kaja-skerlj.png',
      isPhoto: true,
      width: 400,
      height: 400
    },
    { 
      text: "my running and professional career brought me to many places including san francisco, pennsylvania, brussels, and berlin.", 
      hover: 'san francisco',
      image: '/photos/san-francisco.png',
      isPhoto: true,
      width: 400,
      height: 400
    },
    { 
      text: "\n\ni'm the first designer at *codeplain, designing spec-driven ai interfaces.", 
      hover: 'codeplain',
      image: '/photos/codeplain-team.png',
      isPhoto: true,
      width: 400,
      height: 500
    },
    { 
      text: "\n\ni spent the last 5 years in the us where i graduated in product design and a master's in technical entrepreneurship at lehigh university.", 
      hover: 'lehigh',
      image: '/photos/lehigh.png',
      isPhoto: true,
      width: 400,
      height: 500
    },
    { 
      text: "\n\nwhen i started high school, i knew i wanted to attend a top us university on a track and field scholarship. i represented slovenia at the european and world youth championships, and 4 years after my goal was set, i landed in the us.", 
      hover: 'track',
      image: '/photos/world-championships.png',
      isPhoto: true,
      width: 400,
      height: 400
    },
  ];

  return (
    <section className="min-h-screen px-8 md:px-16 lg:px-24 py-24 relative z-10 bg-black text-white">
      <StraightTrackLanes strokeColor="#FFFFFF20" />
      <div className="max-w-screen-sm mx-auto relative z-10">
        <h2 className="text-4xl font-bold lowercase mb-16">about</h2>

        <div className="text-[16px] leading-relaxed space-y-6">
          {aboutText.map((section, index) => (
            <span
              key={index}
              className="hover:text-red transition-colors duration-300 cursor-pointer inline-block"
              onMouseEnter={() => setHoveredSection(section.hover)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {section.text}
            </span>
          ))}
        </div>
      </div>

      {/* Image reveal area - positioned outside max-width on the right */}
      <div className="hidden md:block fixed right-8 lg:right-24 top-1/2 -translate-y-1/2 pointer-events-none">
        <AnimatePresence mode="wait">
          {hoveredSection && (
            <motion.div
              key={hoveredSection}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.3,
                ease: "easeOut"
              }}
              className="select-none"
            >
              {aboutText.find(t => t.hover === hoveredSection)?.isPhoto ? (
                <Image 
                  src={aboutText.find(t => t.hover === hoveredSection)?.image || ''} 
                  alt={hoveredSection}
                  width={aboutText.find(t => t.hover === hoveredSection)?.width || 500}
                  height={aboutText.find(t => t.hover === hoveredSection)?.height || 500}
                  className="object-cover"
                />
              ) : (
                <div className="text-[200px]">
                  {aboutText.find(t => t.hover === hoveredSection)?.image}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

