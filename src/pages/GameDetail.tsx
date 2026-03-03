import { useParams, Link } from 'react-router-dom';
import { Star, ArrowLeft, Gamepad2, AlertTriangle, Monitor, Smartphone,Share2, Globe,  } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { games } from '@/data/games';

export function GameDetail() {
  const { id } = useParams<{ id: string }>();
  const game = games.find((g) => g.id === id);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center animate-in fade-in zoom-in duration-300">
          <Gamepad2 className="w-20 h-20 text-gray-200 mx-auto mb-6" />
          <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Game Not Found</h1>
          <Link to="/">
            <Button variant="link" className="text-blue-600 font-bold">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Catalog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-[1250px] mx-auto px-6 py-10">
        
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center mb-10">
          <Link to="/" className="group flex items-center gap-3 text-gray-400 hover:text-black transition-all">
            <div className="p-2 rounded-full group-hover:bg-gray-100 transition-colors">
              <ArrowLeft size={24} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">Back to Catalog</span>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full text-gray-400 ">
            <Share2 size={20} />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
          
          {/* LEFT COLUMN: VISUALS & CONTENT */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* Immersive Title Card */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] bg-gray-950 group">
              <img 
                src={game.image} 
                alt={game.title} 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
              
              <div className="absolute bottom-12 left-12 right-12">
                <div className="flex items-center gap-3 mb-4 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-400 rounded-full text-black shadow-lg">
                    <Star fill="black" size={14} />
                    <span className="text-sm font-black">{game.rating || "4.6"}</span>
                  </div>
                  <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Global Score</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter uppercase leading-[0.9] animate-in slide-in-from-bottom-6 duration-700">
                  {game.title}
                </h1>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-12 pl-4">
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <SectionHeader label="Description" color="bg-blue-500" />
                <p className="text-base text-gray-500 font-medium leading-relaxed max-w-2xl ">
                  {game.fullDescription}
                </p>
              </section>

              <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <SectionHeader label="Gameplay" color="bg-orange-500" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Linguistic Analysis", "Punctuation Challenge", "Pronoun Laboratory"].map((item) => (
                    <div key={item} className="flex items-center gap-3 group">
                       <span className="w-2 h-2 rounded-full bg-orange-200 group-hover:bg-orange-500 transition-colors" />
                       <span className="text-orange-600 text-[11px] uppercase tracking-wider">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Enhanced Review Section */}
              <section className="pt-4">
                <SectionHeader label="Community Reviews" color="bg-blue-600" />
                <div className="bg-[#F8FAFF] border border-blue-50 rounded-[2.5rem] p-10 mb-8 group hover:border-blue-200 transition-colors">
                  <p className="text-blue-500  text-lg  leading-tight">
                    "What did you think of this experience?"
                  </p>
                  <p className="text-blue-300 text-xs mt-2 font-bold uppercase">Share your thoughts with the community</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["Incredible experience !", "Great learning curve", "Highly recommended"].map((comment, i) => (
                    <div key={i} className="bg-white border border-gray-100 px-6 py-4 rounded-2xl text-[11px] font-black text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-default">
                      {comment}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* RIGHT COLUMN: SIDEBAR */}
          <div className="lg:col-span-5">
            <div className="sticky top-10 space-y-10">
              
              {/* Main Actions Card */}
              <div className="bg-white p-2 rounded-[2rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] border border-gray-50">
                <Button className="w-full h-20 bg-[#5244E1] hover:bg-[#4336c9] rounded-[1.8rem] text-white font-black text-base uppercase tracking-[0.2em] shadow-xl shadow-blue-200 transition-all hover:scale-[1.02] active:scale-95">
                  Lancer le jeu
                </Button>
                <Button variant="ghost" className="w-full h-12 mt-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl text-[10px] font-black uppercase tracking-widest">
                  <AlertTriangle size={14} className="mr-2" /> Signaler un problème
                </Button>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-8 gap-y-10 px-4">
                
                <MetaItem label="Field / Domaine" color="bg-blue-500">
                  <Badge color="bg-[#E0EEFF] text-blue-600">{game.category}</Badge>
                </MetaItem>

                <MetaItem label="Target / Public" color="bg-blue-500">
                  <Badge color="bg-[#E0EEFF] text-blue-600">Tous Publics</Badge>
                </MetaItem>

                <MetaItem label="Age Required" color="bg-blue-500">
                  <Badge color="bg-[#E0EEFF] text-blue-600">{"18 ans +"}</Badge>
                </MetaItem>

                <MetaItem label="Compatible Platforms" color="bg-orange-500">
                  <div className="flex gap-2">
                     <PlatformIcon Icon={Monitor} label="Windows" />
                     <PlatformIcon Icon={Smartphone} label="Android" />
                     <PlatformIcon Icon={Globe} label="Web" />
                  </div>
                </MetaItem>

                <MetaItem label="Game Mode" color="bg-orange-500">
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {["Linguistic", "Syntax", "Vocabulary"].map(m => (
                      <p key={m} className="text-orange-600 text-xs  uppercase tracking-widest">{m}</p>
                    ))}
                  </div>
                </MetaItem>

                <MetaItem label="Quick Keywords" color="bg-red-500">
                  <div className="flex flex-wrap gap-2">
                    {["Science", "Mind", "Math"].map(k => (
                      <span key={k} className="border-2 border-red-50 px-4 py-2 rounded-xl text-red-500 text-[10px] font-black uppercase hover:bg-red-50 transition-colors cursor-default">{k}</span>
                    ))}
                  </div>
                </MetaItem>

                <MetaItem label="Community Rating" color="bg-orange-500">
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={24} className={i < 4 ? "text-orange-400 fill-orange-400" : "text-gray-200"} />
                      ))}
                    </div>
                    <span className="text-[10px]  text-gray-400 uppercase tracking-widest">Cliquez pour noter</span>
                  </div>
                </MetaItem>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function SectionHeader({ label, color }: { label: string, color: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className={`w-1.5 h-6 ${color} rounded-full`} />
      <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">{label}</h2>
    </div>
  );
}

function MetaItem({ label, color, children }: { label: string, color: string, children: React.ReactNode }) {
  return (
    <div className="space-y-4 group">
      <div className="flex items-center gap-3">
        <span className={`w-1 h-4 ${color} rounded-full opacity-40 group-hover:opacity-100 transition-opacity`} />
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-gray-900 transition-colors">{label}</h3>
      </div>
      <div className="pl-4">{children}</div>
    </div>
  );
}

function Badge({ children, color }: { children: React.ReactNode, color: string }) {
  return (
    <span className={`${color} px-7 py-3 rounded-2xl text-[11px] font-black uppercase tracking-wider inline-block shadow-sm`}>
      {children}
    </span>
  );
}

function PlatformIcon({ Icon, label }: { Icon: any, label: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-[70px] h-[70px] bg-white border border-gray-100 rounded-[1.2rem] gap-2 hover:border-orange-200 hover:bg-orange-50/30 group cursor-pointer transition-all hover:-translate-y-1">
      <Icon size={20} className="text-gray-300 group-hover:text-orange-500 transition-colors" strokeWidth={2} />
      <span className="text-[8px] font-black uppercase text-gray-400 group-hover:text-orange-600 transition-colors">{label}</span>
    </div>
  );
}