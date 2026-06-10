import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react'

interface TeamMember {
  id: number
  name: string
  role: string
  location: string
  specialty: string
  focus: string[]
  image: string
  tabs: string[]
  accentColor: string
  accentRGB: string
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1, name: 'Casey Aylward', role: 'General Partner',
    location: 'Bay Area', specialty: 'Early Stage',
    focus: ['AI', 'Cloud / SaaS', 'Security'],
    image: '/team/casey.png', tabs: ['Global', 'Bay Area'],
    accentColor: 'rgba(180,55,55,0.6)', accentRGB: '180,55,55',
  },
  {
    id: 2, name: 'Mahendran B.', role: 'Venture Partner',
    location: 'Bangalore', specialty: 'Deep Tech',
    focus: ['Enterprise', 'Infrastructure', 'Dev Tools'],
    image: '/team/mahendran.png', tabs: ['Global', 'Bangalore'],
    accentColor: 'rgba(25,85,130,0.6)', accentRGB: '25,85,130',
  },
  {
    id: 3, name: 'Philippe Botteri', role: 'General Partner',
    location: 'London', specialty: 'Growth Stage',
    focus: ['FinTech', 'SaaS', 'Marketplace'],
    image: '/team/philippe.png', tabs: ['Global', 'London'],
    accentColor: 'rgba(50,100,65,0.6)', accentRGB: '50,100,65',
  },
  {
    id: 4, name: 'Andrew Braccia', role: 'General Partner',
    location: 'Bay Area', specialty: 'Consumer',
    focus: ['Social', 'Gaming', 'Media'],
    image: '/team/andrew.png', tabs: ['Global', 'Bay Area'],
    accentColor: 'rgba(30,65,120,0.6)', accentRGB: '30,65,120',
  },
  {
    id: 5, name: 'Sarah Mitchell', role: 'Principal',
    location: 'London', specialty: 'Series A / B',
    focus: ['HealthTech', 'Climate', 'EdTech'],
    image: '/team/sarah.png', tabs: ['Global', 'London'],
    accentColor: 'rgba(100,45,120,0.6)', accentRGB: '100,45,120',
  },
  {
    id: 6, name: 'Raj Patel', role: 'Associate',
    location: 'Bangalore', specialty: 'Pre-Seed',
    focus: ['Web3', 'AI', 'Consumer Apps'],
    image: '/team/raj.png', tabs: ['Global', 'Bangalore'],
    accentColor: 'rgba(15,110,100,0.6)', accentRGB: '15,110,100',
  },
  {
    id: 7, name: 'Marcus Chen', role: 'Partner',
    location: 'Bay Area', specialty: 'Late Stage',
    focus: ['Data Analytics', 'Cybersecurity', 'Cloud'],
    image: '/team/marcus.png', tabs: ['Global', 'Bay Area'],
    accentColor: 'rgba(130,85,15,0.6)', accentRGB: '130,85,15',
  },
  {
    id: 8, name: 'Elena Rivera', role: 'Venture Partner',
    location: 'London', specialty: 'Impact',
    focus: ['Climate Tech', 'AgriTech', 'BioTech'],
    image: '/team/elena.png', tabs: ['Global', 'London', 'Emeritus'],
    accentColor: 'rgba(25,110,60,0.6)', accentRGB: '25,110,60',
  },
]

const TABS = ['Global', 'Bay Area', 'London', 'Bangalore', 'Emeritus']
const EASE = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'

function stagger(delayMs: number): React.CSSProperties {
  return {
    transitionProperty: 'opacity, transform',
    transitionDuration: '480ms',
    transitionTimingFunction: EASE,
    transitionDelay: `${delayMs}ms`,
    willChange: 'opacity, transform',
  }
}

function MetaLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="uppercase font-semibold text-white/40 tracking-widest" style={{ fontSize: '8px' }}>
      {children}
    </span>
  )
}

function useIsCoarsePointer() {
  const [isCoarse] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  )
  return isCoarse
}

interface CardProps {
  member: TeamMember
  index: number
  activeId: number | null
  setActiveId: (id: number | null) => void
}

