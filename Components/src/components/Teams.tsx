import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

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

function useIsCoarsePointer() {
  const [isCoarse] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  )
  return isCoarse
}

function formatRoleBadge(role: string) {
  const words = role.trim().split(/\s+/)
  if (words.length > 1) return words.map((w) => w[0]).join('').toUpperCase()
  return role.toUpperCase()
}

function MetaLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="uppercase font-semibold text-white/40 tracking-widest" style={{ fontSize: '8px' }}>
      {children}
    </span>
  )
}

function detailStagger(delayMs: number, active: boolean): React.CSSProperties {
  return {
    opacity: active ? 1 : 0,
    transform: active ? 'translateY(0)' : 'translateY(8px)',
    transitionProperty: 'opacity, transform',
    transitionDuration: '420ms',
    transitionTimingFunction: EASE,
    transitionDelay: active ? `${delayMs}ms` : '0ms',
  }
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
  const displayName = member.name.split(' ')[0].toUpperCase()

  function handleMouseEnter() {
    if (!isCoarse) setActiveId(member.id)
  }

  function handleMouseLeave() {
    if (!isCoarse) setActiveId(null)
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.48, delay: index * 0.055, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        ref={cardRef}
        className="relative overflow-hidden bg-neutral-900 select-none"
        style={{
          aspectRatio: '3 / 4',
          cursor: isCoarse ? 'pointer' : 'default',
          borderRadius: 'clamp(16px, 3vw, 28px)',
          border: active
            ? '1px solid rgba(255,255,255,0.28)'
            : '1px solid rgba(255,255,255,0.14)',
          boxShadow: active
            ? '0 0 0 1px rgba(255,255,255,0.06), 0 12px 40px rgba(0,0,0,0.35)'
            : '0 0 0 1px rgba(255,255,255,0.03), 0 4px 20px rgba(0,0,0,0.2)',
          transitionProperty: 'border-color, box-shadow',
          transitionDuration: '500ms',
          transitionTimingFunction: EASE,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleTap}
        onTouchStart={isCoarse ? (e) => e.stopPropagation() : undefined}
      >
        <img
          src={member.image}
          alt={member.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
          draggable={false}
        />

        <motion.div
          className="absolute bottom-0 left-0 right-0 overflow-hidden"
          initial={false}
          animate={{ height: active ? '100%' : '16%' }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            className="absolute inset-0"
            style={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              background: active
                ? 'rgba(40,40,40,0.45)'
                : 'rgba(30,30,30,0.38)',
              borderTop: active ? 'none' : '1px solid rgba(255,255,255,0.12)',
              transitionProperty: 'background, border-color',
              transitionDuration: '500ms',
              transitionTimingFunction: EASE,
            }}
          />

          <div
            className="relative h-full flex flex-col justify-end pointer-events-none"
            style={{
              padding: 'clamp(10px, 2vw, 18px) clamp(14px, 3vw, 22px)',
            }}
          >
            <div
              className="flex flex-col overflow-hidden"
              style={{
                gap: 'clamp(8px, 1.5vw, 14px)',
                flex: active ? '1 1 auto' : '0 0 0',
                maxHeight: active ? '100%' : 0,
                marginBottom: active ? 'auto' : 0,
                paddingTop: active ? 'clamp(4px, 1vw, 10px)' : 0,
                ...detailStagger(80, active),
              }}
            >
              <h2
                className="text-white font-bold leading-tight tracking-tight"
                style={{
                  fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
                  fontSize: 'clamp(0.9rem, 2.2vw, 1.35rem)',
                  ...detailStagger(60, active),
                }}
              >
                {member.name}
              </h2>

              <div
                className="grid grid-cols-2"
                style={{
                  gap: 'clamp(6px, 1.2vw, 12px)',
                  ...detailStagger(120, active),
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

              <div className="flex flex-col gap-0.5" style={detailStagger(180, active)}>
                <MetaLabel>FOCUS</MetaLabel>
                {member.focus.map((f) => (
                  <span key={f} className="text-white font-light leading-snug" style={{ fontSize: 'clamp(9px, 1.4vw, 12.5px)' }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between shrink-0">
              <span
                className="text-white font-medium uppercase tracking-wide"
                style={{
                  fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
                  fontSize: 'clamp(0.75rem, 2vw, 1.1rem)',
                  letterSpacing: '0.06em',
                }}
              >
                {displayName}
              </span>

              <span
                className="rounded-full bg-white text-black font-semibold uppercase shrink-0"
                style={{
                  fontSize: 'clamp(0.55rem, 1.4vw, 0.72rem)',
                  letterSpacing: '0.08em',
                  padding: 'clamp(5px, 1vw, 7px) clamp(10px, 2vw, 16px)',
                }}
              >
                {formatRoleBadge(member.role)}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
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
