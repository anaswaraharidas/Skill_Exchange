import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useInView } from '@/utils/animations';
import { useAuth } from '@/context/AuthContext';
import AddSkillForm from '@/components/AddSkillForm';
import AddLearningForm from '@/components/dashboard/AddLearningForm';
import ProfileSidebar from '@/components/dashboard/ProfileSidebar';
import MySkillsTab from '@/components/dashboard/MySkillsTab';
import LearningTab from '@/components/dashboard/LearningTab';
import HistoryTab from '@/components/dashboard/HistoryTab';
import SettingsTab from '@/components/dashboard/SettingsTab';

interface LearningSkill {
  id: number;
  name: string;
  category: string;
  description: string;
  provider: string;
  status: string;
  matchStatus: "pending" | "matched" | "scheduled";
  scheduledDate?: string;
  meetingLink?: string;
}

interface MySkill {
  id: number;
  name: string;
  rating: number;
  category: string;
  status: "active" | "inactive";
}

const Dashboard = () => {
  const { ref: dashboardRef, inView: dashboardInView } = useInView();
  const { user } = useAuth();
  const [addSkillDialogOpen, setAddSkillDialogOpen] = useState(false);
  const [addLearningDialogOpen, setAddLearningDialogOpen] = useState(false);
  
  const [mySkills, setMySkills] = useState(() => {
    const savedSkills = localStorage.getItem('mySkills');
    return savedSkills ? JSON.parse(savedSkills) : [
      { id: 1, name: "Web Design", rating: 4.7, category: "Design", status: "active" },
      { id: 2, name: "React Development", rating: 4.9, category: "Development", status: "active" },
      { id: 3, name: "UI/UX Design", rating: 4.5, category: "Design", status: "inactive" },
    ];
  });
  
  const [learningSkills, setLearningSkills] = useState(() => {
    const savedLearningSkills = localStorage.getItem('learningSkills');
    return savedLearningSkills ? JSON.parse(savedLearningSkills) : [
      { 
        id: 1, 
        name: "Mobile App Development", 
        provider: "Sam Wilson", 
        status: "In Progress",
        matchStatus: "scheduled",
        scheduledDate: "Apr 15, 2025, 3:00 PM"
      },
      { 
        id: 2, 
        name: "Data Analysis", 
        provider: "Ankit Sharma", 
        status: "Scheduled",
        matchStatus: "matched"
      },
    ];
  });
  
  const exchangeHistory = [
    { 
      id: 1, 
      skill: "Web Design", 
      with: "John Doe", 
      date: "2023-05-15", 
      status: "Completed",
      rating: 5 
    },
    { 
      id: 2, 
      skill: "JavaScript Tutoring", 
      with: "Sarah Williams", 
      date: "2023-04-22", 
      status: "Completed",
      rating: 4 
    },
  ];

  useEffect(() => {
    localStorage.setItem('mySkills', JSON.stringify(mySkills));
  }, [mySkills]);

  useEffect(() => {
    localStorage.setItem('learningSkills', JSON.stringify(learningSkills));
  }, [learningSkills]);

  useEffect(() => {
    const pendingSkills = learningSkills.filter(skill => skill.matchStatus === "pending");
    
    if (pendingSkills.length > 0) {
      const matchingTimeout = setTimeout(() => {
        const updatedSkills = learningSkills.map(skill => {
          if (skill.matchStatus === "pending") {
            const teacherNames = ["Alex Garcia", "Taylor Wong", "Jordan Smith", "Casey Rivera", "Robin Chen"];
            const randomTeacher = teacherNames[Math.floor(Math.random() * teacherNames.length)];
            
            toast.success(`We found a teacher for "${skill.name}"!`, {
              description: `${randomTeacher} is available to teach you.`
            });
            
            return {
              ...skill,
              provider: randomTeacher,
              matchStatus: "matched"
            };
          }
          return skill;
        });
        
        setLearningSkills(updatedSkills);
      }, 5000);
      
      return () => clearTimeout(matchingTimeout);
    }
  }, [learningSkills]);

  const handleAddSkill = (skill: Omit<MySkill, 'id'>) => {
    const formattedSkill: MySkill = {
      id: Date.now(),
      name: skill.name,
      rating: 0,
      category: skill.category,
      status: "active"
    };
    
    setMySkills([...mySkills, formattedSkill]);
  };

  const handleAddLearningSkill = (learningSkill: Omit<LearningSkill, 'id'>) => {
    const formattedLearningSkill: LearningSkill = {
      id: Date.now(),
      name: learningSkill.name,
      category: learningSkill.category,
      description: learningSkill.description || "",
      provider: learningSkill.provider,
      status: "Requested",
      matchStatus: "matched"
    };

    setLearningSkills([...learningSkills, formattedLearningSkill]);
    
    toast.success(`Found a teacher for ${learningSkill.name}!`, {
      description: `${learningSkill.provider} will be teaching you.`
    });
  };

  const handleUpdateLearningSkill = (updatedSkill: LearningSkill) => {
    const updatedSkills = learningSkills.map(skill => 
      skill.id === updatedSkill.id ? updatedSkill : skill
    );
    setLearningSkills(updatedSkills);
    
    localStorage.setItem('learningSkills', JSON.stringify(updatedSkills));
    
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('learningSkillsUpdated'));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 md:px-6" ref={dashboardRef}>
          <div className={`flex flex-col md:flex-row gap-6 md:gap-10 transition-all duration-500 ${dashboardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <ProfileSidebar 
              user={user} 
              skillsCount={mySkills.length}
              learningCount={learningSkills.length}
              exchangesCount={exchangeHistory.length}
            />
            
            <div className="flex-1">
              <Tabs defaultValue="my-skills" className="w-full">
                <TabsList className="w-full grid grid-cols-4 md:grid-cols-4 mb-8">
                  <TabsTrigger 
                    value="my-skills"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-blue data-[state=active]:via-primary-violet data-[state=active]:to-primary-orange data-[state=active]:text-white"
                  >
                    My Skills
                  </TabsTrigger>
                  <TabsTrigger 
                    value="learning"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-blue data-[state=active]:via-primary-violet data-[state=active]:to-primary-orange data-[state=active]:text-white"
                  >
                    Learning
                  </TabsTrigger>
                  <TabsTrigger 
                    value="history"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-blue data-[state=active]:via-primary-violet data-[state=active]:to-primary-orange data-[state=active]:text-white"
                  >
                    History
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-blue data-[state=active]:via-primary-violet data-[state=active]:to-primary-orange data-[state=active]:text-white"
                  >
                    Settings
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="my-skills" className="animate-fade-in">
                  <MySkillsTab 
                    skills={mySkills} 
                    onAddSkill={() => setAddSkillDialogOpen(true)} 
                  />
                </TabsContent>
                
                <TabsContent value="learning" className="animate-fade-in">
                  <LearningTab 
                    skills={learningSkills}
                    onAddLearning={() => setAddLearningDialogOpen(true)}
                    onUpdateSkill={handleUpdateLearningSkill}
                  />
                </TabsContent>
                
                <TabsContent value="history" className="animate-fade-in">
                  <HistoryTab exchanges={exchangeHistory} />
                </TabsContent>
                
                <TabsContent value="settings" className="animate-fade-in">
                  <SettingsTab />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <AddSkillForm 
        open={addSkillDialogOpen} 
        onClose={() => setAddSkillDialogOpen(false)}
        onAddSkill={handleAddSkill}
      />
      
      <AddLearningForm
        open={addLearningDialogOpen}
        onClose={() => setAddLearningDialogOpen(false)}
        onAddLearning={handleAddLearningSkill}
      />
      
      <Footer />
    </div>
  );
};

export default Dashboard;
