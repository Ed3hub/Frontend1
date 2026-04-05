import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

const page = () => {
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



  return (
    <div>
       <Navbar/>
      
      <div className='"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"'>

       
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
  </div>
  </div>
  )
}

export default page