function MemberCard({ member, index, activeId, setActiveId }: CardProps) {
  const isCoarse = useIsCoarsePointer()
  const cardRef = useRef<HTMLDivElement>(null)
  const active = activeId === member.id

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 24 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 24 })
  const rotateX = useTransform(springY, [-0.5, 0.5], ['3.5deg', '-3.5deg'])
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-3.5deg', '3.5deg'])

  function resetTilt() {
    mouseX.set(0)
    mouseY.set(0)
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isCoarse) return
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseEnter() {
    if (!isCoarse) setActiveId(member.id)
  }

  function handleMouseLeave() {
    if (!isCoarse) {
      setActiveId(null)
      resetTilt()
    }
  }

  function handleTap(e: React.MouseEvent | React.TouchEvent) {
    e.stopPropagation()
    if (!isCoarse) return
    setActiveId(active ? null : member.id)
  }

  useEffect(() => {
    if (!isCoarse || !active) return

    function handleOutside(e: TouchEvent) {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setActiveId(null)
      }
    }

    document.addEventListener('touchstart', handleOutside, { passive: true })
    return () => document.removeEventListener('touchstart', handleOutside)
  }, [active, isCoarse, setActiveId])

  const scrimBg = `linear-gradient(160deg, ${member.accentColor} 0%, rgba(0,0,0,0.04) 45%, rgba(0,0,0,0.86) 100%)`

  return (
    <motion.div
      className="flex flex-col"
      style={{ cursor: isCoarse ? 'pointer' : 'default' }}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.48, delay: index * 0.055, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        ref={cardRef}
        className="relative overflow-hidden bg-neutral-900 select-none"
        style={{
          aspectRatio: '3 / 4',
          isolation: 'isolate',
          borderRadius: 'clamp(10px, 2vw, 18px)',
          rotateX: (!isCoarse && active) ? rotateX : 0,
          rotateY: (!isCoarse && active) ? rotateY : 0,
          transformStyle: 'preserve-3d',
          transformPerspective: 900,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={handleTap}
        onTouchStart={isCoarse ? (e) => e.stopPropagation() : undefined}
        whileHover={!isCoarse ? { scale: 1.014 } : {}}
        whileTap={isCoarse ? { scale: 0.98 } : {}}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <img
          src={member.image}
          alt={member.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
          draggable={false}
          style={{
            transitionProperty: 'filter, transform',
            transitionDuration: '700ms',
            transitionTimingFunction: EASE,
            willChange: 'filter, transform',
            backfaceVisibility: 'hidden',
            filter: active ? 'blur(6px) brightness(0.6)' : 'blur(0px) brightness(1)',
            transform: active ? 'scale(1.06)' : 'scale(1)',
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.42) 0%, transparent 48%)',
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: scrimBg,
            opacity: active ? 1 : 0,
            transitionProperty: 'opacity',
            transitionDuration: '500ms',
            transitionTimingFunction: EASE,
            willChange: 'opacity',
          }}
        />
        <div
          className="absolute inset-0 flex flex-col justify-between pointer-events-none"
          style={{ padding: 'clamp(10px, 2vw, 22px)' }}
        >
          <h2
            className="text-white font-medium leading-tight tracking-tight drop-shadow-lg"
            style={{
              fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
              fontSize: 'clamp(0.82rem, 2vw, 1.5rem)',
              opacity: active ? 1 : 0,
              transform: active ? 'translateY(0px)' : 'translateY(-14px)',
              ...stagger(0),
            }}
          >
            {member.name}
          </h2>

          <div className="flex flex-col pointer-events-auto" style={{ gap: 'clamp(6px, 1.2vw, 14px)' }}>

            <div
              className="grid grid-cols-2"
              style={{
                gap: 'clamp(4px, 1vw, 10px)',
                opacity: active ? 1 : 0,
                transform: active ? 'translateY(0px)' : 'translateY(-10px)',
                ...stagger(60),
              }}
            >
              <div className="flex flex-col gap-0.5">
                <MetaLabel>BASED IN</MetaLabel>
                <span className="text-white font-light leading-snug" style={{ fontSize: 'clamp(9px, 1.5vw, 13px)' }}>
                  {member.location}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <MetaLabel>SPECIALITY</MetaLabel>
                <span className="text-white font-light leading-snug" style={{ fontSize: 'clamp(9px, 1.5vw, 13px)' }}>
                  {member.specialty}
                </span>
              </div>
            </div>

            <div
              className="flex flex-col gap-0.5"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? 'translateY(0px)' : 'translateY(-8px)',
                ...stagger(115),
              }}
            >
              <MetaLabel>FOCUS</MetaLabel>
              {member.focus.map((f) => (
                <span key={f} className="text-white font-light leading-snug" style={{ fontSize: 'clamp(9px, 1.4vw, 12.5px)' }}>
                  {f}
                </span>
              ))}
            </div>

            <div
              className="flex items-center justify-between"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? 'translateY(0px)' : 'translateY(-6px)',
                ...stagger(170),
              }}
            >
              <button
                aria-label={`View ${member.name}`}
                className="rounded-full flex items-center justify-center text-white backdrop-blur-md pointer-events-auto"
                style={{
                  width: 'clamp(28px, 3.5vw, 40px)',
                  height: 'clamp(28px, 3.5vw, 40px)',
                  background: `rgba(${member.accentRGB}, 0.65)`,
                  border: `1px solid rgba(${member.accentRGB}, 0.8)`,
                  transitionProperty: 'background, transform',
                  transitionDuration: '180ms',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.background = `rgba(${member.accentRGB}, 0.95)`
                  el.style.transform = 'scale(1.1)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.background = `rgba(${member.accentRGB}, 0.65)`
                  el.style.transform = 'scale(1)'
                }}
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  style={{ width: 'clamp(11px, 1.5vw, 15px)', height: 'clamp(11px, 1.5vw, 15px)' }}
                >
                  <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <span
                className="text-white/40 font-medium uppercase"
                style={{ fontSize: 'clamp(7px, 1vw, 8.5px)', letterSpacing: '0.13em' }}
              >
                {member.role}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <p
        className="truncate"
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 'clamp(10px, 1.4vw, 13px)',
          marginTop: 'clamp(6px, 1vw, 10px)',
          paddingLeft: '2px',
          letterSpacing: '0.02em',
          color: active ? '#ffffff' : '#6b7280',
          transitionProperty: 'color',
          transitionDuration: '300ms',
          transitionTimingFunction: EASE,
        }}
      >
        {member.name}
      </p>
    </motion.div>
  )
}

