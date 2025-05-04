
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SettingsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your profile and preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-base font-medium mb-3">Notification Preferences</h3>
          <div className="space-y-2">
            {[
              'Email notifications for new messages',
              'Email notifications for new skill matches',
              'Push notifications for skill requests',
              'Newsletter and platform updates'
            ].map((pref, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-2">
                <span className="text-sm">{pref}</span>
                <div className="h-5 w-10 bg-secondary rounded-full relative">
                  <div className="absolute h-4 w-4 rounded-full bg-primary top-0.5 left-0.5"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-base font-medium mb-3">Privacy Settings</h3>
          <div className="space-y-2">
            {[
              'Show my profile to other users',
              'Allow skill recommendations',
              'Show my online status'
            ].map((pref, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-2">
                <span className="text-sm">{pref}</span>
                <div className="h-5 w-10 bg-accent rounded-full relative">
                  <div className="absolute h-4 w-4 rounded-full bg-white top-0.5 right-0.5"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsTab;
