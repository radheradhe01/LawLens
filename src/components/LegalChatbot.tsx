import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Send, Bot, User, Globe, BookOpen, Scale, Heart, Smartphone, Shield, Briefcase } from 'lucide-react';

const LegalChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Namaste! I\'m your AI Legal Saathi. मैं आपकी कानूनी समस्याओं में मदद कर सकता हूं - whether it\'s gig work issues, cyber harassment, housing problems, or any modern legal challenge. आज आप क्या जानना चाहते हैं?',
      timestamp: '10:00 AM'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('hinglish');
  const [chatMode, setChatMode] = useState('contemporary');

  const languages = [
    { value: 'english', label: 'English', flag: '🇺🇸' },
    { value: 'hinglish', label: 'Hinglish', flag: '🇮🇳' },
    { value: 'hindi', label: 'Hindi', flag: '🇮🇳' },
    { value: 'marathi', label: 'Marathi', flag: '🇮🇳' },
    { value: 'gujarati', label: 'Gujarati', flag: '🇮🇳' },
    { value: 'bengali', label: 'Bengali', flag: '🇮🇳' },
    { value: 'tamil', label: 'Tamil', flag: '🇮🇳' },
    { value: 'telugu', label: 'Telugu', flag: '🇮🇳' },
  ];

  const quickQuestions = [
    "Zomato/Swiggy delivery partner rights क्या हैं?",
    "Social media harassment का case कैसे करें?",
    "Work from home में employer के rights क्या हैं?",
    "Rent agreement में scam से कैसे बचें?",
    "AI/deepfake misuse के लिए legal action?",
    "Cab driver vs Ola/Uber dispute में क्या करें?",
    "Online shopping fraud का legal solution?",
    "Mental health leave का employee right?",
    "Landlord illegal eviction से protection?",
    "Data privacy violation की complaint कैसे करें?"
  ];

  const contemporaryStories = [
    {
      title: "The Gig Worker's Victory",
      category: "Labor Rights",
      summary: "How Ravi, a Zomato delivery partner, fought for insurance coverage after an accident and won landmark rights...",
      icon: Briefcase
    },
    {
      title: "The Deepfake Justice",
      category: "Cyber Crime",
      summary: "Priya's battle against AI-generated inappropriate content and how she got justice through new cyber laws...",
      icon: Shield
    },
    {
      title: "The Remote Work Revolution",
      category: "Employment",
      summary: "When Amit's company tried to cut WFH allowances, here's how employees united for their digital rights...",
      icon: Smartphone
    },
    {
      title: "The Housing App Scam",
      category: "Consumer Protection",
      summary: "Students vs fake rental listings - how they exposed a multi-crore housing scam through legal action...",
      icon: Scale
    }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);

    // Show loading bot message
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      type: 'bot',
      content: 'Thinking... ⏳',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);

    try {
      const res = await fetch('http://localhost:9000/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: inputMessage })
      });
      const data = await res.json();
      setMessages(prev => [
        ...prev.slice(0, -1), // remove loading
        {
          id: prev.length,
          type: 'bot',
          content: data.response || 'No response from server.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev.slice(0, -1), // remove loading
        {
          id: prev.length,
          type: 'bot',
          content: 'Error: Unable to connect to chatbot server.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }

    setInputMessage('');
  };

  const getBotResponse = (message, mode, language) => {
    const responses = {
      hinglish: `समझ गया! "${message}" के बारे में आपका सवाल है। यहाँ है practical solution: 1) आपके legal rights क्या हैं, 2) कौन से documents चाहिए, 3) कहाँ complaint करना है, 4) Expected timeline क्या है। Need more details? बताइए!`,
      hindi: `मैं समझ गया हूँ कि आप "${message}" के बारे में पूछ रहे हैं। आज के समय में ये बहुत common issue है। यहाँ step-by-step solution है: 1) पहले अपने अधिकार समझिए, 2) जरूरी कागजात इकट्ठे करिए, 3) सही जगह शिकायत दर्ज करिए।`,
      english: `I understand you're asking about "${message}". This is a very relevant issue in today's digital age. Here's what you should know: 1) Your legal rights in this modern context, 2) Digital evidence you need to collect, 3) Online platforms for filing complaints, 4) Expected resolution timeline. Would you like me to elaborate on any specific aspect?`
    };

    if (mode === 'contemporary') {
      return responses[language] || responses.hinglish;
    }
    
    if (mode === 'story') {
      return `Let me tell you a real story that happened recently... एक similar case था where someone faced the exact same issue as "${message}". Through smart legal strategy and using modern digital tools, they successfully resolved it. यहाँ है complete story और solution...`;
    }

    return responses[language] || responses.hinglish;
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  return (
    <div className="space-y-6">
      {/* Chat Mode Selection */}
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1 bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-blue-300" />
                <span className="text-white font-medium">AI Mode:</span>
              </div>
              <Select value={chatMode} onValueChange={setChatMode}>
                <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  <SelectItem value="contemporary">Contemporary Issues</SelectItem>
                  <SelectItem value="story">Real Case Stories</SelectItem>
                  <SelectItem value="guidance">Step-by-Step Guide</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-blue-300" />
                <span className="text-white font-medium">भाषा/Language:</span>
              </div>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.flag} {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 h-[600px] flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center">
                    <Bot className="h-5 w-5 mr-2" />
                    Legal Saathi AI
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    {chatMode === 'story' ? 'Real Stories Mode - सच्ची कहानियां' : 
                     chatMode === 'guidance' ? 'Step-by-Step Guide - व्यावहारिक मार्गदर्शन' : 
                     'Contemporary Issues - आज के जमाने की समस्याएं'}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    Live
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    2024 Updated
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            {/* Messages Area */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/10 text-white border border-white/20'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.type === 'bot' && <Bot className="h-4 w-4 mt-1 text-blue-300" />}
                      {message.type === 'user' && <User className="h-4 w-4 mt-1" />}
                      <div className="flex-1">
                        {message.type === 'bot' ? (
                          <div className="text-sm">
                            <ReactMarkdown>{message.content}</ReactMarkdown>
                          </div>
                        ) : (
                          <p className="text-sm">{message.content}</p>
                        )}
                        <p className="text-xs opacity-70 mt-2">{message.timestamp}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>

            {/* Input Area */}
            <div className="p-4 border-t border-white/20">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="अपना legal question पूछिए... Ask your legal question..."
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-blue-200"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Questions */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">आज के सवाल - Today's Questions</CardTitle>
              <CardDescription className="text-blue-200">
                Common modern legal queries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start border-white/20 text-blue-200 hover:bg-white/10 hover:text-white text-xs h-auto py-2 px-3"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contemporary Case Stories */}
          {chatMode === 'story' && (
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Real Stories - सच्ची कहानियां
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contemporaryStories.map((story, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded bg-white/10">
                          <story.icon className="h-4 w-4 text-blue-300" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-white text-sm mb-1">{story.title}</h4>
                          <Badge variant="outline" className="border-blue-500/50 text-blue-300 text-xs mb-2">
                            {story.category}
                          </Badge>
                          <p className="text-blue-200 text-xs">{story.summary}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Modern Features */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">2024 AI Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-4 w-4 text-blue-300" />
                  <span className="text-blue-200 text-sm">Digital Age Issues</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Briefcase className="h-4 w-4 text-green-300" />
                  <span className="text-blue-200 text-sm">Gig Economy Rights</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-4 w-4 text-purple-300" />
                  <span className="text-blue-200 text-sm">Cyber Protection</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-orange-300" />
                  <span className="text-blue-200 text-sm">Multi-language Support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="h-4 w-4 text-pink-300" />
                  <span className="text-blue-200 text-sm">Mental Health Rights</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts - Updated */}
          <Card className="bg-blue-600/10 backdrop-blur-sm border-blue-300/30">
            <CardHeader>
              <CardTitle className="text-white text-lg">Emergency Helplines 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-red-200">Cyber Crime Helpline</span>
                  <span className="text-white font-semibold">1930</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-200">Women Safety (24x7)</span>
                  <span className="text-white font-semibold">181</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-200">Consumer Helpline</span>
                  <span className="text-white font-semibold">1915</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-200">Legal Aid Services</span>
                  <span className="text-white font-semibold">15100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-200">Mental Health Support</span>
                  <span className="text-white font-semibold">9152987821</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LegalChatbot;
