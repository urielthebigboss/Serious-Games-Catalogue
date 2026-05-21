import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, CheckCircle2, Mail, Gamepad2, DollarSign, 
  Tag, Gamepad, Calendar, Star, Globe, Trophy, Zap, Flame, Lock, Unlock, User, ArrowRight, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// --- COMPOSANT DE CHAMP AVEC BARRE LATÉRALE ---
function FormField({ 
  label, color, icon: Icon, placeholder, name, value, onChange, type = "text"
}: { 
  label: string, color: string, icon?: any, placeholder?: string, 
  name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, type?: string
}) {
  return (
    <div className="flex flex-col gap-2 mb-5 group">
      <div className="flex items-center gap-2">
        <span className={`w-[3px] h-4 ${color} rounded-full group-focus-within:scale-y-150 transition-transform duration-300`}></span>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-focus-within:text-gray-900 transition-colors">
          {label} :
        </label>
      </div>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 group-focus-within:scale-110 transition-all duration-300" size={14} />}
        {type === "textarea" ? (
          <textarea 
            name={name} value={value} onChange={onChange} placeholder={placeholder} 
            className={`bg-[#F8F9FA] border-none rounded-xl py-3 text-xs font-bold text-gray-700 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-400 transition-all w-full resize-none min-h-[80px] ${Icon ? 'pl-10' : 'pl-4'}`}
          />
        ) : (
          <Input 
            type={type}
            name={name} value={value} onChange={onChange} placeholder={placeholder} 
            className={`bg-[#F8F9FA] border-none rounded-xl h-11 text-xs font-bold text-gray-700 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-400 transition-all ${Icon ? 'pl-10' : 'pl-4'}`}
          />
        )}
      </div>
    </div>
  );
}

