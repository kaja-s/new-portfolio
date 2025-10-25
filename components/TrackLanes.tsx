'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

interface TrackLaneProps {
  index: number;
  scrollYProgress: any;
}

function TrackLane({ index, scrollYProgress }: TrackLaneProps) {
  return (
    <motion.div
      className="absolute right-0 h-1 bg-red"
      style={{
        y: scrollYProgress,
        opacity: scrollYProgress,
        width: `${60 - index * 5}%`,
        borderRadius: '0 100px 100px 0',
        top: `${index * 80}px`,
      }}
      initial={{ opacity: 0.3 + index * 0.05 }}
      animate={{
        opacity: [0.3 + index * 0.05, 0.5 + index * 0.05, 0.8],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
        delay: index * 0.1,
      }}
    />
  );
}

export default function TrackLanes() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-0 right-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* Track lanes that intensify on scroll */}
      {[...Array(8)].map((_, i) => (
        <TrackLane key={i} index={i} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}

