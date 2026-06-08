import { motion } from 'motion/react'

const WAVEFORM_PATTERN = [
  0.18, 0.32, 0.48, 0.72, 0.92, 0.88, 0.65, 0.38, 0.16, 0.12,
  0.22, 0.52, 0.78, 0.95, 0.82, 0.58, 0.28, 0.14, 0.28, 0.62,
  0.88, 0.72, 0.42, 0.2, 0.15, 0.35, 0.68, 0.9, 0.75, 0.5,
  0.25, 0.55, 0.85, 0.95, 0.7, 0.45, 0.18, 0.1, 0.22, 0.48,
]

const BAR_MAX_HEIGHT = 28

const WhisperedFlow = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-8">
      <WaveformMarquee />
    </div>
  )
}

type WaveformStripProps = {
  idPrefix: string
  className?: string
  ariaHidden?: boolean
}

const WaveformStrip = ({
  idPrefix,
  className,
  ariaHidden,
}: WaveformStripProps) => (
  <div
    className={`flex shrink-0 items-center gap-[3px] ${className ?? ''}`}
    aria-hidden={ariaHidden}
  >
    {WAVEFORM_PATTERN.map((peak, index) => (
      <motion.span
        key={`${idPrefix}-${index}`}
        className="block w-[3px] shrink-0 origin-center rounded-full bg-black"
        style={{
          height: BAR_MAX_HEIGHT,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
        animate={{
          scaleY: [peak * 0.9, peak, peak * 0.9],
        }}
        transition={{
          duration: 0.32 + (index % 5) * 0.04,
          ease: [0.45, 0.05, 0.55, 0.95],
          repeat: Infinity,
          repeatType: 'mirror',
          delay: index * 0.02,
        }}
      />
    ))}
  </div>
)

const WaveformMarquee = () => {
  return (
    <div className="relative h-10 w-40 overflow-hidden rounded-full border border-black bg-white">
      <div className="waveform-marquee-track flex h-full w-max items-center">
        <WaveformStrip idPrefix="a" className="pl-4" />
        <WaveformStrip idPrefix="b" className="pr-4" />
      </div>
    </div>
  )
}

export default WhisperedFlow
