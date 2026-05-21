import { useState } from 'react';
import {
  Shield, Gamepad2, CheckCircle2, XCircle, Clock, Search, Filter,
  Trash2, Eye, Star, X, ArrowRight, CalendarDays, Globe, Users,
  Tag, DollarSign, Layers, BookOpen, Lock, Zap, Save, Monitor, ChevronDown
} from 'lucide-react';
import { games } from '@/data/games';

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface FullGame {
  id: string | number;
  title: string;
  image: string;
  category: string;
  rating: number;
  developer: string;
  domaine?: string;
  publicType?: string;
  age?: string;
  plateforme?: string;
  cost?: string;
  keywords?: string;
  motivation?: string;
  gameMode?: string;
  gamePlay?: string;
  date?: string;
  knowledgeValidation?: string;
  rights?: string;
  language?: string;
  submittedDate?: string;
  [key: string]: any;
}

// ─── FAKE EXTRAS FOR PENDING ──────────────────────────────────────────────────

const fakeExtras: Record<string, Partial<FullGame>> = {
  p1: {
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800',
    rating: 4.2, developer: 'VR Labs Inc.',
    domaine: 'Science', publicType: 'Students', age: '16+',
    plateforme: 'VR / PC', cost: 'Free', keywords: 'chemistry, lab, reactions',
    motivation: 'Curiosity & discovery', gameMode: 'Singleplayer',
    gamePlay: 'Simulation', date: '2024-01-15',
    knowledgeValidation: 'Quiz & score', rights: 'CC BY-NC', language: 'English'
  },
  p2: {
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800',
    rating: 3.8, developer: 'Math Wizards',
    domaine: 'Mathematics', publicType: 'School', age: '12+',
    plateforme: 'Web', cost: '9,99 €', keywords: 'geometry, shapes, angles',
    motivation: 'Challenge & competition', gameMode: 'Multiplayer',
    gamePlay: 'Puzzle', date: '2024-01-14',
    knowledgeValidation: 'Level progression', rights: 'Proprietary', language: 'French'
  },
  p3: {
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=800',
    rating: 4.5, developer: 'History Tech',
    domaine: 'History', publicType: 'All audiences', age: '14+',
    plateforme: 'Android / iOS', cost: 'Free', keywords: 'world history, civilizations',
    motivation: 'Storytelling & immersion', gameMode: 'Singleplayer',
    gamePlay: 'Narrative', date: '2024-01-13',
    knowledgeValidation: 'Scenario choices', rights: 'CC BY', language: 'English / French'
  }
};

const pendingGames: FullGame[] = [
  { id: 'p1', title: 'Chemistry Lab VR',      category: 'Science',     submittedDate: '2024-01-15', ...fakeExtras.p1 } as FullGame,
  { id: 'p2', title: 'Geometry Master',        category: 'Mathematics', submittedDate: '2024-01-14', ...fakeExtras.p2 } as FullGame,
  { id: 'p3', title: 'World History Explorer', category: 'History',     submittedDate: '2024-01-13', ...fakeExtras.p3 } as FullGame,
];

// Enrich catalogue games with fake fields
const enrichedGames: FullGame[] = (games as FullGame[]).map((g, i) => ({
  ...g,
  domaine:             g.domaine             ?? g.category ?? 'General',
  publicType:          g.publicType          ?? ['Students', 'School', 'All audiences', 'Professionals'][i % 4],
  age:                 g.age                 ?? ['8+', '12+', '16+', '18+'][i % 4],
  plateforme:          g.plateforme          ?? ['Web', 'PC', 'Android / iOS', 'VR / PC'][i % 4],
  cost:                g.cost                ?? (i % 3 === 0 ? 'Free' : `${(i + 1) * 3 + 6},99 €`),
  keywords:            g.keywords            ?? 'education, learning, serious game',
  motivation:          g.motivation          ?? ['Challenge', 'Discovery', 'Storytelling', 'Competition'][i % 4],
  gameMode:            g.gameMode            ?? ['Singleplayer', 'Multiplayer', 'Co-op'][i % 3],
  gamePlay:            g.gamePlay            ?? ['Simulation', 'Puzzle', 'Narrative', 'Strategy'][i % 4],
  date:                g.date                ?? `2024-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, '0')}`,
  knowledgeValidation: g.knowledgeValidation ?? ['Quiz', 'Score', 'Level progression', 'Scenario choices'][i % 4],
  rights:              g.rights              ?? ['CC BY', 'CC BY-NC', 'Proprietary', 'Open Source'][i % 4],
  language:            g.language            ?? ['English', 'French', 'English / French', 'Spanish'][i % 4],
}));

