import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Users, Globe, Heart, Scale, Search, Video, FileText, HelpCircle, Smartphone, Shield, Briefcase, Home, Car } from 'lucide-react';

const LegalLiteracy = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('hinglish');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  const legalGuides = [
    {
      id: 1,
      title: 'Gig Worker Rights & Benefits Guide',
      description: 'अपने rights जानिए - Delivery, Cab, Freelance work के लिए complete guide',
      category: 'Gig Economy',
      difficulty: 'Beginner',
      readTime: '4 min',
      languages: ['hinglish', 'hindi', 'english'],
      popular: true,
      trending: true,
      icon: Briefcase
    },
    {
      id: 2,
      title: 'Cyber Harassment & Online Safety',
      description: 'Social media harassment, deepfakes, and digital privacy protection guide',
      category: 'Cyber Safety',
      difficulty: 'Beginner',
      readTime: '5 min',
      languages: ['hinglish', 'english', 'hindi'],
      popular: true,
      trending: true,
      icon: Shield
    },
    {
      id: 3,
      title: 'Housing & Rental Rights in 2024',
      description: 'Tenant rights, illegal eviction protection, और WFH space के नए rules',
      category: 'Housing',
      difficulty: 'Beginner',
      readTime: '6 min',
      languages: ['hinglish', 'marathi', 'gujarati'],
      popular: true,
      trending: false,
      icon: Home
    },
    {
      id: 4,
      title: 'Mental Health Rights at Workplace',
      description: 'Workplace stress, burnout leave, और mental health protection के rights',
      category: 'Employment',
      difficulty: 'Intermediate',
      readTime: '7 min',
      languages: ['english', 'hindi', 'bengali'],
      popular: true,
      trending: true,
      icon: Heart
    },
    {
      id: 5,
      title: 'Consumer Rights in Digital Age',
      description: 'Online shopping scams, app-based services, और digital payment disputes',
      category: 'Consumer Protection',
      difficulty: 'Beginner',
      readTime: '5 min',
      languages: ['hinglish', 'tamil', 'telugu'],
      popular: false,
      trending: true,
      icon: Smartphone
    },
    {
      id: 6,
      title: 'Vehicle & Transport Legal Guide',
      description: 'Cab booking disputes, vehicle insurance claims, और traffic violation rights',
      category: 'Transport',
      difficulty: 'Beginner',
      readTime: '4 min',
      languages: ['hinglish', 'hindi', 'marathi', 'gujarati'],
      popular: false,
      trending: false,
      icon: Car
    },
    {
      id: 7,
      title: 'Women Safety & Legal Protection',
      description: 'Workplace harassment, online safety, और women-specific legal rights',
      category: 'Women Rights',
      difficulty: 'Beginner',
      readTime: '8 min',
      languages: ['hinglish', 'hindi', 'bengali', 'tamil'],
      popular: true,
      trending: true,
      icon: Scale
    },
    {
      id: 8,
      title: 'Student Rights & Education Law',
      description: 'Fee disputes, online classes rights, और educational institution के against complaint',
      category: 'Education',
      difficulty: 'Beginner',
      readTime: '5 min',
      languages: ['hinglish', 'english', 'hindi'],
      popular: false,
      trending: false,
      icon: BookOpen
    }
  ];

  const quickHelp = [
    {
      question: "Swiggy/Zomato delivery partner के insurance claim कैसे करें?",
      answer: "Company के साथ partnership agreement check करें, insurance policy details मांगें, और accident के 24 hours के अंदर report करें",
      category: "Gig Economy"
    },
    {
      question: "Instagram/Facebook पर harassment का legal action कैसे लें?",
      answer: "Screenshots save करें, platform पर report करें, cyber crime portal पर complaint file करें - cybercrime.gov.in",
      category: "Cyber Safety"
    },
    {
      question: "Landlord ने illegal eviction notice दिया है - क्या करें?",
      answer: "Rent Control Act के under tenant rights हैं, legal notice भेजें, और district magistrate office में complaint करें",
      category: "Housing Rights"
    },
    {
      question: "Work from home allowance company ने बंद कर दिया - legal action?",
      answer: "Employment contract check करें, Labour Commissioner office में complaint करें, या employee union से contact करें",
      category: "Employment"
    },
    {
      question: "Flipkart/Amazon से fake product मिला - refund कैसे लें?",
      answer: "Consumer Court में complaint file करें, National Consumer Helpline 1915 पर call करें, या online portal use करें",
      category: "Consumer Rights"
    },
    {
      question: "Uber/Ola driver ने inappropriate behavior किया - action?",
      answer: "App में complaint करें, police complaint file करें, और women helpline 181 पर call करें (if applicable)",
      category: "Transport Safety"
    }
  ];

  const filteredGuides = legalGuides.filter(guide => {
    const matchesLanguage = selectedLanguage === 'all' || guide.languages.includes(selectedLanguage);
    const matchesCategory = selectedCategory === 'all' || guide.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLanguage && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-500/20 to-green-500/20 backdrop-blur-sm border-blue-300/30">
        <CardHeader>
          <CardTitle className="text-white text-2xl flex items-center">
            <BookOpen className="h-6 w-6 mr-3" />
            Legal Literacy Hub 2024
          </CardTitle>
          <CardDescription className="text-blue-200 text-lg">
            आज के जमाने की legal problems का simple solution - Modern legal guidance for everyone
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Trending Alert */}
      <Card className="bg-blue-600/10 backdrop-blur-sm border-blue-300/30">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 animate-pulse">
              🔥 Trending
            </Badge>
            <span className="text-white font-medium">
              Most searched: Gig worker rights, Cyber harassment, Housing disputes, Mental health at work
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
              <Input
                placeholder="Search करें - gig work, cyber crime, housing..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200"
              />
            </div>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="भाषा चुनें" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                <SelectItem value="all">All Languages</SelectItem>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.flag} {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="gig">Gig Economy</SelectItem>
                <SelectItem value="cyber">Cyber Safety</SelectItem>
                <SelectItem value="housing">Housing Rights</SelectItem>
                <SelectItem value="employment">Employment</SelectItem>
                <SelectItem value="consumer">Consumer Protection</SelectItem>
                <SelectItem value="women">Women Rights</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
                <SelectItem value="education">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Legal Guides */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold text-white">2024 के Legal Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGuides.map((guide) => (
              <Card 
                key={guide.id}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer relative"
              >
                {guide.trending && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs">
                      🔥 Trending
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <guide.icon className="h-8 w-8 text-blue-300" />
                    {guide.popular && (
                      <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                        Popular
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">{guide.title}</h3>
                  <p className="text-blue-200 text-sm mb-4">{guide.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="border-blue-500/50 text-blue-300 text-xs">
                      {guide.category}
                    </Badge>
                    <Badge variant="outline" className="border-green-500/50 text-green-300 text-xs">
                      {guide.difficulty}
                    </Badge>
                    <Badge variant="outline" className="border-purple-500/50 text-purple-300 text-xs">
                      {guide.readTime}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      {guide.languages.slice(0, 3).map((lang) => {
                        const langInfo = languages.find(l => l.value === lang);
                        return langInfo ? (
                          <span key={lang} className="text-xs">{langInfo.flag}</span>
                        ) : null;
                      })}
                      {guide.languages.length > 3 && (
                        <span className="text-blue-300 text-xs">+{guide.languages.length - 3}</span>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 text-xs"
                    >
                      Read Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Help */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">Quick Help - तुरंत मदद</CardTitle>
              <CardDescription className="text-blue-200">
                Common 2024 legal questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {quickHelp.map((item, index) => (
                  <div 
                    key={index}
                    className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
                  >
                    <h4 className="font-medium text-white text-sm mb-2">{item.question}</h4>
                    <p className="text-blue-200 text-xs mb-2">{item.answer}</p>
                    <Badge variant="outline" className="border-blue-500/50 text-blue-300 text-xs">
                      {item.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Modern Resources */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">2024 Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-white/20 text-blue-200 hover:bg-white/10 hover:text-white"
                >
                  <Video className="w-4 h-4 mr-2" />
                  YouTube Legal Guides
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-white/20 text-blue-200 hover:bg-white/10 hover:text-white"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Legal Apps & Tools
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-white/20 text-blue-200 hover:bg-white/10 hover:text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Digital Forms & Templates
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-white/20 text-blue-200 hover:bg-white/10 hover:text-white"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Government Online Services
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Language Support */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                भाषा Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <div 
                    key={lang.value}
                    className="flex items-center space-x-2 p-2 rounded bg-white/5 border border-white/10"
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-blue-200 text-sm">{lang.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-blue-300 text-xs mt-3 text-center">
                Modern legal guidance in 8+ languages
              </p>
            </CardContent>
          </Card>

          {/* Emergency Contacts - Updated for 2024 */}
          <Card className="bg-red-500/10 backdrop-blur-sm border-red-300/30">
            <CardHeader>
              <CardTitle className="text-white text-lg">2024 Emergency Helplines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-red-200">Cyber Crime (24x7)</span>
                  <span className="text-white font-semibold">1930</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-200">Women Safety Helpline</span>
                  <span className="text-white font-semibold">181</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-200">Consumer Protection</span>
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
                <div className="flex justify-between">
                  <span className="text-red-200">Labour Rights Helpline</span>
                  <span className="text-white font-semibold">1800-11-1228</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LegalLiteracy;
