import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Cards = () => {
    const cards = [
        {
            title: 'Working Knowledge',
            description: 'Frameworks, principles, and models Ive learned and developed that you will be able to immediately apply to your practice.',
            skeleton: <div className="h-50 w-55 border rounded-lg bg-gradient-to-r from-orange-600 to-orange-600/60"></div>,
            className: 'bg-orange-500',
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
            skeleton: <div className="h-50 w-55 border rounded-lg bg-gradient-to-r from-neutral-300 to-neutral-300/60"></div>,
            className: 'bg-stone-200',
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
            skeleton: <div className="h-50 w-55 border rounded-lg bg-gradient-to-r from-blue-600 to-blue-600/60"></div>,
            className: 'bg-blue-500',
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
            skeleton: <div className="h-50 w-55 border rounded-lg bg-gradient-to-r from-purple-600 to-purple-600/60"></div>,
            className: 'bg-purple-500',
            config: {
                x: 580,
                y: 220,
                zIndex: 4,
                rotate: 12,
            }
        },
        {
            title: 'Growth Insights',
            description: 'Actionable ideas for improving engagement, identifying opportunities, and building long-term momentum in your work.',
            skeleton: <div className="h-50 w-55 border rounded-lg bg-gradient-to-r from-rose-600 to-rose-600/60"></div>,
            className: 'bg-rose-500',
            config: {
                x: 740,
                y: 320,
                zIndex: 4,
                rotate: 12,
            }
        }
    ];

    return (
        <div className="max-w-5xl mx-auto w-full h-160 relative">

            {cards.map((card) => (
                <motion.div key={card.title}>
                    <motion.button
                    animate = {{
                        y: card.config.y,
                        x: card.config.x,
                        rotate: card.config.rotate,
                        scale: 1,
                        width: 320,
                        height: 400,
                    }}
                    className={cn(
                        "w-80 p-8 absolute rounded-2xl inset-0 flex flex-col justify-between items-start overflow-hidden", 
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