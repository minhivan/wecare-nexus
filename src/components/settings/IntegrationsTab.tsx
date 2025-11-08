import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plug, Copy, Eye, EyeOff, Trash2 } from "lucide-react";
import { useState } from "react";

const connectedIntegrations = [
  { name: "Stripe", description: "Payment processing", icon: "💳", status: "active" },
  { name: "YouTube Live", description: "Live streaming", icon: "📺", status: "active" },
  { name: "Notion", description: "Documentation", icon: "📝", status: "active" },
];

const availableIntegrations = [
  { name: "Zapier", description: "Workflow automation", icon: "⚡" },
  { name: "Slack", description: "Team communication", icon: "💬" },
  { name: "Google Analytics", description: "Website analytics", icon: "📊" },
  { name: "Mailchimp", description: "Email marketing", icon: "📧" },
];

const apiKeys = [
  { name: "Production Key", key: "sk_live_*********************xyz", created: "Dec 1, 2024", usage: "1,234 calls" },
  { name: "Development Key", key: "sk_test_*********************abc", created: "Nov 15, 2024", usage: "543 calls" },
];

export const IntegrationsTab = () => {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-6">
      {/* Connected Services */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plug className="h-5 w-5" />
            Connected Services
          </CardTitle>
          <CardDescription>Manage your active integrations</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {connectedIntegrations.map((integration) => (
            <div
              key={integration.name}
              className="p-4 rounded-lg border border-border/50 bg-gradient-to-br from-primary/5 to-accent/5 hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center text-2xl">
                    {integration.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{integration.name}</h4>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
                <Badge variant="default" className="bg-emerald text-white">Connected</Badge>
              </div>
              <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="sm" className="flex-1">
                  Configure
                </Button>
                <Button variant="ghost" size="sm">
                  Disconnect
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Available Integrations */}
      <Card className="glass border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Available Integrations</CardTitle>
              <CardDescription>Discover and connect new services</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search integrations..." className="pl-9 glass border-0" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {availableIntegrations.map((integration) => (
            <div
              key={integration.name}
              className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl">
                    {integration.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{integration.name}</h4>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Connect
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card className="glass border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API access keys</CardDescription>
            </div>
            <Button>Generate New Key</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {apiKeys.map((apiKey, i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium">{apiKey.name}</h4>
                  <p className="text-sm text-muted-foreground">Created {apiKey.created}</p>
                </div>
                <Badge variant="secondary">{apiKey.usage}</Badge>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <code className="flex-1 px-3 py-2 bg-background rounded text-sm font-mono">
                  {showKeys[apiKey.name] ? apiKey.key.replace(/\*/g, "x") : apiKey.key}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowKeys(prev => ({ ...prev, [apiKey.name]: !prev[apiKey.name] }))}
                >
                  {showKeys[apiKey.name] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
