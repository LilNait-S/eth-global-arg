"use client"

import { Button } from "@/components/ui/button"
import { useGetEventPoapById, useGetScanAddress } from "@/services/api/poap"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { ArrowRight, Menu, X, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"

export default function Home() {
  const { data } = useGetScanAddress()
  const { data: eventData } = useGetEventPoapById({ eventId: "16947" })
  console.log("eventData", eventData)
  console.log("data", data)
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isConnected } = useAccount()

  useEffect(() => {
    if (isConnected) {
      router.push("/profile")
    }
  }, [isConnected, router])

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <nav className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">hackaton arg</span>
          </div>

          <ConnectButton />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-background md:hidden">
            <div className="container mx-auto flex flex-col gap-4 px-4 py-6">
              <a
                href="#product"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Product
              </a>
              <a
                href="#how-it-works"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                How it works
              </a>
              <a
                href="#organizers"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                For organizers
              </a>
              <a
                href="#community"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Community
              </a>
              <Button className="w-full">Join beta</Button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <img
              src={"/LOGO-export.gif"}
              alt="Hackathon Argentina Logo"
              className="size-48 md:size-60 animate-fade-in"
            />
            <div className="space-y-6 max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Connect with hackers
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Join the largest blockchain hackathon community in Argentina.
                Build, collaborate, and showcase your projects with passionate
                developers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto sm:min-w-[400px]">
              <Button size="lg" className="text-base flex-1 sm:flex-none">
                Explore as guest
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              {!isConnected && <ConnectButton />}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
