import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatDate, getDaysUntilIPO } from '../utils/date';

export default function Favorites() {
  const { favorites, isLoading, removeFavorite, isRemovingFavorite } = useFavorites();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
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
          <h2 className="mt-6 text-2xl font-bold text-gray-900">No Favorites Yet</h2>
          <p className="mt-2 text-gray-600">
            Start adding IPO companies to your favorites from the dashboard
          </p>
          <Link to="/" className="mt-6 inline-block btn-primary">
            Browse IPOs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Favorites</h1>
        <p className="text-gray-600">
          {favorites.length} {favorites.length === 1 ? 'company' : 'companies'} saved
        </p>
      </div>

      {/* Favorites List */}
      <div className="space-y-4">
        {favorites.map((favorite) => {
          const daysUntil = getDaysUntilIPO(favorite.ipoDate);
          const isPast = daysUntil < 0;

          return (
            <div
              key={favorite.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                {/* Company Info */}
                <Link
                  to={`/company/${favorite.companySymbol}`}
                  className="flex-1 flex items-center space-x-4 hover:text-primary-600 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-700 font-bold text-lg">
                        {favorite.companyName.charAt(0)}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {favorite.companyName}
                    </h3>
                    <p className="text-sm text-gray-500">{favorite.companySymbol}</p>
                  </div>
                </Link>

                {/* IPO Date Info */}
                <div className="flex items-center space-x-6 ml-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">IPO Date</p>
                    <p className="font-semibold text-gray-900">
                      {formatDate(favorite.ipoDate)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {isPast ? 'Days Since' : 'Days Until'}
                    </p>
                    <p
                      className={`font-bold text-lg ${
                        isPast ? 'text-gray-500' : 'text-primary-600'
                      }`}
                    >
                      {isPast
                        ? `${Math.abs(daysUntil)} days ago`
                        : daysUntil === 0
                        ? 'Today!'
                        : `${daysUntil} days`}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFavorite(favorite.companySymbol)}
                    disabled={isRemovingFavorite}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                    aria-label="Remove from favorites"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
