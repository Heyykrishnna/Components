import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react';
import { SearchIcon } from 'lucide-react';

const GooeyEffect = () => {

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
        <div className="relative flex h-10 items-center justify-center">

            <motion.div 
            variants={buttonVariants}
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
            className="h-10 flex items-center justify-center">

                <button
                onClick={() => setIsExpanded(true)}
                className="h-10 px-4 w-full cursor-pointer items-center justify-center flex gap-2 rounded-full bg-black text-white font-medium text-sm">
                    <SearchIcon />

                    <input 
                    ref={inputRef}
                    value={searchText}
                    onBlur={() => !searchText && setIsExpanded(false)}
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text" placeholder="Search..." className="h-full w-full bg-transparent text-sm placeholder-white/50 outline-none" >
                    </input>
                </button>

            </motion.div>

        </div>
        
    </div>
  )
}

export default GooeyEffect;