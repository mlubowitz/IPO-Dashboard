import { useState } from 'react';
import { useMarketNews } from '../hooks/useNews';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function News() {
  const [limit, setLimit] = useState(20);
  const { data: news, isLoading } = useMarketNews(undefined, limit);

  const loadMore = () => {
    setLimit((prev) => prev + 20);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Market News</h1>
        <p className="text-gray-600">
          Latest news and updates about IPOs and the stock market
        </p>
      </div>

      {/* News List */}
      {isLoading && limit === 20 ? (
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

          {/* Load More Button */}
          <div className="mt-8 text-center">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No news available at the moment</p>
        </div>
      )}
    </div>
  );
}
