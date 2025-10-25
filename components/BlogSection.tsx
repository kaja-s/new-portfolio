'use client';

import { motion } from 'framer-motion';

const blogPosts = [
  'first 6 months in berlin',
  'organizing a hackathon with 50-50 women-men participation',
  'research on environmental activism and art',
  'competing at world youth championship in 400mh',
  'comparison of living in 4 different countries',
  'running my first marathon',
];

export default function BlogSection() {
  return (
    <section className="min-h-screen px-8 md:px-16 lg:px-24 py-24 relative z-10 bg-black text-white">
      <h2 className="text-4xl font-bold lowercase mb-16">blog posts</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <div className="bg-white/5 hover:bg-red/20 transition-colors duration-300 rounded-lg p-6 h-full border border-white/10 hover:border-red/50">
              <span className="font-mono text-xs uppercase tracking-tight text-white/50 mb-4 block">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-mono text-sm uppercase tracking-tight">
                {post}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