// ─── FIELD CONFIG ─────────────────────────────────────────────────────────────

const FIELDS: {
  key: keyof FullGame; label: string; icon: any; color: string;
  type?: 'select'; options?: string[];
}[] = [
  { key: 'domaine',            label: 'Domain',               icon: Layers,       color: 'text-blue-600'    },
  { key: 'publicType',         label: 'Target Audience',      icon: Users,        color: 'text-orange-500'  },
  { key: 'age',                label: 'Age Group',            icon: Tag,          color: 'text-emerald-600' },
  { key: 'plateforme',         label: 'Platform',             icon: Monitor,      color: 'text-purple-500'  },
  { key: 'cost',               label: 'Cost',                 icon: DollarSign,   color: 'text-yellow-600'  },
  { key: 'keywords',           label: 'Keywords',             icon: Search,       color: 'text-blue-400'    },
  { key: 'motivation',         label: 'Motivation',           icon: Zap,          color: 'text-orange-400'  },
  { key: 'gameMode',           label: 'Game Mode',            icon: Gamepad2,     color: 'text-blue-500',
    type: 'select', options: ['Singleplayer', 'Multiplayer', 'Co-op'] },
  { key: 'gamePlay',           label: 'Gameplay',             icon: Zap,          color: 'text-red-400'     },
  { key: 'date',               label: 'Release Date',         icon: CalendarDays, color: 'text-gray-500'    },
  { key: 'knowledgeValidation',label: 'Knowledge Validation', icon: BookOpen,     color: 'text-emerald-500' },
  { key: 'rights',             label: 'Rights',               icon: Lock,         color: 'text-gray-600'    },
  { key: 'language',           label: 'Language',             icon: Globe,        color: 'text-blue-500'    },
];

// ─── DETAIL / EDIT MODAL ──────────────────────────────────────────────────────

