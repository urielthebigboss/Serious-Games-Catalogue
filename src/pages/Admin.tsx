import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Gamepad2, CheckCircle2, XCircle, Clock, Search, Filter, Edit, Trash2, Eye, Star } from 'lucide-react';
import { games } from '@/data/games';

const pendingGames = [
  { id: 'p1', title: 'Chemistry Lab VR', category: 'Science', developer: 'VR Labs Inc.', submittedDate: '2024-01-15' },
  { id: 'p2', title: 'Geometry Master', category: 'Mathematics', developer: 'Math Wizards', submittedDate: '2024-01-14' },
  { id: 'p3', title: 'World History Explorer', category: 'History', developer: 'History Tech', submittedDate: '2024-01-13' }
];

export function Admin() {
  const [activeTab, setActiveTab] = useState<'games' | 'reviews'>('reviews');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-purple-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Space</h1>
                
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="font-medium text-gray-900">Admin User</p>
                <p className="text-sm text-gray-500">admin@seriousgame.com</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[{ id: 'reviews', label: 'Pending Reviews', icon: Clock },
           
            { id: 'games', label: 'Games', icon: Gamepad2 },
           
            
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'games' | 'reviews')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id ? 'bg-[#3B82F6] text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Games Tab */}
        {activeTab === 'games' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" placeholder="Search games..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg" />
                </div>
                <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg text-gray-600 hover:border-[#3B82F6] hover:text-[#3B82F6]">
                  <Filter className="w-5 h-5" /> Filter
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Game</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Category</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Rating</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Developer</th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {games.map((game) => (
                    <tr key={game.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={game.image} alt={game.title} className="w-10 h-10 rounded-lg object-cover" />
                          <span className="font-medium text-gray-900">{game.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{game.category}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-gray-900">{game.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{game.developer}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/game/${game.id}`}><button className="w-8 h-8 hover:bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#3B82F6]"><Eye className="w-4 h-4" /></button></Link>
                          <button className="w-8 h-8 hover:bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:text-emerald-600"><Edit className="w-4 h-4" /></button>
                          <button className="w-8 h-8 hover:bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

       

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {pendingGames.map((game) => (
              <div key={game.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{game.title}</h3>
                    <p className="text-gray-500">{game.developer} • {game.category}</p>
                    <p className="text-sm text-gray-400 mt-1">Submitted on {game.submittedDate}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200"><CheckCircle2 className="w-4 h-4" /> Approve</button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"><XCircle className="w-4 h-4" /> Reject</button>
                    <button className="w-10 h-10 hover:bg-gray-100 rounded-lg flex items-center justify-center text-gray-400"><Eye className="w-5 h-5" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
