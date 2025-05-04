
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { usePageTransition } from '@/utils/animations';
import { MOCK_SKILLS, MOCK_USERS } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { generateZoomMeetingUrl } from '@/utils/zoomUtils';

// Import our refactored components
import ActiveSwapCard from '@/components/swap/ActiveSwapCard';
import PendingRequestCard from '@/components/swap/PendingRequestCard';
import EmptyState from '@/components/swap/EmptyState';
import MeetingDialog from '@/components/swap/MeetingDialog';
import ContactDialog from '@/components/swap/ContactDialog';
import SwapHeader from '@/components/swap/SwapHeader';

// Mock data for active swaps
const ACTIVE_SWAPS = [
  {
    id: '1',
    skill: MOCK_SKILLS[0],
    provider: MOCK_USERS[1],
    learner: MOCK_USERS[0],
    status: 'active',
    nextSession: new Date(Date.now() + 86400000 * 2), // 2 days from now
    meetingLink: '',
    phone: '+1 555-123-4567'
  },
  {
    id: '2',
    skill: MOCK_SKILLS[2],
    provider: MOCK_USERS[2],
    learner: MOCK_USERS[0],
    status: 'active',
    nextSession: new Date(Date.now() + 86400000 * 5), // 5 days from now
    meetingLink: generateZoomMeetingUrl(),
    phone: '+1 555-987-6543'
  }
];

// Mock data for pending swaps
const PENDING_SWAPS = [
  {
    id: '3',
    skill: MOCK_SKILLS[1],
    provider: MOCK_USERS[0],
    learner: MOCK_USERS[3],
    status: 'pending',
    requestDate: new Date(Date.now() - 86400000 * 2), // 2 days ago
    phone: '+1 555-456-7890'
  }
];

const Swap = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [showMeetingDialog, setShowMeetingDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [currentSwap, setCurrentSwap] = useState<any>(null);
  const [scheduledClasses, setScheduledClasses] = useState<any[]>([]);
  const { toast } = useToast();
  const { pageClass } = usePageTransition();
  const { user } = useAuth();
  
  // Use useRef for tracking the warning display
  const showDemoWarningRef = useRef(false);
  
  console.log("Swap page rendering");
  
  // Load scheduled classes from learning section
  useEffect(() => {
    const loadScheduledClasses = () => {
      console.log("Loading scheduled classes");
      const learningSkills = localStorage.getItem('learningSkills');
      if (learningSkills) {
        const parsedSkills = JSON.parse(learningSkills);
        const scheduled = parsedSkills.filter((skill: any) => 
          skill.matchStatus === "scheduled" && skill.scheduledDate
        );
        
        const scheduledSwaps = scheduled.map((skill: any) => ({
          id: `learning-${skill.id}`,
          skill: { title: skill.name },
          provider: { 
            name: skill.provider, 
            avatar: '', 
            location: 'Remote',
            phone: '+1 555-' + Math.floor(100 + Math.random() * 900) + '-' + 
                  Math.floor(1000 + Math.random() * 9000)
          },
          learner: MOCK_USERS[0],
          status: 'active',
          nextSession: new Date(skill.scheduledDate),
          meetingLink: skill.meetingLink || generateZoomMeetingUrl(),
          isFromLearningSection: true
        }));
        
        console.log("Scheduled swaps:", scheduledSwaps);
        setScheduledClasses(scheduledSwaps);
      }
    };
    
    loadScheduledClasses();
    
    // Listen for storage events to update when learning skills change
    window.addEventListener('storage', loadScheduledClasses);
    
    // Custom event for more explicit communication between components
    window.addEventListener('learningSkillsUpdated', loadScheduledClasses);
    
    return () => {
      window.removeEventListener('storage', loadScheduledClasses);
      window.removeEventListener('learningSkillsUpdated', loadScheduledClasses);
    };
  }, []);
  
  // Combine active swaps with scheduled classes
  const allActiveSwaps = [...ACTIVE_SWAPS, ...scheduledClasses];
  
  // Handle starting a meeting
  const handleStartMeeting = (swap: any) => {
    if (import.meta.env.DEV && !showDemoWarningRef.current) {
      showDemoWarningRef.current = true;
      toast({
        title: "Demo Mode",
        description: "This is a demo Zoom link and not an active meeting",
        variant: "destructive"
      });
    }
    
    // Open the meeting link in a new tab if it exists
    if (swap.meetingLink) {
      window.open(swap.meetingLink, '_blank');
    } else {
      setCurrentSwap(swap);
      setShowMeetingDialog(true);
    }
    
    showDemoWarningRef.current = false;
  };
  
  // Handle contact action
  const handleContact = (swap: any) => {
    setCurrentSwap(swap);
    setShowContactDialog(true);
  };
  
  // Handle saving a meeting
  const handleSaveMeeting = (meetingLink: string) => {
    toast({
      title: "Meeting created",
      description: "Your meeting link has been saved and shared with the participant"
    });
    
    setShowMeetingDialog(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-950 to-slate-950 text-slate-100">
      <Navbar />
      
      <main className={`flex-1 pt-24 pb-12 ${pageClass}`}>
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-4xl mx-auto">
            <SwapHeader activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <Tabs value={activeTab} className="w-full">
              <TabsContent value="active" className="animate-fade-in">
                {allActiveSwaps.length > 0 ? (
                  <div className="space-y-6">
                    {allActiveSwaps.map((swap) => (
                      <ActiveSwapCard
                        key={swap.id}
                        swap={swap}
                        onStartMeeting={handleStartMeeting}
                        onContact={handleContact}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState type="active" />
                )}
              </TabsContent>
              
              <TabsContent value="pending">
                {PENDING_SWAPS.length > 0 ? (
                  <div className="space-y-6">
                    {PENDING_SWAPS.map((swap) => (
                      <PendingRequestCard 
                        key={swap.id} 
                        swap={swap} 
                        onContact={handleContact}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState type="pending" />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <MeetingDialog
        open={showMeetingDialog}
        onOpenChange={setShowMeetingDialog}
        currentSwap={currentSwap}
        onSaveMeeting={handleSaveMeeting}
      />

      <ContactDialog
        open={showContactDialog}
        onOpenChange={setShowContactDialog}
        currentSwap={currentSwap}
      />
    </div>
  );
};

export default Swap;
