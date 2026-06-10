import React, { useState } from 'react'

interface TeamMember {
  id: number
  name: string
  location: string
  specialty: string
  focus: string[]
  image: string
  tabs: string[]
  hoverColor: string
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'Casey Aylward',
    location: 'Bay Area',
    specialty: 'Early Stage',
    focus: ['AI', 'Cloud / SaaS', 'Security'],
    image: '/team/casey.png',
    tabs: ['Global', 'Bay Area'],
    hoverColor: 'rgba(120, 40, 40, 0.55)',
  },
  {
    id: 2,
    name: 'Mahendran B.',
    location: 'Bangalore',
    specialty: 'Deep Tech',
    focus: ['Enterprise', 'Infrastructure', 'Dev Tools'],
    image: '/team/mahendran.png',
    tabs: ['Global', 'Bangalore'],
    hoverColor: 'rgba(20, 70, 100, 0.55)',
  },
  {
    id: 3,
    name: 'Philippe Botteri',
    location: 'London',
    specialty: 'Growth Stage',
    focus: ['FinTech', 'SaaS', 'Marketplace'],
    image: '/team/philippe.png',
    tabs: ['Global', 'London'],
    hoverColor: 'rgba(60, 80, 60, 0.55)',
  },
  {
    id: 4,
    name: 'Andrew Braccia',
    location: 'Bay Area',
    specialty: 'Consumer',
    focus: ['Social', 'Gaming', 'Media'],
    image: '/team/andrew.png',
    tabs: ['Global', 'Bay Area'],
    hoverColor: 'rgba(30, 60, 100, 0.55)',
  },
  {
    id: 5,
    name: 'Sarah Mitchell',
    location: 'London',
    specialty: 'Series A / B',
    focus: ['HealthTech', 'Climate', 'EdTech'],
    image: '/team/sarah.png',
    tabs: ['Global', 'London'],
    hoverColor: 'rgba(80, 40, 90, 0.55)',
  },
  {
    id: 6,
    name: 'Raj Patel',
    location: 'Bangalore',
    specialty: 'Pre-Seed',
    focus: ['Web3', 'AI', 'Consumer Apps'],
    image: '/team/raj.png',
    tabs: ['Global', 'Bangalore'],
    hoverColor: 'rgba(20, 90, 80, 0.55)',
  },
  {
    id: 7,
    name: 'Marcus Chen',
    location: 'Bay Area',
    specialty: 'Late Stage',
    focus: ['Data Analytics', 'Cybersecurity', 'Cloud'],
    image: '/team/marcus.png',
    tabs: ['Global', 'Bay Area'],
    hoverColor: 'rgba(100, 70, 20, 0.55)',
  },
  {
    id: 8,
    name: 'Elena Rivera',
    location: 'London',
    specialty: 'Impact',
    focus: ['Climate Tech', 'AgriTech', 'BioTech'],
    image: '/team/elena.png',
    tabs: ['Global', 'London', 'Emeritus'],
    hoverColor: 'rgba(30, 90, 50, 0.55)',
  },
]

const TABS = ['Global', 'Bay Area', 'London', 'Bangalore', 'Emeritus']

const EASE = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'

function stagger(delayMs: number): React.CSSProperties {
  return {
    transitionProperty: 'opacity, transform',
    transitionDuration: '520ms',
    transitionTimingFunction: EASE,
    transitionDelay: `${delayMs}ms`,
    willChange: 'opacity, transform',
  }
}

function MetaLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="uppercase font-semibold text-white/50"
      style={{ fontSize: '9px', letterSpacing: '0.14em' }}
    >
      {children}
    </span>
  )
}

