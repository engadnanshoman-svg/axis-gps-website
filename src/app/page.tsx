'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Building2, Cog, HardHat, Wrench, Phone, Mail, MapPin,
  ChevronDown, ArrowLeft, Menu, X, CheckCircle2, Users,
  Target, Zap, Shield, ArrowUpRight, Send, Star,
  Ruler, Compass, DraftingCompass, Factory, Calculator, BarChart3
} from 'lucide-react'

/* ───────── animated counter ───────── */
function Counter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, end, duration])
  return <span ref={ref}>{count}{suffix}</span>
}

/* ───────── section wrapper ───────── */
function Section({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

/* ───────── nav ───────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const links = [
    { href: '#hero', label: 'الرئيسية' },
    { href: '#about', label: 'من نحن' },
    { href: '#services', label: 'خدماتنا' },
    { href: '#projects', label: 'مشاريعنا' },
    { href: '#contact', label: 'تواصل معنا' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[oklch(0.13_0.02_250)]/90 backdrop-blur-xl border-b border-[oklch(0.30_0.03_250)] shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden glow-teal-sm transition-all duration-300 group-hover:scale-110">
              <img src="/logo.png" alt="اكسيس" className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold gradient-text">اكسيس</span>
              <span className="block text-[10px] text-[oklch(0.65_0.02_250)] tracking-wider">للحلول الهندسية المتقدمة</span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-sm text-[oklch(0.75_0.01_250)] hover:text-[oklch(0.72_0.14_180)] rounded-lg hover:bg-[oklch(0.72_0.14_180_/_0.08)] transition-all duration-300"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mr-2 px-5 py-2.5 bg-[oklch(0.72_0.14_180)] text-[oklch(0.13_0.02_250)] text-sm font-semibold rounded-lg hover:bg-[oklch(0.75_0.15_180)] transition-all duration-300 glow-teal-sm"
            >
              احصل على عرض
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[oklch(0.75_0.01_250)]"
            aria-label="القائمة"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[oklch(0.13_0.02_250)]/95 backdrop-blur-xl border-t border-[oklch(0.30_0.03_250)] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-[oklch(0.75_0.01_250)] hover:text-[oklch(0.72_0.14_180)] rounded-lg hover:bg-[oklch(0.72_0.14_180_/_0.08)] transition-all"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block mt-2 px-4 py-3 bg-[oklch(0.72_0.14_180)] text-[oklch(0.13_0.02_250)] text-center font-semibold rounded-lg"
              >
                احصل على عرض
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

/* ───────── hero ───────── */
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Animated circles */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[oklch(0.72_0.14_180_/_0.06)] blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[oklch(0.65_0.16_200_/_0.05)] blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-2xl overflow-hidden glow-teal animate-pulse-glow">
            <img src="/logo.png" alt="شعار اكسيس" className="w-full h-full object-contain p-2" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="gradient-text">اكسيس</span>
          <br />
          <span className="text-[oklch(0.90_0.005_250)]">للحلول الهندسية المتقدمة</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-[oklch(0.65_0.02_250)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          نقدم حلولاً هندسية مبتكرة ومتطورة تلبي احتياجات المشاريع الكبرى بأعلى معايير الجودة والكفاءة.
          نحن شركاؤكم في تحويل الرؤى إلى واقع هندسي متقن.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#services"
            className="group px-8 py-4 bg-[oklch(0.72_0.14_180)] text-[oklch(0.13_0.02_250)] font-bold rounded-xl hover:bg-[oklch(0.75_0.15_180)] transition-all duration-300 glow-teal flex items-center gap-2"
          >
            اكتشف خدماتنا
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-[oklch(0.72_0.14_180_/_0.3)] text-[oklch(0.72_0.14_180)] font-semibold rounded-xl hover:bg-[oklch(0.72_0.14_180_/_0.1)] hover:border-[oklch(0.72_0.14_180_/_0.6)] transition-all duration-300"
          >
            تواصل معنا
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-[oklch(0.50_0.02_250)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ───────── about ───────── */
function About() {
  const features = [
    { icon: <Target className="w-6 h-6" />, title: 'رؤية واضحة', desc: 'نسعى لأن نكون الرواد في تقديم الحلول الهندسية المبتكرة التي تتخطى التوقعات' },
    { icon: <Shield className="w-6 h-6" />, title: 'جودة لا تُضاهى', desc: 'نلتزم بأعلى المعايير الدولية في كل تفصيلة هندسية نقدمها' },
    { icon: <Zap className="w-6 h-6" />, title: 'ابتكار مستمر', desc: 'نوظف أحدث التقنيات والمنهجيات لتقديم حلول ذكية ومستدامة' },
  ]

  return (
    <Section id="about" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text side */}
          <div>
            <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">من نحن</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-6 leading-tight">
              نصنع المستقبل <br />
              <span className="gradient-text">بالهندسة والإبداع</span>
            </h2>
            <p className="text-[oklch(0.65_0.02_250)] text-lg leading-relaxed mb-8">
              شركة اكسيس للحلول الهندسية المتقدمة هي شركة رائدة متخصصة في تقديم الحلول الهندسية الشاملة والمتكاملة.
              نجمع بين الخبرة العميقة والابتكار المستمر لنقدم لعملائنا خدمات هندسية استثنائية تلبي تطلعاتهم وتتجاوز توقعاتهم.
            </p>
            <p className="text-[oklch(0.55_0.02_250)] leading-relaxed mb-8">
              منذ تأسيسها، عملت اكسيس على تنفيذ مجموعة واسعة من المشاريع الهندسية المعقدة في مختلف القطاعات،
              من المباني التجارية والسكنية إلى المنشآت الصناعية والبنية التحتية، مع التزام تام بالجودة والسلامة والاستدامة.
            </p>
            <div className="space-y-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-start gap-4 p-4 rounded-xl border border-[oklch(0.30_0.03_250)] bg-[oklch(0.17_0.02_250)] hover:border-[oklch(0.72_0.14_180_/_0.3)] transition-all duration-300"
                >
                  <div className="p-3 rounded-lg bg-[oklch(0.72_0.14_180_/_0.1)] text-[oklch(0.72_0.14_180)] shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[oklch(0.90_0.005_250)] mb-1">{f.title}</h3>
                    <p className="text-sm text-[oklch(0.55_0.02_250)]">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visual side */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Decorative circles */}
              <div className="absolute inset-8 rounded-full border border-[oklch(0.72_0.14_180_/_0.15)]" />
              <div className="absolute inset-16 rounded-full border border-[oklch(0.72_0.14_180_/_0.1)]" />
              <div className="absolute inset-24 rounded-full border border-dashed border-[oklch(0.72_0.14_180_/_0.08)]" />

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-2xl bg-[oklch(0.72_0.14_180_/_0.1)] border border-[oklch(0.72_0.14_180_/_0.2)] flex items-center justify-center glow-teal-sm">
                  <DraftingCompass className="w-16 h-16 text-[oklch(0.72_0.14_180)]" />
                </div>
              </div>

              {/* Floating items */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-8 right-8 p-4 rounded-xl bg-[oklch(0.17_0.02_250)] border border-[oklch(0.30_0.03_250)] shadow-xl"
              >
                <Building2 className="w-8 h-8 text-[oklch(0.72_0.14_180)]" />
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-8 left-8 p-4 rounded-xl bg-[oklch(0.17_0.02_250)] border border-[oklch(0.30_0.03_250)] shadow-xl"
              >
                <HardHat className="w-8 h-8 text-[oklch(0.65_0.16_200)]" />
              </motion.div>
              <motion.div
                animate={{ y: [-3, 6, -3] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-1/2 left-0 -translate-y-1/2 p-4 rounded-xl bg-[oklch(0.17_0.02_250)] border border-[oklch(0.30_0.03_250)] shadow-xl"
              >
                <Ruler className="w-8 h-8 text-[oklch(0.80_0.10_160)]" />
              </motion.div>
              <motion.div
                animate={{ y: [3, -6, 3] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-1/2 right-0 -translate-y-1/2 p-4 rounded-xl bg-[oklch(0.17_0.02_250)] border border-[oklch(0.30_0.03_250)] shadow-xl"
              >
                <Compass className="w-8 h-8 text-[oklch(0.60_0.18_30)]" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ───────── services ───────── */
function Services() {
  const services = [
    {
      icon: <Building2 className="w-7 h-7" />,
      title: 'التصميم الإنشائي',
      desc: 'تصميم إنشائي متقن للمباني والمنشآت باستخدام أحدث البرامج والمعايير الدولية لضمان السلامة والاستدامة',
    },
    {
      icon: <Cog className="w-7 h-7" />,
      title: 'الاستشارات الهندسية',
      desc: 'تقديم استشارات هندسية شاملة من خلال فريق من الخبراء المتخصصين لمساعدة العملاء في اتخاذ القرارات الصائبة',
    },
    {
      icon: <HardHat className="w-7 h-7" />,
      title: 'إدارة المشاريع',
      desc: 'إدارة متكاملة للمشاريع الهندسية من مرحلة التخطيط وحتى التسليم النهائي مع الالتزام بالجدول الزمني والميزانية',
    },
    {
      icon: <Factory className="w-7 h-7" />,
      title: 'الأنظمة الميكانيكية والكهربائية',
      desc: 'تصميم وتنفيذ أنظمة MEP متكاملة تشمل التكييف والتهوية والسباكة والأنظمة الكهربائية بأعلى كفاءة',
    },
    {
      icon: <Calculator className="w-7 h-7" />,
      title: 'التكاليف والمقايسات',
      desc: 'إعداد المقايسات التفصيلية وتقدير التكاليف بدقة عالية لضمان التحكم المالي الفعال في المشروعات',
    },
    {
      icon: <BarChart3 className="w-7 h-7" />,
      title: 'الإشراف والمتابعة',
      desc: 'إشراف ميداني دقيق على جميع مراحل التنفيذ لضمان مطابقة الأعمال للمواصفات والمعايير المعتمدة',
    },
  ]

  return (
    <Section id="services" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">خدماتنا</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            حلول هندسية <span className="gradient-text">شاملة ومتكاملة</span>
          </h2>
          <p className="text-[oklch(0.55_0.02_250)] max-w-2xl mx-auto">
            نقدم مجموعة متكاملة من الخدمات الهندسية المتخصصة التي تغطي جميع مراحل المشروع من التخطيط إلى التنفيذ
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-6 rounded-2xl border border-[oklch(0.30_0.03_250)] bg-[oklch(0.17_0.02_250)] hover:border-[oklch(0.72_0.14_180_/_0.4)] hover:bg-[oklch(0.19_0.02_250)] transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[oklch(0.72_0.14_180_/_0.05)] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="p-3 rounded-xl bg-[oklch(0.72_0.14_180_/_0.1)] text-[oklch(0.72_0.14_180)] w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-[oklch(0.90_0.005_250)] mb-3">{s.title}</h3>
                <p className="text-[oklch(0.55_0.02_250)] leading-relaxed text-sm">{s.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-[oklch(0.72_0.14_180)] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>المزيد</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ───────── stats ───────── */
function Stats() {
  const stats = [
    { value: 250, suffix: '+', label: 'مشروع منجز', icon: <Building2 className="w-6 h-6" /> },
    { value: 120, suffix: '+', label: 'عميل راضٍ', icon: <Users className="w-6 h-6" /> },
    { value: 15, suffix: '+', label: 'سنوات خبرة', icon: <Wrench className="w-6 h-6" /> },
    { value: 98, suffix: '%', label: 'نسبة الرضا', icon: <Star className="w-6 h-6" /> },
  ]

  return (
    <Section id="stats" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[oklch(0.72_0.14_180_/_0.06)] rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative p-6 sm:p-8 rounded-2xl border border-[oklch(0.30_0.03_250)] bg-[oklch(0.17_0.02_250)]/80 backdrop-blur text-center group hover:border-[oklch(0.72_0.14_180_/_0.3)] transition-all duration-300"
            >
              <div className="mb-4 flex justify-center">
                <div className="p-3 rounded-xl bg-[oklch(0.72_0.14_180_/_0.1)] text-[oklch(0.72_0.14_180)] group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-2">
                <Counter end={s.value} suffix={s.suffix} />
              </div>
              <div className="text-[oklch(0.55_0.02_250)] text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ───────── projects ───────── */
function Projects() {
  const projects = [
    {
      title: 'برج النخيل التجاري',
      category: 'مباني تجارية',
      desc: 'تصميم إنشائي متكامل لبرج تجاري يضم 35 طابقاً بأحدث المعايير الدولية للسلامة والاستدامة',
      tags: ['تصميم إنشائي', 'MEP', 'إدارة مشروع'],
    },
    {
      title: 'مجمع الواحة السكني',
      category: 'مباني سكنية',
      desc: 'مشروع سكني متكامل يضم 200 وحدة سكنية مع مرافق خدمية وحدائق ومساحات خضراء',
      tags: ['تصميم معماري', 'إشراف', 'مقايسات'],
    },
    {
      title: 'مصنع الخليج الصناعي',
      category: 'منشآت صناعية',
      desc: 'تصميم وتنفيذ منشأة صناعية متطورة بمساحة 50,000 م² تشمل خطوط إنتاج ومستودعات',
      tags: ['تصميم إنشائي', 'MEP', 'إدارة مشروع'],
    },
    {
      title: 'مشروع المترو المركزي',
      category: 'بنية تحتية',
      desc: 'استشارات هندسية وإشراف على تنفيذ محطات المترو والأنفاق ضمن المشروع المركزي للنقل',
      tags: ['استشارات', 'إشراف', 'سلامة'],
    },
  ]

  return (
    <Section id="projects" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">مشاريعنا</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            أعمال نفتخر <span className="gradient-text">بتنفيذها</span>
          </h2>
          <p className="text-[oklch(0.55_0.02_250)] max-w-2xl mx-auto">
            نفخر بتقديم سجل حافل من المشاريع الناجحة التي تعكس خبرتنا وجودة عملنا
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group relative p-6 sm:p-8 rounded-2xl border border-[oklch(0.30_0.03_250)] bg-[oklch(0.17_0.02_250)] hover:border-[oklch(0.72_0.14_180_/_0.4)] transition-all duration-500 overflow-hidden"
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-[oklch(0.72_0.14_180_/_0.04)] rounded-br-full" />

              <div className="relative">
                <span className="text-xs font-medium text-[oklch(0.72_0.14_180)] bg-[oklch(0.72_0.14_180_/_0.1)] px-3 py-1 rounded-full">
                  {p.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[oklch(0.90_0.005_250)] mt-4 mb-3">{p.title}</h3>
                <p className="text-[oklch(0.55_0.02_250)] leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t, j) => (
                    <span key={j} className="text-xs px-3 py-1 rounded-full border border-[oklch(0.30_0.03_250)] text-[oklch(0.55_0.02_250)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ───────── testimonials ───────── */
function Testimonials() {
  const testimonials = [
    {
      name: 'م. أحمد الراشد',
      role: 'مدير مشاريع - مجموعة الراشد',
      text: 'تعاملنا مع اكسيس في عدة مشاريع وكانت النتائج مبهرة. احترافية عالية والتزام تام بالمواعيد والمواصفات.',
    },
    {
      name: 'م. سارة المنصور',
      role: 'مهندسة مدنية - شركة البناء المتقدمة',
      text: 'فريق اكسيس يتحلى بالدقة والإبداع في التصميم الإنشائي. حلول مبتكرة وواقعية في آن واحد.',
    },
    {
      name: 'أ. خليل العمري',
      role: 'رئيس مجلس الإدارة - العمري القابضة',
      text: 'شراكتنا مع اكسيس أثمرت عن نتائج ممتازة. فريق متميز يفهم احتياجات العميل ويقدم أفضل الحلول.',
    },
  ]

  return (
    <Section id="testimonials" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">آراء عملائنا</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            ثقة <span className="gradient-text">عملائنا</span> هي شهادتنا
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-6 rounded-2xl border border-[oklch(0.30_0.03_250)] bg-[oklch(0.17_0.02_250)] hover:border-[oklch(0.72_0.14_180_/_0.3)] transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[oklch(0.72_0.14_180)] text-[oklch(0.72_0.14_180)]" />
                ))}
              </div>
              <p className="text-[oklch(0.70_0.01_250)] leading-relaxed mb-6 text-sm">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[oklch(0.72_0.14_180_/_0.15)] flex items-center justify-center text-[oklch(0.72_0.14_180)] font-bold text-sm">
                  {t.name.charAt(2)}
                </div>
                <div>
                  <div className="font-semibold text-[oklch(0.90_0.005_250)] text-sm">{t.name}</div>
                  <div className="text-[oklch(0.50_0.02_250)] text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ───────── why us ───────── */
function WhyUs() {
  const reasons = [
    { icon: <CheckCircle2 className="w-5 h-5" />, text: 'فريق من المهندسين المعتمدين والخبراء المتخصصين' },
    { icon: <CheckCircle2 className="w-5 h-5" />, text: 'التزام تام بالمعايير الدولية والمواصفات المحلية' },
    { icon: <CheckCircle2 className="w-5 h-5" />, text: 'استخدام أحدث التقنيات والبرامج الهندسية' },
    { icon: <CheckCircle2 className="w-5 h-5" />, text: 'تسليم المشاريع في الوقت المحدد وبالميزانية المتفق عليها' },
    { icon: <CheckCircle2 className="w-5 h-5" />, text: 'دعم فني متواصل بعد تسليم المشروع' },
    { icon: <CheckCircle2 className="w-5 h-5" />, text: 'حلول مستدامة صديقة للبيئة' },
  ]

  return (
    <Section id="why-us" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[oklch(0.72_0.14_180_/_0.04)] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">لماذا اكسيس</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-6 leading-tight">
              شريكك الهندسي <span className="gradient-text">الأمثل</span>
            </h2>
            <p className="text-[oklch(0.55_0.02_250)] leading-relaxed mb-8">
              نتميز عن غيرنا بمزيج فريد من الخبرة العميقة والابتكار المستمر والالتزام الثابت بتحقيق أعلى مستويات الجودة.
              نحن لا نقدم خدمات هندسية فحسب، بل نبني شراكات طويلة الأمد مع عملائنا.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {reasons.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[oklch(0.72_0.14_180)] shrink-0 mt-0.5" />
                  <span className="text-[oklch(0.70_0.01_250)] text-sm">{r.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Decorative visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[oklch(0.72_0.14_180_/_0.2)] animate-spin" style={{ animationDuration: '30s' }} />
              <div className="absolute inset-8 rounded-full border border-[oklch(0.72_0.14_180_/_0.1)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden glow-teal mb-4">
                    <img src="/logo.png" alt="اكسيس" className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="text-[oklch(0.72_0.14_180)] font-bold text-lg">اكسيس</div>
                  <div className="text-[oklch(0.50_0.02_250)] text-xs">حلول هندسية متقدمة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ───────── contact ───────── */
function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  const contactInfo = [
    { icon: <Phone className="w-5 h-5" />, label: 'اتصل بنا', value: '+966 12 345 6789' },
    { icon: <Mail className="w-5 h-5" />, label: 'البريد الإلكتروني', value: 'info@access-eng.com' },
    { icon: <MapPin className="w-5 h-5" />, label: 'العنوان', value: 'الرياض، المملكة العربية السعودية' },
  ]

  return (
    <Section id="contact" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">تواصل معنا</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            لنبدأ <span className="gradient-text">مشروعك القادم</span>
          </h2>
          <p className="text-[oklch(0.55_0.02_250)] max-w-2xl mx-auto">
            تواصل معنا اليوم لمناقشة متطلبات مشروعك والحصول على استشارة مجانية من خبرائنا
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-xl border border-[oklch(0.30_0.03_250)] bg-[oklch(0.17_0.02_250)] hover:border-[oklch(0.72_0.14_180_/_0.3)] transition-all"
              >
                <div className="p-3 rounded-lg bg-[oklch(0.72_0.14_180_/_0.1)] text-[oklch(0.72_0.14_180)] shrink-0">
                  {c.icon}
                </div>
                <div>
                  <div className="text-sm text-[oklch(0.50_0.02_250)]">{c.label}</div>
                  <div className="text-[oklch(0.90_0.005_250)] font-medium mt-1" dir="ltr">{c.value}</div>
                </div>
              </motion.div>
            ))}

            {/* Map placeholder */}
            <div className="rounded-xl border border-[oklch(0.30_0.03_250)] bg-[oklch(0.17_0.02_250)] overflow-hidden h-48 relative">
              <div className="absolute inset-0 grid-pattern opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-[oklch(0.72_0.14_180)] mx-auto mb-2" />
                  <p className="text-[oklch(0.55_0.02_250)] text-sm">الرياض، المملكة العربية السعودية</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 p-6 sm:p-8 rounded-2xl border border-[oklch(0.30_0.03_250)] bg-[oklch(0.17_0.02_250)]"
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-[oklch(0.60_0.01_250)] mb-2">الاسم الكامل</label>
                <input
                  type="text"
                  placeholder="أدخل اسمك"
                  className="w-full px-4 py-3 rounded-xl bg-[oklch(0.22_0.03_250)] border border-[oklch(0.30_0.03_250)] text-[oklch(0.90_0.005_250)] placeholder:text-[oklch(0.40_0.02_250)] focus:border-[oklch(0.72_0.14_180)] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-[oklch(0.60_0.01_250)] mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  dir="ltr"
                  className="w-full px-4 py-3 rounded-xl bg-[oklch(0.22_0.03_250)] border border-[oklch(0.30_0.03_250)] text-[oklch(0.90_0.005_250)] placeholder:text-[oklch(0.40_0.02_250)] focus:border-[oklch(0.72_0.14_180)] focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-[oklch(0.60_0.01_250)] mb-2">رقم الهاتف</label>
              <input
                type="tel"
                placeholder="+966 XX XXX XXXX"
                dir="ltr"
                className="w-full px-4 py-3 rounded-xl bg-[oklch(0.22_0.03_250)] border border-[oklch(0.30_0.03_250)] text-[oklch(0.90_0.005_250)] placeholder:text-[oklch(0.40_0.02_250)] focus:border-[oklch(0.72_0.14_180)] focus:outline-none transition-colors"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-[oklch(0.60_0.01_250)] mb-2">نوع الخدمة</label>
              <select className="w-full px-4 py-3 rounded-xl bg-[oklch(0.22_0.03_250)] border border-[oklch(0.30_0.03_250)] text-[oklch(0.90_0.005_250)] focus:border-[oklch(0.72_0.14_180)] focus:outline-none transition-colors appearance-none">
                <option value="">اختر الخدمة المطلوبة</option>
                <option value="structural">التصميم الإنشائي</option>
                <option value="consulting">الاستشارات الهندسية</option>
                <option value="management">إدارة المشاريع</option>
                <option value="mep">الأنظمة الميكانيكية والكهربائية</option>
                <option value="cost">التكاليف والمقايسات</option>
                <option value="supervision">الإشراف والمتابعة</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm text-[oklch(0.60_0.01_250)] mb-2">تفاصيل المشروع</label>
              <textarea
                rows={4}
                placeholder="اكتب تفاصيل مشروعك هنا..."
                className="w-full px-4 py-3 rounded-xl bg-[oklch(0.22_0.03_250)] border border-[oklch(0.30_0.03_250)] text-[oklch(0.90_0.005_250)] placeholder:text-[oklch(0.40_0.02_250)] focus:border-[oklch(0.72_0.14_180)] focus:outline-none transition-colors resize-none"
              />
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2 py-3 text-[oklch(0.72_0.14_180)] font-semibold"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  تم إرسال رسالتك بنجاح!
                </motion.div>
              ) : (
                <motion.button
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[oklch(0.72_0.14_180)] text-[oklch(0.13_0.02_250)] font-bold rounded-xl hover:bg-[oklch(0.75_0.15_180)] transition-all duration-300 glow-teal-sm"
                >
                  <Send className="w-5 h-5" />
                  إرسال الرسالة
                </motion.button>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </Section>
  )
}

/* ───────── footer ───────── */
function Footer() {
  return (
    <footer className="border-t border-[oklch(0.30_0.03_250)] bg-[oklch(0.11_0.02_250)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <img src="/logo.png" alt="اكسيس" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-bold gradient-text">اكسيس</span>
                <span className="block text-[10px] text-[oklch(0.50_0.02_250)]">للحلول الهندسية المتقدمة</span>
              </div>
            </div>
            <p className="text-[oklch(0.50_0.02_250)] text-sm leading-relaxed">
              شريكك الهندسي الموثوق لحلول مبتكرة ومتطورة تلبي تطلعاتك وتتجاوز توقعاتك
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[oklch(0.90_0.005_250)] font-semibold mb-4">روابط سريعة</h4>
            <div className="space-y-2">
              {['الرئيسية', 'من نحن', 'خدماتنا', 'مشاريعنا', 'تواصل معنا'].map((l, i) => (
                <a key={i} href={`#${['hero', 'about', 'services', 'projects', 'contact'][i]}`} className="block text-[oklch(0.50_0.02_250)] hover:text-[oklch(0.72_0.14_180)] text-sm transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[oklch(0.90_0.005_250)] font-semibold mb-4">خدماتنا</h4>
            <div className="space-y-2">
              {['التصميم الإنشائي', 'الاستشارات الهندسية', 'إدارة المشاريع', 'أنظمة MEP', 'التكاليف والمقايسات'].map((s, i) => (
                <span key={i} className="block text-[oklch(0.50_0.02_250)] text-sm">{s}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[oklch(0.90_0.005_250)] font-semibold mb-4">تواصل معنا</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[oklch(0.50_0.02_250)] text-sm">
                <Phone className="w-4 h-4 text-[oklch(0.72_0.14_180)]" />
                <span dir="ltr">+966 12 345 6789</span>
              </div>
              <div className="flex items-center gap-2 text-[oklch(0.50_0.02_250)] text-sm">
                <Mail className="w-4 h-4 text-[oklch(0.72_0.14_180)]" />
                <span dir="ltr">info@access-eng.com</span>
              </div>
              <div className="flex items-center gap-2 text-[oklch(0.50_0.02_250)] text-sm">
                <MapPin className="w-4 h-4 text-[oklch(0.72_0.14_180)]" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-[oklch(0.30_0.03_250)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[oklch(0.40_0.02_250)] text-sm">
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} اكسيس للحلول الهندسية المتقدمة
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[oklch(0.40_0.02_250)] hover:text-[oklch(0.72_0.14_180)] text-xs transition-colors">سياسة الخصوصية</a>
            <a href="#" className="text-[oklch(0.40_0.02_250)] hover:text-[oklch(0.72_0.14_180)] text-xs transition-colors">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ───────── main page ───────── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Stats />
        <Services />
        <Projects />
        <WhyUs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
