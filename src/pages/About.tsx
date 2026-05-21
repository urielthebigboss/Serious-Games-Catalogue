import { useState, useRef, useEffect } from "react";
import {
  Heart,
  Zap,
  Users,
  Award,
  TrendingUp,
  Brain,
  PlusCircle,
  CheckCircle2,
  ArrowRight,
  Globe,
  Cpu,
  Search,
  Database,
  GraduationCap,
  ExternalLink,
  Microscope,
  FileText,
  Mail,
  Link2,
} from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const sources = [
  {
    name: "SeriousGameClassification",
    color: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    name: "MobyGames",
    color: "bg-orange-50 text-orange-700 border-orange-100",
  },
  {
    name: "MIT STEM Arcade",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
];

const features = [
  {
    title: "Adaptive Classification",
    description:
      "Advanced automatic indexing system with 15+ filtering criteria for pedagogical, technical and gaming dimensions.",
    icon: Brain,
    color: "blue",
  },
  {
    title: "Progress Tracking",
    description:
      "Comprehensive metadata and progress reports aligned with the LGMD schema for researchers.",
    icon: TrendingUp,
    color: "green",
  },
  {
    title: "Collaborative Play",
    description:
      "Open collaboration model — add, improve, and complete game entries as a community.",
    icon: Users,
    color: "pink",
  },
  {
    title: "Expert Content",
    description:
      "All games validated by educators, researchers and Serious Game Society specialists.",
    icon: Award,
    color: "orange",
  },
];

const values = [
  {
    title: "Innovation",
    description:
      "Pushing boundaries in educational game research and cataloguing.",
    icon: Zap,
    color: "yellow",
  },
  {
    title: "Accessibility",
    description:
      "Education and knowledge available to every teacher and learner.",
    icon: Heart,
    color: "red",
  },
  {
    title: "Excellence",
    description: "Highest scientific and pedagogical standards in every entry.",
    icon: Award,
    color: "blue",
  },
  {
    title: "Community",
    description: "Built by and for the global community of educators.",
    icon: Users,
    color: "green",
  },
];

const publications = [
  {
    authors: "Maho Wielfrid Morie, Iza Marfisi-Schottman, Lancine Bamba",
    title:
      "JEN-Planet: an Automatically Updating Serious Game Catalogue Designed with and for Teachers",
    venue: "International Journal of Serious Games",
    year: "2024",
    volume: "11 (1), pp.45–62",
    doi: "https://doi.org/10.17083/ijsg.v11i1.704",
    hal: "https://hal.science/hal-04530648",
  },
  {
    authors: "Maho Wiefrid Morie, Iza Marfisi-Schottman, Bi Tra Goore",
    title: "User-Centred Design Method for Digital Catalogue Interfaces",
    venue: "International Conference on Games and Learning Alliance (GALA)",
    year: "2020",
    volume: "pp.34–44",
    doi: "https://doi.org/10.1007/978-3-030-63464-3_4",
    hal: "https://hal.science/hal-03143856",
  },
  {
    authors: "Maho Wielfrid Morie, Iza Marfisi-Schottman, Bi Tra Goore",
    title:
      "LGMD: Optimal Lightweight Metadata Model for Indexing Learning Games",
    venue:
      "SADASC — Smart Applications and Data Analysis for Smart Cyber-Physical Systems",
    year: "2020",
    volume: "Marrakech, Morocco",
    doi: "",
    hal: "https://hal.science/hal-02484579",
  },
  {
    authors: "Maho Wielfrid Morie, Iza Marfisi-Schottman, Bi Tra Goore",
    title:
      "Information Extraction Model to Improve Learning Game Metadata Indexing",
    venue: "ISI International Journal on Information System Engineering",
    year: "2020",
    volume: "25 (1), pp.11–19",
    doi: "https://doi.org/10.18280/isi.250102",
    hal: "https://hal.science/hal-02538562",
  },
];

const authors = [
  {
    name: "Iza Marfisi-Schottman",
    role: "Professeure des Universités en Informatique",
    lab: "LIUM — Le Mans Université",
    orcid: "https://orcid.org/0000-0002-2046-6698",
    email: "iza.marfisi@gmail.com",
    initials: "IM",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Wielfrid MORIE",
    role: "Maître-Assistant en Informatique",
    lab: "LMI — Université Nangui ABROGOUA",
    orcid: "https://orcid.org/0000-0003-0426-3046",
    email: "moriemaho@gmail.com",
    initials: "WM",
    color: "from-orange-500 to-orange-700",
  },
];

const gamaTeam = [
  {
    name: "Dakaud Uriel Jean Bedel",
    role: "Developer",
    initials: "DU",
    color: "from-violet-500 to-purple-700",
    portfolio: "https://dakauduriel.netlify.app",
    color2: "bg-violet-50 text-violet-700",
  },
  {
    name: "Deroux Desailly Caleb",
    role: "Developer",
    initials: "DD",
    color: "from-blue-500 to-blue-700",
    portfolio: "#",
    color2: "bg-blue-50 text-blue-700",
  },
  {
    name: "Graourou Olivier Grace Divine",
    role: "Developer",
    initials: "GO",
    color: "from-emerald-500 to-teal-700",
    portfolio: "#",
    color2: "bg-emerald-50 text-emerald-700",
  },
  {
    name: "Assale Yao Eliakim",
    role: "Developer",
    initials: "AY",
    color: "from-orange-500 to-amber-700",
    portfolio: "#",
    color2: "bg-orange-50 text-orange-700",
  },
  {
    name: "Baidoo Kofi Mendes Martin",
    role: "Developer",
    initials: "BK",
    color: "from-rose-500 to-red-700",
    portfolio: "#",
    color2: "bg-rose-50 text-rose-700",
  },
  {
    name: "Ahoussi Serge Armel",
    role: "Developer",
    initials: "AS",
    color: "from-cyan-500 to-sky-700",
    portfolio: "#",
    color2: "bg-cyan-50 text-cyan-700",
  },
];

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────

function AnimatedNumber({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.ceil(target / 60);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else setCount(start);
          }, 16);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── SECTION WRAPPER ──────────────────────────────────────────────────────────

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </section>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export function About() {
  const [hoveredPub, setHoveredPub] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FCFCFC] overflow-x-hidden">
      {/* ══════════════════════ HERO ══════════════════════ */}
      <section className="relative w-full pt-24 pb-20 px-6 overflow-hidden bg-white">
        {/* decorative blobs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] opacity-60 -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-orange-50 rounded-full blur-[100px] opacity-40 -z-10 pointer-events-none" />
        {/* floating icons */}
        <Database className="absolute top-12 right-16 text-gray-100 w-14 h-14 rotate-12 pointer-events-none" />
        <GraduationCap className="absolute bottom-12 left-10 text-gray-100 w-10 h-10 -rotate-12 pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          {/* eyebrow */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-500">
              About the Project
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-none">
            A Catalogue For <br />
            <span className="text-[#0080FF]">Teachers</span> &{" "}
            <span className="text-[#0080FF]">Researchers</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-12 mt-10">
            <div className="max-w-xl">
              <p className="text-gray-500 leading-relaxed text-base font-medium mb-6">
                The{" "}
                <strong className="text-gray-800">
                  Serious Game Catalogue
                </strong>{" "}
                aims to provide the scientific community, teachers, designers,
                and Serious Games enthusiasts with a centralized space to
                search, explore, and share Learning Games according to various
                pedagogical, technical and gaming criteria.
              </p>
              <p className="text-gray-500 leading-relaxed text-base font-medium mb-8">
                The catalogue offers an advanced system for classification and
                automatic indexing and filtering. Previously, the catalog
                contained over 700 SG entries from three catalogs:
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {sources.map((s) => (
                  <span
                    key={s.name}
                    className={`px-4 py-2 rounded-full text-xs font-black border uppercase tracking-wider ${s.color}`}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
              <a
                href="/"
                className="inline-flex items-center gap-3 bg-[#0080FF] hover:bg-[#0070E0] text-white px-7 py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all group hover:scale-[1.02] active:scale-95"
              >
                Explore the Catalog
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* Stat block */}
            <div className="flex flex-col gap-6 md:ml-auto md:justify-center">
              {[
                { value: 785, suffix: "+", label: "Referenced Games" },
                { value: 15, suffix: "+", label: "Search Filters" },
                { value: 2020, suffix: "", label: "Created In" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="group flex items-center gap-5 bg-[#F8F9FA] hover:bg-blue-50 rounded-2xl px-6 py-4 transition-all duration-300 hover:shadow-sm border border-transparent hover:border-blue-100 cursor-default"
                >
                  <p className="text-4xl font-black text-gray-900 w-32 tabular-nums">
                    <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ COLLABORATION PRINCIPLE ══════════════════════ */}
      <Section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-orange-500">
                  Open Collaboration
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-6 leading-tight">
                Built on a Principle of
                <br />
                <span className="text-[#0080FF]">Open Collaboration</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                The Serious Games Catalogue is based on a principle of open
                collaboration. It therefore encourages the community to
                contribute, making it a living, always-improving tool for
                research, discovery and sharing.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: PlusCircle,
                    text: "Add new Learning Games to the catalogue",
                    color: "text-blue-500 bg-blue-50",
                  },
                  {
                    icon: CheckCircle2,
                    text: "Improve or complete information concerning referenced games",
                    color: "text-emerald-500 bg-emerald-50",
                  },
                  {
                    icon: Globe,
                    text: "Contribute to the development of Learning Games worldwide",
                    color: "text-orange-500 bg-orange-50",
                  },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-start gap-4 group">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${color} transition-transform group-hover:scale-110`}
                    >
                      <Icon size={16} />
                    </div>
                    <p className="text-sm font-bold text-gray-700 pt-2">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Visual */}
            <div className="relative">
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-4">
                {[
                  {
                    label: "Games catalogued",
                    value: "785+",
                    bar: "w-4/5",
                    color: "bg-blue-500",
                  },
                  {
                    label: "Active contributors",
                    value: "120+",
                    bar: "w-3/5",
                    color: "bg-orange-500",
                  },
                  {
                    label: "Search filters",
                    value: "15+",
                    bar: "w-2/5",
                    color: "bg-emerald-500",
                  },
                  {
                    label: "Domains covered",
                    value: "12+",
                    bar: "w-1/2",
                    color: "bg-purple-500",
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        {item.label}
                      </span>
                      <span className="text-[10px] font-black text-gray-700">
                        {item.value}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.bar} ${item.color} rounded-full transition-all duration-1000`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════ SGS SUPPORT ══════════════════════ */}
      <Section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-[2rem] p-10 md:p-14 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-20 w-40 h-40 bg-white/5 rounded-full translate-y-1/2" />
            <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 bg-blue-200 rounded-full" />
                  <span className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-200">
                    Institutional Support
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-5 leading-tight tracking-tight">
                  Supported by the
                  <br />
                  <a
                    href="https://seriousgamessociety.org/"
                    className="text-white hover:underline"
                  >
                    Serious Game Society
                  </a>
                </h2>
                <p className="text-blue-100 leading-relaxed text-sm">
                  The Serious Game Catalogue is brought to you by the{" "}
                  <a
                    href="https://seriousgamessociety.org/"
                    className="text-white hover:underline"
                  >
                    <strong>Serious Game Society</strong>
                  </a>
                  , who funded several students in 2026 to improve the original
                  research prototype. The society is also paying for maintenance
                  and servers for a few years.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    icon: Award,
                    text: "Games from the annual SGS competition are added for visibility",
                  },
                  {
                    icon: Cpu,
                    text: "A work group evaluates quality assessment methods for competition games",
                  },
                  {
                    icon: Database,
                    text: "Server infrastructure and long-term maintenance secured",
                  },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-white" />
                    </div>
                    <p className="text-blue-100 text-sm font-medium pt-1.5">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════ SCIENCE / RESEARCH ══════════════════════ */}
      <Section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-purple-500">
              Research Foundation
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10 tracking-tight">
            The Science Behind the Project
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Microscope,
                title: "PhD Research",
                color: "text-purple-600 bg-purple-50",
                body: "Based on Wielfrid MORIE's PhD, supervised by Iza MARFISI, the platform applies cutting-edge research to automate game metadata collection and enrichment.",
              },
              {
                icon: Cpu,
                title: "ADEM Model",
                color: "text-blue-600 bg-blue-50",
                body: "The ADEM model automatically extracts information about Learning Games from web pages, identifying and collecting relevant pedagogical and technical data that can then be enriched by users.",
              },
              {
                icon: Search,
                title: "LGMD Schema",
                color: "text-emerald-600 bg-emerald-50",
                body: "The LGMD (Learning Games Metadata) schema facilitates the pedagogical and ludic description of Learning Games — the foundation for all filters and metadata fields in the catalogue.",
              },
            ].map(({ icon: Icon, title, color, body }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${color} transition-transform group-hover:scale-110 duration-300`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="font-black text-gray-900 uppercase tracking-tight text-sm mb-3">
                  {title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-7 shadow-sm">
            <div className="flex items-start gap-3 mb-3">
              <Globe
                size={16}
                className="text-orange-500 flex-shrink-0 mt-0.5"
              />
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Collaborative Design
              </p>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              The overall design of the platform and its informational
              organization were the subject of research conducted in
              collaboration with teachers from{" "}
              <strong className="text-gray-800">France</strong> and{" "}
              <strong className="text-gray-800">Côte d'Ivoire</strong>, ensuring
              the platform truly meets the needs of end-users in the fields of
              education — covering domains such as STEM, languages, history, and
              social sciences.
            </p>
          </div>
        </div>
      </Section>

      {/* ══════════════════════ FEATURES ══════════════════════ */}
      <Section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-500">
                Platform Features
              </span>
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Why Choose Us
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              const cls =
                f.color === "blue"
                  ? "bg-blue-100 text-blue-600"
                  : f.color === "green"
                    ? "bg-emerald-100 text-emerald-600"
                    : f.color === "pink"
                      ? "bg-pink-100 text-pink-600"
                      : "bg-orange-100 text-orange-600";
              return (
                <div
                  key={i}
                  className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div
                    className={`w-12 h-12 ${cls} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-gray-900 mb-2 text-sm uppercase tracking-tight">
                    {f.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ══════════════════════ PUBLICATIONS ══════════════════════ */}
      <Section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-500">
              Scientific Publications
            </span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-10">
            Publications
          </h2>
          <div className="space-y-4">
            {publications.map((pub, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredPub(i)}
                onMouseLeave={() => setHoveredPub(null)}
                className={`bg-[#F8F9FA] rounded-2xl p-7 border transition-all duration-300 cursor-default
                  ${hoveredPub === i ? "border-blue-200 shadow-md -translate-y-0.5 bg-white" : "border-transparent"}`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${hoveredPub === i ? "bg-blue-500 text-white" : "bg-white text-blue-500 border border-gray-100"}`}
                  >
                    <FileText size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-gray-900 uppercase tracking-tight mb-1 leading-tight">
                      {pub.title}
                    </p>
                    <p className="text-[11px] text-gray-500 font-medium mb-2">
                      {pub.authors}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[10px] font-black text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full">
                        {pub.venue} · {pub.year}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold">
                        {pub.volume}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {pub.doi && (
                      <a
                        href={pub.doi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 h-8 px-3 bg-white border border-gray-100 hover:border-blue-200 hover:bg-blue-50 text-gray-500 hover:text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all"
                      >
                        <Link2 size={11} /> DOI
                      </a>
                    )}
                    {pub.hal && (
                      <a
                        href={pub.hal}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 h-8 px-3 bg-white border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 text-gray-500 hover:text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all"
                      >
                        <ExternalLink size={11} /> HAL
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════ AUTHORS ══════════════════════ */}
      <Section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-orange-500">
              Project Authors
            </span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-10">
            Authors
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {authors.map((a) => (
              <div
                key={a.name}
                className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm p-8 flex items-start gap-6 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center text-white text-lg font-black flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform`}
                >
                  {a.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="font-black text-gray-900 text-sm uppercase tracking-tight mb-0.5">
                    {a.name}
                  </h3>
                  <p className="text-[11px] text-blue-600 font-bold mb-1">
                    {a.role}
                  </p>
                  <p className="text-[11px] text-gray-400 font-bold mb-4">
                    {a.lab}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={a.orcid}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 h-7 px-3 bg-[#F8F9FA] hover:bg-blue-50 hover:text-blue-600 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-wider transition-all"
                    >
                      <ExternalLink size={10} /> ORCID
                    </a>
                    <a
                      href={`mailto:${a.email}`}
                      className="flex items-center gap-1.5 h-7 px-3 bg-[#F8F9FA] hover:bg-orange-50 hover:text-orange-600 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-wider transition-all"
                    >
                      <Mail size={10} /> Email
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════ GAMA LABS TEAM ══════════════════════ */}
      <Section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-10 px-6 bg-violet-600 hover:bg-violet-700 text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-violet-100 self-start md:self-auto"
            >
              {" "}
              <span className="text-[15px] font-black uppercase tracking-[0.25em] text-white text-3xl font-black tracking-tight">
                Developper Team
              </span>{" "}
            </a>
          </div>

          {/* Team grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gamaTeam.map((member, i) => (
              <div
                key={member.name}
                className="group bg-[#F8F9FA] hover:bg-white rounded-2xl border border-transparent hover:border-gray-100 p-6 flex items-center gap-5 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Avatar */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-sm font-black flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  {member.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-black text-gray-900 text-xs uppercase tracking-tight leading-tight mb-1 truncate">
                    {member.name}
                  </h3>
                  <span
                    className={`inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${member.color2} mb-3`}
                  >
                    {member.role}
                  </span>
                  <div>
                    <a
                      href={member.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-wider"
                    >
                      <ExternalLink size={10} /> Portfolio
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════ VALUES ══════════════════════ */}
      <Section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Our Values
            </h2>
            <p className="text-gray-400 font-bold text-sm mt-2 uppercase tracking-widest">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              const cls =
                v.color === "yellow"
                  ? "bg-yellow-100 text-yellow-600"
                  : v.color === "red"
                    ? "bg-red-100 text-red-600"
                    : v.color === "blue"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-emerald-100 text-emerald-600";
              return (
                <div
                  key={i}
                  className="text-center p-7 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div
                    className={`w-14 h-14 ${cls} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-black text-gray-900 mb-2 text-sm uppercase tracking-tight">
                    {v.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ══════════════════════ JOIN CTA ══════════════════════ */}
      <section className="w-full py-24 px-4 bg-white flex flex-col items-center justify-center relative overflow-hidden">
        {/* Effet d'arrière-plan dégradé bleu très doux */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#E0F2FE_0%,_#FFFFFF_70%)] opacity-60" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Titre principal */}
          <h2 className="text-4xl md:text-5xl font-medium text-[#111827] tracking-tight">
            Join The <span className="text-[#3B82F6]">SGC</span> Community
          </h2>

          {/* Sous-titre / Description */}
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Contribute To The World's Largest Catalogue Of Serious Games. Share,
            Rate And Discover The Best Educational Resources.
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
