'use client';

import { motion } from 'framer-motion';

interface Experience {
  year: string;
  company: string;
  role: string;
  description: string;
}

const experiences: Experience[] = [
  {
    year: '2025',
    company: '*codeplain',
    role: 'product designer',
    description: 'designing a spec-driven code generation service. leading design and product marketing initiatives across all surface areas.',
  },
  {
    year: '2025',
    company: 'MIL',
    role: 'product designer',
    description: 'first designer working with the engineering team on core ux of a osint data collection platform for law enforcement and defense.',
  },
  {
    year: '2024',
    company: 'Soniox',
    role: 'product designer',
    description: 'first designer of a speech ai startup. shaped the overall user experience and brand identity of the website, console and playground. worked closely with founders and engineers to launch.',
  },
  {
    year: '2023',
    company: 'Klub Ada',
    role: 'co-founder, designer',
    description: 'started a community of women in tech, organized 20+ in-person events, 2 hackathons, and secured 3 long-term partnerships. the team consists of 12 volunteers and a community of 170+ members.',
  },
  {
    year: '2022',
    company: 'WordMe',
    role: 'co-founder, designer',
    description: 'created a card game to improve communication in a relationship. led product design and website development, and content strategy, won Google.org\'s Social Tides Aspire Award.',
  },
  {
    year: '2020',
    company: 'Sony',
    role: 'ux designer',
    description: 'designed 2 new edu-tech apps at sony r&d us. led remote user testing sessions, analyzed user feedback, designed end-to-end flows, landing pages, and app store assets.',
  },
];

export default function ExperienceSection() {
  return (
    <section className="min-h-screen px-8 md:px-16 lg:px-24 py-24 relative z-10 bg-white">
      <h2 className="text-4xl font-bold lowercase mb-16 text-black">experience</h2>

      <div className="space-y-12 max-w-5xl">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="grid md:grid-cols-[120px_1fr] gap-8 border-l-2 border-red/30 pl-8 pb-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="font-mono text-sm uppercase tracking-tight text-black/60">
              {exp.year}
            </div>
            <div>
              <h3 className="text-2xl font-bold lowercase text-black mb-1">
                {exp.company}
              </h3>
              <p className="font-mono text-xs uppercase tracking-tight text-red mb-4">
                {exp.role}
              </p>
              <p className="text-black/70 leading-relaxed">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

