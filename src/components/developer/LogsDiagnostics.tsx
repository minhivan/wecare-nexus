import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Search, RefreshCw } from "lucide-react";
import { useState } from "react";

interface Log {
  timestamp: string;
  level: "error" | "warning" | "info" | "debug";
  service: string;
  message: string;
}

export const LogsDiagnostics = () => {
  const [autoRefresh, setAutoRefresh] = useState(false);

  const logs: Log[] = [
    { timestamp: "2025-01-10 14:32:15", level: "info", service: "API Gateway", message: "Campaign created successfully" },
    { timestamp: "2025-01-10 14:31:58", level: "warning", service: "Payment", message: "Retry attempt 2 for transaction #1234" },
    { timestamp: "2025-01-10 14:31:42", level: "error", service: "Auth", message: "Invalid token refresh attempt" },
    { timestamp: "2025-01-10 14:31:20", level: "debug", service: "Database", message: "Query executed in 45ms" },
    { timestamp: "2025-01-10 14:30:55", level: "info", service: "Community", message: "New post published" },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "error": return "destructive";
      case "warning": return "default";
      case "info": return "secondary";
      case "debug": return "outline";
      default: return "secondary";
    }
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Logs & Diagnostics
        </h2>
        
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant={autoRefresh ? "default" : "outline"}
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${autoRefresh ? "animate-spin" : ""}`} />
            Auto-refresh
          </Button>
          <Button variant="outline" size="sm" className="gap-2 border-border hover:bg-hover-state">
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" />
          <Input
            placeholder="Search logs..."
            className="pl-9 bg-card border-border h-11"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[140px] bg-card border-border h-11">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="error">Error</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="debug">Debug</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all-services">
          <SelectTrigger className="w-full sm:w-[140px] bg-card border-border h-11">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-services">All Services</SelectItem>
            <SelectItem value="api">API Gateway</SelectItem>
            <SelectItem value="payment">Payment</SelectItem>
            <SelectItem value="auth">Auth</SelectItem>
            <SelectItem value="database">Database</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted hover:bg-muted">
                <TableHead className="font-mono text-xs text-secondary-text w-[180px]">Timestamp</TableHead>
                <TableHead className="text-xs text-secondary-text w-[100px]">Level</TableHead>
                <TableHead className="text-xs text-secondary-text w-[140px]">Service</TableHead>
                <TableHead className="text-xs text-secondary-text">Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log, index) => (
                <TableRow key={index} className="hover:bg-hover-state transition-smooth">
                  <TableCell className="font-mono text-xs text-muted-text">
                    {log.timestamp}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getLevelColor(log.level) as any} className="text-xs">
                      {log.level}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-secondary-text">
                    {log.service}
                  </TableCell>
                  <TableCell className="text-sm text-foreground">
                    {log.message}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};
