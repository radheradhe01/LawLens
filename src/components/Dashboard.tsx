import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Scale, MessageSquare, BookOpen, Search, Brain, Smartphone, Users, Shield } from 'lucide-react';
import TrendAnalysis from './TrendAnalysis';
import CaseCategories from './CaseCategories';
import LegalChatbot from './LegalChatbot';
import CaseAnalyzer from './CaseAnalyzer';
import LegalLiteracy from './LegalLiteracy';

const dummyNews = [
	{
		title: 'AI Data Privacy Breach (+267%)',
		description: 'Major increase in cases related to unauthorized use of personal data by AI systems.',
	},
	{
		title: 'Gig Worker Rights Protest (+189%)',
		description: 'Gig workers rally for better legal protection and fair wages across major cities.',
	},
	{
		title: 'Housing Crisis Escalates (+156%)',
		description: 'Legal disputes over rent and evictions reach an all-time high.',
	},
	{
		title: 'Social Media Harassment (+234%)',
		description: 'Spike in cases involving online abuse and cyberbullying.',
	},
];

const Dashboard = () => {
	const [activeTab, setActiveTab] = useState('trend');
	const [news, setNews] = useState(dummyNews);
	const [newsIndex, setNewsIndex] = useState(0);
	const [loadingNews, setLoadingNews] = useState(false);
	const [newsError, setNewsError] = useState('');

	// Comment out useEffect for now
	// useEffect(() => {
	//   const fetchNews = async () => {
	//     setLoadingNews(true);
	//     setNewsError('');
	//     try {
	//       const res = await fetch('http://localhost:9000/trending_news');
	//       if (!res.ok) throw new Error('Failed to fetch news');
	//       const data = await res.json();
	//       setNews(Array.isArray(data) ? data : []);
	//     } catch (err) {
	//       setNewsError('Could not load trending news.');
	//     } finally {
	//       setLoadingNews(false);
	//     }
	//   };
	//   fetchNews();
	// }, []);

	const handlePrev = () => {
		setNewsIndex((prev) => (prev === 0 ? news.length - 1 : prev - 1));
	};
	const handleNext = () => {
		setNewsIndex((prev) => (prev === news.length - 1 ? 0 : prev + 1));
	};

	const stats = [
		{ title: 'Digital Cases Analyzed', value: '12,847', change: '+267%', icon: Smartphone, trend: 'Cyber & AI crimes leading' },
		{ title: 'Gig Worker Cases', value: '8,234', change: '+189%', icon: Users, trend: 'Labor rights surge' },
		{ title: 'Housing Disputes', value: '15,678', change: '+156%', icon: Scale, trend: 'Rental crisis peak' },
		{ title: 'Active AI Consultations', value: '24,567', change: '+324%', icon: MessageSquare, trend: 'Multi-language support' },
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
			<div className="container mx-auto px-4 py-6">
				{/* Header */}
				<div className="mb-8">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-4xl font-bold text-white mb-2">LegalTech Analytics 2024</h1>
							<p className="text-blue-200">Advanced Legal Intelligence for Modern Society Challenges</p>
						</div>
						<Badge className="bg-green-500/20 text-green-300 border-green-500/30 animate-pulse">🟢 Live Data</Badge>
					</div>
				</div>

				{/* Trending Legal Issues Card with News */}
				<Card className="mb-8 bg-blue-600/10 backdrop-blur-sm border-blue-300/30">
					<CardHeader>
						<div className="flex items-center space-x-2">
							<Shield className="h-5 w-5 text-blue-400" />
							<CardTitle className="text-white">Trending Legal Issues</CardTitle>
						</div>
						<CardDescription className="text-blue-200">
							{loadingNews ? (
								<span>Loading latest news...</span>
							) : newsError ? (
								<span className="text-red-300">{newsError}</span>
							) : news.length > 0 ? (
								<div className="flex items-center justify-between">
									<span className="flex-1">
										{news[newsIndex]?.title || 'No title'}
										<br />
										<span className="text-xs text-blue-300">{news[newsIndex]?.description || ''}</span>
									</span>
									<div className="flex items-center ml-4 gap-2">
										<Button
											size="sm"
											variant="ghost"
											className="text-blue-300"
											onClick={handlePrev}
											aria-label="Previous News"
										>
											&#8592;
										</Button>
										<Button
											size="sm"
											variant="ghost"
											className="text-blue-300"
											onClick={handleNext}
											aria-label="Next News"
										>
											&#8594;
										</Button>
									</div>
								</div>
							) : (
								<span>No trending news available.</span>
							)}
						</CardDescription>
					</CardHeader>
				</Card>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{stats.map((stat, index) => (
						<Card
							key={index}
							className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300"
						>
							<CardContent className="p-6">
								<div className="flex items-center justify-between mb-3">
									<div>
										<p className="text-blue-200 text-sm font-medium">{stat.title}</p>
										<p className="text-3xl font-bold text-white">{stat.value}</p>
										<Badge
											variant="secondary"
											className="bg-green-500/20 text-green-300 border-green-500/30"
										>
											{stat.change}
										</Badge>
									</div>
									<stat.icon className="h-8 w-8 text-blue-300" />
								</div>
								<p className="text-blue-300 text-xs">{stat.trend}</p>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Main Content Tabs */}
				<Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
					<TabsList className="grid w-full grid-cols-6 bg-white/10 backdrop-blur-sm border-white/20">
						<TabsTrigger
							value="trend"
							className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
						>
							<TrendingUp className="w-4 h-4 mr-2" />
							<span className="hidden sm:inline">Trend</span>
						</TabsTrigger>
						<TabsTrigger
							value="categories"
							className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
						>
							<BookOpen className="w-4 h-4 mr-2" />
							<span className="hidden sm:inline">Categories</span>
						</TabsTrigger>
						<TabsTrigger
							value="chatbot"
							className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
						>
							<MessageSquare className="w-4 h-4 mr-2" />
							<span className="hidden sm:inline">AI Saathi</span>
						</TabsTrigger>
						<TabsTrigger
							value="analyzer"
							className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
						>
							<Brain className="w-4 h-4 mr-2" />
							<span className="hidden sm:inline">Analyzer</span>
						</TabsTrigger>
						<TabsTrigger
							value="literacy"
							className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
						>
							<Scale className="w-4 h-4 mr-2" />
							<span className="hidden sm:inline">Guide</span>
						</TabsTrigger>
						<TabsTrigger
							value="search"
							className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
						>
							<Search className="w-4 h-4 mr-2" />
							<span className="hidden sm:inline">Search</span>
						</TabsTrigger>
					</TabsList>

					<TabsContent value="trend" className="space-y-4">
						<TrendAnalysis />
					</TabsContent>

					<TabsContent value="categories" className="space-y-4">
						<CaseCategories />
					</TabsContent>

					<TabsContent value="chatbot" className="space-y-4">
						<LegalChatbot />
					</TabsContent>

					<TabsContent value="analyzer" className="space-y-4">
						<CaseAnalyzer />
					</TabsContent>

					<TabsContent value="literacy" className="space-y-4">
						<LegalLiteracy />
					</TabsContent>

					<TabsContent value="search" className="space-y-4">
						<Card className="bg-white/10 backdrop-blur-sm border-white/20">
							<CardHeader>
								<CardTitle className="text-white">Advanced Legal Search 2024</CardTitle>
								<CardDescription className="text-blue-200">
									Search through contemporary legal cases and modern legal issues
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="flex space-x-2">
										<input
											type="text"
											placeholder="Search for gig work rights, cyber harassment, housing disputes..."
											className="flex-1 p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-blue-200"
										/>
										<Button className="bg-blue-600 hover:bg-blue-700">
											<Search className="h-4 w-4" />
										</Button>
									</div>
									<div className="flex flex-wrap gap-2">
										<Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
											Trending: Gig Worker Rights
										</Badge>
										<Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
											Urgent: Cyber Harassment
										</Badge>
										<Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
											Popular: Housing Disputes
										</Badge>
										<Badge className="bg-green-500/20 text-green-300 border-green-500/30">
											New: AI Privacy Laws
										</Badge>
									</div>
									<p className="text-blue-200 text-sm">
										🔥 Advanced AI-powered search with real-time case updates and multilingual support will be
										implemented here.
									</p>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default Dashboard;
