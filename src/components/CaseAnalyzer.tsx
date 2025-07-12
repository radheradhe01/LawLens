import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Brain, Search, TrendingUp, AlertCircle, FileText, Clock, Users, Target } from 'lucide-react';

const CaseAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const repetitiveCases = [
    {
      id: 'RC001',
      pattern: 'Digital Payment Fraud',
      frequency: 89,
      similarity: 94,
      category: 'Cyber Crime',
      trend: '+23%',
      lastOccurrence: '2 hours ago',
      commonFactors: ['UPI transactions', 'Fake merchant accounts', 'Social engineering'],
      severity: 'high'
    },
    {
      id: 'RC002',
      pattern: 'Employment Contract Disputes',
      frequency: 67,
      similarity: 87,
      category: 'Labor Law',
      trend: '+15%',
      lastOccurrence: '5 hours ago',
      commonFactors: ['Salary disputes', 'Termination issues', 'Work from home policies'],
      severity: 'medium'
    },
    {
      id: 'RC003',
      pattern: 'Property Documentation Issues',
      frequency: 45,
      similarity: 91,
      category: 'Property Law',
      trend: '-8%',
      lastOccurrence: '1 day ago',
      commonFactors: ['Missing NOCs', 'Title disputes', 'Registration problems'],
      severity: 'medium'
    }
  ];

  const analysisInsights = [
    {
      title: 'Pattern Recognition Accuracy',
      value: '94.2%',
      description: 'AI successfully identifies similar case patterns',
      icon: Target,
      color: 'text-green-400'
    },
    {
      title: 'Processing Speed',
      value: '< 2 min',
      description: 'Average time to analyze case similarities',
      icon: Clock,
      color: 'text-blue-400'
    },
    {
      title: 'Cases Processed',
      value: '2,847',
      description: 'Total cases analyzed for patterns',
      icon: FileText,
      color: 'text-purple-400'
    },
    {
      title: 'Active Patterns',
      value: '67',
      description: 'Currently tracked repetitive patterns',
      icon: TrendingUp,
      color: 'text-yellow-400'
    }
  ];

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Analysis Control Panel */}
      <Card className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border-purple-300/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center">
                <Brain className="h-6 w-6 mr-2" />
                AI Case Pattern Analyzer
              </CardTitle>
              <CardDescription className="text-blue-200">
                Deep learning analysis of repetitive legal cases and patterns
              </CardDescription>
            </div>
            <Button 
              onClick={startAnalysis}
              disabled={isAnalyzing}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isAnalyzing ? 'Analyzing...' : 'Start Deep Analysis'}
            </Button>
          </div>
          {isAnalyzing && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm">Analysis Progress</span>
                <span className="text-white text-sm">{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Analysis Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analysisInsights.map((insight, index) => (
          <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">{insight.title}</p>
                  <p className={`text-2xl font-bold ${insight.color}`}>{insight.value}</p>
                  <p className="text-blue-300 text-xs mt-1">{insight.description}</p>
                </div>
                <insight.icon className={`h-6 w-6 ${insight.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="patterns" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-sm border-white/20">
          <TabsTrigger value="patterns" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Repetitive Patterns
          </TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Deep Insights
          </TabsTrigger>
          <TabsTrigger value="predictions" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Predictions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="patterns" className="space-y-4">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Identified Repetitive Case Patterns</CardTitle>
              <CardDescription className="text-blue-200">
                Cases with high similarity scores and frequent occurrence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {repetitiveCases.map((case_pattern) => (
                  <div 
                    key={case_pattern.id}
                    className="p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{case_pattern.pattern}</h3>
                          <Badge 
                            variant="outline"
                            className={`${
                              case_pattern.severity === 'high' ? 'border-red-500/50 text-red-300' :
                              'border-yellow-500/50 text-yellow-300'
                            }`}
                          >
                            {case_pattern.severity} priority
                          </Badge>
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                            {case_pattern.id}
                          </Badge>
                        </div>
                        <p className="text-blue-200 text-sm mb-3">{case_pattern.category}</p>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant="secondary"
                          className="bg-green-500/20 text-green-300 border-green-500/30 mb-2"
                        >
                          {case_pattern.trend}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-2xl font-bold text-white">{case_pattern.frequency}</p>
                        <p className="text-sm text-blue-200">Occurrences</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-2xl font-bold text-green-400">{case_pattern.similarity}%</p>
                        <p className="text-sm text-blue-200">Similarity</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-sm font-medium text-white">{case_pattern.lastOccurrence}</p>
                        <p className="text-sm text-blue-200">Last Seen</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-white font-medium">Common Factors:</h4>
                      <div className="flex flex-wrap gap-2">
                        {case_pattern.commonFactors.map((factor, index) => (
                          <Badge 
                            key={index}
                            variant="outline"
                            className="border-purple-500/30 text-purple-300"
                          >
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-blue-500/50 text-blue-300 hover:bg-blue-500/20"
                      >
                        <Search className="w-4 h-4 mr-2" />
                        View Similar Cases
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-green-500/50 text-green-300 hover:bg-green-500/20"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Deep Analysis Insights</CardTitle>
              <CardDescription className="text-blue-200">
                AI-generated insights from pattern analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <h4 className="text-white font-semibold mb-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Key Finding: Digital Payment Fraud Surge
                  </h4>
                  <p className="text-blue-200 text-sm">
                    Our AI has detected a 89% increase in digital payment fraud cases with similar patterns. 
                    The common thread involves fake UPI merchant accounts and social engineering tactics. 
                    Recommend immediate awareness campaigns and stricter verification protocols.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <h4 className="text-white font-semibold mb-2 flex items-center">
                    <Brain className="w-4 h-4 mr-2" />
                    Pattern Correlation Analysis
                  </h4>
                  <p className="text-blue-200 text-sm">
                    Employment disputes show strong correlation with economic indicators. 
                    Cases spike during quarter-end periods and economic uncertainty phases. 
                    Predictive modeling suggests preparation for increased caseload in Q4.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <h4 className="text-white font-semibold mb-2 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Resolution Efficiency Insights
                  </h4>
                  <p className="text-blue-200 text-sm">
                    Cases with similar patterns to RC001 (Digital Payment Fraud) have a 73% higher 
                    resolution rate when handled by specialized cyber crime units. Recommend 
                    automatic routing of similar cases to appropriate departments.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Predictive Analysis</CardTitle>
              <CardDescription className="text-blue-200">
                AI predictions based on historical patterns and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                    <h4 className="text-white font-semibold mb-2">High Risk Prediction</h4>
                    <p className="text-red-300 text-sm mb-2">Cyber crime cases expected to increase by 45% in next 3 months</p>
                    <div className="flex items-center space-x-2">
                      <Progress value={85} className="flex-1 h-2" />
                      <span className="text-red-300 text-sm">85% confidence</span>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                    <h4 className="text-white font-semibold mb-2">Medium Risk Prediction</h4>
                    <p className="text-yellow-300 text-sm mb-2">Property disputes likely to stabilize with slight decrease</p>
                    <div className="flex items-center space-x-2">
                      <Progress value={67} className="flex-1 h-2" />
                      <span className="text-yellow-300 text-sm">67% confidence</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-white font-semibold mb-3">Resource Allocation Recommendations</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Cyber Crime Unit</span>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">+40% capacity needed</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Family Law Department</span>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Current capacity sufficient</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Property Division</span>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">-15% capacity reduction possible</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CaseAnalyzer;
