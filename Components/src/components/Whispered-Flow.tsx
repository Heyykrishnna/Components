import { motion } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'

type JunctionPoint = { x: number; y: number; angle: number }

const pathPointToScreen = (path: SVGPathElement, length: number) => {
  const pt = path.getPointAtLength(length)
  const screenPt = path.ownerSVGElement!.createSVGPoint()
  screenPt.x = pt.x
  screenPt.y = pt.y
  return screenPt.matrixTransform(path.getScreenCTM()!)
}

const getPathAngle = (path: SVGPathElement, length: number, totalLength: number) => {
  const delta = Math.min(12, totalLength * 0.02)
  const a = pathPointToScreen(path, Math.max(0, length - delta))
  const b = pathPointToScreen(path, Math.min(totalLength, length + delta))
  return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI
}

const RIGHT_TEXT = "Umm, hope your week has started well…I was talking to Cheyene earlier but reception was really bad and I think their going to handle the first part of the project, but I’m not totally sure. Also, I told the team the the new timeline should be ready by Friday, although it’s probably going to slip. There’s been a lot of back and forth and honestly the the whole thing’s been kind of chaotic, like nobody really knows what’s going on so can you check in with them and see if the notes from yesterday’s meeting were sent out, or if they’re still waiting. I think Cheyene mentioned it but didn’t confirm, and now I’m a little lost."
const LEFT_TEXT = "Hope your week is off to a good start. I was talking to Cheyene earlier, but the reception was really bad. I think they’re going to handle the first part of the project, but I’m not totally sure. I also told the team the new timeline should be ready by Friday — although it might slip. There’s been a lot of back and forth, and honestly, the whole thing has been a bit chaotic. It feels like nobody really knows what’s going on. Can you check in with them and see if the notes from yesterday’s meeting were sent out, or if they’re still waiting? I think Cheyene mentioned it, but didn’t confirm — and now I’m a little lost!"

const WhisperedFlow = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-white p-8">
      <HeroAnimation />
    </div>
  )
}

const HeroAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [junction, setJunction] = useState<JunctionPoint | null>(null)

    useLayoutEffect(() => {
        const updateJunction = () => {
            const container = containerRef.current
            const firstPath = document.getElementById('first-curve') as SVGPathElement | null
            const secondPath = document.getElementById('second-curve') as SVGPathElement | null
            if (!container || !firstPath || !secondPath) return

            const firstLen = firstPath.getTotalLength()
            const secondLen = secondPath.getTotalLength()

            const firstEnd = pathPointToScreen(firstPath, firstLen * 0.97)
            const secondStart = pathPointToScreen(secondPath, secondLen * 0.04)

            const rect = container.getBoundingClientRect()
            const x = (firstEnd.x + secondStart.x) / 2 - rect.left
            const y = (firstEnd.y + secondStart.y) / 2 - rect.top
            const angle = getPathAngle(firstPath, firstLen * 0.97, firstLen)

            setJunction({ x, y, angle })
        }

        updateJunction()
        window.addEventListener('resize', updateJunction)
        return () => window.removeEventListener('resize', updateJunction)
    }, [])

    return(
        <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">

            <div className="absolute left-0 top-1/2 w-[min(58vw, 900px)] overflow-hidden -translate-y-[45%]">
                <svg
                id = "hero-svg"
                viewBox = "0 0 1048 594"
                fill = "none"
                className="h-auto w-[1200px] scale-100 -translate-x-72 -translate-y-20"
                >
                    <path
                    id="first-curve" 
                    className="fill-transparent"
                    d="M0.597656 50.924805C17.4612 143.2965 97.8522 293.141 284.508 353.548C440.828 399.056 583.839 294.067 500.618 184.7492C417.397 75.4309 238.217 282.098 499.258 441.668C551.913 477.802 817.468 561.26 1046.43 565.235"
                    />
                    <text x='0' className="text-base">
                        <textPath id='marquee-text-first'
                        href="#first-curve"
                        className="fill-black font-normal opacity-50 [baseline-shift:20%]"
                        >
                            {LEFT_TEXT}
                        </textPath>
                        <animate
                        id="marquee-anim-first"
                        attributeName="x"
                        dur="25s"
                        values="-2000; 0"
                        repeatCount="indefinite"
                        >

                        </animate>
                    </text>
                </svg>
            </div>

            {junction && (
                <div
                    className="absolute z-10 pointer-events-auto"
                    style={{
                        left: junction.x,
                        top: junction.y,
                        transform: `translate(-60%, -60%)`,
                    }}
                >
                    <WaveformMarquee />
                </div>
            )}

            <div className="absolute top-12 -right-120 w-[min(62vw, 780px)]">
                <svg
                className="h-1auto w-[1200px] scale-100 "
                viewBox="0 0 1024 620"
                >
                    <path id="second-curve" 
                        className="stroke-black stroke-[30]"
                        d="M2.04309 563.872C111.592 558.268 316.491 554.016 517.963 490.064C703.017 431.323 875.319 444.531 1021.88 453.216" stroke="#1A1A1A" strokeWidth="30"></path>

                    <text x='-2000' className="text-base" >
                        <textPath id="marquee-text-second"
                            href="#second-curve"
                            className="fill-white font-semibold [baseline-shift:-30%]"
                        >
                            {RIGHT_TEXT}
                        </textPath>
                        <animate
                            id="marquee-anim-second"
                            dur="25s"
                            attributeName="x"
                            values="-2000; 0"
                            repeatCount="indefinite"
                        >

                        </animate>
                    </text>
                </svg>
            </div>

        </div>
    )
}

const WAVEFORM_PATTERN = [
    0.18, 0.32, 0.48, 0.72, 0.92, 0.88, 0.65, 0.38, 0.16, 0.12,
    0.22, 0.52, 0.78, 0.95, 0.82, 0.58, 0.28, 0.14, 0.28, 0.62,
    0.88, 0.72, 0.42, 0.2, 0.15, 0.35, 0.68, 0.9, 0.75, 0.5,
    0.25, 0.55, 0.85, 0.95, 0.7, 0.45, 0.18, 0.1, 0.22, 0.48,
  ]
  
  const BAR_MAX_HEIGHT = 28

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
        className="block w-[3px] shrink-0 origin-centerrounded-full bg-black"
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
