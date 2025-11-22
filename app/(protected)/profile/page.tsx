"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Zap, Trophy, Users } from "lucide-react"
import { useAccount } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useGetAllPoapsByAddress } from "@/services/api/poap"
import { useGetProfileTalentProtocol } from "@/services/api/talent-protocol"

export default function ProfilePage() {
  const { address, isConnected } = useAccount()
  const { data } = useGetAllPoapsByAddress()
  const { data: talentProtocolData } = useGetProfileTalentProtocol()

  const profile = talentProtocolData?.profile

  const formatIdentifier = (identifier: string) => {
    if (identifier.startsWith("0x")) {
      return `${identifier.slice(0, 6)}...${identifier.slice(-4)}`
    }
    return identifier
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>
              Please connect your wallet to view your profile
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ConnectButton />
          </CardContent>
        </Card>
      </div>
    )
  }

  const githubAccount = profile?.accounts.find((acc) => acc.source === "github")
  const hasGithub = !!githubAccount

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <nav className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">hackaton arg</span>
          </div>
          <ConnectButton accountStatus={"avatar"} chainStatus={"none"} />
        </nav>
      </header>

      <main className="container mx-auto max-w-7xl px-4 py-4">
        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          {/* Profile Sidebar */}
          <aside className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <img
                    src={profile?.image_url || "/CAT_BIGgif.gif"}
                    alt="Profile Avatar"
                    className="size-32 rounded-full object-cover border-2 border-primary"
                  />
                  <div className="text-center space-y-1">
                    <h2 className="text-xl font-bold">
                      {profile?.display_name ||
                        profile?.name ||
                        "Hacker Profile"}
                    </h2>
                    <p className="text-sm text-muted-foreground font-mono">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </p>
                    {profile?.location && (
                      <p className="text-sm text-muted-foreground">
                        📍 {profile.location}
                      </p>
                    )}
                    {profile?.ens && (
                      <p className="text-sm text-primary font-medium">
                        {profile.ens}
                      </p>
                    )}
                  </div>
                  {profile?.bio && (
                    <p className="text-sm text-center text-muted-foreground">
                      {profile.bio}
                    </p>
                  )}
                  <div className="flex gap-2 flex-wrap justify-center">
                    {profile?.main_role && (
                      <Badge variant="default">
                        {profile.main_role.charAt(0).toUpperCase() +
                          profile.main_role.slice(1)}
                      </Badge>
                    )}
                    {profile?.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                    {profile?.human_checkmark && (
                      <Badge
                        variant="secondary"
                        className="bg-green-500/10 text-green-500"
                      >
                        ✓ Verified Human
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">POAPs</p>
                    <p className="text-2xl font-bold">{data?.length || 0}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Connected Accounts</p>
                    <p className="text-2xl font-bold">
                      {profile?.accounts.length || 0}
                    </p>
                  </div>
                </div>
                {profile?.rank_position && (
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Rank Position</p>
                      <p className="text-2xl font-bold">
                        #{profile.rank_position}
                      </p>
                    </div>
                  </div>
                )}
                {profile?.onchain_since && (
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Onchain since
                    </p>
                    <p className="text-sm font-medium">
                      {new Date(profile.onchain_since).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Connected Accounts */}
            {profile?.accounts && profile.accounts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Connected</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {profile.accounts.map((account) => (
                    <div
                      key={account.identifier}
                      className="flex items-center gap-2 text-sm p-2 rounded-md bg-secondary/50 min-w-0"
                    >
                      <Badge
                        variant="outline"
                        className="text-xs shrink-0 capitalize"
                      >
                        {account.source}
                      </Badge>
                      <span className="text-muted-foreground flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
                        {formatIdentifier(account.username) ||
                          formatIdentifier(account.identifier)}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </aside>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Integration Cards */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card
                className={`transition-colors ${
                  profile ? "border-green-500/50" : "hover:border-primary"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ExternalLink className="h-5 w-5 text-primary" />
                      <CardTitle>Talent Protocol</CardTitle>
                    </div>
                    {profile && (
                      <Badge variant="default" className="bg-green-500">
                        Connected
                      </Badge>
                    )}
                  </div>
                  <CardDescription>
                    {profile
                      ? "Your Talent Protocol profile is connected"
                      : "Connect your Talent Protocol profile to showcase your builder credentials"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {profile ? (
                    <Button
                      className="w-full"
                      size="lg"
                      variant="outline"
                      asChild
                    >
                      <a
                        href={`https://talentprotocol.com${profile.relative_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Profile
                      </a>
                    </Button>
                  ) : (
                    <Button className="w-full" size="lg">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Connect Talent Protocol
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card
                className={`transition-colors ${
                  hasGithub ? "border-green-500/50" : "hover:border-primary"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Github className="h-5 w-5 text-primary" />
                      <CardTitle>GitHub</CardTitle>
                    </div>
                    {hasGithub && (
                      <Badge variant="default" className="bg-green-500">
                        Connected
                      </Badge>
                    )}
                  </div>
                  <CardDescription>
                    {hasGithub
                      ? `Connected as @${githubAccount?.username}`
                      : "Sync your GitHub profile to display your repositories and contributions"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {hasGithub ? (
                    <Button
                      className="w-full"
                      size="lg"
                      variant="outline"
                      asChild
                    >
                      <a
                        href={`https://github.com/${githubAccount?.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        View Profile
                      </a>
                    </Button>
                  ) : (
                    <Button className="w-full" size="lg" variant="outline">
                      <Github className="mr-2 h-4 w-4" />
                      Sync GitHub
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Activity Section */}
            <Card>
              <CardHeader>
                <CardTitle>POAPs</CardTitle>
                <CardDescription>
                  POAPs collected from hackathons you&apos;ve participated in
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!data || data.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium text-muted-foreground">
                      No POAPs yet
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Attend hackathons to collect POAPs
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {data.map((poap) => (
                      <div
                        key={poap.tokenId}
                        className="group relative flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:border-primary transition-all hover:shadow-lg"
                      >
                        <div className="relative">
                          <img
                            src={poap.event.image_url}
                            alt={poap.event.name}
                            className="size-24 rounded-full object-cover"
                          />
                        </div>
                        <div className="text-center space-y-1">
                          <p className="text-xs font-medium line-clamp-2">
                            {poap.event.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {poap.event.year}
                          </p>
                        </div>
                        <a
                          href={poap.event.event_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ExternalLink className="h-4 w-4 text-primary" />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
