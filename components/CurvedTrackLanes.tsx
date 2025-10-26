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
  "M360 0.5C161.454 0.5 0.5 161.454 0.5 360H-0.5C-0.5 160.901 160.901 -0.5 360 -0.5V0.5Z",
  "M360 15.5C169.738 15.5 15.5 169.738 15.5 360H14.5C14.5 169.186 169.186 14.5 360 14.5V15.5Z",
  "M360 30.5C178.022 30.5 30.5 178.022 30.5 360H29.5C29.5 177.47 177.47 29.5 360 29.5V30.5Z",
  "M360 45.5C186.306 45.5 45.5 186.306 45.5 360H44.5C44.5 185.754 185.754 44.5 360 44.5V45.5Z",
  "M360 60.5C194.591 60.5 60.5 194.591 60.5 360H59.5C59.5 194.038 194.038 59.5 360 59.5V60.5Z",
  "M360 75.5C202.875 75.5 75.5 202.875 75.5 360H74.5C74.5 202.323 202.323 74.5 360 74.5V75.5Z",
  "M360 90.5C211.159 90.5 90.5 211.159 90.5 360H89.5C89.5 210.607 210.607 89.5 360 89.5V90.5Z",
  "M360 105.5C219.444 105.5 105.5 219.444 105.5 360H104.5C104.5 218.891 218.891 104.5 360 104.5V105.5Z",
  "M360 120.5C227.728 120.5 120.5 227.728 120.5 360H119.5C119.5 227.176 227.176 119.5 360 119.5V120.5Z",
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

