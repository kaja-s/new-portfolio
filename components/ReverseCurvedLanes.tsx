'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Curved track paths from ReverseCurvedLane.svg
const curvedTrackPaths = [
  "M360 359C161.454 359 1 198.546 1 0H0C0 199.099 160.901 360 360 360V359Z",
  "M360 344.5C169.739 344.5 16 190.263 16 0H15C15 190.813 169.185 345.5 360 345.5V344.5Z",
  "M360 329.5C178.023 329.5 31 181.979 31 0H30C30 182.529 177.469 330.5 360 330.5V329.5Z",
  "M360 314.5C186.307 314.5 46 173.695 46 0H45C45 174.245 185.753 315.5 360 315.5V314.5Z",
  "M360 299.5C194.592 299.5 61 165.41 61 0H60C60 165.96 194.037 300.5 360 300.5V299.5Z",
  "M360 284.5C202.876 284.5 76 157.126 76 0H75C75 157.676 202.322 285.5 360 285.5V284.5Z",
  "M360 269.5C211.16 269.5 91 148.842 91 0H90C90 149.392 210.606 270.5 360 270.5V269.5Z",
  "M360 254.5C219.445 254.5 106 140.558 106 0H105C105 141.107 218.89 255.5 360 255.5V254.5Z",
  "M360 239.5C227.729 239.5 121 132.274 121 0H120C120 132.823 227.174 240.5 360 240.5V239.5Z",
];

interface ReverseCurvedLanesProps {
  strokeColor?: string;
}

export default function ReverseCurvedLanes({ strokeColor = '#FFFFFF20' }: ReverseCurvedLanesProps) {
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
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-0 right-0">
        <svg
          width="360"
          height="360"
          viewBox="0 0 360 360"
          className="w-[400px] h-[400px] md:w-[500px] md:h-[500px]"
          preserveAspectRatio="xMaxYMin meet"
        >
          <defs>
            <clipPath id="clip0_reverse_curved">
              <rect width="360" height="360" transform="matrix(1 0 0 -1 0 360)"/>
            </clipPath>
          </defs>
          <g clipPath="url(#clip0_reverse_curved)">
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
          </g>
        </svg>
      </div>
    </div>
  );
}

