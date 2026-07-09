/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, Bot } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: "Hello! I am GlozeAI, TechGloze's Senior AI Architect. I can help draft project estimations, schedule briefings with our founder Abdul Rehman, or provide tactical optimization audits. What digital masterpiece are we building today?" }
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    if (!textToSend) setInputText("");
    
    // Add User message
    const updatedMessages = [...messages, { sender: 'user', text } as ChatMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      // Build history context for backend
      const historyContext = updatedMessages.slice(1, -1).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: text,
          history: historyContext
        })
      });

      if (!response.ok) {
        throw new Error("GlozeAI is adjusting server connections. Please retry.");
      }

      const data = await response.json();
      const replyText = data.text || "Apologies, my neural architecture encountered a connection timeout. Please resend.";
      setMessages(prev => [...prev, { sender: 'ai', text: replyText }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { sender: 'ai', text: err.message || "Apologies, my neural architecture encountered a connection timeout. Please resend." }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestKeywords = [
    "Who is Abdul Rehman?",
    "Can you estimate a SaaS project?",
    "Schedule brief with Founder"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans select-text">
      
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group w-14 h-14 rounded-full bg-brand-gold text-black flex items-center justify-center shadow-2xl border border-brand-gold hover:opacity-90 transition-all hover:scale-105 duration-300 relative cursor-pointer"
          title="Chat with GlozeAI"
        >
          {/* Pulsing indicator */}
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full" />
          
          <MessageSquare className="w-6 h-6 transform group-hover:rotate-6 transition-transform" />
        </button>
      )}

      {/* Conversations Drawer Box */}
      {isOpen && (
        <div className="bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-2xl shadow-2xl w-80 md:w-96 max-h-[500px] flex flex-col overflow-hidden animate-fade-in text-left">
          
          {/* Chat Header */}
          <div className="bg-brand-dark text-white p-4 flex items-center justify-between border-b border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center border border-brand-gold/40">
                <Bot className="w-4 h-4 text-brand-gold animate-pulse" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs flex items-center gap-1">
                  GlozeAI
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-bounce" />
                </h4>
                <span className="font-mono text-[0.55rem] text-zinc-400 uppercase font-bold tracking-wider">AI Ambassador</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Conversation Stream Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[300px] min-h-[250px] bg-zinc-50/50 dark:bg-zinc-950/20">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-1.5`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/10 flex items-center justify-center shrink-0 mb-1">
                    <Bot className="w-3 h-3" />
                  </div>
                )}
                
                <div className={`p-3 rounded-2xl max-w-[80%] text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-brand-dark text-white rounded-br-none'
                    : 'bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-bl-none shadow-sm'
                }`}>
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/10 flex items-center justify-center shrink-0">
                  <Bot className="w-3 h-3 animate-spin" />
                </div>
                <div className="p-2 px-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 text-xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>

          {/* Sizing suggest indicators buttons */}
          <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-950/40 border-t border-zinc-100 dark:border-zinc-800 flex gap-2 overflow-x-auto whitespace-nowrap select-none">
            {suggestKeywords.map((tag, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(tag)}
                className="px-2.5 py-1 rounded bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 text-[0.62rem] font-medium text-zinc-500 hover:border-brand-gold hover:text-brand-gold transition-colors shrink-0 cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Typing form Input bar */}
          <div className="p-3 bg-white dark:bg-zinc-900 border-t border-brand-border dark:border-zinc-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
              className="flex-1 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-gold dark:text-white"
            />
            <button
              onClick={() => handleSendMessage()}
              className="w-8 h-8 rounded-xl bg-brand-gold text-black hover:opacity-90 flex items-center justify-center transition-colors shadow cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
