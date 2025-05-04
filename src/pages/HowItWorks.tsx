
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { Button } from '@/components/ui/button';
import { usePageTransition } from '@/utils/animations';
import { ArrowRight, Check, Users, Award, Zap } from 'lucide-react';

const HowItWorks = () => {
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
                How SkillSwap Works
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-10">
                Exchange your skills without currency in just a few simple steps
              </p>
              <Button size="lg" onClick={() => setShowAuthModal(true)}>
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Steps Section */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight">
                Simple 3-Step Process
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                SkillSwap makes exchanging skills seamless and straightforward
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  step: 1,
                  title: "Create Your Profile",
                  description: "Sign up and list the skills you're willing to offer. Be specific about your expertise level and what you hope to learn.",
                  icon: Users
                },
                {
                  step: 2,
                  title: "Find Your Match",
                  description: "Browse skills that interest you and connect with people who might be interested in what you have to offer.",
                  icon: Award
                },
                {
                  step: 3,
                  title: "Swap & Learn",
                  description: "Arrange meetings (virtual or in-person) to exchange knowledge and develop new skills together.",
                  icon: Zap
                }
              ].map((item) => (
                <div key={item.step} className="relative flex flex-col items-center text-center p-8 rounded-xl bg-background border border-border">
                  <div className="absolute -top-6 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    {item.step}
                  </div>
                  <div className="mt-6 mb-4">
                    <item.icon className="h-12 w-12 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight">
                Why Choose SkillSwap?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Benefits that make our platform unique
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "No money involved - pure skill exchange",
                "Learn directly from experienced practitioners",
                "Build meaningful professional connections",
                "Develop skills at your own pace",
                "Access diverse knowledge across domains",
                "Community-verified skill ratings"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start p-4">
                  <div className="mr-4 mt-1">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <p className="font-medium">{benefit}</p>
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
                Ready to start your skill exchange journey?
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8">
                Join thousands of people who are already exchanging skills and expanding their knowledge.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setShowAuthModal(true)}
              >
                Create Your Account
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

export default HowItWorks;
