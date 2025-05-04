
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Mail, MessageSquare, Copy, ExternalLink } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentSwap: any;
}

const ContactDialog = ({ open, onOpenChange, currentSwap }: ContactDialogProps) => {
  const { toast } = useToast();

  if (!currentSwap) return null;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${type} has been copied`
    });
  };

  const person = currentSwap.provider || currentSwap.learner;
  const mockEmail = `${person.name.toLowerCase().replace(/\s/g, '.')}@example.com`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] bg-gradient-to-br from-purple-900 to-navy-900 text-white border-purple-700">
        <DialogHeader>
          <DialogTitle className="text-white">Contact {person.name}</DialogTitle>
          <DialogDescription className="text-purple-300">
            Choose how you'd like to connect with {person.name}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center py-4 border-b border-purple-800">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={person.avatar} alt={person.name} />
            <AvatarFallback className="bg-purple-700">{person.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium text-white">{person.name}</h4>
            <p className="text-sm text-purple-300">{person.location}</p>
          </div>
        </div>
        
        <div className="space-y-4 py-2">
          {/* Phone contact */}
          <div className="p-3 border rounded-md bg-purple-800/30 border-purple-700">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm font-medium text-white">Phone</p>
                  <p className="text-sm text-purple-300">{currentSwap.phone}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => copyToClipboard(currentSwap.phone, "Phone number")}
                  className="text-purple-300 hover:bg-purple-700 hover:text-white"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-purple-300 hover:bg-purple-700 hover:text-white"
                  onClick={() => window.open(`tel:${currentSwap.phone.replace(/\D/g, '')}`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Email contact */}
          <div className="p-3 border rounded-md bg-purple-800/30 border-purple-700">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm font-medium text-white">Email</p>
                  <p className="text-sm text-purple-300">{mockEmail}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => copyToClipboard(mockEmail, "Email address")}
                  className="text-purple-300 hover:bg-purple-700 hover:text-white"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-purple-300 hover:bg-purple-700 hover:text-white"
                  onClick={() => window.open(`mailto:${mockEmail}`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="pt-2">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-purple-700 text-purple-300 hover:bg-purple-800 hover:text-white"
          >
            Close
          </Button>
          <Button 
            onClick={() => {
              toast({
                title: "Message sent",
                description: `Your message has been sent to ${person.name}`
              });
              onOpenChange(false);
            }}
            className="bg-purple-700 hover:bg-purple-600 text-white"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
