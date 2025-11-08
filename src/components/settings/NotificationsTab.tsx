import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Bell, Mail, MessageSquare, Clock } from "lucide-react";

interface NotificationsTabProps {
  onChangeDetected: () => void;
}

export const NotificationsTab = ({ onChangeDetected }: NotificationsTabProps) => {
  const [channels, setChannels] = useState({
    email: true,
    push: true,
    telegram: false,
  });

  const [events, setEvents] = useState({
    newDonation: true,
    goalReached: true,
    teamMemberJoined: true,
    weeklyReport: false,
  });

  const [quietHours, setQuietHours] = useState([22, 7]); // 10 PM to 7 AM

  const handleChannelToggle = (channel: keyof typeof channels) => {
    setChannels(prev => ({ ...prev, [channel]: !prev[channel] }));
    onChangeDetected();
  };

  const handleEventToggle = (event: keyof typeof events) => {
    setEvents(prev => ({ ...prev, [event]: !prev[event] }));
    onChangeDetected();
  };

  return (
    <div className="space-y-6">
      {/* Delivery Channels */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Delivery Channels
          </CardTitle>
          <CardDescription>Choose how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <Label htmlFor="email">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">sarah@wecare.org</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={channels.email ? "default" : "secondary"}>
                {channels.email ? "Connected" : "Disabled"}
              </Badge>
              <Switch
                id="email"
                checked={channels.email}
                onCheckedChange={() => handleChannelToggle("email")}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan to-emerald flex items-center justify-center">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div>
                <Label htmlFor="push">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Browser & Mobile</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={channels.push ? "default" : "secondary"}>
                {channels.push ? "Connected" : "Disabled"}
              </Badge>
              <Switch
                id="push"
                checked={channels.push}
                onCheckedChange={() => handleChannelToggle("push")}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber to-fire-orange flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <Label htmlFor="telegram">Telegram</Label>
                <p className="text-sm text-muted-foreground">Not connected</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Disconnected</Badge>
              <Switch
                id="telegram"
                checked={channels.telegram}
                onCheckedChange={() => handleChannelToggle("telegram")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Triggers */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle>Event Triggers</CardTitle>
          <CardDescription>Control when you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { key: "newDonation", label: "New Donation Received", description: "Get notified when someone donates" },
            { key: "goalReached", label: "Campaign Goal Reached", description: "Celebrate when goals are met" },
            { key: "teamMemberJoined", label: "Team Member Joined", description: "Know when someone joins your team" },
            { key: "weeklyReport", label: "Weekly Summary Report", description: "Receive weekly performance digest" },
          ].map((event) => (
            <div key={event.key} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30">
              <div>
                <Label htmlFor={event.key}>{event.label}</Label>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
              <Switch
                id={event.key}
                checked={events[event.key as keyof typeof events]}
                onCheckedChange={() => handleEventToggle(event.key as keyof typeof events)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Quiet Hours
          </CardTitle>
          <CardDescription>
            No notifications during: {quietHours[0]}:00 - {quietHours[1]}:00
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={quietHours}
              onValueChange={(value) => {
                setQuietHours(value);
                onChangeDetected();
              }}
              min={0}
              max={24}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>12 AM</span>
              <span>6 AM</span>
              <span>12 PM</span>
              <span>6 PM</span>
              <span>12 AM</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
