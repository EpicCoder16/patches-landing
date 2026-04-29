import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Puzzle, Zap, Store, EyeOff, BrainCircuit, ChevronRight,
  Play, Check, ArrowRight, Sparkles, Globe, Star, TrendingUp,
  Code2, Layers, MousePointerClick
} from "lucide-react";

/* ─── Shared animation variants ─────────────────────────────────── */
const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { show: { transition: { staggerChildren: 0.11 } } };

function useInViewOnce(threshold = 0.15) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return [ref, inView];
}

/* ─── Gradient text helper ───────────────────────────────────────── */
function GradientText({ children, className = "" }) {
  return (
    <span className={`bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}

/* ─── Glassmorphic card ──────────────────────────────────────────── */
function GlassCard({ children, className = "", hover = true }) {
  return (
    <div className={`relative rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-xl ${hover ? "hover:border-white/[0.14] hover:bg-white/[0.07] transition-all duration-300" : ""} ${className}`}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />
      {children}
    </div>
  );
}

/* ─── Glow blob ──────────────────────────────────────────────────── */
function GlowBlob({ className = "" }) {
  return <div className={`absolute rounded-full blur-[120px] opacity-25 pointer-events-none ${className}`} />;
}

/* ═══════════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Marketplace", "Pricing", "Community"];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className={`mx-auto max-w-6xl px-5 transition-all duration-500 ${scrolled ? "rounded-2xl border border-white/[0.08] bg-[#050505]/80 backdrop-blur-2xl shadow-2xl shadow-black/60" : ""}`}>
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Puzzle className="w-4 h-4 text-white" strokeWidth={2.5} />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <span className="font-semibold text-white text-[17px] tracking-tight">Patches</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="px-4 py-2 text-sm text-white/55 hover:text-white/90 transition-colors duration-200 rounded-lg hover:bg-white/[0.05]">
                {l}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
            >
              <span>Get Extension</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.a>
            {/* mobile hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg border border-white/[0.08] text-white/60 hover:text-white">
              <div className="space-y-1.5">
                <span className={`block h-px w-5 bg-current transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-px w-5 bg-current transition-all ${mobileOpen ? "opacity-0" : ""}`} />
                <span className={`block h-px w-5 bg-current transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden overflow-hidden border-t border-white/[0.06] mt-2">
              <div className="flex flex-col gap-1 py-3">
                {links.map((l) => (
                  <a key={l} href={`#${l.toLowerCase()}`} className="px-4 py-2.5 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/[0.05]">{l}</a>
                ))}
                <a href="#" className="mx-2 mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white text-sm font-semibold">Get Extension</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background glows */}
      <GlowBlob className="w-[600px] h-[600px] bg-[#3B82F6] -top-32 -left-40" />
      <GlowBlob className="w-[500px] h-[500px] bg-[#8B5CF6] top-20 -right-32" />
      <GlowBlob className="w-[400px] h-[400px] bg-[#EC4899] bottom-0 left-1/2 -translate-x-1/2" />

      {/* Dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#050505_100%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-5 text-center">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          {/* Badge */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-8">
            <Sparkles className="w-3 h-3" />
            <span>AI-Powered Browser Extension</span>
            <Sparkles className="w-3 h-3" />
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.93] mb-7">
            <span className="text-white">The Internet,</span>
            <br />
            <GradientText>tailored to your</GradientText>
            <br />
            <span className="text-white">workflow.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/45 max-w-2xl mx-auto leading-relaxed mb-12">
            Transform any website instantly. Prompt your browser to strip distractions, highlight what matters, and build your own digital workspace.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a href="#" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white font-bold text-base shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" /></svg>
              Add to Chrome — It's Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a href="#demo" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-7 py-4 rounded-2xl border border-white/[0.1] bg-white/[0.04] text-white/80 font-semibold text-base backdrop-blur-sm hover:bg-white/[0.08] transition-all">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Play className="w-3.5 h-3.5 ml-0.5 fill-white text-white" />
              </div>
              Watch Demo
            </motion.a>
          </motion.div>

          {/* Social proof */}
          <motion.div variants={fadeUp} className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/35 text-sm">
            <div className="flex -space-x-2">
              {["#3B82F6","#8B5CF6","#EC4899","#10B981","#F59E0B"].map((c, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050505] flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: c }}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span><strong className="text-white/70">12,000+</strong> active patchers</span>
            <span className="hidden sm:block">·</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
              <span className="ml-1"><strong className="text-white/70">4.9</strong> / 5 on Chrome Store</span>
            </div>
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
    <section id="demo" className="relative py-24 overflow-hidden">
      <GlowBlob className="w-[800px] h-[400px] bg-[#3B82F6] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-5xl mx-auto px-5">
        <motion.div ref={ref} initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-10">
            <p className="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-3">See It In Action</p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">One prompt. Infinite patches.</h2>
          </motion.div>

          <motion.div variants={fadeUp}>
            {/* Glow ring */}
            <div className="relative group">
              <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] opacity-70 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] opacity-30" />

              <div className="relative rounded-3xl overflow-hidden bg-[#0a0a0f] border border-white/[0.08]">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 mx-4 px-4 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.06] text-white/30 text-xs text-center">
                    youtube.com
                  </div>
                  <Puzzle className="w-4 h-4 text-blue-400" />
                </div>

                {/* Video placeholder */}
                <div className="relative bg-gradient-to-br from-[#0d0d1a] to-[#050505] flex items-center justify-center" style={{ height: "600px" }}>
                  <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

                  {/* Drop your video here */}
                  <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                    <source src="/patchesvidforlandingpage.mp4" type="video/mp4" />
                  </video>

                  

                  
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BENTO FEATURE GRID
═══════════════════════════════════════════════════════════════════ */
const features = [
  {
    icon: MousePointerClick, color: "from-[#3B82F6] to-[#6366F1]", glow: "blue",
    label: "Prompt-to-Edit",
    desc: 'Type "make this sidebar purple" and watch it happen in real time. Natural language CSS/JS injection.',
    demo: (
      <div className="mt-4 rounded-xl bg-black/40 border border-white/[0.06] p-3 font-mono text-xs">
        <span className="text-white/30">{">"} </span>
        <span className="text-blue-400">make this sidebar dark and minimal</span>
        <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.7 }} className="text-blue-400">|</motion.span>
        <div className="mt-2 text-green-400/70">✓ Applied 3 patches to sidebar</div>
      </div>
    ),
    wide: true,
  },
  {
    icon: Store, color: "from-[#8B5CF6] to-[#EC4899]", glow: "purple",
    label: "Patch Marketplace",
    desc: "Download community-made skins for Canvas, Reddit, Jira, and more.",
    wide: false,
  },
  {
    icon: EyeOff, color: "from-[#10B981] to-[#3B82F6]", glow: "emerald",
    label: "Smart Clutter Removal",
    desc: "One-click focus mode. Strip ads, banners, sidebars, and noise instantly.",
    wide: false,
  },
  {
    icon: BrainCircuit, color: "from-[#EC4899] to-[#F59E0B]", glow: "pink",
    label: "AI Data Extraction",
    desc: "Summarize page deals or assignments into a floating smart dashboard. No copy-paste needed.",
    demo: (
      <div className="mt-4 rounded-xl bg-black/40 border border-white/[0.06] p-3 text-xs space-y-1.5">
        <div className="flex items-center gap-2 text-white/60"><span className="text-yellow-400">📋</span> Due: Nov 15 – HW3</div>
        <div className="flex items-center gap-2 text-white/60"><span className="text-pink-400">⚡</span> 3 missing assignments</div>
        <div className="flex items-center gap-2 text-white/60"><span className="text-green-400">✓</span> Quiz on Wednesday</div>
      </div>
    ),
    wide: true,
  },
];

