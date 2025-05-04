
import { useState } from 'react';
import { Star, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skill } from '@/lib/types';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import { useStaggeredAnimation } from '@/utils/animations';
import SkillDetailsModal from './SkillDetailsModal';

interface SkillCardProps {
  skill: Skill;
  index: number;
  variant?: 'default' | 'featured';
}

const SkillCard = ({ skill, index, variant = 'default' }: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { animationDelay } = useStaggeredAnimation(index);
  
  const isFeatured = variant === 'featured';
  
  return (
    <div 
      className={cn(
        'group relative rounded-xl overflow-hidden transition-all duration-300 animate-scale-in',
        isFeatured ? 'bg-white shadow-lg' : 'bg-white border border-border hover:shadow-md',
      )}
      style={{ animationDelay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <AspectRatio ratio={16/9}>
          <img 
            src={skill.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070'} 
            alt={skill.title}
            className={cn(
              'w-full h-full object-cover transition-transform duration-700',
              isHovered ? 'scale-105' : 'scale-100'
            )}
          />
        </AspectRatio>
        
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-xs">
            {skill.category}
          </Badge>
          
          {skill.rating && (
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-xs flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {skill.rating}
            </Badge>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg leading-tight line-clamp-1">
            {skill.title}
          </h3>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {skill.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <img 
              src={skill.owner.avatar} 
              alt={skill.owner.name}
              className="w-7 h-7 rounded-full object-cover border border-border"
            />
            <span className="text-xs font-medium">
              {skill.owner.name}
            </span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 text-xs gap-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            onClick={(e) => {
              e.preventDefault();
              setShowDetails(true);
            }}
          >
            View
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <SkillDetailsModal 
        skill={skill} 
        isOpen={showDetails} 
        onClose={() => setShowDetails(false)} 
      />
    </div>
  );
};

export default SkillCard;
