import { Button } from "@/components/ui/button";
import { FileJson, RotateCcw, BookOpen } from "lucide-react";

export const DeveloperHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-6 border-b border-border/50">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2">
          Developer Settings
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Configure pre-release features, debug tools, and development environment.
        </p>
      </div>
      
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="ghost" size="sm" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset to Default
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <BookOpen className="w-4 h-4" />
          View Docs
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <FileJson className="w-4 h-4" />
          Export Config JSON
        </Button>
      </div>
    </div>
  );
};
