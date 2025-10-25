'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socials = [
    { name: 'linkedin', url: '#' },
    { name: 'github', url: '#' },
    { name: 'twitter', url: '#' },
  ];

  return (
    <footer className="px-8 md:px-16 lg:px-24 py-12 relative z-10 bg-black text-white border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-mono text-xs uppercase tracking-tight text-white/50">
          © {currentYear} kaja skerlj
        </div>

        <div className="flex gap-8">
          {socials.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              className="font-mono text-xs uppercase tracking-tight text-white/70 hover:text-red transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {social.name}
            </motion.a>
          ))}
        </div>

        <div className="font-mono text-xs uppercase tracking-tight text-white/50">
          designed & developed by kaja
        </div>
      </div>
    </footer>
  );
}

