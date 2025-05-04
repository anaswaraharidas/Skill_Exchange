
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MOCK_USERS, MOCK_SKILLS } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Calendar, 
  Edit, 
  LogOut, 
  Settings, 
  Plus, 
  Star, 
  MessageSquare 
} from 'lucide-react';
import SkillCard from '@/components/SkillCard';
import { usePageTransition } from '@/utils/animations';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('skills');
  const { pageClass } = usePageTransition();
  
  // Mocked user data
  const user = MOCK_USERS[0];
  
  // Filter skills by the current user
  const userSkills = MOCK_SKILLS.filter(skill => skill.owner.id === user.id);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className={`flex-1 pt-20 ${pageClass}`}>
        <section className="bg-secondary/50 py-10">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Profile sidebar */}
              <div className="w-full md:w-72 lg:w-80">
                <div className="bg-white rounded-xl border border-border p-6 space-y-4">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="w-24 h-24 border-4 border-background">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="mt-4">
                      <h1 className="text-xl font-bold">{user.name}</h1>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{user.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>Member since {user.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm">{user.bio}</p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button className="w-full justify-start" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Account Settings
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-destructive" size="sm">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
                
                {/* Stats card */}
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-2">
                        <p className="text-2xl font-bold">{userSkills.length}</p>
                        <p className="text-xs text-muted-foreground">Skills</p>
                      </div>
                      <div className="p-2">
                        <p className="text-2xl font-bold">24</p>
                        <p className="text-xs text-muted-foreground">Exchanges</p>
                      </div>
                      <div className="p-2">
                        <p className="text-2xl font-bold">4.9</p>
                        <p className="text-xs text-muted-foreground">Rating</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Content area */}
              <div className="flex-1">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="bg-white rounded-xl border border-border overflow-hidden">
                    <TabsList className="w-full justify-start border-b border-border p-0 rounded-none h-auto bg-white">
                      <TabsTrigger 
                        value="skills" 
                        className="py-3 px-4 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
                      >
                        My Skills
                      </TabsTrigger>
                      <TabsTrigger 
                        value="exchanges" 
                        className="py-3 px-4 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
                      >
                        Exchanges
                      </TabsTrigger>
                      <TabsTrigger 
                        value="wishlist" 
                        className="py-3 px-4 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
                      >
                        Wishlist
                      </TabsTrigger>
                      <TabsTrigger 
                        value="reviews" 
                        className="py-3 px-4 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
                      >
                        Reviews
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="skills" className="p-6 focus-visible:outline-none focus-visible:ring-0">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold">My Skills</h2>
                        <Button size="sm">
                          <Plus className="mr-1 h-4 w-4" />
                          Add New Skill
                        </Button>
                      </div>
                      
                      {userSkills.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2">
                          {userSkills.map((skill, index) => (
                            <SkillCard key={skill.id} skill={skill} index={index} />
                          ))}
                        </div>
                      ) : (
                        <div className="bg-secondary rounded-lg p-8 text-center">
                          <h3 className="font-semibold text-lg mb-2">No skills listed yet</h3>
                          <p className="text-muted-foreground mb-4">Share your expertise by adding skills to your profile</p>
                          <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Your First Skill
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="exchanges" className="p-6 focus-visible:outline-none focus-visible:ring-0">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold">My Exchanges</h2>
                        <Button variant="outline" size="sm">
                          Filter
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        {[...Array(2)].map((_, i) => (
                          <div key={i} className="flex gap-4 p-4 rounded-lg border border-border">
                            <div className="flex-shrink-0">
                              <Avatar>
                                <AvatarImage src={`https://i.pravatar.cc/150?img=${i+2}`} alt="User" />
                                <AvatarFallback>U</AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">Skill Exchange with {i === 0 ? 'Jordan Lee' : 'Sam Wilson'}</h3>
                                <Badge variant="outline">{i === 0 ? 'In Progress' : 'Completed'}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {i === 0 ? 'Logo design' : 'Website development'} 
                                <span className="mx-2">↔</span>
                                {i === 0 ? 'Social media strategy' : 'Mobile app design'}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <div className="text-xs text-muted-foreground">
                                  Started on {i === 0 ? 'June 10, 2023' : 'May 25, 2023'}
                                </div>
                                <Button size="sm" variant="ghost" className="h-7 text-xs">
                                  <MessageSquare className="mr-1 h-3 w-3" />
                                  Message
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="wishlist" className="p-6 focus-visible:outline-none focus-visible:ring-0">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold">Skills Wishlist</h2>
                        <Button size="sm">
                          <Plus className="mr-1 h-4 w-4" />
                          Add to Wishlist
                        </Button>
                      </div>
                      
                      <div className="bg-secondary rounded-lg p-8 text-center">
                        <h3 className="font-semibold text-lg mb-2">Your wishlist is empty</h3>
                        <p className="text-muted-foreground mb-4">Add skills you're interested in learning</p>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Browse Skills
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="reviews" className="p-6 focus-visible:outline-none focus-visible:ring-0">
                      <h2 className="text-lg font-semibold mb-6">Reviews (12)</h2>
                      
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="p-4 rounded-lg border border-border">
                            <div className="flex items-start gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={`https://i.pravatar.cc/150?img=${i+5}`} alt="User" />
                                <AvatarFallback>U</AvatarFallback>
                              </Avatar>
                              
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">
                                    {['Taylor Swift', 'Sam Wilson', 'Jordan Lee'][i]}
                                  </h4>
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, starIndex) => (
                                      <Star
                                        key={starIndex}
                                        className={`h-4 w-4 ${
                                          starIndex < (5 - i * 0.5)
                                            ? 'text-yellow-400 fill-yellow-400'
                                            : 'text-muted'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                
                                <p className="text-sm text-muted-foreground mt-1">
                                  For: {['Logo design', 'Website development', 'Mobile app design'][i]}
                                </p>
                                
                                <p className="mt-2 text-sm">
                                  {[
                                    'Alex created an amazing logo that perfectly captured our brand identity. The process was smooth and Alex was very responsive to feedback.',
                                    'Really impressed with the website Alex designed. Clean code, responsive design, and it looks fantastic!',
                                    'The app design exceeded my expectations. Alex has a great eye for detail and user experience.'
                                  ][i]}
                                </p>
                                
                                <div className="mt-2 text-xs text-muted-foreground">
                                  {['July 12, 2023', 'June 5, 2023', 'May 20, 2023'][i]}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
