
import { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { validateZoomLink, generateZoomMeetingUrl } from '@/utils/zoomUtils';

interface MeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentSwap: any;
  onSaveMeeting: (meetingLink: string) => void;
}

const MeetingDialog = ({ open, onOpenChange, currentSwap, onSaveMeeting }: MeetingDialogProps) => {
  const [meetingLink, setMeetingLink] = useState('');
  const [meetingType, setMeetingType] = useState('zoom');
  const [linkError, setLinkError] = useState('');
  const [showCreateZoomOption, setShowCreateZoomOption] = useState(false);
  const { toast } = useToast();

  const handleMeetingLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    setMeetingLink(link);
    
    if (linkError) setLinkError('');
  };
  
  const handleCreateZoomMeeting = () => {
    const generatedLink = generateZoomMeetingUrl();
    setMeetingLink(generatedLink);
    setShowCreateZoomOption(false);
    
    toast({
      title: "Demo Zoom link generated",
      description: "This is a demo link format. To create a real meeting, use your Zoom account."
    });
  };
  
  const handleSaveMeeting = () => {
    if (!meetingLink) {
      setLinkError('Meeting link is required');
      return;
    }
    
    if (meetingType === 'zoom' && !validateZoomLink(meetingLink)) {
      setLinkError('Please enter a valid Zoom meeting link');
      return;
    }
    
    onSaveMeeting(meetingLink);
    
    // Reset form
    setMeetingLink('');
    setLinkError('');
    setShowCreateZoomOption(false);
  };
  
  const handleDialogClose = () => {
    onOpenChange(false);
    setMeetingLink('');
    setLinkError('');
    setShowCreateZoomOption(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Meeting</DialogTitle>
          <DialogDescription>
            Add a virtual meeting link to connect with{' '}
            {currentSwap?.learner?.name || 'your participant'}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <Tabs defaultValue="zoom" onValueChange={(value) => {
            setMeetingType(value);
            setLinkError('');
          }}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="zoom">Zoom</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>
            
            <TabsContent value="zoom" className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium">Zoom Meeting Link</h4>
                  {!showCreateZoomOption && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowCreateZoomOption(true)}
                    >
                      Create Demo Link
                    </Button>
                  )}
                </div>
                
                {showCreateZoomOption ? (
                  <div className="mb-4 p-4 border rounded-md bg-secondary/30">
                    <h5 className="text-sm font-medium mb-2">Demo Zoom Link</h5>
                    <div className="p-3 border-l-2 border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-xs mb-3">
                      <p className="font-medium mb-1 text-amber-700 dark:text-amber-400">Demo Mode Notice:</p>
                      <p className="text-muted-foreground">
                        This will generate a link with valid Zoom meeting format, but it's <strong>not an active meeting</strong>. 
                        In a real scenario, you would create a meeting in your Zoom account.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={handleCreateZoomMeeting}
                      >
                        Generate Demo Link
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowCreateZoomOption(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : null}
                
                <Input 
                  placeholder="https://zoom.us/j/1234567890?pwd=abcdef123456" 
                  value={meetingLink}
                  onChange={handleMeetingLinkChange}
                  className={linkError ? "border-destructive" : ""}
                />
                {linkError && (
                  <div className="flex items-center gap-2 mt-2 text-destructive text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{linkError}</span>
                  </div>
                )}
                <div className="mt-3 p-3 border-l-2 border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-xs">
                  <p className="font-medium mb-1">How to create a real Zoom meeting:</p>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                    <li>Sign in to your Zoom account at <a href="https://zoom.us/signin" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">zoom.us</a></li>
                    <li>Click "Host a Meeting" at the top right</li>
                    <li>Once in the meeting, click "Invite" then "Copy Invitation"</li>
                    <li>The link will look like: https://zoom.us/j/1234567890?pwd=abcdef123456</li>
                  </ol>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="teams" className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Microsoft Teams Link</h4>
                <Input 
                  placeholder="https://teams.microsoft.com/l/meetup-join/..." 
                  value={meetingLink}
                  onChange={handleMeetingLinkChange}
                  className={linkError ? "border-destructive" : ""}
                />
                {linkError && (
                  <div className="flex items-center gap-2 mt-2 text-destructive text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{linkError}</span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Paste your Microsoft Teams meeting link here.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="other" className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Other Meeting Platform</h4>
                <Input 
                  placeholder="https://..." 
                  value={meetingLink}
                  onChange={handleMeetingLinkChange}
                  className={linkError ? "border-destructive" : ""}
                />
                {linkError && (
                  <div className="flex items-center gap-2 mt-2 text-destructive text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{linkError}</span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Paste a meeting link from Google Meet, Skype, or any other platform.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveMeeting}>
            <LinkIcon className="mr-2 h-4 w-4" />
            Save & Share Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingDialog;
