import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Gamepad2,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Monitor,
  Smartphone,
  Globe,
  Star,
  ArrowDownAZ,
  CalendarDays,
  CircleDollarSign,
  Users,
  User,
  Mail,
  ArrowRight,
  X,
  Lock,
  Trophy,
  Eye,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// --- DÉFINITION DES TYPES ---

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

interface CarouselItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  badge?: string;
  tag: string;
  meta: string;
}

interface CarouselTab {
  id: "latest" | "popular" | "award";
  label: string;
  icon: React.ElementType;
  color: string;
  items: CarouselItem[];
}

// --- DONNÉES DU CARROUSEL ---

const carouselData: CarouselTab[] = [
  {
    id: "latest",
    label: "Latest Added",
    icon: Clock,
    color: "blue",
    items: [
      {
        id: 1,
        title: "Quantum Minds",
        subtitle: "Physics & Critical Thinking",
        description:
          "An immersive quantum physics simulator designed for university students. Explore entanglement, superposition, and wave functions through interactive 3D experiments. Built in collaboration with CERN researchers.",
        imageUrl:
          "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800",
        tag: "Science",
        meta: "Added 2 days ago",
        badge: "NEW",
      },
      {
        id: 2,
        title: "EcoSphere",
        subtitle: "Environmental Science",
        description:
          "Manage entire ecosystems and understand the delicate balance of biodiversity. Players make real-time decisions affecting climate, species, and human settlements across 12 distinct biomes.",
        imageUrl:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800",
        tag: "Ecology",
        meta: "Added 5 days ago",
        badge: "NEW",
      },
      {
        id: 3,
        title: "CodeCraft Academy",
        subtitle: "Programming & Logic",
        description:
          "Learn computational thinking through visual puzzles and narrative challenges. From variables to algorithms, this game turns abstract coding concepts into tangible, memorable experiences.",
        imageUrl:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800",
        tag: "Technology",
        meta: "Added 1 week ago",
        badge: "NEW",
      },
    ],
  },
  {
    id: "popular",
    label: "Most Viewed",
    icon: Eye,
    color: "orange",
    items: [
      {
        id: 4,
        title: "MedSim Pro",
        subtitle: "Medical Education",
        description:
          "The most-used surgical training platform in Europe. Used by 200+ medical schools, MedSim Pro allows students to practice complex procedures in a zero-risk virtual environment with haptic feedback.",
        imageUrl:
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800",
        tag: "Medicine",
        meta: "1.2M views this month",
        badge: "🔥 TRENDING",
      },
      {
        id: 5,
        title: "Historia",
        subtitle: "World History",
        description:
          "Walk through pivotal moments in history as an active participant. From ancient civilizations to modern conflicts, make decisions that shaped the world and see alternate timelines unfold.",
        imageUrl:
          "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=800",
        tag: "History",
        meta: "890K views this month",
        badge: "🔥 TRENDING",
      },
      {
        id: 6,
        title: "LinguaWorld",
        subtitle: "Language Learning",
        description:
          "Master a new language through full cultural immersion. 18 languages available, adaptive difficulty, speech recognition feedback, and culturally authentic scenarios from native speakers.",
        imageUrl:
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800",
        tag: "Languages",
        meta: "750K views this month",
        badge: "🔥 TRENDING",
      },
    ],
  },
  {
    id: "award",
    label: "GALA Award Winners",
    icon: Trophy,
    color: "yellow",
    items: [
      {
        id: 7,
        title: "NeuralPath",
        subtitle: "Neuroscience & Psychology",
        description:
          "GALA 2024 Grand Prix winner. NeuralPath revolutionizes how we teach brain science through a narrative adventure that places players inside a patient's neural network during cognitive therapy.",
        imageUrl:
          "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800",
        tag: "Neuroscience",
        meta: "GALA 2024 — Grand Prix",
        badge: "🏆 GRAND PRIX",
      },
      {
        id: 8,
        title: "CivicQuest",
        subtitle: "Civics & Democracy",
        description:
          "GALA 2024 Best Civic Impact award. Players navigate the full legislative process, run for office, manage a city budget, and understand the mechanics of democratic governance firsthand.",
        imageUrl:
          "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=800",
        tag: "Civics",
        meta: "GALA 2024 — Best Civic Impact",
        badge: "🏆 AWARD",
      },
      {
        id: 9,
        title: "FinanceLab",
        subtitle: "Financial Literacy",
        description:
          "GALA 2023 Best Innovation award. Designed for teens and young adults, FinanceLab turns personal finance into a strategy game — budgeting, investing, entrepreneurship, and risk management.",
        imageUrl:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800",
        tag: "Finance",
        meta: "GALA 2023 — Best Innovation",
        badge: "🏆 AWARD",
      },
    ],
  },
];

