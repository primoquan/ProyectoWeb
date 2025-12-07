"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DashboardHeaderProps {
  title: string
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-card border-b border-border">
      <div className="flex items-center justify-between gap-4 p-4 lg:px-8">
        <h1 className="text-2xl font-bold ml-12 lg:ml-0">{title}</h1>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 min-w-5 px-1 text-xs">
              3
            </Badge>
          </Button>

          <Avatar className="h-9 w-9">
            <AvatarImage src="/professional-plumber.png" alt="Juan Pérez" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
