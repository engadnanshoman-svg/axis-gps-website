'use client'

import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import dynamic from 'next/dynamic'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Building2, Cog, HardHat, Wrench, Phone, Mail, MapPin,
  ChevronDown, ArrowLeft, Menu, X, CheckCircle2, Users,
  Target, Zap, Shield, ArrowUpRight, Send, Star,
  Ruler, Compass, DraftingCompass, Factory, Calculator, BarChart3,
  Satellite, ScanLine, GraduationCap, Monitor, Radio, Gauge, MessageCircle,
  FileText, BookOpen, Globe, Award, Eye, Lock, Download, Quote, MapPinned,
  Sun, Moon
} from 'lucide-react'

/* ───────── dynamic map import (no SSR) ───────── */
const BranchMap = dynamic(() => import('./BranchMap'), { ssr: false })

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

/* ───────── social icons ───────── */
const SOCIALS = [
  { name: 'WhatsApp', href: 'https://wa.me/972525289999', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  )},
  { name: 'Facebook', href: 'https://www.facebook.com/axisTRIMBLE', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  )},
  { name: 'YouTube', href: 'https://www.youtube.com/@axisgpssurveyinginstrument8400', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  )},
  { name: 'Instagram', href: 'https://www.instagram.com/axis.gps/', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
  )},
]

