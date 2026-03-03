import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, PlusCircle, Info, Home } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'HOME', icon: Home },
  { path: '/add', label: 'ADD', icon: PlusCircle },
  { path: '/profile', label: 'PROFILE', icon: User },
  { path: '/about', label: 'ABOUT', icon: Info },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="w-full bg-white py-3 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo Section - Aligné à gauche */}
        <Link to="/" className="flex flex-col items-center min-w-[100px]">
          <div className="flex text-3xl font-black tracking-tighter leading-none">
            <span className="text-[#0052CC]">S</span>
            <span className="text-[#44AD44]">G</span>
            <span className="text-[#0052CC]">S</span>
          </div>
          <div className="text-[7px] font-bold uppercase text-gray-700 tracking-[0.05em] mt-0.5">
            Serious Games Society
          </div>
        </Link>

        {/* Desktop Navigation - Centrée, Fine et Compacte */}
        <div className="hidden md:flex items-center bg-[#C6D4FF] rounded-full p-1.5 mx-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2.5 px-6 py-2 rounded-full text-[13px] font-bold transition-all duration-300 ${
                  active
                    ? 'bg-[#00008B] text-white shadow-md'
                    : 'text-[#0022AA] hover:text-[#00008B] hover:bg-blue-100/50'
                }`}
              >
                <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                <span className="tracking-tight">{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Espaceur pour maintenir le centrage du milieu (ou bouton invisible) */}
        <div className="hidden md:block min-w-[100px]"></div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-full bg-[#C6D4FF] text-[#00008B]"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 bg-[#C6D4FF] rounded-2xl p-3 shadow-lg">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-4 px-5 py-3 rounded-xl text-sm font-bold ${
                    active ? 'bg-[#00008B] text-white' : 'text-[#0022AA]'
                  }`}
                >
                  <Icon size={20} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}