
import { useState, useEffect } from 'react';
import { ArrowRight, RefreshCw, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from '@/utils/animations';

const skills = [
  'Web Development',
  'Graphic Design',
  'Content Writing',
  'Photography',
  'Music Production',
  'Marketing',
  'Language Tutoring',
  'Fitness Coaching'
];

const Hero = () => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const { ref, inView } = useInView();
  
  // Rotate through skills
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkillIndex((prev) => (prev + 1) % skills.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden" ref={ref}>
      {/* Star background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/3" />
        
        {/* Star decorations */}
        {[...Array(8)].map((_, i) => (
          <Star 
            key={i}
            className="absolute text-primary/30 fill-primary/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
      
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-500 ${inView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
              <Star className="w-3.5 h-3.5 mr-2 fill-primary" />
              Skill exchange platform
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Trade skills, not money.<br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-primary">
                  Exchange <span className="font-extrabold">{skills[currentSkillIndex]}</span>
                </span>
                <span className="absolute inset-x-0 bottom-2 h-3 bg-primary/30 -z-10 rounded-sm"></span>
              </span>
            </h1>
            
            <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground sm:text-xl">
              Connect with talented individuals, exchange your expertise, and grow your skillset with SkillSwap.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="min-w-[160px] h-12 text-base rounded-md">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="min-w-[160px] h-12 text-base rounded-md">
                Browse Skills
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto transition-all duration-700 delay-300 ${inView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}`}>
            {[
              { label: 'Active users', value: '10,000+' },
              { label: 'Skills exchanged', value: '25,000+' },
              { label: 'Categories', value: '50+' },
              { label: 'Countries', value: '120+' }
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-xl star-card">
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
