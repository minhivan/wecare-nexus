import { Button } from "@/components/ui/button";
import { FileJson, RotateCcw, BookOpen } from "lucide-react";

export const DeveloperHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-6 border-b border-border">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2">
          Developer Settings
        </h1>
        <p className="text-sm text-secondary-text max-w-2xl">
          Configure pre-release features, debug tools, and development environment.
        </p>
      </div>
      
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="ghost" size="sm" className="gap-2 text-secondary-text hover:text-foreground hover:bg-hover-state">
          <RotateCcw className="w-4 h-4" />
          Reset to Default
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 text-secondary-text hover:text-foreground hover:bg-hover-state">
          <BookOpen className="w-4 h-4" />
          View Docs
        </Button>
        <Button variant="outline" size="sm" className="gap-2 border-border hover:bg-hover-state">
          <FileJson className="w-4 h-4" />
          Export Config JSON
        </Button>
      </div>
    </div>
  );
};
