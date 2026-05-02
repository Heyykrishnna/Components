import { useEffect, useId, useRef, useState } from 'react'
import { motion } from 'motion/react';
import { SearchIcon } from 'lucide-react';

type SVGFilterProps = { id: string; blur?: number }

const SVGFilter = ({ id, blur = 5 }: SVGFilterProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="pointer-events-none fixed top-0 left-0 h-0 w-0 overflow-hidden"
    aria-hidden
  >
    <defs>
      <filter
        id={id}
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
        <feColorMatrix
          in="blur"
          type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
          result="goo"
        />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
)

const GooeyEffect = () => {
  const gooeyFilterId = useId().replace(/:/g, '')

  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");

  const buttonVariants = {
    collapsed: {
      width: 115,
      marginLeft: 0,
    },
    expanded: {
      width: 200,
      marginLeft: 50
    }
  }

  const iconBubbleVariants = {
    collapsed: {
      scale: 0,
      opacity: 0
    },
    expanded: {
      scale: 1,
      opacity: 1
    }
  }

  const TRANSITION = {
    duration: 1,
    type: "spring" as const,
    bounce: 0.25,
  }

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    }else{
      setTimeout(() => {
        setSearchText("");
      }, 100);
    }
  }, [isExpanded]);

  return (
    <div className="relative flex items-center justify-center">
        <SVGFilter id={gooeyFilterId} blur={5} />
        <div
          className="relative flex h-10 items-center justify-center"
          style={{ filter: `url(#${gooeyFilterId})` }}
        >

            <motion.div 
            variants={buttonVariants}
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
            transition={TRANSITION}
            className="h-10 flex items-center justify-center">

                <button
                onClick={() => setIsExpanded(true)}
                className="h-10 px-4 w-full cursor-pointer items-center justify-center flex gap-2 rounded-full bg-black text-white font-medium text-sm">
                    {!isExpanded && <SearchIcon className="size-4 text-white"/>}

                  <motion.input 
                    layoutId="input"
                    ref={inputRef}
                    value={searchText}
                    onBlur={() => !searchText && setIsExpanded(false)}
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text" 
                    placeholder="Search..." 
                    className="h-full w-full bg-transparent text-sm placeholder-white/50 outline-none" >
                    </motion.input>
                </button>

            </motion.div>

            <motion.div 
            variants={iconBubbleVariants}
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
            transition={TRANSITION}
            className="absolute top-1/2 left-0 size-10 bg-black rounded-full -translate-y-1/2 items-center justify-center flex">
              <SearchIcon className="size-4 text-white"/>
            </motion.div>

        </div>
        
    </div>
  )
}

export default GooeyEffect;