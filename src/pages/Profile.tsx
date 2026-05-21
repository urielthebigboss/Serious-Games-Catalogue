import { useState } from 'react';
import { Gamepad2, Star, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // 1. IMPORT AJOUTÉ ICI
import { games } from '@/data/games';

export function Profile() {
  const [activeTab, setActiveTab] = useState<'overview' | 'games' | 'achievements' | 'settings'>('games');
  
  // 2. INITIALISATION DU HOOK ICI
  const navigate = useNavigate(); 

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation / Bouton de retour */}
        <div className="flex justify-between items-center mb-8">
          {/* 3. REMPLACEMENT DU <Link> PAR UN <button> */}
          <button 
            type="button"
            onClick={() => navigate(-1)} 
            className="group flex items-center gap-3 text-gray-400 hover:text-blue-600 transition-all bg-transparent border-none p-0 cursor-pointer"
          >
            <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
              <ArrowLeft size={24} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">Retour</span>
          </button>
        </div>

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
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Games Tab */}
        {activeTab === 'games' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-tight flex items-center gap-2">
              <Gamepad2 className="text-blue-500" size={20} /> My Games
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 relative group"
                >
                  
                  {/* Badge Status */}
                  <div className="absolute top-3 right-3 z-10">
                    {game.status === "completed" && (
                      <div className="bg-green-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                        <span>Completed</span>
                      </div>
                    )}
                    {game.status === "failed" && (
                      <div className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                        <span>Failed</span>
                      </div>
                    )}
                    {game.status === "waiting" && (
                      <div className="bg-yellow-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                        <span>Waiting</span>
                      </div>
                    )}
                  </div>

                  <div className="relative overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-40 object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-5 bg-white">
                    <h4 className="font-black text-gray-900 mb-1 uppercase text-sm tracking-tighter truncate group-hover:text-blue-600 transition-colors">
                      {game.title}
                    </h4>

                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 truncate">
                      {game.category}
                    </p>

                    <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-2">
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-[10px] font-black text-yellow-700 mt-0.5">
                          {game.rating}
                        </span>
                      </div>
                      
                      <Link to={`/game/${game.id}`} className="text-[10px] font-black text-blue-500 p-0 h-auto hover:text-blue-700 uppercase tracking-widest">
                        View Details
                      </Link>
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