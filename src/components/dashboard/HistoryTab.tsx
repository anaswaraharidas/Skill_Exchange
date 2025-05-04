
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Star } from "lucide-react";

interface ExchangeHistory {
  id: string | number;
  skill: string;
  with: string;
  date: string;
  status: string;
  rating: number;
}

interface HistoryTabProps {
  exchanges: ExchangeHistory[];
}

const HistoryTab = ({ exchanges }: HistoryTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exchange History</CardTitle>
        <CardDescription>Your past skill exchanges</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {exchanges.map(exchange => (
            <div 
              key={exchange.id} 
              className="p-4 rounded-lg bg-card border border-border animate-fade-in"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{exchange.skill}</h3>
                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                    <Users className="w-3 h-3 mr-1" />
                    <span>With: {exchange.with}</span>
                  </div>
                </div>
                <Badge variant="outline">
                  {exchange.status}
                </Badge>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="text-sm text-muted-foreground">
                  <Clock className="w-3 h-3 inline mr-1" />
                  <span>{new Date(exchange.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 ${i < exchange.rating ? 'fill-current' : ''}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryTab;
