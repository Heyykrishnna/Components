import React, { useState, useRef, useLayoutEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'

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
    id: 1,
    name: 'Casey Aylward',
    role: 'General Partner',
    location: 'Bay Area',
    specialty: 'Early Stage',
    focus: ['AI', 'Cloud / SaaS', 'Security'],
    image: '/team/casey.png',
    tabs: ['Global', 'Bay Area'],
    accentColor: 'rgba(180, 55, 55, 0.6)',
    accentRGB: '180,55,55',
  },
  {
    id: 2,
    name: 'Mahendran B.',
    role: 'Venture Partner',
    location: 'Bangalore',
    specialty: 'Deep Tech',
    focus: ['Enterprise', 'Infrastructure', 'Dev Tools'],
    image: '/team/mahendran.png',
    tabs: ['Global', 'Bangalore'],
    accentColor: 'rgba(25, 85, 130, 0.6)',
    accentRGB: '25,85,130',
  },
  {
    id: 3,
    name: 'Philippe Botteri',
    role: 'General Partner',
    location: 'London',
    specialty: 'Growth Stage',
    focus: ['FinTech', 'SaaS', 'Marketplace'],
    image: '/team/philippe.png',
    tabs: ['Global', 'London'],
    accentColor: 'rgba(50, 100, 65, 0.6)',
    accentRGB: '50,100,65',
  },
  {
    id: 4,
    name: 'Andrew Braccia',
    role: 'General Partner',
    location: 'Bay Area',
    specialty: 'Consumer',
    focus: ['Social', 'Gaming', 'Media'],
    image: '/team/andrew.png',
    tabs: ['Global', 'Bay Area'],
    accentColor: 'rgba(30, 65, 120, 0.6)',
    accentRGB: '30,65,120',
  },
  {
    id: 5,
    name: 'Sarah Mitchell',
    role: 'Principal',
    location: 'London',
    specialty: 'Series A / B',
    focus: ['HealthTech', 'Climate', 'EdTech'],
    image: '/team/sarah.png',
    tabs: ['Global', 'London'],
    accentColor: 'rgba(100, 45, 120, 0.6)',
    accentRGB: '100,45,120',
  },
  {
    id: 6,
    name: 'Raj Patel',
    role: 'Associate',
    location: 'Bangalore',
    specialty: 'Pre-Seed',
    focus: ['Web3', 'AI', 'Consumer Apps'],
    image: '/team/raj.png',
    tabs: ['Global', 'Bangalore'],
    accentColor: 'rgba(15, 110, 100, 0.6)',
    accentRGB: '15,110,100',
  },
  {
    id: 7,
    name: 'Marcus Chen',
    role: 'Partner',
    location: 'Bay Area',
    specialty: 'Late Stage',
    focus: ['Data Analytics', 'Cybersecurity', 'Cloud'],
    image: '/team/marcus.png',
    tabs: ['Global', 'Bay Area'],
    accentColor: 'rgba(130, 85, 15, 0.6)',
    accentRGB: '130,85,15',
  },
  {
    id: 8,
    name: 'Elena Rivera',
    role: 'Venture Partner',
    location: 'London',
    specialty: 'Impact',
    focus: ['Climate Tech', 'AgriTech', 'BioTech'],
    image: '/team/elena.png',
    tabs: ['Global', 'London', 'Emeritus'],
    accentColor: 'rgba(25, 110, 60, 0.6)',
    accentRGB: '25,110,60',
  },
]

const TABS = ['Global', 'Bay Area', 'London', 'Bangalore', 'Emeritus']

const EASE = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'

function stagger(delayMs: number): React.CSSProperties {
  return {
    transitionProperty: 'opacity, transform',
    transitionDuration: '500ms',
    transitionTimingFunction: EASE,
    transitionDelay: `${delayMs}ms`,
    willChange: 'opacity, transform',
  }
}

function MetaLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="uppercase font-semibold text-white/40 tracking-widest"
      style={{ fontSize: '8.5px' }}
    >
      {children}
    </span>
  )
}

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 180, damping: 28 })
  const springY = useSpring(mouseY, { stiffness: 180, damping: 28 })
  const rotateX = useTransform(springY, [-0.5, 0.5], ['4deg', '-4deg'])
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-4deg', '4deg'])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    setHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  const scrimBg = `linear-gradient(160deg,
    ${member.accentColor} 0%,
    rgba(0,0,0,0.05) 45%,
    rgba(0,0,0,0.82) 100%
  )`

  return (
    <motion.div
      className="flex flex-col cursor-pointer"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        ref={cardRef}
        className="relative overflow-hidden rounded-2xl bg-neutral-900 select-none"
        style={{
          aspectRatio: '3 / 4',
          isolation: 'isolate',
          rotateX: hovered ? rotateX : 0,
          rotateY: hovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
          transformPerspective: 900,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <img
          src={member.image}
          alt={member.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
          draggable={false}
          style={{
            transitionProperty: 'filter, transform',
            transitionDuration: '800ms',
            transitionTimingFunction: EASE,
            willChange: 'filter, transform',
            backfaceVisibility: 'hidden',
            filter: hovered ? 'blur(7px) brightness(0.65)' : 'blur(0px) brightness(1)',
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: scrimBg,
            opacity: hovered ? 1 : 0,
            transitionProperty: 'opacity',
            transitionDuration: '550ms',
            transitionTimingFunction: EASE,
            willChange: 'opacity',
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 40%)',
          }}
        />

        <div
          className="absolute top-3.5 right-3.5"
          style={{
            opacity: hovered ? 0 : 1,
            transitionProperty: 'opacity',
            transitionDuration: '300ms',
            transitionTimingFunction: EASE,
          }}
        >
        </div>

        <div className="absolute inset-0 flex flex-col justify-between p-5 pointer-events-none">
          <h2
            className="text-white font-medium leading-tight tracking-tight drop-shadow-lg"
            style={{
              fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
              fontSize: 'clamp(1.25rem, 1.8vw, 1.6rem)',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0px)' : 'translateY(-16px)',
              ...stagger(0),
            }}
          >
            {member.name}
          </h2>

          <div className="flex flex-col gap-3.5 pointer-events-auto">
            <div
              className="grid grid-cols-2 gap-x-3"
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'translateY(0px)' : 'translateY(-10px)',
                ...stagger(70),
              }}
            >
              <div className="flex flex-col gap-0.5">
                <MetaLabel>BASED IN</MetaLabel>
                <span className="text-white font-light text-[13px] leading-snug">{member.location}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <MetaLabel>SPECIALITY</MetaLabel>
                <span className="text-white font-light text-[13px] leading-snug">{member.specialty}</span>
              </div>
            </div>

            <div
              className="flex flex-col gap-0.5"
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'translateY(0px)' : 'translateY(-8px)',
                ...stagger(130),
              }}
            >
              <MetaLabel>FOCUS</MetaLabel>
              {member.focus.map((f) => (
                <span key={f} className="text-white font-light text-[13px] leading-snug">{f}</span>
              ))}
            </div>

            <div
              className="flex items-center justify-between"
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'translateY(0px)' : 'translateY(-6px)',
                ...stagger(190),
              }}
            >
              <button
                aria-label={`View ${member.name}`}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white backdrop-blur-md pointer-events-auto"
                style={{
                  background: `rgba(${member.accentRGB}, 0.65)`,
                  border: `1px solid rgba(${member.accentRGB}, 0.8)`,
                  transitionProperty: 'background, transform',
                  transitionDuration: '200ms',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.background = `rgba(${member.accentRGB}, 0.9)`
                  el.style.transform = 'scale(1.08)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.background = `rgba(${member.accentRGB}, 0.65)`
                  el.style.transform = 'scale(1)'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <span
                className="text-white/50 text-[10px] font-medium tracking-widest uppercase"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                {member.role}
              </span>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: 'radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.06) 0%, transparent 65%)',
            opacity: hovered ? 1 : 0,
            transitionProperty: 'opacity',
            transitionDuration: '400ms',
          }}
        />
      </motion.div>

      <p
        className="mt-2.5 px-0.5 text-[12.5px] tracking-wide font-normal"
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          color: hovered ? '#ffffff' : '#6b7280',
          transitionProperty: 'color',
          transitionDuration: '350ms',
          transitionTimingFunction: EASE,
        }}
      >
        {member.name}
      </p>
    </motion.div>
  )
}

function AnimatedTabIndicator({ tabs, activeTab, onSelect }: {
  tabs: string[]
  activeTab: string
  onSelect: (t: string) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return
    const activeBtn = container.querySelector<HTMLButtonElement>(`[data-tab="${activeTab}"]`)
    if (!activeBtn) return
    setIndicatorStyle({ left: activeBtn.offsetLeft, width: activeBtn.offsetWidth })
  }, [activeTab])

  return (
    <div ref={containerRef} className="relative flex items-center gap-0">
      <motion.div
        className="absolute bottom-0 h-[2px] rounded-full bg-white"
        animate={indicatorStyle}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      {tabs.map((tab) => {
        const isActive = activeTab === tab
        const count = TEAM_MEMBERS.filter((m) => m.tabs.includes(tab)).length
        return (
          <button
            key={tab}
            data-tab={tab}
            id={`teams-tab-${tab.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => onSelect(tab)}
            className="relative px-4 py-3 text-sm font-medium tracking-wide outline-none select-none flex items-center gap-1.5"
            style={{
              color: isActive ? '#ffffff' : '#6b7280',
              transitionProperty: 'color',
              transitionDuration: '220ms',
              transitionTimingFunction: EASE,
            }}
            onMouseEnter={(e) => {
              if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#d1d5db'
            }}
            onMouseLeave={(e) => {
              if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#6b7280'
            }}
          >
            {tab}
            <span
              className="inline-flex items-center justify-center rounded-full text-[9px] font-semibold px-1.5 py-0.5 min-w-[18px]"
              style={{
                background: isActive ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)',
                color: isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.3)',
                transitionProperty: 'background, color',
                transitionDuration: '220ms',
              }}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default function Teams() {
  const [activeTab, setActiveTab] = useState('Global')
  const [search, setSearch] = useState('')

  const filtered = TEAM_MEMBERS.filter(
    (m) =>
      m.tabs.includes(activeTab) &&
      (search === '' ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.focus.some((f) => f.toLowerCase().includes(search.toLowerCase())))
  )

  return (
    <div
      className="min-h-screen bg-[#161616] px-6 py-10 md:px-10 lg:px-14"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <motion.div
        className="mb-10 flex flex-col gap-1"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h1
          className="text-white font-light text-4xl md:text-5xl tracking-tight leading-tight"
          style={{ fontFamily: "'Outfit', 'Inter', system-ui, sans-serif" }}
        >
          The Team
        </h1>
        <p className="text-white/40 text-sm mt-2 max-w-md leading-relaxed">
          A global group of investors, operators, and builders partnering with founders at every stage.
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav className="border-b border-white/8" aria-label="Filter by region">
          <AnimatedTabIndicator tabs={TABS} activeTab={activeTab} onSelect={setActiveTab} />
        </nav>

        <div
          className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="text-white/35 shrink-0">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
            <path d="M15 15l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search members…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-white text-[13px] placeholder:text-white/25 w-36"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-white/30 hover:text-white/70 transition-colors">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            className="flex flex-col items-center justify-center py-32 text-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
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
            style={{ gap: '20px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.map((member, i) => (
              <MemberCard key={member.id} member={member} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="mt-14 pt-8 flex items-center justify-between"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p className="text-white/25 text-[11px] tracking-widest uppercase">
          {filtered.length} member{filtered.length !== 1 ? 's' : ''} · {activeTab}
        </p>
        <div className="flex gap-1.5">
          {['Global', 'Bay Area', 'London', 'Bangalore'].map((loc) => (
            <span
              key={loc}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: activeTab === loc ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.12)' }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
