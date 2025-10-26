'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import StraightTrackLanes from './StraightTrackLanes';

interface WorkItem {
  title: string;
  subtitle: string;
  slug: string;
}

const works: WorkItem[] = [
  {
    title: 'osint + ai platform',
    subtitle: 'reimagining data collection and analysis',
    slug: '/osint',
  },
  {
    title: 'voice ai console',
    subtitle: 'dashboard design',
    slug: '/voice',
  },
  {
    title: 'making hacking for everyone',
    subtitle: 'adahack hackathon 2025',
    slug: '/adahack',
  },
  {
    title: 'enhancing communication',
    subtitle: 'card game for couples',
    slug: '/communication',
  },
  {
    title: 'edtech for students',
    subtitle: 'xxx',
    slug: '/edtech',
  },
];

export default function WorkSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      className="min-h-screen px-8 md:px-16 lg:px-24 py-24 relative text-white overflow-hidden"
      style={{ 
        position: 'relative',
        backgroundImage: 'url(/photos/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#FB461F'
      }}
    >
      <StraightTrackLanes strokeColor="#FFFFFF20" />
      <div className="max-w-screen-sm mx-auto relative z-10">
        <h2 className="font-regular lowercase mb-16" style={{ fontSize: '26px' }}>work</h2>

        
        {works.map((work, index) => (
          <Link key={index} href={work.slug}>
            <motion.div
              className="cursor-pointer py-6"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <h3
                className="uppercase tracking-tight mb-1 transition-colors duration-300"
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
                className="lowercase tracking-tight"
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
          </Link>
        ))}
        </div>
    </section>
  );
}

