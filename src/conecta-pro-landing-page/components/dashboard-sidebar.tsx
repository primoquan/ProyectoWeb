"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, User, Mail, Star, CreditCard, Settings, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard", active: true },
  { icon: User, label: "Mi Perfil", href: "/dashboard/perfil" },
  { icon: Mail, label: "Mensajes", href: "/dashboard/mensajes", badge: 5 },
  { icon: Star, label: "Reseñas", href: "/dashboard/resenas" },
  { icon: CreditCard, label: "Suscripción", href: "/dashboard/suscripcion" },
  { icon: Settings, label: "Configuración", href: "/dashboard/configuracion" },
]

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-primary">ConectaPro</h1>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/professional-plumber.png" alt="Juan Pérez" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">Juan Pérez</p>
            <p className="text-xs text-muted-foreground">Plomero</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <Badge variant="destructive" className="h-5 min-w-5 px-1.5">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Cerrar sesión</span>
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar - Mobile */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-card border-r border-border transition-transform lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block fixed top-0 left-0 z-30 h-full w-64 bg-card border-r border-border">
        {sidebarContent}
      </aside>
    </>
  )
}
