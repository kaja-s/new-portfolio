'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import StraightTrackLanes from './StraightTrackLanes';

interface WorkItem {
  title: string;
  subtitle: string;
}

const works: WorkItem[] = [
  {
    title: 'osint + ai platform',
    subtitle: 'reimagining data collection and analysis',
  },
  {
    title: 'voice ai console',
    subtitle: 'dashboard design',
  },
  {
    title: 'women in tech community website',
    subtitle: 'brand identity, website development',
  },
  {
    title: 'communication card game',
    subtitle: 'xxx',
  },
  {
    title: 'edtech for students',
    subtitle: 'xxx',
  },
];

export default function WorkSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="min-h-screen px-8 md:px-16 lg:px-24 py-24 relative z-10 bg-red text-white">
      <StraightTrackLanes strokeColor="#000000" />
      <div className="max-w-screen-sm mx-auto relative z-10">
        <h2 className="font-regular lowercase mb-16" style={{ fontSize: '26px' }}>work</h2>

        <div className="space-y-8">
        {works.map((work, index) => (
          <motion.div
            key={index}
            className="cursor-pointer py-4"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <h3
              className="uppercase tracking-tight mb-2 transition-colors duration-300"
              style={{ 
                fontFamily: 'Akkurat Mono, monospace',
                fontWeight: '400',
                fontSize: '16px',
                letterSpacing: '-0.02em',
                color: hoveredIndex === index ? 'var(--black)' : 'var(--white)'
              }}
            >
              {work.title}
            </h3>
            <p 
              className="uppercase tracking-tight"
              style={{ 
                color: '#FDB5A5',
                fontFamily: 'Akkurat Mono, monospace',
                fontSize: '16px',
                letterSpacing: '-0.02em'
              }}
            >
              {work.subtitle}
            </p>
          </motion.div>
        ))}
        </div>
      </div>
    </section>
  );
}

