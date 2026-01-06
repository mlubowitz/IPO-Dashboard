import { useParams, useNavigate } from 'react-router-dom';
import { useCompanyDetails, useCompanyNews } from '../hooks/useIPOs';
import { useAuthStore } from '../store/authStore';
import { useFavoritesStore } from '../store/favoritesStore';
import { useFavorites } from '../hooks/useFavorites';
import LoadingSpinner from '../components/LoadingSpinner';
import NewsCard from '../components/NewsCard';
import { formatNumber } from '../utils/format';
import toast from 'react-hot-toast';

export default function CompanyDetail() {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { isFavorite } = useFavoritesStore();
  const { addFavorite, removeFavorite } = useFavorites();

  const { data: company, isLoading: companyLoading } = useCompanyDetails(symbol || '');
  const { data: news, isLoading: newsLoading } = useCompanyNews(company?.name || '');

  const isFav = symbol ? isFavorite(symbol) : false;

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add favorites');
      return;
    }

    if (!company || !symbol) return;

    if (isFav) {
      removeFavorite(symbol);
    } else {
      addFavorite({
        companySymbol: symbol,
        companyName: company.name,
        ipoDate: company.ipo || new Date().toISOString(),
      });
    }
  };

  if (companyLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Company Not Found</h2>
        <p className="text-gray-600 mb-6">
          We couldn't find information for this company.
        </p>
        <button onClick={() => navigate('/')} className="btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>

      {/* Company Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            {company.logo && (
              <img
                src={company.logo}
                alt={company.name}
                className="w-16 h-16 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
              <p className="text-lg text-gray-600">{company.symbol}</p>
              {company.finnhubIndustry && (
                <span className="inline-block mt-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                  {company.finnhubIndustry}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleFavoriteClick}
            className="p-3 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className={`w-8 h-8 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
              fill={isFav ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* Company Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {company.country && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Country</h3>
              <p className="mt-1 text-lg font-semibold">{company.country}</p>
            </div>
          )}

          {company.exchange && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Exchange</h3>
              <p className="mt-1 text-lg font-semibold">{company.exchange}</p>
            </div>
          )}

          {company.ipo && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">IPO Date</h3>
              <p className="mt-1 text-lg font-semibold">{company.ipo}</p>
            </div>
          )}

          {company.marketCapitalization && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Market Cap</h3>
              <p className="mt-1 text-lg font-semibold">
                {formatNumber(company.marketCapitalization * 1000000)}
              </p>
            </div>
          )}

          {company.shareOutstanding && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Shares Outstanding</h3>
              <p className="mt-1 text-lg font-semibold">
                {(company.shareOutstanding / 1000000).toFixed(2)}M
              </p>
            </div>
          )}

          {company.phone && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Phone</h3>
              <p className="mt-1 text-lg font-semibold">{company.phone}</p>
            </div>
          )}
        </div>

        {/* Website Link */}
        {company.weburl && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <a
              href={company.weburl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
            >
              Visit Website
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        )}
      </div>

      {/* Company News */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Company News</h2>

        {newsLoading ? (
          <div className="py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : news && news.length > 0 ? (
          <div className="space-y-4">
            {news.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500">No recent news available for this company</p>
          </div>
        )}
      </div>
    </div>
  );
}
