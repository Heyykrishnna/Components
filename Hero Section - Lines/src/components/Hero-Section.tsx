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
            <div className="p-10 relative size-full">
                <Lines className="mask-b-from-20% absolute inset-x-0 top-0"/>
                <Lines className="mask-t-from-20% absolute inset-x-0 bottom-0"/>
            Hero Section
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