import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, Moon, Sun, Settings, LogOut, Book, Info, RotateCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/context/AuthContext';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    console.log("Current user in Navbar:", user);
  }, [user]);

  const handleLogin = () => {
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const navItems = [
    { name: 'Browse Skills', path: '/skills', icon: Book },
    { name: 'How It Works', path: '/how-it-works', icon: RotateCw },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Swap', path: '/swap', icon: RotateCw },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo',
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border/40 py-3' 
          : 'gradient-primary py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="relative z-10 flex items-center gap-2 hover-scale"
              aria-label="SkillSwap Home"
            >
              <div className="w-8 h-8 rounded-md gradient-primary flex items-center justify-center text-white text-xl font-bold animate-pulse-slow">
                S
              </div>
              <span className="font-medium text-lg gradient-text hidden sm:inline-block">
                SkillSwap
              </span>
            </Link>

            <div className="ml-6">
              {isLoggedIn && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2 hover-lift">
                      <User className="h-4 w-4" />
                      <span>{user.name.split(' ')[0]}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 animate-fade-in">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLogin}
                  className="gap-2 hover-lift"
                >
                  <User className="h-4 w-4" />
                  Login
                </Button>
              )}
            </div>
          </div>

          <nav className="hidden md:flex items-center ml-auto space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-1.5',
                  location.pathname === item.path
                    ? 'text-primary bg-primary/5 hover-glow'
                    : 'text-foreground/70 hover:text-foreground hover:bg-accent/10'
                )}
                onClick={() => console.log(`Navigating to: ${item.path}`)}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {!isMobile && (
              <div className="relative max-w-xs mr-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search skills..."
                  className="pl-9 w-[140px] lg:w-[240px] h-9 bg-secondary transition-all duration-300 focus:w-[280px]"
                />
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="mr-2 hover-scale"
            >
              {theme === 'dark' ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden hover-scale">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] sm:w-[380px] pt-12">
                <div className="h-full flex flex-col">
                  <div className="flex-1">
                    <div className="mb-4 relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search skills..."
                        className="pl-9 w-full bg-secondary"
                      />
                    </div>
                    
                    <nav className="flex flex-col space-y-1">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={cn(
                            'px-4 py-2.5 rounded-md text-base font-medium transition-colors flex items-center gap-2',
                            location.pathname === item.path
                              ? 'text-primary bg-primary/5'
                              : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                          )}
                          onClick={() => console.log(`Mobile: Navigating to: ${item.path}`)}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  
                  <div className="mt-auto pt-4 space-y-3">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium">Switch Theme</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="hover-scale"
                      >
                        {theme === 'dark' ? (
                          <Sun className="h-4 w-4" />
                        ) : (
                          <Moon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    
                    {isLoggedIn && user ? (
                      <>
                        <Button 
                          className="w-full justify-start"
                          onClick={() => navigate('/dashboard')}
                        >
                          <User className="mr-2 h-4 w-4" />
                          My Dashboard
                        </Button>
                        <Button 
                          variant="outline"
                          className="w-full justify-start"
                          onClick={handleLogout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <Button 
                        className="w-full justify-start"
                        onClick={handleLogin}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Login
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onOpenChange={setShowAuthModal} 
        onAuthSuccess={handleAuthSuccess}
      />
    </header>
  );
};

export default Navbar;
