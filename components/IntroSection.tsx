'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import CurvedTrackLanes from './CurvedTrackLanes';

export default function IntroSection() {
  const [copied, setCopied] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isClient, setIsClient] = useState(false);
  
  const fullText = "a product designer based in berlin. i design and build interfaces for ai and early-stage startups from 0 → 1.";
  const secondLine = "with experience across sf, berlin, and brussels, i work independently to design, code, and launch products that scale.";
  const completeText = fullText + '\n\n' + secondLine;

  useEffect(() => {
    setIsClient(true);
    let index = 0;
    const text = completeText;
    const timer = setInterval(() => {
      if (index < text.length) {
        setTypedText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'c' || e.key === 'C') {
        navigator.clipboard.writeText('kaja.skerlj@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <section 
      className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 relative text-white overflow-hidden"
      style={{ 
        position: 'relative',
        backgroundImage: 'url(/photos/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#FB461F'
      }}
    >
      <CurvedTrackLanes strokeColor="#FFFFFF20" />
      <div className="max-w-screen-sm mx-auto w-full relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
        <h1 
          className="font-bold lowercase mb-8"
          style={{ fontSize: '26px' }}
        >
          kaja skerlj
        </h1>

        <div className="font-mono uppercase tracking-tight space-y-4 mb-8" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
          <p className="whitespace-pre-wrap">{isClient ? typedText : completeText}</p>
        </div>

        <motion.div
          className="font-mono text-sm uppercase tracking-tight"
          style={{ color: '#FDB5A5' }}
          animate={{
            opacity: copied ? [1, 0.5, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {copied ? (
            <span className="text-white">✓ email copied to clipboard</span>
          ) : (
            <span>
              press <kbd className="px-1.5 py-1 bg-[#FDB5A5]" style={{ color: 'var(--red)' }}>C</kbd> to copy my email
            </span>
          )}
        </motion.div>

        {/* Scroll indicator - below email copy section */}
        <motion.div
          className="mt-8"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M19 12l-7 7-7-7" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
          </svg>
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

