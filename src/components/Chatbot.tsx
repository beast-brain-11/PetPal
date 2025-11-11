'use client';

import { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { petPalAPI } from '@/lib/api';

interface ChatbotProps {
  breed: string;
  darkMode?: boolean;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot({ breed, darkMode = false }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await petPalAPI.askChatbot(breed, input);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.answer,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`p-4 ${
        darkMode 
          ? 'bg-gradient-to-r from-gray-700 to-gray-600' 
          : 'bg-gradient-to-r from-indigo-500 to-blue-500'
      }`}>
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Nutrition Assistant for {breed}
        </h3>
        <p className="text-white/80 text-sm mt-1">
          Ask questions about {breed} nutrition and diet
        </p>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className={`text-center mt-20 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <MessageCircle className={`h-12 w-12 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
            <p>Ask me anything about {breed} nutrition!</p>
            <p className="text-sm mt-2">
              Try: "What foods help with joint health?" or "What portion sizes are recommended?"
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? darkMode
                      ? 'bg-gray-700 text-white'
                      : 'bg-indigo-500 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-200'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <div className={`rounded-lg p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex space-x-2">
                <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-gray-500' : 'bg-gray-400'}`}></div>
                <div className={`w-2 h-2 rounded-full animate-bounce delay-100 ${darkMode ? 'bg-gray-500' : 'bg-gray-400'}`}></div>
                <div className={`w-2 h-2 rounded-full animate-bounce delay-200 ${darkMode ? 'bg-gray-500' : 'bg-gray-400'}`}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className={`border-t p-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              darkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-200'
            }`}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className={`px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 ${
              darkMode
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <Send className="h-4 w-4" />
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
