'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Curved paths for first viewport (bottom-right corner)
const curvedTrackPaths = [
  "M360 1C161.454 1 1 161.454 1 360H0C0 160.901 160.901 0 360 0V1Z",
  "M360 15.5C169.739 15.5 16 169.737 16 360H15C15 169.187 169.185 14.5 360 14.5V15.5Z",
  "M360 30.5C178.023 30.5 31 178.021 31 360H30C30 177.471 177.469 29.5 360 29.5V30.5Z",
  "M360 45.5C186.307 45.5 46 186.305 46 360H45C45 185.755 185.753 44.5 360 44.5V45.5Z",
  "M360 60.5C194.592 60.5 61 194.59 61 360H60C60 194.04 194.037 59.5 360 59.5V60.5Z",
  "M360 75.5C202.876 75.5 76 202.874 76 360H75C75 202.324 202.322 74.5 360 74.5V75.5Z",
  "M360 90.5C211.16 90.5 91 211.158 91 360H90C90 210.608 210.606 89.5 360 89.5V90.5Z",
  "M360 105.5C219.445 105.5 106 219.442 106 360H105C105 218.893 218.89 104.5 360 104.5V105.5Z",
  "M360 120.5C227.729 120.5 121 227.726 121 360H120C120 227.177 227.174 119.5 360 119.5V120.5Z",
];

interface CurvedTrackLanesProps {
    strokeColor?: string;
  }

export default function CurvedTrackLanes({ strokeColor = '#1E1E1E' }: CurvedTrackLanesProps) {
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
      <div className="absolute bottom-0 right-0 w-full h-full flex items-end justify-end overflow-hidden">
        <svg
          viewBox="0 0 360 360"
          className="w-[400px] h-[400px] md:w-[500px] md:h-[500px]"
          preserveAspectRatio="xMinYMax meet"
        >
          {curvedTrackPaths.map((pathD, index) => (
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

