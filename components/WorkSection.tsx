'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WorkItem {
  title: string;
  subtitle: string;
  description: string;
}

const works: WorkItem[] = [
  {
    title: 'osint + ai platform',
    subtitle: 'reimagining data collection and analysis',
    description: 'Data collection platform for law enforcement and defense',
  },
  {
    title: 'voice ai console',
    subtitle: 'dashboard design',
    description: 'Speech AI startup console and playground',
  },
  {
    title: 'women in tech community website',
    subtitle: 'brand identity, website development',
    description: 'Community platform for women in tech',
  },
  {
    title: 'communication card game',
    subtitle: 'product design',
    description: 'Card game to improve relationship communication',
  },
  {
    title: 'edtech for students',
    subtitle: 'ux design',
    description: 'Educational technology applications',
  },
];

export default function WorkSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="min-h-screen px-8 md:px-16 lg:px-24 py-24 relative z-10 bg-white">
      <h2 className="text-4xl font-bold lowercase mb-16 text-black">work</h2>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          {works.map((work, index) => (
            <motion.div
              key={index}
              className="cursor-pointer py-4"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.h3
                className="font-mono text-sm uppercase tracking-tight text-black mb-2"
                animate={{
                  x: hoveredIndex === index ? 10 : 0,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {work.title}
              </motion.h3>
              <motion.div
                className="h-px bg-red origin-left"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: hoveredIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <p className="text-black/60 text-sm mt-2">{work.subtitle}</p>
            </motion.div>
          ))}
        </div>

        {/* Preview area */}
        <div className="hidden md:block sticky top-24">
          <AnimatePresence mode="wait">
            {hoveredIndex !== null && (
              <motion.div
                key={hoveredIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-red/10 rounded-lg p-8 min-h-[400px] flex items-center justify-center"
              >
                <div className="text-center">
                  <h4 className="font-mono text-lg uppercase tracking-tight text-black mb-4">
                    {works[hoveredIndex].title}
                  </h4>
                  <p className="text-black/70">{works[hoveredIndex].description}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

