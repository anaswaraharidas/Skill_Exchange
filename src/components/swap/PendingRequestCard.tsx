
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
import { Calendar, Check, X, Phone } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PendingRequestCardProps {
  swap: any;
  onContact?: (swap: any) => void;
}

const PendingRequestCard = ({ swap, onContact }: PendingRequestCardProps) => {
  const { toast } = useToast();
  
  return (
    <Card key={swap.id} className="overflow-hidden bg-gradient-to-br from-purple-900/50 to-navy-800/50 border-purple-700/30">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-purple-100">{swap.skill.title}</CardTitle>
            <CardDescription className="text-purple-300">
              Request from {swap.learner.name}
            </CardDescription>
          </div>
          <Badge variant="outline" className="border-amber-500 text-amber-300">Pending</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex items-center mb-4">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage src={swap.learner.avatar} alt={swap.learner.name} />
            <AvatarFallback className="bg-purple-700 text-white">{swap.learner.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-white">{swap.learner.name}</p>
            <p className="text-sm text-purple-300">{swap.learner.location}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center text-sm text-purple-200">
            <Calendar className="mr-2 h-4 w-4 text-purple-400" />
            <span>Requested on: {swap.requestDate.toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="p-3 border rounded-md bg-purple-900/30 border-purple-700/50 text-sm">
          <p className="font-medium mb-1 text-white">Message from {swap.learner.name}:</p>
          <p className="text-purple-300">
            I'm interested in learning {swap.skill.title} from you. I've been trying to improve my skills in this area and would love to exchange knowledge.
          </p>
        </div>
        
        {swap.phone && (
          <div className="flex items-center p-3 border rounded-md bg-purple-900/30 border-purple-700/50 mt-3">
            <Phone className="mr-2 h-4 w-4 text-purple-400" />
            <div className="flex-1">
              <span className="text-sm font-medium text-white">Phone:</span>
              <span className="text-sm text-purple-300 ml-2">{swap.phone}</span>
            </div>
            {onContact && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onContact(swap)}
                className="text-purple-300 hover:bg-purple-800/70 hover:text-purple-100"
              >
                <Phone className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between gap-4 pt-4">
        <Button 
          variant="outline" 
          size="sm"
          className="flex-1 border-rose-700 text-rose-300 hover:bg-rose-900/50 hover:text-rose-100"
          onClick={() => toast({
            title: "Request declined",
            description: "The request has been declined"
          })}
        >
          <X className="mr-2 h-4 w-4" />
          Decline
        </Button>
        
        <Button 
          size="sm"
          className="flex-1 bg-emerald-700 hover:bg-emerald-600 text-white"
          onClick={() => toast({
            title: "Request accepted",
            description: "The request has been accepted"
          })}
        >
          <Check className="mr-2 h-4 w-4" />
          Accept
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PendingRequestCard;
