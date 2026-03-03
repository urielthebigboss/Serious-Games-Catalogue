import { Link } from 'react-router-dom';
import { Star, Users, Clock } from 'lucide-react';
import type { Game } from '@/data/games';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-emerald-100 text-emerald-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'language':
        return 'bg-blue-100 text-blue-700';
      case 'mathematics':
        return 'bg-purple-100 text-purple-700';
      case 'history':
        return 'bg-amber-100 text-amber-700';
      case 'science':
        return 'bg-emerald-100 text-emerald-700';
      case 'programming':
        return 'bg-indigo-100 text-indigo-700';
      case 'art':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Link to={`/game/${game.id}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(game.category)}`}>
              {game.category}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
              {game.difficulty}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#3B82F6] transition-colors">
            {game.title}
          </h3>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
            {game.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {game.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-medium">{game.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Users className="w-4 h-4 text-gray-400" />
              <span>{game.players}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{game.duration}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