function FeatureGrid() {
  const [ref, inView] = useInViewOnce();

  return (
    <section className="relative py-24 overflow-hidden">
      <GlowBlob className="w-[500px] h-[500px] bg-[#8B5CF6] top-0 right-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-5">
        <motion.div ref={ref} initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase text-purple-400 mb-3">Features</p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Your browser.<br /><GradientText>Supercharged.</GradientText>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeUp} className={f.wide ? "md:col-span-2" : "md:col-span-1"}>
                <GlassCard className="p-6 h-full group cursor-default">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <f.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{f.label}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
                  {f.demo}
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MARKETPLACE PREVIEW
═══════════════════════════════════════════════════════════════════ */
const patches = [
  { name: "Dark Mode Canvas", author: "@studyhacks", stars: 4820, tag: "Education", color: "from-[#3B82F6] to-[#1d4ed8]" },
  { name: "Clean LinkedIn", author: "@productivist", stars: 3910, tag: "Social", color: "from-[#0ea5e9] to-[#3B82F6]" },
  { name: "Minimalist Gmail", author: "@flowstate", stars: 6102, tag: "Productivity", color: "from-[#EC4899] to-[#8B5CF6]" },
  { name: "Reddit Focus Mode", author: "@nodistractions", stars: 2870, tag: "Social", color: "from-[#F59E0B] to-[#EC4899]" },
  { name: "Notion Palette+", author: "@designhub", stars: 1940, tag: "Tools", color: "from-[#10B981] to-[#3B82F6]" },
  { name: "Jira Dark Pro", author: "@devhints", stars: 3340, tag: "DevTools", color: "from-[#8B5CF6] to-[#EC4899]" },
];

function MarketplacePreview() {
  const [ref, inView] = useInViewOnce();
  const scrollRef = useRef(null);

  return (
    <section id="marketplace" className="relative py-24 overflow-hidden">
      <GlowBlob className="w-[600px] h-[300px] bg-[#3B82F6] bottom-0 left-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-5">
        <motion.div ref={ref} initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-3">Marketplace</p>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                Trending <GradientText>Patches</GradientText>
              </h2>
            </div>
            <a href="#" className="hidden md:flex items-center gap-1.5 text-white/40 hover:text-white/80 text-sm transition-colors">
              Browse all <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div variants={fadeUp}>
            <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
              {patches.map((p, i) => (
                <motion.div key={i} whileHover={{ y: -4, scale: 1.01 }} className="flex-shrink-0 w-64">
                  <GlassCard className="overflow-hidden">
                    {/* Color band */}
                    <div className={`h-24 bg-gradient-to-br ${p.color} relative overflow-hidden`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Globe className="w-10 h-10 text-white/20" />
                      </div>
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/30 text-white/80 text-[10px] font-semibold backdrop-blur-sm">
                        {p.tag}
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-white font-bold text-sm mb-0.5">{p.name}</h4>
                      <p className="text-white/35 text-xs mb-3">{p.author}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-yellow-400/80 text-xs">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{(p.stars / 1000).toFixed(1)}k</span>
                        </div>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 rounded-lg bg-white/[0.07] border border-white/[0.08] text-white/60 text-xs hover:bg-white/[0.12] hover:text-white transition-all">
                          Install
                        </motion.button>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PRICING
═══════════════════════════════════════════════════════════════════ */
const plans = [
  {
    name: "Free",
    price: "$0",
    sub: "forever",
    desc: "Perfect for getting started and exploring what Patches can do.",
    features: [
      "25 AI prompts / month",
      "Access to public Marketplace",
      "Basic clutter removal",
      "Community support",
      "3 saved patches",
    ],
    cta: "Add to Chrome",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$5",
    sub: "per month",
    desc: "For power users who want unlimited customization and creator access.",
    features: [
      "Unlimited AI prompts",
      "Publish to Marketplace",
      "Priority AI processing",
      "Advanced data extraction",
      "Unlimited saved patches",
      "Early access to beta features",
    ],
    cta: "Start Pro Free",
    highlight: true,
  },
];

function Pricing() {
  const [ref, inView] = useInViewOnce();

  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      <GlowBlob className="w-[600px] h-[600px] bg-[#8B5CF6] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-4xl mx-auto px-5">
        <motion.div ref={ref} initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase text-purple-400 mb-3">Pricing</p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Simple, honest <GradientText>pricing.</GradientText>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {plans.map((plan, i) => (
              <motion.div key={i} variants={fadeUp}>
                <div className="relative">
                  {plan.highlight && (
                    <>
                      <div className="absolute -inset-[1.5px] rounded-2xl bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] opacity-80" />
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white text-xs font-bold shadow-lg">
                        Most Popular
                      </div>
                    </>
                  )}
                  <GlassCard hover={false} className={`relative p-7 ${plan.highlight ? "bg-white/[0.07]" : ""}`}>
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="text-4xl font-black text-white">{plan.price}</span>
                      <span className="text-white/35 text-sm">/ {plan.sub}</span>
                    </div>
                    <h3 className={`text-xl font-black mb-2 ${plan.highlight ? "" : "text-white"}`}>
                      {plan.highlight ? <GradientText>{plan.name}</GradientText> : plan.name}
                    </h3>
                    <p className="text-white/40 text-sm mb-7 leading-relaxed">{plan.desc}</p>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2.5 text-sm text-white/65">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlight ? "bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6]" : "bg-white/[0.08]"}`}>
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </div>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <motion.a href="#" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      className={`flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all w-full ${plan.highlight
                        ? "bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                        : "border border-white/[0.1] bg-white/[0.05] text-white/70 hover:bg-white/[0.1] hover:text-white"
                      }`}>
                      {plan.cta} <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  </GlassCard>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════════ */
function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "Marketplace", "Pricing", "Changelog"] },
    { title: "Community", links: ["Discord", "Twitter", "GitHub", "Blog"] },
    { title: "Company", links: ["About", "Privacy", "Terms", "Contact"] },
  ];

  return (
    <footer className="relative border-t border-white/[0.06] py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center">
                <Puzzle className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-semibold text-white text-[17px] tracking-tight">Patches</span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed mb-5">
              Built for the future of browsing.
            </p>
            <div className="flex items-center gap-3">
              {[
  { path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" },
  { path: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" }
].map((icon, i) => (
  <a key={i} href="#" className="w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.04] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all">
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d={icon.path} />
    </svg>
  </a>
))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-white/60 font-semibold text-xs uppercase tracking-widest mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-white/35 text-sm hover:text-white/70 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.05]">
          <p className="text-white/20 text-xs">© 2025 Patches. All rights reserved.</p>
          <p className="text-white/20 text-xs flex items-center gap-1.5">
            Built for the future of browsing <Sparkles className="w-3 h-3 text-blue-400/60" />
          </p>
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
    <div className="min-h-screen bg-[#050505] font-sans antialiased overflow-x-hidden">
      {/* Custom scrollbar & font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }
        html { scroll-behavior: smooth; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      <Navbar />
      <Hero />
      <DemoVideo />
      <FeatureGrid />
      <MarketplacePreview />
      <Pricing />
      <Footer />
    </div>
  );
}
