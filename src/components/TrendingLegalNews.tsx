import React, { useEffect, useState, useRef } from "react";

interface NewsItem {
  url: string;
  title: string;
  content: string;
}


const TrendingLegalNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch("/trending-legal-news")
      .then((res) => res.json())
      .then((data) => {
        setNews(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load news.");
        setLoading(false);
      });
  }, []);


  // Auto-advance news every 5 seconds
  useEffect(() => {
    if (news.length === 0) return;
    timeoutRef.current = setTimeout(() => {
      setDirection('left');
      setAnimating(true);
    }, 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [news, current]);

  // When animating, after animation duration, change news
  useEffect(() => {
    if (!animating) return;
    const animTimeout = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % news.length);
      setAnimating(false);
    }, 500); // match CSS duration
    return () => clearTimeout(animTimeout);
  }, [animating, news.length]);

  if (loading) return <div>Loading trending legal news...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-white drop-shadow">Trending Legal News</h2>
      <div className="relative h-40 overflow-hidden" style={{ minHeight: 140 }}>
        {news.length > 0 && (
          <>
            {/* Outgoing news */}
            {animating && (
              <div
                key={`out-${current}`}
                className={`absolute w-full transition-all duration-500 ease-in-out z-10 animate-slideOutLeft`}
              >
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 border border-blue-300/30 shadow-lg">
                  <a
                    href={news[current].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 font-semibold hover:underline text-lg"
                  >
                    {news[current].title}
                  </a>
                  <p className="text-blue-100 mt-1 text-sm">
                    {news[current].content.length > 300 ? news[current].content.slice(0, 300) + "..." : news[current].content}
                  </p>
                </div>
              </div>
            )}
            {/* Incoming news */}
            <div
              key={`in-${current}`}
              className={`absolute w-full transition-all duration-500 ease-in-out z-20 ${animating ? 'translate-x-full opacity-0 animate-slideInLeft' : 'translate-x-0 opacity-100'}`}
            >
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 border border-blue-300/30 shadow-lg">
                <a
                  href={news[(current + (animating ? 1 : 0)) % news.length].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 font-semibold hover:underline text-lg"
                >
                  {news[(current + (animating ? 1 : 0)) % news.length].title}
                </a>
                <p className="text-blue-100 mt-1 text-sm">
                  {news[(current + (animating ? 1 : 0)) % news.length].content.length > 300
                    ? news[(current + (animating ? 1 : 0)) % news.length].content.slice(0, 300) + "..."
                    : news[(current + (animating ? 1 : 0)) % news.length].content}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Animation keyframes for slide */}
      <style>{`
        @keyframes slideOutLeft {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-100%); opacity: 0; }
        }
        @keyframes slideInLeft {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slideOutLeft {
          animation: slideOutLeft 0.5s forwards;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.5s forwards;
        }
      `}</style>
    </div>
  );
};

export default TrendingLegalNews;
