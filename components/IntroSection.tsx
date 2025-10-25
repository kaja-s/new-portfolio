'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function IntroSection() {
  const [copied, setCopied] = useState(false);
  const [typedText, setTypedText] = useState('');
  
  const fullText = "a product designer based in berlin. i design and build interfaces for ai and early-stage startups from 0 → 1.";
  const secondLine = "with experience across sf, berlin, and india, i work independently to design, code, and launch products that scale.";

  useEffect(() => {
    let index = 0;
    const text = fullText + '\n\n' + secondLine;
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
    <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 relative z-10 bg-red text-white">
      {/* Logo in top left corner */}
      <motion.div
        className="absolute top-8 left-8 md:left-16 lg:left-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <Image src="/logo.svg" alt="Kaja Skerlj Logo" width={40} height={40} className="text-white" />
      </motion.div>

      <motion.div
        className="max-w-screen-sm"
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
          <p className="whitespace-pre-wrap">{typedText}</p>
        </div>

        <motion.div
          className="font-mono text-sm uppercase tracking-tight"
          animate={{
            opacity: copied ? [1, 0.5, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {copied ? (
            <span className="text-white">✓ email copied to clipboard</span>
          ) : (
            <span>
              press <kbd className="px-2 py-1 bg-white/20 rounded">C</kbd> to copy my email
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 5v14M19 12l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </section>
  );
}

