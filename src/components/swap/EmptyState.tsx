
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { VideoOff, MessageSquare } from 'lucide-react';

interface EmptyStateProps {
  type: 'active' | 'pending';
}

const EmptyState = ({ type }: EmptyStateProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-12">
      {type === 'active' ? (
        <VideoOff className="w-12 h-12 mx-auto mb-4 text-purple-400" />
      ) : (
        <MessageSquare className="w-12 h-12 mx-auto mb-4 text-purple-400" />
      )}
      
      <h3 className="text-xl font-medium mb-2 text-white">
        {type === 'active' ? 'No active swaps' : 'No pending requests'}
      </h3>
      <p className="text-purple-300 mb-6">
        {type === 'active' 
          ? "You don't have any active skill swaps at the moment."
          : "You don't have any pending skill swap requests at the moment."
        }
      </p>
      <Button onClick={() => navigate('/skills')} className="bg-purple-700 hover:bg-purple-600">
        Browse Skills
      </Button>
    </div>
  );
};

export default EmptyState;
