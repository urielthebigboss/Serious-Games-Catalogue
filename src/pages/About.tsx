import { Target, Eye, Heart, Zap, Users, Award, TrendingUp, Brain, } from 'lucide-react';
import { PlusCircle, CheckCircle2, ArrowRight} from 'lucide-react';



const features = [
  {
    title: 'Adaptive Learning',
    description: 'Our AI-powered system adapts to each player\'s learning style and pace.',
    icon: Brain,
    color: 'blue'
  },
  {
    title: 'Progress Tracking',
    description: 'Comprehensive analytics and progress reports help track improvement.',
    icon: TrendingUp,
    color: 'green'
  },
  {
    title: 'Collaborative Play',
    description: 'Multiplayer modes encourage teamwork and social learning.',
    icon: Users,
    color: 'pink'
  },
  {
    title: 'Expert Content',
    description: 'All games are developed with educators and subject matter experts.',
    icon: Award,
    color: 'orange'
  }
];

const values = [
  { title: 'Innovation', description: 'We constantly push the boundaries of educational games.', icon: Zap, color: 'yellow' },
  { title: 'Accessibility', description: 'Education should be available to everyone.', icon: Heart, color: 'red' },
  { title: 'Excellence', description: 'We maintain the highest standards.', icon: Award, color: 'blue' },
  { title: 'Community', description: 'We believe in collaborative learning.', icon: Users, color: 'green' }
];

export function About() {
  return (
    <div className="min-h-screen">
    


  
    <section className="relative w-full py-20 px-8 overflow-hidden bg-white">
      {/* Halo de fond (Blurry Gradient) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] opacity-60 -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Titre "About Us" */}
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-16 tracking-tight">
          About Us
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Colonne Gauche : Platform */}
          <div className="max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900 mb-8">
              The <span className="text-[#0080FF]">Platform</span> For Online Educational Games.
            </h2>
          </div>

          {/* Colonne Droite : Future Of (Décalée vers le bas) */}
          <div className="max-w-sm md:mt-24 self-end text-right md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900">
              The Future Of <span className="text-[#0080FF]">Serious Gaming</span> Starts Here.
            </h2>
          </div>
        </div>

        {/* Description et Bouton */}
        <div className="mt-16 max-w-2xl">
          <p className="text-gray-600 font-medium leading-relaxed mb-10">
            SGS Catalogue: A Next-Generation Platform Dedicated To Educational Games, 
            Designed By And For The Community Of Researchers And Teachers.
          </p>

          <button className="bg-[#0080FF] hover:bg-[#0070E0] text-white px-8 py-3.5 rounded-2xl flex items-center gap-3 transition-all shadow-lg shadow-blue-100 font-bold group">
            Explore the Catalog
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Statistiques (Barre horizontale) */}
        <div className="mt-24 flex flex-wrap items-center gap-12 border-t border-transparent">
          <div className="flex items-center gap-10">
            <div>
              <p className="text-4xl font-black text-gray-900 mb-1">785+</p>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">References Games</p>
            </div>
            
            <div className="h-12 w-[1px] bg-gray-300 hidden md:block" />
            
            <div>
              <p className="text-4xl font-black text-gray-900 mb-1">15+</p>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Filters Of Search</p>
            </div>

            <div className="h-12 w-[1px] bg-gray-300 hidden md:block" />

            <div>
              <p className="text-4xl font-black text-gray-900 mb-1">2020</p>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Created In</p>
            </div>
          </div>
        </div>
      </div>
    </section>

      

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-3xl p-8 lg:p-12 text-white">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                To make quality education accessible and engaging for learners worldwide through innovative serious games.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-3xl p-8 lg:p-12 text-white">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-emerald-100 text-lg leading-relaxed">
                A world where learning is universally accessible, enjoyable, and effective through educational games.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-gray-500">Our platform offers unique features designed to maximize learning outcomes</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorClass = feature.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                               feature.color === 'green' ? 'bg-emerald-100 text-emerald-600' :
                               feature.color === 'pink' ? 'bg-pink-100 text-pink-600' :
                               'bg-orange-100 text-orange-600';
              return (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 ${colorClass} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-500">The principles that guide everything we do</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              const colorClass = value.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                               value.color === 'red' ? 'bg-red-100 text-red-600' :
                               value.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                               'bg-emerald-100 text-emerald-600';
              return (
                <div key={index} className="text-center p-6">
                  <div className={`w-14 h-14 ${colorClass} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-500 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      

    <section className="w-full py-24 px-4 bg-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Effet d'arrière-plan dégradé bleu très doux */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#E0F2FE_0%,_#FFFFFF_70%)] opacity-60" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        
        {/* Titre principal */}
        <h2 className="text-4xl md:text-5xl font-medium text-[#111827] tracking-tight">
          Join The <span className="text-[#3B82F6]">SGS</span> Community
        </h2>

        {/* Sous-titre / Description */}
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Contribute To The World's Largest Catalogue Of Serious Games. Share, Rate And Discover The Best Educational Resources.
        </p>

        {/* Bouton principal */}
        <div className="pt-4">
          <button className="bg-[#0080FF] hover:bg-[#0070E0] text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-3 mx-auto transition-all shadow-lg shadow-blue-100 font-medium text-lg">
            <PlusCircle size={22} />
            Add serious game
          </button>
        </div>

        {/* Liens du bas (Open Source & Community) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16 pt-8">
          <div className="flex items-center gap-3 text-[#3B82F6] font-medium text-lg">
            <CheckCircle2 size={24} className="stroke-[1.5]" />
            <span>Open Source</span>
          </div>
          <div className="flex items-center gap-3 text-[#3B82F6] font-medium text-lg">
            <CheckCircle2 size={24} className="stroke-[1.5]" />
            <span>Community</span>
          </div>
        </div>

      </div>
    </section>
  

    </div>
  );
}