export function AddGame() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showXpPopup, setShowXpPopup] = useState(false);
  const [previewImage, setPreviewImage] = useState(
    "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800"
  );

  // --- ÉTATS D'AUTHENTIFICATION ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  // --- ÉTAT DU FORMULAIRE ---
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    email: '',
    link: '',
    domaine: '',
    publicType: '',
    age: '',
    plateforme: '',
    cost: '',
    keywords: '',
    motivation: '',
    gameMode: '',
    gamePlay: '',
    date: '',
    knowledgeValidation: '',
    rights: '',
    rating: '',
    language: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- LOGIQUE D'AUTHENTIFICATION ---
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authEmail && authPassword) {
      setFormData(prev => ({ ...prev, email: authEmail }));
      setIsAuthenticated(true);
      setShowAuthModal(false); // Ferme la popup une fois connecté
    }
  };

  // --- INTERCEPTEURS D'ACTIONS (Vérifient la connexion avant action) ---
  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      action();
    }
  };

  const handleExtractClick = () => {
    // Logique d'extraction ici
    console.log("Extracting metadata for:", formData.link);
  };

  const triggerImageChange = () => {
    fileInputRef.current?.click();
  };

  // --- LOGIQUE DE GAMIFICATION ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (formData[name as keyof typeof formData].trim() === '' && value.trim() !== '') {
      setShowXpPopup(true);
      setTimeout(() => setShowXpPopup(false), 800);
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const totalFields = Object.keys(formData).length;
  const filledFieldsCount = Object.values(formData).filter(val => val.trim() !== '').length;
  const progressPercentage = Math.round((filledFieldsCount / totalFields) * 100);
  
  const xpPoints = filledFieldsCount * 50;
  const maxXp = totalFields * 50;
  
  const level = Math.floor(filledFieldsCount / 4) + 1;
  const ranks = ["Newbie", "Explorer", "Challenger", "Expert", "Master", "Legend"];
  const currentRank = ranks[Math.min(level - 1, ranks.length - 1)];
  const isMaxLevel = filledFieldsCount === totalFields;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    if (!isMaxLevel) return;
    
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 py-12 selection:bg-blue-100">
      <Link 
        to={isAuthenticated ? "/profile" : "#"} 
        onClick={(e) => {
          if (!isAuthenticated) {
            e.preventDefault(); // Empêche la navigation
            setShowAuthModal(true); // Ouvre la popup de connexion
          }
        }}
        className="absolute top-3 right-8 p-4 bg-[#F8F9FA] hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-full transition-all duration-300 shadow-sm hover:shadow-md group z-50 animate-in fade-in slide-in-from-right-4"
      >
        <User size={24} className="group-hover:scale-110 transition-transform" />
      </Link>
      
      {/* --- MODALE D'AUTHENTIFICATION (POPUP) --- */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowAuthModal(false)} />
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative z-10 animate-in zoom-in-95 duration-300 border border-gray-100">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors">
              <X size={24} />
            </button>
            
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock size={32} />
              </div>
              <h2 className="text-3xl font-black tracking-tighter uppercase text-gray-900">
                {authMode === 'login' ? 'Welcome Back' : 'Join Society'}
              </h2>
              <p className="text-[10px] font-black text-gray-400 mt-3 uppercase tracking-[0.2em]">
                {authMode === 'login' ? 'Login to continue your action' : 'Create an account to contribute'}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-6">
              <FormField 
                name="authEmail" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)}
                label="Email Address" color="bg-blue-500" icon={Mail} placeholder="gamer@example.com" 
              />
              <FormField 
                name="authPassword" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)}
                label="Password" color="bg-orange-500" icon={Lock} placeholder="••••••••" type="password" 
              />
              
              <Button 
                type="submit" 
                className="w-full h-14 mt-4 bg-[#007BFF] hover:bg-blue-600 text-white rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-100 transition-transform active:scale-95"
              >
                {authMode === 'login' ? 'SIGN IN' : 'SIGN UP'} <ArrowRight size={16} className="ml-2" />
              </Button>
            </form>

            <div className="mt-8 text-center">
              <button 
                type="button"
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} 
                className="text-[10px] font-black text-gray-400 hover:text-blue-500 uppercase tracking-widest transition-colors"
              >
                {authMode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Login"}
              </button>
            </div>
          </div>
        </div>
      )}

     {/* BOUTON PROFIL EN HAUT À DROITE (Omniprésent) */}
      
      <div className="max-w-[1200px] mx-auto px-8">
        
        {/* --- CONTENU DU FORMULAIRE D'AJOUT (Toujours visible) --- */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter">
              Add Serious Game
            </h1>
            {isMaxLevel && (
              <div className="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-full flex items-center gap-2 animate-pulse">
                <Flame size={16} fill="currentColor" />
                <span className="text-xs font-black uppercase tracking-widest">Quest Complete</span>
              </div>
            )}
          </div>

          <div className="mb-12 bg-[#F8F9FA] rounded-[2rem] p-6 flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="flex-1 w-full z-10">
              <div className="flex justify-between items-end mb-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                  <Zap size={14} className={progressPercentage > 0 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} /> 
                  Data Completion
                </span>
                <div className="text-right">
                  <span className="text-xs font-black text-gray-400 mr-2 tracking-widest uppercase">Lvl {level}</span>
                  <span className="text-sm font-black text-[#007BFF]">{progressPercentage}%</span>
                </div>
              </div>
              <div className="h-4 w-full bg-white rounded-full overflow-hidden shadow-inner p-0.5 relative">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out relative ${isMaxLevel ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-blue-400 to-[#007BFF]'}`}
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/20 rounded-full" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)' }}></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white px-8 py-4 rounded-2xl shadow-sm border border-gray-100 min-w-[240px] z-10 relative">
              {showXpPopup && (
                <div className="absolute -top-6 right-8 text-green-500 font-black text-sm tracking-wider animate-out slide-out-to-top-4 fade-out duration-700">
                  +50 XP
                </div>
              )}

              <div className={`p-3 rounded-full transition-all duration-500 ${isMaxLevel ? 'bg-gradient-to-br from-yellow-100 to-orange-100 text-orange-500 scale-110 shadow-lg shadow-orange-100' : progressPercentage > 0 ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-300'}`}>
                <Trophy size={28} className={isMaxLevel ? "animate-bounce" : ""} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1 flex items-center gap-1">
                  Rank: <span className={isMaxLevel ? 'text-orange-500' : 'text-blue-500'}>{currentRank}</span>
                </p>
                <p className="text-2xl font-black text-gray-900 tracking-tighter transition-all duration-300">
                  {xpPoints} <span className="text-xs text-gray-300 tracking-normal font-bold">/ {maxXp}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-10">
              
              <section>
                <h2 className="text-xs font-black uppercase mb-6 tracking-[0.2em] text-gray-400 flex items-center gap-2">
                  <Mail size={14} /> About Gamer
                </h2>
                <div className="bg-[#F2F2F2] rounded-2xl p-1 transition-all focus-within:ring-2 focus-within:ring-blue-100 hover:shadow-md hover:shadow-gray-100 duration-300">
                  <Input name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" className="bg-transparent border-none h-12 text-xs font-bold px-4 focus-visible:ring-0" />
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-xs font-black uppercase mb-2 tracking-[0.2em] text-gray-400 flex items-center gap-2">
                  <Gamepad2 size={14} /> About Game
                </h2>
                
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 block">Link to the game</label>
                  <div className="flex gap-2 p-1 bg-[#F2F2F2] rounded-2xl focus-within:ring-2 focus-within:ring-blue-100 transition-all hover:shadow-md hover:shadow-gray-100 duration-300">
                    <Input name="link" value={formData.link} onChange={handleInputChange} placeholder="https://..." className="bg-transparent border-none h-12 text-xs font-bold flex-1 px-4 shadow-none focus-visible:ring-0" />
                    
                    {/* BOUTON INTERCEPTÉ */}
                    <Button 
                      type="button" 
                      onClick={(e) => handleActionClick(e, handleExtractClick)}
                      className="h-12 px-8 bg-[#007BFF] hover:bg-blue-600 text-white rounded-xl font-bold text-[10px] tracking-widest shadow-lg shadow-blue-100 group"
                    >
                      <Search size={16} className="mr-2 group-hover:rotate-90 transition-transform duration-300" /> EXTRACT METADATA 
                    </Button>

                  </div>
                </div>

                <div className="grid grid-cols-1 gap-x-8 pt-2">
                  <FormField name="title" value={formData.title} onChange={handleInputChange} label="Game Title" color="bg-indigo-500" placeholder="e.g. Linguistic Laboratory" />
                  <FormField name="description" value={formData.description} onChange={handleInputChange} label="Short Description" color="bg-indigo-400" type="textarea" placeholder="Describe the experience..." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 pt-2">
                  <FormField name="domaine" value={formData.domaine} onChange={handleInputChange} label="Domaine" color="bg-blue-600" />
                  <FormField name="publicType" value={formData.publicType} onChange={handleInputChange} label="Public" color="bg-orange-500" />
                  <FormField name="age" value={formData.age} onChange={handleInputChange} label="Age" color="bg-blue-400" placeholder="e.g. 18+" />
                  <FormField name="plateforme" value={formData.plateforme} onChange={handleInputChange} label="Plateforme" color="bg-orange-600" />
                  <FormField name="cost" value={formData.cost} onChange={handleInputChange} label="Cost" color="bg-red-600" placeholder="$ 0.00" icon={DollarSign} />
                  <FormField name="keywords" value={formData.keywords} onChange={handleInputChange} label="Keywords" color="bg-emerald-500" placeholder="Strategy, Math..." icon={Tag} />
                  <FormField name="motivation" value={formData.motivation} onChange={handleInputChange} label="Motivation" color="bg-emerald-500" />
                  <FormField name="gameMode" value={formData.gameMode} onChange={handleInputChange} label="Game Mode" color="bg-emerald-500" icon={Gamepad} />
                  <FormField name="gamePlay" value={formData.gamePlay} onChange={handleInputChange} label="Game Play" color="bg-emerald-500" icon={Gamepad} />
                  <FormField name="date" value={formData.date} onChange={handleInputChange} label="Date" color="bg-emerald-500" icon={Calendar} />
                  <FormField name="knowledgeValidation" value={formData.knowledgeValidation} onChange={handleInputChange} label="Knowledge Validation" color="bg-emerald-500" icon={CheckCircle2} />
                  <FormField name="rights" value={formData.rights} onChange={handleInputChange} label="Rights" color="bg-emerald-500" />
                  <FormField name="rating" value={formData.rating} onChange={handleInputChange} label="Rating" color="bg-emerald-500" icon={Star} />
                  <FormField name="language" value={formData.language} onChange={handleInputChange} label="Language" color="bg-emerald-500" icon={Globe} />
                </div>
              </section>

              <div className="pt-4 pb-10">
                <Button 
                  type="submit" 
                  disabled={isAuthenticated ? !isMaxLevel : false} // Si non connecté, toujours cliquable pour ouvrir la popup
                  className={`rounded-full px-10 h-14 font-black text-xs tracking-[0.2em] shadow-xl transition-all duration-500 flex items-center w-full md:w-auto justify-center
                    ${(!isAuthenticated || isMaxLevel)
                      ? 'bg-gradient-to-r from-[#007BFF] to-blue-500 hover:scale-105 text-white shadow-blue-200' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'}`}
                >
                  {isMaxLevel || !isAuthenticated ? (
                    <><Unlock size={18} className="mr-3 animate-pulse" /> APPEND GAME</>
                  ) : (
                    <><Lock size={18} className="mr-3" /> COMPLETE ALL FIELDS ({progressPercentage}%)</>
                  )}
                </Button>
              </div>
            </form>

            <div className="lg:col-span-5 sticky top-10">
              <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,123,255,0.15)]">
                
                <div className="aspect-[4/3] w-full overflow-hidden relative group">
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover shadow-inner group-hover:scale-105 transition-transform duration-700" />
                  
                  {/* BOUTON INTERCEPTÉ */}
                  <button 
                    type="button" 
                    onClick={(e) => handleActionClick(e, triggerImageChange)} 
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md hover:bg-white hover:scale-105 transition-all"
                  >
                    Change Image
                  </button>
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
                </div>

                <div className="p-10 space-y-8">
                  <div>
                    <h3 className="text-[10px] font-black uppercase text-gray-300 tracking-[0.3em] mb-3 flex items-center justify-between">
                      <span>Preview Title</span>
                      {formData.title && <CheckCircle2 size={12} className="text-green-400" />}
                    </h3>
                    <p className={`text-3xl font-black uppercase tracking-tighter leading-none transition-colors duration-300 ${formData.title ? 'text-gray-900' : 'text-gray-200'}`}>
                      {formData.title || "Game Title..."}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[10px] font-black uppercase text-gray-300 tracking-[0.3em] mb-3">
                      Description
                    </h3>
                    <p className={`text-[12px] font-bold leading-relaxed transition-colors duration-300 ${formData.description ? 'text-gray-600' : 'text-gray-200'}`}>
                      {formData.description || "Start typing your description to see it appear here live..."}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 border-t border-gray-50 pt-6 min-h-[60px]">
                    {formData.domaine ? (
                      <div className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase animate-in zoom-in duration-300">
                        {formData.domaine}
                      </div>
                    ) : (
                      <div className="border border-dashed border-gray-200 text-gray-300 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase">Domaine</div>
                    )}

                    {formData.age ? (
                      <div className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase animate-in zoom-in duration-300">
                        {formData.age}
                      </div>
                    ) : (
                      <div className="border border-dashed border-gray-200 text-gray-300 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase">Age</div>
                    )}
                    
                    {formData.cost && (
                      <div className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase animate-in zoom-in duration-300 flex items-center gap-1">
                        <DollarSign size={10} /> {formData.cost}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {isSubmitted && (
          <div className="fixed bottom-10 right-10 bg-gray-900 text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-5 z-50">
            <CheckCircle2 size={24} className="text-green-400" />
            <p className="font-black text-[10px] uppercase tracking-widest">Added to catalogue successfully! (+500 XP)</p>
          </div>
        )}
      </div>
    </div>
  );
}