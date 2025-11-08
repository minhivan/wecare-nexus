import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Shield, Smartphone, Globe, Settings } from "lucide-react";

const activeSessions = [
  { device: "Chrome on MacOS", location: "San Francisco, US", lastActive: "Active now", current: true },
  { device: "Safari on iPhone", location: "San Francisco, US", lastActive: "2 hours ago", current: false },
  { device: "Firefox on Windows", location: "New York, US", lastActive: "1 day ago", current: false },
];

const trustedIPs = [
  { ip: "192.168.1.1", label: "Office Network", status: "active" },
  { ip: "10.0.0.1", label: "Home Network", status: "active" },
];

export const SecurityTab = () => {
  return (
    <div className="space-y-6">
      {/* Active Sessions */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Active Sessions
          </CardTitle>
          <CardDescription>Manage your active login sessions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {activeSessions.map((session, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/30"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{session.device}</h4>
                  {session.current && <Badge variant="default">Current</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">
                  {session.location} • {session.lastActive}
                </p>
              </div>
              {!session.current && (
                <Button variant="ghost" size="sm">
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* IP Whitelist */}
      <Card className="glass border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                IP Whitelist
              </CardTitle>
              <CardDescription>Restrict access to trusted IP addresses</CardDescription>
            </div>
            <Button variant="outline">Add IP</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {trustedIPs.map((ip, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-lg border border-border/50"
            >
              <div>
                <h4 className="font-medium font-mono">{ip.ip}</h4>
                <p className="text-sm text-muted-foreground">{ip.label}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={ip.status === "active" ? "default" : "secondary"} className="bg-emerald text-white">
                  Active
                </Badge>
                <Button variant="ghost" size="sm">Remove</Button>
              </div>
            </div>
          ))}
          {trustedIPs.length === 0 && (
            <div className="text-center py-8">
              <Globe className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground">No IP restrictions configured</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Policies */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Security Policies
          </CardTitle>
          <CardDescription>Enforce platform-wide security rules</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30">
            <div>
              <Label htmlFor="2fa">Mandatory Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Require 2FA for all team members</p>
            </div>
            <Switch id="2fa" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30">
            <div>
              <Label htmlFor="password">Strong Password Policy</Label>
              <p className="text-sm text-muted-foreground">Minimum 12 characters with special symbols</p>
            </div>
            <Switch id="password" defaultChecked />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30">
            <div>
              <Label htmlFor="session">Session Timeout</Label>
              <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
            </div>
            <Input
              id="session"
              type="number"
              defaultValue={30}
              className="w-20 glass border-0 text-center"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30">
            <div>
              <Label htmlFor="audit">Audit Logging</Label>
              <p className="text-sm text-muted-foreground">Record all security-related events</p>
            </div>
            <Switch id="audit" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Security Overview */}
      <Card className="glass border-0 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald/10 to-cyan/10" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Score
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald to-cyan flex items-center justify-center">
              <span className="text-3xl font-bold text-white">92</span>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Excellent Security</h4>
              <p className="text-sm text-muted-foreground">
                Your account is well protected. Consider enabling 2FA for all team members to reach 100%.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
