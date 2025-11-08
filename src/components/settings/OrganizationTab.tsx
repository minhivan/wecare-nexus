import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Image as ImageIcon, Palette, Settings } from "lucide-react";

interface OrganizationTabProps {
  onChangeDetected: () => void;
}

export const OrganizationTab = ({ onChangeDetected }: OrganizationTabProps) => {
  const [formData, setFormData] = useState({
    name: "WeCare Foundation",
    tagline: "Together we make a difference",
    mission: "Empowering communities through compassion and collective action",
    currency: "USD",
    visibility: "public"
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    onChangeDetected();
  };

  return (
    <div className="space-y-6">
      {/* Brand Identity */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Brand Identity
          </CardTitle>
          <CardDescription>How your organization appears to the world</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-white" />
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2">
                Upload Logo
              </Button>
            </div>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input
                  id="org-name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="glass border-0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={formData.tagline}
                  onChange={(e) => handleChange("tagline", e.target.value)}
                  className="glass border-0"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mission">Mission Statement</Label>
            <Textarea
              id="mission"
              value={formData.mission}
              onChange={(e) => handleChange("mission", e.target.value)}
              rows={3}
              className="glass border-0"
            />
          </div>
        </CardContent>
      </Card>

      {/* Brand Colors */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Brand Colors
          </CardTitle>
          <CardDescription>Colors used across your campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-3">
            {["#8B5CF6", "#06B6D4", "#34D399", "#F59E0B", "#EC4899"].map((color) => (
              <button
                key={color}
                className="aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors relative group"
                style={{ backgroundColor: color }}
              >
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-mono">{color}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Default Campaign Settings */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Default Campaign Settings
          </CardTitle>
          <CardDescription>Defaults applied to new campaigns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="currency">Preferred Currency</Label>
              <Select value={formData.currency} onValueChange={(value) => handleChange("currency", value)}>
                <SelectTrigger id="currency" className="glass border-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="VND">VND (₫)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visibility">Default Visibility</Label>
              <Select value={formData.visibility} onValueChange={(value) => handleChange("visibility", value)}>
                <SelectTrigger id="visibility" className="glass border-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="unlisted">Unlisted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Preview */}
      <Card className="glass border-0 overflow-hidden">
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
          <CardDescription>How your branding appears on public pages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">{formData.name}</h3>
                <p className="text-sm text-muted-foreground">{formData.tagline}</p>
              </div>
            </div>
            <p className="text-sm">{formData.mission}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
