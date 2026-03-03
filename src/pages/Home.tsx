import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, Gamepad2, RotateCcw, ChevronDown, ChevronUp, 
  Monitor, Smartphone, Globe, Star 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// --- DÉFINITION DES TYPES (Interfaces) ---

interface GameProps {
  id: number;
  title: string;
  price: string;
  domaine: string;
  age: string;
  publicType: string;
  imageUrl: string;
}

interface FilterSectionProps {
  label: string;
  color: string;
  children: React.ReactNode;
}

interface PlatformBtnProps {
  icon: React.ElementType;
  label: string;
}

// --- COMPOSANTS TYPÉS ---

function GameCard({ id, title, price, domaine, age, publicType, imageUrl }: GameProps) {
  return (
    <Link to={`/game/${id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 h-full">
        <div className="relative h-52 bg-gray-900 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-black uppercase">
            {price || ''}
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="font-bold text-lg leading-tight tracking-tight drop-shadow-lg">{title}</h3>
            <div className="flex items-center gap-1 text-yellow-400 mt-1">
              {[...Array(4)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
              <Star size={12} />
              <span className="text-white text-xs ml-1 opacity-90 font-bold">4.0</span>
            </div>
          </div>
        </div>

        <div className="p-4 grid grid-cols-2 gap-y-3 text-xs bg-white">
          <div>
            <p className="text-gray-400 uppercase font-black tracking-tighter text-[10px] mb-0.5">Domaine</p>
            <p className="font-bold text-blue-600 uppercase truncate">{domaine}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 uppercase font-black tracking-tighter text-[10px] mb-0.5">Age</p>
            <p className="font-bold text-gray-800">{age}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-400 uppercase font-black tracking-tighter text-[10px] mb-0.5">Public</p>
            <p className="font-bold text-gray-800 uppercase truncate">{publicType}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const games = [
    { 
      id: 1, 
      title: "Linguistic Laboratory", 
      price: "12,99 €", 
      domaine: "Science", 
      age: "18 ans",
      publicType: "Étudiants",
      imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600"
    },
    { 
      id: 2, 
      title: "Bio-Tech Simulator", 
      price: "", 
      domaine: "Linguistics", 
      age: "15 ans",
      publicType: "Scolaire",
      imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=600"
    },
    { 
      id: 3, 
      title: "Space Exploration", 
      price: "12,99 €", 
      domaine: "Astronomy", 
      age: "18 ans",
      publicType: "Tous publics",
      imageUrl: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=600"
    },
    { 
      id: 4, 
      title: "History Chronicles", 
      price: "12,99 €", 
      domaine: "History", 
      age: "12 ans",
      publicType: "Enfants",
      imageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=600"
    },
  ];

  return (
    <div className="min-h-screen bg-[#FCFCFC]">
      <section className="py-16 px-4 text-center relative overflow-hidden">
        <Gamepad2 className="absolute top-10 left-10 text-gray-100 w-12 h-12 rotate-12" />
        <Gamepad2 className="absolute bottom-10 right-10 text-gray-100 w-16 h-16 -rotate-12" />
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
          Total Immersion <br /> Education
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
          The leading hub for serious games.
        </p>
      </section>

      <main className="max-w-[1600px] mx-auto px-6 lg:px-12 pb-20">
        <div className="flex gap-12">
          {sidebarOpen && (
            <aside className="w-72 flex-shrink-0">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black uppercase flex items-center gap-2">Filter <Filter size={18} /></h2>
                <Button variant="ghost" size="sm" className="bg-[#1E90FF] text-white hover:bg-blue-600 rounded-lg h-8 px-3 text-xs font-bold">
                  <RotateCcw size={14} className="mr-1" /> Reset
                </Button>
              </div>

              <div className="space-y-8">
                {/* FILTRES STANDARDS */}
                <FilterSection label="Domaine" color="bg-blue-500">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={14} />
                    <Input placeholder="Search" className="pl-9 text-xs border-gray-100 bg-white" />
                  </div>
                </FilterSection>

                <FilterSection label="Keywords" color="bg-red-500">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400" size={14} />
                    <Input placeholder="Keywords separated by commas" className="pl-9 text-xs border-red-100 bg-white placeholder:text-red-300" />
                  </div>
                </FilterSection>

                <FilterSection label="Target Audience" color="bg-orange-500">
                  <div className="relative">
                    <select className="w-full h-10 px-3 text-xs border border-gray-100 bg-white rounded-md appearance-none text-orange-600 font-bold">
                      <option>Tous</option>
                      <option>Scolaire</option>
                      <option>Étudiants</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-400" size={14} />
                  </div>
                </FilterSection>

                <FilterSection label="Age Group" color="bg-blue-400">
                  <div className="px-1 pt-2">
                    <div className="h-1.5 w-full bg-blue-100 rounded-full relative">
                      <div className="absolute left-0 right-0 h-full bg-blue-500 rounded-full"></div>
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-pointer hover:scale-125 transition-transform"></div>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-pointer hover:scale-125 transition-transform"></div>
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] font-black text-blue-500">
                      <span>0</span><span>45</span>
                    </div>
                  </div>
                </FilterSection>

                <FilterSection label="Platforme" color="bg-orange-500">
                  <div className="grid grid-cols-3 gap-2">
                    <PlatformBtn icon={Monitor} label="Windows" />
                    <PlatformBtn icon={Smartphone} label="Android" />
                    <PlatformBtn icon={Globe} label="Web" />
                  </div>
                </FilterSection>

                {/* FILTRES AVANCÉS RÉTRACTABLES */}
                <div className="pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => setAdvancedOpen(!advancedOpen)} 
                    className="flex items-center justify-between w-full font-black uppercase text-sm mb-6 hover:text-blue-600 transition-colors"
                  >
                    Advanced Filter {advancedOpen ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                  </button>

                  {advancedOpen && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
                      <FilterSection label="Motivation" color="bg-blue-500">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={14} />
                          <Input placeholder="Search" className="pl-9 text-xs border-gray-100 bg-white" />
                        </div>
                      </FilterSection>

                      <FilterSection label="Knowledge Validation" color="bg-red-500">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400" size={14} />
                          <Input placeholder="Keywords" className="pl-9 text-xs border-red-100 bg-white" />
                        </div>
                      </FilterSection>

                      <FilterSection label="Game Mode" color="bg-orange-400">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400" size={14} />
                          <Input placeholder="Search" className="pl-9 text-xs border-orange-100 bg-white" />
                        </div>
                      </FilterSection>

                      <FilterSection label="Rights" color="bg-blue-500">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={14} />
                          <Input placeholder="Search" className="pl-9 text-xs border-gray-100 bg-white" />
                        </div>
                      </FilterSection>

                      <FilterSection label="Gameplay" color="bg-orange-400">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400" size={14} />
                          <Input placeholder="Search" className="pl-9 text-xs border-orange-100 bg-white" />
                        </div>
                      </FilterSection>

                      <FilterSection label="Rating" color="bg-orange-500">
                        <div className="flex gap-1 text-orange-400 pt-1 cursor-pointer">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={18} strokeWidth={1.5} className="hover:fill-orange-400 transition-colors" />
                          ))}
                        </div>
                      </FilterSection>

                      <FilterSection label="Language" color="bg-blue-500">
                        <div className="relative">
                          <select className="w-full h-10 px-3 text-xs border border-gray-100 bg-white rounded-md appearance-none text-blue-600 font-bold">
                            <option>English</option>
                            <option>Français</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400" size={14} />
                        </div>
                      </FilterSection>

                      <FilterSection label="Cost" color="bg-red-600">
                        <div className="relative">
                          <Input placeholder="18,99" className="text-xs border-red-100 bg-white pr-8 text-right font-bold text-red-600" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-red-600">€</span>
                        </div>
                      </FilterSection>

                      <FilterSection label="Date" color="bg-blue-400">
                        <div className="relative">
                          <Input type="text" placeholder="11 / 12 / 2026" className="text-xs border-blue-100 bg-blue-50/30 text-blue-600 font-bold" />
                        </div>
                      </FilterSection>

                      <FilterSection label="Titre" color="bg-blue-500">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={14} />
                          <Input placeholder="Search" className="pl-9 text-xs border-gray-100 bg-white" />
                        </div>
                      </FilterSection>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          )}

          <section className="flex-1">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-black text-gray-900">Serious Game Catalogue</h2>
                <p className="text-gray-400 font-bold text-sm">Experiences available</p>
              </div>
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)} 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label={sidebarOpen ? "Fermer les filtres" : "Ouvrir les filtres"}
              >
                <Filter className={sidebarOpen ? "text-blue-500" : "text-gray-400"} size={20} />
              </button>
            </div>

            <div className={`grid gap-8 ${sidebarOpen ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
              {games.map((game) => (
                <GameCard key={game.id} {...game} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// --- SOUS-COMPOSANTS ---

function FilterSection({ label, color, children }: FilterSectionProps) {
  return (
    <div>
      <label className="flex items-center gap-2 text-[11px] font-black uppercase mb-3 tracking-wider text-gray-700">
        <span className={`w-1 h-4 ${color} rounded-full`}></span> {label}
      </label>
      {children}
    </div>
  );
}

function PlatformBtn({ icon: Icon, label }: PlatformBtnProps) {
  return (
    <button className="flex flex-col items-center justify-center p-3 border border-orange-50 rounded-xl hover:bg-orange-50 hover:border-orange-200 text-orange-600 transition-all group w-full active:scale-95">
      <Icon size={18} className="group-hover:scale-110 transition-transform" />
      <span className="text-[9px] mt-1 font-bold uppercase">{label}</span>
    </button>
  );
}