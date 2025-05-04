
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SkillCard from './SkillCard';
import { MOCK_SKILLS } from '@/lib/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { useInView } from '@/utils/animations';

const FeaturedSkills = () => {
  const [startIndex, setStartIndex] = useState(0);
  const isMobile = useIsMobile();
  const { ref, inView } = useInView();
  
  const featuredSkills = MOCK_SKILLS;
  const itemsPerView = isMobile ? 1 : 3;
  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex + itemsPerView < featuredSkills.length;
  
  const scrollLeft = () => {
    if (canScrollLeft) {
      setStartIndex(prev => Math.max(0, prev - 1));
    }
  };
  
  const scrollRight = () => {
    if (canScrollRight) {
      setStartIndex(prev => Math.min(featuredSkills.length - itemsPerView, prev + 1));
    }
  };
  
  const visibleSkills = featuredSkills.slice(startIndex, startIndex + itemsPerView);
  
  return (
    <section className="py-20 bg-secondary/50" ref={ref}>
      <div className="container px-4 md:px-6 mx-auto">
        <div className={`transition-all duration-500 ${inView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-between mb-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight">Featured Skills</h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Discover popular skills from our community members
              </p>
            </div>
            
            <div className="hidden sm:flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-9 w-9 rounded-full"
                onClick={scrollLeft}
                disabled={!canScrollLeft}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-9 w-9 rounded-full"
                onClick={scrollRight}
                disabled={!canScrollRight}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleSkills.map((skill, index) => (
              <SkillCard 
                key={skill.id} 
                skill={skill} 
                index={index}
                variant="featured" 
              />
            ))}
          </div>
          
          <div className="flex justify-center sm:hidden mt-8">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-9 w-9 rounded-full"
                onClick={scrollLeft}
                disabled={!canScrollLeft}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-9 w-9 rounded-full"
                onClick={scrollRight}
                disabled={!canScrollRight}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSkills;
