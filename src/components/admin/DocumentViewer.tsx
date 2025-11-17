import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ZoomIn, ZoomOut, RotateCw, Maximize2, Columns2, AlertTriangle, CheckCircle } from "lucide-react";

interface Document {
  type: string;
  url: string;
  uploadTime: string;
  status: string;
}

interface DocumentViewerProps {
  documents: {
    personal: Document[];
    organization: Document[];
    banking: Document[];
    history: Document[];
  };
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const DocumentViewer = ({ documents, activeTab, onTabChange }: DocumentViewerProps) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(0);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const currentDocs = documents[activeTab as keyof typeof documents] || [];

  return (
    <Card className="bg-white border-[#E5E7EB] rounded-[20px] overflow-hidden">
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <div className="border-b border-[#E5E7EB] bg-[#FAFAFA] px-6 py-3">
          <TabsList className="bg-transparent h-auto p-0 gap-1">
            <TabsTrigger 
              value="personal" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-4 py-2"
            >
              Cá nhân
            </TabsTrigger>
            <TabsTrigger 
              value="organization"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-4 py-2"
            >
              Tổ chức
            </TabsTrigger>
            <TabsTrigger 
              value="banking"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-4 py-2"
            >
              Ngân hàng
            </TabsTrigger>
            <TabsTrigger 
              value="history"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-4 py-2"
            >
              Lịch sử
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-[#FAFAFA]">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              className="h-8 px-3"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm text-[#6B7280] min-w-[60px] text-center">{zoom}%</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              className="h-8 px-3"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <div className="w-px h-6 bg-[#E5E7EB] mx-2" />
            <Button
              variant="outline"
              size="sm"
              onClick={handleRotate}
              className="h-8 px-3"
            >
              <RotateCw className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
          <Button
            variant={compareMode ? "default" : "outline"}
            size="sm"
            onClick={() => setCompareMode(!compareMode)}
            className="h-8 px-3"
          >
            <Columns2 className="w-4 h-4 mr-2" />
            Compare Mode
          </Button>
        </div>

        {/* Document List */}
        <div className="px-6 py-4">
          {currentDocs.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-4">
              {currentDocs.map((doc, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDoc(index)}
                  className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                    selectedDoc === index
                      ? "bg-[#4ECDC4] text-white border-[#4ECDC4]"
                      : "bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#4ECDC4]"
                  }`}
                >
                  {doc.type}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-[#9CA3AF]">
              Không có tài liệu nào
            </div>
          )}
        </div>

        {/* Document Preview */}
        <TabsContent value={activeTab} className="m-0">
          {currentDocs.length > 0 && (
            <div className="px-6 pb-6">
              <div className={`grid ${compareMode ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
                {/* Main Document */}
                <div className="space-y-4">
                  <div 
                    className="bg-[#F9FAFB] rounded-lg overflow-hidden min-h-[500px] flex items-center justify-center border border-[#E5E7EB]"
                    style={{
                      transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                      transition: "transform 0.2s ease"
                    }}
                  >
                    <img 
                      src={currentDocs[selectedDoc].url} 
                      alt={currentDocs[selectedDoc].type}
                      className="max-w-full h-auto"
                    />
                  </div>

                  {/* Document Info */}
                  <div className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-[#111827] mb-1">{currentDocs[selectedDoc].type}</h4>
                        <p className="text-sm text-[#6B7280]">Uploaded: {currentDocs[selectedDoc].uploadTime}</p>
                      </div>
                      <Badge variant="outline" className="border-[#FBC02D] text-[#F57F17] bg-[#FFF8E1]">
                        Pending Review
                      </Badge>
                    </div>

                    {/* AI Insights */}
                    <div className="space-y-2 mt-4">
                      <div className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                        <span className="text-[#6B7280]">File integrity verified</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                        <span className="text-[#6B7280]">OCR extraction completed</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <AlertTriangle className="w-4 h-4 text-[#F59E0B] mt-0.5 shrink-0" />
                        <span className="text-[#6B7280]">Minor blur detected in signature area</span>
                      </div>
                    </div>

                    {/* Extracted Text */}
                    <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                      <p className="text-xs font-medium text-[#6B7280] mb-2">Extracted Information (OCR)</p>
                      <div className="bg-white rounded-lg p-3 text-sm text-[#111827] font-mono">
                        <p>Họ và tên: NGUYEN VAN A</p>
                        <p>Số CCCD: 001234567890</p>
                        <p>Ngày sinh: 15/03/1990</p>
                        <p>Địa chỉ: 123 Nguyen Hue, Q1, TP.HCM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compare Document (if compare mode) */}
                {compareMode && currentDocs.length > 1 && (
                  <div className="space-y-4">
                    <div 
                      className="bg-[#F9FAFB] rounded-lg overflow-hidden min-h-[500px] flex items-center justify-center border border-[#E5E7EB]"
                      style={{
                        transform: `scale(${zoom / 100})`,
                        transition: "transform 0.2s ease"
                      }}
                    >
                      <img 
                        src={currentDocs[1].url} 
                        alt={currentDocs[1].type}
                        className="max-w-full h-auto"
                      />
                    </div>
                    <div className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
                      <h4 className="font-medium text-[#111827] mb-1">{currentDocs[1].type}</h4>
                      <p className="text-sm text-[#6B7280]">Uploaded: {currentDocs[1].uploadTime}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};
