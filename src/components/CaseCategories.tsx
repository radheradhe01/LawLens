import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, FileText, Clock, TrendingUp, Users } from 'lucide-react';

const CaseCategories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');

  const categories = [
    {
      id: 1,
      name: 'Criminal Law',
      subcategories: ['Theft', 'Assault', 'Fraud', 'Drug Offenses'],
      totalCases: 1247,
      recentCases: 89,
      trend: '+12%',
      urgency: 'high',
      color: 'bg-red-500'
    },
    {
      id: 2,
      name: 'Civil Rights',
      subcategories: ['Discrimination', 'Privacy', 'Freedom of Speech', 'Employment Rights'],
      totalCases: 834,
      recentCases: 67,
      trend: '+23%',
      urgency: 'high',
      color: 'bg-blue-500'
    },
    {
      id: 3,
      name: 'Family Law',
      subcategories: ['Divorce', 'Child Custody', 'Adoption', 'Domestic Violence'],
      totalCases: 923,
      recentCases: 45,
      trend: '+8%',
      urgency: 'medium',
      color: 'bg-green-500'
    },
    {
      id: 4,
      name: 'Property Law',
      subcategories: ['Real Estate', 'Landlord-Tenant', 'Property Rights', 'Zoning'],
      totalCases: 612,
      recentCases: 34,
      trend: '-5%',
      urgency: 'low',
      color: 'bg-yellow-500'
    },
    {
      id: 5,
      name: 'Corporate Law',
      subcategories: ['Contracts', 'Mergers', 'Compliance', 'Intellectual Property'],
      totalCases: 756,
      recentCases: 78,
      trend: '+15%',
      urgency: 'medium',
      color: 'bg-purple-500'
    },
    {
      id: 6,
      name: 'Cyber Law',
      subcategories: ['Data Breach', 'Online Fraud', 'Digital Privacy', 'AI Ethics'],
      totalCases: 445,
      recentCases: 156,
      trend: '+89%',
      urgency: 'critical',
      color: 'bg-pink-500'
    }
  ];

  const recentCases = [
    {
      id: 'C001',
      title: 'AI Decision Making in Healthcare',
      category: 'Cyber Law',
      status: 'Active',
      priority: 'High',
      lastUpdate: '2 hours ago'
    },
    {
      id: 'C002',
      title: 'Corporate Data Privacy Violation',
      category: 'Civil Rights',
      status: 'Under Review',
      priority: 'Critical',
      lastUpdate: '5 hours ago'
    },
    {
      id: 'C003',
      title: 'Employment Discrimination Case',
      category: 'Civil Rights',
      status: 'Investigation',
      priority: 'Medium',
      lastUpdate: '1 day ago'
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.subcategories.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
              <Input
                placeholder="Search categories or subcategories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                <SelectItem value="recent">Recent Cases</SelectItem>
                <SelectItem value="total">Total Cases</SelectItem>
                <SelectItem value="trend">Trend Growth</SelectItem>
                <SelectItem value="urgency">Urgency Level</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Filter by urgency" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Categories Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">Legal Categories</h2>
          <div className="space-y-4">
            {filteredCategories.map((category) => (
              <Card 
                key={category.id}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                      <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                    </div>
                    <Badge 
                      variant="outline"
                      className={`${
                        category.urgency === 'critical' ? 'border-red-500/50 text-red-300' :
                        category.urgency === 'high' ? 'border-orange-500/50 text-orange-300' :
                        category.urgency === 'medium' ? 'border-yellow-500/50 text-yellow-300' :
                        'border-green-500/50 text-green-300'
                      }`}
                    >
                      {category.urgency}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{category.totalCases}</p>
                      <p className="text-sm text-blue-200">Total Cases</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{category.recentCases}</p>
                      <p className="text-sm text-blue-200">Recent Cases</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <Badge 
                      variant="secondary"
                      className={`${
                        category.trend.startsWith('+') 
                          ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                          : 'bg-red-500/20 text-red-300 border-red-500/30'
                      }`}
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {category.trend}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-blue-200 font-medium">Subcategories:</p>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub, index) => (
                        <Badge 
                          key={index} 
                          variant="outline"
                          className="border-blue-500/30 text-blue-300 text-xs"
                        >
                          {sub}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Cases */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">Recent Cases</h2>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Active Cases</CardTitle>
              <CardDescription className="text-blue-200">
                Latest cases requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCases.map((case_item) => (
                  <div 
                    key={case_item.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="border-blue-500/50 text-blue-300">
                          {case_item.id}
                        </Badge>
                        <Badge 
                          variant="outline"
                          className={`${
                            case_item.priority === 'Critical' ? 'border-red-500/50 text-red-300' :
                            case_item.priority === 'High' ? 'border-orange-500/50 text-orange-300' :
                            'border-yellow-500/50 text-yellow-300'
                          }`}
                        >
                          {case_item.priority}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-white mb-1">{case_item.title}</h4>
                      <p className="text-sm text-blue-200 mb-2">{case_item.category}</p>
                      <div className="flex items-center space-x-4 text-xs text-blue-300">
                        <span className="flex items-center">
                          <FileText className="w-3 h-3 mr-1" />
                          {case_item.status}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {case_item.lastUpdate}
                        </span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-blue-500/50 text-blue-300 hover:bg-blue-500/20"
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-blue-600/10 backdrop-blur-sm border-blue-300/30">
            <CardHeader>
              <CardTitle className="text-white">Category Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-blue-200">Most Active Category</span>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    Criminal Law
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-200">Fastest Growing</span>
                  <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30">
                    Cyber Law (+89%)
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-200">Total Categories</span>
                  <span className="text-white font-semibold">6</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-200">Total Cases</span>
                  <span className="text-white font-semibold">4,817</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CaseCategories;
