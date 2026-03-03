import { useState } from 'react';
import { Gamepad2, Star } from 'lucide-react';
import { games } from '@/data/games';

export function Profile() {
  const [activeTab, setActiveTab] = useState<'overview' | 'games' | 'achievements' | 'settings'>('games');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'games', label: 'My Games', icon: Gamepad2 },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-sm"
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Games Tab */}
        {activeTab === 'games' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-tight">
              My Games
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow relative"
                >
                  
                  {/* 🔹 Badge Status */}
                  <div className="absolute top-3 right-3">
                    {game.status === "completed" && (
                      <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                        ✓
                      </div>
                    )}
                    {game.status === "failed" && (
                      <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                        ✕
                      </div>
                    )}
                    {game.status === "waiting" && (
                      <div className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                        ⏳
                      </div>
                    )}
                  </div>

                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-40 object-cover opacity-90"
                  />

                  <div className="p-4">
                    <h4 className="font-black text-gray-900 mb-1 uppercase text-sm tracking-tighter">
                      {game.title}
                    </h4>

                    <p className="text-[10px] font-bold text-blue-600 uppercase mb-3">
                      {game.category}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-bold text-gray-600">
                          {game.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}