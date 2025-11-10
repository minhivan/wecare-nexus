import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Play, Maximize2 } from "lucide-react";
import { useState } from "react";

export const ApiSandbox = () => {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const runTest = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResponse(JSON.stringify({
        status: 200,
        data: { message: "Test successful" },
        duration: "245ms"
      }, null, 2));
      setLoading(false);
    }, 1000);
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          API & Integration Sandbox
        </h2>
        <Button variant="ghost" size="sm" className="gap-2 text-secondary-text hover:text-foreground hover:bg-hover-state">
          <Maximize2 className="w-4 h-4" />
          Expand
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="endpoint" className="text-sm text-secondary-text">
            Endpoint
          </Label>
          <Input
            id="endpoint"
            placeholder="/api/campaigns"
            defaultValue="/api/campaigns"
            className="bg-card border-border font-mono text-sm h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="payload" className="text-sm text-secondary-text">
            Payload (JSON)
          </Label>
          <Textarea
            id="payload"
            placeholder='{ "name": "Test Campaign" }'
            className="bg-card border-border font-mono text-sm min-h-[120px] resize-none"
            defaultValue={JSON.stringify({ name: "Test Campaign", goal: 10000 }, null, 2)}
          />
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center space-x-2">
            <Checkbox id="staging" />
            <Label htmlFor="staging" className="text-sm cursor-pointer text-foreground">
              Use Staging Credentials
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="mock" />
            <Label htmlFor="mock" className="text-sm cursor-pointer text-foreground">
              Mock Response
            </Label>
          </div>
        </div>

        <Button 
          onClick={runTest} 
          disabled={loading}
          className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 gap-2"
        >
          <Play className="w-4 h-4" />
          {loading ? "Running..." : "Run Test"}
        </Button>

        {response && (
          <div className="space-y-2 pt-2">
            <Label className="text-sm text-secondary-text">Response</Label>
            <pre className="bg-muted border border-border rounded-lg p-4 text-xs font-mono text-foreground overflow-x-auto">
              {response}
            </pre>
          </div>
        )}
      </div>
    </Card>
  );
};
