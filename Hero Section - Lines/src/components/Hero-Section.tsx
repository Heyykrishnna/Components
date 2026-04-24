import React from 'react';
import { cn } from '../lib/utils';

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-neutral-50">
      <div className="relative max-w-7xl mx-auto w-full flex items-center justify-center h-full">
        <HorizontalScale className="absolute top-0 w-screen mx-auto"/>
        <HorizontalScale className="absolute bottom-0 w-screen mx-auto"/>
        <VerticalScale className="absolute left-0 h-screen mx-auto"/>
        <VerticalScale className="absolute right-0 h-screen mx-auto"/>


        <div className="p-10 size-full">
            <div className="p-10 relative size-full flex flex-col justify-between">
                <img src="https://wallpapercave.com/wp/wp4140937.jpg" className="absolute inset-0 object-cover size-full mask-radial-from-50% mask-b-from-20% mask-t-from-90% select-none pointer-events-none" />
                <nav className="flex items-center justify-between z-20">
                    <div className="flex items-center gap-6">
                        <h2 className="tracking-tighter font-medium bg-clip-text text-transparent bg-linear-to-b from-blue-400 to-blue-800 text-lg font-bold text-shadow-lg text-shadow-blue-500/10 px-4">Elysiar</h2>
                        <a href="#" className="text-neutral-700 text-xs">Features</a>
                        <a href="#" className="text-neutral-700 text-xs">Pricing</a>
                        <a href="#" className="text-neutral-700 text-xs">Signup</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 rounded-md bg-linear-to-t from-neutral-800 to-neutral-600 text-white text-xs text-shadow-lg text-shadow-black/2">Signup</button>
                        <button className="px-4 py-2 rounded-md bg-linear-to-t from-blue-700 to-blue-400 text-white text-xs text-shadow-lg text-shadow-black/2">Log In</button>
                    </div>
                </nav>
                <div className="flex flex-col max-w-4xl pb-10">
                    <h1 className="tracking-tight text-neutral-950 text-7xl font-medium">
                        Build a Better Tomorrow and Create a Better Future
                    </h1>
                </div>
                <Lines className="mask-b-from-20% absolute inset-x-0 top-0"/>
                <Lines className="mask-t-from-20% absolute inset-x-0 bottom-0"/>
            </div>
        </div>
      </div>
    </section>
  )
}
 

const HorizontalScale = ({className} : {className?: string}) => {
    return (
    <div
        className={cn("h-10 w-full bg-[repeating-linear-gradient(315deg,_#d4d4d4_0px,_#d4d4d4_1px,_transparent_1px,_transparent_10px)] bg-[length:14px_14px] border-y border-[var(--pattern))]", className)}
      />
    )
}

const VerticalScale = ({className} : {className?: string}) => {
    return (
    <div
        className={cn("w-10 h-full bg-[repeating-linear-gradient(315deg,_#d4d4d4_0px,_#d4d4d4_1px,_transparent_1px,_transparent_10px)] bg-[length:14px_14px] border-x border-[var(--pattern))]", className)}
      />
    )
}

const Lines = ({className} : {className?: string}) => {
    return(
        <div className={cn("h-14 w-full bg-[repeating-linear-gradient(to_bottom,#d4d4d4_0,#d4d4d4_1px,transparent_1px,transparent_0.5rem)]", className)} />
    )
}