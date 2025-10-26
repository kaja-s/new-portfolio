'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Track lane 1: Curved paths for first viewport (bottom-right corner)
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

// Track lane 2: Vertical straight paths for rest of scroll
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

export default function TrackLanes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const curvedPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const straightPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    // Animate curved paths
    const curvedPaths = curvedPathRefs.current.filter(Boolean) as SVGPathElement[];
    curvedPaths.forEach((path, index) => {
      const length = path.getTotalLength();
      
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: 0,
        opacity: 0.15 + (index * 0.02),
      });

      gsap.to(path, {
        opacity: 0.6 + (index * 0.03),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
    });

    // Animate straight paths
    const straightPaths = straightPathRefs.current.filter(Boolean) as SVGPathElement[];
    straightPaths.forEach((path, index) => {
      const length = path.getTotalLength();
      
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: 0,
        opacity: 0.15 + (index * 0.02),
      });

      gsap.to(path, {
        opacity: 0.6 + (index * 0.03),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="fixed top-0 right-0 w-full h-[300vh] pointer-events-none z-50">
      {/* First viewport - curved tracks in bottom-right */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-end justify-end">
        <svg
          viewBox="0 0 360 360"
          className="w-[400px] h-[400px] md:w-[500px] md:h-[500px]"
          preserveAspectRatio="xMinYMax meet"
        >
          {curvedTrackPaths.map((pathD, index) => (
            <path
              key={index}
              ref={(el) => {
                curvedPathRefs.current[index] = el;
              }}
              d={pathD}
              fill="none"
              stroke="#1E1E1E"
              strokeWidth="1"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
          ))}
        </svg>

        {/* Track and field record text */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-right">
          <p 
            className="text-black uppercase tracking-tight" 
            style={{ 
              fontFamily: 'Akkurat Mono, monospace',
              fontSize: '10px',
              letterSpacing: '-0.02em',
              lineHeight: '1.4'
            }}
          >
            personal record<br />
            distance: 400mh<br />
            time: 58.583
          </p>
        </div>
      </div>

      {/* Rest of scroll - straight vertical tracks on right edge */}
      <div className="fixed top-0 right-0 h-screen w-auto pointer-events-none">
        <svg
          viewBox="0 0 360 720"
          className="h-full w-auto"
          preserveAspectRatio="xMaxYMid meet"
        >
          {straightTrackPaths.map((pathD, index) => (
            <path
              key={index}
              ref={(el) => {
                straightPathRefs.current[index] = el;
              }}
              d={pathD}
              fill="none"
              stroke="#1E1E1E"
              strokeWidth="1"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
