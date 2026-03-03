import { useState } from 'react';
import { Search, PlusCircle, CheckCircle2, Mail, Gamepad2, DollarSign, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// --- COMPOSANT DE CHAMP AVEC BARRE LATÉRALE ---
function FormField({ label, color, icon: Icon, placeholder }: { label: string, color: string, icon?: any, placeholder?: string }) {
  return (
    <div className="flex flex-col gap-2 mb-5">
      <div className="flex items-center gap-2">
        <span className={`w-[3px] h-4 ${color} rounded-full`}></span>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
          {label} :
        </label>
      </div>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />}
        <Input 
          placeholder={placeholder} 
          className={`bg-[#F8F9FA] border-none rounded-xl h-11 text-xs font-bold text-gray-700 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-100 ${Icon ? 'pl-10' : 'pl-4'}`}
        />
      </div>
    </div>
  );
}

export function AddGame() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 py-12">
      <div className="max-w-[1200px] mx-auto px-8">
        
        {/* Titre Principal */}
        <h1 className="text-5xl font-black mb-16 text-gray-900 tracking-tighter ">
          Add Serious Game
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* COLONNE GAUCHE : FORMULAIRE (7/12) */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-10">
            
            {/* Section Gamer */}
            <section>
              <h2 className="text-xs font-black uppercase mb-6 tracking-[0.2em] text-gray-400 flex items-center gap-2">
                <Mail size={14} /> About Gamer
              </h2>
              <div className="bg-[#F2F2F2] rounded-2xl p-1">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-transparent border-none h-12 text-xs font-bold px-4" 
                />
              </div>
            </section>

            {/* Section Game */}
            <section className="space-y-6">
              <h2 className="text-xs font-black uppercase mb-2 tracking-[0.2em] text-gray-400 flex items-center gap-2">
                <Gamepad2 size={14} /> About Game
              </h2>
              
              {/* Link + Search */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 block">
                  Link to the game
                </label>
                <div className="flex gap-2 p-1 bg-[#F2F2F2] rounded-2xl">
                  <Input 
                    placeholder="https://..." 
                    className="bg-transparent border-none h-12 text-xs font-bold flex-1 px-4 shadow-none focus-visible:ring-0"
                  />
                  <Button 
                    type="button" 
                    className="h-12 px-8 bg-[#007BFF] hover:bg-blue-600 text-white rounded-xl font-bold text-[10px] tracking-widest shadow-lg shadow-blue-100"
                  >
                    <Search size={16} className="mr-2" /> SEARCH
                  </Button>
                </div>
                <p className="text-[9px] text-gray-400 font-bold mt-3 uppercase italic">
                  * Information added automatically, in case of error you can modify it.
                </p>
              </div>

              {/* Grille des champs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 pt-4">
                <FormField label="Domaine" color="bg-blue-600" />
                <FormField label="Public" color="bg-orange-500" />
                <FormField label="Age" color="bg-blue-400" />
                <FormField label="Plateforme" color="bg-orange-600" />
                <FormField label="Cost" color="bg-red-600" placeholder="$ 0.00" icon={DollarSign} />
                <FormField label="Keywords" color="bg-emerald-500" placeholder="Strategy, Math..." icon={Tag} />
              </div>
            </section>

            {/* Bouton Append */}
            <div className="pt-4">
              <Button 
                type="submit" 
                className="bg-[#007BFF] hover:bg-blue-600 text-white rounded-full px-10 h-14 font-black text-xs tracking-[0.2em] shadow-xl shadow-blue-100 transition-transform active:scale-95"
              >
                <PlusCircle size={18} className="mr-2" /> APPEND GAME
              </Button>
            </div>
          </form>

          {/* COLONNE DROITE : PRÉVISUALISATION (5/12) */}
          <div className="lg:col-span-5 sticky top-10">
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-50">
              {/* Image sans bordure noire */}
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800" 
                  alt="Preview" 
                  className="w-full h-full object-cover shadow-inner"
                />
              </div>

              <div className="p-10 space-y-8">
                <div>
                  <h3 className="text-[10px] font-black uppercase text-gray-300 tracking-[0.3em] mb-3">
                    Preview Title
                  </h3>
                  <p className="text-3xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                    Linguistic laboratory
                  </p>
                </div>

                <div>
                  <h3 className="text-[10px] font-black uppercase text-gray-300 tracking-[0.3em] mb-3">
                    Description
                  </h3>
                  <p className="text-[12px] text-gray-500 font-bold leading-relaxed">
                    An interactive game in which the player becomes a young language researcher 
                    tasked with exploring, analyzing, and mastering different languages from 
                    around the world. 
                  </p>
                </div>

                {/* Badges de stats rapides */}
                <div className="flex gap-3 border-t border-gray-50 pt-6">
                  <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase">Science</div>
                  <div className="bg-orange-50 text-orange-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase">18+ Years</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Notification de succès */}
        {isSubmitted && (
          <div className="fixed bottom-10 right-10 bg-gray-900 text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-5 z-50">
            <CheckCircle2 size={24} className="text-blue-500" />
            <p className="font-black text-[10px] uppercase tracking-widest">Added to catalogue successfully</p>
          </div>
        )}
      </div>
    </div>
  );
}