// --- COMPOSANT MODAL DÉTAIL ---

function GameDetailModal({
  item,
  onClose,
}: {
  item: CarouselItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div
        className="bg-white w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 slide-in-from-bottom-4 duration-400"
        style={{
          animation: "modalEntry 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards",
        }}
      >
        {/* Image header */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
            style={{ animation: "imageZoomIn 0.6s ease-out forwards" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          {item.badge && (
            <div className="absolute top-5 left-5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
              {item.badge}
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white rounded-full p-2 transition-all hover:scale-110 active:scale-95"
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-6 left-6">
            <span className="text-blue-300 text-[10px] font-black uppercase tracking-widest mb-1 block">
              {item.tag}
            </span>
            <h2 className="text-white text-3xl font-black tracking-tight leading-tight">
              {item.title}
            </h2>
            <p className="text-white/70 text-sm font-bold mt-1">
              {item.subtitle}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-center gap-2 mb-5">
            <div className="flex text-yellow-400">
              {[...Array(4)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
              <Star size={14} />
            </div>
            <span className="text-gray-400 text-xs font-bold">4.0 / 5.0</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full mx-1" />
            <span className="text-gray-400 text-xs font-bold">{item.meta}</span>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed font-medium">
            {item.description}
          </p>

          <div className="mt-8 flex gap-3">
            <Button className="flex-1 h-12 bg-[#007BFF] hover:bg-blue-600 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-100 transition-all hover:scale-[1.02] active:scale-95">
              View Full Game <ArrowRight size={15} className="ml-2" />
            </Button>
            <button
              onClick={onClose}
              className="h-12 px-6 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalEntry {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes imageZoomIn {
          from { transform: scale(1.08); }
          to   { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

// --- COMPOSANT CARROUSEL ---

function HeroCarousel() {
  const [activeTab, setActiveTab] = useState<"latest" | "popular" | "award">(
    "latest",
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<CarouselItem | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeData = carouselData.find((t) => t.id === activeTab)!;
  const items = activeData.items;

  const goTo = useCallback(
    (index: number, dir: "left" | "right" = "right") => {
      if (isAnimating) return;
      setDirection(dir);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsAnimating(false);
      }, 280);
    },
    [isAnimating],
  );

  const next = useCallback(() => {
    goTo((currentIndex + 1) % items.length, "right");
  }, [currentIndex, items.length, goTo]);

  const prev = useCallback(() => {
    goTo((currentIndex - 1 + items.length) % items.length, "left");
  }, [currentIndex, items.length, goTo]);

  const switchTab = (tab: "latest" | "popular" | "award") => {
    setActiveTab(tab);
    setCurrentIndex(0);
    setIsAnimating(false);
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(next, 4500);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [next]);

  const resetAutoplay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(next, 4500);
  };

  const current = items[currentIndex];

  const tabColors: Record<
    string,
    { bg: string; text: string; ring: string; shadow: string }
  > = {
    blue: {
      bg: "bg-blue-500",
      text: "text-blue-600",
      ring: "ring-blue-300",
      shadow: "shadow-blue-100",
    },
    orange: {
      bg: "bg-orange-500",
      text: "text-orange-600",
      ring: "ring-orange-300",
      shadow: "shadow-orange-100",
    },
    yellow: {
      bg: "bg-yellow-500",
      text: "text-yellow-600",
      ring: "ring-yellow-300",
      shadow: "shadow-yellow-100",
    },
  };

  const tc = tabColors[activeData.color];

  return (
    <>
      <section className="py-10 px-4 relative overflow-hidden">
        {/* Background decorations (existing style) */}
        <Gamepad2 className="absolute top-10 left-10 text-gray-100 w-12 h-12 rotate-12 pointer-events-none" />
        <Gamepad2 className="absolute bottom-10 right-10 text-gray-100 w-16 h-16 -rotate-12 pointer-events-none" />

        {/* Title */}
        <div className="text-center mb-8 hidden">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-3 tracking-tight">
            Serious Game <br /> Catalogue
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
            The leading hub for serious games.
          </p>
        </div>

        {/* TAB SWITCHER */}
        <div className="flex justify-center mb-8 gap-2 flex-wrap">
          {carouselData.map((tab) => {
            const Icon = tab.icon;
            const colors = tabColors[tab.color];
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  switchTab(tab.id);
                  resetAutoplay();
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 border
                  ${
                    isActive
                      ? `${colors.bg} text-white border-transparent shadow-lg ${colors.shadow} scale-105`
                      : "bg-white text-gray-500 border-gray-100 hover:border-gray-200 hover:text-gray-800 hover:shadow-sm"
                  }`}
                style={{
                  transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              >
                <Icon size={13} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* CARROUSEL CARD */}
        <div className="max-w-4xl mx-auto relative">
          <div
            className="relative overflow-hidden rounded-[2rem]"
            style={{ height: "360px" }}
          >
            {/* Slide */}
            <div
              key={`${activeTab}-${currentIndex}`}
              className="absolute inset-0 flex"
              style={{
                animation: isAnimating
                  ? `slideOut${direction === "right" ? "Left" : "Right"} 0.28s ease-in forwards`
                  : `slideIn${direction === "right" ? "Right" : "Left"} 0.32s cubic-bezier(0.34,1.2,0.64,1) forwards`,
              }}
            >
              {/* Image */}
              <div className="w-1/2 relative overflow-hidden">
                <img
                  src={current.imageUrl}
                  alt={current.title}
                  className="w-full h-full object-cover"
                  style={{ transition: "transform 0.6s ease-out" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
                {current.badge && (
                  <div
                    className={`absolute top-5 left-5 ${tc.bg} text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg`}
                  >
                    {current.badge}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="w-1/2 bg-white flex flex-col justify-center px-10 py-8 relative">
                <span
                  className={`text-[10px] font-black uppercase tracking-widest ${tc.text} mb-3 flex items-center gap-1.5`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${tc.bg} inline-block`}
                  />
                  {current.tag}
                </span>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-tight mb-1">
                  {current.title}
                </h3>
                <p className="text-xs font-bold text-gray-400 mb-4">
                  {current.subtitle}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-4 mb-6">
                  {current.description}
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedItem(current)}
                    className={`flex items-center gap-2 px-5 py-2.5 ${tc.bg} text-white text-xs font-black uppercase tracking-wider rounded-full shadow-md transition-all hover:scale-105 active:scale-95`}
                    style={{ boxShadow: `0 8px 24px -4px rgba(0,0,0,0.15)` }}
                  >
                    View Details <ArrowRight size={13} />
                  </button>
                  <span className="text-[10px] text-gray-400 font-bold">
                    {current.meta}
                  </span>
                </div>

                {/* Dots */}
                <div className="absolute bottom-6 right-8 flex gap-1.5">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        goTo(i, i > currentIndex ? "right" : "left");
                        resetAutoplay();
                      }}
                      className={`rounded-full transition-all duration-300 ${
                        i === currentIndex
                          ? `${tc.bg} w-5 h-2`
                          : "bg-gray-200 hover:bg-gray-300 w-2 h-2"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Prev / Next buttons */}
          <button
            onClick={() => {
              prev();
              resetAutoplay();
            }}
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white hover:bg-gray-50 border border-gray-100 rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all hover:scale-110 active:scale-90 z-10"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => {
              next();
              resetAutoplay();
            }}
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white hover:bg-gray-50 border border-gray-100 rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all hover:scale-110 active:scale-90 z-10"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </section>

      {/* MODAL */}
      {selectedItem && (
        <GameDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}

// --- COMPOSANT DE CHAMP (Pour la modale auth) ---
function FormField({
  label,
  color,
  icon: Icon,
  placeholder,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  color: string;
  icon?: any;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-2 mb-5 group">
      <div className="flex items-center gap-2">
        <span
          className={`w-[3px] h-4 ${color} rounded-full group-focus-within:scale-y-150 transition-transform duration-300`}
        ></span>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-focus-within:text-gray-900 transition-colors">
          {label} :
        </label>
      </div>
      <div className="relative">
        {Icon && (
          <Icon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 group-focus-within:scale-110 transition-all duration-300"
            size={14}
          />
        )}
        <Input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`bg-[#F8F9FA] border-none rounded-xl h-11 text-xs font-bold text-gray-700 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-400 transition-all ${Icon ? "pl-10" : "pl-4"}`}
        />
      </div>
    </div>
  );
}

// --- COMPOSANTS TYPÉS ---

function GameCard({
  id,
  title,
  price,
  domaine,
  age,
  publicType,
  imageUrl,
}: GameProps) {
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
            {price || ""}
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="font-bold text-lg leading-tight tracking-tight drop-shadow-lg">
              {title}
            </h3>
            <div className="flex items-center gap-1 text-yellow-400 mt-1">
              {[...Array(4)].map((_, i) => (
                <Star key={i} size={12} fill="currentColor" />
              ))}
              <Star size={12} />
              <span className="text-white text-xs ml-1 opacity-90 font-bold">
                4.0
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 grid grid-cols-2 gap-y-3 text-xs bg-white">
          <div>
            <p className="text-gray-400 uppercase font-black tracking-tighter text-[10px] mb-0.5">
              Domaine
            </p>
            <p className="font-bold text-blue-600 uppercase truncate">
              {domaine}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 uppercase font-black tracking-tighter text-[10px] mb-0.5">
              Age
            </p>
            <p className="font-bold text-gray-800">{age}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-400 uppercase font-black tracking-tighter text-[10px] mb-0.5">
              Public
            </p>
            <p className="font-bold text-gray-800 uppercase truncate">
              {publicType}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authEmail && authPassword) {
      setIsAuthenticated(true);
      setShowAuthModal(false);
    }
  };

  const games = [
    {
      id: 1,
      title: "Linguistic Laboratory",
      price: "12,99 €",
      domaine: "Science",
      age: "18 ans",
      publicType: "Étudiants",
      imageUrl:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600",
    },
    {
      id: 2,
      title: "Bio-Tech Simulator",
      price: "",
      domaine: "Linguistics",
      age: "15 ans",
      publicType: "Scolaire",
      imageUrl:
        "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=600",
    },
    {
      id: 3,
      title: "Space Exploration",
      price: "12,99 €",
      domaine: "Astronomy",
      age: "18 ans",
      publicType: "Tous publics",
      imageUrl:
        "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=600",
    },
    {
      id: 4,
      title: "History Chronicles",
      price: "12,99 €",
      domaine: "History",
      age: "12 ans",
      publicType: "Enfants",
      imageUrl:
        "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FCFCFC]">
      <Link
        to={isAuthenticated ? "/profile" : "#"}
        onClick={(e) => {
          if (!isAuthenticated) {
            e.preventDefault();
            setShowAuthModal(true);
          }
        }}
        className="absolute top-3 right-8 p-4 bg-[#F8F9FA] hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-full transition-all duration-300 shadow-sm hover:shadow-md group z-50 animate-in fade-in slide-in-from-right-4"
      >
        <User
          size={24}
          className="group-hover:scale-110 transition-transform"
        />
      </Link>

      {/* AUTH MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowAuthModal(false)}
          />
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative z-10 animate-in zoom-in-95 duration-300 border border-gray-100">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock size={32} />
              </div>
              <h2 className="text-3xl font-black tracking-tighter uppercase text-gray-900">
                {authMode === "login" ? "Welcome Back" : "Join Society"}
              </h2>
              <p className="text-[10px] font-black text-gray-400 mt-3 uppercase tracking-[0.2em]">
                {authMode === "login"
                  ? "Login to continue your action"
                  : "Create an account to contribute"}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-6">
              <FormField
                name="authEmail"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                label="Email Address"
                color="bg-blue-500"
                icon={Mail}
                placeholder="gamer@example.com"
              />
              <FormField
                name="authPassword"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                label="Password"
                color="bg-orange-500"
                icon={Lock}
                placeholder="••••••••"
                type="password"
              />

              <Button
                type="submit"
                className="w-full h-14 mt-4 bg-[#007BFF] hover:bg-blue-600 text-white rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-100 transition-transform active:scale-95"
              >
                {authMode === "login" ? "SIGN IN" : "SIGN UP"}{" "}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </form>

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() =>
                  setAuthMode(authMode === "login" ? "register" : "login")
                }
                className="text-[10px] font-black text-gray-400 hover:text-blue-500 uppercase tracking-widest transition-colors"
              >
                {authMode === "login"
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Login"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== HERO CAROUSEL (remplace le texte "Total Immersion") ===== */}
      <HeroCarousel />

      <main className="max-w-[1600px] mx-auto px-6 lg:px-12 pb-20">
        <div className="flex gap-12">
          {sidebarOpen && (
            <aside className="w-72 flex-shrink-0">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black uppercase flex items-center gap-2">
                  Filter <Filter size={18} />
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-[#1E90FF] text-white hover:bg-blue-600 rounded-lg h-8 px-3 text-xs font-bold"
                >
                  <RotateCcw size={14} className="mr-1" /> Reset
                </Button>
              </div>

              <div className="space-y-8">
                <FilterSection label="Domaine" color="bg-blue-500">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
                      size={14}
                    />
                    <Input
                      placeholder="Search"
                      className="pl-9 text-xs border-gray-100 bg-white"
                    />
                  </div>
                </FilterSection>

                <FilterSection label="Keywords" color="bg-red-500">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400"
                      size={14}
                    />
                    <Input
                      placeholder="Keywords separated by commas"
                      className="pl-9 text-xs border-red-100 bg-white placeholder:text-red-300"
                    />
                  </div>
                </FilterSection>

                <FilterSection label="Target Audience" color="bg-orange-500">
                  <div className="relative">
                    <select className="w-full h-10 px-3 text-xs border border-gray-100 bg-white rounded-md appearance-none text-orange-600 font-bold">
                      <option>Tous</option>
                      <option>Scolaire</option>
                      <option>Étudiants</option>
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-400"
                      size={14}
                    />
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
                      <span>0</span>
                      <span>45</span>
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

                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setAdvancedOpen(!advancedOpen)}
                    className="flex items-center justify-between w-full font-black uppercase text-sm mb-6 hover:text-blue-600 transition-colors"
                  >
                    Advanced Filter{" "}
                    {advancedOpen ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>

                  {advancedOpen && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
                      <FilterSection label="Motivation" color="bg-blue-500">
                        <div className="relative">
                          <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
                            size={14}
                          />
                          <Input
                            placeholder="Search"
                            className="pl-9 text-xs border-gray-100 bg-white"
                          />
                        </div>
                      </FilterSection>

                      <FilterSection
                        label="Knowledge Validation"
                        color="bg-red-500"
                      >
                        <div className="relative">
                          <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400"
                            size={14}
                          />
                          <Input
                            placeholder="Keywords"
                            className="pl-9 text-xs border-red-100 bg-white"
                          />
                        </div>
                      </FilterSection>

                      <FilterSection label="Game Mode" color="bg-orange-400">
                        <div className="relative">
                          <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400"
                            size={14}
                          />
                          <Input
                            placeholder="Search"
                            className="pl-9 text-xs border-orange-100 bg-white"
                          />
                        </div>
                      </FilterSection>

                      <FilterSection label="Rights" color="bg-blue-500">
                        <div className="relative">
                          <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
                            size={14}
                          />
                          <Input
                            placeholder="Search"
                            className="pl-9 text-xs border-gray-100 bg-white"
                          />
                        </div>
                      </FilterSection>

                      <FilterSection label="Gameplay" color="bg-orange-400">
                        <div className="relative">
                          <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400"
                            size={14}
                          />
                          <Input
                            placeholder="Search"
                            className="pl-9 text-xs border-orange-100 bg-white"
                          />
                        </div>
                      </FilterSection>

                      <FilterSection label="Rating" color="bg-orange-500">
                        <div className="flex gap-1 text-orange-400 pt-1 cursor-pointer">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              strokeWidth={1.5}
                              className="hover:fill-orange-400 transition-colors"
                            />
                          ))}
                        </div>
                      </FilterSection>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          )}

          <section className="flex-1">
            <div className="mb-10 space-y-4">
              <div className="relative w-full">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  placeholder="Search experiences, keywords or domains..."
                  className="w-full pl-11 py-6 text-sm bg-white border border-gray-100 rounded-xl shadow-sm focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all placeholder:text-gray-400"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="relative group">
                  <CalendarDays
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 group-hover:text-blue-600 transition-colors"
                    size={14}
                  />
                  <select className="pl-9 pr-8 py-2.5 text-xs font-bold text-gray-700 bg-white border border-gray-100 rounded-lg appearance-none cursor-pointer hover:border-blue-200 hover:shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="">Sort by Date</option>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={14}
                  />
                </div>

                <div className="relative group">
                  <ArrowDownAZ
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 group-hover:text-blue-600 transition-colors"
                    size={14}
                  />
                  <select className="pl-9 pr-8 py-2.5 text-xs font-bold text-gray-700 bg-white border border-gray-100 rounded-lg appearance-none cursor-pointer hover:border-blue-200 hover:shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="">Sort by Title</option>
                    <option value="az">A to Z</option>
                    <option value="za">Z to A</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={14}
                  />
                </div>

                <div className="relative group">
                  <CircleDollarSign
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 group-hover:text-orange-600 transition-colors"
                    size={14}
                  />
                  <select className="pl-9 pr-8 py-2.5 text-xs font-bold text-gray-700 bg-white border border-gray-100 rounded-lg appearance-none cursor-pointer hover:border-orange-200 hover:shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-orange-500">
                    <option value="">Sort by Cost</option>
                    <option value="low">Low to High</option>
                    <option value="high">High to Low</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={14}
                  />
                </div>

                <div className="relative group">
                  <Globe
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 group-hover:text-red-600 transition-colors"
                    size={14}
                  />
                  <select className="pl-9 pr-8 py-2.5 text-xs font-bold text-gray-700 bg-white border border-gray-100 rounded-lg appearance-none cursor-pointer hover:border-red-200 hover:shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-red-500">
                    <option value="">Language</option>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    <option value="de">German</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={14}
                  />
                </div>

                <div className="relative group">
                  <Users
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 group-hover:text-blue-500 transition-colors"
                    size={14}
                  />
                  <select className="pl-9 pr-8 py-2.5 text-xs font-bold text-gray-700 bg-white border border-gray-100 rounded-lg appearance-none cursor-pointer hover:border-blue-200 hover:shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="">Game Mode</option>
                    <option value="single">Singleplayer</option>
                    <option value="multi">Multiplayer</option>
                    <option value="coop">Co-op</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={14}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-gray-400 font-bold text-sm">
                  Experiences available
                </p>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 text-sm font-bold text-gray-600"
                aria-label={
                  sidebarOpen ? "Fermer les filtres" : "Ouvrir les filtres"
                }
              >
                <Filter
                  className={sidebarOpen ? "text-blue-500" : "text-gray-400"}
                  size={18}
                />
                <span className="hidden sm:inline">
                  {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
                </span>
              </button>
            </div>

            <div
              className={`grid gap-8 ${sidebarOpen ? "grid-cols-1 xl:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}
            >
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
