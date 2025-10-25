'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HoverArea {
  text: string;
  imageAlt: string;
}

export default function AboutSection() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const aboutText = [
    { 
      text: "hi, I'm kaja Skerlj. I grew up in Slovenia,", 
      hover: 'slovenia',
      image: '🇸🇮'
    },
    { 
      text: " but through my running and professional career lived in many places including san Francisco, Pennsylvania, Brussels, and Berlin.", 
      hover: 'running',
      image: '🏃‍♀️'
    },
    { 
      text: "\n\ni'm the first designer at *codeplain designing spec-driven ai interfaces.", 
      hover: 'codeplain',
      image: '💻'
    },
    { 
      text: "\n\ni spent the last 5 years in the US where I graduated in Product Design and a master's in Technical Entrepreneurship at Lehigh University.", 
      hover: 'lehigh',
      image: '🎓'
    },
    { 
      text: "\n\nwhen I started high school, i knew I wanted to attend a top US university on a track and field scholarship. I represented Slovenia at the European and World Youth Championships, and 4 years after my goal was set, I landed in the US.", 
      hover: 'track',
      image: '🏆'
    },
  ];

  return (
    <section className="min-h-screen px-8 md:px-16 lg:px-24 py-24 relative z-10 bg-black text-white">
      <h2 className="text-4xl font-bold lowercase mb-16">about</h2>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="text-lg leading-relaxed space-y-4">
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

        {/* Image reveal area */}
        <div className="hidden md:flex items-center justify-center sticky top-24">
          <AnimatePresence mode="wait">
            {hoveredSection && (
              <motion.div
                key={hoveredSection}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="text-[200px] select-none"
              >
                {aboutText.find(t => t.hover === hoveredSection)?.image}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

