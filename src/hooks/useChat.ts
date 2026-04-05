import { useState, useEffect, useCallback, useRef } from 'react';

interface User {
  id: number;
  username: string;
  email?: string;
}

interface Message {
  id: number;
  sender: User;
  text: string;
  msg_type: string;
  created_at: string;
  is_deleted: boolean;
  file?: string;
  reply_to?: Message;
  reactions?: any[];
}

interface TypingUser {
  user_id: number;
  username: string;
}

export const useChat = (conversationId: number | null) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<number[]>([]);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const wsRef = useRef<WebSocket | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000';

  // Fetch initial messages
  const fetchMessages = useCallback(async () => {
    if (!conversationId) return;
    
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_URL}/api/chat/conversations/${conversationId}/messages/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  }, [conversationId, API_URL]);

  // Connect to WebSocket
  useEffect(() => {
    if (!conversationId) return;
    
    const token = localStorage.getItem('access_token');
    if (!token) return;

    const ws = new WebSocket(`${WS_URL}/ws/chat/${conversationId}/?token=${token}`);

    ws.onopen = () => {
      console.log('Chat WebSocket connected');
      setConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'chat_message':
          setMessages(prev => [...prev, data.message]);
          
          // Send delivery confirmation
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
              type: 'message_delivered',
              message_id: data.message.id,
            }));
          }
          break;

        case 'typing_indicator':
          if (data.is_typing) {
            setTypingUsers(prev => {
              if (!prev.find(u => u.user_id === data.user_id)) {
                return [...prev, { user_id: data.user_id, username: data.username }];
              }
              return prev;
            });
          } else {
            setTypingUsers(prev => prev.filter(u => u.user_id !== data.user_id));
          }
          break;

        case 'user_joined':
          setOnlineUsers(prev => [...new Set([...prev, data.user_id])]);
          break;

        case 'user_left':
          setOnlineUsers(prev => prev.filter(id => id !== data.user_id));
          break;

        case 'read_receipt':
          setMessages(prev =>
            prev.map(msg =>
              msg.id === data.message_id
                ? { ...msg, read_by: [...(msg.read_by || []), data.user_id] }
                : msg
            )
          );
          break;

        case 'message_delivered':
          setMessages(prev =>
            prev.map(msg =>
              msg.id === data.message_id
                ? { ...msg, delivered: true }
                : msg
            )
          );
          break;
      }
    };

    ws.onerror = (error) => {
      console.error('Chat WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('Chat WebSocket disconnected');
      setConnected(false);
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, [conversationId, WS_URL]);

  // Fetch messages on mount
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Send message
  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'chat_message',
        text: text.trim(),
      }));
    }
  }, []);

  // Send typing indicator
  const sendTyping = useCallback((isTyping: boolean) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'typing',
        is_typing: isTyping,
      }));
    }
  }, []);

  // Handle typing with auto-stop
  const handleTyping = useCallback(() => {
    sendTyping(true);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      sendTyping(false);
    }, 3000);
  }, [sendTyping]);

  // Send read receipt
  const markAsRead = useCallback((messageId: number) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'read_receipt',
        message_id: messageId,
      }));
    }
  }, []);

  return {
    messages,
    typingUsers,
    onlineUsers,
    connected,
    loading,
    sendMessage,
    handleTyping,
    markAsRead,
    refetch: fetchMessages,
  };
};
