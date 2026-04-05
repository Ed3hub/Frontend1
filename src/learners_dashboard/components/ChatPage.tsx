import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Send, ChevronLeft, Paperclip, X } from 'lucide-react';
import api from '@/lib/api';

interface Participant {
  id: number;
  username: string;
  full_name: string;
  avatar: string | null;
}

interface ReplySnippet {
  id: number;
  sender_name: string;
  text: string;
  msg_type: string;
}

interface Message {
  id: number;
  sender: Participant;
  msg_type: 'text' | 'image' | 'file' | 'link';
  text: string;
  file_url: string | null;
  file_name: string | null;
  reply_to: ReplySnippet | null;
  reactions: { id: number; user_id: number; username: string; emoji: string }[];
  is_deleted: boolean;
  created_at: string;
}

interface Conversation {
  id: number;
  other_user: Participant | null;
  last_message: { text: string; created_at: string; sender_id: number } | null;
  updated_at: string;
}

interface Educator {
  id: number;
  username: string;
  full_name: string;
  email: string;
  bio: string;
  avatar: string | null;
  total_courses: number;
}

interface ChatPageProps {
  tutor: Educator | null;
}

const AVATAR_FALLBACK = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0ea5e9&color=fff&size=200`;

const avatarSrc = (user: Participant | null) =>
  user?.avatar || AVATAR_FALLBACK(user?.full_name || '?');

const EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '🙏'];

export default function ChatPage({ tutor }: ChatPageProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [search, setSearch] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [emojiPickerMsgId, setEmojiPickerMsgId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [onlineMap, setOnlineMap] = useState<Record<number, boolean>>({});
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const presencePollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastMsgIdRef = useRef<number | undefined>(undefined);
  const startedRef = useRef(false);

  const activeConv = conversations.find(c => c.id === activeConvId) ?? null;

  // Load conversations
  const fetchConversations = useCallback(async () => {
    try {
      const { data } = await api.get<Conversation[]>('/chat/conversations/');
      setConversations(data);
    } catch {}
  }, []);

  // Load messages for active conversation
  const fetchMessages = useCallback(async (convId: number, sinceId?: number) => {
    try {
      const url = sinceId
        ? `/chat/conversations/${convId}/messages/?since_id=${sinceId}`
        : `/chat/conversations/${convId}/messages/`;
      const { data } = await api.get<Message[]>(url);
      if (sinceId) {
        if (!data.length) return;
        setMessages(prev => {
          const existingIds = new Set(prev.map(m => m.id));
          const newMsgs = data.filter(m => !existingIds.has(m.id));
          if (!newMsgs.length) return prev;
          const updated = [...prev, ...newMsgs];
          lastMsgIdRef.current = updated[updated.length - 1].id;
          return updated;
        });
      } else {
        setMessages(data);
        lastMsgIdRef.current = data.length ? data[data.length - 1].id : undefined;
      }
    } catch {}
  }, []);

  // Heartbeat — tell server we're online
  useEffect(() => {
    api.post('/chat/presence/heartbeat/').catch(() => {});
    const id = setInterval(() => api.post('/chat/presence/heartbeat/').catch(() => {}), 30000);
    return () => clearInterval(id);
  }, []);

  // Poll other users' presence whenever conversation list changes
  useEffect(() => {
    if (presencePollRef.current) clearInterval(presencePollRef.current);
    const userIds = conversations.map(c => c.other_user?.id).filter(Boolean) as number[];
    if (!userIds.length) return;

    const fetchPresence = async () => {
      try {
        const { data } = await api.get<Record<number, boolean>>(`/chat/presence/?user_ids=${userIds.join(',')}`);
        setOnlineMap(data);
      } catch {}
    };

    fetchPresence();
    presencePollRef.current = setInterval(fetchPresence, 30000);
    return () => { if (presencePollRef.current) clearInterval(presencePollRef.current); };
  }, [conversations]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Auto-start conversation with tutor prop
  useEffect(() => {
    if (!tutor) return;
    // If we already have this conversation loaded, just activate it
    setConversations(prev => {
      const existing = prev.find(c => c.other_user?.id === tutor.id);
      if (existing) {
        setActiveConvId(existing.id);
        return prev;
      }
      if (!startedRef.current) {
        startedRef.current = true;
        api.post<Conversation>('/chat/conversations/start/', { user_id: tutor.id })
          .then(({ data }) => {
            setActiveConvId(data.id);
            fetchConversations();
          })
          .catch(() => { startedRef.current = false; });
      }
      return prev;
    });
  }, [tutor, fetchConversations]);

  // Fetch messages when active conversation changes
  useEffect(() => {
    if (!activeConvId) return;
    lastMsgIdRef.current = undefined;
    setMessages([]);
    fetchMessages(activeConvId);
  }, [activeConvId, fetchMessages]);

  // Poll for new messages
  useEffect(() => {
    if (pollRef.current) clearInterval(pollRef.current);
    if (!activeConvId) return;
    pollRef.current = setInterval(() => {
      fetchMessages(activeConvId, lastMsgIdRef.current);
    }, 3000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [activeConvId, fetchMessages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if ((!text.trim() && !file) || !activeConvId) return;
    setLoading(true);
    try {
      const form = new FormData();
      if (text.trim()) form.append('text', text.trim());
      if (file) form.append('file', file);
      if (replyTo) form.append('reply_to_id', String(replyTo.id));
      const { data } = await api.post<Message>(
        `/chat/conversations/${activeConvId}/send/`, form,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setMessages(prev => {
        const updated = [...prev, data];
        lastMsgIdRef.current = data.id;
        return updated;
      });
      setText('');
      setFile(null);
      setReplyTo(null);
      fetchConversations();
    } catch {}
    setLoading(false);
  };

  const deleteMessage = async (msgId: number) => {
    try {
      await api.delete(`/chat/messages/${msgId}/delete/`);
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, is_deleted: true, text: 'This message was deleted.' } : m));
    } catch {}
  };

  const reactMessage = async (msgId: number, emoji: string) => {
    try {
      const res = await api.post(`/chat/messages/${msgId}/react/`, { emoji });
      if (res.data.status === 'removed') {
        setMessages(prev => prev.map(m => m.id === msgId
          ? { ...m, reactions: m.reactions.filter(r => r.id !== res.data.id) }
          : m));
      } else {
        setMessages(prev => prev.map(m => m.id === msgId
          ? { ...m, reactions: [...m.reactions.filter(r => r.user_id !== res.data.user_id), res.data] }
          : m));
      }
    } catch {}
    setEmojiPickerMsgId(null);
  };

  const filtered = conversations.filter(c =>
    (c.other_user?.full_name ?? '').toLowerCase().includes(search.toLowerCase())
  );

  const otherUser = activeConv?.other_user ?? null;

  return (
    <div className="h-[calc(100vh-65px)] md:h-[calc(100vh-73px)] flex overflow-hidden bg-white">

      {/* LEFT PANEL */}
      <div className={`flex flex-col w-full md:w-[340px] lg:w-[380px] border-r border-gray-100 flex-shrink-0 ${activeConvId ? 'hidden md:flex' : 'flex'}`}>
        <div className="px-5 pt-6 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search conversations…"
              className="w-full pl-9 pr-4 py-2.5 rounded-full bg-gray-100 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 && (
            <p className="text-center text-gray-400 text-sm mt-10">No conversations yet.</p>
          )}
          {filtered.map(conv => (
            <button
              key={conv.id}
              onClick={() => setActiveConvId(conv.id)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors text-left ${activeConvId === conv.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''}`}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={avatarSrc(conv.other_user)}
                  className="w-12 h-12 rounded-full object-cover"
                  alt={conv.other_user?.full_name}
                  onError={e => { (e.target as HTMLImageElement).src = AVATAR_FALLBACK(conv.other_user?.full_name || '?'); }}
                />
                {conv.other_user && (
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${onlineMap[conv.other_user.id] ? 'bg-green-400' : 'bg-gray-300'}`} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-gray-800 text-sm truncate block">{conv.other_user?.full_name || conv.other_user?.username}</span>
                <span className="text-xs text-gray-400 truncate block">{conv.last_message?.text || 'No messages yet'}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      {activeConvId && otherUser ? (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="px-4 md:px-6 py-3 border-b border-gray-100 flex items-center gap-3 bg-white/90 backdrop-blur-sm sticky top-0 z-10">
            <button onClick={() => setActiveConvId(null)} className="md:hidden p-1 text-gray-400 hover:text-gray-700">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="relative">
              <img
                src={avatarSrc(otherUser)}
                className="w-9 h-9 rounded-full object-cover shadow-sm"
                alt={otherUser.full_name}
                onError={e => { (e.target as HTMLImageElement).src = AVATAR_FALLBACK(otherUser.full_name); }}
              />
              <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${onlineMap[otherUser.id] ? 'bg-green-400' : 'bg-gray-300'}`} />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">{otherUser.full_name}</p>
              <p className={`text-xs ${onlineMap[otherUser.id] ? 'text-green-500' : 'text-gray-400'}`}>{onlineMap[otherUser.id] ? 'Online' : 'Offline'}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 bg-gray-50/30" onClick={() => setEmojiPickerMsgId(null)}>
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                <img src={avatarSrc(otherUser)} className="w-16 h-16 rounded-full object-cover opacity-60" alt="" />
                <p className="text-gray-400 text-sm">No messages yet. Say hi to <span className="font-medium">{otherUser.full_name.split(' ')[0]}</span>!</p>
              </div>
            )}
            {messages.map(msg => {
              const isMe = msg.sender.id !== otherUser.id;
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'gap-2.5'} group`}>
                  {!isMe && (
                    <img src={avatarSrc(msg.sender)} className="w-7 h-7 rounded-full object-cover mt-1 flex-shrink-0" alt="" />
                  )}
                  <div className="relative max-w-[80%] md:max-w-md">
                    {/* Reply snippet */}
                    {msg.reply_to && !msg.is_deleted && (
                      <div className={`text-xs px-3 py-1.5 rounded-t-xl mb-0.5 border-l-2 border-blue-400 ${isMe ? 'bg-blue-500/20 text-blue-900' : 'bg-gray-200 text-gray-600'}`}>
                        <span className="font-semibold">{msg.reply_to.sender_name}</span>: {msg.reply_to.text || `[${msg.reply_to.msg_type}]`}
                      </div>
                    )}
                    <div className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'} ${msg.is_deleted ? 'italic opacity-60' : ''}`}>
                      {msg.msg_type === 'image' && msg.file_url && !msg.is_deleted ? (
                        <img src={msg.file_url} alt="image" className="max-w-full rounded-lg max-h-60 object-contain" />
                      ) : msg.msg_type === 'file' && msg.file_url && !msg.is_deleted ? (
                        <a href={msg.file_url} target="_blank" rel="noreferrer" className="underline flex items-center gap-1">
                          <Paperclip className="w-3 h-3" /> {msg.file_name || 'Download file'}
                        </a>
                      ) : msg.msg_type === 'link' && !msg.is_deleted ? (
                        <a href={msg.text} target="_blank" rel="noreferrer" className="underline break-all">{msg.text}</a>
                      ) : (
                        msg.text
                      )}
                    </div>
                    {/* Reactions */}
                    {msg.reactions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {Object.entries(
                          msg.reactions.reduce<Record<string, number>>((acc, r) => ({ ...acc, [r.emoji]: (acc[r.emoji] || 0) + 1 }), {})
                        ).map(([emoji, count]) => (
                          <span key={emoji} className="text-xs bg-gray-100 rounded-full px-1.5 py-0.5 cursor-pointer" onClick={e => { e.stopPropagation(); reactMessage(msg.id, emoji); }}>
                            {emoji} {count > 1 ? count : ''}
                          </span>
                        ))}
                      </div>
                    )}
                    {/* Hover actions */}
                    {!msg.is_deleted && (
                      <div className={`absolute top-0 ${isMe ? 'left-0 -translate-x-full pr-2' : 'right-0 translate-x-full pl-2'} hidden group-hover:flex items-center gap-1`}>
                        <button
                          onClick={e => { e.stopPropagation(); setEmojiPickerMsgId(emojiPickerMsgId === msg.id ? null : msg.id); }}
                          className="text-gray-400 hover:text-gray-600 text-base leading-none"
                          title="React"
                        >😊</button>
                        <button
                          onClick={() => setReplyTo(msg)}
                          className="text-gray-400 hover:text-gray-600 text-xs"
                          title="Reply"
                        >↩</button>
                        {isMe && (
                          <button
                            onClick={() => deleteMessage(msg.id)}
                            className="text-gray-400 hover:text-red-500 text-xs"
                            title="Delete"
                          >🗑</button>
                        )}
                      </div>
                    )}
                    {/* Emoji picker */}
                    {emojiPickerMsgId === msg.id && (
                      <div className={`absolute z-20 top-8 ${isMe ? 'right-0' : 'left-0'} bg-white border border-gray-200 rounded-xl shadow-lg flex gap-1 p-2`} onClick={e => e.stopPropagation()}>
                        {EMOJIS.map(e => (
                          <button key={e} onClick={() => reactMessage(msg.id, e)} className="text-lg hover:scale-125 transition-transform">{e}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Reply bar */}
          {replyTo && (
            <div className="px-4 py-2 bg-blue-50 border-t border-blue-100 flex items-center justify-between text-sm">
              <span className="text-blue-700 truncate">
                Replying to <strong>{replyTo.sender.full_name}</strong>: {replyTo.text || `[${replyTo.msg_type}]`}
              </span>
              <button onClick={() => setReplyTo(null)} className="ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0"><X className="w-4 h-4" /></button>
            </div>
          )}

          {/* File preview */}
          {file && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-600">
              <Paperclip className="w-4 h-4" />
              <span className="truncate flex-1">{file.name}</span>
              <button onClick={() => setFile(null)} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
            </div>
          )}

          {/* Input */}
          <div className="p-4 md:p-5 bg-white border-t border-gray-100">
            <div className="relative max-w-4xl mx-auto flex items-center gap-2">
              <button onClick={() => fileRef.current?.click()} className="text-gray-400 hover:text-blue-500 flex-shrink-0">
                <Paperclip className="w-5 h-5" />
              </button>
              <input ref={fileRef} type="file" className="hidden" accept="image/*,.pdf,.doc,.docx,.txt,.zip" onChange={e => setFile(e.target.files?.[0] ?? null)} />
              <input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder={`Message ${otherUser.full_name.split(' ')[0]}…`}
                className="flex-1 pl-4 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
              />
              <button
                onClick={sendMessage}
                disabled={loading || (!text.trim() && !file)}
                className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 flex-col items-center justify-center gap-4 text-center bg-gray-50/30">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
            <Send className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Start a conversation</h3>
          <p className="text-gray-400 text-sm max-w-xs">Select a conversation or open a tutor profile to start chatting.</p>
        </div>
      )}
    </div>
  );
}
