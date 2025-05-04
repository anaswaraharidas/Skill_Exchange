
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Star } from "lucide-react";

interface Skill {
  id: string | number;
  name: string;
  rating: number;
  category: string;
  status: string;
}

interface MySkillsTabProps {
  skills: Skill[];
  onAddSkill: () => void;
}

const MySkillsTab = ({ skills, onAddSkill }: MySkillsTabProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>My Skills</CardTitle>
          <CardDescription>Skills you're offering to others</CardDescription>
        </div>
        <Button size="sm" className="flex items-center gap-1" onClick={onAddSkill}>
          <PlusCircle className="w-4 h-4" /> Add Skill
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {skills.map(skill => (
            <div 
              key={skill.id} 
              className="p-4 rounded-lg bg-card border border-border flex items-center justify-between animate-fade-in"
            >
              <div>
                <h3 className="font-medium">{skill.name}</h3>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <span className="mr-3">{skill.category}</span>
                  <div className="flex items-center text-amber-500">
                    <Star className="w-3 h-3 fill-current mr-1" />
                    <span>{skill.rating}</span>
                  </div>
                </div>
              </div>
              <Badge 
                variant={skill.status === 'active' ? 'default' : 'secondary'}
              >
                {skill.status === 'active' ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          ))}

          {skills.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">You haven't added any skills yet</p>
              <Button onClick={onAddSkill}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Your First Skill
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MySkillsTab;
