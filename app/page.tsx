import IntroSection from '@/components/IntroSection';
import WorkSection from '@/components/WorkSection';
import BlogSection from '@/components/BlogSection';
import ExperienceSection from '@/components/ExperienceSection';
import AboutSection from '@/components/AboutSection';
import EmailSignup from '@/components/EmailSignup';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <IntroSection />
      <WorkSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
