import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Post } from "./FeedStream";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface PostCardProps {
  post: Post;
}

const roleColors = {
  Donor: "bg-cyan/10 text-cyan border-cyan/30",
  Organizer: "bg-emerald/10 text-emerald border-emerald/30",
  Volunteer: "bg-violet/10 text-violet border-violet/30",
};

const typeLabels = {
  campaign_update: "Campaign Update",
  story: "Story",
  achievement: "Achievement",
  milestone: "Milestone",
  donation_highlight: "Donation",
};

export const PostCard = ({ post }: PostCardProps) => {
  const [hasReacted, setHasReacted] = useState(post.hasReacted);
  const [reactions, setReactions] = useState(post.reactions);
  const [showComments, setShowComments] = useState(false);

  const handleReaction = () => {
    setHasReacted(!hasReacted);
    setReactions((prev) => ({
      ...prev,
      hearts: hasReacted ? prev.hearts - 1 : prev.hearts + 1,
    }));
  };

  return (
    <>
      <div className="group p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-200 hover:shadow-lg hover:shadow-cyan/5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-cyan/30">
              <AvatarFallback className="bg-gradient-to-br from-cyan to-emerald text-white text-sm font-semibold">
                {post.author.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">{post.author.name}</span>
                <Badge variant="outline" className={cn("text-xs", roleColors[post.author.role])}>
                  {post.author.role}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{post.timestamp}</span>
                <span>•</span>
                <span className="text-cyan">{typeLabels[post.type]}</span>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Bookmark className="h-4 w-4 mr-2" />
                Save Post
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <p className="text-foreground leading-relaxed">{post.content.text}</p>

          {post.content.media && (
            <div className="rounded-lg overflow-hidden border border-border/50">
              <img
                src={post.content.media.url}
                alt="Post media"
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          {post.campaign && (
            <div className="p-4 rounded-lg bg-accent/50 border border-border/30">
              <p className="text-xs text-muted-foreground mb-1">Related Campaign</p>
              <p className="font-medium text-foreground">{post.campaign.title}</p>
            </div>
          )}
        </div>

        {/* Footer - Reactions & Actions */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center gap-4">
            <button
              onClick={handleReaction}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200",
                hasReacted
                  ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                  : "hover:bg-accent/50 text-muted-foreground"
              )}
            >
              <Heart
                className={cn("h-4 w-4 transition-transform", hasReacted && "fill-current scale-110")}
              />
              <span className="text-sm font-medium">{reactions.hearts}</span>
            </button>

            <button
              onClick={() => setShowComments(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-accent/50 text-muted-foreground transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm font-medium">{reactions.comments}</span>
            </button>

            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-accent/50 text-muted-foreground transition-colors">
              <Share2 className="h-4 w-4" />
              <span className="text-sm">Share</span>
            </button>
          </div>

          {post.campaign && (
            <Button
              size="sm"
              className="bg-emerald hover:bg-emerald/90 text-white shadow-md hover:shadow-emerald/25"
            >
              Donate
            </Button>
          )}
        </div>
      </div>

      {/* Comments Drawer */}
      <Sheet open={showComments} onOpenChange={setShowComments}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Comments</SheetTitle>
            <SheetDescription>
              Join the conversation
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <p className="text-sm text-muted-foreground text-center py-8">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