function TabBar({ tabs, activeTab, onSelect }: {
  tabs: string[]
  activeTab: string
  onSelect: (t: string) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ind, setInd] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    const c = containerRef.current
    if (!c) return
    const btn = c.querySelector<HTMLButtonElement>(`[data-tab="${activeTab}"]`)
    if (!btn) return
    setInd({ left: btn.offsetLeft, width: btn.offsetWidth })
  }, [activeTab])

  return (
    <div
      ref={containerRef}
      className="relative flex items-center"
      style={{ overflowX: 'auto', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
    >
      <motion.div
        className="absolute bottom-0 rounded-full bg-white shrink-0"
        style={{ height: '1.5px' }}
        animate={ind}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      {tabs.map((tab) => {
        const isActive = activeTab === tab
        return (
          <button
            key={tab}
            data-tab={tab}
            id={`teams-tab-${tab.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => onSelect(tab)}
            className="relative flex items-center gap-1.5 outline-none select-none shrink-0"
            style={{
              padding: 'clamp(8px, 1.5vw, 12px) clamp(10px, 2vw, 16px)',
              fontSize: 'clamp(11px, 1.8vw, 14px)',
              fontWeight: 500,
              letterSpacing: '0.02em',
              color: isActive ? '#ffffff' : '#6b7280',
              transitionProperty: 'color',
              transitionDuration: '200ms',
              transitionTimingFunction: EASE,
            }}
            onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#d1d5db' }}
            onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#6b7280' }}
          >
            {tab}
          </button>
        )
      })}
    </div>
  )
}

export default function Teams() {
  const [activeTab, setActiveTab] = useState('Global')
  const [search, setSearch] = useState('')
  const [activeCardId, setActiveCardId] = useState<number | null>(null)

  const filtered = TEAM_MEMBERS.filter(
    (m) =>
      m.tabs.includes(activeTab) &&
      (search === '' ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.focus.some((f) => f.toLowerCase().includes(search.toLowerCase())))
  )

  function handleTabChange(tab: string) {
    setActiveTab(tab)
    setSearch('')
    setActiveCardId(null)
  }

  return (
    <div
      className="min-h-screen bg-[#161616]"
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        padding: 'clamp(22px, 5vw, 56px) clamp(14px, 5vw, 56px)',
      }}
      onClick={() => setActiveCardId(null)}
    >
      <motion.div
        className="mb-8 sm:mb-10"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.46, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h1
          className="text-white font-light leading-tight tracking-tight"
          style={{
            fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
            fontSize: 'clamp(1.7rem, 5vw, 3.2rem)',
          }}
        >
          The Team
        </h1>
        <p
          className="text-white/40 mt-2 leading-relaxed"
          style={{ fontSize: 'clamp(11px, 1.7vw, 14px)', maxWidth: 'min(400px, 88vw)' }}
        >
          A global group of investors, operators, and builders partnering with founders at every stage.
        </p>
      </motion.div>

      <motion.div
        className="mb-6 sm:mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4">
          <nav
            style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', marginLeft: 'clamp(-14px,-5vw,-56px)', marginRight: 'clamp(-14px,-5vw,-56px)', paddingLeft: 'clamp(14px,5vw,56px)' }}
            aria-label="Filter by region"
          >
            <TabBar tabs={TABS} activeTab={activeTab} onSelect={handleTabChange} />
          </nav>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            className="flex flex-col items-center justify-center py-24 text-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.28 }}
          >
            <p className="text-white/30 text-sm">No members found for "{search}"</p>
            <button
              onClick={() => setSearch('')}
              className="mt-3 text-white/50 text-xs hover:text-white/80 transition-colors underline underline-offset-4"
            >
              Clear search
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            style={{ gap: 'clamp(10px, 2vw, 20px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.map((member, i) => (
              <MemberCard
                key={member.id}
                member={member}
                index={i}
                activeId={activeCardId}
                setActiveId={setActiveCardId}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="flex items-center justify-between flex-wrap gap-2"
        style={{
          marginTop: 'clamp(32px, 5vw, 56px)',
          paddingTop: 'clamp(20px, 3vw, 32px)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p
          className="text-white/25 uppercase tracking-widest"
          style={{ fontSize: 'clamp(8.5px, 1.3vw, 11px)' }}
        >
          {filtered.length} member{filtered.length !== 1 ? 's' : ''} · {activeTab}
        </p>
        <div className="flex gap-1.5 items-center">
          {TABS.slice(0, 4).map((loc) => (
            <button
              key={loc}
              onClick={() => handleTabChange(loc)}
              className="rounded-full transition-all duration-300"
              style={{
                width: '6px',
                height: '6px',
                background: activeTab === loc ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.12)',
              }}
              aria-label={`Switch to ${loc}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
