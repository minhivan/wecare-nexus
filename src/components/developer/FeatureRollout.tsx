import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import { useState } from "react";

export const FeatureRollout = () => {
  const [rolloutPercentage, setRolloutPercentage] = useState([25]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(["beta-tester"]);

  const roles = [
    { id: "admin", label: "Admin" },
    { id: "staff", label: "Staff" },
    { id: "beta-tester", label: "Beta Tester" },
    { id: "public", label: "Public" },
  ];

  const toggleRole = (roleId: string) => {
    setSelectedRoles(prev =>
      prev.includes(roleId)
        ? prev.filter(r => r !== roleId)
        : [...prev, roleId]
    );
  };

  return (
    <Card className="p-6 bg-surface border-border border-warning/20">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-warning" />
        <h2 className="text-lg font-semibold text-foreground">
          Feature Rollout Management
        </h2>
        <Badge variant="outline" className="text-warning border-warning/30">
          Admin Only
        </Badge>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm text-muted-foreground">
            Target Roles
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {roles.map((role) => (
              <div
                key={role.id}
                className="flex items-center space-x-2 p-3 rounded-lg bg-input-bg/50 border border-border hover:border-accent/50 transition-colors cursor-pointer"
                onClick={() => toggleRole(role.id)}
              >
                <Checkbox
                  id={role.id}
                  checked={selectedRoles.includes(role.id)}
                  onCheckedChange={() => toggleRole(role.id)}
                />
                <Label
                  htmlFor={role.id}
                  className="text-sm cursor-pointer flex-1"
                >
                  {role.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-muted-foreground">
              Rollout Percentage
            </Label>
            <Badge variant="secondary" className="font-mono">
              {rolloutPercentage[0]}%
            </Badge>
          </div>
          <Slider
            value={rolloutPercentage}
            onValueChange={setRolloutPercentage}
            min={0}
            max={100}
            step={5}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Features will be enabled for {rolloutPercentage[0]}% of users in selected roles
          </p>
        </div>

        <div className="pt-4 flex justify-end">
          <Button className="bg-accent text-white hover:bg-accent/90">
            Push Configuration to Live
          </Button>
        </div>
      </div>
    </Card>
  );
};
