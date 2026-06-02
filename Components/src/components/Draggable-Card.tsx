import { useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'


const Initial_Stack = [
    {
        title: "Switzerland",
        description: "Mountains, lakes, and chocolate.",
        src: "https://images.unsplash.com/photo-1570161766218-f8488ebb8078?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Italy",
        description: "Food, culture, and history.",
        src: "https://images.unsplash.com/photo-1780042426982-cb794203ea1d?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "France",
        description: "Art, fashion, and wine.",
        src: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2240&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Germany",
        description: "Food, culture, and history.",
        src: "https://images.unsplash.com/photo-1622214366189-72b19cc61597?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "USA",
        description: "Art, fashion, and wine.",
        src: "https://images.unsplash.com/photo-1508433957232-3107f5fd5995?q=80&w=2372&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
]

const DraggableCard = () => {
    const [stack, setStack] = useState(Initial_Stack)
    return (
        <div className="relative flex h-96 w-80 items-center justify-center">
            {stack.map((item, index) => 
                <StackCard 
                    key={item.title} 
                    item={item} 
                    index={index} 
                    total={stack.length} 
                    onSendToBack={
                        index === 0 ? () => setStack((s) => [...s.slice(1), s[0]]) 
                        : undefined
                    } /> )}
        </div>
    )
}

const StackSpring = { type: "spring" as const, stiffness:380, damping: 32}


const StackCard = ({item, index, total, onSendToBack}: {item: {title: string, description: string, src: string}, index: number, total: number, onSendToBack?: () => void }) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-150, 150], [-12, 12])
    const isTop = index === 0;

    return (
        <motion.div 
        drag={isTop ? 'x' : false}
        dragConstraints={{
            left: -150,
            right: 150
        }}
        dragElastic={0.1}
        onDragEnd={() => {
            if (!isTop || !onSendToBack) return
            onSendToBack();
            animate(x, 0, StackSpring)
        }}
        style={{
            zIndex: total - index,
            rotate,
            x
        }}
        animate={{
            y: `${- index * 5}%`,
            scale: 1 - index * 0.05,
        }}
        transition={StackSpring}
        className="absolute inset-0">
            <img src={item.src} alt={item.title} className="pointer-events-none h-full min-h-96 w-full select-none rounded-xl object-cover"/>
            <h2 className="absolute bottom-8 left-4 font-bold text-xl text-white z-20"> 
                {" "}
                {item.title} 
            </h2>
            <p className="absolute bottom-4 left-4 font-medium text-sm text-white/60 z-20"> 
                {" "}
                {item.description} 
            </p>
            <div className="absolute inset-0 h-full w-full bg-black/50 mask-t-from-50% rounded-xl"/>
        </motion.div>
    )
}

export default DraggableCard 