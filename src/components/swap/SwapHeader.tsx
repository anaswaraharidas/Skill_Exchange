
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SwapHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SwapHeader = ({ activeTab, setActiveTab }: SwapHeaderProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Star className="h-6 w-6 text-purple-400 fill-purple-400" />
        <h1 className="text-3xl font-bold tracking-tight text-white">SkillSwap Exchanges</h1>
      </div>
      
      {import.meta.env.DEV && (
        <Alert className="mb-6 bg-blue-900/30 text-blue-300 border-blue-700">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Demo Mode:</strong> Meeting links in this environment are sample formats and won't connect to actual Zoom meetings. In production, you would create real meetings through your Zoom account.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="w-full mb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2 bg-purple-900/50">
            <TabsTrigger 
              value="active"
              className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
            >
              Active Swaps
            </TabsTrigger>
            <TabsTrigger 
              value="pending"
              className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
            >
              Pending Requests
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default SwapHeader;
