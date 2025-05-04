
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, MessageSquare, ExternalLink, Video, Copy, AlertCircle, Phone } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ActiveSwapCardProps {
  swap: any;
  onStartMeeting: (swap: any) => void;
  onContact: (swap: any) => void;
}

const ActiveSwapCard = ({ swap, onStartMeeting, onContact }: ActiveSwapCardProps) => {
  const { toast } = useToast();
  const [showDemoWarning, setShowDemoWarning] = useState(false);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Meeting link has been copied"
    });
  };

  const handleJoinMeeting = () => {
    if (import.meta.env.DEV && !showDemoWarning) {
      setShowDemoWarning(true);
      toast({
        title: "Demo Mode",
        description: "This is a demo Zoom link and not an active meeting",
        variant: "destructive"
      });
      return;
    }
    
    onStartMeeting(swap);
    setShowDemoWarning(false);
  };

  return (
    <Card key={swap.id} className="overflow-hidden bg-gradient-to-br from-purple-900/50 to-navy-800/50 border-purple-700/30">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-purple-100">{swap.skill.title}</CardTitle>
            <CardDescription className="text-purple-300">
              Learning from {swap.provider.name}
            </CardDescription>
          </div>
          <div className="flex gap-2 items-center">
            <Badge className="bg-purple-600 text-white">Active</Badge>
            {swap.isFromLearningSection && (
              <Badge variant="outline" className="bg-blue-900/30 border-blue-700 text-blue-300">
                Scheduled Class
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex items-center mb-4">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage src={swap.provider.avatar} alt={swap.provider.name} />
            <AvatarFallback className="bg-purple-700 text-white">{swap.provider.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-white">{swap.provider.name}</p>
            <p className="text-sm text-purple-300">{swap.provider.location}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-purple-200">
            <Calendar className="mr-2 h-4 w-4 text-purple-400" />
            <span>Next session: {swap.nextSession.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm text-purple-200">
            <Clock className="mr-2 h-4 w-4 text-purple-400" />
            <span>Time: {swap.nextSession.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
        
        {swap.meetingLink && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center p-3 border rounded-md bg-purple-900/30 border-purple-700/50">
              <Video className="mr-2 h-4 w-4 text-purple-400" />
              <div className="flex-1 truncate mr-2">
                <span className="text-sm font-medium text-white">Meeting Link:</span>
                <a 
                  href={swap.meetingLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-purple-300 hover:text-purple-200 hover:underline ml-2"
                >
                  {swap.meetingLink}
                </a>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => copyToClipboard(swap.meetingLink)}
                className="text-purple-300 hover:text-purple-100 hover:bg-purple-800/50"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            {import.meta.env.DEV && (
              <div className="flex items-start gap-2 p-2 rounded-md bg-amber-900/30 border border-amber-700/50 text-amber-300 text-xs">
                <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Demo Mode:</strong> This is a demo Zoom link for testing purposes and will not connect to an actual meeting.
                </span>
              </div>
            )}
          </div>
        )}
        
        {swap.phone && (
          <div className="flex items-center p-3 border rounded-md bg-purple-900/30 border-purple-700/50 mt-3">
            <Phone className="mr-2 h-4 w-4 text-purple-400" />
            <div className="flex-1">
              <span className="text-sm font-medium text-white">Phone:</span>
              <span className="text-sm text-purple-300 ml-2">{swap.phone}</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => copyToClipboard(swap.phone)}
              className="text-purple-300 hover:text-purple-100 hover:bg-purple-800/50"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onContact(swap)}
          className="border-purple-700 text-purple-300 hover:bg-purple-800/70 hover:text-purple-100"
        >
          <Phone className="mr-2 h-4 w-4" />
          Contact
        </Button>
        
        <Button 
          size="sm"
          className="bg-purple-700 hover:bg-purple-600 text-white"
          onClick={handleJoinMeeting}
        >
          {swap.meetingLink ? (
            <>
              <ExternalLink className="mr-2 h-4 w-4" />
              Join Meeting
            </>
          ) : (
            <>
              <Video className="mr-2 h-4 w-4" />
              Start Meeting
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActiveSwapCard;
