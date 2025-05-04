import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, PlusCircle, Calendar, UserRound, Video } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { MOCK_SKILLS, MOCK_USERS } from "@/lib/types";

interface LearningSkill {
  id: string | number;
  name: string;
  provider: string;
  status: string;
  matchStatus?: "pending" | "matched" | "scheduled";
  scheduledDate?: string;
  meetingLink?: string;
}

interface LearningTabProps {
  skills: LearningSkill[];
  onAddLearning: () => void;
  onUpdateSkill: (updatedSkill: any) => void;
}

const LearningTab = ({ skills, onAddLearning, onUpdateSkill }: LearningTabProps) => {
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<LearningSkill | null>(null);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const { toast } = useToast();

  const findTeacherForSkill = (skillName: string) => {
    // First, try to find an exact match in MOCK_SKILLS
    const matchingSkill = MOCK_SKILLS.find(s => 
      s.title.toLowerCase() === skillName.toLowerCase() ||
      s.category.toLowerCase() === skillName.toLowerCase()
    );

    if (matchingSkill) {
      return matchingSkill.owner;
    }

    // If no exact match, look for partial matches in skills
    const partialMatchSkills = MOCK_SKILLS.filter(s => 
      s.title.toLowerCase().includes(skillName.toLowerCase()) ||
      s.category.toLowerCase().includes(skillName.toLowerCase())
    );

    if (partialMatchSkills.length > 0) {
      // Return the owner of the highest rated matching skill
      const highestRatedSkill = partialMatchSkills.reduce((prev, current) => 
        (prev.rating || 0) > (current.rating || 0) ? prev : current
      );
      return highestRatedSkill.owner;
    }

    // If no skill matches, look for teachers with matching skills
    const availableTeachers = MOCK_USERS.filter(user => 
      user.skills?.some(s => 
        s.toLowerCase().includes(skillName.toLowerCase()) ||
        skillName.toLowerCase().includes(s.toLowerCase())
      )
    );

    if (availableTeachers.length > 0) {
      // Return the most experienced teacher (based on creation date)
      return availableTeachers.reduce((prev, current) => 
        prev.createdAt < current.createdAt ? prev : current
      );
    }

    // If still no match, return a random teacher
    return MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
  };

  const handleScheduleClass = (skill: LearningSkill) => {
    setCurrentSkill(skill);
    setShowScheduleDialog(true);
    setScheduledDate("");
    setScheduledTime("");
    setMeetingLink("");
  };

  const handleSaveSchedule = () => {
    if (!scheduledDate || !scheduledTime) {
      toast({
        title: "Missing information",
        description: "Please select both date and time for the class",
        variant: "destructive"
      });
      return;
    }

    const formattedDate = new Date(scheduledDate);
    const [hours, minutes] = scheduledTime.split(":");
    formattedDate.setHours(parseInt(hours), parseInt(minutes));

    const formattedDateString = formattedDate.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });

    const teacher = findTeacherForSkill(currentSkill?.name || '');

    toast({
      title: "Class Scheduled!",
      description: `Your class has been scheduled with ${teacher.name} for ${formattedDateString}`
    });

    if (currentSkill) {
      onUpdateSkill({
        ...currentSkill,
        matchStatus: "scheduled",
        scheduledDate: formattedDateString,
        provider: teacher.name,
        meetingLink: meetingLink || generateZoomMeetingUrl()
      });
    }

    setShowScheduleDialog(false);
  };

  const handleJoinMeeting = (meetingLink: string) => {
    if (!meetingLink) {
      toast({
        title: "No meeting link available",
        description: "This class doesn't have a meeting link yet",
        variant: "destructive"
      });
      return;
    }

    if (import.meta.env.DEV) {
      toast({
        title: "Demo Mode",
        description: "This is a demo Zoom link and not an active meeting",
        variant: "destructive"
      });
    }

    window.open(meetingLink, '_blank');
  };

  const generateZoomMeetingUrl = () => {
    const meetingId = Math.floor(10000000000 + Math.random() * 90000000000);
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 6 + Math.floor(Math.random() * 5); i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return `https://zoom.us/j/${meetingId}?pwd=${password}`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Skills I'm Learning</CardTitle>
          <CardDescription>Skills you want to learn from others</CardDescription>
        </div>
        <Button size="sm" className="flex items-center gap-1" onClick={onAddLearning}>
          <PlusCircle className="w-4 h-4" /> Add Learning
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {skills.map(skill => (
            <div 
              key={skill.id} 
              className="p-4 rounded-lg bg-card border border-border flex flex-col md:flex-row md:items-center justify-between animate-fade-in gap-4"
            >
              <div>
                <h3 className="font-medium">{skill.name}</h3>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  {skill.matchStatus === "matched" || skill.matchStatus === "scheduled" ? (
                    <>
                      <UserRound className="w-3 h-3 mr-1" />
                      <span>Teacher: {skill.provider}</span>
                    </>
                  ) : (
                    <span className="italic">Looking for a teacher...</span>
                  )}
                </div>
                
                {skill.matchStatus === "scheduled" && skill.scheduledDate && (
                  <div className="flex items-center mt-1 text-sm text-emerald-600">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>Scheduled: {skill.scheduledDate}</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <Badge 
                  variant={
                    skill.matchStatus === "scheduled" ? "default" : 
                    skill.matchStatus === "matched" ? "default" : 
                    "secondary"
                  }
                  className={`${skill.matchStatus === "pending" ? "animate-pulse" : ""} 
                              ${skill.matchStatus === "scheduled" ? "bg-emerald-500 hover:bg-emerald-600" : ""}`}
                >
                  {skill.matchStatus === "scheduled" ? "Class Scheduled" : 
                   skill.matchStatus === "matched" ? "Teacher Found" : 
                   "Finding Teacher..."}
                </Badge>
                
                {skill.matchStatus === "matched" && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="whitespace-nowrap"
                    onClick={() => handleScheduleClass(skill)}
                  >
                    <Calendar className="w-3 h-3 mr-1" />
                    Schedule Class
                  </Button>
                )}
                
                {skill.matchStatus === "scheduled" && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="whitespace-nowrap"
                    onClick={() => handleJoinMeeting(skill.meetingLink || '')}
                  >
                    <Video className="w-3 h-3 mr-1" />
                    Join Class
                  </Button>
                )}
              </div>
            </div>
          ))}

          {skills.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">You haven't added any learning skills yet</p>
              <Button onClick={onAddLearning}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Your First Learning
              </Button>
            </div>
          )}
        </div>
      </CardContent>

      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule Your Class</DialogTitle>
            <DialogDescription>
              {currentSkill ? `Schedule a class for ${currentSkill.name} with ${currentSkill.provider}` : 'Schedule your class'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="date" className="text-sm font-medium">Date</label>
              <Input
                id="date"
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="time" className="text-sm font-medium">Time</label>
              <Input
                id="time"
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="meetingLink" className="text-sm font-medium">Meeting Link (Optional)</label>
              </div>
              
              <Tabs defaultValue="zoom">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="zoom">Zoom</TabsTrigger>
                  <TabsTrigger value="custom">Custom Link</TabsTrigger>
                </TabsList>
                
                <TabsContent value="zoom" className="space-y-3">
                  <div className="text-sm text-muted-foreground mt-2">
                    We'll generate a Zoom meeting link for you automatically when you schedule the class.
                  </div>
                </TabsContent>
                
                <TabsContent value="custom">
                  <Input
                    id="meetingLink"
                    placeholder="https://your-meeting-link.com"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Paste your own meeting link from Zoom, Google Meet, or any other platform.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSchedule}>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default LearningTab;
