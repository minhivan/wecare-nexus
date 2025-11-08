import { PostCard } from "./PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

interface FeedStreamProps {
  filterCause: string | null;
  sortBy: "trending" | "recent" | "following";
  showNetworkOnly: boolean;
}

export interface Post {
  id: string;
  type: "campaign_update" | "story" | "achievement" | "milestone" | "donation_highlight";
  author: {
    name: string;
    avatar: string;
    role: "Donor" | "Organizer" | "Volunteer";
  };
  timestamp: string;
  content: {
    text: string;
    media?: {
      type: "image" | "video";
      url: string;
    };
  };
  campaign?: {
    id: string;
    title: string;
  };
  reactions: {
    hearts: number;
    claps: number;
    comments: number;
  };
  hasReacted: boolean;
}

const mockPosts: Post[] = [
  {
    id: "1",
    type: "milestone",
    author: {
      name: "Sarah Johnson",
      avatar: "SJ",
      role: "Organizer",
    },
    timestamp: "2 hours ago",
    content: {
      text: "🎉 We just reached 50% of our goal! Thank you to everyone who has supported our clean water initiative. Every donation brings us closer to providing safe drinking water to 1,000 families.",
      media: {
        type: "image",
        url: "/placeholder.svg",
      },
    },
    campaign: {
      id: "c1",
      title: "Clean Water for Rural Communities",
    },
    reactions: {
      hearts: 247,
      claps: 89,
      comments: 32,
    },
    hasReacted: false,
  },
  {
    id: "2",
    type: "donation_highlight",
    author: {
      name: "Michael Chen",
      avatar: "MC",
      role: "Donor",
    },
    timestamp: "5 hours ago",
    content: {
      text: "Just donated to support educational programs for underprivileged children. Every child deserves access to quality education. Let's make a difference together! 📚",
    },
    campaign: {
      id: "c2",
      title: "Books for Every Child",
    },
    reactions: {
      hearts: 156,
      claps: 43,
      comments: 18,
    },
    hasReacted: true,
  },
  {
    id: "3",
    type: "story",
    author: {
      name: "Emma Rodriguez",
      avatar: "ER",
      role: "Volunteer",
    },
    timestamp: "8 hours ago",
    content: {
      text: "Spent the weekend volunteering at the animal shelter. Met the most adorable puppies looking for forever homes. If you're thinking about adopting, now is the perfect time! 🐕",
      media: {
        type: "image",
        url: "/placeholder.svg",
      },
    },
    reactions: {
      hearts: 312,
      claps: 67,
      comments: 45,
    },
    hasReacted: false,
  },
  {
    id: "4",
    type: "achievement",
    author: {
      name: "David Park",
      avatar: "DP",
      role: "Organizer",
    },
    timestamp: "1 day ago",
    content: {
      text: "🏆 Milestone achieved! Our environmental cleanup campaign has removed over 5 tons of waste from local beaches. Thank you to all 200+ volunteers who made this possible!",
    },
    campaign: {
      id: "c3",
      title: "Beach Cleanup Initiative",
    },
    reactions: {
      hearts: 523,
      claps: 198,
      comments: 76,
    },
    hasReacted: true,
  },
];

export const FeedStream = ({ filterCause, sortBy, showNetworkOnly }: FeedStreamProps) => {
  const [loading] = useState(false);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-xl border border-border/50 bg-card/50 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {mockPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      
      {/* Load More Indicator */}
      <div className="text-center py-8">
        <p className="text-sm text-muted-foreground">Loading more posts...</p>
      </div>
    </div>
  );
};
