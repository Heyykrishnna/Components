import { motion } from 'framer-motion';

export const Cards = () => {
    const cards = [
        {
            title: 'Working Knowledge',
            description: 'Frameworks, principles, and models Ive learned and developed that you will be able to immediately apply to your practice.',
            skeleton: <></>,
            className: 'bg-[#e54f11]',
            config: {
                x: -20,
                y: 0,
                zIndex: 1,
                rotate: -15,
            }
        },
        {
            title: 'Strategy Sessions',
            description: 'Practical methods for planning product decisions, setting clear priorities, and aligning teams around measurable outcomes.',
            skeleton: <></>,
            className: 'bg-[#1f7a8c]',
            config: {
                x: 15,
                y: 10,
                zIndex: 2,
                rotate: 8,
            }
        },
        {
            title: 'Execution Toolkit',
            description: 'Step-by-step workflows, templates, and repeatable systems that make complex projects easier to ship with confidence.',
            skeleton: <></>,
            className: 'bg-[#2a9d8f]',
            config: {
                x: 5,
                y: -8,
                zIndex: 3,
                rotate: -6,
            }
        },
        {
            title: 'Growth Insights',
            description: 'Actionable ideas for improving engagement, identifying opportunities, and building long-term momentum in your work.',
            skeleton: <></>,
            className: 'bg-[#6a4c93]',
            config: {
                x: 25,
                y: 5,
                zIndex: 4,
                rotate: 12,
            }
        }
    ];

    return (
        <div className="max-w-5xl mx-auto w-full h-160 relative">

            {cards.map((card) => (
                <motion.div key={card.title}>
                    <motion.button className="w-80 p-8 absolute inset-0 flex flex-col justify-center items-start">
                        {card.skeleton}
                        <h2>{card.title}</h2>
                        <p>{card.description}</p>
                    </motion.button>
                </motion.div>

            ))}
        </div>
    )
}