function MemberCard({ member }: { member: TeamMember }) {
  const [hovered, setHovered] = useState(false)

  const scrimBg = `linear-gradient(to bottom,
    ${member.hoverColor} 0%,
    rgba(0,0,0,0.08) 40%,
    rgba(0,0,0,0.72) 100%
  )`

  return (
    <div
      className="flex flex-col cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative overflow-hidden rounded-2xl bg-neutral-900"
        style={{ aspectRatio: '3 / 4', transform: 'translateZ(0)', isolation: 'isolate' }}
      >
        <img
          src={member.image}
          alt={member.name}
          className="absolute inset-0 w-full h-full object-cover object-top select-none"
          draggable={false}
          style={{
            transitionProperty: 'filter, transform',
            transitionDuration: '750ms',
            transitionTimingFunction: EASE,
            willChange: 'filter, transform',
            backfaceVisibility: 'hidden',
            filter: hovered ? 'blur(7px) brightness(0.68)' : 'blur(0px) brightness(1)',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: scrimBg,
            transitionProperty: 'opacity',
            transitionDuration: '600ms',
            transitionTimingFunction: EASE,
            willChange: 'opacity',
            opacity: hovered ? 1 : 0,
          }}
        />

        <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none">
          <h2
            className="text-white font-medium leading-tight tracking-tight drop-shadow-md"
            style={{
              fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
              fontSize: 'clamp(1.35rem, 2vw, 1.75rem)',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0px)' : 'translateY(-14px)',
              ...stagger(0),
            }}
          >
            {member.name}
          </h2>

          <div className="flex flex-col gap-4 pointer-events-auto">
            <div
              className="grid grid-cols-2 gap-x-4"
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'translateY(0px)' : 'translateY(-12px)',
                ...stagger(60),
              }}
            >
              <div className="flex flex-col gap-0.5">
                <MetaLabel>BASED IN</MetaLabel>
                <span className="text-white font-light text-[14px] leading-snug">
                  {member.location}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <MetaLabel>SPECIALITY</MetaLabel>
                <span className="text-white font-light text-[14px] leading-snug">
                  {member.specialty}
                </span>
              </div>
            </div>

            <div
              className="flex flex-col gap-0.5"
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'translateY(0px)' : 'translateY(-10px)',
                ...stagger(120),
              }}
            >
              <MetaLabel>FOCUS</MetaLabel>
              {member.focus.map((f) => (
                <span key={f} className="text-white font-light text-[14px] leading-snug">
                  {f}
                </span>
              ))}
            </div>

            <div
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'translateY(0px)' : 'translateY(-8px)',
                ...stagger(180),
              }}
            >
              <button
                aria-label={`View ${member.name}`}
                className="w-11 h-11 rounded-full flex items-center justify-center text-white backdrop-blur-md"
                style={{
                  background: 'rgba(80,80,80,0.75)',
                  transitionProperty: 'background',
                  transitionDuration: '200ms',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(110,110,110,0.9)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(80,80,80,0.75)')
                }
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M4 10h12M11 5l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <p
        className="mt-2.5 px-0.5 text-[13px] tracking-wide font-normal"
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          color: hovered ? '#ffffff' : '#9ca3af',
          transitionProperty: 'color',
          transitionDuration: '350ms',
          transitionTimingFunction: EASE,
        }}
      >
        {member.name}
      </p>
    </div>
  )
}

export default function Teams() {
  const [activeTab, setActiveTab] = useState('Global')
  const visible = TEAM_MEMBERS.filter((m) => m.tabs.includes(activeTab))

  return (
    <div
      className="min-h-screen bg-[#181818] px-6 py-8 md:px-10 lg:px-14"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <nav
        className="flex items-center gap-0.5 mb-10 border-b border-white/10"
        aria-label="Filter by region"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              id={`teams-tab-${tab.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setActiveTab(tab)}
              className="relative px-4 py-3 text-sm font-medium tracking-wide outline-none select-none"
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
                className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white rounded-full origin-left"
                style={{
                  transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                  transitionProperty: 'transform',
                  transitionDuration: '320ms',
                  transitionTimingFunction: EASE,
                }}
              />
            </button>
          )
        })}
      </nav>

      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        style={{ gap: '20px' }}
      >
        {visible.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}
