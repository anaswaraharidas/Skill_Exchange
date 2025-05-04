import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SkillCard from '@/components/SkillCard';
import AuthModal from '@/components/AuthModal';
import { MOCK_SKILLS, CATEGORIES } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import { usePageTransition } from '@/utils/animations';

const Skills = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredSkills, setFilteredSkills] = useState(MOCK_SKILLS);
  const { pageClass } = usePageTransition();
  
  useEffect(() => {
    // Filter skills based on search query and selected categories
    let filtered = MOCK_SKILLS;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(skill => {
        // Check title and description
        const titleMatch = skill.title.toLowerCase().includes(query);
        const descMatch = skill.description.toLowerCase().includes(query);
        const categoryMatch = skill.category.toLowerCase().includes(query);
        
        // Check owner's name and skills
        const ownerNameMatch = skill.owner.name.toLowerCase().includes(query);
        const ownerSkillsMatch = skill.owner.skills?.some(s => 
          s.toLowerCase().includes(query)
        ) || false;
        
        return titleMatch || descMatch || categoryMatch || ownerNameMatch || ownerSkillsMatch;
      });
    }
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(skill => 
        selectedCategories.some(category => 
          skill.category.toLowerCase().includes(category.toLowerCase())
        )
      );
    }
    
    // Sort by rating (highest first)
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    setFilteredSkills(filtered);
  }, [searchQuery, selectedCategories]);
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className={`flex-1 pt-20 ${pageClass}`}>
        <section className="py-10 bg-secondary/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Browse Skills
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Discover and connect with talented individuals around the world
              </p>
            </div>
            
            <div className="mt-8 max-w-lg mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for skills..."
                  className="pl-10 py-6 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-10">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filters sidebar */}
              <div className="w-full md:w-64 lg:w-72">
                <div className="sticky top-24 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                    </h3>
                    
                    {(selectedCategories.length > 0 || searchQuery) && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-xs"
                        onClick={clearFilters}
                      >
                        Clear all
                        <X className="ml-1 h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Categories</h4>
                    <div className="space-y-2">
                      {CATEGORIES.map((category) => (
                        <div key={category.id} className="flex items-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`justify-start px-2 h-8 w-full ${
                              selectedCategories.includes(category.name)
                                ? 'bg-accent/40 text-accent-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                            onClick={() => toggleCategory(category.name)}
                          >
                            <div className={`w-3 h-3 rounded-sm mr-2 ${
                              selectedCategories.includes(category.name)
                                ? 'bg-primary'
                                : 'border border-muted-foreground'
                            }`}></div>
                            {category.name}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Skills grid */}
              <div className="flex-1">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground">
                      Showing <span className="font-medium text-foreground">{filteredSkills.length}</span> skills
                    </p>
                    
                    {/* Active filters */}
                    {(selectedCategories.length > 0 || searchQuery) && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {searchQuery && (
                          <Badge variant="secondary" className="pl-2 pr-1 py-1 h-6">
                            "{searchQuery}"
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 ml-1"
                              onClick={() => setSearchQuery('')}
                            >
                              <X className="h-2.5 w-2.5" />
                            </Button>
                          </Badge>
                        )}
                        
                        {selectedCategories.map(category => (
                          <Badge key={category} variant="secondary" className="pl-2 pr-1 py-1 h-6">
                            {category}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 ml-1"
                              onClick={() => toggleCategory(category)}
                            >
                              <X className="h-2.5 w-2.5" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Sort options would go here */}
                </div>
                
                {filteredSkills.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-black ">
                    {filteredSkills.map((skill, index) => (
                      <SkillCard key={skill.id} skill={skill} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-secondary rounded-lg p-8 text-center ">
                    <h3 className="font-semibold text-lg mb-2 ">No skills found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filters</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4"
                      onClick={clearFilters}
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <AuthModal isOpen={showAuthModal} onOpenChange={setShowAuthModal} />
    </div>
  );
};

export default Skills;
