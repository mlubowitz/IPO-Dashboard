import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useFavoritesStore } from '../store/favoritesStore';
import { useFavorites } from '../hooks/useFavorites';
import type { IPO } from '../types';
import { formatDate, getDaysUntilIPO } from '../utils/date';
import { getPriceRange } from '../utils/format';
import toast from 'react-hot-toast';

interface IPOCardProps {
  ipo: IPO;
}

export default function IPOCard({ ipo }: IPOCardProps) {
  const { isAuthenticated } = useAuthStore();
  const { isFavorite } = useFavoritesStore();
  const { addFavorite, removeFavorite, isAddingFavorite } = useFavorites();
  const isFav = isFavorite(ipo.symbol);
  const daysUntil = getDaysUntilIPO(ipo.ipoDate);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error('Please sign in to add favorites');
      return;
    }

    if (isFav) {
      removeFavorite(ipo.symbol);
    } else {
      addFavorite({
        companySymbol: ipo.symbol,
        companyName: ipo.name,
        ipoDate: ipo.ipoDate,
      });
    }
  };

  return (
    <Link to={`/company/${ipo.symbol}`} className="block">
      <div className="card group">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {ipo.name}
            </h3>
            <p className="text-sm text-gray-500">{ipo.symbol}</p>
          </div>

          <button
            onClick={handleFavoriteClick}
            disabled={isAddingFavorite}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg
              className={`w-6 h-6 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
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

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">IPO Date:</span>
            <span className="font-medium">{formatDate(ipo.ipoDate)}</span>
          </div>

          {daysUntil >= 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Days Until:</span>
              <span className="font-medium text-primary-600">
                {daysUntil === 0 ? 'Today' : `${daysUntil} days`}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-gray-600">Price Range:</span>
            <span className="font-medium">
              {getPriceRange(ipo.priceRangeLow, ipo.priceRangeHigh, ipo.currency)}
            </span>
          </div>

          {ipo.exchange && (
            <div className="flex justify-between">
              <span className="text-gray-600">Exchange:</span>
              <span className="font-medium">{ipo.exchange}</span>
            </div>
          )}
        </div>

        {/* Status Badge */}
        {ipo.status && (
          <div className="mt-3">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded">
              {ipo.status}
            </span>
          </div>
        )}

        {/* View Details Button */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full btn-primary text-sm">View Details</button>
        </div>
      </div>
    </Link>
  );
}