function GameDetailModal({
  game, onClose, isAdmin = false
}: { game: FullGame; onClose: () => void; isAdmin?: boolean }) {
  const [form, setForm] = useState<FullGame>({ ...game });
  const [saved, setSaved] = useState(false);

  const handleChange = (key: keyof FullGame, val: string) => {
    setForm(prev => ({ ...prev, [key]: val }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => onClose(), 700);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        style={{ animation: 'bFadeIn 0.25s ease forwards' }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="bg-white w-full max-w-2xl max-h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl relative z-10 border border-gray-100 flex flex-col"
        style={{ animation: 'mEntry 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards' }}
      >
        {/* Hero image */}
        <div className="relative h-52 flex-shrink-0 bg-gray-900 overflow-hidden">
          <img
            src={form.image}
            alt={form.title}
            className="w-full h-full object-cover"
            style={{ animation: 'iZoom 0.5s ease-out forwards' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white rounded-full p-2 transition-all hover:scale-110 active:scale-95"
          >
            <X size={17} />
          </button>
          {/* Rating badge */}
          <div className="absolute top-4 left-6 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className="text-yellow-400" fill={i < Math.round(form.rating ?? 0) ? 'currentColor' : 'none'} />
            ))}
            <span className="text-white text-[10px] font-black ml-1">{form.rating}</span>
          </div>
          {/* Admin badge */}
          {isAdmin && (
            <div className="absolute top-4 right-14 bg-orange-500/90 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
              Edit Mode
            </div>
          )}
          <div className="absolute bottom-5 left-6">
            <span className="text-blue-300 text-[10px] font-black uppercase tracking-widest mb-1 block">
              {form.domaine ?? form.category}
            </span>
            <h2 className="text-white text-2xl font-black tracking-tight leading-tight">{form.title}</h2>
            <p className="text-white/60 text-xs font-bold mt-0.5">{form.developer}</p>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 p-7">
          {isAdmin ? (
            // ── EDIT MODE ──
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-5">
                Edit fields — changes apply on Save
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FIELDS.map(({ key, label, icon: Icon, color, type, options }) => (
                  <div key={key as string} className="group">
                    <label className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 group-focus-within:text-gray-700 transition-colors">
                      <Icon size={11} className={color} />{label}
                    </label>
                    {type === 'select' ? (
                      <div className="relative">
                        <select
                          value={(form[key] as string) ?? ''}
                          onChange={e => handleChange(key, e.target.value)}
                          className="w-full h-9 pl-3 pr-8 bg-[#F8F9FA] border-none rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none transition-all"
                        >
                          {options!.map(o => <option key={o}>{o}</option>)}
                        </select>
                        <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    ) : (
                      <input
                        type={key === 'date' ? 'date' : 'text'}
                        value={(form[key] as string) ?? ''}
                        onChange={e => handleChange(key, e.target.value)}
                        className="w-full h-9 px-3 bg-[#F8F9FA] border-none rounded-xl text-xs font-bold text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // ── READ MODE ──
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              {FIELDS.map(({ key, label, icon: Icon, color }) => (
                <div key={key as string}>
                  <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">
                    <Icon size={10} className={color} />{label}
                  </p>
                  <p className="text-xs font-black text-gray-800 truncate">
                    {(form[key] as string) ?? '—'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-7 py-5 border-t border-gray-100 flex-shrink-0 flex-wrap">
          {isAdmin && (
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 h-12 px-6 rounded-full font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg
                ${saved ? 'bg-emerald-500 text-white shadow-emerald-100' : 'bg-[#007BFF] text-white shadow-blue-100 hover:bg-blue-600'}`}
            >
              <Save size={14} />
              {saved ? 'Saved ✓' : 'Save Changes'}
            </button>
          )}
          <a
            href="https://www.logicieleducatif.fr/jeu/la-peche-aux-mots"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 flex-1 h-12 bg-gray-900 hover:bg-black text-white rounded-full font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 justify-center min-w-[140px]"
          >
            Go to Game Page <ArrowRight size={14} />
          </a>
          <button
            onClick={onClose}
            className="h-12 px-6 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full font-black text-xs uppercase tracking-widest transition-all active:scale-95"
          >
            Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes mEntry  { from{opacity:0;transform:scale(.92) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes iZoom   { from{transform:scale(1.07)} to{transform:scale(1)} }
      `}</style>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export function Admin() {
  const [activeTab, setActiveTab]       = useState<'games' | 'reviews'>('reviews');
  const [searchQuery, setSearchQuery]   = useState('');
  const [selectedGame, setSelectedGame] = useState<FullGame | null>(null);
  const [isAdminModal, setIsAdminModal] = useState(false);

  const openModal = (game: FullGame, admin: boolean) => {
    setSelectedGame(game);
    setIsAdminModal(admin);
  };

  const filteredGames = enrichedGames.filter((g) =>
    [g.title, g.category, g.developer].some(v =>
      v?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-[#FCFCFC]">

      {/* ── HEADER ── */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-[#007BFF] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black text-gray-900 tracking-tight uppercase">Admin Space</h1>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-gray-900 uppercase tracking-tight">Admin User</p>
                <p className="text-[10px] font-bold text-gray-400">admin@seriousgame.com</p>
              </div>
              <div className="w-10 h-10 bg-[#F8F9FA] hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-full flex items-center justify-center transition-all shadow-sm hover:shadow-md">
                <span className="text-sm font-black">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">

        {/* ── TABS ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { id: 'reviews', label: 'Pending Reviews', icon: Clock },
            { id: 'games',   label: 'Games',           icon: Gamepad2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'games' | 'reviews')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider border transition-all duration-300
                  ${isActive
                    ? 'bg-[#007BFF] text-white border-transparent shadow-lg shadow-blue-100 scale-105'
                    : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200 hover:text-gray-800 hover:shadow-sm'
                  }`}
                style={{ transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)' }}
              >
                <Icon size={13} />{tab.label}
              </button>
            );
          })}
        </div>

        {/* ════════════════ GAMES TAB ════════════════ */}
        {activeTab === 'games' && (
          <div className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                  <input
                    type="text"
                    placeholder="Search games, categories, developers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-[#F8F9FA] border-none rounded-xl text-xs font-bold text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  />
                </div>
                <button className="flex items-center gap-2 px-5 py-3 bg-[#F8F9FA] rounded-xl text-xs font-black text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all uppercase tracking-wider">
                  <Filter size={13} /> Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8F9FA]">
                  <tr>
                    {['Game', 'Category', 'Rating', 'Developer', 'Actions'].map((h, i) => (
                      <th key={h} className={`px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 ${i === 4 ? 'text-right' : 'text-left'}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredGames.map((game) => (
                    <tr key={game.id} className="hover:bg-[#F8F9FA] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                            <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          <span className="text-xs font-black text-gray-900 uppercase tracking-tight">{game.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-black text-blue-600 uppercase">{game.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <Star size={12} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-xs font-black text-gray-800">{game.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-gray-500">{game.developer}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {/* Details + Edit (isAdmin = true → edit mode) */}
                          <button
                            onClick={() => openModal(game, true)}
                            className="flex items-center gap-1.5 h-8 px-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
                          >
                            <Eye size={12} /> Details
                          </button>
                          {/* Go to Game Page */}
                          <a
                            href="https://www.logicieleducatif.fr/jeu/la-peche-aux-mots"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 h-8 px-3 bg-[#007BFF] hover:bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-sm shadow-blue-100"
                          >
                            <ArrowRight size={12} /> Game Page
                          </a>
                          {/* Delete */}
                          <button className="w-8 h-8 hover:bg-red-50 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 transition-all hover:scale-110 active:scale-90">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredGames.length === 0 && (
                <div className="py-20 text-center">
                  <Gamepad2 className="mx-auto text-gray-200 mb-4" size={40} />
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400">No games found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════════════════ REVIEWS TAB ════════════════ */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {pendingGames.map((game, index) => (
              <div
                key={game.id}
                className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                style={{ animation: 'slideUp 0.35s ease forwards', animationDelay: `${index * 60}ms`, opacity: 0 }}
              >
                <div className="flex flex-col md:flex-row gap-5 md:items-center">

                  {/* Thumbnail */}
                  <div className="w-full md:w-28 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                    <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-1">{game.title}</h3>
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="flex items-center gap-1 text-[10px] font-black text-blue-600 uppercase">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />{game.category}
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="text-[10px] font-bold text-gray-500">{game.developer}</span>
                      <span className="text-gray-300">·</span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                        <Star size={9} className="text-yellow-400 fill-yellow-400" />{game.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CalendarDays size={10} className="text-gray-400" />
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Submitted on {game.submittedDate}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
                    {/* Details (read-only) */}
                    <button
                      onClick={() => openModal(game, false)}
                      className="flex items-center gap-1.5 h-9 px-4 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
                    >
                      <Eye size={12} /> Details
                    </button>
                    {/* Go to Game Page */}
                    <a
                      href="https://www.logicieleducatif.fr/jeu/la-peche-aux-mots"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 h-9 px-4 bg-[#007BFF] hover:bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-sm shadow-blue-100"
                    >
                      <ArrowRight size={12} /> Game Page
                    </a>
                    {/* Approve */}
                    <button className="flex items-center gap-1.5 h-9 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all hover:scale-105 active:scale-95">
                      <CheckCircle2 size={12} /> Approve
                    </button>
                    {/* Reject */}
                    <button className="flex items-center gap-1.5 h-9 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all hover:scale-105 active:scale-95">
                      <XCircle size={12} /> Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── MODAL ── */}
      {selectedGame && (
        <GameDetailModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          isAdmin={isAdminModal}
        />
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  );
}