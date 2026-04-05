import { Trophy, BookOpen, Clock, Award, Star, ChevronRight, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from "next/image";
import Navbar from "@/components/Navbar";

import Link from "next/link";



export default function Home() {
  const stats = [
    { icon: Trophy, label: 'Total XP', value: '53,000' },
    { icon: BookOpen, label: 'Courses', value: '11' },
    { icon: Clock, label: 'Lessons', value: '60' },
    { icon: Target, label: 'Challenge Submissions', value: '4' },
    { icon: Award, label: 'Badges', value: '3' },
    { icon: Star, label: "NFT's", value: '2' }
  ];
  
  const challenges = [
    {
      title: '60 Days of Solana. A Solana Course By Rareskills',
      level: 'Intermediate',
      reward: '600 USDC',
      xp: '600 XP',
      timeLeft: '6 days',
      image: '/api/placeholder/160/120'
    },
    {
      title: 'Design and Implement Account Abstraction Features',
      level: 'Beginner',
      reward: '700 USDC',
      xp: '800 XP',
      timeLeft: '6 days',
      image: '/api/placeholder/160/120'
    },
    {
      title: 'Design and Implement Account Abstraction Features',
      level: 'Beginner',
      reward: '1700 USDC',
      xp: '600 XP',
      timeLeft: '6 days',
      image: '/api/placeholder/160/120'
    }
  ];
  
  const courses = [
    {
      title: 'Intro to Web3 & Blockchain Basics',
      instructor: 'Sandra Jones',
      progress: 'Finished',
      duration: '5h',
      image: '/home/ongoing-courses/1.svg'
    },
    {
      title: 'Tokenomics: Designing Crypto Assets',
      instructor: 'Tori Simone',
      progress: '40%',
      duration: '8h',
      image: '/home/ongoing-courses/2.svg'
    },
    {
      title: 'Smart Contract Development',
      instructor: 'Scott Daniel',
      progress: 'Finished',
      duration: '12h',
      image: '/home/ongoing-courses/3.svg'
    }
  ];
  
  const badges = [
    { level: 'Level 1', color: 'bg-orange-400', unlocked: true },
    { level: 'Level 2', color: 'bg-gray-400', unlocked: true },
    { level: 'Level 3', color: 'bg-yellow-500', unlocked: true },
    { level: 'Level 4', color: 'bg-pink-300', unlocked: false },
    { level: 'Level 5', color: 'bg-green-300', unlocked: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div 
        className="bg-white shadow-sm border-b"
        
      >
        <Navbar/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome, <span className="text-blue-600">Jonas May</span> 👋
          </h1>
          <p className="text-gray-600">Start your journey into blockchain, NFTs, DAOs, and more.</p>
        </div>

        {/* XP Progress Card */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-slate-800 to-slate-900 text-white border-0 shadow-xl rounded-4xl">
            <CardContent className="p-6">
              <div className= " bg-sky-500 h-24 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ">
                <div className=" flex items-center space-x-3 pl-8">
                  <Trophy className="w-6 h-6" />
                  <span className="text-xl font-semibold">53,000 XP</span>
                </div>
                <div className="pr-12 ">
                <Badge className="bg-gray-800 text-white hover:bg-gray-700 w-50 h-14 text-lg ">
                  Intermediate
                </Badge>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3 pl-5">
                  <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">11</div>
                    <div className="text-blue-100 text-sm">Completed</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 pl-5">
                  <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">143</div>
                    <div className="text-blue-100 text-sm">Hours Spent</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Challenges Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Challenges</h2>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
              See All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
           
          >
            {challenges.map((challenge, index) => (
              <div key={index} >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {challenge.title}
                    </h3>
                    <Badge variant="secondary" className="mb-3 text-slate-900">
                      {challenge.level}
                    </Badge>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Trophy className="w-4 h-4" />
                          <span>{challenge.reward}</span>
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-4 h-4" />
                          <span>{challenge.xp}</span>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        Due in {challenge.timeLeft}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Ongoing Courses */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Ongoing courses</h2>
            <Button  variant="ghost" className="text-blue-600 hover:text-blue-700">
              <Link href="/home/ongoing">
              See All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
           
            
          >
            {courses.map((course, index) => (
              
              <div key={index}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <div >
                  <Image src={course.image} 
                    height={420}
                    width={360}
                  alt="courses"
                  className="object-cover w-100 h-60"/>
                  </div>
                 
                  
                    
                  
                  <CardContent className="p-4">
                    
                    <h3 className="font-semibold text-slate-900 mb-2">
                      {course.title}
                    </h3>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                      <span className="text-sm text-gray-900">{course.instructor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={course.progress === 'Finished' ? 'default' : 'secondary'}
                        className={course.progress === 'Finished' ? 'bg-green-600' : 'bg-amber-600'}
                      >
                        {course.progress}
                      </Badge>
                      <span className="text-sm text-gray-500">{course.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recommended courses</h2>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
              See All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
           
            
          >
            {courses.map((course, index) => (
              
              <div key={index}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <div >
                  <Image src={course.image} 
                    height={420}
                    width={360}
                  alt="courses"
                  className="object-cover w-100 h-60"/>
                  </div>
                 
                  
                    
                  
                  <CardContent className="p-4">
                    
                    <h3 className="font-semibold text-slate-900 mb-2">
                      {course.title}
                    </h3>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-900">{course.instructor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                    
                      <span className="text-sm text-gray-500">{course.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Stats and Badges Grid */}
        <div className="grid grid-cols-1 gap-8 mb-12">
          {/* Stats */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-slate-950 text-4xl">Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <stat.icon className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Badges */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {badges.map((badge, index) => (
                    <div key={index} className="text-center">
                      <div className={`w-16 h-16 ${badge.color} rounded-lg mx-auto mb-2 flex items-center justify-center ${!badge.unlocked ? 'opacity-30' : ''}`}>
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <span className={`text-sm ${badge.unlocked ? 'text-gray-900' : 'text-gray-400'}`}>
                        {badge.level}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Featured Badge */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Badge</h2>
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-20 h-20 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Intermediate</h3>
                  <p className="text-gray-600 mb-4">Welcome to Level 3.0</p>
                  <div className="flex items-center space-x-2 justify-center md:justify-start">
                    <Trophy className="w-4 h-4 text-blue-600" />
                    <Badge variant="outline">1250 XP</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 italic">
                    This badge has not been minted on-chain yet.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* NFTs */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">NFTs</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="aspect-square bg-gradient-to-br from-green-400 to-blue-500 rounded-lg mb-4 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-white rounded-lg"></div>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-full inline-block shadow-sm">
                    <span className="text-sm font-medium">MASTERMINDS</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="aspect-square bg-gradient-to-br from-red-500 to-pink-600 rounded-lg mb-4 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-white rounded-lg"></div>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-full inline-block shadow-sm">
                    <span className="text-sm font-medium">BLOCKBUDS</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};
  
