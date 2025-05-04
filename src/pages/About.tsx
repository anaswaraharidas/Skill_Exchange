
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { Button } from '@/components/ui/button';
import { usePageTransition } from '@/utils/animations';
import { Heart, Star, GitBranch, ArrowRight } from 'lucide-react';

const About = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { pageClass } = usePageTransition();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className={`flex-1 pt-24 ${pageClass}`}>
        {/* Hero Section */}
        <section className="py-16 md:py-24 abstract-bg">
          <div className="abstract-shape w-[500px] h-[500px] -right-64 -top-32"></div>
          <div className="abstract-shape w-[600px] h-[600px] -left-80 top-40"></div>
          
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                About SkillSwap
              </h1>
              <p className="text-xl text-muted-foreground mb-10">
                Creating a world where knowledge flows freely between people
              </p>
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16 bg-secondary/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="aspect-square max-w-md rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto">
                  <Heart className="h-24 w-24 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  At SkillSwap, we believe that everyone has valuable skills to share and skills they wish to learn. 
                  Our mission is to create a platform that enables direct skill exchange without monetary barriers.
                </p>
                <p className="text-lg text-muted-foreground">
                  We're creating an ecosystem where knowledge flows in all directions, allowing people to grow personally 
                  and professionally while forming meaningful connections with others who share their interests.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight">
                Our Core Values
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Principles that guide everything we do
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Accessibility",
                  description: "We believe knowledge should be accessible to everyone, regardless of financial means.",
                  icon: <GitBranch className="h-10 w-10 text-accent" />
                },
                {
                  title: "Community",
                  description: "Building strong connections between people with diverse skills and backgrounds.",
                  icon: <Heart className="h-10 w-10 text-accent" />
                },
                {
                  title: "Quality",
                  description: "Ensuring high-quality skill exchanges through ratings and feedback systems.",
                  icon: <Star className="h-10 w-10 text-accent" />
                }
              ].map((value, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 rounded-xl bg-background border border-border">
                  <div className="mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section (Updated with new names) */}
        <section className="py-16 bg-secondary/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight">
                Our Team
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The passionate people behind SkillSwap
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "Manjeet Jakhar", role: "Founder & CEO" },
                { name: "Sam Taylor", role: "CTO" },
                { name: "Shivang", role: "Head of Community" },
                { name: "Kunal", role: "UX Designer" }
              ].map((person, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full bg-muted mb-4"></div>
                  <h3 className="font-semibold">{person.name}</h3>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                Join our growing community
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8">
                Be part of a movement that's changing how we learn and share knowledge.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setShowAuthModal(true)}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <AuthModal isOpen={showAuthModal} onOpenChange={setShowAuthModal} defaultTab="signup" />
    </div>
  );
};

export default About;
