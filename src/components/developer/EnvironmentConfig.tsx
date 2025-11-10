import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const EnvironmentConfig = () => {
  const [mockData, setMockData] = useState(false);

  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Environment Configuration
      </h2>
      
      <div className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="environment" className="text-sm text-secondary-text">
              Environment
            </Label>
            <Select defaultValue="development">
              <SelectTrigger id="environment" className="bg-card border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="staging">Staging</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="sandbox">Sandbox</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="log-level" className="text-sm text-secondary-text">
              Log Level
            </Label>
            <Select defaultValue="info">
              <SelectTrigger id="log-level" className="bg-card border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="debug">Debug</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="api-endpoint" className="text-sm text-secondary-text">
            API Endpoint
          </Label>
          <Input
            id="api-endpoint"
            placeholder="https://api.example.com"
            defaultValue="https://api.wecare.dev"
            className="bg-card border-border font-mono text-sm h-11"
          />
        </div>

        <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-hover-state border border-border">
          <Label htmlFor="mock-data" className="text-sm cursor-pointer text-foreground">
            Enable Real-time Mock Data
          </Label>
          <Switch
            id="mock-data"
            checked={mockData}
            onCheckedChange={setMockData}
          />
        </div>

        <div className="pt-4 flex justify-end">
          <Button className="bg-secondary text-white hover:bg-secondary/90">
            Apply Configuration
          </Button>
        </div>
      </div>
    </Card>
  );
};
