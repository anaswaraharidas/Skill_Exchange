
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedSkills from '@/components/FeaturedSkills';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { CATEGORIES } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useInView } from '@/utils/animations';

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');
  const { ref: howItWorksRef, inView: howItWorksInView } = useInView();
  const { ref: categoriesRef, inView: categoriesInView } = useInView();
  
  const handleShowSignIn = () => {
    setAuthModalTab('signin');
    setShowAuthModal(true);
  };
  
  const handleShowSignUp = () => {
    setAuthModalTab('signup');
    setShowAuthModal(true);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        {/* How it works section */}
        <section className="py-20" ref={howItWorksRef}>
          <div className="container px-4 md:px-6 mx-auto">
            <div className={`max-w-2xl mx-auto text-center transition-all duration-500 ${howItWorksInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-block px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
                Simple Process
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How SkillSwap Works
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our platform makes it easy to exchange skills with just a few simple steps
              </p>
            </div>
            
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                {
                  title: 'Create a profile',
                  description: 'Sign up and list your skills and expertise',
                  icon: '👤',
                  delay: 0
                },
                {
                  title: 'Find a match',
                  description: 'Browse and search for skills you need',
                  icon: '🔍',
                  delay: 100
                },
                {
                  title: 'Swap skills',
                  description: 'Connect, negotiate, and exchange skills',
                  icon: '🔄',
                  delay: 200
                }
              ].map((step, index) => (
                <div 
                  key={index}
                  className={`flex flex-col items-center text-center p-6 rounded-xl bg-white border border-border transition-all duration-500 delay-${step.delay} ${howItWorksInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}`}
                  style={{ 
                    transitionDelay: `${step.delay}ms`,
                    animationDelay: `${step.delay}ms` 
                  }}
                >
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-2xl">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-12">
              <Button size="lg" onClick={handleShowSignUp}>
                Get Started Now
              </Button>
            </div>
          </div>
        </section>
        
        <FeaturedSkills />
        
        {/* Categories section */}
        <section className="py-20" ref={categoriesRef}>
          <div className="container px-4 md:px-6 mx-auto">
            <div className={`max-w-2xl mx-auto text-center transition-all duration-500 ${categoriesInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Browse by Category
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Explore skills across various categories
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {CATEGORIES.map((category, index) => (
                <div 
                  key={category.id}
                  className={`group p-6 rounded-xl bg-accent/10 hover:bg-accent/20 transition-all duration-300 cursor-pointer animate-fade-in flex flex-col items-center justify-center text-center`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="mb-3 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium">{category.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-md">
                <h2 className="text-3xl font-bold tracking-tight">
                  Ready to start swapping skills?
                </h2>
                <p className="mt-4 text-primary-foreground/80">
                  Join our community today and start exchanging your expertise with talented individuals worldwide.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="min-w-[160px]"
                  onClick={handleShowSignIn}
                >
                  Sign In
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10 min-w-[160px]"
                  onClick={handleShowSignUp}
                >
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onOpenChange={setShowAuthModal} 
        defaultTab={authModalTab}
      />
    </div>
  );
};

export default Index;
