import React from 'react';
import { Mail, MessageCircle, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function TomHanielProfile() {
  return (
    <div>
      <Navbar/>
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Main Profile Card */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-start space-x-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src="/home/tutors/6.svg"
              alt="Tom Haniel"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          
          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-2xl font-bold text-gray-900">Tom Haniel</h1>
              <div className="flex items-center space-x-4">
                <a 
                  href="mailto:hanieltom@gmail.com" 
                  className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <Mail className="w-4 h-4 mr-1" />
                  hanieltom@gmail.com
                </a>
              </div>
            </div>
            
            <p className="text-gray-700 font-medium mb-3">DeFi, NFTs</p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                Nova Etherea, Chain Isles
              </div>
              <div>7+ years</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bio Section */}
      <div className="space-y-4 mb-8">
        <p className="text-gray-700 leading-relaxed">
          Tom Haniel is a blockchain strategist and educator with a PhD in Decentralized Systems from the 
          University of Metanetica. He is passionate about making Web3 education accessible to emerging 
          markets and has worked on projects involving DeFi, token engineering, and digital identity frameworks. 
          His sessions blend technical insights with real-world use cases, especially in African tech ecosystems.
        </p>
        
        <p className="text-gray-700 leading-relaxed">
          Tom Haniel is a blockchain strategist and educator with a PhD in Decentralized Systems from the 
          University of Metanetica. He is passionate about making Web3 education accessible to emerging 
          markets and has worked on projects involving DeFi, token engineering, and digital identity frameworks. 
          His sessions blend technical insights with real-world use cases, especially in African tech ecosystems.
        </p>
      </div>
      
      {/* Action Buttons */}
      <div className="flex space-x-4 mb-8">
        <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/tutors/tom-haniel/chat">
          <MessageCircle className="w-4 h-4 mr-2" />
          Chat with
          </Link>
        </button>
        
        <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <BookOpen className="w-4 h-4 mr-2" />
          Other courses by the same tutor
        </button>
      </div>
    </div>
    </div>
  );
}