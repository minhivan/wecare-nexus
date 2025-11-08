import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Users, Shield, Activity, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const teamMembers = [
  { name: "Sarah Anderson", role: "Admin", status: "active", avatar: "Sarah", lastActive: "2 minutes ago" },
  { name: "Michael Chen", role: "Manager", status: "active", avatar: "Michael", lastActive: "1 hour ago" },
  { name: "Emma Wilson", role: "Volunteer", status: "active", avatar: "Emma", lastActive: "3 hours ago" },
  { name: "James Rodriguez", role: "Manager", status: "pending", avatar: "James", lastActive: "Never" },
];

const permissions = [
  { module: "Campaigns", create: true, edit: true, delete: false, view: true },
  { module: "Donations", create: false, edit: true, delete: false, view: true },
  { module: "Payouts", create: false, edit: false, delete: false, view: true },
  { module: "Reports", create: false, edit: false, delete: false, view: true },
];

export const TeamRolesTab = () => {
  return (
    <div className="space-y-6">
      {/* Team Members */}
      <Card className="glass border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Members
              </CardTitle>
              <CardDescription>Manage your team and their access levels</CardDescription>
            </div>
            <Button>Invite Member</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.avatar}`} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{member.name}</span>
                    <Badge variant={member.status === "active" ? "default" : "secondary"}>
                      {member.role}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Last active: {member.lastActive}</p>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Change Role</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Revoke Access</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Permission Matrix */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Role Permissions Matrix
          </CardTitle>
          <CardDescription>Define what each role can do across modules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Module</th>
                  <th className="text-center py-3 px-4 font-medium">Create</th>
                  <th className="text-center py-3 px-4 font-medium">Edit</th>
                  <th className="text-center py-3 px-4 font-medium">Delete</th>
                  <th className="text-center py-3 px-4 font-medium">View</th>
                </tr>
              </thead>
              <tbody>
                {permissions.map((perm) => (
                  <tr key={perm.module} className="border-b last:border-0">
                    <td className="py-3 px-4 font-medium">{perm.module}</td>
                    <td className="text-center py-3 px-4">
                      <Switch checked={perm.create} />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Switch checked={perm.edit} />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Switch checked={perm.delete} />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Switch checked={perm.view} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Team Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { user: "Sarah Anderson", action: "logged in", device: "Chrome on MacOS", time: "2 min ago" },
            { user: "Michael Chen", action: "created campaign", device: "Safari on iPhone", time: "1 hour ago" },
            { user: "Emma Wilson", action: "edited donation", device: "Firefox on Windows", time: "3 hours ago" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between text-sm p-3 rounded-lg bg-muted/30">
              <div>
                <span className="font-medium">{activity.user}</span> {activity.action}
                <span className="text-muted-foreground"> • {activity.device}</span>
              </div>
              <span className="text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
