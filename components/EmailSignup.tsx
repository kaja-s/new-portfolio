'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // TODO: Replace with actual Loops API key
      // For now, just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setMessage('✓ subscribed successfully!');
      setEmail('');
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage('something went wrong. please try again.');
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }
  };

  return (
    <section className="min-h-[60vh] px-8 md:px-16 lg:px-24 py-24 relative z-10 bg-red text-white flex items-center">
      <div className="max-w-screen-sm w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold lowercase mb-8">stay in touch</h2>
          <p className="font-mono text-sm uppercase tracking-tight mb-8 text-white/80">
            get updates on new projects, blog posts, and more
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === 'loading'}
              className="flex-1 px-6 py-4 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:border-white text-white placeholder-white/50 font-mono text-sm uppercase tracking-tight disabled:opacity-50"
            />
            <motion.button
              type="submit"
              disabled={status === 'loading'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-red font-mono text-sm uppercase tracking-tight rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'subscribing...' : 'subscribe'}
            </motion.button>
          </form>

          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 font-mono text-sm uppercase tracking-tight ${
                status === 'success' ? 'text-white' : 'text-white/70'
              }`}
            >
              {message}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

