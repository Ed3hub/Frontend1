"use client"

import React, { useState } from 'react';
import { ArrowLeft, Send, Phone, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Chat = () => {
  const [message, setMessage] = useState('');

  const messages = [
    {
      id: 1,
      sender: 'user',
      content: "Hi! I'm a bit stuck on the 'Tokenomics 101' assignment. I'm not sure how to explain the difference between utility and governance tokens.",
      timestamp: '2:30 PM'
    },
    {
      id: 2,
      sender: 'tutor',
      content: "Hey May! Great question and don't worry, this one confuses a lot of people at first.",
      timestamp: '2:32 PM'
    },
    {
      id: 3,
      sender: 'tutor',
      content: "Think of utility tokens as \"access keys.\" They let users interact with a product or service like paying gas fees, unlocking features, or using a platform.",
      timestamp: '2:33 PM'
    },
    {
      id: 4,
      sender: 'user',
      content: "Alright. What about governance tokens?",
      timestamp: '2:35 PM'
    },
    {
      id: 5,
      sender: 'tutor',
      content: "Governance tokens, on the other hand, are all about voting power. They let users help decide how a protocol evolves, like proposing or voting on changes. Would you like an example from a real project?",
      timestamp: '2:36 PM'
    },
    {
      id: 6,
      sender: 'user',
      content: "Yes, please! That would help a lot.",
      timestamp: '2:37 PM'
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-background p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>TH</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">Tom Haniel</h3>
              <p className="text-sm text-muted-foreground">Online now</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end space-x-2 max-w-[70%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
              {msg.sender === 'tutor' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>TH</AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`rounded-2xl px-4 py-3 ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        <div className="flex justify-start">
          <div className="flex items-end space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>TH</AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-2xl px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;