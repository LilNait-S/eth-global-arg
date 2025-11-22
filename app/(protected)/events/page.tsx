"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PageHeader } from "@/components/page-header"
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  ExternalLink,
  Globe,
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

// Mock data - replace with real API data later
const mockEvents = [
  {
    id: 1,
    name: "ETH Global Buenos Aires",
    location: "Buenos Aires, Argentina",
    date: "Dec 15-17, 2024",
    dateStart: "2024-12-15",
    image: "/spr_catbig_w_capsule.gif",
    description: "The biggest Ethereum hackathon in Latin America",
    participants: 500,
    prizes: "$100,000",
    tags: ["Hackathon", "Web3", "DeFi"],
    website: "https://ethglobal.com/events/buenos-aires",
  },
  {
    id: 2,
    name: "Devcon Bangkok",
    location: "Bangkok, Thailand",
    date: "Nov 12-15, 2024",
    dateStart: "2024-11-12",
    image: "/spr_catbig_w_capsule.gif",
    description: "The Ethereum developer conference",
    participants: 3000,
    prizes: "N/A",
    tags: ["Conference", "Developers", "Community"],
    website: "https://devcon.org",
  },
  {
    id: 3,
    name: "ETH Denver",
    location: "Denver, USA",
    date: "Feb 28 - Mar 3, 2025",
    dateStart: "2025-02-28",
    image: "/spr_catbig_w_capsule.gif",
    description: "The largest Web3 #BUIDLathon in the world",
    participants: 15000,
    prizes: "$500,000",
    tags: ["BUIDLathon", "Innovation", "Community"],
    website: "https://ethdenver.com",
  },
  {
    id: 4,
    name: "ETH Prague",
    location: "Prague, Czech Republic",
    date: "May 30 - Jun 1, 2025",
    dateStart: "2025-05-30",
    image: "/spr_catbig_w_capsule.gif",
    description: "Ethereum hackathon in the heart of Europe",
    participants: 800,
    prizes: "$150,000",
    tags: ["Hackathon", "Europe", "Innovation"],
    website: "https://ethprague.com",
  },
  {
    id: 5,
    name: "ETH CC",
    location: "Brussels, Belgium",
    date: "Jul 8-11, 2025",
    dateStart: "2025-07-08",
    image: "/spr_catbig_w_capsule.gif",
    description: "Ethereum Community Conference",
    participants: 2000,
    prizes: "$200,000",
    tags: ["Conference", "Community", "Networking"],
    website: "https://ethcc.io",
  },
  {
    id: 6,
    name: "Blockchain Conference",
    location: "Pyongyang, North Korea",
    date: "Mar 20-22, 2025",
    dateStart: "2025-03-20",
    image: "/spr_catbig_w_capsule.gif",
    description: "Exploring blockchain technology",
    participants: 200,
    prizes: "$50,000",
    tags: ["Conference", "Blockchain", "Asia"],
    website: "https://example.com",
  },
]

export default function EventsPage() {
  const searchParams = useSearchParams()
  const locationParam = searchParams.get("location")
  
  const [selectedLocation, setSelectedLocation] = useState<string | null>(
    locationParam
  )

  useEffect(() => {
    if (locationParam) {
      setSelectedLocation(locationParam)
    }
  }, [locationParam])

  const filteredEvents = selectedLocation
    ? mockEvents.filter((event) =>
        event.location.includes(selectedLocation)
      )
    : mockEvents

  return (
    <div className="min-h-dvh max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <PageHeader
          icon={Calendar}
          title="Browse Events"
          subtitle="Discover upcoming hackathons and conferences"
          customTrigger={
            <Link href="/world">
              <Button className="bg-card/10 hover:bg-card/20 border-2 border-primary text-primary font-mono text-sm px-6 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                🌍 Back to Map
              </Button>
            </Link>
          }
        />

        {/* Location Filter */}
        {selectedLocation && (
          <div className="bg-card/10 border border-chart-2/30 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-chart-2" />
              <div>
                <p className="text-xs text-muted-foreground font-mono">
                  Filtering by location:
                </p>
                <p className="text-sm font-bold text-chart-2">
                  {selectedLocation}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedLocation(null)
                window.history.replaceState({}, "", "/events")
              }}
              className="text-xs text-chart-2 hover:text-chart-2/80 font-mono px-3 py-1.5 bg-card/20 rounded border border-chart-2/30"
            >
              ✕ Clear
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card/10 border border-primary/20 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Total Events</p>
            </div>
            <p className="text-2xl font-bold text-primary mt-1">
              {filteredEvents.length}
            </p>
          </div>
          <div className="bg-card/10 border border-chart-2/20 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-chart-2" />
              <p className="text-xs text-muted-foreground">Total Participants</p>
            </div>
            <p className="text-2xl font-bold text-chart-2 mt-1">
              {filteredEvents.reduce((acc, e) => acc + e.participants, 0)}
            </p>
          </div>
          <div className="bg-card/10 border border-chart-3/20 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-chart-3" />
              <p className="text-xs text-muted-foreground">Locations</p>
            </div>
            <p className="text-2xl font-bold text-chart-3 mt-1">
              {new Set(filteredEvents.map((e) => e.location)).size}
            </p>
          </div>
        </div>
      </div>

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <Calendar className="h-16 w-16 text-muted-foreground/50 mx-auto" />
          <div>
            <p className="text-xl font-bold text-muted-foreground">
              No events found
            </p>
            <p className="text-sm text-muted-foreground font-mono mt-2">
              <span className="text-chart-2">▸</span> Try clearing the filters
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedLocation(null)
              window.history.replaceState({}, "", "/events")
            }}
            className="text-sm text-primary hover:text-primary/80"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ScrollArea className="h-[calc(100dvh-24rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-4">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="bg-card/10 border border-primary/20 rounded-lg p-4 hover:border-primary/40 transition-all hover:shadow-[0_0_20px_rgba(var(--primary),0.2)]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex gap-4">
                  {/* Event Image */}
                  <div className="relative shrink-0">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-24 h-24 rounded-lg object-cover border-2 border-primary/30"
                    />
                  </div>

                  {/* Event Info */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-foreground truncate">
                          {event.name}
                        </h3>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-chart-2" />
                          <span>{event.date}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>

                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-chart-2" />
                        <span className="text-muted-foreground">
                          {event.participants} participants
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="h-3 w-3 text-chart-3" />
                        <span className="text-muted-foreground">
                          {event.prizes} prizes
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {event.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <a
                    href={event.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      size="sm"
                      className="w-full bg-primary/10 hover:bg-primary/20 border border-primary text-primary"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Visit Website
                    </Button>
                  </a>
                  <Link
                    href={`/find-hackers?location=${encodeURIComponent(
                      event.location.split(",")[0]
                    )}&event=${encodeURIComponent(event.name)}`}
                    className="flex-1"
                  >
                    <Button
                      size="sm"
                      className="w-full bg-card/10 hover:bg-card/20 border border-chart-2 text-chart-2"
                    >
                      <Users className="h-3 w-3 mr-1" />
                      Find Hackers
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
