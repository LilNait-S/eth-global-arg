"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Link from "next/link"

interface Event {
  name: string
  x: number // percentage from left
  y: number // percentage from top
  location: string
  date?: string
}

const events: Event[] = [
  {
    name: "ETH Global Buenos Aires",
    x: 28,
    y: 70,
    location: "Buenos Aires",
    date: "Dec 2024",
  },
  {
    name: "Devcon Bangkok",
    x: 72,
    y: 52,
    location: "Bangkok",
    date: "Nov 2024",
  },
  { 
    name: "ETH Denver", 
    x: 18, 
    y: 38, 
    location: "Denver", 
    date: "Feb 2025" 
  },
  { 
    name: "ETH Prague", 
    x: 52, 
    y: 32, 
    location: "Prague", 
    date: "May 2025" 
  },
  { 
    name: "ETH CC", 
    x: 50, 
    y: 30, 
    location: "Brussels", 
    date: "Jul 2025" 
  },
  { 
    name: "Blockchain Conference", 
    x: 78, 
    y: 40, 
    location: "Pyongyang", 
    date: "Mar 2025" 
  },
]

export default function WorldPage() {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)

  const handleViewEvent = (eventName: string) => {
    console.log(`Viewing event: ${eventName}`)
    // Navigate to event details or implement event logic
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-linear-to-b from-background to-transparent py-4 px-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/profile">
            <Button className="bg-card hover:bg-card/80 border-2 border-primary text-primary font-mono text-sm px-6 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
              ← Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary tracking-wider font-mono uppercase">
            Event Map
          </h1>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </div>

      {/* Map Container */}
      <ScrollArea className="h-full w-full pt-20">
        <div className="relative min-w-max h-full">
          {/* World Map Background */}
          <div className="relative h-screen">
            <img
              src="/spr_world_wip-export.png"
              alt="World Map"
              className="h-full w-auto object-cover"
            />

            {/* Event Markers */}
            {events.map((event) => (
              <div
                key={event.name}
                className="absolute"
                style={{
                  left: `${event.x}%`,
                  top: `${event.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onMouseEnter={() => setHoveredEvent(event.name)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                {/* Event Marker */}
                <div className="relative cursor-pointer group">
                  <div className="text-3xl animate-bounce filter drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]">
                    🎯
                  </div>

                  {/* Event Label */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <div className="bg-card border-2 border-primary px-3 py-1 rounded shadow-[0_0_15px_rgba(var(--primary),0.4)]">
                      <p className="text-primary font-mono text-xs font-bold tracking-wide uppercase">
                        {event.location}
                      </p>
                    </div>
                  </div>

                  {/* Hover Modal */}
                  {hoveredEvent === event.name && (
                    <div className="absolute top-full mt-12 left-1/2 -translate-x-1/2 z-30 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="bg-card border-2 border-primary rounded-lg p-4 shadow-[0_0_30px_rgba(var(--primary),0.6)] min-w-[220px]">
                        {/* Modal Header */}
                        <div className="mb-3 pb-2 border-b border-primary/30">
                          <p className="text-chart-2 font-mono text-xs mb-1">
                            {event.date}
                          </p>
                          <p className="text-foreground font-mono text-sm font-bold">
                            {event.name}
                          </p>
                          <p className="text-muted-foreground font-mono text-xs mt-1">
                            📍 {event.location}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2">
                          <Button
                            onClick={() => handleViewEvent(event.name)}
                            className="w-full bg-card hover:bg-card/80 border-2 border-primary text-primary font-mono text-xs h-9 shadow-[0_0_15px_rgba(var(--primary),0.4)] transition-all"
                          >
                            🎫 View Event
                          </Button>
                          <Button className="w-full bg-card hover:bg-card/80 border-2 border-chart-2 text-chart-2 font-mono text-xs h-9 shadow-[0_0_15px_rgba(var(--chart-2),0.3)] transition-all">
                            👥 Find Hackers
                          </Button>
                        </div>

                        {/* Modal Arrow */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-l-2 border-t-2 border-primary rotate-45" />
                      </div>
                    </div>
                  )}

                  {/* Pulsing ring animation */}
                  <div className="absolute inset-0 -m-2">
                    <div className="w-full h-full rounded-full border-2 border-primary animate-ping opacity-75" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Background Grid Effect */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(90deg, rgba(var(--primary), 0.1) 1px, transparent 1px),
                  linear-gradient(rgba(var(--primary), 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
              }}
            />
          </div>
        </div>
        <ScrollBar orientation="horizontal" className="bg-primary/10" />
      </ScrollArea>

      {/* Mobile Scroll Hint */}
      <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-card border-2 border-primary px-4 py-2 rounded-lg shadow-[0_0_20px_rgba(var(--primary),0.4)] animate-pulse">
          <p className="text-primary font-mono text-xs">
            ← Scroll to explore →
          </p>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-20 left-4 w-12 h-12 border-l-2 border-t-2 border-primary/30 pointer-events-none" />
      <div className="absolute top-20 right-4 w-12 h-12 border-r-2 border-t-2 border-primary/30 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-primary/30 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-primary/30 pointer-events-none" />
    </div>
  )
}
