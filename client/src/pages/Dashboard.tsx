import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIPOs } from '../hooks/useIPOs';
import { useMarketNews } from '../hooks/useNews';
import IPOCard from '../components/IPOCard';
import IPOCardSkeleton from '../components/IPOCardSkeleton';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: ipos, isLoading: iposLoading } = useIPOs();
  const { data: news, isLoading: newsLoading } = useMarketNews(undefined, 10);

  // Filter and sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'price'>('date');

  // Filtered and sorted IPOs
  const filteredIPOs = useMemo(() => {
    if (!ipos) return [];

    let filtered = ipos.filter((ipo) =>
      ipo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ipo.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.ipoDate).getTime() - new Date(b.ipoDate).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          const aPrice = a.priceRangeHigh || 0;
          const bPrice = b.priceRangeHigh || 0;
          return bPrice - aPrice;
        default:
          return 0;
      }
    });

    return filtered;
  }, [ipos, searchQuery, sortBy]);

  return (
    <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">IPO Tracker</h1>
        <p className="text-gray-600">
          Track historical and upcoming initial public offerings in the US market
        </p>
      </div>

      {/* Split Layout Container */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - IPO Cards */}
        <div className="flex-1 lg:w-2/3">
          {/* Filters and Search */}
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by company name or symbol..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input w-full pl-10"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Sort Options */}
            <div className="flex flex-wrap gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="input"
                >
                  <option value="date">IPO Date</option>
                  <option value="name">Company Name</option>
                  <option value="price">Price Range</option>
                </select>
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-600">
                {iposLoading ? (
                  'Loading IPOs...'
                ) : (
                  `Showing ${filteredIPOs.length} IPOs`
                )}
              </div>
            </div>
          </div>

          {/* IPO Cards - Vertical Stack */}
          <div className="space-y-4">
            {iposLoading ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, i) => <IPOCardSkeleton key={i} />)
            ) : filteredIPOs.length > 0 ? (
              filteredIPOs.map((ipo) => <IPOCard key={ipo.symbol} ipo={ipo} />)
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No IPOs found matching your criteria</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - News Section */}
        <div className="lg:w-1/3">
          <div className="lg:sticky lg:top-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Market News</h2>
            </div>

            {newsLoading ? (
              <div className="py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : news && news.length > 0 ? (
              <>
                <div className="space-y-4">
                  {news.map((article, index) => (
                    <NewsCard key={index} article={article} />
                  ))}
                </div>

                {/* Show More Button */}
                <button
                  onClick={() => navigate('/news')}
                  className="w-full mt-6 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Show More News
                </button>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No news available at the moment</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
