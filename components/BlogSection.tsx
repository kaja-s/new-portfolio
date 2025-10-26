'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import StraightTrackLanes from './StraightTrackLanes';

const blogPosts = [
  'first 6 months in berlin',
  'organizing a hackathon with 50-50 women-men participation',
  'research on environmental activism and art',
  'competing at world youth championship in 400mh',
  'comparison of living in 4 different countries',
  'running my first marathon',
];

export default function BlogSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="min-h-screen px-8 md:px-16 lg:px-24 py-24 relative z-10 bg-black text-white">
      <StraightTrackLanes strokeColor="#FFFFFF20" />
      <div className="max-w-screen-sm mx-auto relative z-10">
        <h2 className="font-regular lowercase mb-16" style={{ fontSize: '26px' }}>blog posts</h2>

        <div className="space-y-8">
        {blogPosts.map((post, index) => (
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
                color: hoveredIndex === index ? 'var(--red)' : 'var(--white)'
              }}
            >
              {post}
            </h3>
          </motion.div>
        ))}
        </div>
      </div>
    </section>
  );
}

