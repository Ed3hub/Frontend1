import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface TutorCardProps {
  name: string;
  image: string;
  rating: number;
  reviews: number;
  specialization: string;
  location?: string;
  hourlyRate?: number;
}

const TutorCard: React.FC<TutorCardProps> = ({
  name,
  image,
  rating,
  reviews,
  specialization,
  location,
  hourlyRate
}) => {
  
  const nameSlug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');


  return (
    <Link href={`/tutors/${nameSlug}`} className="block">
      <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer border-border">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>
                {name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-foreground">{name}</h3>
              <Badge variant="secondary" className="text-xs px-2 py-1">
                {specialization}
              </Badge>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <span>⭐ {rating}</span>
                <span>•</span>
                <span>{reviews} reviews</span>
              </div>
              
              <div className="text-sm text-muted-foreground">
                📍 {location}
              </div>
              
              <div className="text-lg font-semibold text-foreground">
                ${hourlyRate}/hr
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
    
  );
};

export default TutorCard;