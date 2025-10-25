'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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
      <h2 className="text-4xl font-regular lowercase mb-16">work</h2>

      <div className="space-y-8 max-w-3xl">
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
              className="uppercase tracking-tight text-white mb-2 relative inline-block"
              style={{ 
                fontFamily: 'Akkurat Mono, monospace',
                fontSize: '16px',
                letterSpacing: '-0.02em'
              }}
            >
              {work.title}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-black origin-left"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: hoveredIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </h3>
            <p 
              className="uppercase tracking-tight mt-2"
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
    </section>
  );
}