/* ───────── theme hook ───────── */
function useTheme() {
  const [theme, setTheme] = React.useState<'dark' | 'light'>('dark')
  useEffect(() => {
    const saved = localStorage.getItem('axis-theme') as 'dark' | 'light' | null
    if (saved) {
      setTheme(saved)
      document.documentElement.setAttribute('data-theme', saved)
    }
  }, [])
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('axis-theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }
  return { theme, toggle }
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
  const { theme, toggle: toggleTheme } = useTheme()
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const links = [
    { href: '#hero', label: 'الرئيسية', icon: undefined },
    { href: '#branches', label: 'فروعنا', icon: <MapPinned className="w-4 h-4" /> },
    { href: '#about', label: 'من نحن', icon: undefined },
    { href: '#services', label: 'خدماتنا', icon: undefined },
    { href: '#team', label: 'فريقنا', icon: undefined },
    { href: '#documents', label: 'تعرف اكثر علينا', icon: undefined },
    { href: '#gallery', label: 'المعرض', icon: undefined },
    { href: '#contact', label: 'تواصل معنا', icon: undefined },
  ]

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--bg-1-90)] backdrop-blur-xl border-b border-[var(--b-1)] shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden glow-teal-sm transition-all duration-300 group-hover:scale-110">
              <img src="/logo.png" alt="اكسيس" className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold gradient-text">اكسيس</span>
              <span className="block text-[10px] text-[var(--t-5)] tracking-wider">للحلول الهندسية المتقدمة</span>
            </div>
          </a>

          {/* Desktop Links + Theme Toggle */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-sm text-[var(--t-3)] hover:text-[oklch(0.72_0.14_180)] rounded-lg hover:bg-[var(--accent-bg-xs)] transition-all duration-300"
              >
                <span className="flex items-center gap-1.5">
                  {l.icon}
                  {l.label}
                </span>
              </a>
            ))}
            <a
              href="#contact"
              className="mr-2 px-5 py-2.5 bg-[oklch(0.72_0.14_180)] text-[oklch(0.13_0.02_250)] text-sm font-semibold rounded-lg hover:bg-[oklch(0.75_0.15_180)] transition-all duration-300 glow-teal-sm"
            >
              احصل على عرض
            </a>
            {/* Social icons */}
            <div className="flex items-center gap-2 mr-3 border-r border-[var(--b-1)] pr-3">
              {SOCIALS.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  className="text-[var(--t-8)] hover:text-[oklch(0.72_0.14_180)] transition-colors duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            {/* Desktop Theme toggle - INLINE SVG for guaranteed visibility */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 hover:scale-110 shrink-0"
              style={{
                width: '48px',
                height: '48px',
                minWidth: '48px',
                background: theme === 'dark' ? 'linear-gradient(135deg, #facc15, #f59e0b)' : 'linear-gradient(135deg, #1e293b, #0f172a)',
                color: theme === 'dark' ? '#0f172a' : '#facc15',
                border: '3px solid ' + (theme === 'dark' ? '#eab308' : '#475569'),
                boxShadow: theme === 'dark'
                  ? '0 0 20px rgba(250,204,21,0.6), 0 0 40px rgba(250,204,21,0.2)'
                  : '0 0 20px rgba(30,41,59,0.4), 0 0 40px rgba(100,116,139,0.15)',
                position: 'relative',
                zIndex: 9999,
                isolation: 'isolate',
              }}
              aria-label={theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي'}
              title={theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي'}
            >
              {theme === 'dark' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile: Theme toggle + Menu button */}
          <div className="flex md:hidden items-center gap-3">
            {/* Mobile Theme toggle - INLINE SVG for guaranteed visibility */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 hover:scale-110 shrink-0"
              style={{
                width: '48px',
                height: '48px',
                minWidth: '48px',
                background: theme === 'dark' ? 'linear-gradient(135deg, #facc15, #f59e0b)' : 'linear-gradient(135deg, #1e293b, #0f172a)',
                color: theme === 'dark' ? '#0f172a' : '#facc15',
                border: '3px solid ' + (theme === 'dark' ? '#eab308' : '#475569'),
                boxShadow: theme === 'dark'
                  ? '0 0 20px rgba(250,204,21,0.6), 0 0 40px rgba(250,204,21,0.2)'
                  : '0 0 20px rgba(30,41,59,0.4), 0 0 40px rgba(100,116,139,0.15)',
                position: 'relative',
                zIndex: 9999,
                isolation: 'isolate',
              }}
              aria-label={theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي'}
              title={theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي'}
            >
              {theme === 'dark' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[var(--t-3)]"
              aria-label="القائمة"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--bg-1-95)] backdrop-blur-xl border-t border-[var(--b-1)] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-[var(--t-3)] hover:text-[oklch(0.72_0.14_180)] rounded-lg hover:bg-[var(--accent-bg-xs)] transition-all"
                >
                  {l.icon}
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => { toggleTheme(); setMobileOpen(false) }}
                className="flex items-center gap-2 w-full px-4 py-3 text-[oklch(0.65_0.02_250)] hover:text-[oklch(0.72_0.14_180)] rounded-lg hover:bg-[oklch(0.72_0.14_180_/_0.08)] transition-all"
              >
                {theme === 'dark' ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
                {theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي'}
              </button>
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

/* ───────── customer cinema images ───────── */
const CUSTOMER_IMAGES = [
  { src: '/customers/field-surveyor.jpg', alt: 'مسح ميداني بأجهزة Trimble' },
  { src: '/customers/navvis-scanning.jpg', alt: 'مسح ضوئي ثلاثي الأبعاد NavVis' },
  { src: '/customers/trimble-gnss.jpg', alt: 'جهاز GNSS Trimble للمسح الدقيق' },
  { src: '/customers/navvis-team.jpg', alt: 'فريق المسح بأجهزة NavVis' },
  { src: '/customers/gps-rover.jpg', alt: 'جهاز GPS Rover للمسح الميداني' },
  { src: '/customers/trimble-tripod.jpg', alt: 'محطة Trimble على ثلاثية القوائم' },
]

const CUSTOMER_IMAGES_LEFT = [
  { src: '/customers/navvis-industrial.jpg', alt: 'مسح صناعي بأجهزة NavVis' },
  { src: '/customers/surveyor-site.jpg', alt: 'مسح موقع إنشائي' },
  { src: '/customers/cat-excavator.jpg', alt: 'أنظمة التحكم بالآلات الثقيلة' },
  { src: '/customers/navvis-screen.jpg', alt: 'نماذج ثلاثية الأبعاد للمباني' },
  { src: '/customers/field-surveyor.jpg', alt: 'خبير مسح ميداني' },
  { src: '/customers/trimble-gnss.jpg', alt: 'تقنية GNSS المتقدمة' },
]

/* ───────── cinematic hero ───────── */
function Hero() {
  const [phase, setPhase] = useState<'converge' | 'merge' | 'reveal' | 'content'>('converge')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('merge'), 2200)
    const t2 = setTimeout(() => setPhase('reveal'), 3200)
    const t3 = setTimeout(() => setPhase('content'), 4200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  /* Tech icons that converge from the EDGES of the screen */
  const TECH_ITEMS = [
    { icon: <Satellite className="w-5 h-5 sm:w-7 sm:h-7" />, label: 'GPS', color: 'oklch(0.72 0.14 180)', angle: 0 },
    { icon: <Compass className="w-5 h-5 sm:w-7 sm:h-7" />, label: 'GNSS', color: 'oklch(0.75 0.15 200)', angle: 30 },
    { icon: <ScanLine className="w-5 h-5 sm:w-7 sm:h-7" />, label: '3D Scan', color: 'oklch(0.80 0.10 160)', angle: 60 },
    { icon: <Ruler className="w-5 h-5 sm:w-7 sm:h-7" />, label: 'RTK', color: 'oklch(0.72 0.14 180)', angle: 90 },
    { icon: <Monitor className="w-5 h-5 sm:w-7 sm:h-7" />, label: 'GIS', color: 'oklch(0.65 0.16 200)', angle: 120 },
    { icon: <Gauge className="w-5 h-5 sm:w-7 sm:h-7" />, label: 'VRS', color: 'oklch(0.80 0.10 160)', angle: 150 },
    { icon: <DraftingCompass className="w-5 h-5 sm:w-7 sm:h-7" />, label: 'Mapping', color: 'oklch(0.72 0.14 180)', angle: 180 },
    { icon: <Factory className="w-5 h-5 sm:w-7 sm:h-7" />, label: 'Machine', color: 'oklch(0.75 0.15 200)', angle: 210 },
    { icon: <Radio className="w-5 h-5 sm:w-7 sm:h-7" />, label: 'HD Map', color: 'oklch(0.65 0.16 200)', angle: 240 },
    { icon: <GraduationCap className="w-5 h-5 sm:w-7 sm:h-7" />, label: 'Campus', color: 'oklch(0.80 0.10 160)', angle: 270 },
    { icon: <Cog className="w-5 h-5 sm:w-7 sm:h-7" />, label: 'TBC', color: 'oklch(0.72 0.14 180)', angle: 300 },
    { icon: <BarChart3 className="w-5 h-5 sm:w-7 sm:h-7" />, label: 'Smart', color: 'oklch(0.75 0.15 200)', angle: 330 },
  ]

  /* Brand names orbiting */
  const BRANDS = [
    { name: 'Trimble', color: '#FFC107' },
    { name: 'NavVis', color: '#3B82F6' },
    { name: 'Spectra', color: '#06B6D4' },
    { name: 'Applanix', color: '#10B981' },
    { name: 'DJI', color: '#F97316' },
    { name: 'Kaarta', color: '#8B5CF6' },
  ]

  /* Positions far from center (screen edges) for each tech icon */
  const getEdgePos = (angle: number) => {
    const rad = (angle * Math.PI) / 180
    const dist = 48 + Math.random() * 4 // 48-52% from center = near edges
    return {
      x: `${50 + dist * Math.cos(rad)}%`,
      y: `${50 + dist * Math.sin(rad)}%`,
    }
  }

  const isConverging = phase === 'converge' || phase === 'merge'
  const showLogo = phase === 'reveal' || phase === 'content'
  const showContent = phase === 'content'

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Animated background circles */}
      <motion.div
        animate={phase === 'reveal' ? { scale: [1, 1.5, 1], opacity: [0.06, 0.15, 0.06] } : {}}
        transition={{ duration: 1.5 }}
        className="absolute top-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[oklch(0.72_0.14_180_/_0.06)] blur-3xl animate-float"
      />
      <motion.div
        animate={phase === 'reveal' ? { scale: [1, 1.4, 1], opacity: [0.05, 0.12, 0.05] } : {}}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute bottom-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[oklch(0.65_0.16_200_/_0.05)] blur-3xl animate-float"
        style={{ animationDelay: '3s' }}
      />

      {/* ── Phase 1 & 2: Tech icons converging from EDGES ── */}
      <div className="absolute inset-0 pointer-events-none">
        {TECH_ITEMS.map((tech, i) => {
          const edge = getEdgePos(tech.angle)
          return (
            <motion.div
              key={i}
              initial={{ x: edge.x, y: edge.y, scale: 0, opacity: 0, rotate: -180 }}
              animate={
                phase === 'converge'
                  ? { x: edge.x, y: edge.y, scale: 1, opacity: 1, rotate: 0 }
                  : phase === 'merge'
                  ? { x: '50%', y: '50%', scale: 1.2, opacity: 0.8, rotate: 360 }
                  : { x: '50%', y: '50%', scale: 0, opacity: 0, rotate: 720 }
              }
              transition={{
                duration: phase === 'converge' ? 1.2 : phase === 'merge' ? 1.0 : 0.6,
                delay: phase === 'converge' ? i * 0.1 : phase === 'merge' ? i * 0.04 : i * 0.02,
                ease: phase === 'converge' ? 'easeOut' : phase === 'merge' ? [0.43, 0.13, 0.23, 0.96] : 'easeIn',
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
              style={{ color: tech.color, zIndex: 20 }}
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-[var(--bg-2-80)] backdrop-blur-sm border border-[var(--b-1)]/50 flex items-center justify-center"
                style={{ boxShadow: `0 0 20px ${tech.color}33` }}
              >
                {tech.icon}
              </div>
              <span className="text-[10px] sm:text-xs font-bold tracking-wider" style={{ color: tech.color }}>{tech.label}</span>
            </motion.div>
          )
        })}
      </div>

      {/* ── Brand names converging from edges ── */}
      <div className="absolute inset-0 pointer-events-none">
        {BRANDS.map((brand, i) => {
          const angle = (i * 360 / BRANDS.length)
          const edge = getEdgePos(angle + 15)
          return (
            <motion.div
              key={brand.name}
              initial={{ x: edge.x, y: edge.y, scale: 0, opacity: 0 }}
              animate={
                phase === 'converge'
                  ? { x: edge.x, y: edge.y, scale: 1, opacity: 0.7 }
                  : phase === 'merge'
                  ? { x: '50%', y: '50%', scale: 0.8, opacity: 0.5 }
                  : { x: '50%', y: '50%', scale: 0, opacity: 0 }
              }
              transition={{
                duration: phase === 'converge' ? 1.4 : phase === 'merge' ? 1.0 : 0.5,
                delay: phase === 'converge' ? 0.3 + i * 0.12 : phase === 'merge' ? i * 0.05 : i * 0.02,
                ease: phase === 'converge' ? 'easeOut' : phase === 'merge' ? [0.43, 0.13, 0.23, 0.96] : 'easeIn',
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: 15 }}
            >
              <span
                className="text-sm sm:text-base font-extrabold tracking-[0.2em] uppercase whitespace-nowrap"
                style={{ color: brand.color, textShadow: `0 0 30px ${brand.color}66` }}
              >
                {brand.name}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* ── Convergence energy lines from edges ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 18 }}>
        {isConverging && (
          <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
            {TECH_ITEMS.map((tech, i) => {
              const rad = (tech.angle * Math.PI) / 180
              const dist = 490
              const sx = 500 + dist * Math.cos(rad)
              const sy = 500 + dist * Math.sin(rad)
              return (
                <motion.line
                  key={i}
                  x1={sx} y1={sy} x2="500" y2="500"
                  stroke={tech.color}
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    phase === 'converge'
                      ? { pathLength: 0, opacity: 0 }
                      : phase === 'merge'
                      ? { pathLength: 1, opacity: 0.6 }
                      : { pathLength: 1, opacity: 0 }
                  }
                  transition={{ duration: 0.8, delay: i * 0.04, ease: 'easeInOut' }}
                  style={{ filter: `drop-shadow(0 0 8px ${tech.color})` }}
                />
              )
            })}
          </svg>
        )}
      </div>

      {/* ── Central energy burst on reveal ── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={
          phase === 'reveal'
            ? { scale: [0, 3, 1.5], opacity: [0, 0.8, 0] }
            : phase === 'content'
            ? { scale: 0, opacity: 0 }
            : { scale: 0, opacity: 0 }
        }
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full"
        style={{
          background: 'radial-gradient(circle, oklch(0.72 0.14 180 / 0.6), oklch(0.72 0.14 180 / 0.1), transparent)',
          zIndex: 25,
        }}
      />

      {/* ── Shockwave ring on reveal ── */}
      <motion.div
        initial={{ scale: 0, opacity: 0, borderWidth: 3 }}
        animate={
          phase === 'reveal'
            ? { scale: [0, 2.5, 4], opacity: [0.8, 0.4, 0], borderWidth: [3, 1, 0] }
            : { scale: 0, opacity: 0 }
        }
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-[oklch(0.72_0.14_180)]"
        style={{ zIndex: 24 }}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0, borderWidth: 2 }}
        animate={
          phase === 'reveal'
            ? { scale: [0, 2, 3.5], opacity: [0.6, 0.3, 0], borderWidth: [2, 1, 0] }
            : { scale: 0, opacity: 0 }
        }
        transition={{ duration: 1.5, delay: 0.15, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-[oklch(0.65_0.16_200)]"
        style={{ zIndex: 24 }}
      />

      {/* ── Floating particles (ambient) ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
        {Array.from({ length: 30 }).map((_, i) => {
          const left = Math.random() * 100
          const top = Math.random() * 100
          const size = 1 + Math.random() * 2
          const delay = Math.random() * 4
          const dur = 3 + Math.random() * 4
          return (
            <motion.div
              key={`p-${i}`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                y: [0, -20, 0],
                x: [0, (Math.random() - 0.5) * 10, 0],
              }}
              transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute rounded-full bg-[oklch(0.72_0.14_180)]"
              style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
            />
          )
        })}
      </div>

      {/* ── Orbiting tech icons after reveal (CONTINUOUS SPINNING from edges) ── */}
      <AnimatePresence>
        {showContent && (
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 12 }}>
            {TECH_ITEMS.map((tech, i) => {
              const orbitRadius = 30 + (i % 3) * 7
              return (
                <motion.div
                  key={`orbit-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.4, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.08, duration: 0.5 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ width: `${orbitRadius * 2}%`, height: `${orbitRadius * 2}%` }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'linear' }}
                    className="w-full h-full relative"
                  >
                    <motion.div
                      className="absolute"
                      style={{
                        top: '0%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: tech.color,
                      }}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'linear' }}
                    >
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-[var(--bg-2)]/60 backdrop-blur-sm border border-[var(--b-1)]/30 flex items-center justify-center"
                        style={{ boxShadow: `0 0 12px ${tech.color}22` }}
                      >
                        {React.cloneElement(tech.icon as React.ReactElement, { className: 'w-3.5 h-3.5 sm:w-4 sm:h-4' })}
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        )}
      </AnimatePresence>

      {/* ── Customer showcase cinema screens ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
        {/* Right screen - scrolls up */}
        <div className="absolute top-0 right-0 bottom-0 overflow-hidden" style={{ width: '22%' }}>
          {/* Top/bottom fade */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--bg-0)] to-transparent" style={{ zIndex: 3 }} />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--bg-0)] to-transparent" style={{ zIndex: 3 }} />
          {/* Inner edge fade toward center */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-transparent to-[var(--bg-0)]" style={{ zIndex: 3 }} />
          <div className="cinema-scroll-right pr-2">
            {[...CUSTOMER_IMAGES, ...CUSTOMER_IMAGES, ...CUSTOMER_IMAGES].map((img, i) => (
              <div key={`r-${i}`} className="cinema-card relative group flex-shrink-0 mb-3">
                <div className="rounded-lg overflow-hidden border border-white/15"
                  style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 8px rgba(13,148,136,0.15)' }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-28 sm:h-36 lg:h-44 object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-1 right-1 left-1 px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm">
                  <p className="text-[8px] sm:text-[10px] text-white/90 font-medium truncate">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Left screen - scrolls down */}
        <div className="absolute top-0 left-0 bottom-0 overflow-hidden" style={{ width: '22%' }}>
          {/* Top/bottom fade */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--bg-0)] to-transparent" style={{ zIndex: 3 }} />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--bg-0)] to-transparent" style={{ zIndex: 3 }} />
          {/* Inner edge fade toward center */}
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-transparent to-[var(--bg-0)]" style={{ zIndex: 3 }} />
          <div className="cinema-scroll-left pl-2">
            {[...CUSTOMER_IMAGES_LEFT, ...CUSTOMER_IMAGES_LEFT, ...CUSTOMER_IMAGES_LEFT].map((img, i) => (
              <div key={`l-${i}`} className="cinema-card relative group flex-shrink-0 mb-3">
                <div className="rounded-lg overflow-hidden border border-white/15"
                  style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 8px rgba(13,148,136,0.15)' }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-28 sm:h-36 lg:h-44 object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-1 right-1 left-1 px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm">
                  <p className="text-[8px] sm:text-[10px] text-white/90 font-medium truncate">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content layer ── */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo reveal */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={
            showLogo
              ? { scale: 1, opacity: 1, rotate: 0 }
              : { scale: 0, opacity: 0, rotate: -180 }
          }
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-8"
        >
          <div className="w-28 h-28 sm:w-40 sm:h-40 mx-auto rounded-2xl overflow-hidden animate-pulse-glow"
            style={{ boxShadow: '0 0 40px oklch(0.72 0.14 180 / 0.5), 0 0 80px oklch(0.72 0.14 180 / 0.2), 0 0 120px oklch(0.72 0.14 180 / 0.1)' }}
          >
            <img src="/logo.png" alt="شعار اكسيس" className="w-full h-full object-contain p-2 sm:p-3" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={showContent ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="gradient-text">اكسيس</span>
          <br />
          <span className="text-[var(--t-1)]">للحلول الهندسية المتقدمة</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-[var(--t-5)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          الشركة الرائدة في فلسطين في مجال تقنيات المساحة والجيوماتكس. الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و DJI.
          نقدم أحدث تقنيات GPS و RTK والمسح الضوئي وأنظمة مراقبة التحرك.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
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
            className="px-8 py-4 border border-[oklch(0.72_0.14_180_/_0.3)] text-[oklch(0.72_0.14_180)] font-semibold rounded-xl hover:bg-[var(--accent-bg-sm)] hover:border-[var(--accent-border-lg)] transition-all duration-300"
          >
            تواصل معنا
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-[var(--t-8)]" />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ───────── about ───────── */
function About() {
  const features = [
    { icon: <Target className="w-6 h-6" />, title: 'رؤية واضحة', desc: 'الشركة الرائدة والأكبر في مجال تقنيات ووحلول المساحة والجيوماتكس والمعلومات الجغرافية في فلسطين' },
    { icon: <Shield className="w-6 h-6" />, title: 'وكالات حصرية عالمية', desc: 'الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و DJI و Kaarta العالمية' },
    { icon: <Zap className="w-6 h-6" />, title: 'تقنيات متقدمة', desc: 'نوظف أحدث تقنيات GPS و RTK والمسح الضوئي 3D والواقع المعزز ورسم الخرائط عالية الدقة HD Mapping' },
  ]

  return (
    <Section id="about" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text side */}
          <div>
            <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">من نحن</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-6 leading-tight">
              قيادة تقنيات المساحة <br />
              <span className="gradient-text">في فلسطين</span>
            </h2>
            <p className="text-[var(--t-5)] text-lg leading-relaxed mb-8">
              شركة اكسيس للحلول الهندسية المتقدمة (AXIS GPS & Surveying Instruments LTD) هي الشركة الرائدة والأكبر
              في فلسطين في مجال تقنيات وحلول المساحة والجيوماتكس والمعلومات الجغرافية. نحن الوكيل الحصري لشركات
              Trimble و NavVis و Spectra و Applanix و DJI و Kaarta العالمية، ونقدم أحدث التقنيات والحلول المتكاملة.
            </p>
            <p className="text-[var(--t-7)] leading-relaxed mb-8">
              منذ تأسيسها على يد المهندس سلامة عواودة، تعمل اكسيس في مجالات عديدة تشمل: المسح والجيوماتكس، أنظمة GIS،
              شبكة محطات VRS وخدمات تصحيح الموقع RTK، رسم الخرائط عالية الدقة HD Mapping، المسح المتنقل Mobile Mapping،
              المدن الذكية Smart City، الزراعة الدقيقة، أنظمة توجيه الآلات Machine Control، تقنيات البناء Construction Tech،
              حلول الرصد والمراقبة، والواقع المعزز. تمتلك الشركة أربعة فروع رئيسية في كفر كنا وكفر قاسم
              ورام الله والخليل، ومختبر ومعهد تدريب Axis Campus.
            </p>
            <div className="space-y-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-start gap-4 p-4 rounded-xl border border-[var(--b-1)] bg-[var(--bg-2)] hover:border-[var(--accent-border-sm)] transition-all duration-300"
                >
                  <div className="p-3 rounded-lg bg-[oklch(0.72_0.14_180_/_0.1)] text-[oklch(0.72_0.14_180)] shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--t-1)] mb-1">{f.title}</h3>
                    <p className="text-sm text-[var(--t-7)]">{f.desc}</p>
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
                className="absolute top-8 right-8 p-4 rounded-xl bg-[var(--bg-2)] border border-[var(--b-1)] shadow-xl"
              >
                <Building2 className="w-8 h-8 text-[oklch(0.72_0.14_180)]" />
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-8 left-8 p-4 rounded-xl bg-[var(--bg-2)] border border-[var(--b-1)] shadow-xl"
              >
                <HardHat className="w-8 h-8 text-[oklch(0.65_0.16_200)]" />
              </motion.div>
              <motion.div
                animate={{ y: [-3, 6, -3] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-1/2 left-0 -translate-y-1/2 p-4 rounded-xl bg-[var(--bg-2)] border border-[var(--b-1)] shadow-xl"
              >
                <Ruler className="w-8 h-8 text-[oklch(0.80_0.10_160)]" />
              </motion.div>
              <motion.div
                animate={{ y: [3, -6, 3] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-1/2 right-0 -translate-y-1/2 p-4 rounded-xl bg-[var(--bg-2)] border border-[var(--b-1)] shadow-xl"
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
      icon: <Satellite className="w-7 h-7" />,
      title: 'أجهزة GPS و GNSS',
      desc: 'مستقبلات GNSS وهوائيات ومكونات OEM عالية الدقة للمسح الميداني والقياسات الجيوديسية',
      brands: [
        {
          name: 'Trimble', products: [
            { name: 'R580', img: 'https://images.ctfassets.net/1nvkn1423yot/gJeRON0RN9meNwu9LiC7r/28ded15c873baef48ae4d609e7c7b6e2/geo-r580-productpage-fullbackgroundproducthero-800x960.png', datasheet: 'https://www.geonovus.lt/sites/default/files/022516-677a_trimbler580_datasheet_usl_0923_lrsec_1.pdf' },
            { name: 'R980', img: 'https://images.ctfassets.net/1nvkn1423yot/1jtUB5X0fiJVKIiTfK9zC4/0e41587621af7156f5d6c38f730789a6/geo-product-r980-pim-image-800x960.png', datasheet: 'https://www.laserinst.com/content/R980_Datasheet.pdf' },
            { name: 'Catalyst DA2', img: 'https://images.ctfassets.net/1nvkn1423yot/5RDHxxntqleqha8WC295R6/25929a7fb312f0f657d025c8f6ce1c4e/geo-da2-productpage-fullbackgroundproducthero-800x960__1_.png', datasheet: 'https://buildingpoint.com.au/wp-content/uploads/2024/10/trimble-catalyst-spec-sheet.pdf' },
          ],
        },
        {
          name: 'Spectra', products: [
            { name: 'SP100', img: 'https://spectrageospatial.com/wp-content/uploads/sp100-product-shot.png', datasheet: 'http://trl.trimble.com/docushare/dsweb/Get/Document-1072959/SG_SP100%20GNSS%20Receiver_Datasheet_English%20US_LR.pdf' },
          ],
        },
      ],
    },
    {
      icon: <DraftingCompass className="w-7 h-7" />,
      title: 'أجهزة التوتل ستيشن',
      desc: 'أحدث أجهزة التوتل ستيشن وكالات القياس لقياسات المساحة الدقيقة في المشاريع الهندسية',
      brands: [
        {
          name: 'Trimble', products: [
            { name: 'S7', img: 'https://images.ctfassets.net/1nvkn1423yot/0HpsPfei3wb4THphxFbp9/06466a90de405248afc0e38a23495d00/geo-s7-productpage-fullbackgroundproducthero-800x960.png', datasheet: 'https://www.korecgroup.com/wp-content/uploads/2020/02/022516-154G_TrimbleS7_DS_A4_0619_LR-SEC.pdf' },
            { name: 'S5', img: 'https://images.ctfassets.net/1nvkn1423yot/SO4JJjOZ1SACwgkDJyKuJ/175913cbc27aa112f56f832371fa45b5/geo-s5-productpage-fullbackgroundproducthero-800x960.png', datasheet: 'https://geonovus.ee/wp-content/uploads/pdf/Datasheet%20-%20Trimble%20S5.pdf' },
            { name: 'C5', img: 'https://images.ctfassets.net/1nvkn1423yot/3cSDqj8ZqX3SE45Pq503Je/1071896224b58e47cc962e00743b173d/geo-c5-productpage-fullbackgroundproducthero-800x960.png', datasheet: 'https://www.duncan-parnell.com/customer/docs/skudocs/trimble-c5-datasheet-www-duncan-parnell-com-.pdf' },
          ],
        },
      ],
    },
    {
      icon: <ScanLine className="w-7 h-7" />,
      title: 'المسح الضوئي 3D والواقع المعزز',
      desc: 'ماسحات ضوئية متنقلة وثابتة مع حلول الواقع المعزز للنمذجة المتقدمة وتحويل الواقع إلى CAD',
      brands: [
        {
          name: 'NavVis', products: [
            { name: 'VLX3', img: 'https://3339696.fs1.hubspotusercontent-na1.net/hub/3339696/hubfs/product-navvis-VLX-3-Front-800x800-2024.png', datasheet: 'https://www.aptella.com/wp-content/uploads/2023/05/NavVis-VLX-3-data-sheet-Digital_EN.pdf' },
            { name: 'MLX', img: 'https://3339696.fs1.hubspotusercontent-na1.net/hub/3339696/hubfs/product-navvis-MLX-Display-800x800-2024.png', datasheet: 'https://assets.new.siemens.com/siemens/assets/api/uuid:ea0db4fb-f3fd-49e1-9656-2487a1d2f979/navvis-mlx-data-sheet-digital-en-2409.pdf' },
          ],
        },
        {
          name: 'Trimble', products: [
            { name: 'X9', img: 'https://images.ctfassets.net/1nvkn1423yot/6PGYrL01kdT5NyqvCRJAz4/3b037f38b8735e747f0f3294cd49f435/geo-product-x9-pim-image-800x960.png', datasheet: 'https://frontierprecision.com/wp-content/uploads/2025/01/Frontier-Precision-Trimble-X9-3D-Laser-Scanning-System-Spec-Sheet.pdf' },
          ],
        },
      ],
    },
    {
      icon: <Monitor className="w-7 h-7" />,
      title: 'أنظمة GIS و VRS',
      desc: 'حلول نظم المعلومات الجغرافية وشبكة محطات VRS لخدمات تصحيح الموقع RTK والخرائط الرقمية المتكاملة',
      brands: [
        {
          name: 'Trimble', products: [
            { name: 'TDC6', img: 'https://images.ctfassets.net/1nvkn1423yot/6orejDEuOzl53rmdqD672d/4bfcf62e1b1ae383f8d035dddb4e30bd/geo-tdc6-productpage-fullbackgroundproducthero-800x960.png', datasheet: 'https://frontierprecision.com/wp-content/uploads/2025/01/Frontier-Precision-Trimble-TDC6-Data-Collector-Spec-Sheet.pdf' },
            { name: 'TSC510', img: 'https://images.ctfassets.net/1nvkn1423yot/7CGBo90DVWQ74XWl2GVCX1/52bd3a78b77dbaa41808cdb8478e01f7/geo-product-tsc510-key-specs-image-720x720.jpg', datasheet: 'https://trl.trimble.com/docushare/dsweb/Get/Document-1081993/022650-002_TrimbleTSC510_InfoSheet_USL_0725_LR_SEC.pdf' },
            { name: 'TSC7', img: 'https://images.ctfassets.net/1nvkn1423yot/7z792GpsBF8Oa5ayU5YOSE/8382e9b3141bf93c4b4bc49f74085adb/geo-tsc7-productpage-keyfeatures-720x720.jpg', datasheet: 'https://geonovus.ee/wp-content/uploads/pdf/Datasheet%20-%20Trimble%20TSC7.pdf' },
          ],
        },
      ],
    },
    {
      icon: <Radio className="w-7 h-7" />,
      title: 'رصد ومراقبة وتوجيه آليات',
      desc: 'أنظمة مراقبة تحرك ورصد هبوط مع SITECH لتوجيه الآليات الثقيلة Machine Control في مشاريع البناء',
      brands: [],
    },
    {
      icon: <Gauge className="w-7 h-7" />,
      title: 'مستويات ليزر وبناء',
      desc: 'مستويات ليزر دوارة ومائلة وخطية وأنابيب وأجهزة قياس مسافة ليزرية لجميع أعمال البناء والطرق والصرف',
      brands: [
        { name: 'Spectra', products: [
            { name: 'LL500', img: 'https://sfile.chatglm.cn/images-ppt/4f53457e5907.png', datasheet: 'https://www.spectraprecision.com/_files/ugd/cd4160_34f59423c5414a86b74a0cd6abffa024.pdf' },
            { name: 'HV301', img: 'https://sfile.chatglm.cn/images-ppt/8c4c4d3b5ca7.jpg', datasheet: 'https://www.surveyinstrumentsales.com/PDFs/Brochures/Spectra-Precision-HV301-Brochure.pdf' },
            { name: 'DG613', img: 'https://sfile.chatglm.cn/images-ppt/dd80ee5d60b2.jpg', datasheet: 'https://www.spectraprecision.com/_files/ugd/cd4160_ec44bf9f0ad8480a953c0313ef78bf7c.pdf' },
            { name: 'DSZ32X', img: 'https://sfile.chatglm.cn/images-ppt/443b31e2401c.jpg', datasheet: 'https://5.imimg.com/data5/SELLER/Doc/2021/3/LB/FP/JY/124692814/averex-auto-level.pdf' },
        ] },
      ],
    },
    {
      icon: <Calculator className="w-7 h-7" />,
      title: 'برمجيات ومعالجة بيانات',
      desc: 'برمجيات Trimble Business Center و TBC لمعالجة بيانات المسح وتحويلها إلى نماذج ومخططات هندسية دقيقة',
      brands: [],
    },
    {
      icon: <GraduationCap className="w-7 h-7" />,
      title: 'Axis Campus للتدريب',
      desc: 'معهد Axis Campus المتخصص في التدريب المهني وورش العمل ودورات اعتماد المحترفين مع مختبر ودعم فني',
      brands: [],
    },
  ]

  const brandColors: Record<string, string> = {
    Trimble: 'bg-[#FFC72C]/10 border-[#FFC72C]/30 text-[#FFC72C]',
    NavVis: 'bg-[#0057B8]/10 border-[#0057B8]/30 text-[#0057B8]',
    Spectra: 'bg-[#0057B8]/10 border-[#0057B8]/30 text-[#FFFFFF]',
  }

  return (
    <Section id="services" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">خدماتنا</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            أجهزة وخدمات <span className="gradient-text">المساحة والجيوماتكس</span>
          </h2>
          <p className="text-[var(--t-7)] max-w-2xl mx-auto">
            نقدم أحدث أجهزة المساحة والقياس من أبرز الشركات العالمية مع خدمات التدريب والدعم الفني المتكامل
          </p>
        </div>

        <div className="space-y-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-2xl border border-[var(--b-1)] bg-[var(--bg-2)] hover:border-[var(--accent-border)] transition-all duration-500 overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[oklch(0.72_0.14_180_/_0.05)] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-6">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-[oklch(0.72_0.14_180_/_0.1)] text-[oklch(0.72_0.14_180)] shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[var(--t-1)] mb-1">{s.title}</h3>
                    <p className="text-[var(--t-7)] leading-relaxed text-sm">{s.desc}</p>
                  </div>
                </div>

                {/* Brand products with images */}
                {s.brands.length > 0 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                    {s.brands.flatMap((b) =>
                      b.products.map((p, k) => (
                        <a
                          key={`${b.name}-${k}`}
                          href={typeof p === 'object' && p.datasheet ? p.datasheet : undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/product rounded-xl border border-[var(--b-1)] bg-[var(--bg-1)] overflow-hidden hover:border-[var(--accent-border-sm)] transition-all duration-300 hover:shadow-lg hover:shadow-[oklch(0.72_0.14_180_/_0.08)]"
                        >
                          {/* Product image */}
                          <div className="relative aspect-[4/3] bg-gradient-to-b from-[oklch(0.25_0.02_250)] to-[oklch(0.18_0.02_250)] flex items-center justify-center p-4">
                            {typeof p === 'object' && p.img ? (
                              <img
                                src={p.img}
                                alt={`${b.name} ${typeof p === 'object' ? p.name : p}`}
                                className="max-h-full max-w-full object-contain drop-shadow-lg transition-transform duration-300 group-hover/product:scale-105"
                              />
                            ) : (
                              <div className="text-[var(--t-10)]">
                                {b.name === 'Trimble' ? <Satellite className="w-10 h-10" /> : b.name === 'NavVis' ? <ScanLine className="w-10 h-10" /> : <Cog className="w-10 h-10" />}
                              </div>
                            )}
                          </div>
                          {/* Brand + product name */}
                          <div className="p-3">
                            <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold border mb-2 ${brandColors[b.name] || 'bg-[var(--bg-tab)] border-[var(--b-1)] text-[oklch(0.72_0.14_180)]'}`}>
                              {b.name}
                            </span>
                            <div className="flex items-center justify-between">
                              <span className="text-[oklch(0.85_0.005_250)] text-sm font-semibold">
                                {typeof p === 'object' ? p.name : p}
                              </span>
                              {typeof p === 'object' && p.datasheet && (
                                <FileText className="w-3.5 h-3.5 text-[var(--t-8)] group-hover/product:text-[oklch(0.72_0.14_180)] transition-colors" />
                              )}
                            </div>
                          </div>
                        </a>
                      ))
                    )}
                  </div>
                )}
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
    { value: 4, suffix: '', label: 'فروع في فلسطين', icon: <MapPin className="w-6 h-6" /> },
    { value: 1000, suffix: '+', label: 'أكثر من عميل راضٍ', icon: <Users className="w-6 h-6" /> },
    { value: 20, suffix: '+', label: 'سنة خبرة', icon: <Wrench className="w-6 h-6" /> },
    { value: 3, suffix: '', label: 'وكالات حصرية عالمية', icon: <Star className="w-6 h-6" /> },
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
              className="relative p-6 sm:p-8 rounded-2xl border border-[var(--b-1)] bg-[var(--bg-2-80)] backdrop-blur text-center group hover:border-[var(--accent-border-sm)] transition-all duration-300"
            >
              <div className="mb-4 flex justify-center">
                <div className="p-3 rounded-xl bg-[oklch(0.72_0.14_180_/_0.1)] text-[oklch(0.72_0.14_180)] group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-2">
                <Counter end={s.value} suffix={s.suffix} />
              </div>
              <div className="text-[var(--t-7)] text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ───────── brands ───────── */
function Brands() {
  const brands = [
    {
      name: 'Trimble',
      desc: 'رائد عالمي في تقنيات المسح والبنية التحتية',
      color: 'from-[#FFC72C] to-[#E5B300]',
      textColor: 'text-[#1a1a1a]',
      specialties: ['GPS / GNSS', 'Total Station', 'أجهزة ليزر', 'برامج المسح'],
    },
    {
      name: 'NavVis',
      desc: 'قائد تقنيات المسح المتنقل والنمذجة ثلاثية الأبعاد',
      color: 'from-[#0057B8] to-[#003F8A]',
      textColor: 'text-white',
      specialties: ['مسح متنقل', 'ماسحات داخلية', 'نمذجة 3D', 'خرائط رقمية'],
    },
    {
      name: 'Spectra',
      desc: 'حلول مسح عالية الدقة للمساحين والمقاولين',
      color: 'from-[#FFFFFF] to-[#E8F0FE]',
      textColor: 'text-[#0057B8]',
      specialties: ['RTK / GPS', 'توتل ستيشن', 'مستويات ليزر', 'جمع بيانات'],
    },
  ]

  return (
    <Section id="brands" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">شراكاتنا</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            علامات تجارية <span className="gradient-text">عالمية رائدة</span>
          </h2>
          <p className="text-[var(--t-7)] max-w-2xl mx-auto">
            وكيل حصري في فلسطين لأبرز الشركات العالمية المتخصصة في أجهزة المساحة والجيوماتكس
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {brands.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative rounded-2xl border border-[var(--b-1)] bg-[var(--bg-2)] overflow-hidden hover:border-[var(--accent-border)] transition-all duration-500"
            >
              {/* Brand header gradient */}
              <div className={`bg-gradient-to-l ${b.color} p-6 text-center`}>
                <h3 className={`text-2xl sm:text-3xl font-bold tracking-wide ${b.textColor}`}>{b.name}</h3>
                <p className={`text-sm mt-2 ${b.textColor === 'text-white' ? 'text-white/80' : b.textColor === 'text-[#1a1a1a]' ? 'text-[#1a1a1a]/70' : 'text-[#0057B8]/70'}`}>{b.desc}</p>
              </div>

              {/* Specialties */}
              <div className="p-6">
                <h4 className="text-[oklch(0.72_0.14_180)] font-semibold text-sm mb-3">التخصصات</h4>
                <div className="flex flex-wrap gap-2">
                  {b.specialties.map((s, j) => (
                    <span
                      key={j}
                      className="px-3 py-1.5 rounded-lg bg-[var(--bg-input)] text-[var(--t-4)] text-xs border border-[var(--b-1)] group-hover:border-[var(--accent-border-xs)] transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1 text-[oklch(0.72_0.14_180)] text-sm font-medium">
                  <span>الوكيل الحصري في فلسطين</span>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ───────── gallery ───────── */
function Gallery() {
  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'post'>('all')
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null)

  const mediaItems = [
    {
      type: 'video' as const,
      platform: 'youtube' as const,
      title: '3D Laser Scanning the Nablus Court of Appeal',
      youtubeId: 'XgBOGJzBn5g',
      thumb: 'https://i.ytimg.com/vi/XgBOGJzBn5g/hqdefault.jpg',
      category: 'مسح ليزري',
    },
    {
      type: 'video' as const,
      platform: 'youtube' as const,
      title: 'NavVis MLX – Redefining Handheld Reality Capture',
      youtubeId: '-IDRr44-6RA',
      thumb: 'https://i.ytimg.com/vi/-IDRr44-6RA/hqdefault.jpg',
      category: 'مسح متنقل',
    },
    {
      type: 'video' as const,
      platform: 'youtube' as const,
      title: 'NavVis VLX3 – Fast & Accurate 3D Laser Scanning',
      youtubeId: 'TOZkZdhxvZk',
      thumb: 'https://i.ytimg.com/vi/TOZkZdhxvZk/hqdefault.jpg',
      category: 'مسح ليزري',
    },
    {
      type: 'video' as const,
      platform: 'youtube' as const,
      title: 'High-Precision 3D Laser Scanning with Trimble X9',
      youtubeId: 'mvGkQGVsQQI',
      thumb: 'https://i.ytimg.com/vi/mvGkQGVsQQI/hqdefault.jpg',
      category: 'Trimble',
    },
    {
      type: 'video' as const,
      platform: 'youtube' as const,
      title: 'Trimble GNSS R580',
      youtubeId: 'OmxZSrO7zTg',
      thumb: 'https://i.ytimg.com/vi/OmxZSrO7zTg/hqdefault.jpg',
      category: 'GPS / GNSS',
    },
    {
      type: 'video' as const,
      platform: 'youtube' as const,
      title: 'Spectra GNSS SP85',
      youtubeId: 'UV-q0YKINYQ',
      thumb: 'https://i.ytimg.com/vi/UV-q0YKINYQ/hqdefault.jpg',
      category: 'Spectra',
    },
    {
      type: 'video' as const,
      platform: 'youtube' as const,
      title: 'From Point Cloud to Digital Terrain Models',
      youtubeId: '5NWINk0x28w',
      thumb: 'https://i.ytimg.com/vi/5NWINk0x28w/hqdefault.jpg',
      category: 'نمذجة ثلاثية الأبعاد',
    },
    {
      type: 'video' as const,
      platform: 'youtube' as const,
      title: 'Trimble TDC6 Data Collector',
      youtubeId: 'r3wwTRqF0SA',
      thumb: 'https://i.ytimg.com/vi/r3wwTRqF0SA/hqdefault.jpg',
      category: 'جمع بيانات',
    },
    {
      type: 'video' as const,
      platform: 'youtube' as const,
      title: 'Trimble TDC600 Handheld',
      youtubeId: 'IBpddj4MPCs',
      thumb: 'https://i.ytimg.com/vi/IBpddj4MPCs/hqdefault.jpg',
      category: 'جمع بيانات',
    },
    {
      type: 'video' as const,
      platform: 'youtube' as const,
      title: 'NavVis VLX – From Reality to CAD in Hours',
      youtubeId: 'LgmeF3BZO4Y',
      thumb: 'https://i.ytimg.com/vi/LgmeF3BZO4Y/hqdefault.jpg',
      category: 'مسح متنقل',
    },
    {
      type: 'post' as const,
      platform: 'instagram' as const,
      title: 'شكراً لكل من زارنا وتعرف على تقنيات Trimble و NavVis و Xgrids المتقدمة',
      href: 'https://www.instagram.com/p/DYMX_zvCIAt',
      category: 'معرض وأحداث',
    },
    {
      type: 'post' as const,
      platform: 'instagram' as const,
      title: 'تعاون جمعية إعادة الإطار المعماري × اكسيس × جامعة القدس',
      href: 'https://www.instagram.com/p/DYIVKBDiDkf',
      category: 'شراكات',
    },
    {
      type: 'post' as const,
      platform: 'instagram' as const,
      title: 'وراء كل طريق وبرج أيقوني في أبوظبي — Trimble Total Station',
      href: 'https://www.instagram.com/reel/DXYyA2_DyhE',
      category: 'Trimble',
    },
    {
      type: 'post' as const,
      platform: 'instagram' as const,
      title: 'مسح رادار أرضي بالدرون Zond Aero 500 GPR',
      href: 'https://www.instagram.com/reel/DSB4QDaDwLW',
      category: 'مسح جيورادار',
    },
    {
      type: 'post' as const,
      platform: 'instagram' as const,
      title: 'توتل ستيشن يجمع بين سهولة الاستخدام والدقة العالية',
      href: 'https://www.instagram.com/reel/DXEuqvGD6Dw',
      category: 'توتل ستيشن',
    },
    {
      type: 'post' as const,
      platform: 'facebook' as const,
      title: 'تهنئة لـ Juman Home رام الله على اقتناء جهاز المسح ثلاثي الأبعاد Trimble X9!',
      href: 'https://www.facebook.com/axisTRIMBLE',
      category: 'مشاريع عملاء',
    },
    {
      type: 'post' as const,
      platform: 'facebook' as const,
      title: 'ورشة لجنة التسوية حول مفاهيم GNSS — اكسيس تقدم أجهزة GPS',
      href: 'https://www.facebook.com/lwscps/posts/1427944703988935',
      category: 'ورش عمل',
    },
  ]

  const filtered = activeTab === 'all' ? mediaItems : mediaItems.filter(m => m.type === activeTab)

  const tabs = [
    { key: 'all' as const, label: 'الكل', count: mediaItems.length },
    { key: 'video' as const, label: 'فيديوهات', count: mediaItems.filter(m => m.type === 'video').length },
    { key: 'post' as const, label: 'منشورات', count: mediaItems.filter(m => m.type === 'post').length },
  ]

  return (
    <Section id="gallery" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">معرض الوسائط</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            أحدث <span className="gradient-text">فيديوهاتنا ومنشوراتنا</span>
          </h2>
          <p className="text-[var(--t-7)] max-w-2xl mx-auto">
            تابع أحدث أعمالنا وتقنياتنا في المساحة والجيوماتكس عبر منصاتنا المختلفة
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === t.key
                  ? 'bg-[oklch(0.72_0.14_180)] text-[oklch(0.13_0.02_250)] shadow-lg shadow-[oklch(0.72_0.14_180_/_0.2)]'
                  : 'bg-[var(--bg-tab)] border border-[var(--b-1)] text-[var(--t-6)] hover:border-[var(--accent-border-sm)] hover:text-[oklch(0.72_0.14_180)]'
              }`}
            >
              {t.label}
              <span className={`mr-1.5 text-xs ${activeTab === t.key ? 'text-[oklch(0.13_0.02_250_/_0.6)]' : 'text-[var(--t-10)]'}`}>({t.count})</span>
            </button>
          ))}
        </div>

        {/* Media grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.08, 0.4) }}
                className="group relative rounded-2xl border border-[var(--b-1)] bg-[var(--bg-2)] overflow-hidden hover:border-[var(--accent-border)] transition-all duration-500"
              >
                {item.type === 'video' && item.youtubeId && (
                  <>
                    {/* Video thumbnail */}
                    <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => setLightboxVideo(item.youtubeId!)}>
                      <img
                        src={item.thumb}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-[#FF0000]/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#FF0000]/30">
                          <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 mr-[-2px]"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                      </div>
                      {/* Category badge */}
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[var(--bg-1)]/80 backdrop-blur-sm text-[oklch(0.72_0.14_180)] text-[10px] font-semibold border border-[var(--b-1)]">
                        {item.category}
                      </span>
                      {/* YouTube badge */}
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#FF0000] text-white text-[10px] font-bold flex items-center gap-1">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        YouTube
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="text-[var(--t-1)] font-semibold text-sm leading-relaxed line-clamp-2">{item.title}</h4>
                    </div>
                  </>
                )}

                {item.type === 'post' && (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
                    {/* Post card */}
                    <div className="p-6 min-h-[200px] flex flex-col justify-between">
                      <div>
                        {/* Platform icon */}
                        <div className="flex items-center gap-2 mb-4">
                          {item.platform === 'instagram' ? (
                            <span className="px-2.5 py-1 rounded-lg bg-gradient-to-l from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white text-[10px] font-bold flex items-center gap-1">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                              Instagram
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-lg bg-[#1877F2] text-white text-[10px] font-bold flex items-center gap-1">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                              Facebook
                            </span>
                          )}
                          <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-input)] text-[var(--t-8)] text-[10px] font-medium border border-[var(--b-1)]">
                            {item.category}
                          </span>
                        </div>
                        <h4 className="text-[var(--t-1)] font-semibold text-sm leading-relaxed">{item.title}</h4>
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-[var(--t-8)] text-xs group-hover:text-[oklch(0.72_0.14_180)] transition-colors">
                        <span>عرض المنشور</span>
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Channel link */}
        <div className="text-center mt-10">
          <a
            href="https://www.youtube.com/@axisgpssurveyinginstrument8400"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF0000]/10 border border-[#FF0000]/20 text-[#FF0000] font-semibold text-sm hover:bg-[#FF0000]/20 transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            زوروا قناتنا على يوتيوب — 105+ فيديو
          </a>
        </div>
      </div>

      {/* Video Lightbox */}
      <AnimatePresence>
        {lightboxVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${lightboxVideo}?autoplay=1&rel=0`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
              <button
                onClick={() => setLightboxVideo(null)}
                className="absolute top-3 left-3 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}

/* ───────── projects ───────── */
function Projects() {
  const projects = [
    {
      title: 'مختبر GIS والمساحة - جامعة الخليل',
      category: 'التعليم الأكاديمي',
      desc: 'إنشاء مختبر نظم المعلومات الجغرافية والمساحة في كلية المهن والعلوم التطبيقية بجامعة الخليل بالتعاون مع AXIS-GPS',
      tags: ['GIS', 'أجهزة مساحة', 'جامعة الخليل'],
    },
    {
      title: 'دعم جامعة البوليتكنك فلسطين',
      category: 'المسؤولية المجتمعية',
      desc: 'تبرع بأجهزة مساحة حديثة ودعم صندوق الطالب الكريم لصالح جامعة البوليتكنك فلسطين لتعزيز التخصصات الهندسية',
      tags: ['تبرع', 'أجهزة مساحة', 'البوليتكنك'],
    },
    {
      title: 'الشراكة مع UNDP',
      category: 'مشاريع دولية',
      desc: 'التعاون مع برنامج الأمم المتحدة الإنمائي في مشاريع المسح والخرائط ونظم المعلومات الجغرافية في فلسطين',
      tags: ['UNDP', 'GIS', 'خرائط رقمية'],
    },
    {
      title: 'افتتاح فرع الخليل',
      category: 'توسع الشركة',
      desc: 'افتتاح الفرع الرابع لشركة اكسيس في الخليل تحت رعاية أحمد سعيد بيوض التميمي لتوسيع نطاق الخدمات في المنطقة',
      tags: ['فرع جديد', 'الخليل', 'توسع'],
    },
  ]

  return (
    <Section id="projects" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">مشاريعنا</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            إنجازاتنا <span className="gradient-text">وشراكاتنا</span>
          </h2>
          <p className="text-[var(--t-7)] max-w-2xl mx-auto">
            نفخر بشراكاتنا مع المؤسسات الأكاديمية والدولية ومساهمتنا في تطوير قطاع المساحة والجيوماتكس في فلسطين
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
              className="group relative p-6 sm:p-8 rounded-2xl border border-[var(--b-1)] bg-[var(--bg-2)] hover:border-[var(--accent-border)] transition-all duration-500 overflow-hidden"
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-[oklch(0.72_0.14_180_/_0.04)] rounded-br-full" />

              <div className="relative">
                <span className="text-xs font-medium text-[oklch(0.72_0.14_180)] bg-[oklch(0.72_0.14_180_/_0.1)] px-3 py-1 rounded-full">
                  {p.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--t-1)] mt-4 mb-3">{p.title}</h3>
                <p className="text-[var(--t-7)] leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t, j) => (
                    <span key={j} className="text-xs px-3 py-1 rounded-full border border-[var(--b-1)] text-[var(--t-7)]">
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
      name: 'م. أنس أبو حديد',
      role: 'مدير فرع الخليل - شركة اكسيس',
      text: 'نلتزم في اكسيس بتقديم أحدث التقنيات وأفضل الخدمات لعملائنا في قطاع المساحة والجيوماتكس، ونسعى دائماً لتجاوز توقعاتهم.',
    },
    {
      name: 'م. سجى مسالمة',
      role: 'فريق اكسيس - فرع الخليل',
      text: 'فريق اكسيس يعمل بشغف لتوفير حلول مسح متكاملة تلبي احتياجات المشاريع المختلفة، من أجهزة GPS إلى أنظمة المراقبة المتقدمة.',
    },
    {
      name: 'أحمد سعيد بيوض التميمي',
      role: 'رئيس مجلس أمناء جامعة البوليتكنك',
      text: 'نشيد بدور شركة اكسيس في إرفاد قطاع المساحة والجيوماتكس بأحدث التقنيات الحديثة من خلال مبادراتها وخبراتها المهنية للمساحين والمهندسين.',
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
              className="p-6 rounded-2xl border border-[var(--b-1)] bg-[var(--bg-2)] hover:border-[var(--accent-border-sm)] transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[oklch(0.72_0.14_180)] text-[oklch(0.72_0.14_180)]" />
                ))}
              </div>
              <p className="text-[var(--t-4)] leading-relaxed mb-6 text-sm">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[oklch(0.72_0.14_180_/_0.15)] flex items-center justify-center text-[oklch(0.72_0.14_180)] font-bold text-sm">
                  {t.name.charAt(2)}
                </div>
                <div>
                  <div className="font-semibold text-[var(--t-1)] text-sm">{t.name}</div>
                  <div className="text-[var(--t-8)] text-xs">{t.role}</div>
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
    { icon: <CheckCircle2 className="w-5 h-5" />, text: 'الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و DJI و Kaarta' },
    { icon: <CheckCircle2 className="w-5 h-5" />, text: 'أكثر من 20 سنة من الخبرة في قطاع أجهزة المساحة' },
    { icon: <CheckCircle2 className="w-5 h-5" />, text: '4 فروع رئيسية تغطي مختلف مناطق فلسطين' },
    { icon: <CheckCircle2 className="w-5 h-5" />, text: 'شراكة مع برنامج الأمم المتحدة الإنمائي UNDP' },
    { icon: <CheckCircle2 className="w-5 h-5" />, text: 'تعاون مع جامعات فلسطينية (البوليتكنك، النجاح، الخليل)' },
    { icon: <CheckCircle2 className="w-5 h-5" />, text: 'دعم فني متواصل وخدمة ما بعد البيع' },
  ]

  return (
    <Section id="why-us" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[oklch(0.72_0.14_180_/_0.04)] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">لماذا اكسيس</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-6 leading-tight">
              لماذا تختار <span className="gradient-text">اكسيس؟</span>
            </h2>
            <p className="text-[var(--t-7)] leading-relaxed mb-8">
              نتميز بأننا الشركة الرائدة والأكبر في فلسطين في مجال أجهزة المساحة والجيوماتكس.
              وكالة حصرية لأكبر الشركات العالمية مع شبكة فروع واسعة وفريق متخصص يقدم أفضل الحلول والدعم لعملائنا.
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
                  <span className="text-[var(--t-4)] text-sm">{r.text}</span>
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
                  <div className="text-[var(--t-8)] text-xs">حلول هندسية متقدمة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ───────── team member card helper ───────── */
function TeamCard({
  member, size, index, showLine,
}: {
  member: {
    name: string; role: string; initials: string; photo: string;
    gradient: string; border: string; glow: string; badge: string;
  }
  size: 'founder' | 'executive' | 'manager' | 'staff'
  index: number
  showLine?: 'top' | 'bottom' | 'both'
}) {
  const sizeConfig = {
    founder: { avatar: 'w-32 h-32 sm:w-40 sm:h-40', text: 'text-xl sm:text-2xl', roleText: 'text-base sm:text-lg', pad: 'p-7 sm:p-9', maxW: 'max-w-md', rounded: 'rounded-3xl', ring: 'ring-4', initialsText: 'text-4xl sm:text-5xl' },
    executive: { avatar: 'w-24 h-24 sm:w-28 sm:h-28', text: 'text-base sm:text-lg', roleText: 'text-sm sm:text-base', pad: 'p-5 sm:p-6', maxW: 'max-w-xs', rounded: 'rounded-2xl', ring: 'ring-2', initialsText: 'text-2xl sm:text-3xl' },
    manager: { avatar: 'w-20 h-20 sm:w-24 sm:h-24', text: 'text-sm sm:text-base', roleText: 'text-xs sm:text-sm', pad: 'p-4 sm:p-5', maxW: 'max-w-[200px]', rounded: 'rounded-2xl', ring: 'ring-2', initialsText: 'text-xl sm:text-2xl' },
    staff: { avatar: 'w-16 h-16 sm:w-20 sm:h-20', text: 'text-xs sm:text-sm', roleText: 'text-[10px] sm:text-xs', pad: 'p-3 sm:p-4', maxW: 'max-w-[170px]', rounded: 'rounded-xl', ring: 'ring', initialsText: 'text-lg sm:text-xl' },
  }
  const cfg = sizeConfig[size]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className={`group relative ${cfg.rounded} border ${cfg.pad} bg-[var(--bg-3)] hover:bg-[var(--bg-hover)] transition-all duration-500 ${member.border} text-center w-full ${cfg.maxW} ${
        size === 'founder' ? 'border-2 shadow-xl shadow-[oklch(0.72_0.14_180_/_0.1)] hover:shadow-2xl hover:shadow-[oklch(0.72_0.14_180_/_0.18)] bg-gradient-to-b from-[oklch(0.28_0.03_250)] to-[oklch(0.24_0.03_250)]' : ''
      }`}
      >
        {/* Badge */}
        {member.badge && size === 'founder' && (
          <div className="absolute -top-5 left-1/2 -translate-x-1/2">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[oklch(0.72_0.14_180)] to-[oklch(0.65_0.16_200)] flex items-center justify-center shadow-lg shadow-[oklch(0.72_0.14_180_/_0.3)]">
                <Star className="w-5 h-5 text-[oklch(0.13_0.02_250)]" />
              </div>
              <div className="absolute -inset-1.5 rounded-full border-2 border-[oklch(0.72_0.14_180_/_0.3)] animate-pulse" />
            </div>
          </div>
        )}
        {member.badge && size !== 'founder' && (
          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-l from-[oklch(0.65_0.16_200)] to-[oklch(0.55_0.12_250)] text-[oklch(0.97_0.005_250)] shadow-md whitespace-nowrap">
            {member.badge === 'تنفيذي' ? 'المدير التنفيذي' : member.badge === 'فرع' ? 'مدير فرع' : member.badge}
          </span>
        )}

        {/* Avatar */}
        <div className={`relative mx-auto mb-3 ${cfg.avatar} ${size === 'founder' ? 'mt-3' : ''}`}>
          {member.photo ? (
            <div className={`w-full h-full ${cfg.rounded} overflow-hidden shadow-lg transition-transform duration-500 group-hover:scale-105 ${cfg.ring} ${member.border}`}>
              <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className={`w-full h-full ${cfg.rounded} bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-105`}>
              <span className={`text-white ${cfg.initialsText} font-bold select-none`}>{member.initials}</span>
            </div>
          )}
        </div>

        {/* Info */}
        <h3 className={`text-[var(--t-0)] font-bold ${cfg.text} mb-1 leading-tight`}>{member.name}</h3>
        <p className={`text-[var(--t-6)] ${cfg.roleText} leading-relaxed`}>{member.role}</p>
      </div>
    </motion.div>
  )
}

/* ───────── org tree connector line ───────── */
function TreeLine({ type }: { type: 'vertical' | 'horizontal' | 'branch-down' }) {
  const lineColor = 'oklch(0.72 0.14 180 / 0.25)'
  if (type === 'vertical') {
    return <div className="w-0.5 h-8 sm:h-10 mx-auto" style={{ background: `linear-gradient(to bottom, ${lineColor}, oklch(0.72 0.14 180 / 0.08))` }} />
  }
  if (type === 'horizontal') {
    return <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, oklch(0.72 0.14 180 / 0.08), ${lineColor}, oklch(0.72 0.14 180 / 0.08))` }} />
  }
  return null
}

/* ───────── team ───────── */
function Team() {
  const teamMembers = [
    {
      name: 'المهندس سلامة العواودة',
      role: 'المدير العام',
      initials: 'س ع',
      photo: '/team/salame.jpg',
      gradient: 'from-[oklch(0.72_0.14_180)] to-[oklch(0.65_0.16_200)]',
      border: 'border-[oklch(0.72_0.14_180_/_0.3)]',
      glow: 'shadow-[oklch(0.72_0.14_180_/_0.15)]',
      badge: 'المؤسس',
    },
    {
      name: 'المهندس عدنان شومان',
      role: 'المدير التنفيذي - الضفة الغربية',
      initials: 'ع ش',
      photo: '/team/adnan.jpg',
      gradient: 'from-[oklch(0.65_0.16_200)] to-[oklch(0.55_0.12_250)]',
      border: 'border-[oklch(0.65_0.16_200_/_0.3)]',
      glow: 'shadow-[oklch(0.65_0.16_200_/_0.15)]',
      badge: 'تنفيذي',
    },
    {
      name: 'السيدة ولاء البكري',
      role: 'قسم المحاسبة',
      initials: 'و ب',
      photo: '/team/walaa.jpg',
      gradient: 'from-[oklch(0.70_0.12_90)] to-[oklch(0.60_0.14_60)]',
      border: 'border-[oklch(0.70_0.12_90_/_0.3)]',
      glow: 'shadow-[oklch(0.70_0.12_90_/_0.15)]',
      badge: 'محاسبة',
    },
    {
      name: 'المهندس أنس أبو حديد',
      role: 'مدير فرع الخليل',
      initials: 'أ ح',
      photo: '/team/anas.jpg',
      gradient: 'from-[oklch(0.60_0.18_30)] to-[oklch(0.55_0.14_50)]',
      border: 'border-[oklch(0.60_0.18_30_/_0.3)]',
      glow: 'shadow-[oklch(0.60_0.18_30_/_0.15)]',
      badge: 'فرع',
    },
    {
      name: 'المهندسة ألاء أبو خلف',
      role: 'قسم الرسم والمسح الضوئي',
      initials: 'أ خ',
      photo: '/team/alaa.jpg',
      gradient: 'from-[oklch(0.75_0.15_330)] to-[oklch(0.65_0.16_300)]',
      border: 'border-[oklch(0.75_0.15_330_/_0.3)]',
      glow: 'shadow-[oklch(0.75_0.15_330_/_0.15)]',
      badge: '',
    },
    {
      name: 'المهندسة سجى مسالمة',
      role: 'قسم الرسم والدعم الفني',
      initials: 'س م',
      photo: '/team/saja_new.jpg',
      gradient: 'from-[oklch(0.80_0.10_160)] to-[oklch(0.72_0.14_180)]',
      border: 'border-[oklch(0.80_0.10_160_/_0.3)]',
      glow: 'shadow-[oklch(0.80_0.10_160_/_0.15)]',
      badge: '',
    },
    {
      name: 'المهندس وعد وهدان',
      role: 'قسم الدعم الفني',
      initials: 'و و',
      photo: '/team/waad.jpg',
      gradient: 'from-[oklch(0.55_0.12_250)] to-[oklch(0.65_0.16_200)]',
      border: 'border-[oklch(0.55_0.12_250_/_0.3)]',
      glow: 'shadow-[oklch(0.55_0.12_250_/_0.15)]',
      badge: '',
    },
    {
      name: 'المهندس حاتم عيدة',
      role: 'قسم الرسم',
      initials: 'ح ع',
      photo: '/team/hatem.jpg',
      gradient: 'from-[oklch(0.50_0.15_150)] to-[oklch(0.72_0.14_180)]',
      border: 'border-[oklch(0.50_0.15_150_/_0.3)]',
      glow: 'shadow-[oklch(0.50_0.15_150_/_0.15)]',
      badge: '',
    },
  ]

  const founder = teamMembers[0]
  const executive = teamMembers[1]
  const accounting = teamMembers[2] // ولاء - المحاسبة (directly under Executive)
  const branch = teamMembers[3] // أنس - فرع الخليل
  const departments = teamMembers.slice(4) // الأقسام الفنية

  return (
    <Section id="team" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-[oklch(0.72_0.14_180_/_0.08)] rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-[oklch(0.65_0.16_200_/_0.08)] rounded-full blur-3xl" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">فريق العمل</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            الهيكل <span className="gradient-text">الإداري</span>
          </h2>
          <p className="text-[var(--t-7)] max-w-2xl mx-auto">
            هيكل إداري متكامل يضم نخبة من المهندسين والمتخصصين تحت قيادة متميزة
          </p>
        </div>

        {/* ═══════ ORG TREE ═══════ */}
        <div className="flex flex-col items-center">

          {/* Level 1: المؤسس */}
          <TeamCard member={founder} size="founder" index={0} />

          {/* Line: Founder → Executive */}
          <div className="relative w-full flex flex-col items-center">
            <TreeLine type="vertical" />
            <svg width="2" height="40" className="sm:hidden" style={{ overflow: 'visible' }}>
              <line x1="1" y1="0" x2="1" y2="40" stroke="oklch(0.72 0.14 180 / 0.25)" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Level 2: المدير التنفيذي */}
          <TeamCard member={executive} size="executive" index={1} />

          {/* Line: Executive → branches */}
          <TreeLine type="vertical" />

          {/* Horizontal connector line spanning all Level 3 items */}
          <div className="w-full max-w-4xl relative">
            <div className="h-0.5 mx-auto" style={{ background: 'linear-gradient(to right, oklch(0.72 0.14 180 / 0.05), oklch(0.72 0.14 180 / 0.25), oklch(0.72 0.14 180 / 0.05))' }} />
          </div>

          {/* Level 3: المحاسبة (directly under Executive) + فرع الخليل + الأقسام */}
          <div className="w-full max-w-5xl mt-0">

            {/* Three main branches under Executive */}
            <div className="flex flex-col sm:flex-row items-start justify-center gap-3 sm:gap-4">

              {/* Branch A: المحاسبة - directly connected to Executive */}
              <div className="flex flex-col items-center flex-1">
                {/* Vertical connector from horizontal line */}
                <div className="w-0.5 h-6 sm:h-8" style={{ background: 'linear-gradient(to bottom, oklch(0.72 0.14 180 / 0.25), oklch(0.72 0.14 180 / 0.1))' }} />

                <TeamCard member={accounting} size="manager" index={2} />
              </div>

              {/* Branch B: فرع الخليل */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-0.5 h-6 sm:h-8" style={{ background: 'linear-gradient(to bottom, oklch(0.72 0.14 180 / 0.2), oklch(0.60 0.18 30 / 0.1))' }} />
                <TeamCard member={branch} size="manager" index={3} />
              </div>

              {/* Branch C: الأقسام الفنية (grouped) */}
              <div className="flex flex-col items-center flex-[2]">
                <div className="w-0.5 h-6 sm:h-8" style={{ background: 'linear-gradient(to bottom, oklch(0.72 0.14 180 / 0.2), oklch(0.55 0.12 250 / 0.1))' }} />
                {/* Department group label */}
                <div className="mb-3 px-4 py-1 rounded-full border border-[var(--b-3)] bg-[var(--bg-2)]">
                  <span className="text-[var(--t-6)] text-[10px] sm:text-xs font-semibold">الأقسام الفنية</span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                  {departments.map((member, i) => (
                    <TeamCard key={`dept-${i}`} member={member} size="staff" index={4 + i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-[var(--b-3)] bg-[var(--bg-3)]">
            <Users className="w-5 h-5 text-[oklch(0.72_0.14_180)]" />
            <span className="text-[var(--t-5)] text-sm">فريق متخصص يضم نخبة من المهندسين ذوي الكفاءات العالية</span>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

/* ───────── contact ───────── */
function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service: formData.get('service') as string,
      message: formData.get('message') as string,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'حدث خطأ في الإرسال')
      }

      setSubmitted(true)
      form.reset()
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'حدث خطأ غير متوقع'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    { icon: <Phone className="w-5 h-5" />, label: 'اتصل بنا', value: '0594224497' },
    { icon: <Phone className="w-5 h-5" />, label: 'اتصل بنا', value: '0595289999' },
    { icon: <MessageCircle className="w-5 h-5 text-[#25D366]" />, label: 'واتساب', value: '+972 52-528-9999', href: 'https://wa.me/972525289999' },
    { icon: <Mail className="w-5 h-5" />, label: 'البريد الإلكتروني', value: 'adnan@axis-gps.com' },
    { icon: <Mail className="w-5 h-5" />, label: 'البريد الإلكتروني', value: 'salame@axis-gps.com' },
    { icon: <MapPin className="w-5 h-5" />, label: 'الفرع الرئيسي', value: 'المنطقة الصناعية تسيفوريت' },
    { icon: <MapPin className="w-5 h-5" />, label: 'فرع الشمال', value: 'كفر قاسم - شارع علي بن أبي طالب' },
    { icon: <MapPin className="w-5 h-5" />, label: 'فرع رام الله', value: 'شارع الإرسال قرب السفينة' },
    { icon: <MapPin className="w-5 h-5" />, label: 'فرع الخليل', value: 'شارع عين سارة مقابل ستاد الحسين' },
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
          <p className="text-[var(--t-7)] max-w-2xl mx-auto">
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
                className="flex items-start gap-4 p-5 rounded-xl border border-[var(--b-1)] bg-[var(--bg-2)] hover:border-[var(--accent-border-sm)] transition-all"
              >
                <div className="p-3 rounded-lg bg-[oklch(0.72_0.14_180_/_0.1)] text-[oklch(0.72_0.14_180)] shrink-0">
                  {c.icon}
                </div>
                <div>
                  <div className="text-sm text-[var(--t-8)]">{c.label}</div>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-[var(--t-1)] font-medium mt-1 hover:text-[#25D366] transition-colors" dir="ltr">{c.value}</a>
                  ) : (
                    <div className="text-[var(--t-1)] font-medium mt-1" dir="ltr">{c.value}</div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Branches interactive map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[var(--b-1)] bg-[var(--bg-2)] overflow-hidden p-4 sm:p-5"
            >
              <h4 className="text-[oklch(0.72_0.14_180)] font-semibold text-sm mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                مواقع فروعنا على الخريطة
              </h4>
              <BranchMap />
            </motion.div>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 p-6 sm:p-8 rounded-2xl border border-[var(--b-1)] bg-[var(--bg-2)]"
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-[var(--t-6)] mb-2">الاسم الكامل</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="أدخل اسمك"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border border-[var(--b-1)] text-[var(--t-1)] placeholder:text-[var(--t-10)] focus:border-[oklch(0.72_0.14_180)] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-[var(--t-6)] mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="example@email.com"
                  dir="ltr"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border border-[var(--b-1)] text-[var(--t-1)] placeholder:text-[var(--t-10)] focus:border-[oklch(0.72_0.14_180)] focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-[var(--t-6)] mb-2">رقم الهاتف</label>
              <input
                type="tel"
                name="phone"
                placeholder="+972 XX XXX XXXX"
                dir="ltr"
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border border-[var(--b-1)] text-[var(--t-1)] placeholder:text-[var(--t-10)] focus:border-[oklch(0.72_0.14_180)] focus:outline-none transition-colors"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-[var(--t-6)] mb-2">نوع الخدمة</label>
              <select name="service" className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border border-[var(--b-1)] text-[var(--t-1)] focus:border-[oklch(0.72_0.14_180)] focus:outline-none transition-colors appearance-none">
                <option value="">اختر الخدمة المطلوبة</option>
                <option value="gps">أجهزة GPS و RTK</option>
                <option value="total-station">أجهزة التوتل ستيشن</option>
                <option value="scanning">المسح الضوئي ثلاثي الأبعاد</option>
                <option value="gis">أنظمة GIS والخرائط</option>
                <option value="monitoring">أنظمة مراقبة التحرك</option>
                <option value="training">التدريب والدعم الفني</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm text-[var(--t-6)] mb-2">تفاصيل المشروع</label>
              <textarea
                rows={4}
                name="message"
                required
                placeholder="اكتب تفاصيل مشروعك هنا..."
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border border-[var(--b-1)] text-[var(--t-1)] placeholder:text-[var(--t-10)] focus:border-[oklch(0.72_0.14_180)] focus:outline-none transition-colors resize-none"
              />
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2 py-4 text-[oklch(0.72_0.14_180)] font-semibold"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  تم إرسال رسالتك بنجاح! سنتواصل معك قريباً
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {error && (
                    <div className="mb-3 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-[oklch(0.72_0.14_180)] text-[oklch(0.13_0.02_250)] font-bold rounded-xl hover:bg-[oklch(0.75_0.15_180)] transition-all duration-300 glow-teal-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        إرسال الرسالة
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </Section>
  )
}

/* ───────── documents / resources ───────── */
function Documents() {
  const [activeDoc, setActiveDoc] = useState<string | null>(null)

  const docs = [
    {
      id: 'cv',
      title: 'السيرة الذاتية',
      description: 'السيرة الذاتية لشركة اكسيس للحلول الهندسية المتقدمة',
      icon: <BookOpen className="w-6 h-6" />,
      file: '/docs/cv-2025.pdf',
      color: 'from-[oklch(0.72_0.14_180)] to-[oklch(0.65_0.16_200)]',
      borderColor: 'border-[oklch(0.72_0.14_180_/_0.3)]',
      category: 'السيرة الذاتية',
    },
    {
      id: 'clients',
      title: 'زبائن الشركة',
      description: 'قائمة شاملة بعملاء شركة اكسيس والمشاريع المنفذة',
      icon: <Users className="w-6 h-6" />,
      file: '/docs/clients.pdf',
      color: 'from-[oklch(0.75_0.15_330)] to-[oklch(0.65_0.16_300)]',
      borderColor: 'border-[oklch(0.75_0.15_330_/_0.3)]',
      category: 'الزبائن',
    },
    {
      id: 'network-general',
      title: 'شبكة المحطات الثابتة',
      description: 'معلومات شبكة أكسيس للمحطات الثابتة المرجعية',
      icon: <Globe className="w-6 h-6" />,
      file: '/docs/network-general.pdf',
      color: 'from-[oklch(0.80_0.10_160)] to-[oklch(0.72_0.14_180)]',
      borderColor: 'border-[oklch(0.80_0.10_160_/_0.3)]',
      category: 'شبكة المحطات',
    },
    {
      id: 'network-complete',
      title: 'أوراق اعتماد الشبكة',
      description: 'الوثائق والأوراق الرسمية لاعتماد شبكة المحطات',
      icon: <Award className="w-6 h-6" />,
      file: '/docs/network-complete.pdf',
      color: 'from-[oklch(0.60_0.18_30)] to-[oklch(0.55_0.14_50)]',
      borderColor: 'border-[oklch(0.60_0.18_30_/_0.3)]',
      category: 'أوراق الاعتماد',
    },
    {
      id: 'tech-support',
      title: 'الدعم الفني',
      description: 'وثائق الدعم الفني والخدمات المقدمة للعملاء',
      icon: <Cog className="w-6 h-6" />,
      file: '/docs/technical-support.pdf',
      color: 'from-[oklch(0.55_0.12_250)] to-[oklch(0.65_0.16_200)]',
      borderColor: 'border-[oklch(0.55_0.12_250_/_0.3)]',
      category: 'الدعم الفني',
    },
  ]

  return (
    <Section id="documents" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[oklch(0.72_0.14_180_/_0.04)] rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-[oklch(0.65_0.16_200_/_0.04)] rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">من نحن</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            تعرف اكثر <span className="gradient-text">علينا</span>
          </h2>
          <p className="text-[var(--t-7)] max-w-2xl mx-auto">
            تصفح السيرة الذاتية للشركة ووثائق الاعتماد وشبكة المحطات وقائمة الزبائن
          </p>
        </div>

        {/* Document cards - grouped by category */}
        {(() => {
          const categories = [
            { key: 'السيرة الذاتية', label: 'السيرة الذاتية', icon: <BookOpen className="w-7 h-7" /> },
            { key: 'الزبائن', label: 'زبائن الشركة', icon: <Users className="w-7 h-7" /> },
            { key: 'شبكة المحطات', label: 'شبكة المحطات', icon: <Globe className="w-7 h-7" /> },
            { key: 'أوراق الاعتماد', label: 'أوراق اعتماد الشبكة', icon: <Award className="w-7 h-7" /> },
            { key: 'الدعم الفني', label: 'الدعم الفني', icon: <Cog className="w-7 h-7" /> },
          ]
          return categories.map((cat) => {
            const catDocs = docs.filter(d => d.category === cat.key)
            if (catDocs.length === 0) return null
            return (
              <div key={cat.key} className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[oklch(0.72_0.14_180_/_0.15)] border border-[oklch(0.72_0.14_180_/_0.3)] flex items-center justify-center text-[oklch(0.72_0.14_180)]">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--t-0)]">{cat.label}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {catDocs.map((doc, i) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className={`group relative rounded-2xl border ${doc.borderColor} bg-[var(--bg-2)] hover:bg-[var(--bg-3)] transition-all duration-500 overflow-hidden hover:shadow-lg hover:shadow-[oklch(0.72_0.14_180_/_0.06)] cursor-pointer`}
                      onClick={() => setActiveDoc(doc.id)}
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      <div className="flex items-center gap-4 p-4 sm:p-5">
                        {/* Icon */}
                        <div className={`shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${doc.color} flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-105`}>
                          {doc.icon}
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[var(--t-0)] font-bold text-sm sm:text-base mb-1 leading-tight">{doc.title}</h4>
                          <p className="text-[var(--t-8)] text-xs leading-relaxed line-clamp-2">{doc.description}</p>
                        </div>
                        {/* View button */}
                        <div className="shrink-0 flex flex-col items-center gap-1">
                          <div className="w-10 h-10 rounded-full bg-[oklch(0.72_0.14_180_/_0.1)] group-hover:bg-[oklch(0.72_0.14_180)] flex items-center justify-center transition-all duration-300">
                            <Eye className="w-4 h-4 text-[oklch(0.72_0.14_180)] group-hover:text-[oklch(0.13_0.02_250)] transition-colors duration-300" />
                          </div>
                          <span className="text-[9px] text-[var(--t-9)] group-hover:text-[oklch(0.72_0.14_180)] transition-colors">مشاهدة</span>
                        </div>
                        {/* Lock badge */}
                        <div className="absolute top-2 left-2 flex items-center gap-1 opacity-50">
                          <Lock className="w-2.5 h-2.5 text-[var(--t-8)]" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })
        })()}

        {/* PDF Viewer Modal */}
        <AnimatePresence>
          {activeDoc && (() => {
            const doc = docs.find(d => d.id === activeDoc)
            if (!doc) return null
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={() => setActiveDoc(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative w-full max-w-5xl h-[85vh] bg-[var(--bg-1)] rounded-2xl border border-[var(--b-2)] overflow-hidden shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {/* Modal header */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--b-1)] bg-[var(--bg-2)]">
                    <div className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-[oklch(0.72_0.14_180)]" />
                      <span className="text-[var(--t-2)] text-sm font-semibold">{doc.title}</span>
                      <span className="text-[var(--t-8)] text-xs">- مشاهدة فقط</span>
                    </div>
                    <button
                      onClick={() => setActiveDoc(null)}
                      className="w-8 h-8 rounded-lg bg-[oklch(0.30_0.03_250)] hover:bg-[oklch(0.40_0.04_250)] flex items-center justify-center text-[var(--t-4)] transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {/* PDF viewer - view only, no download */}
                  <div
                    className="w-full h-[calc(100%-52px)] relative"
                    style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                    onContextMenu={(e) => e.preventDefault()}
                    onCopy={(e) => e.preventDefault()}
                  >
                    {/* Invisible overlay to block direct interaction with PDF toolbar */}
                    <div className="absolute top-0 left-0 right-0 h-10 z-10" onContextMenu={(e) => e.preventDefault()} />
                    <object
                      data={`${doc.file}#toolbar=0&navpanes=0&scrollbar=1&page=1&view=FitH`}
                      type="application/pdf"
                      className="w-full h-full"
                      title={doc.title}
                    >
                      <embed
                        src={`${doc.file}#toolbar=0&navpanes=0&scrollbar=1&page=1&view=FitH`}
                        type="application/pdf"
                        className="w-full h-full"
                      />
                    </object>
                  </div>
                </motion.div>
              </motion.div>
            )
          })()}
        </AnimatePresence>
      </div>
    </Section>
  )
}

/* ───────── footer ───────── */
function Footer() {
  return (
    <footer className="border-t border-[var(--b-1)] bg-[var(--bg-0)]">
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
                <span className="block text-[10px] text-[var(--t-8)]">للحلول الهندسية المتقدمة</span>
              </div>
            </div>
            <p className="text-[var(--t-8)] text-sm leading-relaxed mb-4">
              شريكك الموثوق لتقنيات المساحة والجيوماتكس - الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و DJI
            </p>
            {/* Footer Social Icons */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  className="w-9 h-9 rounded-lg bg-[var(--bg-tab)] border border-[var(--b-1)] flex items-center justify-center text-[var(--t-8)] hover:text-[oklch(0.72_0.14_180)] hover:border-[var(--accent-border-sm)] transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[var(--t-1)] font-semibold mb-4">روابط سريعة</h4>
            <div className="space-y-2">
              {['الرئيسية', 'من نحن', 'خدماتنا', 'المعرض', 'تواصل معنا'].map((l, i) => (
                <a key={i} href={`#${['hero', 'about', 'services', 'gallery', 'contact'][i]}`} className="block text-[var(--t-8)] hover:text-[oklch(0.72_0.14_180)] text-sm transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[var(--t-1)] font-semibold mb-4">خدماتنا</h4>
            <div className="space-y-2">
              {['أجهزة GPS و GNSS', 'التوتل ستيشن', 'المسح الضوئي 3D', 'أنظمة GIS و VRS', 'ليزر وبناء', 'Axis Campus'].map((s, i) => (
                <span key={i} className="block text-[var(--t-8)] text-sm">{s}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[var(--t-1)] font-semibold mb-4">تواصل معنا</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[var(--t-8)] text-sm">
                <Phone className="w-4 h-4 text-[oklch(0.72_0.14_180)]" />
                <span dir="ltr">0594224497</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--t-8)] text-sm">
                <Phone className="w-4 h-4 text-[oklch(0.72_0.14_180)]" />
                <span dir="ltr">0595289999</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--t-8)] text-sm">
                <Mail className="w-4 h-4 text-[oklch(0.72_0.14_180)]" />
                <span dir="ltr">adnan@axis-gps.com</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--t-8)] text-sm">
                <Mail className="w-4 h-4 text-[oklch(0.72_0.14_180)]" />
                <span dir="ltr">salame@axis-gps.com</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--t-8)] text-sm">
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <a href="https://wa.me/972525289999" target="_blank" rel="noopener noreferrer" className="hover:text-[oklch(0.72_0.14_180)] transition-colors">
                  <span dir="ltr">+972 52-528-9999</span>
                </a>
              </div>
              <div className="flex items-start gap-2 text-[var(--t-8)] text-sm">
                <MapPin className="w-4 h-4 text-[oklch(0.72_0.14_180)] mt-0.5 shrink-0" />
                <div className="space-y-1.5">
                  <a href="https://www.google.com/maps?q=32.7579702,35.3189103" target="_blank" rel="noopener noreferrer" className="block hover:text-[oklch(0.72_0.14_180)] transition-colors">
                    الفرع الرئيسي: المنطقة الصناعية تسيفوريت ↗
                  </a>
                  <a href="https://www.google.com/maps?q=32.11146,34.96504" target="_blank" rel="noopener noreferrer" className="block hover:text-[oklch(0.72_0.14_180)] transition-colors">
                    فرع الشمال: كفر قاسم شارع علي بن أبي طالب ↗
                  </a>
                  <a href="https://www.google.com/maps?q=31.92730,35.20910" target="_blank" rel="noopener noreferrer" className="block hover:text-[oklch(0.72_0.14_180)] transition-colors">
                    فرع رام الله: شارع الإرسال قرب السفينة ↗
                  </a>
                  <a href="https://www.google.com/maps?q=31.537372,35.0987544" target="_blank" rel="noopener noreferrer" className="block hover:text-[oklch(0.72_0.14_180)] transition-colors">
                    فرع الخليل: شارع عين سارة مقابل ستاد الحسين ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-[var(--b-1)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--t-10)] text-sm">
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} اكسيس للحلول الهندسية المتقدمة
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/axisTRIMBLE" target="_blank" rel="noopener noreferrer" className="text-[var(--t-10)] hover:text-[oklch(0.72_0.14_180)] text-xs transition-colors">Facebook</a>
            <a href="https://www.youtube.com/@axisgpssurveyinginstrument8400" target="_blank" rel="noopener noreferrer" className="text-[var(--t-10)] hover:text-[oklch(0.72_0.14_180)] text-xs transition-colors">YouTube</a>
            <a href="https://www.instagram.com/axis.gps/" target="_blank" rel="noopener noreferrer" className="text-[var(--t-10)] hover:text-[oklch(0.72_0.14_180)] text-xs transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ───────── floating whatsapp ───────── */
function FloatingWhatsApp() {
  const [pulse, setPulse] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 5000)
    return () => clearTimeout(t)
  }, [])
  return (
    <motion.a
      href="https://wa.me/972525289999"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      className={`fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 flex items-center justify-center text-white hover:bg-[#20BD5A] hover:scale-110 transition-all duration-300 ${pulse ? 'animate-pulse' : ''}`}
      title="تواصل معنا عبر واتساب"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </motion.a>
  )
}

/* ───────── branches quick section ───────── */
function Branches() {
  const branches = [
    {
      name: 'الفرع الرئيسي',
      address: 'المنطقة الصناعية تسيفوريت',
      phone: '04-6419995',
      lat: 32.7579702,
      lng: 35.3189103,
      color: '#0ea5a0',
    },
    {
      name: 'فرع الشمال',
      address: 'كفر قاسم - شارع علي بن أبي طالب 2',
      phone: '0595289999',
      lat: 32.11146,
      lng: 34.96504,
      color: '#6366f1',
    },
    {
      name: 'فرع رام الله',
      address: 'رام الله - شارع الإرسال قرب السفينة',
      phone: '02-2950149',
      lat: 31.92730,
      lng: 35.20910,
      color: '#f59e0b',
    },
    {
      name: 'فرع الخليل',
      address: 'الخليل - برج العز ط5 شارع عين سارة',
      phone: '0594224498',
      lat: 31.537372,
      lng: 35.0987544,
      color: '#ef4444',
    },
  ]

  return (
    <Section id="branches" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-[oklch(0.72_0.14_180_/_0.04)] rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2">
            <MapPinned className="w-4 h-4" />
            فروعنا
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            نصل <span className="gradient-text">إليك أينما كنت</span>
          </h2>
          <p className="text-[var(--t-7)] max-w-2xl mx-auto">
            أربعة فروع رئيسية تغطي جميع مناطق فلسطين لخدمتكم بأسرع وقت وأعلى جودة
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {branches.map((b, i) => (
            <motion.a
              key={b.name}
              href={`https://www.google.com/maps?q=${b.lat},${b.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group relative p-6 rounded-2xl border border-[var(--b-1)] bg-[var(--bg-2)] hover:border-[var(--accent-border)] transition-all duration-500 overflow-hidden text-right"
            >
              {/* Color accent top */}
              <div className="absolute top-0 right-0 left-0 h-1 rounded-t-2xl" style={{ backgroundColor: b.color }} />
              
              {/* Hover glow */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: `${b.color}15` }} />

              <div className="relative">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${b.color}15`, border: `1px solid ${b.color}30` }}>
                  <MapPin className="w-5 h-5" style={{ color: b.color }} />
                </div>
                <h3 className="text-lg font-bold text-[var(--t-1)] mb-2">{b.name}</h3>
                <p className="text-[var(--t-7)] text-sm leading-relaxed mb-3">{b.address}</p>
                <div className="flex items-center gap-2 text-[var(--t-8)] text-xs">
                  <Phone className="w-3.5 h-3.5" />
                  <span dir="ltr">{b.phone}</span>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[oklch(0.72_0.14_180)] text-xs font-medium group-hover:gap-2 transition-all">
                  <span>عرض على الخريطة</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ───────── CEO message / quote ───────── */
function CEOMessage() {
  return (
    <Section id="ceo-message" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[oklch(0.72_0.14_180_/_0.05)] rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[oklch(0.65_0.16_200_/_0.04)] rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2">
            <Quote className="w-4 h-4" />
            كلمة المدير العام
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            رسالة <span className="gradient-text">المهندس سلامة عواودة</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl border border-[oklch(0.72_0.14_180_/_0.2)] bg-[var(--bg-2)] p-8 sm:p-12"
        >
          {/* Decorative quote marks */}
          <div className="absolute top-4 right-6 text-[oklch(0.72_0.14_180)] opacity-15">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
          </div>
          <div className="absolute bottom-4 left-6 text-[oklch(0.72_0.14_180)] opacity-15 rotate-180">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
          </div>

          <div className="relative space-y-5">
            <p className="text-[var(--t-2b)] text-base sm:text-lg leading-loose">
              خلال أكثر من عشرين عاماً من الزمان، نجحت شركة أكسيس في أن تصبح الشركة الأولى في فلسطين من خلال فروعها المنتشرة والتي تصل لكل المحافظات، والتي سهلت الوصول لكل من له علاقة بالمساحة من أفراد ومؤسسات أهلية وحكومية كالوزارات والبلديات والجامعات ومكاتب المساحة المرخصة والمساحين.
            </p>
            <p className="text-[var(--t-3)] text-base sm:text-lg leading-loose">
              تزايدت الطاقة الإنتاجية وصارت اكسيس دعامة قوية وأساسية في النهضة التكنولوجية والتقنية التي تشهدها فلسطين في عالم المساحة وخاصة مع بدء أعمال ومشاريع التسوية الوطنية في الأراضي الفلسطينية. لقد أعطت اكسيس دفعة قوية لعمليات المساحة والتسوية، وصارت مورّداً يعتمد عليه في تغذية التكنولوجيا الحديثة في عالم المساحة وتقنياتها وخصوصاً في تقنية GPS.
            </p>
            <p className="text-[var(--t-4)] text-base sm:text-lg leading-loose">
              حرصت إدارة شركة أكسيس على التجاوب السريع والفعال مع جهود الحكومة الفلسطينية في التنمية والتطور في مجال المساحة، بإعتبار أن مشروع التسوية هو مشروع وطني بامتياز يهدف إلى حفظ الأرض والتي هي حجر الأساس في مشروع الدولة المنتظر. وعليه استطاعت أكسيس أن توفر ما يزيد عن 85% من احتياجات البلديات والمساحين العاملين في مشروع التسوية بأفضل التقنيات وبأسرع وقت وبتواصل ودعم فني مستمر بشكل يومي ومباشر.
            </p>

            {/* Highlighted quote */}
            <div className="relative my-8 px-6 py-5 rounded-2xl bg-[oklch(0.72_0.14_180_/_0.08)] border border-[oklch(0.72_0.14_180_/_0.15)]">
              <Quote className="absolute top-3 right-3 w-5 h-5 text-[oklch(0.72_0.14_180)] opacity-30" />
              <p className="text-[var(--t-1)] text-lg sm:text-xl font-bold leading-relaxed">
                سوف تواصل شركة AXIS بالاستثمار للحفاظ على التميز في مجال المساحة وسوف تعمل على ترقية هذه المهنة في البلاد.
              </p>
            </div>

            {/* Signature */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-[var(--b-1)]">
              <div className="text-left">
                <p className="text-[var(--t-1)] font-bold text-base">المهندس سلامة عواودة</p>
                <p className="text-[var(--t-7)] text-sm">المدير العام — شركة أكسيس للحلول الهندسية المتقدمة</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[oklch(0.72_0.14_180)] to-[oklch(0.65_0.16_200)] flex items-center justify-center text-white font-bold text-xl shrink-0">
                س
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

/* ───────── social media feed ───────── */
function SocialFeed() {
  const [activePlatform, setActivePlatform] = useState<'all' | 'instagram' | 'facebook' | 'youtube'>('all')

  const feedItems = [
    {
      platform: 'instagram' as const,
      title: 'شكراً لكل من زارنا وتعرف على تقنيات Trimble و NavVis و Xgrids المتقدمة',
      href: 'https://www.instagram.com/p/DYMX_zvCIAt',
      date: '2025',
    },
    {
      platform: 'instagram' as const,
      title: 'تعاون جمعية إعادة الإطار المعماري × اكسيس × جامعة القدس',
      href: 'https://www.instagram.com/p/DYIVKBDiDkf',
      date: '2025',
    },
    {
      platform: 'instagram' as const,
      title: 'وراء كل طريق وبرج أيقوني في أبوظبي — Trimble Total Station',
      href: 'https://www.instagram.com/reel/DXYyA2_DyhE',
      date: '2025',
    },
    {
      platform: 'facebook' as const,
      title: 'تهنئة لـ Juman Home رام الله على اقتناء جهاز المسح ثلاثي الأبعاد Trimble X9!',
      href: 'https://www.facebook.com/axisTRIMBLE',
      date: '2025',
    },
    {
      platform: 'youtube' as const,
      title: '3D Laser Scanning the Nablus Court of Appeal',
      href: 'https://www.youtube.com/watch?v=XgBOGJzBn5g',
      date: '2025',
    },
    {
      platform: 'youtube' as const,
      title: 'NavVis MLX – Redefining Handheld Reality Capture',
      href: 'https://www.youtube.com/watch?v=-IDRr44-6RA',
      date: '2025',
    },
    {
      platform: 'instagram' as const,
      title: 'مسح رادار أرضي بالدرون Zond Aero 500 GPR',
      href: 'https://www.instagram.com/reel/DSB4QDaDwLW',
      date: '2025',
    },
    {
      platform: 'instagram' as const,
      title: 'توتل ستيشن يجمع بين سهولة الاستخدام والدقة العالية',
      href: 'https://www.instagram.com/reel/DXEuqvGD6Dw',
      date: '2025',
    },
    {
      platform: 'facebook' as const,
      title: 'ورشة لجنة التسوية حول مفاهيم GNSS — اكسيس تقدم أجهزة GPS',
      href: 'https://www.facebook.com/lwscps/posts/1427944703988935',
      date: '2025',
    },
  ]

  const filtered = activePlatform === 'all' ? feedItems : feedItems.filter(f => f.platform === activePlatform)

  const platformConfig = {
    instagram: { color: 'from-[#833AB4] via-[#FD1D1D] to-[#F77737]', label: 'Instagram', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
    facebook: { color: 'from-[#1877F2] to-[#0d5bbf]', label: 'Facebook', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    youtube: { color: 'from-[#FF0000] to-[#cc0000]', label: 'YouTube', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
  }

  return (
    <Section id="social" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">تابعنا</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            أحدث <span className="gradient-text">أخبارنا ومنشوراتنا</span>
          </h2>
          <p className="text-[var(--t-7)] max-w-2xl mx-auto">
            تابعونا على منصات التواصل الاجتماعي للحصول على آخر الأخبار والعروض والفيديوهات التعليمية
          </p>
        </div>

        {/* Platform filter */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {(['all', 'instagram', 'facebook', 'youtube'] as const).map(p => (
            <button
              key={p}
              onClick={() => setActivePlatform(p)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activePlatform === p
                  ? 'bg-[oklch(0.72_0.14_180)] text-[oklch(0.13_0.02_250)] shadow-lg shadow-[oklch(0.72_0.14_180_/_0.2)]'
                  : 'bg-[var(--bg-tab)] border border-[var(--b-1)] text-[var(--t-6)] hover:border-[var(--accent-border-sm)] hover:text-[oklch(0.72_0.14_180)]'
              }`}
            >
              {p !== 'all' && platformConfig[p].icon}
              {p === 'all' ? 'الكل' : platformConfig[p].label}
            </button>
          ))}
        </div>

        {/* Feed grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePlatform}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((item, i) => (
              <motion.a
                key={`${item.platform}-${i}`}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.08, 0.4) }}
                className="group relative p-6 rounded-2xl border border-[var(--b-1)] bg-[var(--bg-2)] hover:border-[var(--accent-border)] transition-all duration-500"
              >
                {/* Platform badge */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-l ${platformConfig[item.platform].color} text-white text-[10px] font-bold mb-4`}>
                  {platformConfig[item.platform].icon}
                  {platformConfig[item.platform].label}
                </div>
                
                <h4 className="text-[var(--t-1)] font-semibold text-sm leading-relaxed mb-4">{item.title}</h4>
                
                <div className="flex items-center gap-1 text-[var(--t-8)] text-xs group-hover:text-[oklch(0.72_0.14_180)] transition-colors">
                  <span>عرض المنشور</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Social links */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          {SOCIALS.map(s => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--bg-2)] border border-[var(--b-1)] text-[var(--t-5)] hover:border-[var(--accent-border)] hover:text-[oklch(0.72_0.14_180)] transition-all duration-300 text-sm font-medium"
            >
              {s.icon}
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ───────── floating theme toggle (PORTAL - rendered to document.body) ───────── */
function FloatingThemeToggle() {
  const { theme, toggle: toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const toggleEl = (
    <button
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        left: 'auto',
        top: 'auto',
        zIndex: 999999,
        width: '56px',
        height: '56px',
        minWidth: '56px',
        minHeight: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #facc15, #f59e0b)'
          : 'linear-gradient(135deg, #1e293b, #0f172a)',
        color: theme === 'dark' ? '#0f172a' : '#facc15',
        border: theme === 'dark' ? '4px solid #eab308' : '4px solid #64748b',
        boxShadow: theme === 'dark'
          ? '0 0 24px rgba(250,204,21,0.7), 0 0 48px rgba(250,204,21,0.3), 0 4px 12px rgba(0,0,0,0.4)'
          : '0 0 24px rgba(30,41,59,0.5), 0 0 48px rgba(100,116,139,0.2), 0 4px 12px rgba(0,0,0,0.2)',
        padding: '0',
        outline: 'none',
        isolation: 'isolate',
      }}
      aria-label={theme === 'dark' ? 'تبديل إلى الوضع النهاري' : 'تبديل إلى الوضع الليلي'}
      title={theme === 'dark' ? '☀ الوضع النهاري' : '🌙 الوضع الليلي'}
    >
      {theme === 'dark' ? (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <circle cx="12" cy="12" r="5" />
          <rect x="11" y="1" width="2" height="4" rx="1" />
          <rect x="11" y="19" width="2" height="4" rx="1" />
          <rect x="1" y="11" width="4" height="2" rx="1" />
          <rect x="19" y="11" width="4" height="2" rx="1" />
          <rect x="4.2" y="4.2" width="2" height="3" rx="1" transform="rotate(45 5.2 5.7)" />
          <rect x="17.8" y="16.8" width="2" height="3" rx="1" transform="rotate(45 18.8 18.3)" />
          <rect x="4.2" y="16.8" width="3" height="2" rx="1" transform="rotate(45 5.7 17.8)" />
          <rect x="17.8" y="4.2" width="3" height="2" rx="1" transform="rotate(45 18.3 5.2)" />
        </svg>
      ) : (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )

  return createPortal(toggleEl, document.body)
}

/* ───────── main page ───────── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <FloatingThemeToggle />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <CEOMessage />
        <Stats />
        <Brands />
        <SocialFeed />
        <Gallery />
        <Services />
        <Projects />
        <WhyUs />
        <Team />
        <Documents />
        <Testimonials />
        <Branches />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
