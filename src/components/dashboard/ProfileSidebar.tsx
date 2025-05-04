
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface ProfileSidebarProps {
  user: {
    name?: string;
    avatar?: string;
    location?: string;
  } | null;
  skillsCount: number;
  learningCount: number;
  exchangesCount: number;
}

const ProfileSidebar = ({ user, skillsCount, learningCount, exchangesCount }: ProfileSidebarProps) => {
  // Create avatar fallback from user's name
  const getAvatarFallback = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="md:w-64 lg:w-80 shrink-0">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 border-4 border-background">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={`${user?.name || 'User'}'s profile`} />
              <AvatarFallback className="text-2xl">{getAvatarFallback(user?.name || 'User')}</AvatarFallback>
            </Avatar>
            
            <h2 className="mt-4 text-xl font-semibold">{user?.name || 'User'}</h2>
            <p className="text-sm text-muted-foreground">{user?.location || 'No location set'}</p>
            
            <div className="flex items-center mt-2 text-amber-500">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-2 text-sm font-medium text-foreground">5.0</span>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Skills Added</span>
              <Badge variant="outline">{skillsCount}</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Skills Learning</span>
              <Badge variant="outline">{learningCount}</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Exchanges</span>
              <Badge variant="outline">{exchangesCount}</Badge>
            </div>
            
            <Button className="w-full mt-2" size="sm">
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSidebar;
