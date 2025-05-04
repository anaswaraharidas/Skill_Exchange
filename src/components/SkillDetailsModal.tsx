
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, X, MessageCircle } from "lucide-react";
import { Skill } from "@/lib/types";

interface SkillDetailsModalProps {
  skill: Skill | null;
  isOpen: boolean;
  onClose: () => void;
}

const SkillDetailsModal = ({ skill, isOpen, onClose }: SkillDetailsModalProps) => {
  if (!skill) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-xl font-bold">{skill.title}</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription className="flex items-center gap-2 mt-2">
            <Badge variant="secondary">{skill.category}</Badge>
            {skill.rating && (
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span>{skill.rating}</span>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Skill image */}
        <div className="rounded-md overflow-hidden mb-4">
          <img 
            src={skill.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070'} 
            alt={skill.title}
            className="w-full h-48 object-cover"
          />
        </div>
        
        {/* Skill description */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
            <p className="mt-1">{skill.description}</p>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Offered by</h3>
            <div className="flex items-center gap-3">
              <img 
                src={skill.owner.avatar} 
                alt={skill.owner.name}
                className="w-10 h-10 rounded-full object-cover border border-border"
              />
              <div>
                <p className="font-medium">{skill.owner.name}</p>
                <p className="text-sm text-muted-foreground">{skill.owner.location || 'No location provided'}</p>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <Button className="w-full gap-2">
              <MessageCircle className="h-4 w-4" />
              Contact to Learn
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SkillDetailsModal;
