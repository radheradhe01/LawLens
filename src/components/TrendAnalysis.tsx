import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, FileText, Smartphone, Shield, Home, Briefcase } from 'lucide-react';
const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];
const CRIME_TYPES = [
  { label: "Crime Against Women (2022)", value: "women" },
  { label: "IPC Crimes (2020-2022)", value: "ipc" }
];

const TrendAnalysis = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCrimeType, setSelectedCrimeType] = useState("women");
  const [realData, setRealData] = useState<any[]>([]);
  const [realLoading, setRealLoading] = useState(false);
  const [realError, setRealError] = useState("");
  useEffect(() => {
    fetchRealData();
  }, [selectedState, selectedCrimeType]);
  const fetchRealData = async () => {
    setRealLoading(true);
    setRealError("");
    try {
      let url = `/stats?crime_type=${selectedCrimeType}`;
      if (selectedState) url += `&state=${encodeURIComponent(selectedState)}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.error) setRealError(json.error);
      else setRealData(json.stats || []);
    } catch (e: any) {
      setRealError(e.message || "Failed to fetch data");
    }
    setRealLoading(false);
  };

  const trendData = [
    { month: 'Jan', cyber: 156, gig_economy: 89, housing: 234, social_media: 167, climate: 45, healthcare: 123 },
    { month: 'Feb', cyber: 189, gig_economy: 112, housing: 267, social_media: 198, climate: 67, healthcare: 145 },
    { month: 'Mar', cyber: 234, gig_economy: 134, housing: 298, social_media: 223, climate: 89, healthcare: 167 },
    { month: 'Apr', cyber: 289, gig_economy: 156, housing: 334, social_media: 267, climate: 112, healthcare: 189 },
    { month: 'May', cyber: 345, gig_economy: 189, housing: 387, social_media: 301, climate: 134, healthcare: 234 },
    { month: 'Jun', cyber: 423, gig_economy: 223, housing: 445, social_media: 356, climate: 167, healthcare: 278 },
  ];

  const emergingIssues = [
    {
      title: 'AI & Data Privacy Violations',
      change: '+267%',
      trend: 'up',
      description: 'Surge in cases involving AI discrimination, deepfakes, and unauthorized data harvesting by tech companies',
      urgency: 'critical',
      icon: Shield
    },
    {
      title: 'Gig Economy Labor Rights',
      change: '+189%',
      trend: 'up',
      description: 'Uber, Zomato, and delivery workers fighting for employee benefits and fair wages',
      urgency: 'high',
      icon: Briefcase
    },
    {
      title: 'Social Media Harassment & Cyberbullying',
      change: '+234%',
      trend: 'up',
      description: 'Increasing cases of online harassment, revenge porn, and mental health impacts',
      urgency: 'high',
      icon: Smartphone
    },
    {
      title: 'Housing & Rental Crisis',
      change: '+156%',
      trend: 'up',
      description: 'Tenant rights violations, illegal evictions, and disputes over work-from-home spaces',
      urgency: 'critical',
      icon: Home
    },
    {
      title: 'Climate Change Litigation',
      change: '+123%',
      trend: 'up',
      description: 'Environmental lawsuits against corporations and government inaction on climate policies',
      urgency: 'medium',
      icon: AlertTriangle
    },
    {
      title: 'Healthcare Access & Telemedicine',
      change: '+98%',
      trend: 'up',
      description: 'Medical negligence in telemedicine, insurance claim denials, and healthcare discrimination',
      urgency: 'high',
      icon: Shield
    }
  ];

  const caseDistribution = [
    { name: 'Cyber & Tech Crimes', value: 28, color: '#ef4444' },
    { name: 'Labor & Employment', value: 24, color: '#3b82f6' },
    { name: 'Housing & Property', value: 22, color: '#f59e0b' },
    { name: 'Social Media & Privacy', value: 16, color: '#10b981' },
    { name: 'Healthcare Rights', value: 10, color: '#8b5cf6' },
  ];

  const currentAlerts = [
    {
      title: 'Digital India Act 2024',
      type: 'New Legislation',
      impact: 'High',
      description: 'New regulations on social media platforms and content moderation'
    },
    {
      title: 'Work from Home Rights',
      type: 'Emerging Trend',
      impact: 'Medium',
      description: 'Disputes over employee monitoring and home office expenses'
    },
    {
      title: 'Mental Health at Workplace',
      type: 'Social Issue',
      impact: 'High',
      description: 'Rising cases of workplace stress and burnout compensation claims'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[rgba(30,41,59,0.85)] backdrop-blur p-4 rounded-b-xl shadow-lg mb-6 border border-slate-700">
        <h2 className="text-lg font-bold mb-2 text-slate-100">Explore Real Crime Data</h2>
        <div className="flex flex-wrap gap-4 mb-2">
          <select value={selectedState} onChange={e => setSelectedState(e.target.value)} className="border border-slate-700 bg-slate-800 text-slate-100 p-2 rounded focus:ring-2 focus:ring-blue-500">
            <option value="">All States/UTs</option>
            {STATES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select value={selectedCrimeType} onChange={e => setSelectedCrimeType(e.target.value)} className="border border-slate-700 bg-slate-800 text-slate-100 p-2 rounded focus:ring-2 focus:ring-blue-500">
            {CRIME_TYPES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        {realLoading && <div className="text-slate-400">Loading...</div>}
        {realError && <div className="text-red-400">{realError}</div>}
        {!realLoading && !realError && realData.length > 0 && (
          <div className="overflow-x-auto max-h-96 mt-2">
            <table className="min-w-full border border-slate-700 text-xs">
              <thead>
                <tr>
                  {Object.keys(realData[0]).map((k) => (
                    <th key={k} className="border border-slate-700 px-2 py-1 bg-slate-800 text-slate-300 sticky top-0 z-20">{k}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {realData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-slate-900/60" : "bg-slate-800/60"}>
                    {Object.values(row).map((v, j) => (
                      <td key={j} className="border border-slate-700 px-2 py-1 text-slate-100">{String(v)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!realLoading && !realError && realData.length === 0 && <div className="text-slate-400">No data found.</div>}
      </div>
      <Card className="bg-blue-600/10 backdrop-blur-sm border-blue-300/30">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-blue-400" />
            <CardTitle className="text-white">2024 Critical Legal Trends Alert</CardTitle>
          </div>
          <CardDescription className="text-blue-200">
            Contemporary legal challenges requiring immediate societal attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentAlerts.map((alert, index) => (
              <div key={index} className="p-3 rounded-lg bg-blue-900/40 border border-blue-300/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white text-sm">{alert.title}</h4>
                  <Badge variant="outline" className={`text-xs ${
                    alert.impact === 'High' ? 'border-blue-400 text-blue-300' :
                    alert.impact === 'Medium' ? 'border-yellow-400 text-yellow-300' :
                    'border-green-400 text-green-300'
                  }`}>
                    {alert.impact}
                  </Badge>
                </div>
                <p className="text-blue-200 text-xs mb-1">{alert.type}</p>
                <p className="text-blue-100 text-xs">{alert.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Contemporary Legal Issues Trends</CardTitle>
            <CardDescription className="text-blue-200">
              Monthly case trends reflecting current societal challenges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="cyber" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                  name="Cyber & AI Issues"
                />
                <Line 
                  type="monotone" 
                  dataKey="housing" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                  name="Housing Crisis"
                />
                <Line 
                  type="monotone" 
                  dataKey="gig_economy" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  name="Gig Economy"
                />
                <Line 
                  type="monotone" 
                  dataKey="social_media" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  name="Social Media Issues"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Current Legal Issues Distribution</CardTitle>
            <CardDescription className="text-blue-200">
              Breakdown by contemporary challenge type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={caseDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {caseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Emerging Societal Legal Challenges 2024</CardTitle>
          <CardDescription className="text-blue-200">
            Real-world issues affecting today's society
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergingIssues.map((issue, index) => (
              <div 
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <div className="p-2 rounded-lg bg-white/10">
                  <issue.icon className="h-5 w-5 text-blue-300" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-white text-sm">{issue.title}</h3>
                    <Badge 
                      variant={issue.trend === 'up' ? 'destructive' : 'secondary'}
                      className={`text-xs ${
                        issue.trend === 'up' 
                          ? 'bg-red-500/20 text-red-300 border-red-500/30' 
                          : 'bg-green-500/20 text-green-300 border-green-500/30'
                      }`}
                    >
                      {issue.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {issue.change}
                    </Badge>
                  </div>
                  <p className="text-blue-200 text-xs mb-2">{issue.description}</p>
                  <Badge 
                    variant="outline"
                    className={`text-xs ${
                      issue.urgency === 'critical' ? 'border-red-500/50 text-red-300' :
                      issue.urgency === 'high' ? 'border-orange-500/50 text-orange-300' :
                      issue.urgency === 'medium' ? 'border-yellow-500/50 text-yellow-300' :
                      'border-green-500/50 text-green-300'
                    }`}
                  >
                    {issue.urgency} priority
                  </Badge>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-blue-500/50 text-blue-300 hover:bg-blue-500/20 text-xs"
                >
                  <FileText className="w-3 h-3 mr-1" />
                  Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border-purple-300/30">
        <CardHeader>
          <CardTitle className="text-white">Societal Impact Metrics</CardTitle>
          <CardDescription className="text-purple-200">
            How legal trends are affecting society today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">47M</div>
              <div className="text-purple-200 text-sm">Gig Workers Affected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">₹2.3L Cr</div>
              <div className="text-purple-200 text-sm">Housing Dispute Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">156%</div>
              <div className="text-purple-200 text-sm">Cyber Crime Increase</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">89%</div>
              <div className="text-purple-200 text-sm">Youth Affected by Online Harassment</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default TrendAnalysis;
