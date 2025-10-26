'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Vertical straight paths
const straightTrackPaths = [
  "M1.00003 720H3.14722e-05L0 4.37113e-08L1 0L1.00003 720Z",
  "M16 720H15L15 4.37113e-08L16 0L16 720Z",
  "M31 720H30L30 4.37113e-08L31 0L31 720Z",
  "M46 720H45L45 4.37113e-08L46 0L46 720Z",
  "M61 720H60L60 4.37113e-08L61 0L61 720Z",
  "M76 720H75L75 4.37113e-08L76 0L76 720Z",
  "M106 720H105L105 4.37113e-08L106 0L106 720Z",
  "M121 720H120L120 4.37113e-08L121 0L121 720Z",
  "M91 720H90L90 4.37113e-08L91 0L91 720Z",
];

interface StraightTrackLanesProps {
  strokeColor?: string;
}

export default function StraightTrackLanes({ strokeColor = '#1E1E1E' }: StraightTrackLanesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const paths = pathRefs.current.filter(Boolean) as SVGPathElement[];

    paths.forEach((path, index) => {
      const length = path.getTotalLength();
      
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: 0,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute top-0 right-0 h-full w-auto overflow-hidden">
        <svg
          viewBox="0 0 360 720"
          className="w-[400px] md:w-[500px]"
          preserveAspectRatio="xMaxYMid meet"
        >
          {straightTrackPaths.map((pathD, index) => (
            <path
              key={index}
              ref={(el) => {
                pathRefs.current[index] = el;
              }}
              d={pathD}
              fill={strokeColor}
              stroke={strokeColor}
              strokeWidth="0.4"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
