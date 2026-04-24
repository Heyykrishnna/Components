import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import React, { useEffect, useRef, useState } from 'react';

type Cards = {
    title: string;
    description: string;
    skeleton: React.ReactNode;
    className: string;
    config: {
        y: number;
        x: number;
        zIndex: number;
        rotate: number;
    }
}

export const Cards = () => {
    const cards = [
        {
            title: 'Working Knowledge',
            description: 'Frameworks, principles, and models Ive learned and developed that you will be able to immediately apply to your practice.',
            skeleton: <div className="h-50 w-55 rounded-lg bg-gradient-to-r from-orange-600 to-orange-600/60"></div>,
            className: 'bg-orange-500 [&_h2]:text-white',
            config: {
                y: 200,
                x: 60,
                zIndex: 2,
                rotate: -15,
            }
        },
        {
            title: 'Strategy Sessions',
            description: 'Practical methods for planning product decisions, setting clear priorities, and aligning teams around measurable outcomes.',
            skeleton: <div className="h-50 w-55 rounded-lg bg-gradient-to-r from-neutral-300 to-neutral-300/60"></div>,
            className: 'bg-stone-200 [&_h2]:text-black',
            config: {
                x: 200,
                y: 220,
                zIndex: 3,
                rotate: 8,
            }
        },
        {
            title: 'Execution Toolkit',
            description: 'Step-by-step workflows, templates, and repeatable systems that make complex projects easier to ship with confidence.',
            skeleton: <div className="h-50 w-55 rounded-lg bg-gradient-to-r from-blue-600 to-blue-600/60"></div>,
            className: 'bg-blue-500 [&_h2]:text-white',
            config: {
                x: 400,
                y: 280,
                zIndex: 5,
                rotate: -5,
            }
        },
        {
            title: 'Growth Insights',
            description: 'Actionable ideas for improving engagement, identifying opportunities, and building long-term momentum in your work.',
            skeleton: <div className="h-50 w-55 rounded-lg bg-gradient-to-r from-purple-600 to-purple-600/60"></div>,
            className: 'bg-purple-500 [&_h2]:text-white',
            config: {
                x: 580,
                y: 220,
                zIndex: 4,
                rotate: 12,
            }
        },
        {
            title: 'Random Stuff',
            description: 'Actionable ideas for improving engagement, identifying opportunities, and building long-term momentum in your work.',
            skeleton: <div className="h-50 w-55 rounded-lg bg-gradient-to-r from-rose-600 to-rose-600/60"></div>,
            className: 'bg-rose-500 [&_h2]:text-white',
            config: {
                x: 740,
                y: 320,
                zIndex: 4,
                rotate: 3,
            }
        }
    ];

    const [active, setActive] = useState<Cards | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)){
                setActive(null)
            }
        }
        document.addEventListener('mousedown', handleOutsideClick);
        return (() => {
            document.removeEventListener('mousedown', handleOutsideClick)
        })
    }, []);
    
    const isCardActive = () => {
        return active?.title;
    }

    const isCurrentActive = (card: Cards) => {
        return active?.title === card.title;
    }
    
    return (
        <div
            ref={ref}
            className="max-w-5xl mx-auto w-full min-h-[700px] relative flex items-center justify-center overflow-visible px-16"
        >

            {cards.map((card) => (
                <motion.div key={card.title}>
                    <motion.button
                    onClick={() => setActive(card)}
                    initial = {{
                        y: 400,
                        x: 0,
                        filter: 'blur(10px)',
                        scale: 0
                    }}
                    animate = {{
                        y: isCurrentActive(card) ? 0 : (isCardActive() ? 400 : card.config.y),
                        x: isCurrentActive(card) ? 320 : (isCardActive() ? card.config.x * 0.5 + 200 : card.config.x),
                        rotate: isCurrentActive(card) ? 0 : (isCardActive() ? card.config.rotate * 0.4 : card.config.rotate),
                        scale: isCurrentActive(card) ? 1 : (isCardActive() ? 0.6 : 1),
                        width: isCurrentActive(card) ? 400 : 320,
                        height: isCurrentActive(card) ? 500 : 400,
                        filter: 'blur(0px)'
                    }}
                    whileHover={{
                        scale: isCurrentActive(card) ? 1 : (isCardActive() ? 0.6 : 1.05)
                    }}  
                    transition={{
                        type: 'spring',
                        stiffness: 180,
                        damping: 15,
                        duration: 0.6
                    }}
                    style={{
                        zIndex: isCurrentActive(card) ? 50 : card.config.zIndex
                    }}
                    className={cn(
                        "w-80 p-8 absolute right-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl flex flex-col justify-between items-start overflow-hidden cursor-pointer shadow-2xl shadow-black/25 ring-1 ring-black/10",
                        card.className)}
                    >
                        {card.skeleton}
                        <div>
                            <motion.h2 className="text-black text-2xl font-bold text-left">{card.title}</motion.h2>
                        </div>
                    </motion.button>
                </motion.div>

            ))}
        </div>
    )
}