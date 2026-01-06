import type { NewsArticle } from '../types';
import { getRelativeTime } from '../utils/date';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block card hover:border-primary-300 border border-transparent transition-all"
    >
      <div className="flex gap-4">
        {/* Image */}
        {article.urlToImage && (
          <div className="w-24 h-24 flex-shrink-0">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover rounded"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 line-clamp-2 mb-1">
            {article.title}
          </h4>

          {article.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {article.description}
            </p>
          )}

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{article.source.name}</span>
            <span>•</span>
            <span>{getRelativeTime(article.publishedAt)}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
