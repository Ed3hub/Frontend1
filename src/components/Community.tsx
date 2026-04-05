import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Calendar, MapPin } from 'lucide-react';

const Community = () => {
  const communityMembers = [
    {
      name: "ChainCircle",
      members: "2.5k members",
      image: "/placeholder.svg"
    },
    {
      name: "Proof of Learn",
      members: "1.8k members", 
      image: "/placeholder.svg"
    },
    {
      name: "ChainCircle",
      members: "3.2k members",
      image: "/placeholder.svg"
    }
  ];

  const popularTopics = [
    {
      title: "Study Group",
      image: "/placeholder.svg",
      category: "Learning"
    },
    {
      title: "The dAppl Lounge",
      image: "/placeholder.svg", 
      category: "Discussion"
    },
    {
      title: "Building the Startups",
      image: "/placeholder.svg",
      category: "Entrepreneurship"
    },
    {
      title: "Token Learning",
      image: "/placeholder.svg",
      category: "Education"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Communities"
              className="w-80 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        
        <p className="text-muted-foreground mb-6">
          Join the movement, learn together, build together
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="outline">General Chat</Badge>
          <Badge variant="outline">Course Discussions</Badge>
          <Badge variant="outline">Web3 News & Trends</Badge>
          <Badge variant="outline">Hackathons</Badge>
          <Badge variant="outline">Project Showcase</Badge>
          <Badge variant="outline">Peer Support Area</Badge>
        </div>
      </div>

      {/* Your Community */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Your Community</h2>
          <Button variant="ghost" className="text-primary">See All</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {communityMembers.map((community, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={community.image} />
                    <AvatarFallback>{community.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{community.name}</h3>
                    <p className="text-sm text-muted-foreground">{community.members}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Popular Community */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Popular Community</h2>
          <Button variant="ghost" className="text-primary">See All</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularTopics.map((topic, index) => (
            <Card key={index} className="group hover:shadow-md transition-all overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold mb-2">{topic.title}</h3>
                  <Button size="sm" className="w-full">Join</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Upcoming Events</h2>
          <Button variant="ghost" className="text-primary">Explore events</Button>
        </div>
        
        <Card className="overflow-hidden">
          <div className="aspect-[2/1] bg-gradient-to-br from-muted to-muted/50 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Web3 Build-A-dApp Weekend
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              The Web3 Build-A-dApp Weekend is a high-energy, collaborative hackathon designed to bring together builders, developers, designers, and innovators from across our global community. Over the course of the weekend, teams will work to build their first smart contract as a seasoned dev exploring groundbreaking applications utilizing Web3 technologies.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              This event is not just about coding — it&apos;s about creativity, experimentation, and community learning. Whether you&apos;re a beginner eager to build your first smart contract or a seasoned developer, this weekend provides a supportive environment for all experience levels. Participants will receive prompts across various themes like DeFi, decentralized identity, and community governance, and all will be encouraged to think outside the box while collaborating in a fast-paced, supportive environment.
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>March 15-17, 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Virtual Event</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>500+ participants</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Community;