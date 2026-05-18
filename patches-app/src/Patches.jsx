import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Check, Play, Store, EyeOff, BrainCircuit,
  LayoutTemplate, Apple, Star
} from "lucide-react";
import logo from "./assets/patcheslogorounded-removebg-preview.png";

/* ─── Shared animation variants ─────────────────────────────────── */
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

function useInViewOnce(threshold = 0.15) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return [ref, inView];
}

/* ─── Icons ──────────────────────────────────────────────────────── */
function WindowsIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.949-1.801z" />
    </svg>
  );
}

function GithubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Products", "Pricing", "Docs"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-5 px-4 transition-all duration-300">
      <div className={`mx-auto max-w-4xl bg-[#0F142D]/80 backdrop-blur-md border border-white/10 rounded-full px-5 h-[52px] flex items-center justify-between shadow-lg transition-all duration-300 ${scrolled ? "bg-[#0A0D20]/90 shadow-2xl border-white/20" : ""}`}>
        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center text-white font-medium pl-2">
            <img src={logo} alt="Patches Logo" className="w-7 h-7 mr-2 rounded-full shadow-sm bg-white/10" />
            <span className="font-serif text-[20px] font-semibold tracking-tight">Patches</span>
          </a>

          <div className="hidden md:flex items-center gap-5">
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-[13px] font-medium text-slate-300 hover:text-white transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <a href="#" className="text-[13px] font-medium border border-white/20 rounded-full px-5 py-1.5 hover:bg-white/10 transition-colors text-white">
            Log in
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative pt-44 pb-24 px-5 flex flex-col items-center justify-center text-center overflow-hidden bg-[#060918]">
      {/* Dark mode glow effects */}
      <div className="absolute inset-0 flex justify-center opacity-[0.6] pointer-events-none">
        <div className="w-[800px] h-[400px] bg-gradient-to-b from-[#141a4e] to-transparent blur-[120px] rounded-full translate-y-[-30%]" />
      </div>
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-indigo-900/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-serif text-white tracking-tight leading-[1.1] mb-6">
            Effortless browser <br /> customization by Patches
          </motion.h1>

          <motion.p variants={fadeUp} className="text-slate-400 text-[17px] max-w-xl mx-auto mb-10 leading-relaxed">
            Streamline your browsing process with seamless automation for every custom website, tailored by Patches.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://github.com/EpicCoder16/Patches/releases/download/v0.7.0-beta/Patches-1.0.0-arm64.dmg" target="_blank">
              <button className="flex items-center justify-center gap-2 bg-[#38BDF8] text-[#060918] px-7 py-3.5 rounded-full font-bold text-[15px] hover:bg-[#7dd3fc] transition-colors shadow-lg shadow-[#38BDF8]/20 w-full sm:w-auto">
                <Apple className="w-[18px] h-[18px] mb-[2px]" />
                Download for Mac
              </button>
            </a>
            <a href="https://github.com/EpicCoder16/Patches/releases/download/v0.7.0-beta/Patches.Setup.1.0.0.exe" target="_blank">
              <button className="flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-7 py-3.5 rounded-full font-medium text-[15px] hover:bg-white/20 transition-colors shadow-sm w-full sm:w-auto backdrop-blur-sm">
                <WindowsIcon className="w-[16px] h-[16px]" />
                Download for Windows
              </button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DEMO VIDEO
═══════════════════════════════════════════════════════════════════ */
function DemoVideo() {
  const [ref, inView] = useInViewOnce();

  return (
    <section id="demo" className="relative pb-24 px-5 bg-[#060918]">
      <div className="max-w-[1000px] mx-auto">
        <motion.div ref={ref} initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp}>
          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 bg-[#0F142D] transform -rotate-1 scale-100 mx-4 sm:mx-10 border border-white/10">
            {/* Browser Chrome Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#0A0D20]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
              </div>
            </div>
            {/* Video */}
            <div className="relative bg-[#060918] w-full aspect-[16/9] flex items-center justify-center">
              <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                <source src="/patchesvidforlandingpage.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FEATURE GRID
═══════════════════════════════════════════════════════════════════ */
const features = [
  {
    icon: LayoutTemplate,
    label: "Prompt-to-Edit",
    desc: "Type what you want to change and watch it happen in real time. Natural language style injection.",
    comingSoon: false,
    content: (
      <div className="flex flex-col gap-2 w-full max-w-[240px]">
        <div className="bg-[#1e293b] rounded-lg p-3 text-[11px] text-slate-300 font-mono shadow-inner border border-slate-700">
          <span className="text-emerald-400">{">"}</span> make sidebar purple
        </div>
        <div className="flex justify-end">
          <div className="bg-[#38BDF8] text-[#060918] font-medium rounded-lg p-2.5 text-[11px] shadow-lg shadow-[#38BDF8]/20 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" /> Sidebar updated
          </div>
        </div>
      </div>
    )
  },
  {
    icon: Store,
    label: "Patch Marketplace",
    desc: "Download community-made skins for Canvas, Reddit, Jira, and more seamlessly.",
    comingSoon: true,
    content: (
      <div className="grid grid-cols-2 gap-3 w-full max-w-[220px]">
        <div className="h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-sm border border-white/10 flex items-center justify-center"><LayoutTemplate className="w-5 h-5 text-white/50" /></div>
        <div className="h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-sm border border-white/10 flex items-center justify-center"><Check className="w-5 h-5 text-white/50" /></div>
        <div className="h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-sm border border-white/10 flex items-center justify-center"><Star className="w-5 h-5 text-white/50" /></div>
        <div className="h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg shadow-sm border border-white/10 flex items-center justify-center"><Store className="w-5 h-5 text-white/50" /></div>
      </div>
    )
  },
  {
    icon: EyeOff,
    label: "Smart Clutter Removal",
    desc: "One-click focus mode. Strip ads, banners, sidebars, and noise instantly to stay focused.",
    comingSoon: false,
    content: (
      <div className="w-full max-w-[240px] bg-[#1e293b] rounded-lg border border-slate-700 overflow-hidden shadow-xl">
        <div className="h-5 bg-slate-800 border-b border-slate-700 flex items-center px-2 gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
        </div>
        <div className="p-3 flex gap-3">
          <div className="w-1/3 aspect-square bg-slate-800 rounded border border-red-500/30 flex items-center justify-center relative overflow-hidden group-hover:border-red-500/50 transition-colors">
            <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center"><EyeOff className="w-5 h-5 text-red-400 opacity-50 group-hover:opacity-100 transition-opacity" /></div>
          </div>
          <div className="w-2/3 space-y-2 flex flex-col justify-center">
            <div className="h-2 w-full bg-slate-600 rounded" />
            <div className="h-2 w-4/5 bg-slate-600 rounded" />
            <div className="h-2 w-full bg-slate-600 rounded" />
          </div>
        </div>
      </div>
    )
  },
  {
    icon: BrainCircuit,
    label: "AI Data Extraction",
    desc: "Summarize page deals or assignments into a floating smart dashboard easily.",
    comingSoon: true,
    content: (
      <div className="w-full max-w-[200px] bg-[#0A0D20] rounded-xl border border-indigo-500/30 p-4 shadow-2xl shadow-indigo-500/10 transform rotate-3 hover:rotate-0 transition-transform">
        <div className="flex items-center gap-2 mb-3">
          <BrainCircuit className="w-4 h-4 text-indigo-400" />
          <div className="h-2 w-16 bg-slate-600 rounded" />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-white/5 p-1.5 rounded">
            <div className="h-1.5 w-12 bg-slate-500 rounded" />
            <div className="h-1.5 w-8 bg-indigo-400 rounded" />
          </div>
          <div className="flex justify-between items-center bg-white/5 p-1.5 rounded">
            <div className="h-1.5 w-16 bg-slate-500 rounded" />
            <div className="h-1.5 w-6 bg-indigo-400 rounded" />
          </div>
        </div>
      </div>
    )
  }
];

function FeatureGrid() {
  const [ref, inView] = useInViewOnce();

  return (
    <section className="py-24 bg-[#060918] border-t border-white/5 px-5">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-5 tracking-tight">Built for absolute clarity <br /> and focused work</h2>
        <p className="text-slate-400 text-[17px] max-w-lg mx-auto leading-relaxed">Stay focused with tools that organize, connect and turn information into confident decisions.</p>
      </div>

      <div className="max-w-[1000px] mx-auto border-t border-l border-white/10 grid grid-cols-1 md:grid-cols-2">
        {features.map((f, i) => (
          <div key={i} className="p-10 lg:p-12 bg-[#0A0D20] border-b border-r border-white/10 flex flex-col justify-between group hover:bg-[#0c102a] transition-colors">
            <div className="mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h3 className="text-xl font-bold text-white">{f.label}</h3>
                {f.comingSoon && <span className="text-[10px] uppercase tracking-wider font-bold bg-[#141a4e] border border-indigo-500/30 text-indigo-200 px-2.5 py-0.5 rounded-full">Coming Soon!</span>}
              </div>
              <p className="text-slate-400 text-[15px] leading-relaxed">{f.desc}</p>
            </div>

            <div className="h-[220px] w-full bg-[#060918] rounded-xl flex items-center justify-center border border-white/5 overflow-hidden relative shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#141a4e]/20 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Background large subtle icon */}
              <f.icon className="absolute -right-4 -bottom-4 w-32 h-32 text-white/[0.02] group-hover:text-indigo-500/[0.05] transition-colors duration-500 transform group-hover:scale-110" strokeWidth={1} />

              {/* Foreground Content Mockups */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
                {f.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PRICING
═══════════════════════════════════════════════════════════════════ */
const plans = [
  {
    name: "Starter",
    price: "$0",
    desc: "Perfect for individuals and small teams getting started.",
    features: ["Up to 3 projects", "Basic documentation tools", "Community support"],
    cta: "Start for free",
    dark: false,
  },
  {
    name: "Professional",
    price: "$9",
    desc: "Advanced features for growing teams and businesses.",
    features: ["Unlimited projects", "Advanced documentation tools", "Priority support"],
    cta: "Coming Soon!",
    dark: true,
  },
  {
    name: "Enterprise",
    price: "TBD",
    desc: "Complete solution for large organizations and enterprises.",
    features: ["Everything in Professional", "Dedicated account manager", "24/7 phone support"],
    cta: "Coming Soon!",
    dark: false,
  }
];

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 bg-[#060918] border-t border-white/5 px-5">
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-5 tracking-tight">Choose the perfect plan <br /> for your business</h2>
        <p className="text-slate-400 text-[17px] max-w-lg mx-auto mb-10 leading-relaxed">Scale your operations with flexible pricing that grows with your team. Start free, upgrade when you're ready.</p>

        {/* Toggle */}
        <div className="inline-flex items-center p-1 bg-[#0F142D] border border-white/10 rounded-full shadow-inner">
          <button onClick={() => setIsAnnual(true)} className={`px-6 py-2 rounded-full text-[14px] font-medium transition-colors ${isAnnual ? 'bg-[#141a4e] text-white shadow-sm border border-indigo-500/30' : 'text-slate-400 hover:text-white'}`}>Annually</button>
          <button onClick={() => setIsAnnual(false)} className={`px-6 py-2 rounded-full text-[14px] font-medium transition-colors ${!isAnnual ? 'bg-[#141a4e] text-white shadow-sm border border-indigo-500/30' : 'text-slate-400 hover:text-white'}`}>Monthly</button>
        </div>
      </div>

      <div className="max-w-[960px] mx-auto border-t border-b border-white/10 flex flex-col md:flex-row bg-[#0A0D20]">
        {plans.map((plan, i) => (
          <div key={i} className={`flex-1 p-10 flex flex-col ${plan.dark ? 'bg-[#141a4e] text-white' : 'bg-[#0A0D20] text-slate-200'} ${i === 1 ? '' : (i === 0 ? 'border-r border-white/10' : 'border-l border-white/10')}`}>
            <h3 className="text-[17px] font-medium mb-3 text-white">{plan.name}</h3>
            <p className={`text-[14px] mb-8 leading-relaxed h-[42px] ${plan.dark ? 'text-indigo-200' : 'text-slate-400'}`}>{plan.desc}</p>

            <div className="flex items-start gap-1 mb-2 mt-auto">
              <span className="text-5xl font-serif tracking-tight text-white">{plan.price}</span>
            </div>
            <p className={`text-[13px] mb-8 ${plan.dark ? 'text-indigo-200' : 'text-slate-500'}`}>per year, per user.</p>

            <button className={`w-full py-3.5 rounded-full font-medium text-[14px] transition-colors mb-10 ${plan.dark ? 'bg-[#38BDF8] text-[#060918] hover:bg-[#7dd3fc] shadow-lg shadow-[#38BDF8]/20' : 'bg-white/10 text-white hover:bg-white/20 shadow-sm border border-white/10'}`}>
              {plan.cta}
            </button>

            <ul className="space-y-3.5">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 text-[13px]">
                  <Check className={`w-3.5 h-3.5 flex-shrink-0 ${plan.dark ? 'text-[#38BDF8]' : 'text-slate-500'}`} strokeWidth={2.5} />
                  <span className={plan.dark ? 'text-white/90' : 'text-slate-400'}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BOTTOM CTA & FOOTER
═══════════════════════════════════════════════════════════════════ */
function BottomCTA() {
  return (
    <section className="py-32 border-t border-white/5 relative overflow-hidden bg-[#0A0D20]">
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 12px)" }} />
      <div className="relative z-10 max-w-2xl mx-auto text-center px-5">
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 tracking-tight">Ready to transform your <br /> workflow?</h2>
        <p className="text-slate-400 text-[17px] mb-10 leading-relaxed max-w-lg mx-auto">Join thousands of users streamlining their browsing, managing distractions, and growing with data-driven insights.</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-[#141a4e] text-white border border-indigo-500/30 px-8 py-3.5 rounded-full font-medium text-[15px] hover:bg-[#1a2366] transition-colors shadow-lg">
          Start for free
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#060918] py-16 border-t border-white/5 px-5">
      <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="md:w-1/2">
          <div className="flex items-center gap-2 mb-2">
            <img src={logo} alt="Patches Logo" className="w-8 h-8 rounded-full shadow-sm bg-white/10" />
            <h3 className="font-serif text-[20px] font-semibold text-white tracking-tight">Patches</h3>
          </div>
          <p className="text-slate-400 text-[14px]">Browsing made effortless</p>

          <div className="flex gap-4 mt-8 text-slate-500">
            {/* GitHub icon */}
            <a href="https://github.com/EpicCoder16" target="_blank" className="hover:text-white transition-colors">
              <GithubIcon className="w-[18px] h-[18px]" />
            </a>
            {/* LinkedIn icon */}
            <a href="https://www.linkedin.com/in/eshwar-bejugam-681a35320/" target="_blank" className="hover:text-white transition-colors">
              <LinkedInIcon className="w-[18px] h-[18px]" />
            </a>
          </div>
        </div>

        <div className="flex-1 flex justify-end gap-16">
          <div>
            <h4 className="font-semibold text-slate-300 mb-5 text-[14px]">Product</h4>
            <ul className="space-y-4 text-[14px] text-slate-500">
              <li><a href="" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-300 mb-5 text-[14px]">Company</h4>
            <ul className="space-y-4 text-[14px] text-slate-500">
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div className="min-h-screen bg-[#060918] font-sans antialiased overflow-x-hidden selection:bg-[#38BDF8] selection:text-[#060918]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        
        :root {
          --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          --font-serif: 'Playfair Display', Georgia, serif;
        }

        body {
          font-family: var(--font-sans);
          color: #f8fafc;
        }

        h1, h2, .font-serif {
          font-family: var(--font-serif);
        }

        .font-sans {
          font-family: var(--font-sans);
        }

        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #060918; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }
        html { scroll-behavior: smooth; }
      `}</style>

      <Navbar />
      <Hero />
      <DemoVideo />
      <FeatureGrid />
      <Pricing />
      <BottomCTA />
      <Footer />
    </div>
  );
}
