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
            Hero Section
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