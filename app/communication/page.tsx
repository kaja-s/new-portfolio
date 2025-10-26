'use client';

import FeatherIcon, { Feather } from 'feather-icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function CommunicationPage() {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'initial-observations', label: 'Initial Observations' },
    { id: 'research', label: 'Market Research' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="flex">
        {/* Left Sidebar - Fixed */}
        <div className="hidden lg:block w-64 fixed left-0 top-0 h-screen px-8 pt-12">
          {/* Back Button */}
          <Link 
            href="/#work" 
            className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors text-sm uppercase mb-12"
            style={{ fontFamily: 'Akkurat Mono, monospace' }}
          >
            <FeatherIcon icon="arrow-left" size="16" strokeWidth={1} />
            Back
          </Link>

          {/* Sidebar Navigation */}
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block text-left w-full px-2 py-1 transition-colors text-sm ${
                  activeSection === section.id
                    ? 'text-black font-medium'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                style={{ fontFamily: 'Akkurat Mono, monospace' }}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Back Button */}
        <div className="lg:hidden px-8 pt-12 pb-6 w-full">
          <Link 
            href="/#work" 
            className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors text-sm uppercase"
            style={{ fontFamily: 'Akkurat Mono, monospace' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </Link>
        </div>

        {/* Main Content - Offset by sidebar width */}
        <div className="w-full lg:ml-64">
          <div className="max-w-2xl mx-auto px-8 py-12 lg:py-24">
            <div className="space-y-12">
            {/* Intro Section */}
            <section>
            <h2 className="text-3xl font-bold lowercase mb-4">How to communicate in a relationship?</h2>
            <div className="mb-6">
              <Image 
                src="/photos/wordme.avif" 
                alt="WordMe card game"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </section>

          {/* Role Section */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4" style={{ fontFamily: 'Akkurat Mono, monospace', letterSpacing: '-0.02em', fontWeight: '400' }}>
              <div>
                <p className="text-sm uppercase mb-4 text-red">ROLE</p>
                <div className="space-y-1">
                  <p className="text-black text-sm">Product Designer</p>
                </div>
              </div>
              <div>
                <p className="text-sm uppercase mb-4 text-red">TIMELINE</p>
                <p className="text-black text-sm">May - August 2023</p>
              </div>
              <div>
                <p className="text-sm uppercase mb-4 text-red">TEAM</p>
                <div className="space-y-1">
                  <p className="text-black text-sm">1 Social Pedagogue</p>
                  <p className="text-black text-sm">1 Designer (me)</p>
                </div>
              </div>
              <div>
                <p className="text-sm uppercase mb-4 text-red">TOOLS</p>
                <div className="space-y-1">
                  <p className="text-black text-sm">Figma</p>
                  <p className="text-black text-sm">WordPress</p>
                  <p className="text-black text-sm">Elementor</p>
                  <p className="text-black text-sm">Make</p>
                </div>
              </div>
            </div>
          </section>

          {/* Overview Section */}
          <section id="overview">
            <p className="text-sm uppercase mb-4 text-red">overview</p>
            <h2 className="text-3xl font-bold lowercase mb-4">How might we help couples express their needs so they feel more connected and supported?</h2>
            <p style={{ fontFamily: 'Akkurat Mono, monospace', letterSpacing: '-0.02em', fontWeight: '400' }}>
              WordMe is a socially impactful company with a fundamental goal to create a platform for learning new communication skills in a relationship. Our first product is a set of 18 cards for couples who are consciously working on improving their communication to maintain a loving relationship.
            </p>
          </section>

          {/* Solution Section */}
          <section>
            <p className="text-sm uppercase mb-4 text-red">solution</p>
            <h2 className="text-3xl font-bold mb-4">WordMe: a set of 18 cards for couples to enhance their communication.</h2>
            <p className="mb-4" style={{ fontFamily: 'Akkurat Mono, monospace', letterSpacing: '-0.02em', fontWeight: '400' }}>
              <ol className="list-decimal list-inside space-y-2" style={{ fontFamily: 'Akkurat Mono, monospace', letterSpacing: '-0.02em' }}>
                <li>Look through the cards. Take a moment and recognize what you feel or need from your partner.</li>
                <li>Hand the chosen card to your partner. You can place it in their hands, leave it on a nightstand, or put it on a kitchen counter.</li>
                <li>Try to complete the exercise on the back of the card together. Reflect on the activity. How did it feel?</li>
              </ol>
            </p>
          </section>

          {/* Outcomes Section */}
          <section>
            <p className="text-sm uppercase mb-4 text-red">outcomes</p>
            <h2 className="text-3xl font-bold mb-4">We sold 200 card games through our website for 30 EUR/product.</h2>
            <ul className="list-disc list-inside space-y-2" style={{ fontFamily: 'Akkurat Mono, monospace', letterSpacing: '-0.02em' }}>
              <li>8 presentations at corporations and 3 sales to companies as a gift for their employees.</li>
              <li>1 podcast appearance at one of Slovenia&apos;s biggest podcasts, 1 trade show 8 blog posts and newsletters.</li>
            </ul>
          </section>

          {/* Initial Observations Section */}
          <section id="initial-observations">
            <p className="text-sm uppercase mb-4 text-red">initial observations</p>
            <h2 className="text-3xl font-bold mb-4">Lack of Communication in Modern Intimate Relationships</h2>
            <p className="mb-4" style={{ fontFamily: 'Akkurat Mono, monospace', letterSpacing: '-0.02em' }}>
              Isolation has become an epidemic in modern society, and romantic relationships should be a safe space where we can express emotions and needs. But are they really?
            </p>
            <ul className="list-disc list-inside space-y-2" style={{ fontFamily: 'Akkurat Mono, monospace', letterSpacing: '-0.02em' }}>
              <li><strong>87% of people experience deficient communication:</strong> We surveyed 130 participants using Google Forms and found that 87% of participants experienced deficient communication in their relationships.</li>
              <li><strong>A couple talks only 35 min per week:</strong> The average couple, with two children and jobs, talks to each other for only 35 minutes per week.</li>
              <li><strong>80% of divorces occur due to gradual alienation:</strong> 80% of divorces occur due to gradual alienation and a loss of intimacy, not due to infidelity, which accounts for only about 20% of cases.</li>
            </ul>
          </section>

          {/* Research Section */}
          <section id="research">
            <p className="text-sm uppercase mb-4 text-red">research</p>
            <h2 className="text-3xl font-bold mb-4">Visiting couples in their home</h2>
            <p className="mb-4" style={{ fontFamily: 'Akkurat Mono, monospace', letterSpacing: '-0.02em', fontWeight: '400' }}>
              We began our research with interviews, which allowed us to get to know couples in Ljubljana, Slovenia, mostly young, female, and in long-term relationships during the perinatal period. 10 one-hour-long interviews were conducted with questions grouped into the following sections.
            </p>
            <p className="mb-2" style={{ fontFamily: 'Akkurat Mono, monospace', letterSpacing: '-0.02em', fontWeight: '400' }}>
              We found out that:
            </p>
            <ul className="list-disc list-inside space-y-2" style={{ fontFamily: 'Akkurat Mono, monospace', letterSpacing: '-0.02em', fontWeight: '400' }}>
              <li>87% of participants experienced deficient communication in their relationships.</li>
              <li>28% of participants have experienced a divorce in their marriage or through their parents</li>
              <li>5 main burdens on a relationship: lack of communication, neglect of needs, lack of attention, lack of time together, and different views and values.</li>
            </ul>
          </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

